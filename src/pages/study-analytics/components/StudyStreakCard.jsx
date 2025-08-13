import React from 'react';
import Icon from '../../../components/AppIcon';

const StudyStreakCard = () => {
  const streakData = [
    { day: 'Mon', completed: true },
    { day: 'Tue', completed: true },
    { day: 'Wed', completed: true },
    { day: 'Thu', completed: false },
    { day: 'Fri', completed: true },
    { day: 'Sat', completed: true },
    { day: 'Sun', completed: false }
  ];

  const currentStreak = 12;
  const longestStreak = 28;

  return (
    <div className="bg-card border border-border rounded-lg p-4 lg:p-6 elevation-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-lg font-semibold text-foreground">Study Streak</h3>
        <div className="flex items-center space-x-1 text-accent">
          <Icon name="Flame" size={20} />
          <span className="font-heading text-xl font-bold">{currentStreak}</span>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-4">
        {streakData?.map((day, index) => (
          <div key={index} className="text-center">
            <p className="font-body text-xs text-muted-foreground mb-1">{day?.day}</p>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              day?.completed 
                ? 'bg-success text-white' :'bg-muted border-2 border-dashed border-muted-foreground/30'
            }`}>
              {day?.completed && <Icon name="Check" size={14} />}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
          <Icon name="Target" size={16} className="text-muted-foreground" />
          <span className="font-body text-muted-foreground">Goal: 5 days/week</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Trophy" size={16} className="text-accent" />
          <span className="font-body text-foreground">Best: {longestStreak} days</span>
        </div>
      </div>
    </div>
  );
};

export default StudyStreakCard;