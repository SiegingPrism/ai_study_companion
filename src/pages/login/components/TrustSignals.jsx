import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'Bank-Level Security',
      description: 'Your data is protected with 256-bit SSL encryption'
    },
    {
      icon: 'Lock',
      title: 'Privacy First',
      description: 'We never share your personal information'
    },
    {
      icon: 'Award',
      title: 'Trusted by 50K+ Students',
      description: 'Join thousands of successful learners'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Computer Science Student',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face',
      quote: 'AI Study Companion helped me ace my finals. The question generator is incredible!'
    },
    {
      name: 'Marcus Johnson',
      role: 'Medical Student',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
      quote: 'The document summarizer saved me hours of reading. Perfect for research papers.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Engineering Student',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
      quote: 'Love the analytics dashboard. I can track my progress and identify weak areas.'
    }
  ];

  const partnerships = [
    { name: 'Stanford University', logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=120&h=60&fit=crop' },
    { name: 'MIT OpenCourseWare', logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=120&h=60&fit=crop' },
    { name: 'Khan Academy', logo: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=120&h=60&fit=crop' }
  ];

  return (
    <div className="space-y-8">
      {/* Security Features */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center">
          <Icon name="ShieldCheck" size={20} className="mr-2 text-success" />
          Secure & Trusted Platform
        </h3>
        <div className="space-y-4">
          {securityFeatures?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={feature?.icon} size={16} color="var(--color-primary)" />
              </div>
              <div>
                <h4 className="font-body font-medium text-sm text-foreground">{feature?.title}</h4>
                <p className="font-body text-xs text-muted-foreground">{feature?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Student Testimonials */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center">
          <Icon name="Users" size={20} className="mr-2 text-accent" />
          What Students Say
        </h3>
        <div className="space-y-4">
          {testimonials?.map((testimonial, index) => (
            <div key={index} className="border-l-2 border-primary/20 pl-4">
              <div className="flex items-center space-x-3 mb-2">
                <Image
                  src={testimonial?.avatar}
                  alt={testimonial?.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="font-body font-medium text-sm text-foreground">{testimonial?.name}</p>
                  <p className="font-body text-xs text-muted-foreground">{testimonial?.role}</p>
                </div>
              </div>
              <p className="font-body text-sm text-foreground italic">"{testimonial?.quote}"</p>
            </div>
          ))}
        </div>
      </div>
      {/* Educational Partnerships */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center">
          <Icon name="GraduationCap" size={20} className="mr-2 text-success" />
          Trusted by Leading Institutions
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {partnerships?.map((partner, index) => (
            <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-smooth">
              <Image
                src={partner?.logo}
                alt={partner?.name}
                className="w-12 h-6 object-contain grayscale hover:grayscale-0 transition-all"
              />
              <span className="font-body text-sm text-muted-foreground">{partner?.name}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Statistics */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-border rounded-lg p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="font-heading font-bold text-2xl text-primary">50K+</div>
            <div className="font-body text-xs text-muted-foreground">Active Students</div>
          </div>
          <div className="text-center">
            <div className="font-heading font-bold text-2xl text-accent">1M+</div>
            <div className="font-body text-xs text-muted-foreground">Questions Generated</div>
          </div>
          <div className="text-center">
            <div className="font-heading font-bold text-2xl text-success">98%</div>
            <div className="font-body text-xs text-muted-foreground">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="font-heading font-bold text-2xl text-foreground">24/7</div>
            <div className="font-body text-xs text-muted-foreground">AI Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;