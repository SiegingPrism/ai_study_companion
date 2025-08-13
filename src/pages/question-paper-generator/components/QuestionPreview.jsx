import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuestionPreview = ({ 
  selectedSubject, 
  selectedDifficulty, 
  selectedTopics, 
  selectedTypes, 
  questionCounts, 
  options,
  onRegenerate 
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  // Mock generated questions based on selections
  const generateMockQuestions = () => {
    const questions = [];
    let questionId = 1;

    selectedTypes?.forEach(type => {
      const count = questionCounts?.[type] || 0;
      for (let i = 0; i < count; i++) {
        questions?.push(generateQuestionByType(type, questionId++));
      }
    });

    return questions;
  };

  const generateQuestionByType = (type, id) => {
    const baseQuestions = {
      'multiple-choice': {
        question: `Which of the following best describes the concept of ${selectedTopics?.[0] || 'algebra'} in ${selectedSubject}?`,
        options: [
          'A mathematical system dealing with symbols and rules',
          'A branch of geometry focusing on shapes',
          'A statistical method for data analysis',
          'A physics principle related to motion'
        ],
        correctAnswer: 0,
        explanation: 'Algebra is fundamentally a mathematical system that uses symbols to represent numbers and express mathematical relationships.',
        marks: 2,
        timeAllotted: '2 min'
      },
      'short-answer': {
        question: `Explain the importance of ${selectedTopics?.[0] || 'basic concepts'} in ${selectedSubject}. (50 words)`,
        sampleAnswer: `${selectedTopics?.[0] || 'Basic concepts'} form the foundation of ${selectedSubject} by providing essential principles that enable students to understand more complex topics. They serve as building blocks for advanced learning and practical applications in real-world scenarios.`,
        marks: 5,
        timeAllotted: '5 min'
      },
      'essay': {
        question: `Discuss the role and applications of ${selectedTopics?.[0] || 'fundamental principles'} in modern ${selectedSubject}. Support your answer with relevant examples and explain how these concepts have evolved over time.`,
        keyPoints: [
          'Historical development and evolution',
          'Modern applications and relevance',
          'Real-world examples and case studies',
          'Future implications and trends'
        ],
        marks: 15,
        timeAllotted: '15 min'
      },
      'problem-solving': {
        question: `Solve the following problem related to ${selectedTopics?.[0] || 'calculations'}: If x + 2y = 10 and 3x - y = 5, find the values of x and y.`,
        solution: [
          'Step 1: From equation 1: x = 10 - 2y',
          'Step 2: Substitute in equation 2: 3(10 - 2y) - y = 5',
          'Step 3: Simplify: 30 - 6y - y = 5',
          'Step 4: Combine: 30 - 7y = 5',
          'Step 5: Solve: y = 25/7',
          'Step 6: Find x: x = 10 - 2(25/7) = 20/7'
        ],
        marks: 8,
        timeAllotted: '10 min'
      },
      'true-false': {
        question: `The fundamental theorem of ${selectedTopics?.[0] || 'algebra'} states that every polynomial equation has at least one complex root.`,
        answer: true,
        explanation: 'This is a correct statement of the Fundamental Theorem of Algebra, proven by Carl Friedrich Gauss.',
        marks: 1,
        timeAllotted: '1 min'
      },
      'fill-blanks': {
        question: `The formula for the area of a circle is _______, where r represents the _______ of the circle.`,
        answers: ['πr²', 'radius'],
        marks: 2,
        timeAllotted: '3 min'
      }
    };

    return {
      id,
      type,
      difficulty: selectedDifficulty,
      subject: selectedSubject,
      topic: selectedTopics?.[0] || 'General',
      ...baseQuestions?.[type]
    };
  };

  const questions = generateMockQuestions();
  const currentQuestion = questions?.[currentQuestionIndex];

  const renderQuestion = (question) => {
    switch (question?.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-4">
            <p className="font-body text-foreground leading-relaxed">{question?.question}</p>
            <div className="space-y-2">
              {question?.options?.map((option, index) => (
                <div
                  key={index}
                  className={`p-3 border rounded-lg transition-colors ${
                    showAnswers && index === question?.correctAnswer
                      ? 'border-success bg-success/10 text-success' :'border-border bg-card hover:bg-muted/50'
                  }`}
                >
                  <span className="font-body">{option}</span>
                </div>
              ))}
            </div>
            {showAnswers && question?.explanation && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-body text-blue-800">
                  <strong>Explanation:</strong> {question?.explanation}
                </p>
              </div>
            )}
          </div>
        );

      case 'short-answer':
        return (
          <div className="space-y-4">
            <p className="font-body text-foreground leading-relaxed">{question?.question}</p>
            <div className="border border-border rounded-lg p-4 bg-muted/30 min-h-[100px]">
              <p className="text-sm text-muted-foreground mb-2">Answer space:</p>
              <div className="space-y-2">
                {[...Array(3)]?.map((_, i) => (
                  <div key={i} className="border-b border-border/50 h-6"></div>
                ))}
              </div>
            </div>
            {showAnswers && question?.sampleAnswer && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-body text-green-800">
                  <strong>Sample Answer:</strong> {question?.sampleAnswer}
                </p>
              </div>
            )}
          </div>
        );

      case 'essay':
        return (
          <div className="space-y-4">
            <p className="font-body text-foreground leading-relaxed">{question?.question}</p>
            <div className="border border-border rounded-lg p-4 bg-muted/30 min-h-[200px]">
              <p className="text-sm text-muted-foreground mb-2">Essay answer space:</p>
              <div className="space-y-3">
                {[...Array(8)]?.map((_, i) => (
                  <div key={i} className="border-b border-border/50 h-6"></div>
                ))}
              </div>
            </div>
            {showAnswers && question?.keyPoints && (
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-sm font-body text-purple-800 mb-2">
                  <strong>Key Points to Cover:</strong>
                </p>
                <ul className="text-sm text-purple-700 space-y-1">
                  {question?.keyPoints?.map((point, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span>•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      case 'problem-solving':
        return (
          <div className="space-y-4">
            <p className="font-body text-foreground leading-relaxed">{question?.question}</p>
            <div className="border border-border rounded-lg p-4 bg-muted/30 min-h-[150px]">
              <p className="text-sm text-muted-foreground mb-2">Solution space:</p>
              <div className="space-y-2">
                {[...Array(6)]?.map((_, i) => (
                  <div key={i} className="border-b border-border/50 h-6"></div>
                ))}
              </div>
            </div>
            {showAnswers && question?.solution && (
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm font-body text-orange-800 mb-2">
                  <strong>Solution:</strong>
                </p>
                <div className="text-sm text-orange-700 space-y-1">
                  {question?.solution?.map((step, index) => (
                    <div key={index}>{step}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'true-false':
        return (
          <div className="space-y-4">
            <p className="font-body text-foreground leading-relaxed">{question?.question}</p>
            <div className="flex space-x-4">
              <div className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                showAnswers && question?.answer === true
                  ? 'border-success bg-success/10 text-success' :'border-border bg-card hover:bg-muted/50'
              }`}>
                <span className="font-body">True</span>
              </div>
              <div className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                showAnswers && question?.answer === false
                  ? 'border-success bg-success/10 text-success' :'border-border bg-card hover:bg-muted/50'
              }`}>
                <span className="font-body">False</span>
              </div>
            </div>
            {showAnswers && question?.explanation && (
              <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg">
                <p className="text-sm font-body text-teal-800">
                  <strong>Explanation:</strong> {question?.explanation}
                </p>
              </div>
            )}
          </div>
        );

      case 'fill-blanks':
        return (
          <div className="space-y-4">
            <p className="font-body text-foreground leading-relaxed">
              {question?.question?.split('_______')?.map((part, index, array) => (
                <span key={index}>
                  {part}
                  {index < array?.length - 1 && (
                    <span className={`inline-block w-20 border-b-2 mx-1 ${
                      showAnswers ? 'border-success' : 'border-border'
                    }`}>
                      {showAnswers && question?.answers?.[index] && (
                        <span className="text-success font-medium">
                          {question?.answers?.[index]}
                        </span>
                      )}
                    </span>
                  )}
                </span>
              ))}
            </p>
          </div>
        );

      default:
        return <p className="text-muted-foreground">Question type not supported in preview.</p>;
    }
  };

  if (questions?.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="FileQuestion" size={64} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">No Questions to Preview</h3>
        <p className="text-muted-foreground font-body mb-4">
          Complete the configuration to see a preview of your question paper.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-lg text-foreground">Question Preview</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAnswers(!showAnswers)}
            iconName={showAnswers ? "EyeOff" : "Eye"}
            iconPosition="left"
            iconSize={16}
          >
            {showAnswers ? 'Hide' : 'Show'} Answers
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onRegenerate}
            iconName="RefreshCw"
            iconPosition="left"
            iconSize={16}
          >
            Regenerate
          </Button>
        </div>
      </div>
      {/* Question Paper Header */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center mb-6">
          <h2 className="font-heading font-bold text-xl text-foreground mb-2">
            {selectedSubject?.charAt(0)?.toUpperCase() + selectedSubject?.slice(1)} Question Paper
          </h2>
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <span>Time: {options?.timeLimit || 60} minutes</span>
            <span>Total Questions: {questions?.length}</span>
            <span>Difficulty: {selectedDifficulty?.charAt(0)?.toUpperCase() + selectedDifficulty?.slice(1)}</span>
          </div>
        </div>

        {/* Question Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-body text-muted-foreground">Question:</span>
            <div className="flex items-center space-x-1">
              {questions?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-8 h-8 rounded text-xs font-body transition-colors ${
                    index === currentQuestionIndex
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              iconName="ChevronLeft"
              iconSize={16}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentQuestionIndex(Math.min(questions?.length - 1, currentQuestionIndex + 1))}
              disabled={currentQuestionIndex === questions?.length - 1}
              iconName="ChevronRight"
              iconSize={16}
            />
          </div>
        </div>

        {/* Current Question */}
        {currentQuestion && (
          <div className="border border-border rounded-lg p-6 bg-background">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <span className="font-heading font-semibold text-foreground">
                  Question {currentQuestionIndex + 1}
                </span>
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-body">
                  {currentQuestion?.type?.replace('-', ' ')?.toUpperCase()}
                </span>
                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-body">
                  {currentQuestion?.topic}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>Marks: {currentQuestion?.marks}</span>
                <span>Time: {currentQuestion?.timeAllotted}</span>
              </div>
            </div>
            {renderQuestion(currentQuestion)}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionPreview;