import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationsCard = () => {
  const recommendations = [
    {
      type: "focus_area",
      title: "Focus on Physics Mechanics",
      description: "Your accuracy in mechanics problems is 15% below your physics average. Consider reviewing force diagrams and Newton\'s laws.",
      priority: "high",
      icon: "Target",
      action: "Review Topics"
    },
    {
      type: "study_time",
      title: "Increase Chemistry Study Time",
      description: "You're spending 40% less time on chemistry compared to other subjects. Aim for 90+ minutes per session.",
      priority: "medium",
      icon: "Clock",
      action: "Set Schedule"
    },
    {
      type: "technique",
      title: "Try Spaced Repetition",
      description: "Based on your forgetting curve, implementing spaced repetition could improve retention by 25%.",
      priority: "medium",
      icon: "RefreshCw",
      action: "Learn More"
    },
    {
      type: "strength",
      title: "Leverage Math Strengths",
      description: "Your calculus skills are excellent! Consider tackling advanced physics problems that require integration.",
      priority: "low",
      icon: "TrendingUp",
      action: "Explore"
    }
  ];

  const getPriorityColor = (priority) => {
    const colors = {
      high: "text-error bg-error/10 border-error/20",
      medium: "text-warning bg-warning/10 border-warning/20",
      low: "text-success bg-success/10 border-success/20"
    };
    return colors?.[priority] || colors?.medium;
  };

  const getPriorityIcon = (priority) => {
    const icons = {
      high: "AlertTriangle",
      medium: "AlertCircle",
      low: "Info"
    };
    return icons?.[priority] || icons?.medium;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 lg:p-6 elevation-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-lg font-semibold text-foreground">AI Recommendations</h3>
        <div className="flex items-center space-x-1 text-accent">
          <Icon name="Sparkles" size={16} />
          <span className="font-body text-sm">Personalized</span>
        </div>
      </div>
      <div className="space-y-4">
        {recommendations?.map((rec, index) => (
          <div key={index} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-smooth">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={rec?.icon} size={16} className="text-primary" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-body font-medium text-foreground">{rec?.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(rec?.priority)}`}>
                    <Icon name={getPriorityIcon(rec?.priority)} size={10} className="inline mr-1" />
                    {rec?.priority}
                  </span>
                </div>
                
                <p className="font-body text-sm text-muted-foreground mb-3 leading-relaxed">
                  {rec?.description}
                </p>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="ArrowRight"
                  iconPosition="right"
                  iconSize={14}
                >
                  {rec?.action}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-accent/5 border border-accent/20 rounded-lg">
        <div className="flex items-center space-x-2 mb-1">
          <Icon name="Lightbulb" size={16} className="text-accent" />
          <span className="font-body font-medium text-sm text-foreground">Study Tip</span>
        </div>
        <p className="font-body text-sm text-muted-foreground">
          Your peak performance hours are between 2-4 PM. Consider scheduling challenging topics during this time.
        </p>
      </div>
    </div>
  );
};

export default RecommendationsCard;