import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const TopicSelector = ({ selectedSubject, selectedTopics, onTopicsChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState(['core']);

  const topicsBySubject = {
    mathematics: {
      core: [
        { id: 'algebra', name: 'Algebra', subtopics: ['Linear Equations', 'Quadratic Equations', 'Polynomials'] },
        { id: 'geometry', name: 'Geometry', subtopics: ['Triangles', 'Circles', 'Coordinate Geometry'] },
        { id: 'calculus', name: 'Calculus', subtopics: ['Derivatives', 'Integrals', 'Limits'] }
      ],
      advanced: [
        { id: 'statistics', name: 'Statistics', subtopics: ['Probability', 'Data Analysis', 'Hypothesis Testing'] },
        { id: 'trigonometry', name: 'Trigonometry', subtopics: ['Ratios', 'Identities', 'Inverse Functions'] }
      ]
    },
    physics: {
      core: [
        { id: 'mechanics', name: 'Mechanics', subtopics: ['Motion', 'Forces', 'Energy'] },
        { id: 'thermodynamics', name: 'Thermodynamics', subtopics: ['Heat', 'Temperature', 'Entropy'] },
        { id: 'waves', name: 'Waves', subtopics: ['Sound Waves', 'Light Waves', 'Electromagnetic Waves'] }
      ],
      advanced: [
        { id: 'quantum', name: 'Quantum Physics', subtopics: ['Wave-Particle Duality', 'Uncertainty Principle'] },
        { id: 'relativity', name: 'Relativity', subtopics: ['Special Relativity', 'General Relativity'] }
      ]
    },
    chemistry: {
      core: [
        { id: 'organic', name: 'Organic Chemistry', subtopics: ['Hydrocarbons', 'Functional Groups', 'Reactions'] },
        { id: 'inorganic', name: 'Inorganic Chemistry', subtopics: ['Periodic Table', 'Chemical Bonding', 'Acids & Bases'] },
        { id: 'physical', name: 'Physical Chemistry', subtopics: ['Thermochemistry', 'Kinetics', 'Equilibrium'] }
      ],
      advanced: [
        { id: 'analytical', name: 'Analytical Chemistry', subtopics: ['Spectroscopy', 'Chromatography'] },
        { id: 'biochemistry', name: 'Biochemistry', subtopics: ['Proteins', 'Enzymes', 'Metabolism'] }
      ]
    }
  };

  const currentTopics = topicsBySubject?.[selectedSubject] || { core: [], advanced: [] };

  const toggleCategory = (category) => {
    setExpandedCategories(prev =>
      prev?.includes(category)
        ? prev?.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleTopicToggle = (topicId) => {
    const newSelectedTopics = selectedTopics?.includes(topicId)
      ? selectedTopics?.filter(id => id !== topicId)
      : [...selectedTopics, topicId];
    onTopicsChange(newSelectedTopics);
  };

  const selectAllInCategory = (category) => {
    const categoryTopics = currentTopics?.[category]?.map(topic => topic?.id);
    const allSelected = categoryTopics?.every(id => selectedTopics?.includes(id));
    
    if (allSelected) {
      onTopicsChange(selectedTopics?.filter(id => !categoryTopics?.includes(id)));
    } else {
      const newTopics = [...new Set([...selectedTopics, ...categoryTopics])];
      onTopicsChange(newTopics);
    }
  };

  const filteredTopics = Object.entries(currentTopics)?.reduce((acc, [category, topics]) => {
    const filtered = topics?.filter(topic =>
      topic?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      topic?.subtopics?.some(sub => sub?.toLowerCase()?.includes(searchTerm?.toLowerCase()))
    );
    if (filtered?.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {});

  if (!selectedSubject) {
    return (
      <div className="text-center py-8">
        <Icon name="BookOpen" size={48} className="mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground font-body">Please select a subject first to view available topics.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-lg text-foreground">Select Topics</h3>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="pl-9 pr-4 py-2 w-48 bg-input border border-border rounded-lg text-sm font-body text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <span className="text-sm text-muted-foreground">
            {selectedTopics?.length} selected
          </span>
        </div>
      </div>
      <div className="space-y-4">
        {Object.entries(filteredTopics)?.map(([category, topics]) => (
          <div key={category} className="border border-border rounded-lg bg-card">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleCategory(category)}
            >
              <div className="flex items-center space-x-3">
                <Icon
                  name={expandedCategories?.includes(category) ? "ChevronDown" : "ChevronRight"}
                  size={16}
                  className="text-muted-foreground"
                />
                <h4 className="font-body font-medium text-foreground capitalize">
                  {category} Topics ({topics?.length})
                </h4>
              </div>
              <button
                onClick={(e) => {
                  e?.stopPropagation();
                  selectAllInCategory(category);
                }}
                className="text-sm text-primary hover:text-primary/80 font-body"
              >
                {topics?.every(topic => selectedTopics?.includes(topic?.id)) ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            {expandedCategories?.includes(category) && (
              <div className="px-4 pb-4 space-y-3">
                {topics?.map((topic) => (
                  <div key={topic?.id} className="border border-border rounded-lg p-3 bg-background">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        checked={selectedTopics?.includes(topic?.id)}
                        onChange={() => handleTopicToggle(topic?.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <h5 className="font-body font-medium text-foreground mb-1">{topic?.name}</h5>
                        <div className="flex flex-wrap gap-1">
                          {topic?.subtopics?.map((subtopic, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-body"
                            >
                              {subtopic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {Object.keys(filteredTopics)?.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground font-body">No topics found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default TopicSelector;