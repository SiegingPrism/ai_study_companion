import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Question Papers', path: '/question-paper-generator', icon: 'FileText' },
    { label: 'Summarizer', path: '/document-summarizer', icon: 'BookOpen' },
    { label: 'Analytics', path: '/study-analytics', icon: 'BarChart3' },
  ];

  const isActive = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    navigate('/login');
    setIsProfileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border elevation-1">
      <div className="flex items-center justify-between h-14 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Brain" size={20} color="white" />
          </div>
          <span className="font-heading font-semibold text-lg text-foreground">
            AI Study Companion
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Button
              key={item?.path}
              variant={isActive(item?.path) ? "default" : "ghost"}
              size="sm"
              onClick={() => handleNavigation(item?.path)}
              iconName={item?.icon}
              iconPosition="left"
              iconSize={16}
              className="transition-smooth"
            >
              {item?.label}
            </Button>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Search */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex"
            iconName="Search"
            iconSize={18}
          />

          {/* Profile Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="transition-smooth"
            >
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={14} color="white" />
              </div>
            </Button>

            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg elevation-2 animate-slide-in">
                <div className="p-3 border-b border-border">
                  <p className="font-body font-medium text-sm text-foreground">Student User</p>
                  <p className="font-body text-xs text-muted-foreground">student@example.com</p>
                </div>
                <div className="p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    fullWidth
                    iconName="User"
                    iconPosition="left"
                    iconSize={16}
                    className="justify-start"
                  >
                    Profile
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    fullWidth
                    iconName="Settings"
                    iconPosition="left"
                    iconSize={16}
                    className="justify-start"
                  >
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    fullWidth
                    iconName="HelpCircle"
                    iconPosition="left"
                    iconSize={16}
                    className="justify-start"
                  >
                    Help
                  </Button>
                  <div className="border-t border-border my-1"></div>
                  <Button
                    variant="ghost"
                    size="sm"
                    fullWidth
                    iconName="LogOut"
                    iconPosition="left"
                    iconSize={16}
                    className="justify-start text-error hover:text-error"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            iconName={isMenuOpen ? "X" : "Menu"}
            iconSize={20}
          />
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-t border-border animate-slide-in">
          <nav className="p-4 space-y-2">
            {navigationItems?.map((item) => (
              <Button
                key={item?.path}
                variant={isActive(item?.path) ? "default" : "ghost"}
                size="sm"
                fullWidth
                onClick={() => handleNavigation(item?.path)}
                iconName={item?.icon}
                iconPosition="left"
                iconSize={16}
                className="justify-start transition-smooth"
              >
                {item?.label}
              </Button>
            ))}
          </nav>
        </div>
      )}
      {/* Overlay for mobile dropdowns */}
      {(isMenuOpen || isProfileOpen) && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => {
            setIsMenuOpen(false);
            setIsProfileOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;