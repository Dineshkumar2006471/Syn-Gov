'use server'

import { GoogleGenAI } from '@google/genai'
import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { ethers } from 'ethers'

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
  // In a real app, you would get the user ID from the session
  // For this prototype, we'll hardcode a dummy user UUID that should exist in your DB, 
  // or we'll bypass the RLS if running on service role key (not recommended for production).
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
    } catch (e) {
      console.log('Web3 logging failed (is local node running?):', e.message)
    }

    revalidatePath('/dashboard')
    revalidatePath('/proposals')
    return { success: true, id: result[0].id }
  } catch (err: any) {
    throw new Error(err.message)
  }
}

export async function castVote(proposalId: string, voteType: string, weightUsed: string) {
  try {
    // Mock user for MVP
    const userId = 'user-123'
    
    // 1. Log to Web3 Blockchain
    try {
      const tx = await loggerContract.logVote(proposalId, userId, voteType, weightUsed)
      console.log('Vote logged to blockchain. Tx Hash:', tx.hash)
    } catch (e) {
      console.log('Web3 logging failed (is local node running?):', e.message)
    }
    
    return { success: true }
  } catch (err: any) {
    throw new Error(err.message)
  }
}
