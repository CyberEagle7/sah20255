import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCard = () => {
  const quickActions = [
    {
      title: "Add New Student",
      description: "Register a new student in the system",
      icon: "UserPlus",
      path: "/student-management",
      color: "from-primary to-blue-600",
      glowColor: "text-glow"
    },
    {
      title: "Generate QR Code",
      description: "Create QR codes for attendance tracking",
      icon: "QrCode",
      path: "/qr-code-generator",
      color: "from-accent to-cyan-600",
      glowColor: "text-glow-accent"
    }
  ];

  return (
    <div className="glass rounded-xl p-6 gradient-overlay neon-hover lightning-transition">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-warning to-orange-500 rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={20} color="white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground text-glow">Quick Actions</h2>
          <p className="text-muted-foreground text-sm">Get started with essential tasks</p>
        </div>
      </div>
      <div className="space-y-4">
        {quickActions?.map((action, index) => (
          <Link
            key={index}
            to={action?.path}
            className="block group"
          >
            <div className="glass rounded-lg p-4 neon-hover lightning-transition border border-border/50 hover:border-primary/30">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${action?.color} rounded-lg flex items-center justify-center group-hover:scale-110 lightning-transition`}>
                  <Icon name={action?.icon} size={24} color="white" />
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold text-foreground ${action?.glowColor} group-hover:text-primary lightning-transition`}>
                    {action?.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {action?.description}
                  </p>
                </div>
                <Icon 
                  name="ArrowRight" 
                  size={20} 
                  className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 lightning-transition" 
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border/30">
        <Button
          variant="outline"
          fullWidth
          iconName="Plus"
          iconPosition="left"
          className="neon-hover"
        >
          View All Actions
        </Button>
      </div>
    </div>
  );
};

export default QuickActionCard;