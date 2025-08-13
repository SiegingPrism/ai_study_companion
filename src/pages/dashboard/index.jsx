import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import StudyToolCard from './components/StudyToolCard';
import StudyStreakCard from './components/StudyStreakCard';
import RecentDocumentsCard from './components/RecentDocumentsCard';
import UpcomingSessionsCard from './components/UpcomingSessionsCard';
import PerformanceOverviewCard from './components/PerformanceOverviewCard';
import QuickActionsCard from './components/QuickActionsCard';
import AIRecommendationsCard from './components/AIRecommendationsCard';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const studyTools = [
    {
      title: "Question Paper Generator",
      description: "Create customized question papers with AI-powered difficulty adjustment and comprehensive topic coverage.",
      icon: "FileText",
      route: "/question-paper-generator",
      gradient: "from-blue-500 to-blue-600",
      stats: {
        primary: { value: "24", label: "Generated" },
        secondary: { value: "89%", label: "Accuracy" }
      },
      recentActivity: "Last used: Advanced Calculus Quiz - 2 hours ago"
    },
    {
      title: "Document Summarizer",
      description: "Extract key insights and create concise summaries from your study materials using advanced AI analysis.",
      icon: "BookOpen",
      route: "/document-summarizer",
      gradient: "from-green-500 to-green-600",
      stats: {
        primary: { value: "12", label: "Documents" },
        secondary: { value: "3.2MB", label: "Processed" }
      },
      recentActivity: "Last used: Physics Chapter 12 - 1 day ago"
    },
    {
      title: "Study Analytics",
      description: "Track your learning progress with detailed analytics and personalized insights to optimize study efficiency.",
      icon: "BarChart3",
      route: "/study-analytics",
      gradient: "from-purple-500 to-purple-600",
      stats: {
        primary: { value: "87%", label: "Progress" },
        secondary: { value: "15h", label: "This Week" }
      },
      recentActivity: "Weekly report generated - Today"
    },
    {
      title: "Flashcard Creator",
      description: "Generate interactive flashcards with spaced repetition algorithms for enhanced memory retention.",
      icon: "Layers",
      route: "/flashcards",
      gradient: "from-orange-500 to-orange-600",
      isComingSoon: true,
      stats: {
        primary: { value: "156", label: "Cards" },
        secondary: { value: "78%", label: "Mastered" }
      }
    },
    {
      title: "Q&A Assistant",
      description: "Get instant answers to your academic questions with contextual explanations and detailed solutions.",
      icon: "MessageCircle",
      route: "/qa-assistant",
      gradient: "from-red-500 to-red-600",
      isComingSoon: true,
      recentActivity: "45 questions answered this week"
    },
    {
      title: "Source Finder",
      description: "Discover reliable academic sources and generate proper citations for your research and assignments.",
      icon: "Search",
      route: "/source-finder",
      gradient: "from-teal-500 to-teal-600",
      isComingSoon: true,
      recentActivity: "12 sources found for Chemistry project"
    }
  ];

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - AI Study Companion</title>
        <meta name="description" content="Your personalized AI-powered study dashboard with comprehensive learning tools and progress tracking." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        
        <main className={`pt-14 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          <div className="p-6 max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div>
                  <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
                    Welcome back, Student! 👋
                  </h1>
                  <p className="font-body text-muted-foreground">
                    {formatDate(currentTime)} • {formatTime(currentTime)}
                  </p>
                </div>
                <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                  <Button variant="outline" iconName="Bell" iconPosition="left" iconSize={16}>
                    Notifications
                  </Button>
                  <Button variant="default" iconName="Plus" iconPosition="left" iconSize={16}>
                    New Study Session
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Icon name="BookOpen" size={20} color="var(--color-primary)" />
                  </div>
                  <p className="font-heading font-bold text-xl text-foreground">24</p>
                  <p className="font-body text-xs text-muted-foreground">Study Sessions</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Icon name="Target" size={20} color="var(--color-success)" />
                  </div>
                  <p className="font-heading font-bold text-xl text-foreground">87%</p>
                  <p className="font-body text-xs text-muted-foreground">Avg Score</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Icon name="Clock" size={20} color="var(--color-warning)" />
                  </div>
                  <p className="font-heading font-bold text-xl text-foreground">15.2h</p>
                  <p className="font-body text-xs text-muted-foreground">This Week</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Icon name="TrendingUp" size={20} color="var(--color-accent)" />
                  </div>
                  <p className="font-heading font-bold text-xl text-foreground">+23%</p>
                  <p className="font-body text-xs text-muted-foreground">Improvement</p>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Study Tools Grid */}
                <div>
                  <h2 className="font-heading font-semibold text-xl text-foreground mb-4">
                    Study Tools
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {studyTools?.map((tool, index) => (
                      <StudyToolCard 
                        key={index} 
                        title={tool.title}
                        description={tool.description}
                        icon={tool.icon}
                        route={tool.route}
                        gradient={tool.gradient}
                        stats={tool.stats}
                        recentActivity={tool.recentActivity}
                        isComingSoon={tool.isComingSoon}
                      />
                    ))}
                  </div>
                </div>

                {/* Performance Overview */}
                <PerformanceOverviewCard />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Study Streak */}
                <StudyStreakCard />
                
                {/* Quick Actions */}
                <QuickActionsCard />
                
                {/* Upcoming Sessions */}
                <UpcomingSessionsCard />
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Documents */}
              <RecentDocumentsCard />
              
              {/* AI Recommendations */}
              <AIRecommendationsCard />
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="mb-4 lg:mb-0">
                  <p className="font-body text-sm text-muted-foreground">
                    Need help? Check out our{' '}
                    <Button variant="link" className="p-0 h-auto font-body text-sm">
                      study guides
                    </Button>{' '}
                    or{' '}
                    <Button variant="link" className="p-0 h-auto font-body text-sm">
                      contact support
                    </Button>
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" iconName="HelpCircle" iconPosition="left" iconSize={16}>
                    Help Center
                  </Button>
                  <Button variant="ghost" size="sm" iconName="MessageSquare" iconPosition="left" iconSize={16}>
                    Feedback
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

export default Dashboard;