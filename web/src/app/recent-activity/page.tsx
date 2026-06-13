import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import BottomNav from "@/components/BottomNav"
import { supabase } from '@/lib/supabase'
import { getUser } from '@/app/auth-actions'
import RecentActivityClient from './recent-activity-client'

export const revalidate = 0;

export default async function RecentActivityPage() {
  const user = await getUser()

  // Fetch all votes with related user and proposal info
  const { data: votes, error } = await supabase
    .from('votes')
    .select(`
      id,
      vote_type,
      final_weight,
      created_at,
      users ( name, expertise_tags ),
      proposals ( id, title, category )
    `)
    .order('created_at', { ascending: false })

  const safeVotes = votes || [];

  return (
    <>
      <Navbar user={user} />
      <div className="app-layout">
        <Sidebar user={user} />
        <BottomNav />
        <main className="main-content">
          <div className="page-header">
            <div>
              <h1 className="text-h1">Recent Activity</h1>
              <p className="text-body-sm" style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                Transparent global voting feed. See who voted on what and analyze domain participation.
              </p>
            </div>
          </div>
          
          <RecentActivityClient votes={safeVotes} />
        </main>
      </div>
    </>
  )
}
