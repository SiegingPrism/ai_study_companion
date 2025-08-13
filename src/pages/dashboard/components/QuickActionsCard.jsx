import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsCard = () => {
  const quickActions = [
    {
      id: 1,
      title: "Generate Quiz",
      description: "Create instant quiz from notes",
      icon: "HelpCircle",
      color: "bg-blue-500",
      action: () => console.log("Generate Quiz")
    },
    {
      id: 2,
      title: "Start Timer",
      description: "Begin focused study session",
      icon: "Timer",
      color: "bg-green-500",
      action: () => console.log("Start Timer")
    },
    {
      id: 3,
      title: "Upload Document",
      description: "Add new study material",
      icon: "Upload",
      color: "bg-purple-500",
      action: () => console.log("Upload Document")
    },
    {
      id: 4,
      title: "Create Flashcards",
      description: "Make cards from content",
      icon: "Layers",
      color: "bg-orange-500",
      action: () => console.log("Create Flashcards")
    }
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Zap" size={20} color="var(--color-primary)" />
          <h3 className="font-heading font-semibold text-lg text-foreground">Quick Actions</h3>
        </div>
      </div>
      {/* Actions Grid */}
      <div className="grid grid-cols-2 gap-4">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={action?.action}
            className="group p-4 bg-muted hover:bg-muted/80 rounded-lg transition-all duration-200 hover:elevation-1 text-left"
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 ${action?.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={action?.icon} size={18} color="white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-body font-medium text-sm text-foreground mb-1">
                  {action?.title}
                </h4>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">
                  {action?.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
      {/* Additional Actions */}
      <div className="mt-6 pt-4 border-t border-border space-y-2">
        <Button 
          variant="ghost" 
          size="sm" 
          fullWidth 
          iconName="BookOpen" 
          iconPosition="left" 
          iconSize={16}
          className="justify-start"
        >
          Browse Study Materials
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          fullWidth 
          iconName="Users" 
          iconPosition="left" 
          iconSize={16}
          className="justify-start"
        >
          Join Study Group
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          fullWidth 
          iconName="Calendar" 
          iconPosition="left" 
          iconSize={16}
          className="justify-start"
        >
          Schedule Study Session
        </Button>
      </div>
    </div>
  );
};

export default QuickActionsCard;