import { supabase } from './supabase.js'

export async function register(fullName, email, password, role) {
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) return { error }

  const { error: profileError } = await supabase
    .from('profiles')
    .insert({ id: data.user.id, full_name: fullName, role })

  if (profileError) return { error: profileError }
  return { user: data.user, role }
}

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single()

  return { user: data.user, role: profile.role }
}

export async function logout() {
  await supabase.auth.signOut()
  window.location.href = '/index.html'
}

export async function getProfile() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return profile
}

export function redirectByRole(role) {
  if (role === 'teacher') window.location.href = '/teacher/dashboard.html'
  else window.location.href = '/student/dashboard.html'
}