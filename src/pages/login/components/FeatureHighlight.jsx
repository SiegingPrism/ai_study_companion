import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FeatureHighlight = () => {
  const features = [
    {
      icon: 'FileText',
      title: 'Smart Question Papers',
      description: 'Generate custom question papers with AI-powered difficulty adjustment and subject-specific content.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop',
      benefits: ['Custom difficulty levels', 'Multiple subjects', 'Instant generation']
    },
    {
      icon: 'BookOpen',
      title: 'Document Summarizer',
      description: 'Extract key insights from lengthy documents and research papers in seconds.',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop',
      benefits: ['Key point extraction', 'Multiple formats', 'Citation ready']
    },
    {
      icon: 'BarChart3',
      title: 'Study Analytics',
      description: 'Track your learning progress with detailed analytics and personalized recommendations.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
      benefits: ['Progress tracking', 'Weak area identification', 'Study recommendations']
    }
  ];

  const studyMethods = [
    {
      icon: 'Brain',
      title: 'AI-Powered Learning',
      description: 'Advanced algorithms adapt to your learning style'
    },
    {
      icon: 'Target',
      title: 'Personalized Content',
      description: 'Customized study materials based on your goals'
    },
    {
      icon: 'TrendingUp',
      title: 'Performance Tracking',
      description: 'Monitor progress and improve continuously'
    },
    {
      icon: 'Clock',
      title: 'Time Management',
      description: 'Optimize study sessions with smart scheduling'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Feature */}
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-success/10 border border-border rounded-lg p-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <Icon name="Sparkles" size={24} color="white" />
          </div>
          <h2 className="font-heading font-bold text-2xl text-foreground mb-2">
            AI-Powered Study Companion
          </h2>
          <p className="font-body text-muted-foreground max-w-md mx-auto">
            Transform your learning experience with intelligent study tools designed for academic success
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {studyMethods?.map((method, index) => (
            <div key={index} className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4 text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg mb-2">
                <Icon name={method?.icon} size={16} color="var(--color-primary)" />
              </div>
              <h3 className="font-body font-medium text-sm text-foreground mb-1">{method?.title}</h3>
              <p className="font-body text-xs text-muted-foreground">{method?.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Feature Showcase */}
      <div className="space-y-6">
        <h3 className="font-heading font-semibold text-xl text-foreground text-center">
          Powerful Features for Every Student
        </h3>
        
        {features?.map((feature, index) => (
          <div key={index} className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="aspect-video overflow-hidden">
              <Image
                src={feature?.image}
                alt={feature?.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={feature?.icon} size={18} color="var(--color-primary)" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-lg text-foreground">{feature?.title}</h4>
                </div>
              </div>
              
              <p className="font-body text-sm text-muted-foreground mb-3">
                {feature?.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {feature?.benefits?.map((benefit, benefitIndex) => (
                  <span
                    key={benefitIndex}
                    className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-body"
                  >
                    <Icon name="Check" size={12} className="mr-1" />
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Success Metrics */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4 text-center">
          Proven Results
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between p-3 bg-success/5 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="TrendingUp" size={16} color="var(--color-success)" />
              <span className="font-body text-sm text-foreground">Average Grade Improvement</span>
            </div>
            <span className="font-heading font-bold text-success">+23%</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Clock" size={16} color="var(--color-primary)" />
              <span className="font-body text-sm text-foreground">Study Time Reduction</span>
            </div>
            <span className="font-heading font-bold text-primary">-40%</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Award" size={16} color="var(--color-accent)" />
              <span className="font-body text-sm text-foreground">Student Satisfaction</span>
            </div>
            <span className="font-heading font-bold text-accent">4.9/5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureHighlight;