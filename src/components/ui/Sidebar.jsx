import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard', description: 'Overview and progress' },
    { label: 'Question Papers', path: '/question-paper-generator', icon: 'FileText', description: 'Generate custom assessments' },
    { label: 'Summarizer', path: '/document-summarizer', icon: 'BookOpen', description: 'Extract key insights' },
    { label: 'Analytics', path: '/study-analytics', icon: 'BarChart3', description: 'Track your performance' },
  ];

  const secondaryItems = [
    { label: 'Settings', path: '/settings', icon: 'Settings' },
    { label: 'Help', path: '/help', icon: 'HelpCircle' },
  ];

  const isActive = (path) => location?.pathname === path;
  const shouldExpand = !isCollapsed || isHovered;

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <aside
      className={`fixed left-0 top-14 bottom-0 z-40 bg-card border-r border-border transition-all duration-300 ${
        shouldExpand ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        {/* Toggle Button */}
        {onToggle && (
          <div className="p-3 border-b border-border">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
              iconSize={16}
              className="transition-smooth"
            />
          </div>
        )}

        {/* Main Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          <div className="space-y-1">
            {navigationItems?.map((item) => (
              <div key={item?.path} className="relative group">
                <Button
                  variant={isActive(item?.path) ? "default" : "ghost"}
                  size="sm"
                  fullWidth
                  onClick={() => handleNavigation(item?.path)}
                  iconName={item?.icon}
                  iconPosition="left"
                  iconSize={18}
                  className={`justify-start transition-smooth ${
                    shouldExpand ? 'px-3' : 'px-2 justify-center'
                  }`}
                >
                  {shouldExpand && item?.label}
                </Button>

                {/* Tooltip for collapsed state */}
                {isCollapsed && !isHovered && (
                  <div className="absolute left-full top-0 ml-2 px-2 py-1 bg-popover border border-border rounded-md text-xs font-body text-popover-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item?.label}
                    {item?.description && (
                      <div className="text-muted-foreground">{item?.description}</div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Progress Section */}
          {shouldExpand && (
            <div className="mt-6 p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-body font-medium text-sm text-foreground">Study Streak</span>
                <Icon name="Flame" size={16} color="var(--color-accent)" />
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-background rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <span className="font-body text-xs text-muted-foreground">7 days</span>
              </div>
            </div>
          )}
        </nav>

        {/* Secondary Navigation */}
        <div className="p-3 border-t border-border space-y-1">
          {secondaryItems?.map((item) => (
            <div key={item?.path} className="relative group">
              <Button
                variant="ghost"
                size="sm"
                fullWidth
                onClick={() => handleNavigation(item?.path)}
                iconName={item?.icon}
                iconPosition="left"
                iconSize={16}
                className={`justify-start transition-smooth ${
                  shouldExpand ? 'px-3' : 'px-2 justify-center'
                }`}
              >
                {shouldExpand && item?.label}
              </Button>

              {/* Tooltip for collapsed state */}
              {isCollapsed && !isHovered && (
                <div className="absolute left-full top-0 ml-2 px-2 py-1 bg-popover border border-border rounded-md text-xs font-body text-popover-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {item?.label}
                </div>
              )}
            </div>
          ))}

          {/* User Profile */}
          <div className="mt-4 pt-3 border-t border-border">
            <div className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-smooth ${
              shouldExpand ? '' : 'justify-center'
            }`}>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="User" size={16} color="white" />
              </div>
              {shouldExpand && (
                <div className="flex-1 min-w-0">
                  <p className="font-body font-medium text-sm text-foreground truncate">Student User</p>
                  <p className="font-body text-xs text-muted-foreground truncate">Free Plan</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;