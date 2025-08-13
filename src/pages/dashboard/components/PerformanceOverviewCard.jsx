import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceOverviewCard = () => {
  const weeklyData = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.2 },
    { day: 'Wed', hours: 1.8 },
    { day: 'Thu', hours: 4.1 },
    { day: 'Fri', hours: 2.9 },
    { day: 'Sat', hours: 3.7 },
    { day: 'Sun', hours: 2.3 }
  ];

  const subjectData = [
    { name: 'Mathematics', value: 35, color: '#3B82F6' },
    { name: 'Physics', value: 25, color: '#10B981' },
    { name: 'Chemistry', value: 20, color: '#F59E0B' },
    { name: 'Biology', value: 20, color: '#EF4444' }
  ];

  const totalHours = weeklyData?.reduce((sum, day) => sum + day?.hours, 0);
  const avgDaily = (totalHours / 7)?.toFixed(1);

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="BarChart3" size={20} color="var(--color-primary)" />
          <h3 className="font-heading font-semibold text-lg text-foreground">Performance Overview</h3>
        </div>
        <Button variant="ghost" size="sm" iconName="TrendingUp" iconPosition="left" iconSize={16}>
          View Details
        </Button>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-muted rounded-lg">
          <p className="font-heading font-bold text-xl text-foreground">{totalHours?.toFixed(1)}h</p>
          <p className="font-body text-xs text-muted-foreground">This Week</p>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <p className="font-heading font-bold text-xl text-foreground">{avgDaily}h</p>
          <p className="font-body text-xs text-muted-foreground">Daily Avg</p>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <p className="font-heading font-bold text-xl text-foreground">87%</p>
          <p className="font-body text-xs text-muted-foreground">Accuracy</p>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <p className="font-heading font-bold text-xl text-foreground">12</p>
          <p className="font-body text-xs text-muted-foreground">Completed</p>
        </div>
      </div>
      {/* Charts Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Study Hours */}
        <div>
          <h4 className="font-body font-medium text-sm text-foreground mb-3">Weekly Study Hours</h4>
          <div className="h-32" aria-label="Weekly Study Hours Bar Chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                />
                <YAxis hide />
                <Bar 
                  dataKey="hours" 
                  fill="var(--color-primary)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Distribution */}
        <div>
          <h4 className="font-body font-medium text-sm text-foreground mb-3">Subject Distribution</h4>
          <div className="flex items-center justify-between">
            <div className="h-24 w-24">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subjectData}
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={40}
                    dataKey="value"
                  >
                    {subjectData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 ml-4 space-y-2">
              {subjectData?.map((subject, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: subject?.color }}
                    ></div>
                    <span className="font-body text-xs text-foreground">{subject?.name}</span>
                  </div>
                  <span className="font-body text-xs text-muted-foreground">{subject?.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Insights */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-start space-x-3 p-3 bg-success/10 rounded-lg">
          <Icon name="TrendingUp" size={16} color="var(--color-success)" />
          <div>
            <p className="font-body font-medium text-sm text-success">Great Progress!</p>
            <p className="font-body text-xs text-muted-foreground">
              You've increased your study time by 15% this week. Keep up the excellent work!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceOverviewCard;