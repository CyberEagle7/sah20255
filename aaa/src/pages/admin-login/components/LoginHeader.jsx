import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 p-6">
      <div className="max-w-7xl mx-auto">
        <Link 
          to="/landing-page" 
          className="inline-flex items-center space-x-3 text-foreground hover:text-primary lightning-transition neon-hover"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <Icon name="GraduationCap" size={24} color="white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-glow">
              Students Attendance Hub
            </h1>
            <p className="text-xs text-muted-foreground">
              Digital Attendance Management System
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default LoginHeader;