'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { LayoutDashboard, FileText, Pencil, MessageSquare, TrendingUp, Users, User, Activity } from 'lucide-react'

export default function Sidebar({ user }: { user?: { name: string, email: string } | null }) {
  const pathname = usePathname()
  
  const [localUser, setLocalUser] = useState<{ name: string, email: string } | null>(user || null)

  useEffect(() => {
    if (user === undefined) {
      import('@/app/auth-actions').then(m => m.getUser().then(u => setLocalUser(u)));
    } else {
      setLocalUser(user)
    }
  }, [user])
  
  const displayName = localUser?.name || ""
  
  // First letter of first name + last letter of last name
  let initials = ""
  if (displayName) {
    const parts = displayName.trim().split(' ')
    if (parts.length === 1) {
      const name = parts[0]
      initials = name.length > 1 ? (name[0] + name[name.length - 1]).toUpperCase() : name[0].toUpperCase()
    } else {
      const first = parts[0]
      const last = parts[parts.length - 1]
      initials = (first[0] + last[last.length - 1]).toUpperCase()
    }
  }

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <Link href="/dashboard" className={`sidebar-link ${pathname === '/dashboard' ? 'active' : ''}`}>
          <LayoutDashboard className="sidebar-icon" size={18} /> Dashboard
        </Link>
        <Link href="/recent-activity" className={`sidebar-link ${pathname === '/recent-activity' ? 'active' : ''}`}>
          <Activity className="sidebar-icon" size={18} /> Recent Activity
        </Link>
        <Link href="/proposals" className={`sidebar-link ${pathname === '/proposals' ? 'active' : ''}`}>
          <FileText className="sidebar-icon" size={18} /> Proposals
        </Link>
        <Link href="/create-proposal" className={`sidebar-link ${pathname === '/create-proposal' ? 'active' : ''}`}>
          <Pencil className="sidebar-icon" size={18} /> New Proposal
        </Link>
        <Link href="/discussions" className={`sidebar-link ${pathname === '/discussions' ? 'active' : ''}`}>
          <MessageSquare className="sidebar-icon" size={18} /> Discussions
        </Link>
        <Link href="/analytics" className={`sidebar-link ${pathname === '/analytics' ? 'active' : ''}`}>
          <TrendingUp className="sidebar-icon" size={18} /> Analytics
        </Link>
        <Link href="/members" className={`sidebar-link ${pathname === '/members' ? 'active' : ''}`}>
          <Users className="sidebar-icon" size={18} /> Members
        </Link>
        <Link href="/profile" className={`sidebar-link ${pathname === '/profile' ? 'active' : ''}`}>
          <User className="sidebar-icon" size={18} /> Profile
        </Link>
      </nav>
      
      {localUser && (
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">{initials}</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{displayName}</div>
            <div className="sidebar-user-score">Score: 72 · 1.2× weight</div>
          </div>
        </div>
      )}
    </aside>
  )
}
