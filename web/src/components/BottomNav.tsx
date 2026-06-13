'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FileText, Pencil, TrendingUp, Users, User, Activity } from 'lucide-react'

export default function BottomNav() {
  const pathname = usePathname()
  
  return (
    <nav className="bottom-nav">
      <Link href="/dashboard" className={`bottom-nav-link ${pathname === '/dashboard' ? 'active' : ''}`}>
        <LayoutDashboard className="bottom-nav-icon" size={20} />
        <span className="bottom-nav-label">Home</span>
      </Link>
      <Link href="/proposals" className={`bottom-nav-link ${pathname === '/proposals' ? 'active' : ''}`}>
        <FileText className="bottom-nav-icon" size={20} />
        <span className="bottom-nav-label">Proposals</span>
      </Link>
      <Link href="/create-proposal" className={`bottom-nav-link ${pathname === '/create-proposal' ? 'active' : ''}`}>
        <div className="bottom-nav-fab">
          <Pencil className="bottom-nav-icon" size={20} style={{ color: 'white' }} />
        </div>
      </Link>
      <Link href="/recent-activity" className={`bottom-nav-link ${pathname === '/recent-activity' ? 'active' : ''}`}>
        <Activity className="bottom-nav-icon" size={20} />
        <span className="bottom-nav-label">Activity</span>
      </Link>
      <Link href="/members" className={`bottom-nav-link ${pathname === '/members' ? 'active' : ''}`}>
        <Users className="bottom-nav-icon" size={20} />
        <span className="bottom-nav-label">Members</span>
      </Link>
      <Link href="/profile" className={`bottom-nav-link ${pathname === '/profile' ? 'active' : ''}`}>
        <User className="bottom-nav-icon" size={20} />
        <span className="bottom-nav-label">Profile</span>
      </Link>
    </nav>
  )
}
