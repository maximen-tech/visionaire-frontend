'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS, type Testimonial } from '@/data/testimonials';

interface TestimonialsCarouselProps {
  autoPlayInterval?: number; // milliseconds, default 5000
  pauseOnHover?: boolean;
}

export default function TestimonialsCarousel({
  autoPlayInterval = 5000,
  pauseOnHover = true,
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isPaused, goToNext, autoPlayInterval]);

  const currentTestimonial = TESTIMONIALS[currentIndex];

  return (
    <div
      className="relative w-full max-w-4xl mx-auto px-4 py-8"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {/* Main Testimonial Card */}
      <div className="relative min-h-[300px] bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative z-10"
          >
            {/* Quote */}
            <div className="mb-6">
              <svg
                className="w-12 h-12 text-cyan-500/30 mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-lg md:text-xl text-slate-200 leading-relaxed">
                "{currentTestimonial.quote}"
              </p>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {currentTestimonial.avatar}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-white font-semibold">{currentTestimonial.name}</h4>
                  {currentTestimonial.verified && (
                    <CheckCircle2 className="w-5 h-5 text-cyan-500" aria-label="Témoignage vérifié" />
                  )}
                </div>
                <p className="text-slate-400 text-sm">
                  {currentTestimonial.role} · {currentTestimonial.company}
                </p>
                <p className="text-cyan-400 text-sm font-medium mt-1">
                  ✓ {currentTestimonial.hours_saved}h/semaine économisées
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
          <button
            onClick={goToPrev}
            className="pointer-events-auto w-10 h-10 rounded-full bg-slate-700/80 hover:bg-slate-600 flex items-center justify-center text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="pointer-events-auto w-10 h-10 rounded-full bg-slate-700/80 hover:bg-slate-600 flex items-center justify-center text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mt-6">
        {TESTIMONIALS.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
              index === currentIndex
                ? 'bg-cyan-500 w-8'
                : 'bg-slate-600 hover:bg-slate-500'
            }`}
            aria-label={`Aller au témoignage ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
