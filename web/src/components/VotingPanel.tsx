'use client'

import { useState, useEffect, useCallback } from 'react'
import { castVoteAction } from '@/app/actions'
import { ThumbsUp, ThumbsDown, Clock, CheckCircle, Ban, AlertTriangle, Edit2 } from 'lucide-react'

// ── Interfaces ──────────────────────────────────────────────────────

interface VotingPanelProps {
  proposalId: string;
  proposalCategory: string;
  proposalStatus: 'active' | 'passed' | 'rejected' | 'closed';
  deadline: string | null;
  weightedYes: number;
  weightedNo: number;
  txHash: string | null;
  userId: string;
  userName: string;
  userContributionScore: number;
  userGovernanceWeight: number;
  userExpertiseTags: string[];
  userHasVoted: boolean;
  userVoteType?: string;
  userVoteWeight?: number;
}

// ── Category → Tag match check ──────────────────────────────────────

const CATEGORY_TAG_MAP: Record<string, string[]> = {
  finance:    ['finance', 'accounting', 'budget', 'treasurer'],
  tech:       ['tech', 'engineering', 'development', 'coding'],
  events:     ['events', 'planning', 'logistics', 'outreach'],
  operations: ['operations', 'management', 'admin', 'hr'],
  general:    [],
}

function hasExpertiseMatch(tags: string[], category: string): boolean {
  const relevant = CATEGORY_TAG_MAP[category.toLowerCase()] || []
  if (relevant.length === 0) return false
  const normalized = tags.map(t => t.toLowerCase().trim())
  return relevant.some(tag => normalized.includes(tag))
}

// ── Countdown hook ──────────────────────────────────────────────────

function useCountdown(deadline: string | null) {
  const [timeLeft, setTimeLeft] = useState('')
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    if (!deadline) {
      setTimeLeft('No deadline set')
      return
    }

    const tick = () => {
      const now = new Date().getTime()
      const end = new Date(deadline).getTime()
      const diff = end - now

      if (diff <= 0) {
        setTimeLeft('Voting ended')
        setIsExpired(true)
        return
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24))
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const s = Math.floor((diff % (1000 * 60)) / 1000)

      if (d > 0) setTimeLeft(`${d}d ${h}h ${m}m`)
      else if (h > 0) setTimeLeft(`${h}h ${m}m ${s}s`)
      else setTimeLeft(`${m}m ${s}s`)
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [deadline])

  return { timeLeft, isExpired }
}

// ── Component ───────────────────────────────────────────────────────

export default function VotingPanel(props: VotingPanelProps) {
  const {
    proposalId, proposalCategory, proposalStatus, deadline,
    weightedYes: initialYes, weightedNo: initialNo, txHash,
    userId, userName, userContributionScore, userGovernanceWeight,
    userExpertiseTags, userHasVoted, userVoteType, userVoteWeight,
  } = props

  const [hasVoted, setHasVoted] = useState(userHasVoted)
  const [votedType, setVotedType] = useState(userVoteType || '')
  const [votedWeight, setVotedWeight] = useState(userVoteWeight || 0)
  const [weightedYes, setWeightedYes] = useState(initialYes)
  const [weightedNo, setWeightedNo] = useState(initialNo)
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState('')

  const { timeLeft, isExpired } = useCountdown(deadline)
  const expertiseMatch = hasExpertiseMatch(userExpertiseTags, proposalCategory)
  const isClosed = proposalStatus !== 'active' || isExpired

  // Progress bar percentages
  const totalWeight = weightedYes + weightedNo
  const yesPercent = totalWeight > 0 ? Math.round((weightedYes / totalWeight) * 100) : 50
  const noPercent = totalWeight > 0 ? 100 - yesPercent : 50

  // ── Vote handler ──────────────────────────────────────────
  const handleVote = useCallback(async (voteType: 'yes' | 'no' | 'abstain') => {
    if (hasVoted || isClosed || loading) return

    setLoading(voteType)
    setError('')

    try {
      const result = await castVoteAction(proposalId, userId, voteType)

      if (!result.success) {
        setError(result.error || 'Vote failed')
        setLoading(null)
        return
      }

      setHasVoted(true)
      setVotedType(voteType)
      setVotedWeight(result.finalWeight)
      setWeightedYes(result.weightedYes)
      setWeightedNo(result.weightedNo)
    } catch (e: any) {
      setError(e.message || 'Something went wrong')
    } finally {
      setLoading(null)
    }
  }, [hasVoted, isClosed, loading, proposalId, userId])

  // ── Render ────────────────────────────────────────────────
  return (
    <div className="voting-panel">
      {/* ── User Stats ──────────────────────────────── */}
      <div className="voting-panel-stats">
        <div className="voting-stat-item">
          <span className="voting-stat-label">Your Weight</span>
          <span className="voting-stat-value">{userGovernanceWeight.toFixed(2)}x</span>
        </div>
        <div className="voting-stat-item">
          <span className="voting-stat-label">Score</span>
          <span className="voting-stat-value">{userContributionScore} pts</span>
        </div>
        {expertiseMatch && (
          <span className="voting-expertise-badge">Expert Match</span>
        )}
      </div>

      {/* ── Countdown ───────────────────────────────── */}
      <div className="voting-countdown">
        <span className="voting-countdown-icon"><Clock size={16} /></span>
        <span className={`voting-countdown-text ${isExpired ? 'expired' : ''}`}>
          {timeLeft}
        </span>
      </div>

      {/* ── Progress Bars ───────────────────────────── */}
      <div className="voting-progress-section">
        <div className="voting-progress-labels">
          <span className="voting-yes-label">Yes ({yesPercent}%)</span>
          <span className="voting-no-label">No ({noPercent}%)</span>
        </div>
        <div className="voting-progress-bar">
          <div
            className="voting-progress-yes"
            style={{ width: `${totalWeight > 0 ? yesPercent : 0}%` }}
          />
          <div
            className="voting-progress-no"
            style={{ width: `${totalWeight > 0 ? noPercent : 0}%` }}
          />
        </div>
        <div className="voting-progress-weights">
          <span>{weightedYes.toFixed(2)} weighted</span>
          <span>{weightedNo.toFixed(2)} weighted</span>
        </div>
      </div>

      {/* ── Vote Buttons / Confirmation ─────────────── */}
      {!hasVoted && !isClosed && (
        <div className="voting-buttons">
          <button
            className={`voting-btn voting-btn-yes ${votedType === 'yes' ? 'active' : ''}`}
            onClick={() => handleVote('yes')}
            disabled={loading !== null}
          >
            {loading === 'yes' ? (
              <span className="voting-spinner" />
            ) : <><ThumbsUp size={16} style={{marginRight: '6px'}} /> Yes</>}
          </button>
          <button
            className={`voting-btn voting-btn-no ${votedType === 'no' ? 'active' : ''}`}
            onClick={() => handleVote('no')}
            disabled={loading !== null}
          >
            {loading === 'no' ? (
              <span className="voting-spinner" />
            ) : <><ThumbsDown size={16} style={{marginRight: '6px'}} /> No</>}
          </button>
          <button
            className={`voting-btn voting-btn-abstain ${votedType === 'abstain' ? 'active' : ''}`}
            onClick={() => handleVote('abstain')}
            disabled={loading !== null}
          >
            {loading === 'abstain' ? (
              <span className="voting-spinner" />
            ) : <><Ban size={16} style={{marginRight: '6px'}} /> Abstain</>}
          </button>
        </div>
      )}

      {hasVoted && (
        <div className="voting-confirmation" style={{ position: 'relative' }}>
          <div className="voting-confirmation-icon"><CheckCircle size={20} color="var(--success)" /></div>
          <div style={{ flex: 1 }}>
            <p className="voting-confirmation-text">
              You voted <strong className={`vote-${votedType}`}>
                {votedType.toUpperCase()}
              </strong> with weight <strong>{votedWeight.toFixed(2)}x</strong>
            </p>
            {expertiseMatch && (
              <p className="voting-confirmation-bonus">
                +0.2 expertise bonus applied
              </p>
            )}
          </div>
          {!isClosed && (
            <button 
              className="btn btn-ghost btn-sm" 
              style={{ position: 'absolute', right: '12px', top: '12px' }}
              onClick={() => setHasVoted(false)}
            >
              <Edit2 size={14} style={{ marginRight: '4px' }} /> Edit
            </button>
          )}
        </div>
      )}

      {!hasVoted && isClosed && (
        <div className="voting-closed-msg">
          <p>Voting is closed. You did not participate.</p>
        </div>
      )}

      {error && (
        <div className="voting-error">
          <p><AlertTriangle size={16} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '4px'}} /> {error}</p>
        </div>
      )}

      {/* ── Final Result Banner ─────────────────────── */}
      {proposalStatus !== 'active' && (
        <div className={`voting-result-banner ${proposalStatus === 'passed' ? 'passed' : 'rejected'}`}>
          <div className="voting-result-icon">
            {proposalStatus === 'passed' ? 'Passed' : 'Rejected'}
          </div>
          <div className="voting-result-text">
            <strong>
              {proposalStatus === 'passed' ? 'Proposal Passed' : 'Proposal Rejected'}
            </strong>
            <span> — {yesPercent}% approval</span>
          </div>
          {txHash && (
            <a
              href={`https://polygonscan.com/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="voting-tx-link"
            >
              View on Polygon
            </a>
          )}
        </div>
      )}
    </div>
  )
}
