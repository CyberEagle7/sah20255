import React, { useState, useEffect } from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import { studentService } from '../../../services/studentService';

const StudentSelector = ({ onStudentSelect, selectedStudent }) => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStudents();
    loadDepartments();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [students, selectedDepartment, searchQuery]);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const result = await studentService?.getAllStudents();
      
      if (result?.error) {
        setError(result?.error);
      } else {
        setStudents(result?.data);
      }
    } catch (err) {
      setError('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const loadDepartments = async () => {
    try {
      const result = await studentService?.getDepartments();
      if (result?.data) {
        setDepartments(['All', ...result?.data]);
      }
    } catch (err) {
      // Silent fail for departments
    }
  };

  const filterStudents = () => {
    let filtered = students;

    // Filter by department
    if (selectedDepartment !== 'All') {
      filtered = filtered?.filter(student => student?.department === selectedDepartment);
    }

    // Filter by search query
    if (searchQuery?.trim()) {
      const query = searchQuery?.toLowerCase()?.trim();
      filtered = filtered?.filter(student => 
        student?.name?.toLowerCase()?.includes(query) ||
        student?.roll_no?.toLowerCase()?.includes(query) ||
        student?.department?.toLowerCase()?.includes(query)
      );
    }

    setFilteredStudents(filtered || []);
  };

  const handleStudentClick = (student) => {
    onStudentSelect?.(student);
  };

  if (loading) {
    return (
      <div className="glass rounded-xl p-6 border border-border">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Users" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Select Student</h3>
        </div>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl p-6 border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Users" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Select Student</h3>
      </div>
      {error && (
        <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
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
      {/* Filters */}
      <div className="space-y-4 mb-6">
        {/* Department Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Filter by Department
          </label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e?.target?.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary lightning-transition-fast"
          >
            {departments?.map(dept => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Search Student
          </label>
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, roll number, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full pl-10 pr-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary lightning-transition-fast"
            />
          </div>
        </div>
      </div>
      {/* Student List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredStudents?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">
              {searchQuery || selectedDepartment !== 'All' ? 'No students match your filters' : 'No students found'}
            </p>
            {(searchQuery || selectedDepartment !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDepartment('All');
                }}
                className="mt-2 text-sm text-primary hover:text-primary/80 lightning-transition-fast"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          filteredStudents?.map((student) => (
            <div
              key={student?.id}
              onClick={() => handleStudentClick(student)}
              className={`p-4 rounded-lg border-2 cursor-pointer lightning-transition-fast ${
                selectedStudent?.id === student?.id
                  ? 'border-primary bg-primary/10 shadow-lg'
                  : 'border-border hover:border-primary/50 hover:bg-muted/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{student?.name}</h4>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                    <span>Roll: {student?.roll_no}</span>
                    <span>Year: {student?.year}</span>
                  </div>
                  <div className="mt-1">
                    <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-lg">
                      {student?.department}
                    </span>
                  </div>
                </div>
                {selectedStudent?.id === student?.id && (
                  <Icon name="Check" size={20} className="text-primary" />
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {/* Selection Summary */}
      {selectedStudent && (
        <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon name="CheckCircle" size={20} className="text-success" />
            <div>
              <p className="font-medium text-foreground">Selected: {selectedStudent?.name}</p>
              <p className="text-sm text-muted-foreground">
                {selectedStudent?.roll_no} • {selectedStudent?.department} • Year {selectedStudent?.year}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentSelector;