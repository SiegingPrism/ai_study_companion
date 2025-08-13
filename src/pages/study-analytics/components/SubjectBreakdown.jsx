import React from 'react';
import Icon from '../../../components/AppIcon';

const SubjectBreakdown = () => {
  const subjects = [
    {
      name: "Mathematics",
      accuracy: 85,
      timeSpent: 120,
      improvement: 12,
      status: "strong",
      icon: "Calculator",
      color: "bg-success"
    },
    {
      name: "Physics",
      accuracy: 72,
      timeSpent: 95,
      improvement: -3,
      status: "needs_work",
      icon: "Atom",
      color: "bg-warning"
    },
    {
      name: "Chemistry",
      accuracy: 68,
      timeSpent: 80,
      improvement: 8,
      status: "improving",
      icon: "TestTube",
      color: "bg-primary"
    },
    {
      name: "Biology",
      accuracy: 91,
      timeSpent: 110,
      improvement: 15,
      status: "strong",
      icon: "Microscope",
      color: "bg-success"
    },
    {
      name: "English",
      accuracy: 78,
      timeSpent: 75,
      improvement: 5,
      status: "average",
      icon: "BookOpen",
      color: "bg-accent"
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      strong: "text-success bg-success/10",
      needs_work: "text-error bg-error/10",
      improving: "text-primary bg-primary/10",
      average: "text-accent bg-accent/10"
    };
    return colors?.[status] || colors?.average;
  };

  const getStatusText = (status) => {
    const texts = {
      strong: "Strong",
      needs_work: "Needs Work",
      improving: "Improving",
      average: "Average"
    };
    return texts?.[status] || "Average";
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 lg:p-6 elevation-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-lg font-semibold text-foreground">Subject Performance</h3>
        <button className="font-body text-sm text-primary hover:text-primary/80 transition-smooth">
          View Details
        </button>
      </div>
      <div className="space-y-4">
        {subjects?.map((subject, index) => (
          <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-smooth">
            <div className={`w-10 h-10 rounded-lg ${subject?.color}/10 flex items-center justify-center`}>
              <Icon name={subject?.icon} size={18} className={subject?.color?.replace('bg-', 'text-')} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-body font-medium text-foreground truncate">{subject?.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(subject?.status)}`}>
                  {getStatusText(subject?.status)}
                </span>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Target" size={14} />
                  <span>{subject?.accuracy}% accuracy</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>{subject?.timeSpent} min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={subject?.improvement > 0 ? "TrendingUp" : subject?.improvement < 0 ? "TrendingDown" : "Minus"} 
                    size={14} 
                    className={subject?.improvement > 0 ? "text-success" : subject?.improvement < 0 ? "text-error" : "text-muted-foreground"}
                  />
                  <span className={subject?.improvement > 0 ? "text-success" : subject?.improvement < 0 ? "text-error" : "text-muted-foreground"}>
                    {subject?.improvement > 0 ? '+' : ''}{subject?.improvement}%
                  </span>
                </div>
              </div>
              
              <div className="mt-2">
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${subject?.color}`}
                    style={{ width: `${subject?.accuracy}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectBreakdown;