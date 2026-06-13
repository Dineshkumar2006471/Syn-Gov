'use client'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import BottomNav from "@/components/BottomNav";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { generateProposalSummary, createProposal } from '@/app/actions'

export default function CreateProposal() {
  const router = useRouter()
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [budget, setBudget] = useState('')
  const [timeline, setTimeline] = useState('')
  const [riskLevel, setRiskLevel] = useState('low')
  const [deadline, setDeadline] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)

  // Fetch the logged-in user from our cookie-based session
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/me')
        if (res.ok) {
          const data = await res.json()
          setUserId(data.id || null)
          setUserName(data.name || null)
        }
      } catch (e) {
        console.log('Not logged in')
      }
    }
    fetchUser()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)
    
    try {
      // 1. Generate real AI Summary via Gemini
      const aiSummary = await generateProposalSummary(description, title, budget, timeline)
      
      // 2. Save to Supabase and log to Blockchain
      const result = await createProposal({
        title,
        category,
        description,
        budget,
        timeline,
        riskLevel,
        deadline,
        aiSummary,
        authorId: userId,
        authorName: userName,
      })
      
      // 3. Redirect to the actual real newly created proposal
      if (result.success && result.id) {
        router.push(`/proposals/${result.id}`)
      } else {
        alert("Failed to create proposal. Please try again.")
        setIsSubmitting(false)
      }
    } catch (err) {
      console.error(err)
      alert("Failed to create proposal. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="app-layout">
        <Sidebar />
        <BottomNav />
        <main className="main-content">
          <div className="mb-32">
            <h1 className="text-h1 mb-8">Create a Proposal</h1>
            <p className="text-body" style={{color: 'var(--text-muted)', maxWidth: '500px'}}>
              Describe your idea. AI will extract the key details and create a structured summary for your community to review.
            </p>
          </div>

          <div className="create-layout">
            <div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="label" htmlFor="proposal-title">Proposal Title</label>
                  <input type="text" id="proposal-title" className="input" placeholder="e.g. Annual Hackathon Event Budget" required value={title} onChange={e => setTitle(e.target.value)} />
                </div>

                <div className="form-group">
                  <label className="label" htmlFor="proposal-category">Category</label>
                  <select id="proposal-category" className="select" required value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="" disabled>Select a category</option>
                    <option value="finance">💰 Finance</option>
                    <option value="events">🎉 Events</option>
                    <option value="tech">💻 Tech</option>
                    <option value="operations">⚙️ Operations</option>
                    <option value="general">📋 General</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="label" htmlFor="proposal-description">Description</label>
                  <textarea id="proposal-description" className="textarea" style={{minHeight: '200px'}} placeholder="Describe your proposal in detail. Include context, reasoning, and any supporting data. The AI will extract key information automatically.

Example: We propose allocating ₹20,000 from the club treasury to organize our annual hackathon. The budget covers venue rental (₹5,000), food (₹6,000), prizes (₹5,000), branding (₹2,500), and contingency (₹1,500). Expected attendance: 150+ students." required value={description} onChange={e => setDescription(e.target.value)}></textarea>
                </div>

                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                  <div className="form-group">
                    <label className="label" htmlFor="proposal-budget">Budget</label>
                    <input type="text" id="proposal-budget" className="input" placeholder="₹20,000 or none" value={budget} onChange={e => setBudget(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="label" htmlFor="proposal-timeline">Timeline</label>
                    <input type="text" id="proposal-timeline" className="input" placeholder="e.g. 3 months, Q2 2025" value={timeline} onChange={e => setTimeline(e.target.value)} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="label">Risk Level</label>
                  <div className="segmented-control" id="riskControl">
                    <div className={`segmented-option ${riskLevel === 'low' ? 'active' : ''}`} onClick={() => setRiskLevel('low')}>🟢 Low</div>
                    <div className={`segmented-option ${riskLevel === 'medium' ? 'active' : ''}`} onClick={() => setRiskLevel('medium')}>🟡 Medium</div>
                    <div className={`segmented-option ${riskLevel === 'high' ? 'active' : ''}`} onClick={() => setRiskLevel('high')}>🔴 High</div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="label" htmlFor="proposal-deadline">Voting Deadline</label>
                  <input type="date" id="proposal-deadline" className="input" required value={deadline} onChange={e => setDeadline(e.target.value)} />
                </div>

                <div style={{display: 'flex', gap: '12px', marginTop: '32px'}}>
                  <button type="submit" className="btn btn-primary" style={{padding: '14px 32px'}} disabled={isSubmitting}>
                    {isSubmitting ? 'Generating AI Summary & Submitting...' : 'Submit Proposal'}
                  </button>
                  <a href="/proposals" className="btn btn-secondary">Cancel</a>
                </div>
              </form>
            </div>

            <div className="ai-preview">
              <div className="ai-preview-header">
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <span style={{fontSize: '1.25rem'}}>✨</span>
                  <h3 className="text-h4">How it works</h3>
                </div>
                <span className="ai-badge">Gemini 2.5</span>
              </div>

              <div className="kpi-panel">
                <div className="kpi-header">
                  <div className="kpi-header-title"><span>✨</span> AI Summary</div>
                </div>
                <div style={{padding: '24px'}}>
                  <p className="text-body-sm" style={{color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.7}}>
                    Once you submit your proposal, <strong style={{color: 'var(--accent)'}}>Gemini 2.5 Flash</strong> will automatically analyze your description and generate a structured summary with:
                  </p>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '14px'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                      <span style={{fontSize: '1.1rem'}}>📋</span>
                      <span className="text-body-sm" style={{color: 'var(--text-secondary)'}}>Core objective summary</span>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                      <span style={{fontSize: '1.1rem'}}>💡</span>
                      <span className="text-body-sm" style={{color: 'var(--text-secondary)'}}>Why it matters</span>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                      <span style={{fontSize: '1.1rem'}}>💰</span>
                      <span className="text-body-sm" style={{color: 'var(--text-secondary)'}}>Budget analysis</span>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                      <span style={{fontSize: '1.1rem'}}>📈</span>
                      <span className="text-body-sm" style={{color: 'var(--text-secondary)'}}>Realistic impact assessment</span>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                      <span style={{fontSize: '1.1rem'}}>⚠️</span>
                      <span className="text-body-sm" style={{color: 'var(--text-secondary)'}}>Risk level classification</span>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                      <span style={{fontSize: '1.1rem'}}>👥</span>
                      <span className="text-body-sm" style={{color: 'var(--text-secondary)'}}>Who it affects</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-flat mt-16" style={{background: 'var(--surface)'}}>
                <h4 className="text-h4 mb-8" style={{fontSize: '0.8125rem'}}>💡 Tips for a good proposal</h4>
                <ul style={{paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px'}}>
                  <li className="text-caption" style={{color: 'var(--text-muted)'}}>Be specific about costs and timelines</li>
                  <li className="text-caption" style={{color: 'var(--text-muted)'}}>Explain why this matters to the community</li>
                  <li className="text-caption" style={{color: 'var(--text-muted)'}}>Address potential risks proactively</li>
                  <li className="text-caption" style={{color: 'var(--text-muted)'}}>Keep it clear — the AI works best with plain language</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
