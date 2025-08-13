import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const AdvancedOptions = ({ options, onOptionsChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const bloomsTaxonomyLevels = [
    { value: 'remember', label: 'Remember', description: 'Recall facts and basic concepts' },
    { value: 'understand', label: 'Understand', description: 'Explain ideas or concepts' },
    { value: 'apply', label: 'Apply', description: 'Use information in new situations' },
    { value: 'analyze', label: 'Analyze', description: 'Draw connections among ideas' },
    { value: 'evaluate', label: 'Evaluate', description: 'Justify a stand or decision' },
    { value: 'create', label: 'Create', description: 'Produce new or original work' }
  ];

  const learningObjectives = [
    { value: 'conceptual', label: 'Conceptual Understanding', description: 'Grasp underlying principles' },
    { value: 'procedural', label: 'Procedural Knowledge', description: 'Know how to do something' },
    { value: 'factual', label: 'Factual Knowledge', description: 'Basic elements students must know' },
    { value: 'metacognitive', label: 'Metacognitive Knowledge', description: 'Awareness of own cognition' }
  ];

  const markingSchemes = [
    { value: 'standard', label: 'Standard Marking', description: 'Equal marks for all questions' },
    { value: 'weighted', label: 'Weighted Marking', description: 'Different marks based on difficulty' },
    { value: 'negative', label: 'Negative Marking', description: 'Deduct marks for wrong answers' },
    { value: 'partial', label: 'Partial Credit', description: 'Award partial marks for incomplete answers' }
  ];

  const handleOptionChange = (key, value) => {
    onOptionsChange({ ...options, [key]: value });
  };

  const handleArrayOptionToggle = (key, value) => {
    const currentArray = options?.[key] || [];
    const newArray = currentArray?.includes(value)
      ? currentArray?.filter(item => item !== value)
      : [...currentArray, value];
    onOptionsChange({ ...options, [key]: newArray });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-lg text-foreground">Advanced Options</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          iconSize={16}
        >
          {isExpanded ? 'Hide' : 'Show'} Advanced Settings
        </Button>
      </div>
      {isExpanded && (
        <div className="space-y-6 p-6 bg-muted/30 rounded-lg border border-border">
          {/* Time Limit Configuration */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={18} className="text-primary" />
              <h4 className="font-body font-medium text-foreground">Time Limit</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-body text-foreground mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  value={options?.timeLimit || 60}
                  onChange={(e) => handleOptionChange('timeLimit', parseInt(e?.target?.value) || 60)}
                  min="15"
                  max="300"
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="flex items-center space-x-2 mt-6">
                <Checkbox
                  checked={options?.showTimer || false}
                  onChange={(e) => handleOptionChange('showTimer', e?.target?.checked)}
                />
                <label className="text-sm font-body text-foreground">Show countdown timer</label>
              </div>
            </div>
          </div>

          {/* Bloom's Taxonomy */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Icon name="Target" size={18} className="text-primary" />
              <h4 className="font-body font-medium text-foreground">Bloom's Taxonomy Levels</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {bloomsTaxonomyLevels?.map((level) => (
                <div key={level?.value} className="flex items-start space-x-2 p-3 bg-card rounded-lg border border-border">
                  <Checkbox
                    checked={(options?.bloomsLevels || [])?.includes(level?.value)}
                    onChange={() => handleArrayOptionToggle('bloomsLevels', level?.value)}
                    className="mt-1"
                  />
                  <div>
                    <label className="font-body font-medium text-foreground text-sm">{level?.label}</label>
                    <p className="text-xs text-muted-foreground">{level?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Objectives */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Icon name="BookOpen" size={18} className="text-primary" />
              <h4 className="font-body font-medium text-foreground">Learning Objectives</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {learningObjectives?.map((objective) => (
                <div key={objective?.value} className="flex items-start space-x-2 p-3 bg-card rounded-lg border border-border">
                  <Checkbox
                    checked={(options?.learningObjectives || [])?.includes(objective?.value)}
                    onChange={() => handleArrayOptionToggle('learningObjectives', objective?.value)}
                    className="mt-1"
                  />
                  <div>
                    <label className="font-body font-medium text-foreground text-sm">{objective?.label}</label>
                    <p className="text-xs text-muted-foreground">{objective?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Marking Scheme */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={18} className="text-primary" />
              <h4 className="font-body font-medium text-foreground">Marking Scheme</h4>
            </div>
            <Select
              options={markingSchemes}
              value={options?.markingScheme || 'standard'}
              onChange={(value) => handleOptionChange('markingScheme', value)}
              placeholder="Select marking scheme"
            />
            {options?.markingScheme === 'negative' && (
              <div className="mt-2">
                <label className="block text-sm font-body text-foreground mb-2">Negative marking percentage</label>
                <input
                  type="number"
                  value={options?.negativeMarking || 25}
                  onChange={(e) => handleOptionChange('negativeMarking', parseInt(e?.target?.value) || 25)}
                  min="0"
                  max="100"
                  className="w-32 px-3 py-2 bg-input border border-border rounded-lg text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <span className="ml-2 text-sm text-muted-foreground">%</span>
              </div>
            )}
          </div>

          {/* Reference Materials */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Icon name="Library" size={18} className="text-primary" />
              <h4 className="font-body font-medium text-foreground">Reference Materials</h4>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={options?.includeReferences || false}
                  onChange={(e) => handleOptionChange('includeReferences', e?.target?.checked)}
                />
                <label className="text-sm font-body text-foreground">Include reference materials with questions</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={options?.citationRequired || false}
                  onChange={(e) => handleOptionChange('citationRequired', e?.target?.checked)}
                />
                <label className="text-sm font-body text-foreground">Require citations in answers</label>
              </div>
            </div>
          </div>

          {/* Question Randomization */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Icon name="Shuffle" size={18} className="text-primary" />
              <h4 className="font-body font-medium text-foreground">Question Randomization</h4>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={options?.randomizeQuestions || false}
                  onChange={(e) => handleOptionChange('randomizeQuestions', e?.target?.checked)}
                />
                <label className="text-sm font-body text-foreground">Randomize question order</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={options?.randomizeOptions || false}
                  onChange={(e) => handleOptionChange('randomizeOptions', e?.target?.checked)}
                />
                <label className="text-sm font-body text-foreground">Randomize answer options (MCQ)</label>
              </div>
            </div>
          </div>

          {/* Additional Settings */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Icon name="Settings" size={18} className="text-primary" />
              <h4 className="font-body font-medium text-foreground">Additional Settings</h4>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={options?.showAnswerKey || true}
                  onChange={(e) => handleOptionChange('showAnswerKey', e?.target?.checked)}
                />
                <label className="text-sm font-body text-foreground">Generate answer key</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={options?.includeExplanations || false}
                  onChange={(e) => handleOptionChange('includeExplanations', e?.target?.checked)}
                />
                <label className="text-sm font-body text-foreground">Include detailed explanations</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={options?.institutionalBranding || false}
                  onChange={(e) => handleOptionChange('institutionalBranding', e?.target?.checked)}
                />
                <label className="text-sm font-body text-foreground">Add institutional branding</label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedOptions;