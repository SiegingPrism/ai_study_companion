import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UploadZone = ({ onFileUpload, isProcessing }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const supportedFormats = [
    { extension: 'PDF', icon: 'FileText', color: 'text-red-500' },
    { extension: 'DOCX', icon: 'FileText', color: 'text-blue-500' },
    { extension: 'TXT', icon: 'File', color: 'text-gray-500' },
    { extension: 'JPG/PNG', icon: 'Image', color: 'text-green-500' }
  ];

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e?.dataTransfer?.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files?.filter(file => {
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'image/jpeg', 'image/png'];
      return validTypes?.includes(file?.type) && file?.size <= 10 * 1024 * 1024; // 10MB limit
    });

    if (validFiles?.length > 0) {
      onFileUpload(validFiles);
    }
  };

  const openFileDialog = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isDragOver 
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
        } ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.txt,.jpg,.jpeg,.png"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isProcessing}
        />

        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Upload" size={32} color="var(--color-primary)" />
          </div>

          <div className="space-y-2">
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Upload Documents to Summarize
            </h3>
            <p className="font-body text-muted-foreground max-w-md">
              Drag and drop your files here, or click to browse. Support for multiple formats with AI-powered analysis.
            </p>
          </div>

          <Button
            variant="default"
            onClick={openFileDialog}
            disabled={isProcessing}
            iconName="FolderOpen"
            iconPosition="left"
            iconSize={18}
          >
            Choose Files
          </Button>

          <div className="text-xs text-muted-foreground">
            Maximum file size: 10MB per file
          </div>
        </div>
      </div>
      {/* Supported Formats */}
      <div className="mt-6">
        <h4 className="font-body font-medium text-sm text-foreground mb-3">Supported Formats</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {supportedFormats?.map((format) => (
            <div key={format?.extension} className="flex items-center space-x-2 p-2 bg-muted rounded-lg">
              <Icon name={format?.icon} size={16} className={format?.color} />
              <span className="font-body text-xs text-foreground">{format?.extension}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadZone;