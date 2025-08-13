import React from 'react';
import Icon from '../../../components/AppIcon';

const GenerationProgress = ({ isGenerating, progress, currentStep, totalSteps }) => {
  const steps = [
    { id: 'analyzing', label: 'Analyzing Requirements', icon: 'Search' },
    { id: 'generating', label: 'Generating Questions', icon: 'Zap' },
    { id: 'reviewing', label: 'Reviewing Quality', icon: 'CheckCircle' },
    { id: 'formatting', label: 'Formatting Paper', icon: 'FileText' },
    { id: 'complete', label: 'Complete', icon: 'Check' }
  ];

  if (!isGenerating) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg p-8 max-w-md w-full mx-4 elevation-2">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Brain" size={32} className="text-primary animate-pulse" />
          </div>
          <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
            Generating Your Question Paper
          </h3>
          <p className="text-sm text-muted-foreground">
            AI is creating customized questions based on your preferences
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-body text-foreground">Progress</span>
            <span className="text-sm font-body text-muted-foreground">{progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {steps?.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <div
                key={step?.id}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-primary/10 border border-primary/20'
                    : isCompleted
                    ? 'bg-success/10' :'bg-muted/30'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted
                      ? 'bg-success text-success-foreground'
                      : isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {isCompleted ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <Icon
                      name={step?.icon}
                      size={16}
                      className={isActive ? 'animate-pulse' : ''}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <p
                    className={`font-body text-sm ${
                      isActive
                        ? 'text-primary font-medium'
                        : isCompleted
                        ? 'text-success' :'text-muted-foreground'
                    }`}
                  >
                    {step?.label}
                  </p>
                  {isActive && (
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="w-1 h-1 bg-primary rounded-full animate-bounce" />
                      <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Estimated Time */}
        <div className="mt-6 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <span className="font-body text-muted-foreground">Estimated time remaining:</span>
            </div>
            <span className="font-body font-medium text-foreground">
              {Math.max(1, Math.ceil((100 - progress) / 20))} min
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerationProgress;