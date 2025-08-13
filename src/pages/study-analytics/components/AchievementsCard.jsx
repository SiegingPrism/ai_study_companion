import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementsCard = () => {
  const achievements = [
    {
      id: 1,
      title: "Study Streak Master",
      description: "Maintained 7-day study streak",
      icon: "Flame",
      earned: true,
      earnedDate: "2025-08-01",
      color: "text-accent bg-accent/10"
    },
    {
      id: 2,
      title: "Math Wizard",
      description: "Achieved 90%+ accuracy in mathematics",
      icon: "Calculator",
      earned: true,
      earnedDate: "2025-07-28",
      color: "text-success bg-success/10"
    },
    {
      id: 3,
      title: "Speed Reader",
      description: "Complete 50 document summaries",
      icon: "BookOpen",
      earned: true,
      earnedDate: "2025-07-25",
      color: "text-primary bg-primary/10"
    },
    {
      id: 4,
      title: "Question Master",
      description: "Generate 100 practice questions",
      icon: "HelpCircle",
      earned: false,
      progress: 73,
      color: "text-muted-foreground bg-muted"
    },
    {
      id: 5,
      title: "Time Manager",
      description: "Study for 50+ hours this month",
      icon: "Clock",
      earned: false,
      progress: 86,
      color: "text-muted-foreground bg-muted"
    },
    {
      id: 6,
      title: "Perfect Score",
      description: "Score 100% on any practice test",
      icon: "Trophy",
      earned: false,
      progress: 0,
      color: "text-muted-foreground bg-muted"
    }
  ];

  const earnedCount = achievements?.filter(a => a?.earned)?.length;
  const totalCount = achievements?.length;

  return (
    <div className="bg-card border border-border rounded-lg p-4 lg:p-6 elevation-1">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-heading text-lg font-semibold text-foreground">Achievements</h3>
          <p className="font-body text-sm text-muted-foreground">
            {earnedCount} of {totalCount} unlocked
          </p>
        </div>
        <div className="text-right">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
            <Icon name="Award" size={24} className="text-accent" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {achievements?.map((achievement) => (
          <div 
            key={achievement?.id} 
            className={`p-3 rounded-lg border transition-smooth ${
              achievement?.earned 
                ? 'border-accent/20 bg-accent/5 hover:bg-accent/10' :'border-border bg-muted/30 hover:bg-muted/50'
            }`}
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${achievement?.color}`}>
                <Icon 
                  name={achievement?.icon} 
                  size={16} 
                  className={achievement?.earned ? achievement?.color?.split(' ')?.[0] : 'text-muted-foreground'}
                />
              </div>
              {achievement?.earned && (
                <Icon name="CheckCircle" size={16} className="text-success" />
              )}
            </div>
            
            <h4 className={`font-body font-medium text-sm mb-1 ${
              achievement?.earned ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {achievement?.title}
            </h4>
            
            <p className="font-body text-xs text-muted-foreground mb-2">
              {achievement?.description}
            </p>
            
            {achievement?.earned ? (
              <p className="font-body text-xs text-accent">
                Earned {new Date(achievement.earnedDate)?.toLocaleDateString()}
              </p>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-body text-xs text-muted-foreground">Progress</span>
                  <span className="font-body text-xs text-muted-foreground">{achievement?.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div 
                    className="bg-primary h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${achievement?.progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="Target" size={16} className="text-primary" />
          <span className="font-body font-medium text-sm text-foreground">Next Goal</span>
        </div>
        <p className="font-body text-sm text-muted-foreground mt-1">
          Complete 27 more practice questions to unlock "Question Master" achievement
        </p>
      </div>
    </div>
  );
};

export default AchievementsCard;