import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, change, changeType, icon, color = "primary" }) => {
  const getColorClasses = (colorType) => {
    const colors = {
      primary: "bg-primary/10 text-primary border-primary/20",
      success: "bg-success/10 text-success border-success/20",
      warning: "bg-warning/10 text-warning border-warning/20",
      accent: "bg-accent/10 text-accent border-accent/20"
    };
    return colors?.[colorType] || colors?.primary;
  };

  const getChangeColor = (type) => {
    return type === 'increase' ? 'text-success' : type === 'decrease' ? 'text-error' : 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 lg:p-6 elevation-1 transition-smooth hover:elevation-2">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="font-body text-sm text-muted-foreground mb-1">{title}</p>
          <p className="font-heading text-2xl lg:text-3xl font-semibold text-foreground mb-2">{value}</p>
          {change && (
            <div className="flex items-center space-x-1">
              <Icon 
                name={changeType === 'increase' ? 'TrendingUp' : changeType === 'decrease' ? 'TrendingDown' : 'Minus'} 
                size={14} 
                className={getChangeColor(changeType)}
              />
              <span className={`font-body text-xs ${getChangeColor(changeType)}`}>
                {change} from last week
              </span>
            </div>
          )}
        </div>
        <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center ${getColorClasses(color)}`}>
          <Icon name={icon} size={20} />
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;