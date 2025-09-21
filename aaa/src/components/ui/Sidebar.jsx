import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const location = useLocation();

  const navigationItems = [
    { 
      label: 'Dashboard', 
      path: '/administrative-dashboard', 
      icon: 'LayoutDashboard',
      description: 'System overview and analytics'
    },
    { 
      label: 'Students', 
      path: '/student-management', 
      icon: 'Users',
      description: 'Manage student profiles and data'
    },
    { 
      label: 'QR Generator', 
      path: '/qr-code-generator', 
      icon: 'QrCode',
      description: 'Generate attendance QR codes'
    },
    { 
      label: 'Scanner', 
      path: '/qr-code-scanner', 
      icon: 'Scan',
      description: 'Scan QR codes for attendance'
    },
  ];

  const quickActions = [
    { label: 'Settings', icon: 'Settings', path: '/settings' },
    { label: 'Help', icon: 'HelpCircle', path: '/help' },
    { label: 'Logout', icon: 'LogOut', action: 'logout' },
  ];

  const isActive = (path) => location?.pathname === path;

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logout clicked');
  };

  const handleQuickAction = (item) => {
    if (item?.action === 'logout') {
      handleLogout();
    }
  };

  return (
    <aside className={`fixed left-0 top-16 bottom-0 z-40 glass nav-float border-r border-border lightning-transition ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Collapse Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-foreground text-glow">
              Navigation
            </h2>
          )}
          {onToggleCollapse && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="neon-hover"
            >
              <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={20} />
            </Button>
          )}
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`group flex items-center space-x-3 px-3 py-3 rounded-lg lightning-transition-fast ${
                isActive(item?.path)
                  ? 'bg-primary/20 text-primary text-glow border border-primary/30' :'text-muted-foreground hover:text-foreground hover:bg-muted/20 neon-hover'
              }`}
              title={isCollapsed ? item?.label : ''}
            >
              <Icon name={item?.icon} size={20} className="flex-shrink-0" />
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{item?.label}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {item?.description}
                  </div>
                </div>
              )}
            </Link>
          ))}
        </nav>

        {/* Quick Actions */}
        <div className="p-4 border-t border-border">
          {!isCollapsed && (
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Quick Actions
            </h3>
          )}
          <div className="space-y-1">
            {quickActions?.map((item) => (
              item?.path ? (
                <Link
                  key={item?.label}
                  to={item?.path}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/20 lightning-transition-fast neon-hover"
                  title={isCollapsed ? item?.label : ''}
                >
                  <Icon name={item?.icon} size={18} className="flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="text-sm font-medium">{item?.label}</span>
                  )}
                </Link>
              ) : (
                <button
                  key={item?.label}
                  onClick={() => handleQuickAction(item)}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/20 lightning-transition-fast neon-hover"
                  title={isCollapsed ? item?.label : ''}
                >
                  <Icon name={item?.icon} size={18} className="flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="text-sm font-medium">{item?.label}</span>
                  )}
                </button>
              )
            ))}
          </div>
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-t border-border">
          <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground truncate">
                  Administrator
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  admin@school.edu
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;