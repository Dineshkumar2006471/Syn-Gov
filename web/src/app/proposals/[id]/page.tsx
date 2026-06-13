'use client'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import BottomNav from "@/components/BottomNav";
import { useState, useEffect, use } from 'react'
import { supabase as supabaseClient } from '@/lib/supabase'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import VotingPanel from '@/components/VotingPanel'

export default function ProposalDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [proposal, setProposal] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  // User Profile State
  const [userProfile, setUserProfile] = useState<any>(null)
  const [userVoteRecord, setUserVoteRecord] = useState<any>(null)
  const [votersList, setVotersList] = useState<any[]>([])

  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      // 1. Fetch Proposal
      const { data: propData } = await supabaseClient
        .from('proposals')
        .select('*')
        .eq('id', resolvedParams.id)
        .single()
      
      if (propData) {
        setProposal(propData)
      }

      // 2. Fetch logged-in user from Supabase Auth
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          // Fetch full user profile from our public.users table
          const { data: profile } = await supabaseClient
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single()
          
          if (profile) {
            setUserProfile(profile)
            
            // 3. Check if user already voted
            if (propData) {
              const { data: vote } = await supabaseClient
                .from('votes')
                .select('*')
                .eq('proposal_id', propData.id)
                .eq('user_id', profile.id)
                .single()
              
              if (vote) {
                setUserVoteRecord(vote)
              }
            }
          }
        }
      } catch (e) {
        console.log('User not logged in or fetch failed')
      }

      // 4. Fetch all votes for this proposal (for transparency list)
      if (propData) {
        const { data: allVotes } = await supabaseClient
          .from('votes')
          .select(`
            *,
            users:user_id (name)
          `)
          .eq('proposal_id', propData.id)
          .order('created_at', { ascending: false })
          
        if (allVotes) {
          setVotersList(allVotes)
        }
      }

      // 5. Fetch comments for this proposal
      if (propData) {
        const { data: proposalComments } = await supabaseClient
          .from('comments')
          .select(`
            *,
            users:user_id (name)
          `)
          .eq('proposal_id', propData.id)
          .order('created_at', { ascending: true })
          
        if (proposalComments) {
          setComments(proposalComments.map(c => ({
            id: c.id,
            author: c.users?.name || 'Unknown',
            avatar: c.users?.name ? c.users.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : 'U',
            time: new Date(c.created_at).toLocaleString(),
            text: c.content
          })))
        }
      }

      setLoading(false)
    }
    fetchData()
  }, [resolvedParams.id])

  const handlePostComment = async () => {
    if (!newComment.trim() || !userProfile || !proposal) {
      if (!userProfile) alert("Please log in to post a comment.")
      return
    }

    const { data: insertedComment, error } = await supabaseClient
      .from('comments')
      .insert({
        proposal_id: proposal.id,
        user_id: userProfile.id,
        content: newComment.trim()
      })
      .select(`
        *,
        users:user_id (name)
      `)
      .single()

    if (!error && insertedComment) {
      const initials = userProfile.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
      const newEntry = {
        id: insertedComment.id,
        author: userProfile.name,
        avatar: initials,
        time: 'Just now',
        text: insertedComment.content
      }
      setComments([...comments, newEntry])
      setNewComment('')
    } else {
      alert("Failed to post comment.")
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="app-layout">
          <Sidebar />
          <BottomNav />
          <main className="main-content">
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading proposal...</div>
          </main>
        </div>
      </>
    )
  }

  if (!proposal) {
    return (
      <>
        <Navbar />
        <div className="app-layout">
          <Sidebar />
          <BottomNav />
          <main className="main-content">
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--danger)' }}>Proposal not found.</div>
          </main>
        </div>
      </>
    )
  }

  const aiSummary = proposal.ai_summary || {}

  return (
    <>
      <Navbar />
      <div className="app-layout">
        <Sidebar />
        <BottomNav />
        <main className="main-content">
          <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '0.8125rem'}}>
            <Link href="/proposals" style={{color: 'var(--text-muted)'}}>Proposals</Link>
            <span style={{color: 'var(--text-subtle)'}}>/</span>
            <span style={{color: 'var(--text-primary)', fontWeight: 500}}>{proposal.title}</span>
          </div>

          <div className="detail-layout">
            <div>
              <div className="mb-24">
                <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px'}}>
                  <span className={`badge badge-${proposal.category || 'general'}`}>{proposal.category || 'general'}</span>
                  <span className={`badge badge-risk-${proposal.risk_level || 'low'}`}>{proposal.risk_level || 'low'} risk</span>
                  <span className={`badge badge-status-${proposal.status || 'active'}`}>{proposal.status || 'active'}</span>
                </div>
                <h1 className="text-h1 mb-8">{proposal.title}</h1>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.8125rem', color: 'var(--text-muted)'}}>
                  <span>Proposed by <strong style={{color: 'var(--text-primary)'}}>Community Member</strong></span>
                  <span>·</span>
                  <span>{new Date(proposal.created_at).toLocaleDateString()}</span>
                  {proposal.deadline && (
                    <>
                      <span>·</span>
                      <span>Closes {new Date(proposal.deadline).toLocaleDateString()}</span>
                    </>
                  )}
                </div>
              </div>

              {aiSummary && Object.keys(aiSummary).length > 0 && (
                <div className="kpi-panel mb-24">
                  <div className="kpi-header">
                    <div className="kpi-header-title">
                      <span></span> AI Summary
                    </div>
                    <span className="ai-badge">Generated by Gemini 2.5 Flash</span>
                  </div>
                  <div className="kpi-grid">
                    <div className="kpi-cell">
                      <div className="kpi-label">What</div>
                      <div className="kpi-value">{aiSummary.what || 'Not specified'}</div>
                    </div>
                    <div className="kpi-cell">
                      <div className="kpi-label">Why</div>
                      <div className="kpi-value">{aiSummary.why || 'Not specified'}</div>
                    </div>
                    <div className="kpi-cell">
                      <div className="kpi-label">Cost</div>
                      <div className="kpi-value" style={{fontFamily: 'var(--font-mono)'}}>{aiSummary.cost || proposal.budget || 'Not specified'}</div>
                    </div>
                    <div className="kpi-cell">
                      <div className="kpi-label">Impact</div>
                      <div className="kpi-value">{aiSummary.impact || 'Not specified'}</div>
                    </div>
                    <div className="kpi-cell">
                      <div className="kpi-label">Risk</div>
                      <div className="kpi-value"><span className={`badge badge-risk-${aiSummary.risk || proposal.risk_level || 'low'}`}>{aiSummary.risk || proposal.risk_level || 'low'}</span></div>
                    </div>
                    <div className="kpi-cell">
                      <div className="kpi-label">Deadline</div>
                      <div className="kpi-value" style={{fontFamily: 'var(--font-mono)'}}>{aiSummary.deadline || proposal.deadline || 'Not specified'}</div>
                    </div>
                    <div className="kpi-cell full-width">
                      <div className="kpi-label">Who it affects</div>
                      <div className="kpi-value">{aiSummary.affects || 'Not specified'}</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="card-flat mb-24">
                <h3 className="text-h4 mb-12">Full Proposal</h3>
                <div className="text-body" style={{color: 'var(--text-secondary)', lineHeight: 1.8, whiteSpace: 'pre-wrap'}}>
                  {proposal.description || 'No description provided.'}
                </div>
              </div>

              <div className="card-flat">
                <h3 className="text-h4 mb-20">Discussion</h3>

                <div className="discussion-thread mb-24">
                  {comments.map((comment) => (
                    <div key={comment.id} className="comment">
                      <div className="comment-avatar">{comment.avatar}</div>
                      <div className="comment-body">
                        <div className="comment-header">
                          <span className="comment-author">{comment.author}</span>
                          <span className="comment-time">{comment.time}</span>
                        </div>
                        <p className="comment-text">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{display: 'flex', gap: '12px'}}>
                  <div className="comment-avatar" style={{background: 'var(--accent)', color: '#fff'}}>
                    {userProfile ? userProfile.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : 'ME'}
                  </div>
                  <div style={{flex: 1}}>
                    <textarea 
                      className="textarea" 
                      placeholder="Add your thoughts to the discussion..." 
                      style={{minHeight: '80px'}}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                    <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '8px'}}>
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={handlePostComment}
                        disabled={!newComment.trim()}
                      >
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── VOTES CAST LIST ── */}
              <div className="card-flat" style={{ marginTop: '24px' }}>
                <h3 className="text-h4 mb-20">Votes Cast</h3>
                {votersList.length === 0 ? (
                  <p className="text-body-sm text-muted">No votes have been cast yet.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {votersList.map(v => (
                      <div key={v.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 600 }}>
                            {v.users?.name ? v.users.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : 'U'}
                          </div>
                          <div>
                            <div className="text-body-sm" style={{ fontWeight: 600 }}>{v.users?.name || 'Unknown User'}</div>
                            <div className="text-caption text-muted">{new Date(v.created_at).toLocaleString()}</div>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span className={`badge`} style={{
                            background: v.vote_type === 'yes' ? '#DCFCE7' : v.vote_type === 'no' ? '#FEE2E2' : '#F3F4F6',
                            color: v.vote_type === 'yes' ? '#166534' : v.vote_type === 'no' ? '#991B1B' : '#4B5563',
                            marginRight: '8px',
                            textTransform: 'uppercase'
                          }}>
                            {v.vote_type}
                          </span>
                          <span className="text-body-sm" style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
                            {parseFloat(v.final_weight).toFixed(2)}x
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="detail-right" style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
              
              {/* ── VOTING PANEL ── */}
              {userProfile ? (
                <VotingPanel 
                  proposalId={proposal.id}
                  proposalCategory={proposal.category || 'general'}
                  proposalStatus={proposal.status || 'active'}
                  deadline={proposal.deadline}
                  weightedYes={parseFloat(proposal.weighted_yes || 0)}
                  weightedNo={parseFloat(proposal.weighted_no || 0)}
                  txHash={proposal.tx_hash}
                  userId={userProfile.id}
                  userName={userProfile.name}
                  userContributionScore={userProfile.contribution_score || 0}
                  userGovernanceWeight={userProfile.governance_weight || 1}
                  userExpertiseTags={userProfile.expertise_tags || []}
                  userHasVoted={!!userVoteRecord}
                  userVoteType={userVoteRecord?.vote_type}
                  userVoteWeight={userVoteRecord?.final_weight}
                />
              ) : (
                <div className="card-flat" style={{textAlign: 'center', padding: '32px 16px'}}>
                  <p style={{color: 'var(--text-muted)'}}>Please <Link href="/login" style={{color: 'var(--accent)', fontWeight: 600}}>log in</Link> to view and participate in governance voting.</p>
                </div>
              )}

              <div className="card-flat">
                <h4 className="text-h4 mb-16">Details</h4>
                <div style={{display: 'flex', flexDirection: 'column', gap: '14px'}}>
                  <div>
                    <div className="text-caption" style={{color: 'var(--text-muted)', marginBottom: '2px'}}>Category</div>
                    <div className="text-body-sm" style={{fontWeight: 500, textTransform: 'capitalize'}}>{proposal.category || 'General'}</div>
                  </div>
                  <div>
                    <div className="text-caption" style={{color: 'var(--text-muted)', marginBottom: '2px'}}>Budget</div>
                    <div className="text-data">{proposal.budget || 'None'}</div>
                  </div>
                  <div>
                    <div className="text-caption" style={{color: 'var(--text-muted)', marginBottom: '2px'}}>Timeline</div>
                    <div className="text-body-sm" style={{fontWeight: 500}}>{proposal.timeline || 'Not specified'}</div>
                  </div>
                  <div>
                    <div className="text-caption" style={{color: 'var(--text-muted)', marginBottom: '2px'}}>Risk Level</div>
                    <span className={`badge badge-risk-${proposal.risk_level || 'low'}`}>{proposal.risk_level || 'low'}</span>
                  </div>
                  <div>
                    <div className="text-caption" style={{color: 'var(--text-muted)', marginBottom: '2px'}}>Status</div>
                    <span className={`badge badge-status-${proposal.status || 'active'}`}>{proposal.status || 'active'}</span>
                  </div>
                </div>
              </div>

              {(!proposal.tx_hash) && (
                <div className="card-flat" style={{borderColor: 'var(--accent-muted)', background: 'var(--accent-light)'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
                    <span>🔗</span>
                    <span className="text-body-sm" style={{fontWeight: 600, color: 'var(--accent)'}}>Blockchain Connected</span>
                  </div>
                  <p className="text-caption" style={{color: 'var(--text-muted)', marginBottom: '8px'}}>This governance system leverages Polygon Amoy for transparent and immutable vote logging.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
