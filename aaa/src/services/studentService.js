import { supabase } from '../lib/supabase';

export const studentService = {
  // Get all students
  async getAllStudents() {
    try {
      const { data, error } = await supabase?.from('students')?.select('*')?.order('name', { ascending: true })

      if (error) throw error
      return { data: data || [], error: null }
    } catch (error) {
      return { data: [], error: error?.message };
    }
  },

  // Get students by department
  async getStudentsByDepartment(department) {
    try {
      const { data, error } = await supabase?.from('students')?.select('*')?.eq('department', department)?.order('name', { ascending: true })

      if (error) throw error
      return { data: data || [], error: null }
    } catch (error) {
      return { data: [], error: error?.message };
    }
  },

  // Get student by ID
  async getStudentById(id) {
    try {
      const { data, error } = await supabase?.from('students')?.select('*')?.eq('id', id)?.single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error?.message };
    }
  },

  // Create new student
  async createStudent(studentData) {
    try {
      const { data, error } = await supabase?.from('students')?.insert([{
          name: studentData?.name,
          roll_no: studentData?.roll_no,
          department: studentData?.department,
          year: studentData?.year
        }])?.select()

      if (error) throw error
      return { data: data?.[0], error: null }
    } catch (error) {
      return { data: null, error: error?.message };
    }
  },

  // Update student
  async updateStudent(id, studentData) {
    try {
      const { data, error } = await supabase?.from('students')?.update({
          name: studentData?.name,
          roll_no: studentData?.roll_no,
          department: studentData?.department,
          year: studentData?.year
        })?.eq('id', id)?.select()

      if (error) throw error
      return { data: data?.[0], error: null }
    } catch (error) {
      return { data: null, error: error?.message };
    }
  },

  // Delete student
  async deleteStudent(id) {
    try {
      const { error } = await supabase?.from('students')?.delete()?.eq('id', id)

      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error: error?.message };
    }
  },

  // Get unique departments
  async getDepartments() {
    try {
      const { data, error } = await supabase?.from('students')?.select('department')

      if (error) throw error
      
      const departments = [...new Set((data || []).map(item => item.department).filter(Boolean))]
      return { data: departments, error: null }
    } catch (error) {
      return { data: [], error: error?.message };
    }
  }
}