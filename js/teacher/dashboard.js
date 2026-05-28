import { supabase } from '../supabase.js'

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export async function getCourses(teacherId) {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('teacher_id', teacherId)
    .order('created_at', { ascending: false })

  if (error) return []
  return data
}

export async function createCourse(name, teacherId) {
  const code = generateCode()

  const { error } = await supabase
    .from('courses')
    .insert({ name, teacher_id: teacherId, code })

  return { error }
}