'use server'

import { cookies } from 'next/headers'

export async function login(name: string, email: string) {
  const cookieStore = await cookies()
  cookieStore.set('syngov_user', JSON.stringify({ name, email }), { 
    maxAge: 60 * 60 * 24 * 7, // 1 week
    httpOnly: true,
    path: '/',
  })
  return { success: true }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('syngov_user')
  return { success: true }
}

export async function getUser() {
  const cookieStore = await cookies()
  const userCookie = cookieStore.get('syngov_user')
  
  if (userCookie) {
    try {
      return JSON.parse(userCookie.value)
    } catch (e) {
      return null
    }
  }
  return null
}
