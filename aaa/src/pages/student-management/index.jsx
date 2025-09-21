import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import StudentTable from './components/StudentTable';
import StudentForm from './components/StudentForm';
import SearchAndFilters from './components/SearchAndFilters';
import DeleteConfirmation from './components/DeleteConfirmation';
import EmptyState from './components/EmptyState';
import { Link } from 'react-router-dom';
import { studentService } from '../../services/studentService';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [deleteStudent, setDeleteStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');
  const [departments, setDepartments] = useState([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadStudents();
    loadDepartments();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [students, searchQuery, departmentFilter, yearFilter]);

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      let result = await studentService?.getAllStudents();
      
      if (result?.error) {
        setError(result?.error);
      } else {
        setStudents(result?.data || []);
      }
    } catch (err) {
      setError('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const loadDepartments = async () => {
    try {
      let result = await studentService?.getDepartments();
      if (result?.data) {
        setDepartments(['All', ...result?.data]);
      }
    } catch (err) {
      // Silent fail for departments
    }
  };

  const filterStudents = () => {
    let filtered = students || [];

    // Search filter
    if (searchQuery?.trim()) {
      const query = searchQuery?.toLowerCase()?.trim();
      filtered = filtered?.filter(student => 
        student?.name?.toLowerCase()?.includes(query) ||
        student?.roll_no?.toLowerCase()?.includes(query) ||
        student?.department?.toLowerCase()?.includes(query)
      );
    }

    // Department filter
    if (departmentFilter !== 'All') {
      filtered = filtered?.filter(student => student?.department === departmentFilter);
    }

    // Year filter
    if (yearFilter !== 'All') {
      filtered = filtered?.filter(student => student?.year?.toString() === yearFilter);
    }

    setFilteredStudents(filtered);
  };

  const handleAddStudent = () => {
    setEditingStudent(null);
    setIsFormOpen(true);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setIsFormOpen(true);
  };

  const handleDeleteStudent = (student) => {
    setDeleteStudent(student);
  };

  const handleFormSubmit = async (studentData) => {
    try {
      let result;
      if (editingStudent) {
        result = await studentService?.updateStudent(editingStudent?.id, studentData);
      } else {
        result = await studentService?.createStudent(studentData);
      }

      if (result?.error) {
        alert(`Failed to ${editingStudent ? 'update' : 'create'} student: ${result?.error}`);
        return;
      }

      await loadStudents();
      setIsFormOpen(false);
      setEditingStudent(null);
      
    } catch (error) {
      alert(`Failed to ${editingStudent ? 'update' : 'create'} student. Please try again.`);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleConfirmDelete = async () => {
    if (!deleteStudent) return;

    try {
      setIsDeleting(true);
      let result = await studentService?.deleteStudent(deleteStudent?.id);
      
      if (result?.error) {
        alert(`Failed to delete student: ${result?.error}`);
        return;
      }

      await loadStudents();
      setDeleteStudent(null);
      
    } catch (error) {
      alert('Failed to delete student. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const totalStudents = students?.length || 0;
  const filteredCount = filteredStudents?.length || 0;

  return (
    <>
      <Helmet>
        <title>Student Management - NOVA FORGE</title>
        <meta name="description" content="Comprehensive student database management with CRUD operations, search, and filtering capabilities." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggleCollapse={toggleSidebar} 
        />
        
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
                    <Icon name="Users" size={24} color="white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-foreground text-glow">
                      Student Management
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      Manage college students with comprehensive CRUD operations
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleAddStudent}
                  iconName="Plus"
                  iconPosition="left"
                  className="neon-hover"
                >
                  Add New Student
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="glass rounded-xl p-6 border border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Users" size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{totalStudents}</p>
                    <p className="text-sm text-muted-foreground">Total Students</p>
                  </div>
                </div>
              </div>

              <div className="glass rounded-xl p-6 border border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="Filter" size={20} className="text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{filteredCount}</p>
                    <p className="text-sm text-muted-foreground">Filtered Results</p>
                  </div>
                </div>
              </div>

              <div className="glass rounded-xl p-6 border border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="Building" size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{departments?.length - 1 || 0}</p>
                    <p className="text-sm text-muted-foreground">Departments</p>
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
                  onClick={loadStudents}
                  className="mt-2 text-sm text-primary hover:text-primary/80 lightning-transition-fast"
                >
                  Try again
                </button>
              </div>
            )}

            {/* Search and Filters */}
            <div className="mb-6">
              <SearchAndFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                departmentFilter={departmentFilter}
                onDepartmentChange={setDepartmentFilter}
                yearFilter={yearFilter}
                onYearChange={setYearFilter}
                departments={departments}
                studentsCount={filteredCount}
                onSearch={setSearchQuery}
                onFilter={setDepartmentFilter}
                onAddStudent={handleAddStudent}
                totalStudents={totalStudents}
              />
            </div>

            {/* Main Content */}
            <div className="glass rounded-xl border border-border">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : filteredCount === 0 && totalStudents === 0 ? (
                <EmptyState onAddStudent={handleAddStudent} />
              ) : (
                <StudentTable
                  students={filteredStudents}
                  onEdit={handleEditStudent}
                  onDelete={handleDeleteStudent}
                  loading={loading}
                />
              )}
            </div>

            {/* Form Modal */}
            {isFormOpen && (
              <StudentForm
                student={editingStudent}
                onSubmit={handleFormSubmit}
                onClose={() => {
                  setIsFormOpen(false);
                  setEditingStudent(null);
                }}
              />
            )}

            {/* Delete Confirmation */}
            {deleteStudent && (
              <DeleteConfirmation
                student={deleteStudent}
                onConfirm={handleConfirmDelete}
                onCancel={() => setDeleteStudent(null)}
                isOpen={!!deleteStudent}
                isDeleting={isDeleting}
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default StudentManagement;