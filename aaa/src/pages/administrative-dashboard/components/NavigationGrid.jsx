import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const NavigationGrid = () => {
  const navigationItems = [
    {
      id: 'students',
      title: 'Student Management',
      description: 'Add, edit, and manage college students database',
      icon: 'Users',
      path: '/student-management',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      id: 'attendance',
      title: 'Attendance Tracking',
      description: 'Mark and view lecture-wise attendance records',
      icon: 'Calendar',
      path: '/attendance',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      id: 'qr-generator',
      title: 'QR Code Generator',
      description: 'Generate unique QR codes for student identification',
      icon: 'QrCode',
      path: '/qr-code-generator',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      id: 'qr-scanner',
      title: 'QR Code Scanner',
      description: 'Scan student QR codes for quick attendance marking',
      icon: 'Scan',
      path: '/qr-code-scanner',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    },
    {
      id: 'analytics',
      title: 'Analytics Dashboard',
      description: 'Live analytics and attendance performance insights',
      icon: 'BarChart3',
      path: '/analytics-dashboard',
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/20'
    },
    {
      id: 'settings',
      title: 'System Settings',
      description: 'Configure notifications, alerts, and system preferences',
      icon: 'Settings',
      path: '/settings',
      color: 'from-gray-500 to-gray-600',
      bgColor: 'bg-gray-500/10',
      borderColor: 'border-gray-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {navigationItems?.map((item) => (
        <Link
          key={item?.id}
          to={item?.path}
          className="group relative glass rounded-xl p-6 border border-border hover:border-primary/50 lightning-transition-fast neon-hover"
        >
          {/* Icon */}
          <div className={`w-14 h-14 bg-gradient-to-br ${item?.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 lightning-transition-fast`}>
            <Icon name={item?.icon} size={24} color="white" />
          </div>

          {/* Content */}
          <div>
            <h3 className="text-lg font-semibold text-foreground text-glow mb-2 group-hover:text-primary lightning-transition-fast">
              {item?.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 lightning-transition-fast">
              {item?.description}
            </p>
          </div>

          {/* Arrow Icon */}
          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 lightning-transition-fast">
            <Icon name="ArrowRight" size={20} className="text-primary" />
          </div>

          {/* Hover Effect Overlay */}
          <div className={`absolute inset-0 ${item?.bgColor} border ${item?.borderColor} rounded-xl opacity-0 group-hover:opacity-100 lightning-transition-fast -z-10`} />
        </Link>
      ))}
    </div>
  );
};

export default NavigationGrid;