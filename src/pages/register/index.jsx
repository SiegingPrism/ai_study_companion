import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import RegistrationForm from './components/RegistrationForm';
import StepIndicator from './components/StepIndicator';
import SocialSignup from './components/SocialSignup';
import BenefitsSection from './components/BenefitsSection';

const Register = () => {
  const [currentStep, setCurrentStep] = React.useState(1);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Icon name="Brain" size={20} color="white" />
              </div>
              <span className="font-heading font-semibold text-lg text-foreground">
                AI Study Companion
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <span className="font-body text-sm text-muted-foreground">
                Already have an account?
              </span>
              <Link
                to="/login"
                className="font-body font-medium text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1">
        <div className="flex min-h-[calc(100vh-73px)]">
          {/* Registration Form Section */}
          <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
            <div className="w-full max-w-md">
              {/* Welcome Header */}
              <div className="text-center mb-8">
                <h1 className="font-heading font-bold text-2xl lg:text-3xl text-foreground mb-2">
                  Create Your Account
                </h1>
                <p className="font-body text-muted-foreground">
                  Start your AI-powered learning journey today
                </p>
              </div>

              {/* Step Indicator */}
              <StepIndicator currentStep={currentStep} />

              {/* Registration Form */}
              <div className="bg-card border border-border rounded-xl p-6 lg:p-8 elevation-1">
                <RegistrationForm onStepChange={setCurrentStep} />
              </div>

              {/* Social Signup */}
              <div className="mt-6">
                <SocialSignup />
              </div>

              {/* Footer Links */}
              <div className="mt-8 text-center">
                <p className="font-body text-xs text-muted-foreground">
                  By creating an account, you agree to our{' '}
                  <Link to="/terms" className="text-primary hover:text-primary/80 transition-colors">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary hover:text-primary/80 transition-colors">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Section - Desktop Only */}
          <BenefitsSection />
        </div>
      </main>
      {/* Mobile Benefits Section */}
      <div className="lg:hidden bg-muted/30 p-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h2 className="font-heading font-semibold text-lg text-foreground mb-2">
              Why Choose AI Study Companion?
            </h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-card rounded-lg border border-border">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Icon name="Brain" size={20} color="var(--color-primary)" />
              </div>
              <h3 className="font-body font-medium text-sm text-foreground mb-1">
                AI-Powered
              </h3>
              <p className="font-body text-xs text-muted-foreground">
                Smart learning tools
              </p>
            </div>
            
            <div className="text-center p-4 bg-card rounded-lg border border-border">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Icon name="BarChart3" size={20} color="var(--color-success)" />
              </div>
              <h3 className="font-body font-medium text-sm text-foreground mb-1">
                Track Progress
              </h3>
              <p className="font-body text-xs text-muted-foreground">
                Detailed analytics
              </p>
            </div>
            
            <div className="text-center p-4 bg-card rounded-lg border border-border">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Icon name="FileText" size={20} color="var(--color-accent)" />
              </div>
              <h3 className="font-body font-medium text-sm text-foreground mb-1">
                Smart Papers
              </h3>
              <p className="font-body text-xs text-muted-foreground">
                Custom assessments
              </p>
            </div>
            
            <div className="text-center p-4 bg-card rounded-lg border border-border">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Icon name="Users" size={20} color="var(--color-primary)" />
              </div>
              <h3 className="font-body font-medium text-sm text-foreground mb-1">
                Collaborate
              </h3>
              <p className="font-body text-xs text-muted-foreground">
                Study together
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <Link
                to="/help"
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Help Center
              </Link>
              <Link
                to="/contact"
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact Support
              </Link>
            </div>
            
            <p className="font-body text-xs text-muted-foreground">
              © {new Date()?.getFullYear()} AI Study Companion. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;