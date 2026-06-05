import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { getUser } from '@/app/auth-actions'

export default async function Members() {
  const user = await getUser()
  return (
    <>
      <Navbar user={user} />
      <div className="app-layout">
        <Sidebar user={user} />
        <main className="main-content">
          <div className="dashboard-header">
            <img src="/images/hero-collab.png" alt="Community members" />
            <div className="dashboard-header-overlay">
              <div className="dashboard-header-text">
                <h2 className="text-h2">Members Directory</h2>
                <p className="text-body-sm">32 members · 24 active contributors</p>
              </div>
            </div>
          </div>

          <div style={{display: 'flex', gap: '12px', marginBottom: '28px', flexWrap: 'wrap'}}>
            <button className="btn btn-primary btn-sm" style={{borderRadius: 'var(--radius-pill)'}}>All Members</button>
            <button className="btn btn-secondary btn-sm" style={{borderRadius: 'var(--radius-pill)'}}>Core</button>
            <button className="btn btn-secondary btn-sm" style={{borderRadius: 'var(--radius-pill)'}}>High</button>
            <button className="btn btn-secondary btn-sm" style={{borderRadius: 'var(--radius-pill)'}}>Medium</button>
            <button className="btn btn-secondary btn-sm" style={{borderRadius: 'var(--radius-pill)'}}>Low</button>
            <div style={{flex: 1}}></div>
            <input type="text" className="input" placeholder="Search members..." style={{maxWidth: '260px', padding: '8px 16px', fontSize: '0.8125rem'}} />
          </div>

          <div className="members-grid">
            <div className="member-card">
              <div className="member-avatar" style={{background: 'var(--accent)', color: '#fff'}}>AS</div>
              <div className="member-name">Ananya Sharma</div>
              <div className="member-role">President · <span className="badge badge-status-active" style={{fontSize: '0.6875rem'}}>core</span></div>
              <div className="member-stats">
                <div className="member-stat">
                  <div className="member-stat-value">92</div>
                  <div className="member-stat-label">Score</div>
                </div>
                <div className="member-stat">
                  <div className="member-stat-value">1.5×</div>
                  <div className="member-stat-label">Weight</div>
                </div>
                <div className="member-stat">
                  <div className="member-stat-value">18</div>
                  <div className="member-stat-label">Votes</div>
                </div>
              </div>
              <div className="member-tags">
                <span className="member-tag">finance</span>
                <span className="member-tag">events</span>
                <span className="member-tag">tech</span>
              </div>
            </div>

            <div className="member-card">
              <div className="member-avatar">RK</div>
              <div className="member-name">Rahul Kumar</div>
              <div className="member-role">Tech Lead · <span className="badge badge-status-active" style={{fontSize: '0.6875rem'}}>core</span></div>
              <div className="member-stats">
                <div className="member-stat">
                  <div className="member-stat-value">85</div>
                  <div className="member-stat-label">Score</div>
                </div>
                <div className="member-stat">
                  <div className="member-stat-value">1.5×</div>
                  <div className="member-stat-label">Weight</div>
                </div>
                <div className="member-stat">
                  <div className="member-stat-value">16</div>
                  <div className="member-stat-label">Votes</div>
                </div>
              </div>
              <div className="member-tags">
                <span className="member-tag">tech</span>
                <span className="member-tag">operations</span>
              </div>
            </div>

            <div className="member-card">
              <div className="member-avatar" style={{background: '#E0E7FF', color: '#4338CA'}}>AM</div>
              <div className="member-name">Arjun Mehta</div>
              <div className="member-role">Member · <span className="badge" style={{fontSize: '0.6875rem', background: '#DBEAFE', color: '#1D4ED8'}}>high</span></div>
              <div className="member-stats">
                <div className="member-stat">
                  <div className="member-stat-value">72</div>
                  <div className="member-stat-label">Score</div>
                </div>
                <div className="member-stat">
                  <div className="member-stat-value">1.2×</div>
                  <div className="member-stat-label">Weight</div>
                </div>
                <div className="member-stat">
                  <div className="member-stat-value">14</div>
                  <div className="member-stat-label">Votes</div>
                </div>
              </div>
              <div className="member-tags">
                <span className="member-tag">finance</span>
                <span className="member-tag">tech</span>
              </div>
            </div>

            <div className="member-card">
              <div className="member-avatar" style={{background: '#FCE7F3', color: '#BE185D'}}>PP</div>
              <div className="member-name">Priya Patel</div>
              <div className="member-role">Treasurer · <span className="badge" style={{fontSize: '0.6875rem', background: '#DBEAFE', color: '#1D4ED8'}}>high</span></div>
              <div className="member-stats">
                <div className="member-stat">
                  <div className="member-stat-value">68</div>
                  <div className="member-stat-label">Score</div>
                </div>
                <div className="member-stat">
                  <div className="member-stat-value">1.2×</div>
                  <div className="member-stat-label">Weight</div>
                </div>
                <div className="member-stat">
                  <div className="member-stat-value">12</div>
                  <div className="member-stat-label">Votes</div>
                </div>
              </div>
              <div className="member-tags">
                <span className="member-tag">finance</span>
              </div>
            </div>

            <div className="member-card">
              <div className="member-avatar" style={{background: '#FEF3C7', color: '#B45309'}}>VS</div>
              <div className="member-name">Vikram Singh</div>
              <div className="member-role">Member · <span className="badge" style={{fontSize: '0.6875rem', background: '#FEF3C7', color: '#B45309'}}>medium</span></div>
              <div className="member-stats">
                <div className="member-stat">
                  <div className="member-stat-value">42</div>
                  <div className="member-stat-label">Score</div>
                </div>
                <div className="member-stat">
                  <div className="member-stat-value">1.0×</div>
                  <div className="member-stat-label">Weight</div>
                </div>
                <div className="member-stat">
                  <div className="member-stat-value">8</div>
                  <div className="member-stat-label">Votes</div>
                </div>
              </div>
              <div className="member-tags">
                <span className="member-tag">events</span>
                <span className="member-tag">tech</span>
              </div>
            </div>

            <div className="member-card">
              <div className="member-avatar" style={{background: '#E0F2FE', color: '#0369A1'}}>SI</div>
              <div className="member-name">Sneha Iyer</div>
              <div className="member-role">Secretary · <span className="badge" style={{fontSize: '0.6875rem', background: '#FEF3C7', color: '#B45309'}}>medium</span></div>
              <div className="member-stats">
                <div className="member-stat">
                  <div className="member-stat-value">38</div>
                  <div className="member-stat-label">Score</div>
                </div>
                <div className="member-stat">
                  <div className="member-stat-value">1.0×</div>
                  <div className="member-stat-label">Weight</div>
                </div>
                <div className="member-stat">
                  <div className="member-stat-value">10</div>
                  <div className="member-stat-label">Votes</div>
                </div>
              </div>
              <div className="member-tags">
                <span className="member-tag">operations</span>
                <span className="member-tag">general</span>
              </div>
            </div>

            <div className="member-card">
              <div className="member-avatar" style={{background: '#F3E8FF', color: '#7C3AED'}}>NK</div>
              <div className="member-name">Neha Kapoor</div>
              <div className="member-role">Member · <span className="badge" style={{fontSize: '0.6875rem', background: '#FEE2E2', color: '#991B1B'}}>low</span></div>
              <div className="member-stats">
                <div className="member-stat">
                  <div className="member-stat-value">12</div>
                  <div className="member-stat-label">Score</div>
                </div>
                <div className="member-stat">
                  <div className="member-stat-value">1.0×</div>
                  <div className="member-stat-label">Weight</div>
                </div>
                <div className="member-stat">
                  <div className="member-stat-value">3</div>
                  <div className="member-stat-label">Votes</div>
                </div>
              </div>
              <div className="member-tags">
                <span className="member-tag">events</span>
              </div>
            </div>

            <div className="member-card">
              <div className="member-avatar" style={{background: '#ECFDF5', color: '#059669'}}>DG</div>
              <div className="member-name">Dev Gupta</div>
              <div className="member-role">New Member · <span className="badge" style={{fontSize: '0.6875rem', background: '#FEE2E2', color: '#991B1B'}}>low</span></div>
              <div className="member-stats">
                <div className="member-stat">
                  <div className="member-stat-value">5</div>
                  <div className="member-stat-label">Score</div>
                </div>
                <div className="member-stat">
                  <div className="member-stat-value">1.0×</div>
                  <div className="member-stat-label">Weight</div>
                </div>
                <div className="member-stat">
                  <div className="member-stat-value">1</div>
                  <div className="member-stat-label">Votes</div>
                </div>
              </div>
              <div className="member-tags">
                <span className="member-tag">tech</span>
              </div>
            </div>

            <div className="member-card">
              <div className="member-avatar" style={{background: '#FFF7ED', color: '#C2410C'}}>MR</div>
              <div className="member-name">Meera Reddy</div>
              <div className="member-role">Events Head · <span className="badge badge-status-active" style={{fontSize: '0.6875rem'}}>core</span></div>
              <div className="member-stats">
                <div className="member-stat">
                  <div className="member-stat-value">88</div>
                  <div className="member-stat-label">Score</div>
                </div>
                <div className="member-stat">
                  <div className="member-stat-value">1.5×</div>
                  <div className="member-stat-label">Weight</div>
                </div>
                <div className="member-stat">
                  <div className="member-stat-value">15</div>
                  <div className="member-stat-label">Votes</div>
                </div>
              </div>
              <div className="member-tags">
                <span className="member-tag">events</span>
                <span className="member-tag">finance</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
