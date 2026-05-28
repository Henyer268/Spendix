import { supabase } from '../supabase.js'

export async function getEnrolledCourses(studentId) {
  const { data, error } = await supabase
    .from('enrollments')
    .select('*, courses(*)')
    .eq('student_id', studentId)
    .order('joined_at', { ascending: false })

  if (error) return []
  return data
}

export async function joinCourse(code, studentId) {
  // Buscar curso por código
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .select('id')
    .eq('code', code)
    .single()

  if (courseError || !course) return { error: { message: 'Código inválido' } }

  // Inscribir estudiante
  const { error } = await supabase
    .from('enrollments')
    .insert({ student_id: studentId, course_id: course.id })

  if (error) {
    if (error.code === '23505') return { error: { message: 'Ya estás inscrito en este curso' } }
    return { error }
  }

  return { error: null }
}