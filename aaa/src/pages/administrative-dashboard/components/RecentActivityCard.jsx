import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { attendanceService } from '../../../services/attendanceService';

const RecentActivityCard = () => {
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentActivity();
  }, []);

  const loadRecentActivity = async () => {
    try {
      setLoading(true);
      const result = await attendanceService?.getAllAttendance({ limit: 10 });
      
      if (!result?.error) {
        setRecentActivity(result?.data || []);
      }
    } catch (error) {
      // Silent fail for dashboard
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInMinutes = Math.floor((now - past) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="glass rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Activity" size={20} className="text-primary" />
          <h2 className="text-xl font-bold text-foreground text-glow">
            Recent Activity
          </h2>
        </div>
        <Link to="/attendance">
          <Button variant="outline" size="sm" className="neon-hover">
            View All
          </Button>
        </Link>
      </div>
      {loading ? (
        <div className="space-y-4">
          {[...Array(5)]?.map((_, i) => (
            <div key={i} className="animate-pulse flex items-center space-x-3 p-3 bg-muted/10 rounded-lg">
              <div className="w-10 h-10 bg-muted/20 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted/20 rounded w-3/4"></div>
                <div className="h-3 bg-muted/20 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : recentActivity?.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4">No recent attendance activity</p>
          <Link to="/qr-code-scanner">
            <Button iconName="Scan" iconPosition="left" className="neon-hover">
              Start Taking Attendance
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {recentActivity?.slice(0, 8)?.map((record, index) => (
            <div 
              key={record?.id || index}
              className="flex items-center space-x-3 p-3 hover:bg-muted/10 rounded-lg lightning-transition-fast"
            >
              {/* Avatar */}
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-medium text-sm">
                  {record?.students?.name?.charAt(0)?.toUpperCase() || '?'}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className="font-medium text-foreground truncate">
                    {record?.students?.name}
                  </p>
                  <span className={`inline-flex px-2 py-0.5 text-xs rounded-full ${
                    record?.status === 'present' ?'bg-success/10 text-success' :'bg-destructive/10 text-destructive'
                  }`}>
                    {record?.status === 'present' ? 'Present' : 'Absent'}
                  </span>
                </div>
                <div className="flex items-center space-x-4 mt-1">
                  <p className="text-sm text-muted-foreground">
                    {record?.lecture_name || 'General Lecture'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {record?.students?.department}
                  </p>
                </div>
              </div>

              {/* Time */}
              <div className="text-xs text-muted-foreground text-right flex-shrink-0">
                {formatTimeAgo(`${record?.date}T${record?.time}`)}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Footer */}
      {!loading && recentActivity?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Showing {Math.min(8, recentActivity?.length)} of {recentActivity?.length} recent records</span>
            <Link 
              to="/attendance"
              className="text-primary hover:text-primary/80 lightning-transition-fast"
            >
              View detailed attendance →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentActivityCard;