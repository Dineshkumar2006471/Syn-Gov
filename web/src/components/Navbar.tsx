'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Navbar({ user }: { user?: { name: string, email: string } | null }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  
  const [localUser, setLocalUser] = useState<{ name: string, email: string } | null>(user || null)
  const [isLoadingUser, setIsLoadingUser] = useState(user === undefined)

  useEffect(() => {
    if (user === undefined) {
      import('@/app/auth-actions').then(m => m.getUser().then(u => {
        setLocalUser(u)
        setIsLoadingUser(false)
      }));
    } else {
      setLocalUser(user)
      setIsLoadingUser(false)
    }
  }, [user])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="navbar" style={{ boxShadow: scrolled ? '0 1px 8px rgba(0,0,0,0.06)' : 'none' }}>
      <div className="navbar-inner">
        <Link href="/" className="navbar-logo" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/images/syn-gov-logo.png" alt="SynGov Logo" style={{ height: '128px', width: 'auto' }} />
        </Link>

        <div className={`navbar-links ${mobileOpen ? 'mobile-open' : ''}`}>
          <Link href="/#features" className={`navbar-link ${pathname === '/#features' ? 'active' : ''}`}>Features</Link>
          <Link href="/#how-it-works" className={`navbar-link ${pathname === '/#how-it-works' ? 'active' : ''}`}>How It Works</Link>
          <Link href="/#stats" className={`navbar-link ${pathname === '/#stats' ? 'active' : ''}`}>Impact</Link>
          <Link href="/dashboard" className={`navbar-link ${pathname.includes('/dashboard') ? 'active' : ''}`}>Dashboard</Link>
        </div>

        <div className="navbar-actions">
          {isLoadingUser ? null : localUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{localUser.name}</span>
              <button onClick={async () => {
                const { logout } = await import('@/app/auth-actions')
                await logout()
                window.location.href = '/'
              }} className="btn btn-ghost btn-sm">Log Out</button>
            </div>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost btn-sm">Log In</Link>
              <Link href="/login" className="btn btn-primary btn-sm">Get Started</Link>
            </>
          )}
        </div>

        <div className={`nav-toggle ${mobileOpen ? 'active' : ''}`} onClick={() => setMobileOpen(!mobileOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  )
}
