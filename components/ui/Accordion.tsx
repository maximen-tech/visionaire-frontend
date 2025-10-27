"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface AccordionItemProps {
  question: string;
  answer: string;
}

export interface AccordionProps {
  items: AccordionItemProps[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ items, className }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleItem(index);
    } else if (event.key === 'Escape') {
      setExpandedIndex(null);
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggleItem(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            aria-expanded={expandedIndex === index}
            aria-controls={`accordion-content-${index}`}
            className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex justify-between items-center focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            <span className="font-semibold text-gray-900 pr-4">{item.question}</span>
            <span
              className="text-2xl text-blue-600 flex-shrink-0"
              aria-hidden="true"
            >
              {expandedIndex === index ? '−' : '+'}
            </span>
          </button>
          {expandedIndex === index && (
            <div
              id={`accordion-content-${index}`}
              className="px-6 py-4 bg-gray-50 text-gray-600 leading-relaxed"
              role="region"
              aria-labelledby={`accordion-button-${index}`}
            >
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

Accordion.displayName = 'Accordion';
