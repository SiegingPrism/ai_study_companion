import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const CitationGenerator = ({ document, onCopy }) => {
  const [citationStyle, setCitationStyle] = useState('apa');
  const [copiedStyle, setCopiedStyle] = useState(null);

  const citationStyles = [
    { value: 'apa', label: 'APA Style', description: 'American Psychological Association' },
    { value: 'mla', label: 'MLA Style', description: 'Modern Language Association' },
    { value: 'chicago', label: 'Chicago Style', description: 'Chicago Manual of Style' }
  ];

  const generateCitation = (style, doc) => {
    const currentDate = new Date()?.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    switch (style) {
      case 'apa':
        return `${doc?.author || 'Unknown Author'}. (${doc?.year || new Date()?.getFullYear()}). ${doc?.title}. ${doc?.publisher || 'Self-published'}. Retrieved ${currentDate}, from ${doc?.url || 'local file'}`;
      
      case 'mla':
        return `${doc?.author || 'Unknown Author'}. "${doc?.title}." ${doc?.publisher || 'Self-published'}, ${doc?.year || new Date()?.getFullYear()}. Web. ${currentDate}.`;
      
      case 'chicago':
        return `${doc?.author || 'Unknown Author'}. "${doc?.title}." ${doc?.publisher || 'Self-published'}. Accessed ${currentDate}. ${doc?.url || 'Local file'}.`;
      
      default:
        return '';
    }
  };

  const handleCopy = async (style) => {
    const citation = generateCitation(style, document);
    try {
      await navigator.clipboard?.writeText(citation);
      setCopiedStyle(style);
      onCopy?.(citation, style);
      setTimeout(() => setCopiedStyle(null), 2000);
    } catch (err) {
      console.error('Failed to copy citation:', err);
    }
  };

  if (!document) return null;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Citation Generator
        </h3>
        <Icon name="Quote" size={20} color="var(--color-primary)" />
      </div>
      <div className="space-y-4">
        {/* Style Selector */}
        <div>
          <Select
            label="Citation Style"
            options={citationStyles}
            value={citationStyle}
            onChange={setCitationStyle}
            className="mb-4"
          />
        </div>

        {/* Generated Citations */}
        <div className="space-y-3">
          {citationStyles?.map((style) => (
            <div key={style?.value} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-body font-medium text-foreground">{style?.label}</h4>
                  <p className="font-body text-xs text-muted-foreground">{style?.description}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(style?.value)}
                  iconName={copiedStyle === style?.value ? "Check" : "Copy"}
                  iconPosition="left"
                  iconSize={16}
                  className={copiedStyle === style?.value ? 'text-success border-success' : ''}
                >
                  {copiedStyle === style?.value ? 'Copied!' : 'Copy'}
                </Button>
              </div>
              
              <div className="bg-muted rounded-lg p-3">
                <p className="font-mono text-sm text-foreground leading-relaxed">
                  {generateCitation(style?.value, document)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Document Information */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-body font-medium text-foreground mb-3">Document Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="font-medium text-muted-foreground">Title:</span>
              <p className="text-foreground">{document?.title || 'Untitled Document'}</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Author:</span>
              <p className="text-foreground">{document?.author || 'Unknown Author'}</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Year:</span>
              <p className="text-foreground">{document?.year || new Date()?.getFullYear()}</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Publisher:</span>
              <p className="text-foreground">{document?.publisher || 'Self-published'}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            iconName="BookOpen"
            iconPosition="left"
            iconSize={16}
          >
            Add to Bibliography
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Share"
            iconPosition="left"
            iconSize={16}
          >
            Share Citation
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Export All Styles
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CitationGenerator;