import { supabase } from '../supabase.js'

export async function getAssignment(assignmentId) {
  const { data } = await supabase
    .from('assignments')
    .select('*')
    .eq('id', assignmentId)
    .single()

  return data
}

export async function getSubmission(assignmentId, studentId) {
  const { data } = await supabase
    .from('submissions')
    .select('*')
    .eq('assignment_id', assignmentId)
    .eq('student_id', studentId)
    .single()

  return data
}

export async function submitAssignment(assignmentId, studentId, file) {
  let file_url = null

  if (file) {
    const fileName = `${studentId}/${assignmentId}/${file.name}`
    const { error: uploadError } = await supabase.storage
      .from('submissions')
      .upload(fileName, file, { upsert: true })

    if (uploadError) return { error: uploadError }

    const { data: urlData } = supabase.storage
      .from('submissions')
      .getPublicUrl(fileName)

    file_url = urlData.publicUrl
  }

  const { error } = await supabase
    .from('submissions')
    .insert({ assignment_id: assignmentId, student_id: studentId, file_url })

  return { error }
}