import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Search, ChevronDown, Phone, ShieldCheck, Truck, Scale, Leaf, Sun, Calculator, Activity, ArrowRight, Menu, X } from 'lucide-react';
import { MenuStyle, ProductCategory } from '../types/solar';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenQuote: () => void;
  onOpenWarranty: () => void;
  onOpenTracking: () => void;
  onOpenCompare: () => void;
  onSelectCategory: (cat: ProductCategory | 'all') => void;
  onNavigateSection: (sectionId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  menuStyle: MenuStyle;
  setMenuStyle: (style: MenuStyle) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenQuote,
  onOpenWarranty,
  onOpenTracking,
  onOpenCompare,
  onSelectCategory,
  onNavigateSection,
  searchQuery,
  setSearchQuery,
  menuStyle,
  setMenuStyle,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {/* Top Announcement Bar in Light Clean Scheme */}
      <div className="bg-slate-100 text-slate-700 text-xs py-2 px-4 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-emerald-800 font-bold">Clean Energy Guarantee:</span>
            <span>Tier-1 inverters, Lithium LiFePO4 storage &amp; nationwide insured shipping</span>
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={onOpenTracking}
              className="hover:text-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
            >
              <Truck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Track Order</span>
            </button>
            <button
              onClick={onOpenWarranty}
              className="hover:text-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Warranty Lookup</span>
            </button>
            <a
              href="tel:+923000000000"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+92 300 0000000</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (4-5 Nav Links) - Zone 3 (1 Action + Cart) */}
      <header
        className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md transition-all duration-200 border-b border-slate-200 ${
          menuStyle === 'boxed' ? 'border-b-2 border-emerald-700' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-20">
            {/* Zone 1: Single element wordmark (Display face, whitespace-nowrap shrink-0) */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigateSection('hero')}
                className="flex items-center gap-2.5 text-left cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-emerald-800 transition-colors">
                  <Sun className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <span className="text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap block leading-tight">
                    HomePower
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-emerald-700 font-semibold block">
                    Solar Inverters &amp; Storage
                  </span>
                </div>
              </button>
            </div>

            {/* Zone 2: Navigation Links with multi-level animated jQuery-style dropdown menus */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
              {/* Dropdown 1: Solar Products */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('products')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => onNavigateSection('catalog')}
                  className={`flex items-center gap-1.5 py-2 hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 ${
                    activeDropdown === 'products' ? 'text-emerald-700 font-semibold' : ''
                  }`}
                >
                  <span>Inverters &amp; Systems</span>
                  <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                </button>

                <AnimatePresence>
                  {activeDropdown === 'products' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute top-full left-0 w-[480px] bg-white rounded-xl shadow-xl border border-slate-200 p-4 grid grid-cols-2 gap-3"
                    >
                      <button
                        onClick={() => {
                          onSelectCategory('inverters');
                          onNavigateSection('catalog');
                          setActiveDropdown(null);
                        }}
                        className="p-3 rounded-lg text-left hover:bg-slate-50 transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Sun className="w-4 h-4 text-emerald-600" />
                          <span className="font-semibold text-slate-900 group-hover:text-emerald-700">Hybrid Inverters</span>
                        </div>
                        <p className="text-xs text-slate-500">Pure sine wave 3.6kW to 10kW with MPPT &amp; UPS transfer</p>
                      </button>

                      <button
                        onClick={() => {
                          onSelectCategory('batteries');
                          onNavigateSection('catalog');
                          setActiveDropdown(null);
                        }}
                        className="p-3 rounded-lg text-left hover:bg-slate-50 transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Activity className="w-4 h-4 text-amber-500" />
                          <span className="font-semibold text-slate-900 group-hover:text-emerald-700">Lithium LiFePO4</span>
                        </div>
                        <p className="text-xs text-slate-500">6,000+ deep cycles, 90% DoD 48V wall &amp; rack modules</p>
                      </button>

                      <button
                        onClick={() => {
                          onSelectCategory('panels');
                          onNavigateSection('catalog');
                          setActiveDropdown(null);
                        }}
                        className="p-3 rounded-lg text-left hover:bg-slate-50 transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Sun className="w-4 h-4 text-blue-600" />
                          <span className="font-semibold text-slate-900 group-hover:text-emerald-700">Tier-1 Solar Panels</span>
                        </div>
                        <p className="text-xs text-slate-500">585W–610W N-Type TOPCon &amp; Mono PERC bifacial</p>
                      </button>

                      <button
                        onClick={() => {
                          onSelectCategory('accessories');
                          onNavigateSection('catalog');
                          setActiveDropdown(null);
                        }}
                        className="p-3 rounded-lg text-left hover:bg-slate-50 transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <ShieldCheck className="w-4 h-4 text-slate-700" />
                          <span className="font-semibold text-slate-900 group-hover:text-emerald-700">Switchgear &amp; Mounts</span>
                        </div>
                        <p className="text-xs text-slate-500">IP65 DC protection boxes, GI L2 rails &amp; solar cables</p>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Link 2: Solar Sizing Calculator */}
              <button
                onClick={() => onNavigateSection('calculator')}
                className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-emerald-600" />
                <span>Sizing Calculator</span>
              </button>

              {/* Link 3: Live Energy Flow Simulator */}
              <button
                onClick={() => onNavigateSection('simulator')}
                className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>Live Simulator</span>
              </button>

              {/* Link 4: System Comparison */}
              <button
                onClick={onOpenCompare}
                className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <Scale className="w-4 h-4 text-slate-600" />
                <span>Compare Specs</span>
              </button>

              {/* Link 5: Sustainability & Commitment */}
              <button
                onClick={() => onNavigateSection('sustainability')}
                className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span>Sustainable Impact</span>
              </button>
            </nav>

            {/* Zone 3: 1 Primary Action + Search & Cart */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Search toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart Button */}
              <button
                onClick={onOpenCart}
                className="relative p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Primary Action Button */}
              <button
                onClick={onOpenQuote}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Request Custom Sizing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile Burger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar Flyout */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-slate-200 bg-slate-50"
            >
              <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
                <Search className="w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search inverters, lithium batteries, panels (e.g. 6kW, MPPT, 585W, Longi)..."
                  className="w-full bg-transparent border-none text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={() => {
                    onNavigateSection('catalog');
                    setSearchOpen(false);
                  }}
                  className="px-3 py-1 bg-emerald-700 text-white text-xs font-medium rounded hover:bg-emerald-800 cursor-pointer"
                >
                  Search
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3"
            >
              <div className="space-y-1">
                <button
                  onClick={() => {
                    onSelectCategory('all');
                    onNavigateSection('catalog');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2 px-3 text-sm font-semibold text-slate-900 rounded-lg hover:bg-slate-50"
                >
                  All Solar Products
                </button>
                <div className="pl-4 space-y-1 text-sm text-slate-600">
                  <button
                    onClick={() => {
                      onSelectCategory('inverters');
                      onNavigateSection('catalog');
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-1 hover:text-emerald-700"
                  >
                    Solar Inverters (Hybrid &amp; Off-grid)
                  </button>
                  <button
                    onClick={() => {
                      onSelectCategory('batteries');
                      onNavigateSection('catalog');
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-1 hover:text-emerald-700"
                  >
                    LiFePO4 Lithium &amp; Tubular Batteries
                  </button>
                  <button
                    onClick={() => {
                      onSelectCategory('panels');
                      onNavigateSection('catalog');
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-1 hover:text-emerald-700"
                  >
                    Tier-1 PV Solar Panels
                  </button>
                  <button
                    onClick={() => {
                      onSelectCategory('accessories');
                      onNavigateSection('catalog');
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-1 hover:text-emerald-700"
                  >
                    Mounting &amp; DC Protection Boxes
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  onNavigateSection('calculator');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 px-3 text-sm font-semibold text-slate-900 rounded-lg hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Solar Sizing Calculator</span>
                <Calculator className="w-4 h-4 text-emerald-600" />
              </button>

              <button
                onClick={() => {
                  onNavigateSection('simulator');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 px-3 text-sm font-semibold text-slate-900 rounded-lg hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Live Energy Flow Simulator</span>
                <Activity className="w-4 h-4 text-emerald-600" />
              </button>

              <button
                onClick={() => {
                  onOpenCompare();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 px-3 text-sm font-semibold text-slate-900 rounded-lg hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Compare Solar Specs</span>
                <Scale className="w-4 h-4 text-slate-600" />
              </button>

              <button
                onClick={() => {
                  onNavigateSection('sustainability');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 px-3 text-sm font-semibold text-slate-900 rounded-lg hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Commitment to Green Energy</span>
                <Leaf className="w-4 h-4 text-emerald-600" />
              </button>

              <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => {
                    onOpenWarranty();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-1.5 px-3 text-xs text-slate-600 flex items-center gap-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Check Serial Warranty</span>
                </button>
                <button
                  onClick={() => {
                    onOpenTracking();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-1.5 px-3 text-xs text-slate-600 flex items-center gap-2"
                >
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Track Active Order</span>
                </button>
                <button
                  onClick={() => {
                    onOpenQuote();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-center text-xs font-semibold text-white bg-emerald-700 rounded-lg"
                >
                  Request Solar Site Survey
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
