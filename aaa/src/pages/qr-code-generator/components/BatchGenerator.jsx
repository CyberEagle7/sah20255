import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';

import Icon from '../../../components/AppIcon';
import { studentService } from '../../../services/studentService';

import { jsPDF } from 'jspdf';


const BatchGenerator = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [studentsResult, departmentsResult] = await Promise.all([
        studentService?.getAllStudents(),
        studentService?.getDepartments()
      ]);

      if (studentsResult?.error) {
        setError(studentsResult?.error);
      } else {
        setStudents(studentsResult?.data);
      }

      if (departmentsResult?.data) {
        setDepartments(['All', ...departmentsResult?.data]);
      }
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = selectedDepartment === 'All' 
    ? students 
    : students?.filter(student => student?.department === selectedDepartment);

  const handleSelectAll = () => {
    if (selectedStudents?.length === filteredStudents?.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents?.map(student => student?.id) || []);
    }
  };

  const handleSelectStudent = (studentId) => {
    setSelectedStudents(prev => 
      prev?.includes(studentId) 
        ? prev?.filter(id => id !== studentId)
        : [...(prev || []), studentId]
    );
  };

  const generateQRData = (student) => {
    return JSON.stringify({
      studentId: student?.id,
      name: student?.name,
      rollNo: student?.roll_no,
      department: student?.department,
      year: student?.year,
      timestamp: new Date()?.toISOString(),
      type: 'attendance_qr'
    });
  };

  const generateBatchPDF = async () => {
    if (selectedStudents?.length === 0) return;

    try {
      setGenerating(true);
      
      const selectedStudentData = students?.filter(student => 
        selectedStudents?.includes(student?.id)
      );

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      let isFirstPage = true;

      for (let i = 0; i < selectedStudentData?.length; i++) {
        const student = selectedStudentData?.[i];
        
        if (!isFirstPage) {
          pdf?.addPage();
        }
        isFirstPage = false;

        // Create QR code canvas element
        const canvas = document.createElement('canvas');
        const ctx = canvas?.getContext('2d');
        canvas.width = 256;
        canvas.height = 256;

        // Create temporary QR code element
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.left = '-9999px';
        tempDiv.innerHTML = `<canvas width="256" height="256"></canvas>`;
        document.body?.appendChild(tempDiv);

        const qrCanvas = tempDiv?.querySelector('canvas');
        const qrCtx = qrCanvas?.getContext('2d');

        // Generate QR code data URL
        const qrData = generateQRData(student);
        
        // Create QR code component and render to canvas
        // This is a simplified version - in a real implementation, you'd use a proper QR generation library
        const QRCode = require('qrcode');
        await QRCode?.toCanvas(qrCanvas, qrData, {
          width: 256,
          margin: 2,
          errorCorrectionLevel: 'H'
        });

        const qrDataURL = qrCanvas?.toDataURL('image/png');
        
        // Clean up
        document.body?.removeChild(tempDiv);

        // Add header
        pdf?.setFontSize(20);
        pdf?.setFont('helvetica', 'bold');
        pdf?.text('NOVA FORGE', 105, 20, { align: 'center' });
        
        pdf?.setFontSize(16);
        pdf?.setFont('helvetica', 'normal');
        pdf?.text('Students Attendance Hub', 105, 30, { align: 'center' });

        // Add QR code
        const imgWidth = 80;
        const imgHeight = 80;
        const x = (210 - imgWidth) / 2;
        pdf?.addImage(qrDataURL, 'PNG', x, 50, imgWidth, imgHeight);

        // Add student details
        pdf?.setFontSize(12);
        pdf?.setFont('helvetica', 'bold');
        pdf?.text('Student Details:', 20, 150);
        
        pdf?.setFont('helvetica', 'normal');
        pdf?.text(`Name: ${student?.name}`, 20, 160);
        pdf?.text(`Roll No: ${student?.roll_no}`, 20, 170);
        pdf?.text(`Department: ${student?.department}`, 20, 180);
        pdf?.text(`Year: ${student?.year}`, 20, 190);

        // Add footer
        pdf?.setFontSize(10);
        pdf?.setFont('helvetica', 'italic');
        pdf?.text(`Generated on: ${new Date()?.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}`, 105, 280, { align: 'center' });
      }

      // Save the PDF
      const fileName = selectedDepartment === 'All' 
        ? `QR_Codes_All_Students_${selectedStudents?.length}.pdf`
        : `QR_Codes_${selectedDepartment}_${selectedStudents?.length}.pdf`;
      
      pdf?.save(fileName);

    } catch (error) {
      console.error('Error generating batch PDF:', error);
      alert('Failed to generate batch PDF. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="glass rounded-xl p-6 border border-border">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass rounded-xl p-6 border border-border">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Users" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Batch QR Code Generator</h3>
        </div>
        <p className="text-muted-foreground">
          Select multiple students to generate QR codes in a single PDF document.
        </p>
      </div>
      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-destructive" />
            <span className="text-sm text-destructive">{error}</span>
          </div>
        </div>
      )}
      {/* Controls */}
      <div className="glass rounded-xl p-6 border border-border">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Department Filter */}
          <div className="flex-1">
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
                  {dept} {dept !== 'All' && `(${students?.filter(s => s?.department === dept)?.length || 0})`}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              onClick={handleSelectAll}
              variant="outline"
              iconName={selectedStudents?.length === filteredStudents?.length ? "Square" : "CheckSquare"}
              iconPosition="left"
            >
              {selectedStudents?.length === filteredStudents?.length ? 'Deselect All' : 'Select All'}
            </Button>
            
            <Button
              onClick={generateBatchPDF}
              disabled={selectedStudents?.length === 0 || generating}
              iconName="Download"
              iconPosition="left"
              className="neon-hover"
            >
              {generating ? 'Generating...' : `Generate PDF (${selectedStudents?.length})`}
            </Button>
          </div>
        </div>

        {/* Selection Summary */}
        <div className="flex items-center justify-between p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <span className="text-foreground">
            Selected: {selectedStudents?.length} of {filteredStudents?.length} students
          </span>
          {selectedStudents?.length > 0 && (
            <span className="text-sm text-muted-foreground">
              Department: {selectedDepartment}
            </span>
          )}
        </div>
      </div>
      {/* Student List */}
      <div className="glass rounded-xl p-6 border border-border">
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredStudents?.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No students found</p>
            </div>
          ) : (
            filteredStudents?.map((student) => (
              <div
                key={student?.id}
                onClick={() => handleSelectStudent(student?.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer lightning-transition-fast ${
                  selectedStudents?.includes(student?.id)
                    ? 'border-primary bg-primary/10 shadow-lg'
                    : 'border-border hover:border-primary/50 hover:bg-muted/20'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    selectedStudents?.includes(student?.id)
                      ? 'border-primary bg-primary' :'border-border'
                  }`}>
                    {selectedStudents?.includes(student?.id) && (
                      <Icon name="Check" size={12} className="text-white" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{student?.name}</h4>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                      <span>Roll: {student?.roll_no}</span>
                      <span>Year: {student?.year}</span>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-lg">
                        {student?.department}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BatchGenerator;