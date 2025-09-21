import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ onAddStudent }) => {
  return (
    <div className="glass rounded-xl p-12 text-center">
      {/* Animated Icon */}
      <div className="relative mb-8">
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
          <Icon name="Users" size={48} className="text-primary" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center animate-pulse">
          <Icon name="Plus" size={16} color="white" />
        </div>
        
        {/* Lightning Animation Elements */}
        <div className="absolute -top-4 -left-4 w-3 h-3 bg-primary rounded-full animate-ping opacity-75"></div>
        <div className="absolute -bottom-2 -right-4 w-2 h-2 bg-accent rounded-full animate-ping opacity-50" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Main Message */}
      <h2 className="text-2xl font-bold text-foreground mb-4 text-glow">
        No Students Yet
      </h2>
      
      <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
        Start building your student database by adding your first student record. 
        Once added, you'll be able to manage attendance, generate QR codes, and track participation.
      </p>

      {/* Features Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="glass rounded-lg p-4">
          <div className="w-12 h-12 mx-auto mb-3 bg-primary/20 rounded-lg flex items-center justify-center">
            <Icon name="UserPlus" size={24} className="text-primary" />
          </div>
          <h3 className="text-sm font-medium text-foreground mb-1">Add Students</h3>
          <p className="text-xs text-muted-foreground">
            Create comprehensive student profiles with contact details
          </p>
        </div>

        <div className="glass rounded-lg p-4">
          <div className="w-12 h-12 mx-auto mb-3 bg-accent/20 rounded-lg flex items-center justify-center">
            <Icon name="QrCode" size={24} className="text-accent" />
          </div>
          <h3 className="text-sm font-medium text-foreground mb-1">Generate QR Codes</h3>
          <p className="text-xs text-muted-foreground">
            Create unique QR codes for each student for quick attendance
          </p>
        </div>

        <div className="glass rounded-lg p-4">
          <div className="w-12 h-12 mx-auto mb-3 bg-success/20 rounded-lg flex items-center justify-center">
            <Icon name="BarChart3" size={24} className="text-success" />
          </div>
          <h3 className="text-sm font-medium text-foreground mb-1">Track Progress</h3>
          <p className="text-xs text-muted-foreground">
            Monitor attendance patterns and generate detailed reports
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="space-y-4">
        <Button
          variant="default"
          size="lg"
          onClick={onAddStudent}
          iconName="Plus"
          iconPosition="left"
          className="neon-hover"
        >
          Add Your First Student
        </Button>
        
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Zap" size={16} className="text-accent" />
          <span>Lightning-fast student management starts here</span>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="mt-8 pt-8 border-t border-border">
        <h3 className="text-sm font-medium text-foreground mb-4 flex items-center justify-center space-x-2">
          <Icon name="Lightbulb" size={16} className="text-warning" />
          <span>Quick Tips</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-muted-foreground">
          <div className="flex items-start space-x-2">
            <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
            <span>Use unique student IDs for easy identification</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
            <span>Include parent contact information for notifications</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
            <span>Organize students by class for better management</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
            <span>Keep student information up to date</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;