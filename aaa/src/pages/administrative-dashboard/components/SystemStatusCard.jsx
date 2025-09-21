import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemStatusCard = () => {
  const systemMetrics = [
    {
      label: "Total Students",
      value: "0",
      icon: "Users",
      color: "text-primary",
      bgColor: "bg-primary/20",
      change: "Ready to add",
      changeType: "neutral"
    },
    {
      label: "QR Codes Generated",
      value: "0",
      icon: "QrCode",
      color: "text-accent",
      bgColor: "bg-accent/20",
      change: "Awaiting generation",
      changeType: "neutral"
    },
    {
      label: "Today\'s Attendance",
      value: "0",
      icon: "CheckCircle",
      color: "text-success",
      bgColor: "bg-success/20",
      change: "No scans yet",
      changeType: "neutral"
    },
    {
      label: "System Status",
      value: "Online",
      icon: "Activity",
      color: "text-success",
      bgColor: "bg-success/20",
      change: "All systems operational",
      changeType: "positive"
    }
  ];

  return (
    <div className="glass rounded-xl p-6 gradient-overlay neon-hover lightning-transition">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-success to-green-600 rounded-lg flex items-center justify-center">
          <Icon name="Activity" size={20} color="white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground text-glow">System Overview</h2>
          <p className="text-muted-foreground text-sm">Current system metrics and status</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {systemMetrics?.map((metric, index) => (
          <div key={index} className="glass rounded-lg p-4 border border-border/30">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${metric?.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon name={metric?.icon} size={20} className={metric?.color} />
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${metric?.color} text-glow`}>
                  {metric?.value}
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">{metric?.label}</h4>
              <p className="text-sm text-muted-foreground">
                {metric?.change}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">System Status: Operational</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Last updated: {new Date()?.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatusCard;