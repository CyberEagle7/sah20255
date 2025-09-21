import { supabase } from '../lib/supabase';

export const attendanceService = {
  // Mark attendance for a student
  async markAttendance(studentId, lectureName, status = 'present') {
    try {
      const now = new Date()
      const { data, error } = await supabase?.from('attendance_records')?.insert([{
          student_id: studentId,
          lecture_name: lectureName || 'General Lecture',
          date: now?.toISOString()?.split('T')?.[0], // YYYY-MM-DD format
          time: now?.toTimeString()?.split(' ')?.[0], // HH:MM:SS format
          status: status
        }])?.select(`
          *,
          students (
            id,
            name,
            roll_no,
            department,
            year
          )
        `)

      if (error) throw error
      return { data: data?.[0], error: null }
    } catch (error) {
      return { data: null, error: error?.message };
    }
  },

  // Get attendance records for a student
  async getStudentAttendance(studentId, options = {}) {
    try {
      let query = supabase?.from('attendance_records')?.select(`
          *,
          students (
            id,
            name,
            roll_no,
            department,
            year
          )
        `)?.eq('student_id', studentId)?.order('date', { ascending: false })?.order('time', { ascending: false })

      if (options?.startDate) {
        query = query?.gte('date', options?.startDate)
      }
      if (options?.endDate) {
        query = query?.lte('date', options?.endDate)
      }
      if (options?.limit) {
        query = query?.limit(options?.limit)
      }

      const { data, error } = await query

      if (error) throw error
      return { data: data || [], error: null }
    } catch (error) {
      return { data: [], error: error?.message };
    }
  },

  // Get all attendance records with filters
  async getAllAttendance(options = {}) {
    try {
      let query = supabase?.from('attendance_records')?.select(`
          *,
          students (
            id,
            name,
            roll_no,
            department,
            year
          )
        `)?.order('date', { ascending: false })?.order('time', { ascending: false })

      if (options?.department) {
        query = query?.eq('students.department', options?.department)
      }
      if (options?.date) {
        query = query?.eq('date', options?.date)
      }
      if (options?.lectureName) {
        query = query?.ilike('lecture_name', `%${options?.lectureName}%`)
      }
      if (options?.status) {
        query = query?.eq('status', options?.status)
      }
      if (options?.limit) {
        query = query?.limit(options?.limit)
      }

      const { data, error } = await query

      if (error) throw error
      return { data: data || [], error: null }
    } catch (error) {
      return { data: [], error: error?.message };
    }
  },

  // Get attendance statistics for a student
  async getStudentAttendanceStats(studentId, options = {}) {
    try {
      const attendanceData = await this.getStudentAttendance(studentId, options)
      
      if (attendanceData?.error) {
        return { data: null, error: attendanceData?.error };
      }

      const records = attendanceData?.data
      const total = records?.length || 0
      const present = records?.filter(record => record?.status === 'present')?.length || 0
      const absent = total - present
      const percentage = total > 0 ? Math.round((present / total) * 100) : 0

      return {
        data: {
          total,
          present,
          absent,
          percentage
        },
        error: null
      }
    } catch (error) {
      return { data: null, error: error?.message };
    }
  },

  // Get attendance analytics by department
  async getDepartmentAttendanceStats(department, options = {}) {
    try {
      const { data, error } = await supabase?.from('attendance_records')?.select(`
          *,
          students!inner (
            id,
            name,
            roll_no,
            department,
            year
          )
        `)?.eq('students.department', department)?.order('date', { ascending: false })

      if (error) throw error

      const records = data || []
      const total = records?.length || 0
      const present = records?.filter(record => record?.status === 'present')?.length || 0
      const percentage = total > 0 ? Math.round((present / total) * 100) : 0

      return {
        data: {
          department,
          total,
          present,
          absent: total - present,
          percentage
        },
        error: null
      }
    } catch (error) {
      return { data: null, error: error?.message };
    }
  },

  // Send SMS notification for low attendance
  async sendAttendanceAlert(studentId, message) {
    try {
      const student = await this.getStudentById(studentId)
      if (!student?.data || !student?.data?.phone) {
        return { error: 'Student phone number not found' }
      }

      // Call Twilio edge function
      const response = await fetch(`${import.meta.env?.VITE_SUPABASE_URL}/functions/v1/send-sms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env?.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          to: student?.data?.phone,
          message: message
        })
      })

      if (!response?.ok) {
        throw new Error('Failed to send SMS notification')
      }

      const result = await response?.json()
      return { data: result, error: null }
    } catch (error) {
      return { data: null, error: error?.message };
    }
  },

  // Check and send low attendance alerts
  async checkAndSendAlerts(threshold = 75) {
    try {
      const { data: students } = await supabase?.from('students')?.select('*')

      const alerts = []
      
      for (const student of students || []) {
        const stats = await this.getStudentAttendanceStats(student?.id)
        
        if (stats?.data && stats?.data?.percentage < threshold && stats?.data?.total > 0) {
          const message = `Alert: Your attendance is ${stats?.data?.percentage}% (${stats?.data?.present}/${stats?.data?.total}). Please improve your attendance to avoid academic issues.`
          
          const alertResult = await this.sendAttendanceAlert(student?.id, message)
          alerts?.push({
            student,
            stats: stats?.data,
            alert: alertResult
          })
        }
      }

      return { data: alerts, error: null }
    } catch (error) {
      return { data: [], error: error?.message };
    }
  }
}