import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuestionTypeSelector = ({ selectedTypes, onTypesChange, questionCounts, onCountChange }) => {
  const questionTypes = [
    {
      id: 'multiple-choice',
      name: 'Multiple Choice',
      description: 'Questions with 4 options and one correct answer',
      icon: 'CheckCircle',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      timePerQuestion: '2 min',
      difficulty: 'Easy to grade'
    },
    {
      id: 'short-answer',
      name: 'Short Answer',
      description: 'Brief responses requiring 1-3 sentences',
      icon: 'MessageSquare',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      timePerQuestion: '5 min',
      difficulty: 'Moderate grading'
    },
    {
      id: 'essay',
      name: 'Essay Questions',
      description: 'Long-form answers requiring detailed explanations',
      icon: 'FileText',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      timePerQuestion: '15 min',
      difficulty: 'Complex grading'
    },
    {
      id: 'problem-solving',
      name: 'Problem Solving',
      description: 'Mathematical or logical problems with step-by-step solutions',
      icon: 'Calculator',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      timePerQuestion: '10 min',
      difficulty: 'Detailed grading'
    },
    {
      id: 'true-false',
      name: 'True/False',
      description: 'Binary choice questions for quick assessment',
      icon: 'ToggleLeft',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      timePerQuestion: '1 min',
      difficulty: 'Quick grading'
    },
    {
      id: 'fill-blanks',
      name: 'Fill in the Blanks',
      description: 'Complete sentences or formulas with missing parts',
      icon: 'Edit3',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      timePerQuestion: '3 min',
      difficulty: 'Easy grading'
    }
  ];

  const handleTypeToggle = (typeId) => {
    const newSelectedTypes = selectedTypes?.includes(typeId)
      ? selectedTypes?.filter(id => id !== typeId)
      : [...selectedTypes, typeId];
    onTypesChange(newSelectedTypes);

    // Initialize count for newly selected types
    if (!selectedTypes?.includes(typeId)) {
      onCountChange({ ...questionCounts, [typeId]: 5 });
    }
  };

  const handleCountChange = (typeId, count) => {
    const newCount = Math.max(1, Math.min(50, count));
    onCountChange({ ...questionCounts, [typeId]: newCount });
  };

  const getTotalQuestions = () => {
    return Object.values(questionCounts)?.reduce((sum, count) => sum + count, 0);
  };

  const getEstimatedTime = () => {
    let totalMinutes = 0;
    selectedTypes?.forEach(typeId => {
      const type = questionTypes?.find(t => t?.id === typeId);
      const count = questionCounts?.[typeId] || 0;
      const timePerQ = parseInt(type?.timePerQuestion);
      totalMinutes += timePerQ * count;
    });
    return totalMinutes;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-lg text-foreground">Question Types</h3>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Hash" size={16} />
            <span>{getTotalQuestions()} questions</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={16} />
            <span>{getEstimatedTime()} min</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {questionTypes?.map((type) => {
          const isSelected = selectedTypes?.includes(type?.id);
          const count = questionCounts?.[type?.id] || 5;

          return (
            <div
              key={type?.id}
              className={`border-2 rounded-lg transition-all duration-200 ${
                isSelected
                  ? `${type?.borderColor} ${type?.bgColor}`
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              <div
                className="p-4 cursor-pointer"
                onClick={() => handleTypeToggle(type?.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${type?.bgColor}`}>
                    <Icon name={type?.icon} size={20} className={type?.color} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`font-body font-medium ${
                        isSelected ? type?.color : 'text-foreground'
                      }`}>
                        {type?.name}
                      </h4>
                      {isSelected && (
                        <Icon name="Check" size={16} className={type?.color} />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{type?.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{type?.timePerQuestion} per question</span>
                      <span>{type?.difficulty}</span>
                    </div>
                  </div>
                </div>
              </div>
              {isSelected && (
                <div className="px-4 pb-4 border-t border-border/50">
                  <div className="flex items-center justify-between mt-3">
                    <label className="text-sm font-body text-foreground">Number of questions:</label>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleCountChange(type?.id, count - 1)}
                        disabled={count <= 1}
                        iconName="Minus"
                        iconSize={14}
                        className="w-8 h-8"
                      />
                      <input
                        type="number"
                        value={count}
                        onChange={(e) => handleCountChange(type?.id, parseInt(e?.target?.value) || 1)}
                        min="1"
                        max="50"
                        className="w-16 px-2 py-1 text-center bg-input border border-border rounded text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleCountChange(type?.id, count + 1)}
                        disabled={count >= 50}
                        iconName="Plus"
                        iconSize={14}
                        className="w-8 h-8"
                      />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Estimated time: {parseInt(type?.timePerQuestion) * count} minutes
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {selectedTypes?.length === 0 && (
        <div className="text-center py-8 bg-muted/30 rounded-lg border-2 border-dashed border-border">
          <Icon name="CheckSquare" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground font-body">Select at least one question type to continue.</p>
        </div>
      )}
    </div>
  );
};

export default QuestionTypeSelector;