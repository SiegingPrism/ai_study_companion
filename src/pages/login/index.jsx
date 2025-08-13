import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import FeatureHighlight from './components/FeatureHighlight';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Icon name="Brain" size={24} color="white" />
              </div>
              <div>
                <h1 className="font-heading font-bold text-xl text-foreground">
                  AI Study Companion
                </h1>
                <p className="font-body text-xs text-muted-foreground">
                  Intelligent Learning Platform
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#features" className="font-body text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Features
              </a>
              <a href="#pricing" className="font-body text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Pricing
              </a>
              <a href="#about" className="font-body text-sm text-muted-foreground hover:text-foreground transition-smooth">
                About
              </a>
              <button
                onClick={() => navigate('/register')}
                className="font-body text-sm text-primary hover:text-primary/80 transition-smooth"
              >
                Sign Up
              </button>
            </nav>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Login Form */}
            <div className="flex flex-col justify-center">
              <div className="mb-8 text-center lg:text-left">
                <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4">
                  Welcome to Your
                  <span className="text-primary block">Learning Journey</span>
                </h2>
                <p className="font-body text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
                  Access your personalized AI-powered study environment and unlock your academic potential.
                </p>
              </div>

              <LoginForm />

              {/* Quick Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="font-heading font-bold text-xl text-primary">50K+</div>
                  <div className="font-body text-xs text-muted-foreground">Students</div>
                </div>
                <div>
                  <div className="font-heading font-bold text-xl text-accent">1M+</div>
                  <div className="font-body text-xs text-muted-foreground">Questions</div>
                </div>
                <div>
                  <div className="font-heading font-bold text-xl text-success">98%</div>
                  <div className="font-body text-xs text-muted-foreground">Success</div>
                </div>
              </div>
            </div>

            {/* Right Column - Features & Trust Signals */}
            <div className="space-y-8">
              {/* Mobile: Show condensed version */}
              <div className="lg:hidden">
                <TrustSignals />
              </div>

              {/* Desktop: Show full feature highlight */}
              <div className="hidden lg:block">
                <FeatureHighlight />
              </div>
            </div>
          </div>

          {/* Mobile: Additional Trust Signals */}
          <div className="lg:hidden mt-12">
            <div className="text-center mb-6">
              <h3 className="font-heading font-semibold text-xl text-foreground">
                Why Choose AI Study Companion?
              </h3>
            </div>
            <FeatureHighlight />
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                  <Icon name="Brain" size={20} color="white" />
                </div>
                <span className="font-heading font-semibold text-lg text-foreground">
                  AI Study Companion
                </span>
              </div>
              <p className="font-body text-sm text-muted-foreground mb-4 max-w-md">
                Empowering students worldwide with AI-driven study tools for academic excellence and lifelong learning.
              </p>
              <div className="flex items-center space-x-4">
                <Icon name="Mail" size={16} color="var(--color-muted-foreground)" />
                <span className="font-body text-sm text-muted-foreground">support@aistudycompanion.com</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-semibold text-sm text-foreground mb-3">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="font-body text-sm text-muted-foreground hover:text-foreground transition-smooth">Features</a></li>
                <li><a href="#" className="font-body text-sm text-muted-foreground hover:text-foreground transition-smooth">Pricing</a></li>
                <li><a href="#" className="font-body text-sm text-muted-foreground hover:text-foreground transition-smooth">API</a></li>
                <li><a href="#" className="font-body text-sm text-muted-foreground hover:text-foreground transition-smooth">Integrations</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-heading font-semibold text-sm text-foreground mb-3">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="font-body text-sm text-muted-foreground hover:text-foreground transition-smooth">Help Center</a></li>
                <li><a href="#" className="font-body text-sm text-muted-foreground hover:text-foreground transition-smooth">Contact Us</a></li>
                <li><a href="#" className="font-body text-sm text-muted-foreground hover:text-foreground transition-smooth">Privacy Policy</a></li>
                <li><a href="#" className="font-body text-sm text-muted-foreground hover:text-foreground transition-smooth">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row items-center justify-between">
            <p className="font-body text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} AI Study Companion. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Icon name="Shield" size={16} color="var(--color-success)" />
              <span className="font-body text-xs text-muted-foreground">Secure & Private</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;