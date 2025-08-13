import React from 'react';
import Icon from '../../../components/AppIcon';

const ProcessingStatus = ({ isProcessing, progress, currentStage, estimatedTime }) => {
  const stages = [
    { id: 'upload', label: 'Uploading', icon: 'Upload' },
    { id: 'analysis', label: 'Analyzing Content', icon: 'Search' },
    { id: 'extraction', label: 'Extracting Key Points', icon: 'Filter' },
    { id: 'summarization', label: 'Generating Summary', icon: 'Brain' },
    { id: 'formatting', label: 'Formatting Results', icon: 'FileText' }
  ];

  if (!isProcessing) return null;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Processing Document
        </h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>~{estimatedTime}s remaining</span>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-body text-sm text-foreground">Overall Progress</span>
          <span className="font-body text-sm text-muted-foreground">{progress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      {/* Processing Stages */}
      <div className="space-y-3">
        {stages?.map((stage, index) => {
          const isActive = stage?.id === currentStage;
          const isCompleted = stages?.findIndex(s => s?.id === currentStage) > index;
          
          return (
            <div key={stage?.id} className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                isCompleted 
                  ? 'bg-success text-white' 
                  : isActive 
                    ? 'bg-primary text-white animate-pulse' :'bg-muted text-muted-foreground'
              }`}>
                {isCompleted ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={stage?.icon} size={16} />
                )}
              </div>
              <span className={`font-body text-sm transition-colors duration-200 ${
                isActive ? 'text-foreground font-medium' : 'text-muted-foreground'
              }`}>
                {stage?.label}
                {isActive && (
                  <span className="ml-2 inline-flex items-center">
                    <div className="animate-spin">
                      <Icon name="Loader2" size={12} />
                    </div>
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </div>
      {/* AI Analysis Info */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Brain" size={20} color="var(--color-primary)" />
          <div>
            <h4 className="font-body font-medium text-sm text-foreground mb-1">AI Analysis in Progress</h4>
            <p className="font-body text-xs text-muted-foreground">
              Our advanced AI is reading through your document, identifying key concepts, 
              and preparing a comprehensive summary tailored to your study needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingStatus;