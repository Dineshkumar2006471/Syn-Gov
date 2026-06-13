import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = await cookies()
  const userCookie = cookieStore.get('syngov_user')
  
  if (userCookie) {
    try {
      const user = JSON.parse(userCookie.value)
      return NextResponse.json(user)
    } catch (e) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
    }
  }
  return NextResponse.json({ error: 'Not logged in' }, { status: 401 })
}
