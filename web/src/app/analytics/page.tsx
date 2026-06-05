import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import BottomNav from "@/components/BottomNav";
import { supabase } from '@/lib/supabase'
import { getUser } from '@/app/auth-actions'

export const revalidate = 0;

export default async function Analytics() {
  const user = await getUser()
  
  const { data: proposals, error } = await supabase
    .from('proposals')
    .select('*')
    
  // Calculate dynamic stats based on real proposals
  const realCount = proposals?.length || 0;
  const totalProposals = realCount + 24; // Mock + Real
  
  // Fake some pass/reject metrics for the mock base
  const passedProposals = Math.floor(totalProposals * 0.67);
  const rejectedProposals = Math.floor(totalProposals * 0.21);
  const pendingProposals = totalProposals - passedProposals - rejectedProposals;
  
  const passRate = Math.round((passedProposals / totalProposals) * 100);
  const rejectRate = Math.round((rejectedProposals / totalProposals) * 100);
  
  // Categorization
  const categories = { finance: 8, events: 6, tech: 5, operations: 3, general: 2 };
  if (proposals) {
    proposals.forEach(p => {
      const cat = p.category as keyof typeof categories;
      if (categories[cat] !== undefined) {
        categories[cat]++;
      } else {
        categories.general++;
      }
    });
  }

  return (
    <>
      <Navbar user={user} />
      <div className="app-layout">
        <Sidebar user={user} />
        <BottomNav />
        <main className="main-content">
          <div className="dashboard-header">
            <img src="/images/community-celebration.png" alt="Community analytics" />
            <div className="dashboard-header-overlay">
              <div className="dashboard-header-text">
                <h2 className="text-h2">Community Analytics</h2>
                <p className="text-body-sm">Governance health metrics and participation insights</p>
              </div>
            </div>
          </div>

          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-card-label">Total Proposals</div>
              <div className="stat-card-value" data-count={totalProposals}>{totalProposals}</div>
              <div className="stat-card-delta up">↑ {8 + realCount} this month</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-label">Passed</div>
              <div className="stat-card-value" data-count={passedProposals}>{passedProposals}</div>
              <div className="stat-card-delta" style={{color: 'var(--success)'}}>{passRate}% pass rate</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-label">Rejected</div>
              <div className="stat-card-value" data-count={rejectedProposals}>{rejectedProposals}</div>
              <div className="stat-card-delta" style={{color: 'var(--danger)'}}>{rejectRate}% reject rate</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-label">Health Score</div>
              <div className="stat-card-value" data-count="82">82</div>
              <div className="stat-card-delta up">↑ Strong</div>
            </div>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px'}}>
            <div className="chart-card">
              <div className="chart-header">
                <h3 className="text-h4">Proposals by Category</h3>
              </div>
              <div className="bar-chart">
                <div className="bar-group">
                  <div className="bar" style={{height: `${categories.finance * 20}px`, maxHeight: '180px', background: 'var(--cat-finance)'}}></div>
                  <div className="bar-label">Finance</div>
                  <div className="text-data" style={{fontSize: '0.75rem'}}>{categories.finance}</div>
                </div>
                <div className="bar-group">
                  <div className="bar" style={{height: `${categories.events * 20}px`, maxHeight: '180px', background: 'var(--cat-events)'}}></div>
                  <div className="bar-label">Events</div>
                  <div className="text-data" style={{fontSize: '0.75rem'}}>{categories.events}</div>
                </div>
                <div className="bar-group">
                  <div className="bar" style={{height: `${categories.tech * 20}px`, maxHeight: '180px', background: 'var(--cat-tech)'}}></div>
                  <div className="bar-label">Tech</div>
                  <div className="text-data" style={{fontSize: '0.75rem'}}>{categories.tech}</div>
                </div>
                <div className="bar-group">
                  <div className="bar" style={{height: `${categories.operations * 20}px`, maxHeight: '180px', background: 'var(--cat-operations)'}}></div>
                  <div className="bar-label">Ops</div>
                  <div className="text-data" style={{fontSize: '0.75rem'}}>{categories.operations}</div>
                </div>
                <div className="bar-group">
                  <div className="bar" style={{height: `${categories.general * 20}px`, maxHeight: '180px', background: 'var(--cat-general)'}}></div>
                  <div className="bar-label">General</div>
                  <div className="text-data" style={{fontSize: '0.75rem'}}>{categories.general}</div>
                </div>
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h3 className="text-h4">Participation Rate Trend</h3>
              </div>
              <div className="bar-chart">
                <div className="bar-group">
                  <div className="bar" style={{height: '100px', background: 'var(--accent-muted)'}}></div>
                  <div className="bar-label">Oct</div>
                  <div className="text-data" style={{fontSize: '0.75rem'}}>58%</div>
                </div>
                <div className="bar-group">
                  <div className="bar" style={{height: '120px', background: 'var(--accent-muted)'}}></div>
                  <div className="bar-label">Nov</div>
                  <div className="text-data" style={{fontSize: '0.75rem'}}>65%</div>
                </div>
                <div className="bar-group">
                  <div className="bar" style={{height: '140px', background: 'var(--accent-muted)'}}></div>
                  <div className="bar-label">Dec</div>
                  <div className="text-data" style={{fontSize: '0.75rem'}}>72%</div>
                </div>
                <div className="bar-group">
                  <div className="bar" style={{height: '150px', background: 'var(--accent)'}}></div>
                  <div className="bar-label">Jan</div>
                  <div className="text-data" style={{fontSize: '0.75rem'}}>78%</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px'}}>
            <div className="chart-card">
              <div className="chart-header">
                <h3 className="text-h4">Proposal Outcomes</h3>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '32px', padding: '20px 0'}}>
                <div className="donut-chart" style={{background: `conic-gradient(var(--success) 0% ${passRate}%, var(--danger) ${passRate}% ${passRate + rejectRate}%, var(--text-subtle) ${passRate + rejectRate}% 100%)`}}>
                  <div className="donut-center">
                    <div className="text-data" style={{fontSize: '1.5rem', color: 'var(--text-primary)'}}>{passRate}%</div>
                    <div className="text-caption" style={{color: 'var(--text-muted)'}}>pass rate</div>
                  </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <div style={{width: '12px', height: '12px', borderRadius: '3px', background: 'var(--success)'}}></div>
                    <div>
                      <div className="text-body-sm" style={{fontWeight: 600}}>{passedProposals} Passed</div>
                      <div className="text-caption" style={{color: 'var(--text-muted)'}}>{passRate}% of total</div>
                    </div>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <div style={{width: '12px', height: '12px', borderRadius: '3px', background: 'var(--danger)'}}></div>
                    <div>
                      <div className="text-body-sm" style={{fontWeight: 600}}>{rejectedProposals} Rejected</div>
                      <div className="text-caption" style={{color: 'var(--text-muted)'}}>{rejectRate}% of total</div>
                    </div>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <div style={{width: '12px', height: '12px', borderRadius: '3px', background: 'var(--text-subtle)'}}></div>
                    <div>
                      <div className="text-body-sm" style={{fontWeight: 600}}>{pendingProposals} Pending</div>
                      <div className="text-caption" style={{color: 'var(--text-muted)'}}>{100 - passRate - rejectRate}% of total</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h3 className="text-h4">Community Health</h3>
                <span className="badge badge-status-active">Score: 82</span>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '20px', padding: '8px 0'}}>
                <div>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '6px'}}>
                    <span className="text-body-sm" style={{fontWeight: 500}}>Participation</span>
                    <span className="text-data" style={{fontSize: '0.75rem', color: 'var(--success)'}}>78%</span>
                  </div>
                  <div className="progress-bar" style={{height: '6px'}}>
                    <div className="progress-bar-for" style={{width: '78%'}}></div>
                  </div>
                </div>
                <div>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '6px'}}>
                    <span className="text-body-sm" style={{fontWeight: 500}}>Proposal Activity</span>
                    <span className="text-data" style={{fontSize: '0.75rem', color: 'var(--accent)'}}>85%</span>
                  </div>
                  <div className="progress-bar" style={{height: '6px'}}>
                    <div style={{width: '85%', background: 'var(--accent)', borderRadius: 'inherit'}}></div>
                  </div>
                </div>
                <div>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '6px'}}>
                    <span className="text-body-sm" style={{fontWeight: 500}}>Vote Distribution</span>
                    <span className="text-data" style={{fontSize: '0.75rem', color: 'var(--warning)'}}>72%</span>
                  </div>
                  <div className="progress-bar" style={{height: '6px'}}>
                    <div style={{width: '72%', background: 'var(--warning)', borderRadius: 'inherit'}}></div>
                  </div>
                </div>
                <div>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '6px'}}>
                    <span className="text-body-sm" style={{fontWeight: 500}}>Member Engagement</span>
                    <span className="text-data" style={{fontSize: '0.75rem', color: 'var(--success)'}}>90%</span>
                  </div>
                  <div className="progress-bar" style={{height: '6px'}}>
                    <div className="progress-bar-for" style={{width: '90%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
