import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ScanControls = ({ onManualEntry, isScanning, onToggleScanning }) => {
  const [manualCode, setManualCode] = useState('');
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleManualSubmit = async (e) => {
    e?.preventDefault();
    if (!manualCode?.trim()) return;

    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      onManualEntry(manualCode?.trim());
      setManualCode('');
      setShowManualEntry(false);
      setIsProcessing(false);
    }, 1000);
  };

  const toggleManualEntry = () => {
    setShowManualEntry(!showManualEntry);
    setManualCode('');
  };

  return (
    <div className="space-y-4">
      {/* Main Controls */}
      <div className="glass rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground text-glow">
            Scanner Controls
          </h3>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isScanning ? 'bg-success animate-pulse' : 'bg-muted'}`}></div>
            <span className="text-sm text-muted-foreground">
              {isScanning ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            variant={isScanning ? "destructive" : "default"}
            onClick={onToggleScanning}
            iconName={isScanning ? "Square" : "Play"}
            iconPosition="left"
            className="w-full"
          >
            {isScanning ? 'Stop Scanning' : 'Start Scanning'}
          </Button>

          <Button
            variant="outline"
            onClick={toggleManualEntry}
            iconName="Keyboard"
            iconPosition="left"
            className="w-full"
          >
            Manual Entry
          </Button>
        </div>

        {/* Scanner Instructions */}
        <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-primary mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-primary mb-1">Scanning Instructions</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Position QR code within the scanning frame</li>
                <li>• Ensure good lighting for optimal scanning</li>
                <li>• Hold device steady until scan completes</li>
                <li>• Use manual entry if camera scanning fails</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Manual Entry Form */}
      {showManualEntry && (
        <div className="glass rounded-xl p-6 border border-border animate-slide-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground text-glow">
              Manual Code Entry
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleManualEntry}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          <form onSubmit={handleManualSubmit} className="space-y-4">
            <Input
              label="QR Code"
              type="text"
              placeholder="Enter QR code manually"
              value={manualCode}
              onChange={(e) => setManualCode(e?.target?.value)}
              description="Enter the QR code text if camera scanning is not available"
              required
            />

            <div className="flex space-x-3">
              <Button
                type="submit"
                loading={isProcessing}
                disabled={!manualCode?.trim() || isProcessing}
                iconName="Check"
                iconPosition="left"
                className="flex-1"
              >
                {isProcessing ? 'Processing...' : 'Submit Code'}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={() => setManualCode('')}
                disabled={isProcessing}
                iconName="RotateCcw"
                iconPosition="left"
              >
                Clear
              </Button>
            </div>
          </form>

          <div className="mt-4 p-3 bg-warning/10 rounded-lg border border-warning/20">
            <div className="flex items-start space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
              <p className="text-xs text-warning">
                Manual entry should only be used when camera scanning is unavailable or fails repeatedly.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanControls;
