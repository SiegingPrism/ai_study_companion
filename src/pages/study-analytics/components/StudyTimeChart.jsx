import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StudyTimeChart = () => {
  const weeklyData = [
    { day: 'Mon', hours: 2.5, sessions: 3 },
    { day: 'Tue', hours: 3.2, sessions: 4 },
    { day: 'Wed', hours: 1.8, sessions: 2 },
    { day: 'Thu', hours: 4.1, sessions: 5 },
    { day: 'Fri', hours: 2.9, sessions: 3 },
    { day: 'Sat', hours: 5.2, sessions: 6 },
    { day: 'Sun', hours: 3.8, sessions: 4 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 elevation-2">
          <p className="font-body text-sm text-foreground mb-1">{label}</p>
          <p className="font-body text-sm text-primary">{`Hours: ${payload?.[0]?.value}`}</p>
          <p className="font-body text-sm text-accent">{`Sessions: ${payload?.[0]?.payload?.sessions}`}</p>
        </div>
      );
    }
    return null;
  };

  const totalHours = weeklyData?.reduce((sum, day) => sum + day?.hours, 0);
  const avgHours = (totalHours / 7)?.toFixed(1);

  return (
    <div className="bg-card border border-border rounded-lg p-4 lg:p-6 elevation-1">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-heading text-lg font-semibold text-foreground">Weekly Study Time</h3>
          <p className="font-body text-sm text-muted-foreground">
            Total: {totalHours?.toFixed(1)} hours • Average: {avgHours} hours/day
          </p>
        </div>
      </div>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="day" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="hours" 
              fill="var(--color-primary)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <p className="font-body text-sm text-muted-foreground">Best Day</p>
          <p className="font-heading text-lg font-semibold text-foreground">Saturday</p>
          <p className="font-body text-xs text-accent">5.2 hours</p>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <p className="font-body text-sm text-muted-foreground">Most Sessions</p>
          <p className="font-heading text-lg font-semibold text-foreground">Saturday</p>
          <p className="font-body text-xs text-accent">6 sessions</p>
        </div>
      </div>
    </div>
  );
};

export default StudyTimeChart;