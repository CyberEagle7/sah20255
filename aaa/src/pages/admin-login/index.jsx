import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import LoginBackground from './components/LoginBackground';
import LoginHeader from './components/LoginHeader';
import SecurityBadges from './components/SecurityBadges';

const AdminLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/administrative-dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <LoginBackground />
      {/* Header */}
      <LoginHeader />
      {/* Main Content */}
      <main className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="glass rounded-2xl p-8 shadow-2xl border border-border neon-hover lightning-transition">
            <LoginForm />
            <SecurityBadges />
          </div>
          
          {/* Footer Links */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              Need help accessing your account?{' '}
              <button className="text-primary hover:text-accent lightning-transition text-glow-accent">
                Contact IT Support
              </button>
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              © {new Date()?.getFullYear()} Students Attendance Hub. All rights reserved.
            </p>
          </div>
        </div>
      </main>
      {/* Mobile Optimization Notice */}
      <div className="fixed bottom-4 left-4 right-4 sm:hidden">
        <div className="glass rounded-lg p-3 border border-accent/20">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <p className="text-xs text-muted-foreground">
              For best experience, use desktop or tablet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;