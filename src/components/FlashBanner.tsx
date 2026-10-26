import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, ArrowRight, Sparkles, Tag, ChevronRight, ChevronLeft, ShieldCheck, Sun, Clock } from 'lucide-react';

interface FlashBannerProps {
  onOpenCalculator: () => void;
  onOpenQuote: () => void;
}

export const FlashBanner: React.FC<FlashBannerProps> = ({
  onOpenCalculator,
  onOpenQuote,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [copied, setCopied] = useState(false);

  const slides = [
    {
      badge: 'SPRING CLEAN ENERGY FLASH EVENT',
      title: 'Free Net-Metering Approval + Rs 25,000 Inverter Upgrade Credit',
      desc: 'Order any 6kW or 10kW Hybrid System this week and get complete DISCO bi-directional net-metering processing free.',
      ctaText: 'Calculate Sizing & Savings',
      action: 'calculator',
      code: 'SOLAR5',
    },
    {
      badge: 'ZERO-DOWN SOLAR FINANCING',
      title: 'Cut Electricity Tariffs by 90% With Flexible 3-Year Installments',
      desc: 'Partnered with top Islamic & Green Energy banking channels. Repay from your monthly utility savings.',
      ctaText: 'Check Eligibility',
      action: 'quote',
      code: 'GREEN2026',
    },
    {
      badge: 'LITHIUM STORAGE PROMOTION',
      title: '10-Year Warranty & Free Smart Wi-Fi Telemetry Stick With Every LiFePO4',
      desc: 'Say goodbye to load-shedding permanently with 6,000+ deep cycles and 0ms instantaneous UPS auto-bypass.',
      ctaText: 'View Lithium Storage',
      action: 'calculator',
      code: 'LITHIUM10',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full bg-gradient-to-r from-emerald-50 via-amber-50/60 to-emerald-50/80 border-b border-emerald-200/90 text-slate-800 shadow-xs relative overflow-hidden">
      {/* Decorative subtle sunbeam pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="#10b981" strokeWidth="0.8" strokeDasharray="6 8" />
          <line x1="100%" y1="0" x2="0" y2="100%" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="6 8" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Left / Center content with animated slide */}
          <div className="flex-1 flex items-center gap-3.5 min-w-0">
            <div className="hidden sm:flex w-10 h-10 rounded-xl bg-emerald-600 text-white items-center justify-center shrink-0 shadow-xs">
              <Sun className="w-5 h-5 text-amber-300 animate-spin-slow" />
            </div>

            <div className="min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-0.5"
                >
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-semibold">
                      {slide.badge}
                    </span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="flex items-center gap-1 text-amber-700 font-medium">
                      <Clock className="w-3 h-3" />
                      <span>Limited Time Offer</span>
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                    {slide.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-1 hidden md:block">
                    {slide.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right action controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Promo Code Pill */}
            <button
              onClick={() => handleCopyCode(slide.code)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-slate-50 border border-emerald-300 text-emerald-900 rounded-lg text-xs font-mono font-semibold shadow-2xs transition-colors cursor-pointer"
              title="Click to copy coupon code"
            >
              <Tag className="w-3.5 h-3.5 text-emerald-600" />
              <span>{slide.code}</span>
              <span className="text-[10px] text-slate-500 font-sans font-normal ml-0.5">
                {copied ? '(Copied!)' : '(5% Off)'}
              </span>
            </button>

            {/* Action Button */}
            <button
              onClick={slide.action === 'calculator' ? onOpenCalculator : onOpenQuote}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Slide Arrows */}
            <div className="hidden sm:flex items-center gap-1 pl-1">
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                className="p-1 text-slate-400 hover:text-slate-700 hover:bg-white rounded transition-colors cursor-pointer"
                aria-label="Previous flash promotion"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                className="p-1 text-slate-400 hover:text-slate-700 hover:bg-white rounded transition-colors cursor-pointer"
                aria-label="Next flash promotion"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
