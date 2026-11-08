import React, { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, MessageSquareCode } from 'lucide-react';

export default function TestimonialsSection({ testimonials = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex] || testimonials[0];

  return (
    <section id="testimonials" className="py-24 relative border-t border-slate-200 dark:border-slate-800/60 bg-white dark:bg-[#070A13] transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-purple-100 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30 text-purple-700 dark:text-purple-400">
            <MessageSquareCode className="w-3.5 h-3.5" />
            <span>Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-slate-900 dark:text-white">
            Client & Peer Testimonials
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl text-sm sm:text-base">
            Feedback from technology executives, engineering directors, and collaborative project founders.
          </p>
        </div>

        {/* Carousel Card */}
        <div className="relative rounded-3xl bg-slate-50 dark:bg-[#111C30] border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-sm">
          <div className="absolute top-6 right-8 opacity-20 pointer-events-none">
            <Quote className="w-20 h-20 text-purple-500" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border-2 border-purple-400/40 shadow-md bg-slate-200 dark:bg-slate-900">
              <img
                src={current.image}
                alt={current.clientName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Testimonial Quote & Info */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 italic leading-relaxed">
                "{current.message}"
              </p>

              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                  {current.clientName}
                </h4>
                <p className="text-xs font-mono text-purple-600 dark:text-cyan-400 font-medium">
                  {current.position} · {current.company}
                </p>
                {current.projectReference && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Project Reference: <span className="text-purple-600 dark:text-purple-300 font-medium">{current.projectReference}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? 'w-6 bg-purple-600 dark:bg-cyan-400' : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-500'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrow Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer shadow-xs"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer shadow-xs"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
