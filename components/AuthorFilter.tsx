import React, { useState } from 'react';
import { Search, Shuffle } from 'lucide-react';

interface AuthorFilterProps {
  authors: string[];
  selectedAuthor: string;
  onSelectAuthor: (author: string) => void;
  onRandomQuote: () => void;
}

const AuthorFilter: React.FC<AuthorFilterProps> = ({ authors, selectedAuthor, onSelectAuthor, onRandomQuote }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAuthors = authors.filter(author =>
    author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4 p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search authors..."
            className="w-full bg-gray-200/50 dark:bg-gray-700/50 text-gray-900 dark:text-white rounded-md pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            aria-label="Search authors"
          />
        </div>
        <button
          onClick={onRandomQuote}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 focus:ring-blue-500 transition-all duration-200 ease-in-out shadow-lg hover:shadow-xl transform hover:scale-105"
          aria-label="Get a random quote"
        >
          <Shuffle className="w-5 h-5" />
          Random Quote
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {filteredAuthors.map(author => (
          <button
            key={author}
            onClick={() => onSelectAuthor(author)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 focus:ring-blue-500 ${
              selectedAuthor === author 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
            }`}
          >
            {author}
          </button>
        ))}
        {filteredAuthors.length === 0 && searchQuery.length > 0 && (
            <p className="text-gray-500 w-full text-center">No authors found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default AuthorFilter;