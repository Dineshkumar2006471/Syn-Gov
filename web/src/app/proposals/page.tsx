import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import BottomNav from "@/components/BottomNav";
import ProposalCard from '@/components/ProposalCard'
import { supabase } from '@/lib/supabase'

export const revalidate = 0; // Disable static rendering

export default async function Proposals() {
  const { data: proposals, error } = await supabase
    .from('proposals')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <>
      <Navbar />
      <div className="app-layout">
        <Sidebar />
        <BottomNav />
        
        <main className="main-content">
          <div className="page-header">
            <div>
              <h1 className="text-h1">Proposals</h1>
              <p className="text-body-sm" style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                {proposals ? proposals.length : 24} total proposals
              </p>
            </div>
            <a href="/create-proposal" className="btn btn-primary">+ New Proposal</a>
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-sm" style={{ borderRadius: 'var(--radius-pill)' }}>All</button>
            <button className="btn btn-secondary btn-sm" style={{ borderRadius: 'var(--radius-pill)' }}>Active</button>
            <button className="btn btn-secondary btn-sm" style={{ borderRadius: 'var(--radius-pill)' }}>Passed</button>
            <button className="btn btn-secondary btn-sm" style={{ borderRadius: 'var(--radius-pill)' }}>Rejected</button>
            <button className="btn btn-secondary btn-sm" style={{ borderRadius: 'var(--radius-pill)' }}>Closed</button>
            <div style={{ flex: 1 }}></div>
            <input type="text" className="input" placeholder="Search proposals..." style={{ maxWidth: '280px', padding: '8px 16px', fontSize: '0.8125rem' }} />
          </div>

          <div className="proposals-grid">
            {error || !proposals || proposals.length === 0 ? (
               <>
                 <ProposalCard 
                   title="Allocate ₹20k for Annual Hackathon"
                   category="finance"
                   status="active"
                   weight="1.5x"
                   score={78}
                   author="Priya Patel"
                   authorAvatar="PP"
                   aiSummary={{what: "Requesting ₹20,000 for prizes and food for the upcoming 24-hour community hackathon."}}
                 />
                 <ProposalCard 
                   title="Migrate Club Website to Next.js"
                   category="tech"
                   status="active"
                   weight="1.2x"
                   score={42}
                   author="Rahul Kumar"
                   authorAvatar="RK"
                   aiSummary={{what: "Moving from the old WordPress site to a faster, modern Next.js 15 stack."}}
                 />
                 <ProposalCard 
                   title="Host Guest Speaker: AI in Governance"
                   category="events"
                   status="active"
                   weight="1.0x"
                   score={85}
                   author="Meera Reddy"
                   authorAvatar="MR"
                   aiSummary={{what: "Inviting a local startup founder to talk about AI and governance."}}
                 />
               </>
            ) : (
              proposals.map(p => (
                 <a key={p.id} href={`/proposals/${p.id}`} className="proposal-card">
                  <div className="proposal-card-badges">
                    <span className={`badge badge-${p.category || 'general'}`}>{p.category || 'general'}</span>
                    <span className={`badge badge-status-${p.status || 'active'}`}>{p.status || 'active'}</span>
                  </div>
                  <h4 className="proposal-card-title">{p.title}</h4>
                  <p className="proposal-card-summary">{p.ai_summary?.what || 'No summary available'}</p>
                  <div className="proposal-card-vote">
                    <div className="proposal-card-vote-header">
                      <span style={{color: 'var(--success)'}}>0 for</span>
                      <span style={{color: 'var(--danger)'}}>0 against</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-bar-for" style={{width: '0%'}}></div>
                      <div className="progress-bar-against" style={{width: '0%'}}></div>
                    </div>
                  </div>
                  <div className="proposal-card-meta">
                    <span>👥 0% participated</span>
                    <span>📅 Active</span>
                  </div>
                </a>
              ))
            )}
          </div>
        </main>
      </div>
    </>
  )
}
