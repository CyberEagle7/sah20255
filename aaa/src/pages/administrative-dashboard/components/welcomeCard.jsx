import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeCard = () => {
  return (
    <div className="glass rounded-xl p-8 gradient-overlay border border-border">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
        {/* Main Welcome Content */}
        <div className="flex items-center space-x-6">
          {/* Brand Logo */}
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center lightning-glow">
            <span className="text-white font-bold text-2xl">NF</span>
          </div>
          
          {/* Welcome Text */}
          <div>
            <h1 className="text-4xl font-bold text-foreground text-glow mb-2">
              Welcome to NOVA FORGE
            </h1>
            <p className="text-xl text-muted-foreground mb-1">
              Students Attendance Hub - College System
            </p>
            <p className="text-muted-foreground">
              Modern attendance management for college lectures with real-time analytics
            </p>
          </div>
        </div>

        {/* System Status */}
        <div className="lg:text-right">
          <div className="flex items-center space-x-3 mb-3 lg:justify-end">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
              <span className="text-success font-medium">System Online</span>
            </div>
            <div className="w-px h-4 bg-border"></div>
            <span className="text-muted-foreground text-sm">
              {new Date()?.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          
          <div className="flex items-center space-x-4 lg:justify-end">
            <div className="flex items-center space-x-2 text-sm">
              <Icon name="Clock" size={14} className="text-primary" />
              <span className="text-foreground">
                {new Date()?.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Quick Stats Bar */}
      <div className="mt-8 pt-6 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Students</p>
              <p className="text-lg font-semibold text-foreground">Real-time data</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Today's Lectures</p>
              <p className="text-lg font-semibold text-foreground">Active tracking</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="BarChart3" size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Live Analytics</p>
              <p className="text-lg font-semibold text-foreground">Performance insights</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;