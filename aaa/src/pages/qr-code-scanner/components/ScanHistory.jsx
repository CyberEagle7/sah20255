import React from 'react';
import Icon from '../../../components/AppIcon';

const ScanResult = ({ scanData }) => {
  if (!scanData) {
    return (
      <div className="glass rounded-xl p-6 border border-border text-center">
        <Icon name="User" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Scan Data</h3>
        <p className="text-muted-foreground text-sm">
          Scanned student details will appear here after scanning a QR code.
        </p>
      </div>
    );
  }

  const statusColor = scanData.status === 'success'
    ? 'text-success'
    : scanData.status === 'duplicate'
      ? 'text-warning'
      : 'text-error';

  const statusText = scanData.status === 'success'
    ? 'Present'
    : scanData.status === 'duplicate'
      ? 'Duplicate'
      : 'Error';

  return (
    <div className="glass rounded-xl p-6 border border-border flex flex-col space-y-4">
      <div className="flex items-center space-x-4">
        <Icon
          name="UserCheck"
          size={40}
          className={`flex-shrink-0 ${statusColor}`}
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-semibold text-foreground truncate">
            {scanData.studentName || 'Unknown Student'}
          </h4>
          <p className="text-sm text-muted-foreground">
            {scanData.class || 'N/A'} • Roll: {scanData.rollNumber || 'N/A'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            ID: {scanData.id || 'N/A'}
          </p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${statusColor} bg-${scanData.status === 'success' ? 'success/20' : scanData.status === 'duplicate' ? 'warning/20' : 'error/20'}`}>
          {statusText}
        </span>
      </div>

      {scanData.timestamp && (
        <p className="text-xs text-muted-foreground text-right">
          Scanned at: {new Date(scanData.timestamp).toLocaleString()}
        </p>
      )}
    </div>
  );
};

export default ScanResult;
