import React from 'react';
import Icon from '../../../components/AppIcon';

const StudyStreakCard = ({ currentStreak = 7, bestStreak = 15, todayCompleted = true }) => {
  const streakPercentage = Math.min((currentStreak / bestStreak) * 100, 100);

  return (
    <div className="bg-gradient-to-r from-accent to-warning rounded-xl p-6 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4">
          <Icon name="Flame" size={48} color="white" />
        </div>
        <div className="absolute bottom-4 left-4">
          <Icon name="Target" size={32} color="white" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Flame" size={24} color="white" />
            <h3 className="font-heading font-semibold text-lg">Study Streak</h3>
          </div>
          {todayCompleted && (
            <div className="flex items-center space-x-1 bg-white/20 px-2 py-1 rounded-full">
              <Icon name="Check" size={14} color="white" />
              <span className="font-body text-xs">Today</span>
            </div>
          )}
        </div>

        <div className="mb-4">
          <div className="flex items-baseline space-x-2 mb-2">
            <span className="font-heading font-bold text-3xl">{currentStreak}</span>
            <span className="font-body text-sm opacity-80">days</span>
          </div>
          <p className="font-body text-sm opacity-80">Keep it up! You're doing great.</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="font-body text-xs opacity-80">Progress to best</span>
            <span className="font-body text-xs opacity-80">{bestStreak} days</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${streakPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Motivation */}
        <div className="flex items-center justify-between">
          <span className="font-body text-xs opacity-80">
            {currentStreak >= bestStreak ? "New record! 🎉" : `${bestStreak - currentStreak} days to beat your record`}
          </span>
          <Icon name="TrendingUp" size={16} color="white" />
        </div>
      </div>
    </div>
  );
};

export default StudyStreakCard;