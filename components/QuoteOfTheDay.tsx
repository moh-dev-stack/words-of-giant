import React from 'react';
import { Quote } from '../types';
import { Star, Quote as QuoteIcon } from 'lucide-react';

interface QuoteOfTheDayProps {
  quote: Quote;
}

const QuoteOfTheDay: React.FC<QuoteOfTheDayProps> = ({ quote }) => {
  return (
    <div className="mb-12 p-6 md:p-8 bg-gradient-to-br from-gray-100 to-blue-200/40 dark:from-gray-800 dark:to-blue-900/40 rounded-xl shadow-2xl border-2 border-blue-300/50 dark:border-blue-400/50 relative overflow-hidden">
      <div className="absolute top-4 right-4 flex items-center space-x-2 text-yellow-600 dark:text-yellow-300 opacity-80">
        <Star className="w-5 h-5" />
        <h2 className="text-sm font-bold tracking-wider uppercase">Quote of the Day</h2>
      </div>
      
      <div className="absolute -bottom-8 -left-8 w-32 h-32 text-blue-500/10">
        <QuoteIcon className="w-full h-full" strokeWidth={1} />
      </div>
      
      <div className="relative z-10">
        <blockquote className="text-xl md:text-2xl italic text-gray-800 dark:text-white font-serif my-6 text-center leading-relaxed">
          “{quote.text}”
        </blockquote>
        <p className="text-right text-lg font-semibold text-blue-600 dark:text-blue-300 mt-4 pr-4">
          — {quote.author}
        </p>
      </div>
    </div>
  );
};

export default QuoteOfTheDay;