'use server'

import { createClient } from '@/utils/supabase/server'

export async function login(email: string, password?: string) {
  const supabase = await createClient()

  // For signing in, we expect a password
  if (!password) {
    return { success: false, error: 'Password is required' }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("Login Error:", error.message)
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function signup(name: string, email: string, password?: string) {
  const supabase = await createClient()

  if (!password) {
    return { success: false, error: 'Password is required' }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name
      }
    }
  })

  if (error) {
    console.error("Signup Error:", error.message)
    return { success: false, error: error.message }
  }

  // If identities is empty, the user already exists with this email!
  if (data?.user?.identities?.length === 0) {
    return { success: false, error: 'An account with this email already exists. Please sign in.' }
  }

  return { success: true }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return { success: true }
}

export async function getUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  
  return {
    id: user.id,
    name: (user.user_metadata?.full_name || user.email || '') as string,
    email: (user.email || '') as string
  }
}
