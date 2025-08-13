import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingSessionsCard = () => {
  const upcomingSessions = [
    {
      id: 1,
      title: "Mathematics Review",
      subject: "Calculus",
      time: "2:00 PM",
      duration: "45 min",
      type: "study",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Physics Quiz",
      subject: "Mechanics",
      time: "4:30 PM",
      duration: "30 min",
      type: "quiz",
      color: "bg-green-500"
    },
    {
      id: 3,
      title: "Chemistry Lab Prep",
      subject: "Organic Chemistry",
      time: "6:00 PM",
      duration: "60 min",
      type: "preparation",
      color: "bg-purple-500"
    }
  ];

  const getSessionIcon = (type) => {
    switch (type) {
      case 'study': return 'BookOpen';
      case 'quiz': return 'HelpCircle';
      case 'preparation': return 'Target';
      default: return 'Calendar';
    }
  };

  const formatTimeUntil = (timeString) => {
    const now = new Date();
    const sessionTime = new Date();
    const [hours, minutes] = timeString?.split(':');
    sessionTime?.setHours(parseInt(hours), parseInt(minutes?.split(' ')?.[0]), 0, 0);
    
    if (timeString?.includes('PM') && parseInt(hours) !== 12) {
      sessionTime?.setHours(sessionTime?.getHours() + 12);
    }
    
    const diffMs = sessionTime?.getTime() - now?.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
      return `in ${diffHours}h ${diffMinutes}m`;
    } else if (diffMinutes > 0) {
      return `in ${diffMinutes}m`;
    } else {
      return 'Now';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={20} color="var(--color-primary)" />
          <h3 className="font-heading font-semibold text-lg text-foreground">Today's Schedule</h3>
        </div>
        <Button variant="ghost" size="sm" iconName="Plus" iconPosition="left" iconSize={16}>
          Add Session
        </Button>
      </div>
      {/* Sessions List */}
      <div className="space-y-4">
        {upcomingSessions?.map((session, index) => (
          <div key={session?.id} className="flex items-center space-x-4 p-3 hover:bg-muted rounded-lg transition-colors duration-200 group">
            {/* Time Indicator */}
            <div className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full ${session?.color} ${index === 0 ? 'animate-pulse' : ''}`}></div>
              {index < upcomingSessions?.length - 1 && (
                <div className="w-px h-8 bg-border mt-2"></div>
              )}
            </div>

            {/* Session Icon */}
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={getSessionIcon(session?.type)} size={18} color="var(--color-muted-foreground)" />
            </div>

            {/* Session Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-body font-medium text-sm text-foreground">{session?.title}</h4>
                <span className="font-body text-xs text-muted-foreground">{formatTimeUntil(session?.time)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body text-xs text-muted-foreground">{session?.subject}</span>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={12} color="var(--color-muted-foreground)" />
                  <span className="font-body text-xs text-muted-foreground">{session?.duration}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button variant="ghost" size="icon" iconName="Play" iconSize={14} />
              <Button variant="ghost" size="icon" iconName="Edit" iconSize={14} />
            </div>
          </div>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" iconName="Timer" iconPosition="left" iconSize={16}>
            Start Timer
          </Button>
          <Button variant="outline" size="sm" iconName="Calendar" iconPosition="left" iconSize={16}>
            View Calendar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingSessionsCard;