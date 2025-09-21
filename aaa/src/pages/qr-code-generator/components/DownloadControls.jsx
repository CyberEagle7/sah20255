import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const DownloadControls = ({ student, qrData, isDisabled = false }) => {
  const [downloading, setDownloading] = useState(false);

  const downloadAsPNG = async () => {
    if (!student || isDisabled) return;

    try {
      setDownloading(true);
      
      const qrContainer = document.getElementById('qr-code-container');
      if (!qrContainer) {
        throw new Error('QR code container not found');
      }

      const canvas = await html2canvas(qrContainer, {
        backgroundColor: 'white',
        scale: 2,
        logging: false
      });

      const link = document.createElement('a');
      link.download = `QR_${student?.roll_no}_${student?.name?.replace(/\s+/g, '_')}.png`;
      link.href = canvas?.toDataURL('image/png');
      document.body?.appendChild(link);
      link?.click();
      document.body?.removeChild(link);

    } catch (error) {
      console.error('Error downloading PNG:', error);
      alert('Failed to download PNG. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const downloadAsPDF = async () => {
    if (!student || isDisabled) return;

    try {
      setDownloading(true);
      
      const qrContainer = document.getElementById('qr-code-container');
      if (!qrContainer) {
        throw new Error('QR code container not found');
      }

      const canvas = await html2canvas(qrContainer, {
        backgroundColor: 'white',
        scale: 2,
        logging: false
      });

      const imgData = canvas?.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

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
      const x = (210 - imgWidth) / 2; // Center horizontally on A4 (210mm wide)
      pdf?.addImage(imgData, 'PNG', x, 50, imgWidth, imgHeight);

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

      pdf?.save(`QR_${student?.roll_no}_${student?.name?.replace(/\s+/g, '_')}.pdf`);

    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const printQR = () => {
    if (!student || isDisabled) return;

    try {
      const qrContainer = document.getElementById('qr-code-container');
      if (!qrContainer) {
        alert('QR code not found. Please generate a QR code first.');
        return;
      }

      const printWindow = window.open('', '_blank');
      const studentDetails = `
        <div style="text-align: center; margin-bottom: 20px; font-family: Arial, sans-serif;">
          <h1 style="color: #333; margin-bottom: 5px;">NOVA FORGE</h1>
          <h2 style="color: #666; margin-top: 0;">Students Attendance Hub</h2>
        </div>
      `;
      
      const qrHtml = qrContainer?.outerHTML;
      const detailsHtml = `
        <div style="margin-top: 20px; padding: 20px; border: 1px solid #ddd; border-radius: 8px; font-family: Arial, sans-serif;">
          <h3 style="margin-top: 0; color: #333;">Student Details</h3>
          <p><strong>Name:</strong> ${student?.name}</p>
          <p><strong>Roll No:</strong> ${student?.roll_no}</p>
          <p><strong>Department:</strong> ${student?.department}</p>
          <p><strong>Year:</strong> ${student?.year}</p>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">
            Generated on: ${new Date()?.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      `;

      printWindow?.document?.write(`
        <html>
          <head>
            <title>QR Code - ${student?.name}</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                padding: 20px; 
                text-align: center; 
              }
              @media print {
                body { margin: 0; }
              }
            </style>
          </head>
          <body>
            ${studentDetails}
            ${qrHtml}
            ${detailsHtml}
          </body>
        </html>
      `);
      printWindow?.document?.close();
      printWindow?.print();
    } catch (error) {
      console.error('Error printing QR code:', error);
      alert('Failed to print. Please try again.');
    }
  };

  return (
    <div className="glass rounded-xl p-6 border border-border">
      <div className="flex items-center space-x-3 mb-4">
        <Icon name="Download" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Download & Print</h3>
      </div>

      {isDisabled && (
        <div className="mb-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="text-sm text-warning">Please select a student and generate QR code first</span>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {/* Download PNG */}
        <Button
          onClick={downloadAsPNG}
          disabled={isDisabled || downloading}
          iconName="Image"
          iconPosition="left"
          fullWidth
          className="justify-start neon-hover"
        >
          {downloading ? 'Generating...' : 'Download as PNG'}
        </Button>

        {/* Download PDF */}
        <Button
          onClick={downloadAsPDF}
          disabled={isDisabled || downloading}
          iconName="FileText"
          iconPosition="left"
          fullWidth
          className="justify-start neon-hover"
        >
          {downloading ? 'Generating...' : 'Download as PDF'}
        </Button>

        {/* Print */}
        <Button
          onClick={printQR}
          disabled={isDisabled}
          variant="outline"
          iconName="Printer"
          iconPosition="left"
          fullWidth
          className="justify-start neon-hover"
        >
          Print QR Code
        </Button>
      </div>

      {/* Download Info */}
      <div className="mt-6 p-3 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Download Options:</p>
            <ul className="space-y-1">
              <li>• PNG: High-quality image format for digital use</li>
              <li>• PDF: Professional format with student details included</li>
              <li>• Print: Direct printing with formatted layout</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadControls;