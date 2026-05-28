import { supabase } from '../supabase.js'

export async function getCourse(courseId) {
  const { data } = await supabase
    .from('courses')
    .select('*')
    .eq('id', courseId)
    .single()

  return data
}

export async function getAssignments(courseId) {
  const { data, error } = await supabase
    .from('assignments')
    .select('*')
    .eq('course_id', courseId)
    .order('created_at', { ascending: false })

  if (error) return []
  return data
}