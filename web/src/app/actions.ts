'use server'

import { GoogleGenAI } from '@google/genai'
import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { ethers } from 'ethers'
import { sendEmail } from '@/lib/email/resend'
import { proposalCreatedTemplate, proposalResultTemplate } from '@/lib/email/templates'

// Initialize the Gemini SDK using a standard API Key (Vercel compatible)
const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY 
})

// Web3 Setup
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL || 'http://127.0.0.1:8545')
const wallet = new ethers.Wallet(process.env.RELAYER_PRIVATE_KEY || '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', provider)
const contractABI = [
  "function logVote(string proposalId, string userIdHash, string voteType, string weightUsed) public",
  "function logProposal(string proposalId, string titleHash) public"
]
const contractAddress = process.env.CONTRACT_ADDRESS || '0x5FbDB2315678afecb367f032d93F642f64180aa3'
const loggerContract = new ethers.Contract(contractAddress, contractABI, wallet)

// ── App base URL ────────────────────────────────────────────
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://syn-3cqg104tf-bingi-dinesh-kumars-projects.vercel.app'

// ── Helper: fetch all member emails ─────────────────────────
async function getAllMemberEmails(): Promise<{ email: string; name: string }[]> {
  const { data, error } = await supabase
    .from('users')
    .select('email, name')

  if (error || !data) {
    console.error('[SynGov] Failed to fetch member emails:', error?.message)
    return []
  }
  return data
}

// ── Helper: send emails in background (non-blocking) ────────
async function notifyAllMembers(subject: string, htmlFn: (member: { email: string; name: string }) => string) {
  const members = await getAllMemberEmails()
  if (members.length === 0) return

  // Fire-and-forget — don't block the main action
  Promise.allSettled(
    members.map(member =>
      sendEmail({
        to: member.email,
        subject,
        html: htmlFn(member),
      })
    )
  ).then(results => {
    const failed = results.filter(r => r.status === 'rejected').length
    if (failed > 0) console.error(`[SynGov Email] ${failed}/${members.length} emails failed`)
    else console.log(`[SynGov Email] ${members.length} emails sent successfully`)
  })
}

export async function generateProposalSummary(description: string, title: string, budget: string, timeline: string) {
  try {
    const prompt = `
      You are an expert financial and operational analyst for a college governance system. 
      Read the following proposal and synthesize the information into a high-level executive summary.
      DO NOT simply repeat the user's text verbatim. You must condense, analyze, and rephrase the core points intelligently.
      
      Title: ${title}
      Budget: ${budget}
      Timeline: ${timeline}
      Description:
      ${description}
      
      Extract the following and return ONLY a valid JSON object with these exact keys:
      {
        "what": "In your own words, a highly condensed 1-sentence summary of the core objective.",
        "why": "In your own words, a 1-sentence analysis of the true underlying value or problem this solves.",
        "cost": "The exact budget amount, cleaned up (e.g. '₹15,000'). If none, write 'None'.",
        "impact": "A critical 1-sentence assessment of the realistic outcome.",
        "risk": "A single word: 'low', 'medium', or 'high', based on your analysis of the budget and scope.",
        "deadline": "The expected timeline.",
        "affects": "Analyze who will actually feel the impact of this (e.g., '30+ coding club members')."
      }
    `
    
    // Using the correct @google/genai API
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    })
    
    if (response.text) {
      return JSON.parse(response.text)
    }
    throw new Error("No response from Gemini")
  } catch (error) {
    console.error("Error generating summary:", error)
    throw error
  }
}

export async function createProposal(data: any) {
  try {
    // 1. Insert into Supabase
    const { data: result, error } = await supabase.from('proposals').insert([{
      title: data.title,
      category: data.category,
      budget: data.budget,
      timeline: data.timeline,
      risk_level: data.riskLevel,
      deadline: data.deadline,
      description: data.description,
      ai_summary: data.aiSummary,
      status: 'active'
    }]).select()

    if (error) throw error

    // 2. Log to Web3 Blockchain
    try {
      const tx = await loggerContract.logProposal(result[0].id, data.title.substring(0, 32))
      console.log('Proposal logged to blockchain. Tx Hash:', tx.hash)
    } catch (e: any) {
      console.log('Web3 logging failed (is local node running?):', e.message)
    }

    // 3. Send notification email to all members
    const aiWhat = data.aiSummary?.what || data.description?.substring(0, 120) || data.title
    notifyAllMembers(
      `📋 New Proposal: ${data.title}`,
      () => proposalCreatedTemplate({
        authorName: data.authorName || 'A community member',
        proposalTitle: data.title,
        aiSummary: aiWhat,
        category: data.category || 'general',
        proposalUrl: `${APP_URL}/proposals`,
      })
    )

    revalidatePath('/dashboard')
    revalidatePath('/proposals')
    return { success: true, id: result[0].id }
  } catch (err: any) {
    throw new Error(err.message)
  }
}

export async function castVote(proposalId: string, userId: string, voteType: string, weightUsed: string) {
  try {
    // 1. Insert vote into Supabase
    const finalWeight = parseFloat(weightUsed) || 1.0
    const { error: voteError } = await supabase.from('votes').insert([{
      proposal_id: proposalId,
      user_id: userId,
      vote_type: voteType,
      base_weight: 1.0,
      expertise_bonus: Math.max(finalWeight - 1.0, 0),
      final_weight: finalWeight,
    }])

    if (voteError) throw voteError

    // 2. Update weighted totals on the proposal
    const weightCol = voteType === 'yes' ? 'weighted_yes' : 'weighted_no'
    const { data: proposal } = await supabase
      .from('proposals')
      .select(weightCol)
      .eq('id', proposalId)
      .single()

    if (proposal) {
      const currentVal = parseFloat(proposal[weightCol]) || 0
      await supabase
        .from('proposals')
        .update({ [weightCol]: currentVal + finalWeight })
        .eq('id', proposalId)
    }

    // 3. Log to Web3 Blockchain
    try {
      const tx = await loggerContract.logVote(proposalId, userId, voteType, weightUsed)
      console.log('Vote logged to blockchain. Tx Hash:', tx.hash)
    } catch (e: any) {
      console.log('Web3 logging failed (is local node running?):', e.message)
    }

    // 4. Award contribution points for voting
    await supabase.from('contribution_activity').insert([{
      user_id: userId,
      action: 'vote_cast',
      description: `Voted ${voteType} on proposal`,
      points_change: 5,
      proposal_id: proposalId,
    }])

    // Update user's contribution_score (trigger will recalculate weight)
    const { data: user } = await supabase
      .from('users')
      .select('contribution_score')
      .eq('id', userId)
      .single()

    if (user) {
      await supabase
        .from('users')
        .update({ contribution_score: user.contribution_score + 5 })
        .eq('id', userId)
    }
    
    revalidatePath('/dashboard')
    revalidatePath('/proposals')
    return { success: true }
  } catch (err: any) {
    throw new Error(err.message)
  }
}

export async function closeVoting(proposalId: string) {
  try {
    // 1. Fetch the proposal and its votes
    const { data: proposal, error: pErr } = await supabase
      .from('proposals')
      .select('*')
      .eq('id', proposalId)
      .single()

    if (pErr || !proposal) throw new Error('Proposal not found')

    const { data: votes } = await supabase
      .from('votes')
      .select('*')
      .eq('proposal_id', proposalId)

    const totalVotes = votes?.length || 0
    const weightedYes = parseFloat(proposal.weighted_yes) || 0
    const weightedNo = parseFloat(proposal.weighted_no) || 0
    const totalWeight = weightedYes + weightedNo
    const yesPercent = totalWeight > 0 ? Math.round((weightedYes / totalWeight) * 100) : 0
    const noPercent = totalWeight > 0 ? 100 - yesPercent : 0
    const outcome: 'Passed' | 'Rejected' = yesPercent > 50 ? 'Passed' : 'Rejected'

    // 2. Log final result to blockchain
    let txHash: string | undefined
    try {
      const tx = await loggerContract.logProposal(
        proposalId,
        `RESULT:${outcome}:${yesPercent}%`
      )
      await tx.wait()
      txHash = tx.hash
      console.log('Result logged to blockchain. Tx Hash:', txHash)
    } catch (e: any) {
      console.log('Web3 logging failed:', e.message)
    }

    // 3. Update proposal status in Supabase
    const newStatus = outcome === 'Passed' ? 'passed' : 'rejected'
    await supabase
      .from('proposals')
      .update({ status: newStatus, tx_hash: txHash || null })
      .eq('id', proposalId)

    // 4. Send result email to all members
    notifyAllMembers(
      `${outcome === 'Passed' ? '✅' : '❌'} Proposal ${outcome}: ${proposal.title}`,
      () => proposalResultTemplate({
        proposalTitle: proposal.title,
        outcome,
        yesPercent,
        noPercent,
        totalVotes,
        txHash,
        resultsUrl: `${APP_URL}/proposals`,
      })
    )

    revalidatePath('/dashboard')
    revalidatePath('/proposals')
    return { success: true, outcome, yesPercent, noPercent, totalVotes, txHash }
  } catch (err: any) {
    throw new Error(err.message)
  }
}
