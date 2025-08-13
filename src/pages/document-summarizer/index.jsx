import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import UploadZone from './components/UploadZone';
import ProcessingStatus from './components/ProcessingStatus';
import SummaryResults from './components/SummaryResults';
import CitationGenerator from './components/CitationGenerator';
import BatchProcessor from './components/BatchProcessor';
import BookmarkManager from './components/BookmarkManager';

const DocumentSummarizer = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState('upload');
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentSummary, setCurrentSummary] = useState(null);
  const [bookmarkedSummaries, setBookmarkedSummaries] = useState([]);

  // Mock data for demonstration
  const mockSummary = {
    id: 'summary_001',
    title: "Advanced Machine Learning Concepts",
    originalLength: 15420,
    summaryLength: 2340,
    compressionRatio: 85,
    readingTime: 8,
    confidenceScore: 94,
    isBookmarked: false,
    executiveSummary: `This comprehensive document explores advanced machine learning concepts including deep neural networks, reinforcement learning, and natural language processing. The material covers theoretical foundations, practical implementations, and real-world applications across various industries. Key focus areas include algorithmic optimization, model evaluation techniques, and emerging trends in artificial intelligence research.`,
    keyPoints: [
      "Deep neural networks demonstrate superior performance in complex pattern recognition tasks compared to traditional machine learning algorithms",
      "Reinforcement learning enables autonomous systems to learn optimal decision-making strategies through trial-and-error interactions with environments",
      "Natural language processing has revolutionized human-computer interaction through advanced text analysis and generation capabilities",
      "Model evaluation requires comprehensive testing across diverse datasets to ensure generalization and prevent overfitting",
      "Emerging AI trends focus on explainable AI, federated learning, and quantum machine learning applications"
    ],
    mainThemes: [
      "Deep Learning",
      "Neural Networks", 
      "Reinforcement Learning",
      "NLP",
      "Model Optimization",
      "AI Ethics",
      "Quantum Computing"
    ],
    detailedSections: [
      {
        id: 'section_1',
        title: 'Neural Network Architectures',
        preview: 'Comprehensive analysis of various neural network designs and their applications...',
        content: `Neural network architectures have evolved significantly over the past decade, with convolutional neural networks (CNNs) leading breakthroughs in computer vision and recurrent neural networks (RNNs) advancing sequence modeling capabilities.\n\nThe introduction of transformer architectures has revolutionized natural language processing, enabling models like BERT and GPT to achieve unprecedented performance in text understanding and generation tasks.\n\nKey architectural innovations include:\n- Residual connections for training deeper networks\n- Attention mechanisms for improved context understanding\n- Batch normalization for training stability\n- Dropout techniques for regularization`,
        references: [
          'LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436-444.',
          'Vaswani, A., et al. (2017). Attention is all you need. Advances in neural information processing systems.'
        ]
      },
      {
        id: 'section_2',
        title: 'Reinforcement Learning Paradigms',
        preview: 'Exploration of different reinforcement learning approaches and their practical implementations...',
        content: `Reinforcement learning represents a paradigm where agents learn optimal behaviors through interaction with environments, receiving rewards or penalties based on their actions.\n\nMajor approaches include:\n- Q-learning for discrete action spaces\n- Policy gradient methods for continuous control\n- Actor-critic algorithms combining value and policy learning\n- Deep reinforcement learning for complex state spaces\n\nApplications span from game playing (AlphaGo, OpenAI Five) to robotics, autonomous vehicles, and resource management systems.`,
        references: [
          'Sutton, R. S., & Barto, A. G. (2018). Reinforcement learning: An introduction. MIT press.',
          'Mnih, V., et al. (2015). Human-level control through deep reinforcement learning. Nature.'
        ]
      }
    ]
  };

  const mockDocument = {
    title: "Advanced Machine Learning Concepts",
    author: "Dr. Sarah Johnson",
    year: 2024,
    publisher: "Academic Press",
    url: "https://example.com/ml-concepts.pdf"
  };

  const mockBookmarks = [
    {
      id: 'bookmark_1',
      title: 'Introduction to Quantum Computing',
      preview: 'Comprehensive overview of quantum computing principles, quantum gates, and potential applications in cryptography and optimization...',
      createdAt: new Date(Date.now() - 86400000 * 2),
      wordCount: 1850,
      confidenceScore: 92,
      category: 'academic',
      isRecent: true,
      tags: ['Quantum Computing', 'Physics', 'Technology']
    },
    {
      id: 'bookmark_2', 
      title: 'Climate Change Impact Analysis',
      preview: 'Detailed analysis of climate change effects on global ecosystems, economic implications, and mitigation strategies...',
      createdAt: new Date(Date.now() - 86400000 * 5),
      wordCount: 2340,
      confidenceScore: 88,
      category: 'academic',
      isRecent: false,
      tags: ['Climate Change', 'Environment', 'Policy']
    },
    {
      id: 'bookmark_3',
      title: 'Modern Web Development Practices',
      preview: 'Best practices for modern web development including React patterns, performance optimization, and security considerations...',
      createdAt: new Date(Date.now() - 86400000 * 7),
      wordCount: 1920,
      confidenceScore: 95,
      category: 'technical',
      isRecent: false,
      tags: ['Web Development', 'React', 'JavaScript']
    }
  ];

  const tabs = [
    { id: 'upload', label: 'Upload & Process', icon: 'Upload' },
    { id: 'batch', label: 'Batch Processing', icon: 'Layers' },
    { id: 'bookmarks', label: 'Bookmarks', icon: 'Bookmark' },
    { id: 'citations', label: 'Citations', icon: 'Quote' }
  ];

  useEffect(() => {
    setBookmarkedSummaries(mockBookmarks);
  }, []);

  const handleFileUpload = (files) => {
    const processedFiles = files?.map((file, index) => ({
      ...file,
      id: `file_${Date.now()}_${index}`,
      status: 'pending',
      progress: 0,
      pages: Math.floor(Math.random() * 50) + 10
    }));

    setUploadedFiles(prev => [...prev, ...processedFiles]);
    
    // Start processing simulation
    setIsProcessing(true);
    setProcessingProgress(0);
    setCurrentStage('upload');
    setEstimatedTime(45);
    
    simulateProcessing();
  };

  const simulateProcessing = () => {
    const stages = ['upload', 'analysis', 'extraction', 'summarization', 'formatting'];
    let currentStageIndex = 0;
    let progress = 0;
    
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      
      if (progress >= 100) {
        progress = 100;
        setIsProcessing(false);
        setCurrentSummary(mockSummary);
        setActiveTab('upload');
        clearInterval(interval);
      } else {
        const stageIndex = Math.floor((progress / 100) * stages?.length);
        setCurrentStage(stages?.[Math.min(stageIndex, stages?.length - 1)]);
        setEstimatedTime(Math.max(5, Math.floor((100 - progress) / 2)));
      }
      
      setProcessingProgress(Math.min(progress, 100));
    }, 800);
  };

  const handleExportSummary = (summary) => {
    console.log('Exporting summary:', summary?.title);
    // Implementation for export functionality
  };

  const handleCreateFlashcards = (summary) => {
    console.log('Creating flashcards from:', summary?.title);
    // Implementation for flashcard creation
  };

  const handleBookmarkSummary = (summaryId) => {
    setCurrentSummary(prev => ({
      ...prev,
      isBookmarked: !prev?.isBookmarked
    }));
    
    if (!currentSummary?.isBookmarked) {
      const newBookmark = {
        id: `bookmark_${Date.now()}`,
        title: currentSummary?.title,
        preview: currentSummary?.executiveSummary?.substring(0, 150) + '...',
        createdAt: new Date(),
        wordCount: currentSummary?.summaryLength,
        confidenceScore: currentSummary?.confidenceScore,
        category: 'academic',
        isRecent: true,
        tags: currentSummary?.mainThemes?.slice(0, 3)
      };
      
      setBookmarkedSummaries(prev => [newBookmark, ...prev]);
    }
  };

  const handleRemoveFile = (index) => {
    setUploadedFiles(prev => prev?.filter((_, i) => i !== index));
  };

  const handleProcessAllFiles = () => {
    setUploadedFiles(prev => 
      prev?.map(file => ({ ...file, status: 'processing', progress: 0 }))
    );
    
    // Simulate batch processing
    setTimeout(() => {
      setUploadedFiles(prev => 
        prev?.map(file => ({ ...file, status: 'completed', progress: 100 }))
      );
    }, 3000);
  };

  const handleClearAllFiles = () => {
    setUploadedFiles([]);
  };

  const handleRemoveBookmark = (bookmarkId) => {
    setBookmarkedSummaries(prev => prev?.filter(b => b?.id !== bookmarkId));
  };

  const handleSearchBookmarks = (query) => {
    console.log('Searching bookmarks:', query);
    // Implementation for bookmark search
  };

  const handleFilterBookmarks = (filter) => {
    console.log('Filtering bookmarks:', filter);
    // Implementation for bookmark filtering
  };

  const handleExportBookmarks = (bookmarkIds) => {
    console.log('Exporting bookmarks:', bookmarkIds);
    // Implementation for bookmark export
  };

  const handleCopyCitation = (citation, style) => {
    console.log(`Copied ${style} citation:`, citation);
    // Implementation for citation copy
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main className={`pt-14 transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="BookOpen" size={24} color="white" />
              </div>
              <div>
                <h1 className="font-heading font-bold text-2xl text-foreground">
                  Document Summarizer
                </h1>
                <p className="font-body text-muted-foreground">
                  Transform lengthy documents into concise, actionable study content with AI
                </p>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2">
              {tabs?.map((tab) => (
                <Button
                  key={tab?.id}
                  variant={activeTab === tab?.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab(tab?.id)}
                  iconName={tab?.icon}
                  iconPosition="left"
                  iconSize={16}
                  className="transition-smooth"
                >
                  {tab?.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="space-y-6">
            {activeTab === 'upload' && (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 space-y-6">
                  <UploadZone 
                    onFileUpload={handleFileUpload}
                    isProcessing={isProcessing}
                  />
                  
                  {isProcessing && (
                    <ProcessingStatus
                      isProcessing={isProcessing}
                      progress={processingProgress}
                      currentStage={currentStage}
                      estimatedTime={estimatedTime}
                    />
                  )}
                  
                  {currentSummary && !isProcessing && (
                    <SummaryResults
                      summary={currentSummary}
                      onExport={handleExportSummary}
                      onCreateFlashcards={handleCreateFlashcards}
                      onBookmark={handleBookmarkSummary}
                    />
                  )}
                </div>

                <div className="space-y-6">
                  {/* Quick Stats */}
                  <div className="bg-card rounded-lg border border-border p-6">
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                      Quick Stats
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-body text-sm text-muted-foreground">Documents Processed</span>
                        <span className="font-body font-semibold text-foreground">247</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-body text-sm text-muted-foreground">Total Words Summarized</span>
                        <span className="font-body font-semibold text-foreground">1.2M</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-body text-sm text-muted-foreground">Time Saved</span>
                        <span className="font-body font-semibold text-foreground">156 hours</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-body text-sm text-muted-foreground">Avg. Confidence</span>
                        <span className="font-body font-semibold text-foreground">92%</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-card rounded-lg border border-border p-6">
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                      Recent Activity
                    </h3>
                    <div className="space-y-3">
                      {[
                        { action: 'Summarized', document: 'Research Paper on AI Ethics', time: '2 hours ago' },
                        { action: 'Bookmarked', document: 'Climate Change Report', time: '5 hours ago' },
                        { action: 'Exported', document: 'Marketing Strategy Guide', time: '1 day ago' }
                      ]?.map((activity, index) => (
                        <div key={index} className="flex items-center space-x-3 p-2 hover:bg-muted rounded-lg transition-colors">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <div className="flex-1 min-w-0">
                            <p className="font-body text-sm text-foreground">
                              <span className="font-medium">{activity?.action}</span> {activity?.document}
                            </p>
                            <p className="font-body text-xs text-muted-foreground">{activity?.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'batch' && (
              <BatchProcessor
                files={uploadedFiles}
                onRemoveFile={handleRemoveFile}
                onProcessAll={handleProcessAllFiles}
                onClearAll={handleClearAllFiles}
              />
            )}

            {activeTab === 'bookmarks' && (
              <BookmarkManager
                bookmarks={bookmarkedSummaries}
                onSearch={handleSearchBookmarks}
                onFilter={handleFilterBookmarks}
                onRemove={handleRemoveBookmark}
                onExport={handleExportBookmarks}
              />
            )}

            {activeTab === 'citations' && (
              <CitationGenerator
                document={mockDocument}
                onCopy={handleCopyCitation}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DocumentSummarizer;