import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const SubjectSelector = ({ selectedSubject, onSubjectChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const subjects = [
    {
      id: 'mathematics',
      name: 'Mathematics',
      icon: 'Calculator',
      description: 'Algebra, Calculus, Geometry, Statistics',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      id: 'physics',
      name: 'Physics',
      icon: 'Atom',
      description: 'Mechanics, Thermodynamics, Electromagnetism',
      color: 'bg-purple-100 text-purple-700'
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      icon: 'FlaskConical',
      description: 'Organic, Inorganic, Physical Chemistry',
      color: 'bg-green-100 text-green-700'
    },
    {
      id: 'biology',
      name: 'Biology',
      icon: 'Dna',
      description: 'Cell Biology, Genetics, Ecology',
      color: 'bg-emerald-100 text-emerald-700'
    },
    {
      id: 'english',
      name: 'English Literature',
      icon: 'BookOpen',
      description: 'Poetry, Prose, Grammar, Composition',
      color: 'bg-amber-100 text-amber-700'
    },
    {
      id: 'history',
      name: 'History',
      icon: 'Scroll',
      description: 'World History, Ancient Civilizations',
      color: 'bg-orange-100 text-orange-700'
    },
    {
      id: 'geography',
      name: 'Geography',
      icon: 'Globe',
      description: 'Physical, Human, Environmental Geography',
      color: 'bg-teal-100 text-teal-700'
    },
    {
      id: 'computer-science',
      name: 'Computer Science',
      icon: 'Code',
      description: 'Programming, Data Structures, Algorithms',
      color: 'bg-indigo-100 text-indigo-700'
    }
  ];

  const filteredSubjects = subjects?.filter(subject =>
    subject?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    subject?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-lg text-foreground">Select Subject</h3>
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="pl-9 pr-4 py-2 w-64 bg-input border border-border rounded-lg text-sm font-body text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSubjects?.map((subject) => (
          <div
            key={subject?.id}
            onClick={() => onSubjectChange(subject?.id)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:elevation-1 ${
              selectedSubject === subject?.id
                ? 'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${subject?.color}`}>
                <Icon name={subject?.icon} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-body font-medium text-foreground mb-1">{subject?.name}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">{subject?.description}</p>
              </div>
              {selectedSubject === subject?.id && (
                <Icon name="Check" size={20} className="text-primary flex-shrink-0" />
              )}
            </div>
          </div>
        ))}
      </div>
      {filteredSubjects?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground font-body">No subjects found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default SubjectSelector;