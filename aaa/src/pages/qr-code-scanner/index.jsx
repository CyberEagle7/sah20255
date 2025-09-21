import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CameraViewport from './components/CameraViewport';
import ScanControls from './components/ScanControls';
import ScanResult from './components/ScanResult';
import ScanHistory from './components/ScanHistory';
import ErrorHandler from './components/ErrorHandler';

const QRCodeScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [scanHistory, setScanHistory] = useState([]);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [stats, setStats] = useState({
    totalScans: 0,
    successfulScans: 0,
    duplicateScans: 0,
    errorScans: 0
  });

  // Mock existing attendance data to check for duplicates
  const [existingAttendance] = useState([
    { studentId: 'STU002', date: new Date()?.toDateString() },
    { studentId: 'STU005', date: new Date()?.toDateString() }
  ]);

  useEffect(() => {
    // Update stats when scan history changes
    const successful = scanHistory?.filter(scan => scan?.status === 'success')?.length;
    const duplicates = scanHistory?.filter(scan => scan?.status === 'duplicate')?.length;
    const errors = scanHistory?.filter(scan => scan?.status === 'error')?.length;
    
    setStats({
      totalScans: scanHistory?.length,
      successfulScans: successful,
      duplicateScans: duplicates,
      errorScans: errors
    });
  }, [scanHistory]);

  const handleToggleScanning = () => {
    setIsScanning(!isScanning);
    setError(null);
    setShowError(false);
  };

  const handleScanResult = (result) => {
    setIsScanning(false);
    
    // Check for duplicate attendance
    const isDuplicate = existingAttendance?.some(
      attendance => attendance?.studentId === result?.id && 
      attendance?.date === new Date()?.toDateString()
    );

    if (isDuplicate) {
      const duplicateError = {
        type: 'duplicate',
        message: `${result?.name} has already been marked present today.`,
        details: `Student ID: ${result?.id}, Previous scan time: ${new Date()?.toLocaleTimeString()}`
      };
      setError(duplicateError);
      setShowError(true);
      
      // Add to history as duplicate
      const historyEntry = {
        studentId: result?.id,
        studentName: result?.name,
        rollNumber: result?.rollNumber,
        class: result?.class,
        timestamp: result?.timestamp,
        status: 'duplicate'
      };
      setScanHistory(prev => [historyEntry, ...prev]);
      return;
    }

    // Simulate random errors for demonstration
    const shouldError = Math.random() < 0.1; // 10% chance of error
    if (shouldError) {
      const randomErrors = [
        {
          type: 'invalid_code',
          message: 'The QR code appears to be corrupted or invalid.',
          details: 'Error code: QR_INVALID_FORMAT'
        },
        {
          type: 'student_not_found',
          message: 'This QR code does not match any student in our database.',
          details: `Scanned code: ${result?.id}`
        },
        {
          type: 'network',
          message: 'Unable to verify student information due to network issues.',
          details: 'Connection timeout after 5 seconds'
        }
      ];
      
      const randomError = randomErrors?.[Math.floor(Math.random() * randomErrors?.length)];
      setError(randomError);
      setShowError(true);
      
      // Add to history as error
      const historyEntry = {
        studentId: result?.id,
        studentName: result?.name,
        rollNumber: result?.rollNumber,
        class: result?.class,
        timestamp: result?.timestamp,
        status: 'error'
      };
      setScanHistory(prev => [historyEntry, ...prev]);
      return;
    }

    setScanResult(result);
    setShowResult(true);
  };

  const handleManualEntry = (code) => {
    // Simulate processing manual entry
    const mockResult = {
      id: code,
      name: "Sarah Johnson",
      rollNumber: "2024002",
      class: "Grade 11-B",
      timestamp: new Date()?.toISOString()
    };
    
    handleScanResult(mockResult);
  };

  const handleConfirmAttendance = () => {
    if (scanResult) {
      // Add to history as successful
      const historyEntry = {
        studentId: scanResult?.id,
        studentName: scanResult?.name,
        rollNumber: scanResult?.rollNumber,
        class: scanResult?.class,
        timestamp: scanResult?.timestamp,
        status: 'success'
      };
      setScanHistory(prev => [historyEntry, ...prev]);
      
      // Add to existing attendance to prevent duplicates
      existingAttendance?.push({
        studentId: scanResult?.id,
        date: new Date()?.toDateString()
      });
    }
    
    setShowResult(false);
    setScanResult(null);
  };

  const handleCancelScan = () => {
    setShowResult(false);
    setScanResult(null);
  };

  const handleClearHistory = () => {
    setScanHistory([]);
  };

  const handleRetryError = () => {
    setShowError(false);
    setError(null);
    setIsScanning(true);
  };

  const handleDismissError = () => {
    setShowError(false);
    setError(null);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <>
      <Helmet>
        <title>QR Code Scanner - Students Attendance Hub</title>
        <meta name="description" content="Scan QR codes for student attendance tracking with real-time verification and history management." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggleCollapse={toggleSidebar}
        />
        
        <main className={`pt-16 lightning-transition ${
          isSidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}>
          <div className="p-6 max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Icon name="Scan" size={24} color="white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground text-glow">
                    QR Code Scanner
                  </h1>
                  <p className="text-muted-foreground">
                    Scan student QR codes for attendance tracking
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glass rounded-lg p-4 border border-border">
                  <div className="flex items-center space-x-2">
                    <Icon name="Scan" size={20} className="text-primary" />
                    <div>
                      <p className="text-lg font-semibold text-foreground">
                        {stats?.totalScans}
                      </p>
                      <p className="text-xs text-muted-foreground">Total Scans</p>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-lg p-4 border border-border">
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={20} className="text-success" />
                    <div>
                      <p className="text-lg font-semibold text-success">
                        {stats?.successfulScans}
                      </p>
                      <p className="text-xs text-muted-foreground">Successful</p>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-lg p-4 border border-border">
                  <div className="flex items-center space-x-2">
                    <Icon name="AlertTriangle" size={20} className="text-warning" />
                    <div>
                      <p className="text-lg font-semibold text-warning">
                        {stats?.duplicateScans}
                      </p>
                      <p className="text-xs text-muted-foreground">Duplicates</p>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-lg p-4 border border-border">
                  <div className="flex items-center space-x-2">
                    <Icon name="XCircle" size={20} className="text-error" />
                    <div>
                      <p className="text-lg font-semibold text-error">
                        {stats?.errorScans}
                      </p>
                      <p className="text-xs text-muted-foreground">Errors</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Scanner Section */}
              <div className="lg:col-span-2 space-y-6">
                {/* Camera Viewport */}
                <CameraViewport
                  isScanning={isScanning}
                  onScanResult={handleScanResult}
                  onToggleScanning={handleToggleScanning}
                />

                {/* Scan Controls */}
                <ScanControls
                  onManualEntry={handleManualEntry}
                  isScanning={isScanning}
                  onToggleScanning={handleToggleScanning}
                />
              </div>

              {/* History Section */}
              <div className="lg:col-span-1">
                <ScanHistory
                  history={scanHistory}
                  onClearHistory={handleClearHistory}
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Scanner Status */}
              <div className="glass rounded-xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground text-glow mb-4">
                  Scanner Status
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Camera Access</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-sm text-success">Granted</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Scanner Mode</span>
                    <span className="text-sm text-foreground">
                      {isScanning ? 'Active' : 'Standby'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Last Scan</span>
                    <span className="text-sm text-foreground">
                      {scanHistory?.length > 0 
                        ? new Date(scanHistory[0].timestamp)?.toLocaleTimeString()
                        : 'None'
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="glass rounded-xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground text-glow mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    iconName="Users"
                    iconPosition="left"
                    className="w-full justify-start"
                  >
                    View All Students
                  </Button>
                  <Button
                    variant="outline"
                    iconName="FileText"
                    iconPosition="left"
                    className="w-full justify-start"
                  >
                    Generate Report
                  </Button>
                  <Button
                    variant="outline"
                    iconName="QrCode"
                    iconPosition="left"
                    className="w-full justify-start"
                  >
                    QR Code Generator
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Modals */}
        <ScanResult
          result={scanResult}
          onConfirm={handleConfirmAttendance}
          onCancel={handleCancelScan}
          isVisible={showResult}
        />

        <ErrorHandler
          error={error}
          onRetry={handleRetryError}
          onDismiss={handleDismissError}
          isVisible={showError}
        />
      </div>
    </>
  );
};

export default QRCodeScanner;