import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SummaryResults = ({ summary, onExport, onCreateFlashcards, onBookmark }) => {
  const [expandedSections, setExpandedSections] = useState(new Set());
  const [summaryLength, setSummaryLength] = useState('medium');

  const toggleSection = (sectionId) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded?.has(sectionId)) {
      newExpanded?.delete(sectionId);
    } else {
      newExpanded?.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const lengthOptions = [
    { value: 'brief', label: 'Brief', description: 'Key points only' },
    { value: 'medium', label: 'Medium', description: 'Balanced overview' },
    { value: 'detailed', label: 'Detailed', description: 'Comprehensive analysis' }
  ];

  if (!summary) return null;

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
              Document Summary
            </h3>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="FileText" size={16} />
                <span>{summary?.originalLength} words → {summary?.summaryLength} words</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Zap" size={16} />
                <span>{summary?.compressionRatio}% compression</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={16} />
                <span>{summary?.readingTime} min read</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBookmark(summary?.id)}
              iconName={summary?.isBookmarked ? "BookmarkCheck" : "Bookmark"}
              iconPosition="left"
              iconSize={16}
            >
              {summary?.isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCreateFlashcards(summary)}
              iconName="Brain"
              iconPosition="left"
              iconSize={16}
            >
              Create Flashcards
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => onExport(summary)}
              iconName="Download"
              iconPosition="left"
              iconSize={16}
            >
              Export
            </Button>
          </div>
        </div>

        {/* Summary Length Control */}
        <div className="mt-4">
          <div className="flex items-center space-x-4">
            <span className="font-body text-sm text-foreground">Summary Length:</span>
            <div className="flex items-center space-x-2">
              {lengthOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => setSummaryLength(option?.value)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    summaryLength === option?.value
                      ? 'bg-primary text-white' :'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {option?.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* AI Confidence Score */}
      <div className="p-4 bg-muted/50 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} color="var(--color-success)" />
            <span className="font-body text-sm text-foreground">AI Confidence Score</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-24 bg-background rounded-full h-2">
              <div 
                className="bg-success h-2 rounded-full" 
                style={{ width: `${summary?.confidenceScore}%` }}
              />
            </div>
            <span className="font-body text-sm font-medium text-foreground">
              {summary?.confidenceScore}%
            </span>
          </div>
        </div>
        <p className="font-body text-xs text-muted-foreground mt-1">
          High confidence indicates reliable extraction of key information from the source material.
        </p>
      </div>
      {/* Summary Content */}
      <div className="p-6">
        {/* Executive Summary */}
        <div className="mb-6">
          <h4 className="font-heading font-semibold text-lg text-foreground mb-3">
            Executive Summary
          </h4>
          <p className="font-body text-foreground leading-relaxed">
            {summary?.executiveSummary}
          </p>
        </div>

        {/* Key Points */}
        <div className="mb-6">
          <h4 className="font-heading font-semibold text-lg text-foreground mb-3">
            Key Points
          </h4>
          <div className="space-y-3">
            {summary?.keyPoints?.map((point, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-medium">{index + 1}</span>
                </div>
                <p className="font-body text-foreground">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Themes */}
        <div className="mb-6">
          <h4 className="font-heading font-semibold text-lg text-foreground mb-3">
            Main Themes
          </h4>
          <div className="flex flex-wrap gap-2">
            {summary?.mainThemes?.map((theme, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-4">
          <h4 className="font-heading font-semibold text-lg text-foreground">
            Detailed Analysis
          </h4>
          {summary?.detailedSections?.map((section) => (
            <div key={section?.id} className="border border-border rounded-lg">
              <button
                onClick={() => toggleSection(section?.id)}
                className="w-full p-4 text-left hover:bg-muted/50 transition-colors flex items-center justify-between"
              >
                <div>
                  <h5 className="font-body font-medium text-foreground">{section?.title}</h5>
                  <p className="font-body text-sm text-muted-foreground mt-1">
                    {section?.preview}
                  </p>
                </div>
                <Icon 
                  name={expandedSections?.has(section?.id) ? "ChevronUp" : "ChevronDown"} 
                  size={20} 
                  className="text-muted-foreground"
                />
              </button>
              {expandedSections?.has(section?.id) && (
                <div className="p-4 border-t border-border bg-muted/20">
                  <p className="font-body text-foreground leading-relaxed whitespace-pre-line">
                    {section?.content}
                  </p>
                  {section?.references && section?.references?.length > 0 && (
                    <div className="mt-4">
                      <h6 className="font-body font-medium text-sm text-foreground mb-2">
                        References in this section:
                      </h6>
                      <div className="space-y-1">
                        {section?.references?.map((ref, index) => (
                          <p key={index} className="font-body text-xs text-muted-foreground">
                            • {ref}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SummaryResults;