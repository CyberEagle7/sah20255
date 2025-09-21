import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import StudentSelector from './components/StudentSelector';
import QRCodeDisplay from './components/QRCodeDisplay';
import DownloadControls from './components/DownloadControls';
import BatchGenerator from './components/BatchGenerator';

const QRCodeGenerator = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [qrData, setQrData] = useState(null);
  const [activeTab, setActiveTab] = useState('individual');

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
  };

  const handleQRGenerated = (data) => {
    setQrData(data);
  };

  const tabs = [
    { id: 'individual', label: 'Individual QR', icon: 'User' },
    { id: 'batch', label: 'Batch Generate', icon: 'Users' }
  ];

  return (
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
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <Icon name="QrCode" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground text-glow">
                  QR Code Generator
                </h1>
                <p className="text-muted-foreground mt-1">
                  Generate unique attendance QR codes for students with download capabilities
                </p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="flex space-x-1 bg-muted/10 p-1 rounded-lg w-fit">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg lightning-transition-fast ${
                    activeTab === tab?.id
                      ? 'bg-primary text-primary-foreground text-glow'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/20'
                  }`}
                >
                  <Icon name={tab?.icon} size={18} />
                  <span className="font-medium">{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'individual' ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                <StudentSelector 
                  onStudentSelect={handleStudentSelect}
                  selectedStudent={selectedStudent}
                />
                
                <DownloadControls 
                  student={selectedStudent}
                  qrData={qrData}
                  isDisabled={!selectedStudent || !qrData}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                <QRCodeDisplay 
                  student={selectedStudent}
                  onQRGenerated={handleQRGenerated}
                />

                {/* Quick Actions */}
                {selectedStudent && qrData && (
                  <div className="glass rounded-xl p-6 border border-border">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Quick Actions
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Link to="/qr-code-scanner">
                        <Button
                          variant="outline"
                          iconName="Scan"
                          iconPosition="left"
                          fullWidth
                          className="neon-hover"
                        >
                          Test Scanner
                        </Button>
                      </Link>
                      <Link to="/student-management">
                        <Button
                          variant="outline"
                          iconName="Users"
                          iconPosition="left"
                          fullWidth
                          className="neon-hover"
                        >
                          Manage Students
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <BatchGenerator />
            </div>
          )}

          {/* Help Section */}
          <div className="mt-12 glass rounded-xl p-6 border border-border">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="HelpCircle" size={20} color="white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground text-glow mb-2">
                  How to Use QR Code Generator
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Individual Generation</h4>
                    <ol className="space-y-1 list-decimal list-inside">
                      <li>Select a student from the dropdown menu</li>
                      <li>QR code will be automatically generated</li>
                      <li>Choose download format (PNG or PDF)</li>
                      <li>Use the print option for physical copies</li>
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Batch Generation</h4>
                    <ol className="space-y-1 list-decimal list-inside">
                      <li>Switch to the "Batch Generate" tab</li>
                      <li>Select multiple students using checkboxes</li>
                      <li>Choose format and size options</li>
                      <li>Click "Generate Batch" to download all QR codes</li>
                    </ol>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm text-foreground">
                    <Icon name="Shield" size={16} className="inline mr-2 text-primary" />
                    Each QR code contains unique student identifiers and timestamps for secure attendance tracking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QRCodeGenerator;