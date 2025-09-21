import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { attendanceService } from '../../services/attendanceService';
import { studentService } from '../../services/studentService';

const AnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analyticsData, setAnalyticsData] = useState({
    totalStudents: 0,
    totalAttendance: 0,
    averageAttendance: 0,
    departmentStats: [],
    monthlyTrends: [],
    topPerformers: [],
    lowAttendees: []
  });

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      const [studentsResult, attendanceResult] = await Promise.all([
        studentService?.getAllStudents(),
        attendanceService?.getAllAttendance()
      ]);

      if (studentsResult?.error) {
        throw new Error(studentsResult.error);
      }

      if (attendanceResult?.error) {
        throw new Error(attendanceResult.error);
      }

      const students = studentsResult?.data || [];
      const attendance = attendanceResult?.data || [];

      // Calculate department-wise statistics
      const departmentStats = await calculateDepartmentStats(students, attendance);
      
      // Calculate monthly trends
      const monthlyTrends = calculateMonthlyTrends(attendance);
      
      // Calculate top performers and low attendees
      const performanceData = await calculatePerformanceData(students);

      const totalStudents = students?.length || 0;
      const totalAttendance = attendance?.length || 0;
      const presentCount = attendance?.filter(r => r?.status === 'present')?.length || 0;
      const averageAttendance = totalAttendance > 0 ? Math.round((presentCount / totalAttendance) * 100) : 0;

      setAnalyticsData({
        totalStudents,
        totalAttendance,
        averageAttendance,
        departmentStats,
        monthlyTrends,
        topPerformers: performanceData?.top,
        lowAttendees: performanceData?.low
      });

    } catch (err) {
      setError(err?.message || 'Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const calculateDepartmentStats = async (students, attendance) => {
    const departmentMap = {};
    
    // Initialize departments
    students?.forEach(student => {
      if (student?.department) {
        if (!departmentMap?.[student?.department]) {
          departmentMap[student?.department] = {
            name: student?.department,
            totalStudents: 0,
            totalRecords: 0,
            presentRecords: 0,
            percentage: 0
          };
        }
        departmentMap[student?.department].totalStudents++;
      }
    });

    // Calculate attendance for each department
    attendance?.forEach(record => {
      const dept = record?.students?.department;
      if (dept && departmentMap?.[dept]) {
        departmentMap[dept].totalRecords++;
        if (record?.status === 'present') {
          departmentMap[dept].presentRecords++;
        }
      }
    });

    // Calculate percentages
    return Object.values(departmentMap)?.map(dept => ({
      ...dept,
      percentage: dept?.totalRecords > 0 ? Math.round((dept?.presentRecords / dept?.totalRecords) * 100) : 0
    }));
  };

  const calculateMonthlyTrends = (attendance) => {
    const monthlyData = {};
    const currentYear = new Date()?.getFullYear();

    // Initialize last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date?.setMonth(date?.getMonth() - i);
      const monthKey = `${date?.getFullYear()}-${(date?.getMonth() + 1)?.toString()?.padStart(2, '0')}`;
      const monthName = date?.toLocaleDateString('en-US', { month: 'short' });
      
      monthlyData[monthKey] = {
        month: monthName,
        total: 0,
        present: 0,
        percentage: 0
      };
    }

    // Calculate actual data
    attendance?.forEach(record => {
      const recordDate = new Date(record?.date);
      const monthKey = `${recordDate?.getFullYear()}-${(recordDate?.getMonth() + 1)?.toString()?.padStart(2, '0')}`;
      
      if (monthlyData?.[monthKey]) {
        monthlyData[monthKey].total++;
        if (record?.status === 'present') {
          monthlyData[monthKey].present++;
        }
      }
    });

    // Calculate percentages
    return Object.values(monthlyData)?.map(month => ({
      ...month,
      percentage: month?.total > 0 ? Math.round((month?.present / month?.total) * 100) : 0
    }));
  };

  const calculatePerformanceData = async (students) => {
    const studentStats = await Promise.all(
      students?.map(async (student) => {
        const stats = await attendanceService?.getStudentAttendanceStats(student?.id);
        return {
          ...student,
          attendance: stats?.data || { percentage: 0, total: 0, present: 0 }
        };
      }) || []
    );

    const topPerformers = studentStats
      ?.filter(s => s?.attendance?.total > 0)
      ?.sort((a, b) => b?.attendance?.percentage - a?.attendance?.percentage)
      ?.slice(0, 5);

    const lowAttendees = studentStats
      ?.filter(s => s?.attendance?.total > 0 && s?.attendance?.percentage < 75)
      ?.sort((a, b) => a?.attendance?.percentage - b?.attendance?.percentage)
      ?.slice(0, 5);

    return { top: topPerformers, low: lowAttendees };
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  const sendLowAttendanceAlerts = async () => {
    try {
      const result = await attendanceService?.checkAndSendAlerts(75);
      
      if (result?.error) {
        alert(`Failed to send alerts: ${result?.error}`);
        return;
      }

      const sentCount = result?.data?.length || 0;
      alert(`Successfully sent ${sentCount} attendance alert(s) to students with low attendance.`);
      
    } catch (error) {
      alert('Failed to send attendance alerts. Please try again.');
    }
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Analytics Dashboard - NOVA FORGE</title>
        </Helmet>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Analytics Dashboard - NOVA FORGE</title>
        <meta name="description" content="Comprehensive attendance analytics and insights with interactive charts and performance tracking." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <Link 
                  to="/administrative-dashboard"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground lightning-transition-fast"
                >
                  <Icon name="ArrowLeft" size={20} />
                  <span>Back to Dashboard</span>
                </Link>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                    <Icon name="BarChart3" size={24} color="white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-foreground text-glow">
                      Analytics Dashboard
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      Live insights from real attendance data with automated alerts
                    </p>
                  </div>
                </div>

                <Button
                  onClick={sendLowAttendanceAlerts}
                  iconName="Bell"
                  iconPosition="left"
                  className="neon-hover"
                >
                  Send Alert SMS
                </Button>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertCircle" size={16} className="text-destructive" />
                  <span className="text-sm text-destructive">{error}</span>
                </div>
                <button 
                  onClick={loadAnalytics}
                  className="mt-2 text-sm text-primary hover:text-primary/80 lightning-transition-fast"
                >
                  Try again
                </button>
              </div>
            )}

            {/* Overview Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
              <div className="glass rounded-xl p-6 border border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Users" size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{analyticsData?.totalStudents}</p>
                    <p className="text-sm text-muted-foreground">Total Students</p>
                  </div>
                </div>
              </div>

              <div className="glass rounded-xl p-6 border border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="Calendar" size={20} className="text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{analyticsData?.totalAttendance}</p>
                    <p className="text-sm text-muted-foreground">Total Records</p>
                  </div>
                </div>
              </div>

              <div className="glass rounded-xl p-6 border border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="Percent" size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{analyticsData?.averageAttendance}%</p>
                    <p className="text-sm text-muted-foreground">Average Attendance</p>
                  </div>
                </div>
              </div>

              <div className="glass rounded-xl p-6 border border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                    <Icon name="AlertTriangle" size={20} className="text-warning" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{analyticsData?.lowAttendees?.length || 0}</p>
                    <p className="text-sm text-muted-foreground">Low Attendance</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Department Performance */}
              <div className="glass rounded-xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Department Performance
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData?.departmentStats}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#9CA3AF"
                      fontSize={12}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="percentage" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Monthly Trends */}
              <div className="glass rounded-xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Monthly Attendance Trends
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData?.monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="percentage" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Performance Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Top Performers */}
              <div className="glass rounded-xl p-6 border border-border">
                <div className="flex items-center space-x-3 mb-4">
                  <Icon name="Trophy" size={20} className="text-success" />
                  <h3 className="text-lg font-semibold text-foreground">
                    Top Performers
                  </h3>
                </div>
                <div className="space-y-3">
                  {analyticsData?.topPerformers?.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">
                      No attendance data available
                    </p>
                  ) : (
                    analyticsData?.topPerformers?.map((student, index) => (
                      <div key={student?.id} className="flex items-center justify-between p-3 bg-success/5 border border-success/20 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <span className="w-6 h-6 bg-success text-white rounded-full flex items-center justify-center text-xs font-bold">
                              {index + 1}
                            </span>
                            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                              <span className="text-white font-medium text-xs">
                                {student?.name?.charAt(0)?.toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{student?.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {student?.roll_no} • {student?.department}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-success">{student?.attendance?.percentage}%</p>
                          <p className="text-xs text-muted-foreground">
                            {student?.attendance?.present}/{student?.attendance?.total}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Low Attendance */}
              <div className="glass rounded-xl p-6 border border-border">
                <div className="flex items-center space-x-3 mb-4">
                  <Icon name="AlertTriangle" size={20} className="text-warning" />
                  <h3 className="text-lg font-semibold text-foreground">
                    Low Attendance (&lt;75%)
                  </h3>
                </div>
                <div className="space-y-3">
                  {analyticsData?.lowAttendees?.length === 0 ? (
                    <div className="text-center py-4">
                      <Icon name="CheckCircle" size={32} className="mx-auto text-success mb-2" />
                      <p className="text-muted-foreground">All students have good attendance!</p>
                    </div>
                  ) : (
                    analyticsData?.lowAttendees?.map((student, index) => (
                      <div key={student?.id} className="flex items-center justify-between p-3 bg-warning/5 border border-warning/20 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-warning to-destructive rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-xs">
                              {student?.name?.charAt(0)?.toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{student?.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {student?.roll_no} • {student?.department}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-warning">{student?.attendance?.percentage}%</p>
                          <p className="text-xs text-muted-foreground">
                            {student?.attendance?.present}/{student?.attendance?.total}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AnalyticsDashboard;