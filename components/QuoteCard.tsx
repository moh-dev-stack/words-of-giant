import React, { useState } from 'react';
import { Quote } from '../types';
import { Quote as QuoteIcon, Share2, Check, Copy } from 'lucide-react';

interface QuoteCardProps {
  quote: Quote;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote }) => {
  const [isCopied, setIsCopied] = useState(false);
  const shareText = `“${quote.text}” - ${quote.author}`;

  const canShare = typeof navigator !== 'undefined' && !!navigator.share;

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#quote-${quote.id}`;
    try {
      await navigator.share({
        title: `Quote by ${quote.author}`,
        text: shareText,
        url: shareUrl,
      });
    } catch (error) {
      console.log('Share was cancelled or failed', error);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy quote.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 hover:-rotate-1 transition-transform duration-300 ease-in-out border border-gray-200 dark:border-gray-700 hover:border-blue-500">
      <div className="p-6 h-full flex flex-col">
        <QuoteIcon className="w-8 h-8 text-blue-500/50 dark:text-blue-400/50 mb-4" />
        <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 flex-grow">
          “{quote.text}”
        </blockquote>
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          {canShare ? (
            <button
              onClick={handleShare}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-blue-500"
              aria-label="Share quote"
              title="Share quote"
            >
              <Share2 className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleCopy}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-blue-500"
              aria-label={isCopied ? "Copied to clipboard" : "Copy quote to clipboard"}
              title={isCopied ? "Copied!" : "Copy to clipboard"}
            >
              {isCopied ? (
                <Check className="w-5 h-5 text-green-500 dark:text-green-400" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          )}
          <p className="font-bold text-blue-600 dark:text-blue-400">{quote.author}</p>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;