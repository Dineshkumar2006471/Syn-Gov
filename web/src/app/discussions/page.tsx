'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { createClient } from '@/utils/supabase/client'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import BottomNav from "@/components/BottomNav"
import { postMessage } from '@/app/actions'

export default function Discussions() {
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [user, setUser] = useState<any>(null)
  const [dbUser, setDbUser] = useState<any>(null)
  const [activeChannel, setActiveChannel] = useState('general')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Initial fetch
  useEffect(() => {
    async function init() {
      // 1. Get logged in user
      const supabaseAuth = createClient()
      const { data: { user: authUser } } = await supabaseAuth.auth.getUser()
      
      if (authUser) {
        setUser(authUser)
        // fetch the profile mapping using authenticated client
        const { data: profile } = await supabaseAuth.from('users').select('*').eq('id', authUser.id).single()
        setDbUser(profile || { id: authUser.id, name: authUser.user_metadata?.full_name || authUser.email })
      }

      // 2. Fetch history
      const { data: history } = await supabase
        .from('discussions')
        .select('*, users!discussions_user_id_fkey(name)')
        .order('created_at', { ascending: true })

      if (history) {
        setMessages(history)
      }
    }
    init()
  }, [])

  // Auto-scroll
  useEffect(() => {
    scrollToBottom()
  }, [messages, activeChannel])

  // Realtime subscription
  useEffect(() => {
    const channelSub = supabase.channel('public:discussions')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'discussions' }, async (payload) => {
        // Fetch the user name for the new message
        const { data: userData } = await supabase.from('users').select('name').eq('id', payload.new.user_id).single()
        
        const newMessageWithUser: any = {
          ...payload.new,
          users: userData || { name: 'Unknown' }
        }
        
        setMessages(prev => {
          if (prev.some(m => m.id === newMessageWithUser.id)) return prev;
          return [...prev, newMessageWithUser];
        })
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channelSub)
    }
  }, [])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !dbUser) return

    const contentToSend = newMessage
    setNewMessage('') // Optimistic clear

    const result = await postMessage(dbUser.id, contentToSend, activeChannel)
    if (result.success && result.message) {
      const msgWithUser = {
        ...result.message,
        users: { name: dbUser.name }
      }
      setMessages(prev => {
        if (prev.some(m => m.id === msgWithUser.id)) return prev;
        return [...prev, msgWithUser];
      })
    }
  }

  const formatTime = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const filteredMessages = messages.filter(m => m.channel === activeChannel)

  return (
    <>
      <Navbar user={user ? { name: dbUser?.name || user.email, email: user.email } : null} />
      <div className="app-layout">
        <Sidebar user={user ? { name: dbUser?.name || user.email, email: user.email } : null} />
        <BottomNav />
        <main className="main-content" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', padding: '24px 24px 0 24px' }}>
          
          <div className="page-header" style={{ flexShrink: 0, marginBottom: '16px' }}>
            <h3 className="text-h3">💬 Community Discussions</h3>
            <p className="text-body-sm" style={{ color: 'var(--text-muted)' }}>Share ideas, ask questions, and debate proposals.</p>
          </div>

          <div className="card-flat" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0, background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border)' }}>
            
            {/* Channels Header */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--bg-card)' }}>
              {['general', 'proposals', 'ideas'].map(ch => (
                <button
                  key={ch}
                  onClick={() => setActiveChannel(ch)}
                  style={{
                    flex: 1, padding: '16px', background: 'none', border: 'none', cursor: 'pointer',
                    fontWeight: activeChannel === ch ? 700 : 500,
                    color: activeChannel === ch ? 'var(--accent)' : 'var(--text-muted)',
                    borderBottom: activeChannel === ch ? '2px solid var(--accent)' : '2px solid transparent',
                    textTransform: 'capitalize'
                  }}
                >
                  # {ch}
                </button>
              ))}
            </div>

            {/* Messages Area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredMessages.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: 'auto', marginBottom: 'auto' }}>
                  No messages in #{activeChannel} yet. Be the first to start the discussion!
                </div>
              ) : (
                filteredMessages.map((msg, i) => {
                  const isMe = dbUser && msg.user_id === dbUser.id
                  const authorName = (msg.users as any)?.name || 'Unknown User'
                  const initials = authorName.substring(0, 2).toUpperCase()

                  return (
                    <div key={msg.id || i} style={{ 
                      display: 'flex', 
                      flexDirection: isMe ? 'row-reverse' : 'row',
                      gap: '12px',
                      alignItems: 'flex-end'
                    }}>
                      {!isMe && (
                        <div style={{
                          width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent)',
                          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '0.75rem', fontWeight: 'bold', flexShrink: 0
                        }}>
                          {initials}
                        </div>
                      )}
                      <div style={{ maxWidth: '75%' }}>
                        {!isMe && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', marginLeft: '4px' }}>{authorName}</div>}
                        <div style={{
                          background: isMe ? 'var(--accent)' : 'rgba(255, 255, 255, 0.05)',
                          padding: '12px 16px',
                          borderRadius: isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                          color: isMe ? '#fff' : 'var(--text-primary)',
                          border: isMe ? 'none' : '1px solid var(--border)',
                          fontSize: '0.9375rem',
                          lineHeight: 1.5,
                          wordBreak: 'break-word'
                        }}>
                          {msg.content}
                        </div>
                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '4px', textAlign: isMe ? 'right' : 'left', marginRight: isMe ? '4px' : '0', marginLeft: !isMe ? '4px' : '0' }}>
                          {formatTime(msg.created_at)}
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div style={{ padding: '16px', borderTop: '1px solid var(--border)', background: 'var(--bg-card)' }}>
              {dbUser ? (
                <form onSubmit={handleSend} style={{ display: 'flex', gap: '12px' }}>
                  <input 
                    type="text" 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={`Message #${activeChannel}...`}
                    className="input"
                    style={{ flex: 1, padding: '12px 16px', borderRadius: '100px' }}
                  />
                  <button type="submit" disabled={!newMessage.trim()} className="btn btn-primary" style={{ borderRadius: '100px', padding: '0 24px' }}>
                    Send
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '8px 0' }}>
                  Please log in to participate in the discussion.
                </div>
              )}
            </div>

          </div>
        </main>
      </div>
    </>
  )
}
