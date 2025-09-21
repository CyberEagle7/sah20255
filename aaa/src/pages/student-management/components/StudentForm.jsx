import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StudentForm = ({ student, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    roll_no: '',
    department: '',
    year: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (student) {
      setFormData({
        name: student?.name || '',
        roll_no: student?.roll_no || '',
        department: student?.department || '',
        year: student?.year?.toString() || ''
      });
    }
  }, [student]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData?.roll_no?.trim()) {
      newErrors.roll_no = 'Roll number is required';
    }

    if (!formData?.department?.trim()) {
      newErrors.department = 'Department is required';
    }

    if (!formData?.year?.trim()) {
      newErrors.year = 'Year is required';
    } else if (isNaN(formData?.year) || formData?.year < 1 || formData?.year > 6) {
      newErrors.year = 'Year must be between 1 and 6';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setSubmitting(true);
    
    try {
      await onSubmit?.({
        name: formData?.name?.trim(),
        roll_no: formData?.roll_no?.trim(),
        department: formData?.department?.trim(),
        year: parseInt(formData?.year)
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass rounded-xl border border-border max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Icon name={student ? "Edit" : "Plus"} size={20} color="white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  {student ? 'Edit Student' : 'Add New Student'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {student ? 'Update student information' : 'Enter student details below'}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              iconName="X"
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData?.name}
                onChange={(e) => handleChange('name', e?.target?.value)}
                placeholder="Enter student's full name"
                className={`w-full px-3 py-2 bg-background border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary/20 lightning-transition-fast ${
                  errors?.name ? 'border-destructive focus:border-destructive' : 'border-border focus:border-primary'
                }`}
              />
              {errors?.name && (
                <p className="mt-1 text-sm text-destructive flex items-center">
                  <Icon name="AlertCircle" size={14} className="mr-1" />
                  {errors?.name}
                </p>
              )}
            </div>

            {/* Roll Number */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Roll Number *
              </label>
              <input
                type="text"
                value={formData?.roll_no}
                onChange={(e) => handleChange('roll_no', e?.target?.value)}
                placeholder="Enter roll number (e.g., CS101)"
                className={`w-full px-3 py-2 bg-background border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary/20 lightning-transition-fast ${
                  errors?.roll_no ? 'border-destructive focus:border-destructive' : 'border-border focus:border-primary'
                }`}
              />
              {errors?.roll_no && (
                <p className="mt-1 text-sm text-destructive flex items-center">
                  <Icon name="AlertCircle" size={14} className="mr-1" />
                  {errors?.roll_no}
                </p>
              )}
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Department *
              </label>
              <select
                value={formData?.department}
                onChange={(e) => handleChange('department', e?.target?.value)}
                className={`w-full px-3 py-2 bg-background border rounded-lg text-foreground focus:ring-2 focus:ring-primary/20 lightning-transition-fast ${
                  errors?.department ? 'border-destructive focus:border-destructive' : 'border-border focus:border-primary'
                }`}
              >
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Electronics and Communication">Electronics and Communication</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Chemical Engineering">Chemical Engineering</option>
                <option value="Biotechnology">Biotechnology</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
              </select>
              {errors?.department && (
                <p className="mt-1 text-sm text-destructive flex items-center">
                  <Icon name="AlertCircle" size={14} className="mr-1" />
                  {errors?.department}
                </p>
              )}
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Year *
              </label>
              <select
                value={formData?.year}
                onChange={(e) => handleChange('year', e?.target?.value)}
                className={`w-full px-3 py-2 bg-background border rounded-lg text-foreground focus:ring-2 focus:ring-primary/20 lightning-transition-fast ${
                  errors?.year ? 'border-destructive focus:border-destructive' : 'border-border focus:border-primary'
                }`}
              >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
                <option value="5">5th Year</option>
                <option value="6">6th Year</option>
              </select>
              {errors?.year && (
                <p className="mt-1 text-sm text-destructive flex items-center">
                  <Icon name="AlertCircle" size={14} className="mr-1" />
                  {errors?.year}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                fullWidth
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                fullWidth
                disabled={submitting}
                iconName={submitting ? "Loader" : student ? "Save" : "Plus"}
                iconPosition="left"
                className="neon-hover"
              >
                {submitting ? 'Saving...' : student ? 'Update Student' : 'Add Student'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;