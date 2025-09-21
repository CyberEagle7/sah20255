import React from 'react';
import { Helmet } from 'react-helmet';
import WelcomeCard from './components/welcomeCard';
import QuickActionCard from './components/QuickActionCard';
import NavigationGrid from './components/NavigationGrid';
import SystemStatusCard from './components/SystemStatusCard';
import RecentActivityCard from './components/RecentActivityCard';

const AdministrativeDashboard = () => {
  return (
    <>
      <Helmet>
        <title>Administrative Dashboard - Students Attendance Hub</title>
        <meta name="description" content="Central command center for attendance management with system overview and quick access to primary functions." />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <WelcomeCard />
          </div>

          {/* Dashboard Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Navigation Grid */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground text-glow mb-2">
                  System Navigation
                </h2>
                <p className="text-muted-foreground">
                  Access all primary functions from your dashboard
                </p>
              </div>
              <NavigationGrid />
            </div>

            {/* Right Column - Quick Actions & Status */}
            <div className="space-y-6">
              <QuickActionCard />
              <SystemStatusCard />
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="mb-8">
            <RecentActivityCard />
          </div>

          {/* Footer Information */}
          <div className="glass rounded-xl p-6 gradient-overlay">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">SAH</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-glow">Students Attendance Hub</h3>
                  <p className="text-muted-foreground text-sm">Digital attendance management system</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span>System Online</span>
                </div>
                <div>Version 1.0.0</div>
                <div>&copy; {new Date()?.getFullYear()} SAH</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdministrativeDashboard;