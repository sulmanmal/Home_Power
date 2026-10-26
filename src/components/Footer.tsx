import React from 'react';
import { Sun, Phone, Mail, MapPin, ShieldCheck, Leaf, ArrowUpRight } from 'lucide-react';
import { ProductCategory } from '../types/solar';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory | 'all') => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenWarranty: () => void;
  onOpenTracking: () => void;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onNavigateSection,
  onOpenWarranty,
  onOpenTracking,
  onOpenQuote,
}) => {
  return (
    <footer className="bg-slate-100/90 text-slate-600 text-xs border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Corporate Charter */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold shadow-2xs">
                <Sun className="w-4 h-4 text-amber-300" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900">
                HomePower Solutions
              </span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed max-w-sm">
              Authorised supplier of high-efficiency hybrid solar inverters, LiFePO4 energy storage, and Tier-1 solar panels. Dedicated to accelerating clean, sustainable microgrids with certified installation engineering.
            </p>
            <div className="pt-2 text-slate-500 text-[11px] space-y-1">
              <div>Facility &amp; Central Distribution: Lahore, Punjab, Pakistan</div>
              <div>Certified ISO 9001 / IEC 62109 Safety Standard Compliance</div>
            </div>
          </div>

          {/* Column 2: Inverters & Storage */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Solar Equipment
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('inverters');
                    onNavigateSection('catalog');
                  }}
                  className="hover:text-emerald-700 transition-colors text-left cursor-pointer"
                >
                  Hybrid Inverters (3.6kW – 10kW)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('inverters');
                    onNavigateSection('catalog');
                  }}
                  className="hover:text-emerald-700 transition-colors text-left cursor-pointer"
                >
                  Off-Grid Pure Sine Systems
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('batteries');
                    onNavigateSection('catalog');
                  }}
                  className="hover:text-emerald-700 transition-colors text-left cursor-pointer"
                >
                  LiFePO4 Lithium Storage (5kWh &amp; 10kWh)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('batteries');
                    onNavigateSection('catalog');
                  }}
                  className="hover:text-emerald-700 transition-colors text-left cursor-pointer"
                >
                  Tall Tubular Deep-Cycle Batteries
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('panels');
                    onNavigateSection('catalog');
                  }}
                  className="hover:text-emerald-700 transition-colors text-left cursor-pointer"
                >
                  Tier-1 Bifacial PV Panels (585W–610W)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Engineering Tools */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Interactive Tools
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigateSection('calculator')}
                  className="hover:text-emerald-700 transition-colors text-left cursor-pointer font-medium text-emerald-800"
                >
                  Solar Sizing &amp; ROI Payback Engine
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('simulator')}
                  className="hover:text-emerald-700 transition-colors text-left cursor-pointer"
                >
                  Live Energy Flow Visualizer
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenWarranty}
                  className="hover:text-emerald-700 transition-colors text-left cursor-pointer"
                >
                  Verify Serial Warranty
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTracking}
                  className="hover:text-emerald-700 transition-colors text-left cursor-pointer"
                >
                  Track Cargo Dispatch
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('sustainability')}
                  className="hover:text-emerald-700 transition-colors text-left cursor-pointer"
                >
                  Sustainable Impact Charter
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Installer Hotline */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Direct Contact
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <a href="tel:+923000000000" className="hover:text-slate-900 transition-colors font-medium">
                  +92 300 0000000
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <a href="mailto:info@homepower.pk" className="hover:text-slate-900 transition-colors">
                  info@homepower.pk
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                <span>Central Distribution Hub, Lahore, Punjab</span>
              </li>
            </ul>
            <div className="pt-2">
              <button
                onClick={onOpenQuote}
                className="w-full py-2.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl text-center cursor-pointer shadow-2xs"
              >
                Book Site Survey
              </button>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Strip */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} HomePower Solutions. All rights reserved. Clean green energy engineering.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-800 cursor-pointer">Warranty Policy</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-800 cursor-pointer">Net-Metering Regulations</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-800 cursor-pointer">Installer Wholesale Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
