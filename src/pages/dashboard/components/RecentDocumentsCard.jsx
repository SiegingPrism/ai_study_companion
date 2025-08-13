import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentDocumentsCard = () => {
  const recentDocuments = [
    {
      id: 1,
      name: "Advanced Calculus Notes",
      type: "PDF",
      size: "2.4 MB",
      uploadedAt: "2 hours ago",
      thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop",
      progress: 75
    },
    {
      id: 2,
      name: "Physics Chapter 12",
      type: "DOCX",
      size: "1.8 MB",
      uploadedAt: "1 day ago",
      thumbnail: "https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?w=400&h=300&fit=crop",
      progress: 100
    },
    {
      id: 3,
      name: "Chemistry Lab Report",
      type: "PDF",
      size: "3.2 MB",
      uploadedAt: "3 days ago",
      thumbnail: "https://images.pixabay.com/photo/2017/09/07/08/54/money-2724241_1280.jpg?w=400&h=300&fit=crop",
      progress: 45
    }
  ];

  const getFileIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'pdf': return 'FileText';
      case 'docx': return 'FileType';
      case 'txt': return 'File';
      default: return 'File';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="FolderOpen" size={20} color="var(--color-primary)" />
          <h3 className="font-heading font-semibold text-lg text-foreground">Recent Documents</h3>
        </div>
        <Button variant="ghost" size="sm" iconName="Plus" iconPosition="left" iconSize={16}>
          Upload
        </Button>
      </div>
      {/* Documents List */}
      <div className="space-y-4">
        {recentDocuments?.map((doc) => (
          <div key={doc?.id} className="flex items-center space-x-4 p-3 hover:bg-muted rounded-lg transition-colors duration-200 group">
            {/* Thumbnail */}
            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <img 
                src={doc?.thumbnail} 
                alt={doc?.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="absolute inset-0 bg-muted flex items-center justify-center" style={{ display: 'none' }}>
                <Icon name={getFileIcon(doc?.type)} size={20} color="var(--color-muted-foreground)" />
              </div>
            </div>

            {/* Document Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-body font-medium text-sm text-foreground truncate">{doc?.name}</h4>
                <span className="font-body text-xs text-muted-foreground">{doc?.uploadedAt}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body text-xs text-muted-foreground">{doc?.type} • {doc?.size}</span>
                <div className="flex items-center space-x-1">
                  <div className="w-16 bg-muted rounded-full h-1">
                    <div 
                      className="bg-primary h-1 rounded-full transition-all duration-300"
                      style={{ width: `${doc?.progress}%` }}
                    ></div>
                  </div>
                  <span className="font-body text-xs text-muted-foreground">{doc?.progress}%</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button variant="ghost" size="icon" iconName="Eye" iconSize={14} />
              <Button variant="ghost" size="icon" iconName="Download" iconSize={14} />
              <Button variant="ghost" size="icon" iconName="MoreVertical" iconSize={14} />
            </div>
          </div>
        ))}
      </div>
      {/* View All */}
      <div className="mt-4 pt-4 border-t border-border">
        <Button variant="ghost" size="sm" fullWidth iconName="ArrowRight" iconPosition="right" iconSize={16}>
          View All Documents
        </Button>
      </div>
    </div>
  );
};

export default RecentDocumentsCard;