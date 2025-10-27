import React, { useState, useEffect, useMemo } from 'react';
import { QUOTES } from './constants';
import { Quote } from './types';
import QuoteCard from './components/QuoteCard';
import AuthorFilter from './components/AuthorFilter';
import QuoteOfTheDay from './components/QuoteOfTheDay';
import ThemeToggle from './components/ThemeToggle';
import ScrollToTopButton from './components/ScrollToTopButton';
import { BookOpen, Code } from 'lucide-react';

const App: React.FC = () => {
  const [selectedAuthor, setSelectedAuthor] = useState<string>('All');
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>(QUOTES);
  const [quoteOfTheDay, setQuoteOfTheDay] = useState<Quote | null>(null);
  
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme) {
        return storedTheme;
      }
      // Default to user's system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark'; // Default theme
  });

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const authors = useMemo(() => {
    const uniqueAuthors = [...new Set(QUOTES.map(q => q.author))];
    return ['All', ...uniqueAuthors.sort()];
  }, []);
  
  useEffect(() => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    const quoteIndex = dayOfYear % QUOTES.length;
    setQuoteOfTheDay(QUOTES[quoteIndex]);
  }, []);

  const highlightQuote = (quoteId: string) => {
    const element = document.getElementById(quoteId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const cardElement = element.querySelector(':first-child');
      if (cardElement) {
          cardElement.classList.add('ring-4', 'ring-blue-500', 'shadow-2xl');
          setTimeout(() => {
              cardElement.classList.remove('ring-4', 'ring-blue-500', 'shadow-2xl');
          }, 3000);
      }
    }
  };

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => highlightQuote(id), 100);
    }
  }, []);

  useEffect(() => {
    if (selectedAuthor === 'All') {
      setFilteredQuotes(QUOTES);
    } else {
      setFilteredQuotes(QUOTES.filter(quote => quote.author === selectedAuthor));
    }
  }, [selectedAuthor]);

  const handleRandomQuote = () => {
    // Ensure all quotes are visible before selecting one
    if (selectedAuthor !== 'All') {
      setSelectedAuthor('All');
    }

    const randomIndex = Math.floor(Math.random() * QUOTES.length);
    const randomQuote = QUOTES[randomIndex];
    
    // Use a timeout to allow the filter to reset and the DOM to update
    setTimeout(() => {
      highlightQuote(`quote-${randomQuote.id}`);
    }, 100);
  };
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <header className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg sticky top-0 z-10 p-4 border-b border-gray-200 dark:border-blue-400/20">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-10 h-10 text-blue-500 dark:text-blue-400" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Words of Giants</h1>
          </div>
          <div className="flex items-center gap-4">
            <p className="hidden sm:block text-sm text-gray-600 dark:text-gray-400">Authentic Quotes from Scientists & Mathematicians</p>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4 md:p-8">
        {quoteOfTheDay && <QuoteOfTheDay quote={quoteOfTheDay} />}

        <div className="my-8">
          <AuthorFilter 
            authors={authors}
            selectedAuthor={selectedAuthor}
            onSelectAuthor={setSelectedAuthor}
            onRandomQuote={handleRandomQuote}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuotes.map((quote) => (
            <div id={`quote-${quote.id}`} key={quote.id}>
              <QuoteCard quote={quote} />
            </div>
          ))}
        </div>
        {filteredQuotes.length === 0 && (
            <div className="col-span-full text-center py-16">
                <p className="text-gray-600 dark:text-gray-500">No quotes found for the selected author.</p>
            </div>
        )}
      </main>

      <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-blue-400/20 mt-12 py-6 transition-colors duration-300">
        <div className="container mx-auto text-center text-gray-600 dark:text-gray-500 text-sm">
          <p>Crafted with <Code className="inline-block w-4 h-4 mx-1" /> by a World-Class Frontend Engineer</p>
          <p>&copy; {new Date().getFullYear()} Words of Giants. All rights reserved.</p>
        </div>
      </footer>

      <ScrollToTopButton />
    </div>
  );
};

export default App;