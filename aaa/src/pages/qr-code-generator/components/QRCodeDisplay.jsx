import React, { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
 import Icon from'../../../components/AppIcon';

const QRCodeDisplay = ({ student, onQRGenerated }) => {
  const [qrData, setQrData] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    if (student) {
      generateQRData()
    } else {
      setQrData(null)
      onQRGenerated?.(null)
    }
  }, [student])

  const generateQRData = () => {
    if (!student) return

    setIsGenerating(true)

    // Generate QR data with student information and timestamp
    const qrInfo = {
      studentId: student?.id,
      name: student?.name,
      rollNo: student?.roll_no,
      department: student?.department,
      year: student?.year,
      timestamp: new Date().toISOString(),
      type: 'attendance_qr'
    }

    const qrString = JSON.stringify(qrInfo)
    setQrData(qrString)
    
    setTimeout(() => {
      setIsGenerating(false)
      onQRGenerated?.(qrInfo)
    }, 500) // Small delay for visual feedback
  }

  if (!student) {
    return (
      <div className="glass rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">QR Code Preview</h3>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-32 h-32 bg-muted/20 border-2 border-dashed border-border rounded-xl flex items-center justify-center mb-4">
            <Icon name="QrCode" size={48} className="text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-center">
            Select a student to generate QR code
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="glass rounded-xl p-6 border border-border">
      <div className="flex items-center space-x-3 mb-4">
        <Icon name="QrCode" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">QR Code Preview</h3>
      </div>

      {isGenerating ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Generating QR code...</p>
        </div>
      ) : (
        <div className="text-center">
          {/* QR Code */}
          <div className="inline-block p-6 bg-white rounded-2xl shadow-lg mb-6" id="qr-code-container">
            <QRCodeCanvas
              value={qrData || ''}
              size={256}
              level="H"
              includeMargin={true}
              imageSettings={{
                src: "/favicon.ico",
                x: undefined,
                y: undefined,
                height: 24,
                width: 24,
                excavate: true,
              }}
            />
          </div>

          {/* Student Information */}
          <div className="text-left bg-muted/10 rounded-lg p-4 mb-6 border border-border">
            <h4 className="font-medium text-foreground mb-3 flex items-center">
              <Icon name="User" size={16} className="mr-2 text-primary" />
              Student Details in QR Code
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Name:</span>
                <p className="text-foreground font-medium">{student?.name}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Roll No:</span>
                <p className="text-foreground font-medium">{student?.roll_no}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Department:</span>
                <p className="text-foreground font-medium">{student?.department}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Year:</span>
                <p className="text-foreground font-medium">{student?.year}</p>
              </div>
            </div>
          </div>

          {/* QR Code Features */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2 p-3 bg-success/10 border border-success/20 rounded-lg">
              <Icon name="Shield" size={16} className="text-success" />
              <div className="text-left">
                <p className="font-medium text-foreground">Secure</p>
                <p className="text-muted-foreground text-xs">Timestamped data</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <Icon name="Zap" size={16} className="text-primary" />
              <div className="text-left">
                <p className="font-medium text-foreground">Fast Scan</p>
                <p className="text-muted-foreground text-xs">High error correction</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default QRCodeDisplay