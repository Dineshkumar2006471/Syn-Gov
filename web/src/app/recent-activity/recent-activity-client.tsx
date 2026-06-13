'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ThumbsUp, ThumbsDown, Ban, Filter } from 'lucide-react'

export default function RecentActivityClient({ votes }: { votes: any[] }) {
  const [selectedDomain, setSelectedDomain] = useState<string>('all')

  // Compute Domain Stats
  const domainStats = useMemo(() => {
    const stats: Record<string, number> = {}
    let total = 0

    votes.forEach(vote => {
      const category = vote.proposals?.category || 'general'
      if (!stats[category]) stats[category] = 0
      stats[category]++
      total++
    })

    return { stats, total }
  }, [votes])

  const domains = ['all', ...Object.keys(domainStats.stats).sort()]

  const filteredVotes = selectedDomain === 'all' 
    ? votes 
    : votes.filter(v => (v.proposals?.category || 'general') === selectedDomain)

  const timeAgo = (dateStr: string) => {
    const diff = new Date().getTime() - new Date(dateStr).getTime()
    const min = Math.floor(diff / 60000)
    if (min < 60) return `${min} min ago`
    const hours = Math.floor(min / 60)
    if (hours < 24) return `${hours} hours ago`
    return `${Math.floor(hours / 24)} days ago`
  }

  const getVoteIcon = (type: string) => {
    if (type === 'yes') return <ThumbsUp size={16} style={{color: 'var(--success)'}} />
    if (type === 'no') return <ThumbsDown size={16} style={{color: 'var(--danger)'}} />
    return <Ban size={16} style={{color: 'var(--text-muted)'}} />
  }

  return (
    <div className="activity-container" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px' }}>
      
      {/* Left Column: Feed */}
      <div className="activity-feed-col">
        <div className="activity-filters" style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
            <Filter size={16} /> Filter by Domain:
          </div>
          {domains.map(d => (
            <button 
              key={d} 
              className={`btn btn-sm ${selectedDomain === d ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setSelectedDomain(d)}
              style={{ textTransform: 'capitalize' }}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="card-flat">
          {filteredVotes.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', padding: '24px', textAlign: 'center' }}>No activity found for this domain.</p>
          ) : (
            <div className="activity-feed" style={{ padding: '0 16px' }}>
              {filteredVotes.map(vote => (
                <div key={vote.id} className="activity-item" style={{ borderBottom: '1px solid var(--border)', padding: '16px 0', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ marginTop: '4px' }}>
                    {getVoteIcon(vote.vote_type)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p className="text-body-sm" style={{ marginBottom: '4px' }}>
                      <strong>{vote.users?.name || 'Someone'}</strong> voted{' '}
                      <strong className={`vote-${vote.vote_type}`}>{vote.vote_type.toUpperCase()}</strong>
                      {' '}on proposal:
                    </p>
                    <Link href={`/proposals/${vote.proposals?.id}`} className="text-body-sm" style={{ color: 'var(--accent)', textDecoration: 'underline', fontWeight: 500, display: 'inline-block', marginBottom: '8px' }}>
                      {vote.proposals?.title || 'Unknown Proposal'}
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <span>Weight: {parseFloat(vote.final_weight).toFixed(2)}x</span>
                      <span>Domain: <strong style={{textTransform:'capitalize'}}>{vote.proposals?.category || 'General'}</strong></span>
                      <span>{timeAgo(vote.created_at)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Stats */}
      <div className="activity-stats-col">
        <div className="card-flat" style={{ position: 'sticky', top: '100px' }}>
          <h3 className="text-h4" style={{ marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
            Domain Participation
          </h3>
          {domainStats.total === 0 ? (
            <p className="text-body-sm" style={{ color: 'var(--text-muted)' }}>No votes recorded yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {Object.entries(domainStats.stats)
                .sort((a, b) => b[1] - a[1]) // highest first
                .map(([category, count]) => {
                  const percent = Math.round((count / domainStats.total) * 100)
                  return (
                    <div key={category}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.875rem' }}>
                        <span style={{ textTransform: 'capitalize', fontWeight: 500 }}>{category}</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{percent}% ({count})</span>
                      </div>
                      <div className="progress-bar" style={{ height: '6px', background: 'var(--surface-raised)' }}>
                        <div style={{ height: '100%', background: 'var(--accent)', width: `${percent}%`, borderRadius: '4px' }}></div>
                      </div>
                    </div>
                  )
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
