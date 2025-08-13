import React from 'react';
import Icon from '../../../components/AppIcon';

const StepIndicator = ({ currentStep, totalSteps = 3 }) => {
  const steps = [
    { number: 1, title: 'Personal Info', icon: 'User' },
    { number: 2, title: 'Security', icon: 'Shield' },
    { number: 3, title: 'Preferences', icon: 'Settings' }
  ];

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.number}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step?.number < currentStep
                    ? 'bg-success text-white'
                    : step?.number === currentStep
                    ? 'bg-primary text-white' :'bg-muted text-muted-foreground'
                }`}
              >
                {step?.number < currentStep ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step?.icon} size={16} />
                )}
              </div>
              <span
                className={`mt-2 text-xs font-body font-medium ${
                  step?.number <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {step?.title}
              </span>
            </div>
            
            {index < steps?.length - 1 && (
              <div className="flex-1 mx-4">
                <div
                  className={`h-0.5 transition-all duration-300 ${
                    step?.number < currentStep ? 'bg-success' : 'bg-muted'
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;