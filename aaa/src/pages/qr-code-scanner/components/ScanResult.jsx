import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ScanResult = ({ scanData, onConfirm, onCancel, isVisible }) => {
  if (!isVisible || !scanData) return null;

  const formatTimestamp = (timestamp) => {
    return timestamp
      ? new Date(timestamp).toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      : 'N/A';
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass rounded-2xl p-6 max-w-md w-full border border-border animate-slide-in">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-success/30">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          <h2 className="text-xl font-bold text-success text-glow mb-2">
            QR Code Scanned Successfully!
          </h2>
          <p className="text-sm text-muted-foreground">
            Student information retrieved
          </p>
        </div>

        {/* Student Information */}
        <div className="space-y-4 mb-6">
          <div className="bg-slate-800/50 rounded-lg p-4 border border-border">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide">Student ID</label>
                <p className="text-sm font-medium text-foreground mt-1">{scanData?.id || 'N/A'}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide">Roll Number</label>
                <p className="text-sm font-medium text-foreground mt-1">{scanData?.rollNumber || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4 border border-border">
            <label className="text-xs text-muted-foreground uppercase tracking-wide">Full Name</label>
            <p className="text-lg font-semibold text-foreground text-glow mt-1">{scanData?.name || 'Unknown Student'}</p>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4 border border-border">
            <label className="text-xs text-muted-foreground uppercase tracking-wide">Class</label>
            <p className="text-sm font-medium text-foreground mt-1">{scanData?.class || 'N/A'}</p>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4 border border-border">
            <label className="text-xs text-muted-foreground uppercase tracking-wide">Scan Time</label>
            <p className="text-sm font-medium text-foreground mt-1">{formatTimestamp(scanData?.timestamp)}</p>
          </div>
        </div>

        {/* Attendance Status */}
        <div className="bg-success/10 rounded-lg p-4 border border-success/20 mb-6 flex items-center space-x-3">
          <Icon name="UserCheck" size={20} className="text-success" />
          <div>
            <h4 className="text-sm font-medium text-success">Attendance Marked</h4>
            <p className="text-xs text-success/80">Student will be marked as present for today</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            variant="default"
            onClick={onConfirm}
            iconName="Check"
            iconPosition="left"
            className="flex-1"
          >
            Confirm Attendance
          </Button>
          
          <Button
            variant="outline"
            onClick={onCancel}
            iconName="X"
            iconPosition="left"
          >
            Cancel
          </Button>
        </div>

        {/* Optional Actions */}
        <div className="mt-4 pt-4 border-t border-border flex justify-center space-x-4">
          <button className="text-xs text-muted-foreground hover:text-foreground lightning-transition flex items-center space-x-1">
            <Icon name="Eye" size={14} />
            <span>View Profile</span>
          </button>
          <button className="text-xs text-muted-foreground hover:text-foreground lightning-transition flex items-center space-x-1">
            <Icon name="History" size={14} />
            <span>Attendance History</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanResult;
