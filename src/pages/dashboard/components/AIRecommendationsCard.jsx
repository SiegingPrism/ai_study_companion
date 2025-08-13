import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIRecommendationsCard = () => {
  const recommendations = [
    {
      id: 1,
      type: "study_focus",
      title: "Focus on Calculus Integration",
      description: "Based on your recent quiz results, spending more time on integration techniques could improve your math scores by 15%.",
      priority: "high",
      icon: "Target",
      action: "Create Study Plan",
      timeEstimate: "30 min"
    },
    {
      id: 2,
      type: "study_method",
      title: "Try Spaced Repetition",
      description: "Your retention rate for Physics formulas could improve with spaced repetition flashcards.",
      priority: "medium",
      icon: "RefreshCw",
      action: "Generate Flashcards",
      timeEstimate: "15 min"
    },
    {
      id: 3,
      type: "schedule",
      title: "Optimal Study Time",
      description: "Your performance data shows you\'re most productive between 2-4 PM. Consider scheduling important topics then.",
      priority: "low",
      icon: "Clock",
      action: "Update Schedule",
      timeEstimate: "5 min"
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityBg = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error/10';
      case 'medium': return 'bg-warning/10';
      case 'low': return 'bg-success/10';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Brain" size={20} color="var(--color-primary)" />
          <h3 className="font-heading font-semibold text-lg text-foreground">AI Recommendations</h3>
        </div>
        <div className="flex items-center space-x-1 px-2 py-1 bg-primary/10 rounded-full">
          <Icon name="Sparkles" size={12} color="var(--color-primary)" />
          <span className="font-body text-xs text-primary font-medium">Smart</span>
        </div>
      </div>
      {/* Recommendations List */}
      <div className="space-y-4">
        {recommendations?.map((rec) => (
          <div key={rec?.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors duration-200">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={rec?.icon} size={16} color="var(--color-primary)" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-body font-medium text-sm text-foreground">{rec?.title}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityBg(rec?.priority)} ${getPriorityColor(rec?.priority)}`}>
                      {rec?.priority}
                    </span>
                  </div>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    {rec?.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={12} color="var(--color-muted-foreground)" />
                <span className="font-body text-xs text-muted-foreground">{rec?.timeEstimate}</span>
              </div>
              <Button 
                variant="outline" 
                size="xs" 
                iconName="ArrowRight" 
                iconPosition="right" 
                iconSize={12}
              >
                {rec?.action}
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* AI Insights */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-start space-x-3 p-3 bg-primary/5 rounded-lg">
          <Icon name="Lightbulb" size={16} color="var(--color-primary)" />
          <div>
            <p className="font-body font-medium text-sm text-primary">Study Insight</p>
            <p className="font-body text-xs text-muted-foreground">
              Students who follow AI recommendations show 23% better performance on average.
            </p>
          </div>
        </div>
      </div>
      {/* View More */}
      <div className="mt-4">
        <Button variant="ghost" size="sm" fullWidth iconName="ChevronRight" iconPosition="right" iconSize={16}>
          View All Recommendations
        </Button>
      </div>
    </div>
  );
};

export default AIRecommendationsCard;