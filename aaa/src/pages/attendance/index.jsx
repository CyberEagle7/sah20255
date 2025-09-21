import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { attendanceService } from '../../services/attendanceService';
import { studentService } from '../../services/studentService';

const AttendancePage = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    department: 'All',
    date: '',
    lectureName: '',
    status: 'All'
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadAttendance();
  }, [filters]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [attendanceResult, studentsResult] = await Promise.all([
        attendanceService?.getAllAttendance(),
        studentService?.getAllStudents()
      ]);

      if (attendanceResult?.error) {
        setError(attendanceResult?.error);
      } else {
        setAttendanceRecords(attendanceResult?.data || []);
      }

      if (studentsResult?.data) {
        setStudents(studentsResult?.data);
      }
    } catch (err) {
      setError('Failed to load attendance data');
    } finally {
      setLoading(false);
    }
  };

  const loadAttendance = async () => {
    try {
      const filterOptions = {};
      
      if (filters?.department !== 'All') {
        filterOptions.department = filters?.department;
      }
      if (filters?.date) {
        filterOptions.date = filters?.date;
      }
      if (filters?.lectureName) {
        filterOptions.lectureName = filters?.lectureName;
      }
      if (filters?.status !== 'All') {
        filterOptions.status = filters?.status;
      }

      const result = await attendanceService?.getAllAttendance(filterOptions);
      
      if (result?.error) {
        setError(result?.error);
      } else {
        setAttendanceRecords(result?.data || []);
      }
    } catch (err) {
      setError('Failed to filter attendance records');
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const markManualAttendance = async (studentId, status = 'present') => {
    try {
      const lectureName = prompt('Enter lecture name:');
      if (!lectureName) return;

      const result = await attendanceService?.markAttendance(studentId, lectureName, status);
      
      if (result?.error) {
        alert(`Failed to mark attendance: ${result?.error}`);
        return;
      }

      await loadAttendance();
      alert('Attendance marked successfully!');
    } catch (error) {
      alert('Failed to mark attendance. Please try again.');
    }
  };

  const getUniqueValues = (key) => {
    const values = attendanceRecords
      ?.map(record => record?.students?.[key])
      ?.filter(Boolean);
    return ['All', ...new Set(values)];
  };

  const departments = getUniqueValues('department');
  const totalRecords = attendanceRecords?.length || 0;
  const presentCount = attendanceRecords?.filter(r => r?.status === 'present')?.length || 0;
  const absentCount = totalRecords - presentCount;

  return (
    <>
      <Helmet>
        <title>Attendance Management - NOVA FORGE</title>
        <meta name="description" content="Comprehensive attendance tracking and management system for college lectures." />
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
                    <Icon name="Calendar" size={24} color="white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-foreground text-glow">
                      Attendance Management
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      Track and manage lecture-wise student attendance
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Link to="/qr-code-scanner">
                    <Button
                      iconName="Scan"
                      iconPosition="left"
                      className="neon-hover"
                    >
                      QR Scanner
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
              <div className="glass rounded-xl p-6 border border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Calendar" size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{totalRecords}</p>
                    <p className="text-sm text-muted-foreground">Total Records</p>
                  </div>
                </div>
              </div>

              <div className="glass rounded-xl p-6 border border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="CheckCircle" size={20} className="text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{presentCount}</p>
                    <p className="text-sm text-muted-foreground">Present</p>
                  </div>
                </div>
              </div>

              <div className="glass rounded-xl p-6 border border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                    <Icon name="XCircle" size={20} className="text-destructive" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{absentCount}</p>
                    <p className="text-sm text-muted-foreground">Absent</p>
                  </div>
                </div>
              </div>

              <div className="glass rounded-xl p-6 border border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="Percent" size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {totalRecords > 0 ? Math.round((presentCount / totalRecords) * 100) : 0}%
                    </p>
                    <p className="text-sm text-muted-foreground">Present Rate</p>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertCircle" size={16} className="text-destructive" />
                  <span className="text-sm text-destructive">{error}</span>
                </div>
                <button 
                  onClick={loadData}
                  className="mt-2 text-sm text-primary hover:text-primary/80 lightning-transition-fast"
                >
                  Try again
                </button>
              </div>
            )}

            {/* Filters */}
            <div className="glass rounded-xl p-6 border border-border mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Filters</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Department
                  </label>
                  <select
                    value={filters?.department}
                    onChange={(e) => handleFilterChange('department', e?.target?.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary lightning-transition-fast"
                  >
                    {departments?.map(dept => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={filters?.date}
                    onChange={(e) => handleFilterChange('date', e?.target?.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary lightning-transition-fast"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Lecture Name
                  </label>
                  <input
                    type="text"
                    value={filters?.lectureName}
                    onChange={(e) => handleFilterChange('lectureName', e?.target?.value)}
                    placeholder="Search lecture..."
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary lightning-transition-fast"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Status
                  </label>
                  <select
                    value={filters?.status}
                    onChange={(e) => handleFilterChange('status', e?.target?.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary lightning-transition-fast"
                  >
                    <option value="All">All</option>
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Attendance Records */}
            <div className="glass rounded-xl border border-border">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Attendance Records ({attendanceRecords?.length || 0})
                  </h3>
                </div>

                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : attendanceRecords?.length === 0 ? (
                  <div className="text-center py-12">
                    <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">No attendance records found</p>
                    <Link to="/qr-code-scanner">
                      <Button iconName="Scan" iconPosition="left" className="neon-hover">
                        Start Taking Attendance
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/10">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Student
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Lecture
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Date & Time
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {attendanceRecords?.map((record, index) => (
                          <tr 
                            key={record?.id || index}
                            className="hover:bg-muted/10 lightning-transition-fast"
                          >
                            <td className="px-4 py-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                                  <span className="text-white font-medium text-xs">
                                    {record?.students?.name?.charAt(0)?.toUpperCase() || '?'}
                                  </span>
                                </div>
                                <div>
                                  <p className="font-medium text-foreground">
                                    {record?.students?.name}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {record?.students?.roll_no} • {record?.students?.department}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <span className="font-medium text-foreground">
                                {record?.lecture_name || 'General Lecture'}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <div className="text-sm">
                                <p className="text-foreground">
                                  {new Date(record?.date)?.toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}
                                </p>
                                <p className="text-muted-foreground">
                                  {record?.time}
                                </p>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <span className={`inline-flex px-2 py-1 text-xs rounded-lg ${
                                record?.status === 'present' ?'bg-success/10 text-success' :'bg-destructive/10 text-destructive'
                              }`}>
                                <Icon 
                                  name={record?.status === 'present' ? "CheckCircle" : "XCircle"} 
                                  size={14} 
                                  className="mr-1" 
                                />
                                {record?.status === 'present' ? 'Present' : 'Absent'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AttendancePage;