import React from 'react';
import Icon from '../../../components/AppIcon';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: 'Brain',
      title: 'AI-Powered Learning',
      description: 'Get personalized study recommendations and intelligent content generation'
    },
    {
      icon: 'FileText',
      title: 'Smart Question Papers',
      description: 'Generate custom assessments with adjustable difficulty levels'
    },
    {
      icon: 'BookOpen',
      title: 'Document Summarization',
      description: 'Extract key insights from your study materials instantly'
    },
    {
      icon: 'BarChart3',
      title: 'Progress Analytics',
      description: 'Track your learning journey with detailed performance insights'
    },
    {
      icon: 'Users',
      title: 'Collaborative Learning',
      description: 'Join study groups and share resources with fellow learners'
    },
    {
      icon: 'Shield',
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise-grade security'
    }
  ];

  return (
    <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-primary/5 to-accent/5 p-8 lg:p-12">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
            <Icon name="GraduationCap" size={32} color="white" />
          </div>
          <h2 className="font-heading font-bold text-2xl text-foreground mb-2">
            Join AI Study Companion
          </h2>
          <p className="font-body text-muted-foreground">
            Unlock the power of AI to enhance your learning experience
          </p>
        </div>

        <div className="space-y-6">
          {benefits?.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center elevation-1">
                <Icon name={benefit?.icon} size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h3 className="font-body font-semibold text-sm text-foreground mb-1">
                  {benefit?.title}
                </h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">
                  {benefit?.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-white/50 rounded-lg border border-border/50">
          <div className="flex items-center space-x-3 mb-2">
            <Icon name="Star" size={16} color="var(--color-accent)" />
            <span className="font-body font-semibold text-sm text-foreground">
              Trusted by 50,000+ Students
            </span>
          </div>
          <p className="font-body text-xs text-muted-foreground">
            Join thousands of learners who have improved their academic performance with our AI-powered tools.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;