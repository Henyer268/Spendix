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

export async function createAssignment(courseId, title, description, due_date) {
  const { error } = await supabase
    .from('assignments')
    .insert({
      course_id: courseId,
      title,
      description,
      due_date: due_date || null
    })

  return { error }
}