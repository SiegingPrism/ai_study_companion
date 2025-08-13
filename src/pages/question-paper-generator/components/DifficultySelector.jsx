import React from 'react';
import Icon from '../../../components/AppIcon';

const DifficultySelector = ({ selectedDifficulty, onDifficultyChange }) => {
  const difficultyLevels = [
    {
      id: 'beginner',
      name: 'Beginner',
      description: 'Basic concepts and fundamental understanding',
      icon: 'CircleDot',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      percentage: 25,
      sample: 'What is the formula for area of a circle?'
    },
    {
      id: 'intermediate',
      name: 'Intermediate',
      description: 'Application of concepts with moderate complexity',
      icon: 'Circle',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      percentage: 50,
      sample: 'Calculate the area of a circle with radius 7cm, showing all steps.'
    },
    {
      id: 'advanced',
      name: 'Advanced',
      description: 'Complex problem-solving and critical thinking',
      icon: 'Target',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      percentage: 75,
      sample: 'Derive the formula for the area of a circle using integration.'
    },
    {
      id: 'expert',
      name: 'Expert',
      description: 'Research-level questions requiring deep analysis',
      icon: 'Crown',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      percentage: 100,
      sample: 'Prove that π is transcendental using advanced mathematical concepts.'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-lg text-foreground">Difficulty Level</h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Info" size={16} />
          <span>Choose complexity level for questions</span>
        </div>
      </div>
      {/* Visual Difficulty Scale */}
      <div className="relative">
        <div className="flex justify-between mb-2">
          {difficultyLevels?.map((level, index) => (
            <div key={level?.id} className="flex flex-col items-center">
              <div
                className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                  selectedDifficulty === level?.id
                    ? `${level?.color} ${level?.borderColor} bg-current`
                    : 'border-border bg-background'
                }`}
              />
              <span className={`text-xs mt-1 font-body ${
                selectedDifficulty === level?.id ? level?.color : 'text-muted-foreground'
              }`}>
                {level?.name}
              </span>
            </div>
          ))}
        </div>
        <div className="h-1 bg-border rounded-full relative">
          <div
            className="h-full bg-gradient-to-r from-green-500 via-yellow-500 via-red-500 to-purple-500 rounded-full transition-all duration-300"
            style={{
              width: `${difficultyLevels?.find(l => l?.id === selectedDifficulty)?.percentage || 0}%`
            }}
          />
        </div>
      </div>
      {/* Difficulty Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {difficultyLevels?.map((level) => (
          <div
            key={level?.id}
            onClick={() => onDifficultyChange(level?.id)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:elevation-1 ${
              selectedDifficulty === level?.id
                ? `${level?.borderColor} ${level?.bgColor}`
                : 'border-border bg-card hover:border-primary/50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${level?.bgColor}`}>
                <Icon name={level?.icon} size={20} className={level?.color} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={`font-body font-medium ${
                    selectedDifficulty === level?.id ? level?.color : 'text-foreground'
                  }`}>
                    {level?.name}
                  </h4>
                  {selectedDifficulty === level?.id && (
                    <Icon name="Check" size={16} className={level?.color} />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{level?.description}</p>
                <div className={`p-2 rounded border ${level?.borderColor} ${level?.bgColor}`}>
                  <p className="text-xs font-body text-muted-foreground mb-1">Sample Question:</p>
                  <p className="text-sm font-body">{level?.sample}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;