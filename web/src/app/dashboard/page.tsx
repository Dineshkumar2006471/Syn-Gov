import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { supabase } from '@/lib/supabase'
import { getUser } from '@/app/auth-actions'

export const revalidate = 0;

export default async function Dashboard() {
  const user = await getUser()
  const displayName = user?.name || "Arjun Mehta"
  
  const { data: proposals, error } = await supabase
    .from('proposals')
    .select('*')
    .order('created_at', { ascending: false });
    
  const totalProposals = (proposals?.length || 0) + 24; // Base mock + real

  return (
    <>
      <Navbar user={user} />
      <div className="app-layout">
        <Sidebar user={user} />
        <main className="main-content">
          <div className="dashboard-header">
            <img src="/images/team-discussion.png" alt="Team collaboration" />
            <div className="dashboard-header-overlay">
              <div className="dashboard-header-text">
                <h2 className="text-h2">Good afternoon, {displayName.split(' ')[0]}</h2>
                <p className="text-body-sm">3 proposals need your vote · Community health is strong</p>
              </div>
            </div>
          </div>

          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-card-label">Total Proposals</div>
              <div className="stat-card-value" data-count={totalProposals}>{totalProposals}</div>
              <div className="stat-card-delta up">↑ 12% this month</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-label">Participation Rate</div>
              <div className="stat-card-value" data-count="78%">78%</div>
              <div className="stat-card-delta up">↑ 5% from last week</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-label">Active Votes</div>
              <div className="stat-card-value" data-count="6">6</div>
              <div className="stat-card-delta">3 closing soon</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-label">Your Score</div>
              <div className="stat-card-value" data-count="72">72</div>
              <div className="stat-card-delta up">↑ High contributor</div>
            </div>
          </div>

          <div className="page-header">
            <h3 className="text-h3">Active Proposals</h3>
            <a href="/proposals/create" className="btn btn-primary btn-sm">+ New Proposal</a>
          </div>

          <div className="proposals-grid mb-32">
              {proposals && proposals.map((p: any) => (
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
              ))}
                
                <a href="/proposals/1" className="proposal-card">
                  <div className="proposal-card-badges">
                    <span className="badge badge-finance">finance</span>
                    <span className="badge badge-risk-medium">medium risk</span>
                    <span className="badge badge-status-active">active</span>
                  </div>
                  <h4 className="proposal-card-title">Annual Hackathon Event Budget</h4>
                  <p className="proposal-card-summary">Allocate ₹20,000 for our annual hackathon covering venue, meals, prizes, and branding materials.</p>
                  <div className="proposal-card-vote">
                    <div className="proposal-card-vote-header">
                      <span style={{color: 'var(--success)'}}>18 for</span>
                      <span style={{color: 'var(--danger)'}}>4 against</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-bar-for" style={{width: '75%'}}></div>
                      <div className="progress-bar-against" style={{width: '17%'}}></div>
                    </div>
                  </div>
                  <div className="proposal-card-meta">
                    <span>👥 78% participated</span>
                    <span>📅 Closes Feb 15</span>
                    <span>💰 ₹20,000</span>
                  </div>
                </a>
                
                <a href="/proposals/2" className="proposal-card">
                  <div className="proposal-card-badges">
                    <span className="badge badge-tech">tech</span>
                    <span className="badge badge-risk-low">low risk</span>
                    <span className="badge badge-status-active">active</span>
                  </div>
                  <h4 className="proposal-card-title">Migrate Club Website to Next.js</h4>
                  <p className="proposal-card-summary">Proposal to rebuild the club website using Next.js 15 with App Router for better performance and SEO.</p>
                  <div className="proposal-card-vote">
                    <div className="proposal-card-vote-header">
                      <span style={{color: 'var(--success)'}}>22 for</span>
                      <span style={{color: 'var(--danger)'}}>2 against</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-bar-for" style={{width: '88%'}}></div>
                      <div className="progress-bar-against" style={{width: '8%'}}></div>
                    </div>
                  </div>
                  <div className="proposal-card-meta">
                    <span>👥 85% participated</span>
                    <span>📅 Closes Feb 20</span>
                  </div>
                </a>
          </div>

          <div className="page-header">
            <h3 className="text-h3">Recent Activity</h3>
          </div>

          <div className="card-flat">
            <div className="activity-feed">
              {proposals && proposals.map((p: any) => (
                <div key={p.id} className="activity-item">
                  <div className="activity-dot" style={{background: 'var(--accent)'}}></div>
                  <div>
                    <p className="text-body-sm"><strong>{displayName}</strong> created proposal <strong style={{color: 'var(--text-primary)'}}>"{p.title}"</strong></p>
                    <span className="activity-time">Just now</span>
                  </div>
                </div>
              ))}
              <div className="activity-item">
                <div className="activity-dot" style={{background: 'var(--accent)'}}></div>
                <div>
                  <p className="text-body-sm"><strong>Rahul Kumar</strong> created proposal "Inter-College Tech Symposium Partnership"</p>
                  <span className="activity-time">15 minutes ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot" style={{background: 'var(--danger)'}}></div>
                <div>
                  <p className="text-body-sm"><strong>Sneha Iyer</strong> voted <strong style={{color: 'var(--danger)'}}>against</strong> "Weekly Meeting Schedule Change"</p>
                  <span className="activity-time">1 hour ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot" style={{background: 'var(--success)'}}></div>
                <div>
                  <p className="text-body-sm"><strong>Vikram Singh</strong> voted <strong style={{color: 'var(--success)'}}>for</strong> "Migrate Club Website to Next.js"</p>
                  <span className="activity-time">2 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
