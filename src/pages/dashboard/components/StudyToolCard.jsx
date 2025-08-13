import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StudyToolCard = ({ 
  title, 
  description, 
  icon, 
  route, 
  stats, 
  recentActivity, 
  gradient = "from-blue-500 to-purple-600",
  isComingSoon = false 
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (!isComingSoon && route) {
      navigate(route);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:elevation-2 transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon name={icon} size={24} color="white" />
        </div>
        {isComingSoon && (
          <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
            Coming Soon
          </span>
        )}
      </div>
      {/* Content */}
      <div className="mb-4">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
          {title}
        </h3>
        <p className="font-body text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
      {/* Stats */}
      {stats && (
        <div className="flex items-center justify-between mb-4 p-3 bg-muted rounded-lg">
          <div className="text-center">
            <p className="font-heading font-bold text-lg text-foreground">{stats?.primary?.value}</p>
            <p className="font-body text-xs text-muted-foreground">{stats?.primary?.label}</p>
          </div>
          <div className="text-center">
            <p className="font-heading font-bold text-lg text-foreground">{stats?.secondary?.value}</p>
            <p className="font-body text-xs text-muted-foreground">{stats?.secondary?.label}</p>
          </div>
        </div>
      )}
      {/* Recent Activity */}
      {recentActivity && (
        <div className="mb-4">
          <p className="font-body text-xs text-muted-foreground mb-2">Recent Activity</p>
          <p className="font-body text-sm text-foreground">{recentActivity}</p>
        </div>
      )}
      {/* Action Button */}
      <Button
        variant={isComingSoon ? "outline" : "default"}
        size="sm"
        fullWidth
        onClick={handleNavigate}
        disabled={isComingSoon}
        iconName={isComingSoon ? "Clock" : "ArrowRight"}
        iconPosition="right"
        iconSize={16}
        className="transition-smooth"
      >
        {isComingSoon ? "Coming Soon" : "Open Tool"}
      </Button>
    </div>
  );
};

export default StudyToolCard;