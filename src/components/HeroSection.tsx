import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calculator, ShieldCheck, Sun, Zap, BatteryCharging, CheckCircle2 } from 'lucide-react';
import { ProductSvgIllustration } from './ProductSvgIllustration';

interface HeroSectionProps {
  onOpenCalculator: () => void;
  onExploreCatalog: () => void;
  onOpenQuote: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenCalculator,
  onExploreCatalog,
  onOpenQuote,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-slate-50 to-white text-slate-900 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200">
      {/* Background solar radiation subtle lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="solar-light-glow" cx="60%" cy="10%" r="65%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="40%" stopColor="#34d399" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#solar-light-glow)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Clean unboxed editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Sustainable Green Energy Systems</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-600 font-medium">Certified Tier-1 Inverters</span>
            </div>

            {/* Headline with text-wrap balance */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-slate-900 leading-[1.15] text-balance">
              High-Efficiency Solar Inverters &amp; Clean Energy Storage
            </h1>

            {/* Value Proposition Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Eliminate load-shedding and reduce utility electricity bills by up to 90%. Our certified hybrid inverters, dual MPPT tracking, and LiFePO4 batteries deliver clean, resilient power to homes and businesses across Pakistan and beyond.
            </p>

            {/* Clean unboxed metadata with subtle separators */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-3 text-xs sm:text-sm text-slate-600 pt-1 font-medium">
              <span className="text-slate-900 font-semibold">98.4% MPPT Yield</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-900 font-semibold">0ms UPS Seamless Transfer</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-900 font-semibold">6,000+ Lithium Battery Cycles</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-emerald-700 font-bold">10-Year Extended Warranty</span>
            </div>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenCalculator}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>Calculate Sizing &amp; Payback</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreCatalog}
                className="px-5 py-3.5 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 rounded-xl border border-slate-300 shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Browse Inverter Hardware</span>
              </button>

              <button
                onClick={onOpenQuote}
                className="text-xs text-slate-500 hover:text-emerald-700 transition-colors underline underline-offset-4 cursor-pointer font-medium"
              >
                Or request site survey
              </button>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Hardware Showcase in LIGHT THEME */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5"
          >
            <div className="relative bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xl">
              {/* Header inside showcase */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 tracking-wide">FLAGSHIP HYBRID ARCHITECTURE</h3>
                  <p className="text-xs text-slate-500">HomePower Pro 6kW Hybrid + 5.12kWh LiFePO4</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-mono font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block animate-pulse" />
                  <span>GRID-TIE / SYNC</span>
                </div>
              </div>

              {/* Graphic container */}
              <div className="w-full h-64 rounded-2xl overflow-hidden bg-slate-50/80 border border-slate-200 flex items-center justify-center p-2">
                <ProductSvgIllustration type="hybrid-inverter" className="w-full h-full max-h-60" />
              </div>

              {/* Key live telemetry strip in LIGHT THEME */}
              <div className="grid grid-cols-3 gap-2.5 mt-4 pt-3 border-t border-slate-100 text-center font-mono">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div className="text-[10px] text-slate-500 font-sans uppercase font-medium">Continuous Power</div>
                  <div className="text-sm font-bold text-slate-900 tabular-nums">6,000 W</div>
                </div>
                <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                  <div className="text-[10px] text-emerald-800 font-sans uppercase font-medium">Conversion Eff.</div>
                  <div className="text-sm font-bold text-emerald-800 tabular-nums">98.4%</div>
                </div>
                <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                  <div className="text-[10px] text-amber-800 font-sans uppercase font-medium">LiFePO4 Cycles</div>
                  <div className="text-sm font-bold text-amber-900 tabular-nums">6,000+</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Proof of impact strip (adjacent to hero claim) in LIGHT THEME */}
        <div className="mt-14 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-700">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">18,500+</div>
            <div className="text-xs text-slate-500 mt-1">Residential &amp; Commercial Systems Powered</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">4.8 GW</div>
            <div className="text-xs text-slate-500 mt-1">Cumulative Clean Solar Energy Generated</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono tabular-nums">142,000 T</div>
            <div className="text-xs text-slate-500 mt-1">Verified CO2 Emissions Offset Nationwide</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">100%</div>
            <div className="text-xs text-slate-500 mt-1">Traceable Serial Warranty Records</div>
          </div>
        </div>
      </div>
    </section>
  );
};
