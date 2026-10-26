import React from 'react';
import { Leaf, Sun, ShieldCheck, Award, Recycle, Globe, CheckCircle2, ArrowRight } from 'lucide-react';

interface SustainabilitySectionProps {
  onOpenCalculator: () => void;
  onOpenQuote: () => void;
}

export const SustainabilitySection: React.FC<SustainabilitySectionProps> = ({
  onOpenCalculator,
  onOpenQuote,
}) => {
  return (
    <section id="sustainability" className="py-20 sm:py-28 bg-gradient-to-b from-emerald-50/70 via-teal-50/40 to-white text-slate-900 relative overflow-hidden border-b border-slate-200">
      {/* Background ambient solar leaf pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="emerald-light-glow" cx="80%" cy="20%" r="60%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#emerald-light-glow)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
            <Leaf className="w-4 h-4 text-emerald-600" />
            <span>Sustainable Future Charter</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight text-balance">
            Our Uncompromising Commitment to Sustainable Clean Energy
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Transitioning away from fossil-fueled generators and coal-reliant grids is our core engineering mission. Every HomePower inverter and LiFePO4 battery is designed for maximum lifecycle durability, recyclability, and minimal ecological footprint.
          </p>
        </div>

        {/* 4 Pillars of Green Engineering in LIGHT THEME */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Pillar 1 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
                <Sun className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">98.4% Peak Efficiency</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our dual-MPPT silicon carbide topology minimizes thermal dissipation, converting nearly 99% of captured sunlight into usable home electricity.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] text-emerald-800 font-mono font-semibold">
              Zero wasted photons
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
                <Recycle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Cobalt-Free LiFePO4</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We exclusively specify Lithium Iron Phosphate cells—avoiding toxic heavy metals and unethical mining. 100% non-flammable, thermal stable, and recyclable.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] text-emerald-800 font-mono font-semibold">
              6,000+ Deep Cycles (15+ Yrs)
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Net Metering Reversal</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our hybrid systems turn your rooftop into a clean microgrid power plant, feeding surplus electricity back to reduce neighboring community emissions.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] text-emerald-800 font-mono font-semibold">
              Bi-directional grid support
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">25-Year Lifecycle Support</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We fight disposable electronics through modular replacement boards, traceable serial warranty records, and authorized recycling buybacks.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] text-emerald-800 font-mono font-semibold">
              Circular lifecycle stewardship
            </div>
          </div>
        </div>

        {/* Quantified Ecological Counter Strip in LIGHT THEME */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-bold block">
                VERIFIABLE CLIMATE OUTCOMES
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                How Much Carbon Does Your Rooftop Inverter Prevent?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                A typical 6kW HomePower hybrid system with 10 panels offsets approximately <strong>7.2 tons of CO2 annually</strong>, equivalent to taking 2 gasoline combustion cars off the highway permanently.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={onOpenCalculator}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Size Your Carbon Offset</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-emerald-50/70 p-6 rounded-2xl border border-emerald-200 text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-800 font-mono tabular-nums">
                  142K
                </div>
                <div className="text-xs text-slate-800 font-bold mt-1">Tons CO2 Abated</div>
                <div className="text-[10px] text-slate-500 mt-1">Across 18,500 installations</div>
              </div>

              <div className="bg-amber-50/70 p-6 rounded-2xl border border-amber-200 text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-amber-800 font-mono tabular-nums">
                  2.3M
                </div>
                <div className="text-xs text-slate-800 font-bold mt-1">Mature Trees Equivalent</div>
                <div className="text-[10px] text-slate-500 mt-1">Forest absorption equivalence</div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tabular-nums">
                  58K
                </div>
                <div className="text-xs text-slate-800 font-bold mt-1">Barrels Oil Displaced</div>
                <div className="text-[10px] text-slate-500 mt-1">Reduced diesel generator run</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
