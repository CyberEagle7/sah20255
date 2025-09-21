import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const SearchAndFilters = ({ onSearch, onFilter, onAddStudent, totalStudents }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const classes = [
    'Grade 9-A', 'Grade 9-B', 'Grade 10-A', 'Grade 10-B', 
    'Grade 11-A', 'Grade 11-B', 'Grade 12-A', 'Grade 12-B'
  ];

  const statuses = [
    { value: 'active', label: 'Active', color: 'text-success' },
    { value: 'inactive', label: 'Inactive', color: 'text-error' },
    { value: 'pending', label: 'Pending', color: 'text-warning' }
  ];

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClassFilter = (classValue) => {
    setSelectedClass(classValue);
    onFilter({ class: classValue, status: selectedStatus });
  };

  const handleStatusFilter = (statusValue) => {
    setSelectedStatus(statusValue);
    onFilter({ class: selectedClass, status: statusValue });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedClass('');
    setSelectedStatus('');
    onSearch('');
    onFilter({ class: '', status: '' });
  };

  const hasActiveFilters = searchTerm || selectedClass || selectedStatus;

  return (
    <div className="space-y-4">
      {/* Main Search and Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Search students by name, ID, or email..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e?.target?.value)}
              className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent lightning-transition neon-focus"
            />
            {searchTerm && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground lightning-transition"
              >
                <Icon name="X" size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            iconName="Filter"
            iconPosition="left"
            className={`neon-hover ${hasActiveFilters ? 'border-primary text-primary' : ''}`}
          >
            Filters
            {hasActiveFilters && (
              <span className="ml-2 w-2 h-2 bg-primary rounded-full"></span>
            )}
          </Button>

          <Button
            variant="default"
            onClick={onAddStudent}
            iconName="Plus"
            iconPosition="left"
            className="neon-hover"
          >
            Add Student
          </Button>
        </div>
      </div>
      {/* Filters Panel */}
      {isFiltersOpen && (
        <div className="glass rounded-lg p-4 space-y-4 animate-slide-in">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-foreground flex items-center space-x-2">
              <Icon name="Filter" size={18} className="text-primary" />
              <span>Filter Students</span>
            </h3>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                iconName="X"
                iconPosition="left"
                className="text-muted-foreground hover:text-foreground"
              >
                Clear All
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Class Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Filter by Class
              </label>
              <div className="space-y-2">
                <button
                  onClick={() => handleClassFilter('')}
                  className={`w-full text-left px-3 py-2 rounded-lg lightning-transition ${
                    selectedClass === '' ?'bg-primary/20 text-primary border border-primary/30' :'text-muted-foreground hover:text-foreground hover:bg-muted/20'
                  }`}
                >
                  All Classes
                </button>
                <div className="grid grid-cols-2 gap-2">
                  {classes?.map((classItem) => (
                    <button
                      key={classItem}
                      onClick={() => handleClassFilter(classItem)}
                      className={`text-left px-3 py-2 rounded-lg lightning-transition text-sm ${
                        selectedClass === classItem 
                          ? 'bg-primary/20 text-primary border border-primary/30' :'text-muted-foreground hover:text-foreground hover:bg-muted/20'
                      }`}
                    >
                      {classItem}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Filter by Status
              </label>
              <div className="space-y-2">
                <button
                  onClick={() => handleStatusFilter('')}
                  className={`w-full text-left px-3 py-2 rounded-lg lightning-transition ${
                    selectedStatus === '' ?'bg-primary/20 text-primary border border-primary/30' :'text-muted-foreground hover:text-foreground hover:bg-muted/20'
                  }`}
                >
                  All Statuses
                </button>
                {statuses?.map((status) => (
                  <button
                    key={status?.value}
                    onClick={() => handleStatusFilter(status?.value)}
                    className={`w-full text-left px-3 py-2 rounded-lg lightning-transition flex items-center space-x-2 ${
                      selectedStatus === status?.value 
                        ? 'bg-primary/20 text-primary border border-primary/30' :'text-muted-foreground hover:text-foreground hover:bg-muted/20'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      status?.value === 'active' ? 'bg-success' :
                      status?.value === 'inactive' ? 'bg-error' : 'bg-warning'
                    }`}></div>
                    <span>{status?.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={16} />
          <span>
            {totalStudents === 0 ? 'No students found' : 
             totalStudents === 1 ? '1 student found' : 
             `${totalStudents} students found`}
          </span>
        </div>
        
        {hasActiveFilters && (
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-primary" />
            <span className="text-primary">Filters applied</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilters;