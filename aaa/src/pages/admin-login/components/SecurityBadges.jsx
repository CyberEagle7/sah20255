import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'Secure Authentication',
      description: 'End-to-end encrypted login process'
    },
    {
      icon: 'Lock',
      title: 'Data Protection',
      description: 'FERPA compliant student data security'
    },
    {
      icon: 'Eye',
      title: 'Privacy First',
      description: 'No tracking, no data sharing'
    }
  ];

  return (
    <div className="mt-8 pt-8 border-t border-border">
      <h3 className="text-sm font-medium text-muted-foreground text-center mb-6">
        Trusted by Educational Institutions
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {securityFeatures?.map((feature, index) => (
          <div
            key={index}
            className="glass rounded-lg p-4 text-center group neon-hover lightning-transition"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:from-primary/30 group-hover:to-accent/30 lightning-transition">
              <Icon name={feature?.icon} size={16} className="text-primary" />
            </div>
            <h4 className="text-xs font-medium text-foreground mb-1">
              {feature?.title}
            </h4>
            <p className="text-xs text-muted-foreground">
              {feature?.description}
            </p>
          </div>
        ))}
      </div>
      {/* Trust Indicators */}
      <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="CheckCircle" size={14} className="text-success" />
          <span>SSL Secured</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="CheckCircle" size={14} className="text-success" />
          <span>GDPR Compliant</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="CheckCircle" size={14} className="text-success" />
          <span>SOC 2 Certified</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;