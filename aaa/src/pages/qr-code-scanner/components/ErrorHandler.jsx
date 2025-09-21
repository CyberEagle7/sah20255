import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ErrorHandler = ({ error, onRetry, onDismiss, isVisible }) => {
  if (!isVisible || !error) return null;

  const getErrorIcon = (type) => {
    switch (type) {
      case 'camera': return 'Camera';
      case 'permission': return 'Shield';
      case 'network': return 'Wifi';
      case 'invalid_code': return 'AlertTriangle';
      case 'duplicate': return 'Copy';
      case 'student_not_found': return 'UserX';
      default: return 'AlertCircle';
    }
  };

  const getErrorColor = (type) => {
    switch (type) {
      case 'duplicate': return 'warning';
      case 'permission': return 'error';
      case 'network': return 'error';
      default: return 'error';
    }
  };

  const getErrorTitle = (type) => {
    switch (type) {
      case 'camera': return 'Camera Error';
      case 'permission': return 'Permission Denied';
      case 'network': return 'Network Error';
      case 'invalid_code': return 'Invalid QR Code';
      case 'duplicate': return 'Duplicate Scan';
      case 'student_not_found': return 'Student Not Found';
      default: return 'Scan Error';
    }
  };

  const getErrorMessage = (type, message) => {
    const defaultMessages = {
      camera: 'Unable to access camera. Please check your device settings and try again.',
      permission: 'Camera permission is required to scan QR codes. Please enable camera access in your browser settings.',
      network: 'Unable to connect to the server. Please check your internet connection and try again.',
      invalid_code: 'The scanned QR code is not valid or corrupted. Please try scanning again.',
      duplicate: 'This student has already been marked present today. Duplicate attendance entries are not allowed.',
      student_not_found: 'The scanned QR code does not match any student in the system. Please verify the code.'
    };
    
    return message || defaultMessages?.[type] || 'An unexpected error occurred while scanning.';
  };

  const errorColor = getErrorColor(error?.type);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass rounded-2xl p-6 max-w-md w-full border border-border animate-slide-in">
        {/* Error Header */}
        <div className="text-center mb-6">
          <div className={`w-16 h-16 bg-${errorColor}/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-${errorColor}/30`}>
            <Icon name={getErrorIcon(error?.type)} size={32} className={`text-${errorColor}`} />
          </div>
          <h2 className={`text-xl font-bold text-${errorColor} mb-2`}>
            {getErrorTitle(error?.type)}
          </h2>
          <p className="text-sm text-muted-foreground">
            {getErrorMessage(error?.type, error?.message)}
          </p>
        </div>

        {/* Error Details */}
        {error?.details && (
          <div className="bg-slate-800/50 rounded-lg p-4 mb-6 border border-border">
            <h4 className="text-sm font-medium text-foreground mb-2">Error Details:</h4>
            <p className="text-xs text-muted-foreground font-mono">
              {error?.details}
            </p>
          </div>
        )}

        {/* Troubleshooting Tips */}
        {error?.type === 'camera' && (
          <div className="bg-primary/10 rounded-lg p-4 mb-6 border border-primary/20">
            <h4 className="text-sm font-medium text-primary mb-2">Troubleshooting Tips:</h4>
            <ul className="text-xs text-primary/80 space-y-1">
              <li>• Ensure camera is not being used by another application</li>
              <li>• Check if camera permissions are enabled</li>
              <li>• Try refreshing the page and allowing camera access</li>
              <li>• Use manual entry as an alternative</li>
            </ul>
          </div>
        )}

        {error?.type === 'permission' && (
          <div className="bg-primary/10 rounded-lg p-4 mb-6 border border-primary/20">
            <h4 className="text-sm font-medium text-primary mb-2">How to Enable Camera:</h4>
            <ul className="text-xs text-primary/80 space-y-1">
              <li>• Click the camera icon in your browser's address bar</li>
              <li>• Select "Allow" for camera permissions</li>
              <li>• Refresh the page after granting permission</li>
              <li>• Contact IT support if issues persist</li>
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          {onRetry && (
            <Button
              variant="default"
              onClick={onRetry}
              iconName="RotateCcw"
              iconPosition="left"
              className="flex-1"
            >
              Try Again
            </Button>
          )}
          
          <Button
            variant="outline"
            onClick={onDismiss}
            iconName="X"
            iconPosition="left"
            className={onRetry ? '' : 'flex-1'}
          >
            {onRetry ? 'Cancel' : 'Close'}
          </Button>
        </div>

        {/* Alternative Actions */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex justify-center space-x-4">
            <button className="text-xs text-muted-foreground hover:text-foreground lightning-transition flex items-center space-x-1">
              <Icon name="Keyboard" size={14} />
              <span>Use Manual Entry</span>
            </button>
            <button className="text-xs text-muted-foreground hover:text-foreground lightning-transition flex items-center space-x-1">
              <Icon name="HelpCircle" size={14} />
              <span>Get Help</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorHandler;