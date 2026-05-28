import { supabase } from '../supabase.js'

export async function getAssignment(assignmentId) {
  const { data } = await supabase
    .from('assignments')
    .select('*')
    .eq('id', assignmentId)
    .single()

  return data
}

export async function getSubmissions(assignmentId) {
  const { data, error } = await supabase
    .from('submissions')
    .select('*, profiles(full_name)')
    .eq('assignment_id', assignmentId)
    .order('submitted_at', { ascending: false })

  if (error) return []
  return data
}

export async function gradeSubmission(submissionId, grade, feedback) {
  const { error } = await supabase
    .from('submissions')
    .update({ grade, feedback })
    .eq('id', submissionId)

  return { error }
}