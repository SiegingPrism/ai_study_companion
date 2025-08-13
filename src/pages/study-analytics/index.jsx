import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import MetricsCard from './components/MetricsCard';
import StudyStreakCard from './components/StudyStreakCard';
import PerformanceChart from './components/PerformanceChart';
import SubjectBreakdown from './components/SubjectBreakdown';
import StudyTimeChart from './components/StudyTimeChart';
import RecommendationsCard from './components/RecommendationsCard';
import AchievementsCard from './components/AchievementsCard';

const StudyAnalytics = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');
  const [selectedView, setSelectedView] = useState('overview');

  const timeRangeOptions = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const viewOptions = [
    { value: 'overview', label: 'Overview' },
    { value: 'performance', label: 'Performance' },
    { value: 'subjects', label: 'Subjects' },
    { value: 'goals', label: 'Goals' }
  ];

  // Mock data for charts
  const performanceData = [
    { name: 'Mon', accuracy: 78, time: 120 },
    { name: 'Tue', accuracy: 82, time: 150 },
    { name: 'Wed', accuracy: 75, time: 90 },
    { name: 'Thu', accuracy: 88, time: 180 },
    { name: 'Fri', accuracy: 85, time: 135 },
    { name: 'Sat', accuracy: 92, time: 210 },
    { name: 'Sun', accuracy: 89, time: 165 }
  ];

  const studyTimeData = [
    { name: 'Week 1', time: 18.5 },
    { name: 'Week 2', time: 22.3 },
    { name: 'Week 3', time: 19.8 },
    { name: 'Week 4', time: 25.1 }
  ];

  const handleExportReport = () => {
    // Mock export functionality
    console.log('Exporting analytics report...');
  };

  return (
    <>
      <Helmet>
        <title>Study Analytics - AI Study Companion</title>
        <meta name="description" content="Track your learning progress with comprehensive analytics, performance insights, and personalized recommendations." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        
        <main className={`pt-14 transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        }`}>
          <div className="p-4 lg:p-6 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div className="mb-4 lg:mb-0">
                <h1 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  Study Analytics
                </h1>
                <p className="font-body text-muted-foreground">
                  Track your progress and discover insights to improve your learning
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <Select
                  options={timeRangeOptions}
                  value={selectedTimeRange}
                  onChange={setSelectedTimeRange}
                  className="w-full sm:w-auto"
                />
                <Select
                  options={viewOptions}
                  value={selectedView}
                  onChange={setSelectedView}
                  className="w-full sm:w-auto"
                />
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  iconSize={16}
                  onClick={handleExportReport}
                  className="w-full sm:w-auto"
                >
                  Export Report
                </Button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
              <MetricsCard
                title="Study Hours"
                value="23.5h"
                change="+12%"
                changeType="increase"
                icon="Clock"
                color="primary"
              />
              <MetricsCard
                title="Accuracy Rate"
                value="84%"
                change="+5%"
                changeType="increase"
                icon="Target"
                color="success"
              />
              <MetricsCard
                title="Questions Solved"
                value="247"
                change="+18%"
                changeType="increase"
                icon="HelpCircle"
                color="accent"
              />
              <MetricsCard
                title="Study Streak"
                value="12 days"
                change="+3 days"
                changeType="increase"
                icon="Flame"
                color="warning"
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Performance Chart */}
              <div className="lg:col-span-2">
                <PerformanceChart
                  title="Weekly Performance Trend"
                  data={performanceData}
                  dataKey="accuracy"
                  color="var(--color-primary)"
                  type="area"
                />
              </div>
              
              {/* Study Streak */}
              <div>
                <StudyStreakCard />
              </div>
            </div>

            {/* Secondary Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Study Time Chart */}
              <StudyTimeChart />
              
              {/* Subject Breakdown */}
              <SubjectBreakdown />
            </div>

            {/* Recommendations and Achievements */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <RecommendationsCard />
              <AchievementsCard />
            </div>

            {/* Additional Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Study Patterns */}
              <div className="bg-card border border-border rounded-lg p-4 lg:p-6 elevation-1">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Study Patterns</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name="Sun" size={16} className="text-accent" />
                      <span className="font-body text-sm text-foreground">Peak Hours</span>
                    </div>
                    <span className="font-body text-sm text-muted-foreground">2:00 - 4:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name="Calendar" size={16} className="text-primary" />
                      <span className="font-body text-sm text-foreground">Best Day</span>
                    </div>
                    <span className="font-body text-sm text-muted-foreground">Saturday</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name="Timer" size={16} className="text-success" />
                      <span className="font-body text-sm text-foreground">Avg Session</span>
                    </div>
                    <span className="font-body text-sm text-muted-foreground">45 minutes</span>
                  </div>
                </div>
              </div>

              {/* Goals Progress */}
              <div className="bg-card border border-border rounded-lg p-4 lg:p-6 elevation-1">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Monthly Goals</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-body text-sm text-foreground">Study 80 hours</span>
                      <span className="font-body text-sm text-muted-foreground">58/80</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-body text-sm text-foreground">Solve 500 questions</span>
                      <span className="font-body text-sm text-muted-foreground">247/500</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{ width: '49%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-body text-sm text-foreground">Maintain 85% accuracy</span>
                      <span className="font-body text-sm text-muted-foreground">84%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-warning h-2 rounded-full" style={{ width: '84%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-lg p-4 lg:p-6 elevation-1">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    iconName="FileText"
                    iconPosition="left"
                    iconSize={16}
                    className="justify-start"
                  >
                    Generate Practice Test
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    iconName="BookOpen"
                    iconPosition="left"
                    iconSize={16}
                    className="justify-start"
                  >
                    Review Weak Areas
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    iconName="Calendar"
                    iconPosition="left"
                    iconSize={16}
                    className="justify-start"
                  >
                    Schedule Study Session
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    iconName="Share"
                    iconPosition="left"
                    iconSize={16}
                    className="justify-start"
                  >
                    Share Progress
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default StudyAnalytics;