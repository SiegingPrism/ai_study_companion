import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BookmarkManager = ({ bookmarks, onSearch, onFilter, onRemove, onExport }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedBookmarks, setSelectedBookmarks] = useState(new Set());

  const filterOptions = [
    { value: 'all', label: 'All Bookmarks', count: bookmarks?.length },
    { value: 'recent', label: 'Recent', count: bookmarks?.filter(b => b?.isRecent)?.length },
    { value: 'high-confidence', label: 'High Confidence', count: bookmarks?.filter(b => b?.confidenceScore >= 90)?.length },
    { value: 'academic', label: 'Academic', count: bookmarks?.filter(b => b?.category === 'academic')?.length }
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleFilter = (filter) => {
    setSelectedFilter(filter);
    onFilter?.(filter);
  };

  const toggleBookmarkSelection = (bookmarkId) => {
    const newSelected = new Set(selectedBookmarks);
    if (newSelected?.has(bookmarkId)) {
      newSelected?.delete(bookmarkId);
    } else {
      newSelected?.add(bookmarkId);
    }
    setSelectedBookmarks(newSelected);
  };

  const handleBulkAction = (action) => {
    const selectedIds = Array.from(selectedBookmarks);
    switch (action) {
      case 'export':
        onExport?.(selectedIds);
        break;
      case 'remove':
        selectedIds?.forEach(id => onRemove?.(id));
        setSelectedBookmarks(new Set());
        break;
    }
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!bookmarks || bookmarks?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <Icon name="Bookmark" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
          No Bookmarks Yet
        </h3>
        <p className="font-body text-muted-foreground">
          Start bookmarking your important summaries to access them quickly later.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
              Bookmarked Summaries
            </h3>
            <p className="font-body text-sm text-muted-foreground">
              {bookmarks?.length} saved summaries
            </p>
          </div>

          {selectedBookmarks?.size > 0 && (
            <div className="flex items-center space-x-2">
              <span className="font-body text-sm text-muted-foreground">
                {selectedBookmarks?.size} selected
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('export')}
                iconName="Download"
                iconPosition="left"
                iconSize={16}
              >
                Export
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleBulkAction('remove')}
                iconName="Trash2"
                iconPosition="left"
                iconSize={16}
              >
                Remove
              </Button>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="mt-4 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Search bookmarks..."
                value={searchQuery}
                onChange={(e) => handleSearch(e?.target?.value)}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {filterOptions?.map((option) => (
              <button
                key={option?.value}
                onClick={() => handleFilter(option?.value)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedFilter === option?.value
                    ? 'bg-primary text-white' :'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {option?.label} ({option?.count})
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Bookmarks List */}
      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {bookmarks?.map((bookmark) => (
          <div key={bookmark?.id} className="p-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-start space-x-4">
              {/* Checkbox */}
              <div className="pt-1">
                <input
                  type="checkbox"
                  checked={selectedBookmarks?.has(bookmark?.id)}
                  onChange={() => toggleBookmarkSelection(bookmark?.id)}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-body font-medium text-foreground mb-1">
                      {bookmark?.title}
                    </h4>
                    <p className="font-body text-sm text-muted-foreground line-clamp-2 mb-2">
                      {bookmark?.preview}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{formatDate(bookmark?.createdAt)}</span>
                      <span>•</span>
                      <span>{bookmark?.wordCount} words</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Icon name="Shield" size={12} />
                        <span>{bookmark?.confidenceScore}% confidence</span>
                      </div>
                    </div>

                    {/* Tags */}
                    {bookmark?.tags && bookmark?.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {bookmark?.tags?.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-1 ml-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Eye"
                      iconSize={16}
                      className="w-8 h-8"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Download"
                      iconSize={16}
                      className="w-8 h-8"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Share"
                      iconSize={16}
                      className="w-8 h-8"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemove?.(bookmark?.id)}
                      iconName="Trash2"
                      iconSize={16}
                      className="w-8 h-8 text-error hover:text-error"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/20">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Showing {bookmarks?.length} of {bookmarks?.length} bookmarks
          </span>
          <Button
            variant="ghost"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
            iconSize={16}
          >
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookmarkManager;