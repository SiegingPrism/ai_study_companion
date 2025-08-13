import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BatchProcessor = ({ files, onRemoveFile, onProcessAll, onClearAll }) => {
  const [processingQueue, setProcessingQueue] = useState([]);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getFileIcon = (type) => {
    if (type?.includes('pdf')) return 'FileText';
    if (type?.includes('word')) return 'FileText';
    if (type?.includes('text')) return 'File';
    if (type?.includes('image')) return 'Image';
    return 'File';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'processing': return 'text-primary';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'processing': return 'Loader2';
      case 'error': return 'AlertCircle';
      default: return 'Clock';
    }
  };

  if (!files || files?.length === 0) return null;

  const totalSize = files?.reduce((sum, file) => sum + file?.size, 0);
  const completedFiles = files?.filter(file => file?.status === 'completed')?.length;
  const processingFiles = files?.filter(file => file?.status === 'processing')?.length;

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
              Batch Processing Queue
            </h3>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>{files?.length} files</span>
              <span>{formatFileSize(totalSize)} total</span>
              <span>{completedFiles} completed</span>
              {processingFiles > 0 && <span>{processingFiles} processing</span>}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClearAll}
              iconName="Trash2"
              iconPosition="left"
              iconSize={16}
              disabled={processingFiles > 0}
            >
              Clear All
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={onProcessAll}
              iconName="Play"
              iconPosition="left"
              iconSize={16}
              disabled={processingFiles > 0 || files?.every(f => f?.status === 'completed')}
            >
              Process All
            </Button>
          </div>
        </div>

        {/* Progress Overview */}
        {(completedFiles > 0 || processingFiles > 0) && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-body text-sm text-foreground">Overall Progress</span>
              <span className="font-body text-sm text-muted-foreground">
                {completedFiles}/{files?.length}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedFiles / files?.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
      {/* File List */}
      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {files?.map((file, index) => (
          <div key={index} className="p-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-center space-x-4">
              {/* File Icon */}
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={getFileIcon(file?.type)} size={20} color="var(--color-muted-foreground)" />
              </div>

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-body font-medium text-foreground truncate">
                    {file?.name}
                  </h4>
                  <div className="flex items-center space-x-2 ml-4">
                    {/* Status */}
                    <div className="flex items-center space-x-1">
                      <Icon 
                        name={getStatusIcon(file?.status)} 
                        size={16} 
                        className={`${getStatusColor(file?.status)} ${
                          file?.status === 'processing' ? 'animate-spin' : ''
                        }`}
                      />
                      <span className={`font-body text-xs capitalize ${getStatusColor(file?.status)}`}>
                        {file?.status || 'pending'}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-1">
                      {file?.status === 'completed' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          iconName="Eye"
                          iconSize={16}
                          className="w-8 h-8"
                        />
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemoveFile(index)}
                        iconName="X"
                        iconSize={16}
                        className="w-8 h-8 text-error hover:text-error"
                        disabled={file?.status === 'processing'}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                    <span>{formatFileSize(file?.size)}</span>
                    <span>•</span>
                    <span>{file?.type?.split('/')?.[1]?.toUpperCase()}</span>
                    {file?.pages && (
                      <>
                        <span>•</span>
                        <span>{file?.pages} pages</span>
                      </>
                    )}
                  </div>

                  {file?.status === 'processing' && file?.progress && (
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-muted rounded-full h-1">
                        <div 
                          className="bg-primary h-1 rounded-full transition-all duration-300"
                          style={{ width: `${file?.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{file?.progress}%</span>
                    </div>
                  )}
                </div>

                {/* Error Message */}
                {file?.status === 'error' && file?.error && (
                  <div className="mt-2 p-2 bg-error/10 border border-error/20 rounded text-xs text-error">
                    {file?.error}
                  </div>
                )}

                {/* Processing Info */}
                {file?.status === 'processing' && file?.currentStage && (
                  <div className="mt-2 text-xs text-muted-foreground">
                    {file?.currentStage}...
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Queue Actions */}
      <div className="p-4 border-t border-border bg-muted/20">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4 text-muted-foreground">
            <span>Queue Status:</span>
            {processingFiles > 0 ? (
              <span className="text-primary font-medium">Processing {processingFiles} files...</span>
            ) : completedFiles === files?.length ? (
              <span className="text-success font-medium">All files completed</span>
            ) : (
              <span>Ready to process</span>
            )}
          </div>

          {processingFiles > 0 && (
            <div className="flex items-center space-x-2">
              <div className="animate-spin">
                <Icon name="Loader2" size={16} color="var(--color-primary)" />
              </div>
              <span className="text-primary font-medium">Processing...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BatchProcessor;