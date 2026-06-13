'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { supabase as supabaseAdmin } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import BottomNav from "@/components/BottomNav"
import { updateUserTags } from '@/app/actions'

const AVAILABLE_TAGS = ['finance', 'tech', 'events', 'operations']

export default function Profile() {
  const [userProfile, setUserProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function fetchUser() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabaseAdmin
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single()
        
        if (profile) {
          setUserProfile(profile)
          setSelectedTags(profile.expertise_tags || [])
        }
      }
      setLoading(false)
    }
    fetchUser()
  }, [])

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleSave = async () => {
    if (!userProfile) return
    setSaving(true)
    setMessage('')
    
    const res = await updateUserTags(userProfile.id, selectedTags)
    if (res.success) {
      setMessage('Profile updated successfully! Your Expertise matches are now active.')
    } else {
      setMessage('Failed to update profile: ' + res.error)
    }
    setSaving(false)
  }

  const getInitials = (name: string) => {
    return name ? name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : 'ME'
  }

  if (loading) {
    return (
      <>
        <Navbar user={userProfile} />
        <div className="app-layout">
          <Sidebar user={userProfile} />
          <BottomNav />
          <main className="main-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <span className="loading-spinner"></span>
          </main>
        </div>
      </>
    )
  }

  if (!userProfile) {
    return (
      <>
        <Navbar user={null} />
        <div className="app-layout">
          <Sidebar user={null} />
          <BottomNav />
          <main className="main-content">
            <div className="card-flat" style={{ textAlign: 'center', padding: '60px 20px' }}>
              <h2 className="text-h3 mb-16">Not Logged In</h2>
              <p className="text-body text-muted">Please log in to view and edit your profile.</p>
            </div>
          </main>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar user={userProfile} />
      <div className="app-layout">
        <Sidebar user={userProfile} />
        <BottomNav />
        <main className="main-content">
          <div className="dashboard-header mb-32">
            <img src="/images/hero-collab.png" alt="Profile" />
            <div className="dashboard-header-overlay">
              <div className="dashboard-header-text">
                <h2 className="text-h2">My Profile</h2>
                <p className="text-body-sm">Manage your governance identity</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {/* Identity Card */}
            <div className="card-flat">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ 
                  width: '64px', height: '64px', borderRadius: '50%', 
                  background: 'var(--accent)', color: 'white', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', fontWeight: 600
                }}>
                  {getInitials(userProfile.name)}
                </div>
                <div>
                  <h3 className="text-h4">{userProfile.name}</h3>
                  <div className="text-body-sm text-muted">{userProfile.email}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '24px', padding: '16px', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                <div>
                  <div className="text-caption text-muted">Contribution Score</div>
                  <div className="text-h3" style={{ color: 'var(--accent)' }}>{userProfile.contribution_score} pts</div>
                </div>
                <div>
                  <div className="text-caption text-muted">Voting Weight</div>
                  <div className="text-h3">{userProfile.governance_weight.toFixed(2)}x</div>
                </div>
              </div>
            </div>

            {/* Expertise Tags */}
            <div className="card-flat">
              <h3 className="text-h4 mb-8">Domain Expertise</h3>
              <p className="text-body-sm text-muted mb-20">
                Select the areas where you have specialized knowledge. When you vote on proposals in these categories, you will receive a +0.20x Expert Bonus to your voting weight.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
                {AVAILABLE_TAGS.map(tag => {
                  const isSelected = selectedTags.includes(tag)
                  return (
                    <button 
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        border: `1px solid ${isSelected ? 'var(--accent)' : 'var(--border)'}`,
                        background: isSelected ? 'var(--accent-light)' : 'transparent',
                        color: isSelected ? 'var(--accent)' : 'var(--text-secondary)',
                        fontWeight: isSelected ? 600 : 400,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        textTransform: 'capitalize'
                      }}
                    >
                      {isSelected ? '✓ ' : ''}{tag}
                    </button>
                  )
                })}
              </div>

              <button 
                className="btn btn-primary" 
                onClick={handleSave} 
                disabled={saving}
                style={{ width: '100%' }}
              >
                {saving ? 'Saving...' : 'Save Profile Details'}
              </button>

              {message && (
                <div style={{ 
                  marginTop: '16px', 
                  padding: '12px', 
                  borderRadius: '8px', 
                  background: message.includes('Failed') ? '#FEE2E2' : '#DCFCE7',
                  color: message.includes('Failed') ? '#991B1B' : '#166534',
                  fontSize: '0.875rem'
                }}>
                  {message}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
