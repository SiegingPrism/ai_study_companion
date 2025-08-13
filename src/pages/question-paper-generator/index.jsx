import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import SubjectSelector from './components/SubjectSelector';
import DifficultySelector from './components/DifficultySelector';
import TopicSelector from './components/TopicSelector';
import QuestionTypeSelector from './components/QuestionTypeSelector';
import AdvancedOptions from './components/AdvancedOptions';
import QuestionPreview from './components/QuestionPreview';
import GenerationProgress from './components/GenerationProgress';

const QuestionPaperGenerator = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStep, setGenerationStep] = useState(0);

  // Form state
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('intermediate');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState(['multiple-choice']);
  const [questionCounts, setQuestionCounts] = useState({ 'multiple-choice': 5 });
  const [advancedOptions, setAdvancedOptions] = useState({
    timeLimit: 60,
    showTimer: true,
    bloomsLevels: ['understand', 'apply'],
    learningObjectives: ['conceptual'],
    markingScheme: 'standard',
    showAnswerKey: true,
    includeExplanations: false,
    institutionalBranding: false
  });

  const steps = [
    { id: 'subject', title: 'Subject Selection', description: 'Choose your subject area' },
    { id: 'difficulty', title: 'Difficulty Level', description: 'Set question complexity' },
    { id: 'topics', title: 'Topic Selection', description: 'Select specific topics' },
    { id: 'types', title: 'Question Types', description: 'Choose question formats' },
    { id: 'advanced', title: 'Advanced Options', description: 'Configure additional settings' },
    { id: 'preview', title: 'Preview & Generate', description: 'Review and create paper' }
  ];

  const canProceedToStep = (stepIndex) => {
    switch (stepIndex) {
      case 0: return true;
      case 1: return selectedSubject !== '';
      case 2: return selectedSubject !== '' && selectedDifficulty !== '';
      case 3: return selectedSubject !== '' && selectedDifficulty !== '' && selectedTopics?.length > 0;
      case 4: return selectedSubject !== '' && selectedDifficulty !== '' && selectedTopics?.length > 0 && selectedTypes?.length > 0;
      case 5: return selectedSubject !== '' && selectedDifficulty !== '' && selectedTopics?.length > 0 && selectedTypes?.length > 0;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps?.length - 1 && canProceedToStep(currentStep + 1)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex) => {
    if (canProceedToStep(stepIndex)) {
      setCurrentStep(stepIndex);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    setGenerationStep(0);

    // Simulate AI generation process
    const steps = [
      { duration: 2000, progress: 20 },
      { duration: 3000, progress: 50 },
      { duration: 2000, progress: 75 },
      { duration: 1500, progress: 90 },
      { duration: 1000, progress: 100 }
    ];

    for (let i = 0; i < steps?.length; i++) {
      setGenerationStep(i);
      await new Promise(resolve => setTimeout(resolve, steps[i].duration));
      setGenerationProgress(steps?.[i]?.progress);
    }

    setIsGenerating(false);
    // In a real app, this would navigate to the generated paper or download it
  };

  const handleRegenerate = () => {
    // Simulate regeneration of questions
    console.log('Regenerating questions...');
  };

  const handleExport = (format) => {
    console.log(`Exporting as ${format}...`);
    // In a real app, this would trigger the export functionality
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <SubjectSelector
            selectedSubject={selectedSubject}
            onSubjectChange={setSelectedSubject}
          />
        );
      case 1:
        return (
          <DifficultySelector
            selectedDifficulty={selectedDifficulty}
            onDifficultyChange={setSelectedDifficulty}
          />
        );
      case 2:
        return (
          <TopicSelector
            selectedSubject={selectedSubject}
            selectedTopics={selectedTopics}
            onTopicsChange={setSelectedTopics}
          />
        );
      case 3:
        return (
          <QuestionTypeSelector
            selectedTypes={selectedTypes}
            onTypesChange={setSelectedTypes}
            questionCounts={questionCounts}
            onCountChange={setQuestionCounts}
          />
        );
      case 4:
        return (
          <AdvancedOptions
            options={advancedOptions}
            onOptionsChange={setAdvancedOptions}
          />
        );
      case 5:
        return (
          <QuestionPreview
            selectedSubject={selectedSubject}
            selectedDifficulty={selectedDifficulty}
            selectedTopics={selectedTopics}
            selectedTypes={selectedTypes}
            questionCounts={questionCounts}
            options={advancedOptions}
            onRegenerate={handleRegenerate}
          />
        );
      default:
        return null;
    }
  };

  const getTotalQuestions = () => {
    return Object.values(questionCounts)?.reduce((sum, count) => sum + count, 0);
  };

  const getEstimatedTime = () => {
    const timePerType = {
      'multiple-choice': 2,
      'short-answer': 5,
      'essay': 15,
      'problem-solving': 10,
      'true-false': 1,
      'fill-blanks': 3
    };

    let totalMinutes = 0;
    selectedTypes?.forEach(type => {
      const count = questionCounts?.[type] || 0;
      totalMinutes += (timePerType?.[type] || 5) * count;
    });

    return totalMinutes;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <main className={`pt-14 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
              <button onClick={() => navigate('/dashboard')} className="hover:text-primary transition-colors">
                Dashboard
              </button>
              <Icon name="ChevronRight" size={16} />
              <span>Question Paper Generator</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-heading font-bold text-2xl text-foreground mb-2">
                  AI Question Paper Generator
                </h1>
                <p className="text-muted-foreground font-body">
                  Create customized assessments with AI-powered question generation
                </p>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                {selectedSubject && (
                  <>
                    <div className="flex items-center space-x-1">
                      <Icon name="BookOpen" size={16} />
                      <span className="capitalize">{selectedSubject}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Hash" size={16} />
                      <span>{getTotalQuestions()} questions</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={16} />
                      <span>{getEstimatedTime()} min</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Step Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-4 sticky top-20">
                <h3 className="font-heading font-semibold text-foreground mb-4">Progress</h3>
                <div className="space-y-2">
                  {steps?.map((step, index) => {
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;
                    const canAccess = canProceedToStep(index);

                    return (
                      <button
                        key={step?.id}
                        onClick={() => handleStepClick(index)}
                        disabled={!canAccess}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : isCompleted
                            ? 'bg-success/10 text-success hover:bg-success/20'
                            : canAccess
                            ? 'bg-muted hover:bg-muted/80 text-foreground'
                            : 'bg-muted/50 text-muted-foreground cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              isActive
                                ? 'bg-primary-foreground text-primary'
                                : isCompleted
                                ? 'bg-success text-success-foreground'
                                : 'bg-background text-muted-foreground'
                            }`}
                          >
                            {isCompleted ? (
                              <Icon name="Check" size={12} />
                            ) : (
                              index + 1
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-body font-medium text-sm truncate">{step?.title}</p>
                            <p className="text-xs opacity-80 truncate">{step?.description}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Summary */}
                {selectedSubject && (
                  <div className="mt-6 p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-body font-medium text-sm text-foreground mb-2">Configuration Summary</h4>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div>Subject: <span className="text-foreground capitalize">{selectedSubject}</span></div>
                      <div>Difficulty: <span className="text-foreground capitalize">{selectedDifficulty}</span></div>
                      <div>Topics: <span className="text-foreground">{selectedTopics?.length}</span></div>
                      <div>Question Types: <span className="text-foreground">{selectedTypes?.length}</span></div>
                      <div>Total Questions: <span className="text-foreground">{getTotalQuestions()}</span></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-card border border-border rounded-lg p-6 min-h-[600px]">
                {renderStepContent()}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    iconName="ChevronLeft"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Previous
                  </Button>

                  <div className="flex items-center space-x-2">
                    {currentStep === steps?.length - 1 ? (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => handleExport('pdf')}
                          iconName="Download"
                          iconPosition="left"
                          iconSize={16}
                        >
                          Export PDF
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleExport('docx')}
                          iconName="FileText"
                          iconPosition="left"
                          iconSize={16}
                        >
                          Export Word
                        </Button>
                        <Button
                          variant="default"
                          onClick={handleGenerate}
                          iconName="Zap"
                          iconPosition="left"
                          iconSize={16}
                          className="bg-gradient-to-r from-primary to-primary/80"
                        >
                          Generate Paper
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="default"
                        onClick={handleNext}
                        disabled={!canProceedToStep(currentStep + 1)}
                        iconName="ChevronRight"
                        iconPosition="right"
                        iconSize={16}
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Generation Progress Modal */}
      <GenerationProgress
        isGenerating={isGenerating}
        progress={generationProgress}
        currentStep={generationStep}
        totalSteps={5}
      />
    </div>
  );
};

export default QuestionPaperGenerator;