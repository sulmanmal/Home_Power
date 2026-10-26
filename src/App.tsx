import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { EnergyFlowVisualizer } from './components/EnergyFlowVisualizer';
import { SolarCalculator } from './components/SolarCalculator';
import { ProductCatalog } from './components/ProductCatalog';
import { SustainabilitySection } from './components/SustainabilitySection';
import { ProductCompareModal } from './components/ProductCompareModal';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { WarrantyLookupModal } from './components/WarrantyLookupModal';
import { OrderTrackModal } from './components/OrderTrackModal';
import { CartDrawer } from './components/CartDrawer';
import { QuoteModal } from './components/QuoteModal';
import { Footer } from './components/Footer';
import { FlashBanner } from './components/FlashBanner';
import { SolarAdvisorChatbot } from './components/SolarAdvisorChatbot';
import { PRODUCTS } from './data/solarData';
import { CartItem, MenuStyle, Product, ProductCategory } from './types/solar';
import { Check, ArrowUp } from 'lucide-react';

export default function App() {
  // Navigation & filtering state
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [menuStyle, setMenuStyle] = useState<MenuStyle>('classic');

  // Modals & Drawers state
  const [cartOpen, setCartOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [warrantyOpen, setWarrantyOpen] = useState(false);
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1 } // Pre-seed with flagship 6kW Hybrid Inverter
  ]);

  // Comparison list (IDs)
  const [comparedIds, setComparedIds] = useState<number[]>([1, 2]);

  // Installer Pricing toggle
  const [showInstallerPrices, setShowInstallerPrices] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Cart handlers
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${quantity}× ${product.name} to cart`);
  };

  const handleUpdateCartQty = (productId: number, qty: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveCartItem = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Add Complete Bundle from Calculator
  const handleAddBundleToCart = (
    inverterId: number,
    panelId: number,
    panelCount: number,
    batteryId: number,
    batteryCount: number
  ) => {
    const inverter = PRODUCTS.find((p) => p.id === inverterId);
    const panel = PRODUCTS.find((p) => p.id === panelId);
    const battery = PRODUCTS.find((p) => p.id === batteryId);

    setCartItems((prev) => {
      let updated = [...prev];
      if (inverter) {
        const exist = updated.find((i) => i.product.id === inverter.id);
        if (exist) exist.quantity += 1;
        else updated.push({ product: inverter, quantity: 1 });
      }
      if (panel && panelCount > 0) {
        const exist = updated.find((i) => i.product.id === panel.id);
        if (exist) exist.quantity += panelCount;
        else updated.push({ product: panel, quantity: panelCount });
      }
      if (battery && batteryCount > 0) {
        const exist = updated.find((i) => i.product.id === battery.id);
        if (exist) exist.quantity += batteryCount;
        else updated.push({ product: battery, quantity: batteryCount });
      }
      return updated;
    });

    showToast('Recommended Complete Solar Bundle added to cart!');
    setCartOpen(true);
  };

  // Comparison handlers
  const handleToggleCompare = (id: number) => {
    if (comparedIds.includes(id)) {
      setComparedIds(comparedIds.filter((item) => item !== id));
      showToast('Removed from comparison list');
    } else {
      if (comparedIds.length >= 4) {
        showToast('You can compare a maximum of 4 products simultaneously.');
        return;
      }
      setComparedIds([...comparedIds, id]);
      showToast('Added to comparison matrix');
    }
  };

  const handleRemoveCompared = (id: number) => {
    setComparedIds(comparedIds.filter((item) => item !== id));
  };

  const handleClearCompared = () => {
    setComparedIds([]);
  };

  // Smooth scroll helper
  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const comparedProducts = PRODUCTS.filter((p) => comparedIds.includes(p.id));
  const cartTotalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 border border-slate-700 animate-fade-in">
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        cartCount={cartTotalCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenQuote={() => setQuoteOpen(true)}
        onOpenWarranty={() => setWarrantyOpen(true)}
        onOpenTracking={() => setTrackingOpen(true)}
        onOpenCompare={() => setCompareOpen(true)}
        onSelectCategory={setSelectedCategory}
        onNavigateSection={handleNavigateSection}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        menuStyle={menuStyle}
        setMenuStyle={setMenuStyle}
      />

      {/* Full-Width Light Flash Promotion Banner */}
      <FlashBanner
        onOpenCalculator={() => handleNavigateSection('calculator')}
        onOpenQuote={() => setQuoteOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onOpenCalculator={() => handleNavigateSection('calculator')}
          onExploreCatalog={() => handleNavigateSection('catalog')}
          onOpenQuote={() => setQuoteOpen(true)}
        />

        {/* Live Interactive Energy Flow Architecture */}
        <EnergyFlowVisualizer />

        {/* Solar System Sizing & Financial Calculator */}
        <SolarCalculator
          onAddBundleToCart={handleAddBundleToCart}
          onOpenQuote={() => setQuoteOpen(true)}
        />

        {/* Certified Product Hardware Catalog */}
        <ProductCatalog
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          comparedIds={comparedIds}
          onToggleCompare={handleToggleCompare}
          showInstallerPrices={showInstallerPrices}
          setShowInstallerPrices={setShowInstallerPrices}
        />

        {/* Commitment to Sustainable Green Energy Solutions */}
        <SustainabilitySection
          onOpenCalculator={() => handleNavigateSection('calculator')}
          onOpenQuote={() => setQuoteOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={setSelectedCategory}
        onNavigateSection={handleNavigateSection}
        onOpenWarranty={() => setWarrantyOpen(true)}
        onOpenTracking={() => setTrackingOpen(true)}
        onOpenQuote={() => setQuoteOpen(true)}
      />

      {/* Modals & Overlays */}
      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        showInstallerPrice={showInstallerPrices}
      />

      <ProductCompareModal
        isOpen={compareOpen}
        onClose={() => setCompareOpen(false)}
        comparedProducts={comparedProducts}
        onRemoveProduct={handleRemoveCompared}
        onClearAll={handleClearCompared}
        onAddToCart={(p) => handleAddToCart(p, 1)}
      />

      <WarrantyLookupModal
        isOpen={warrantyOpen}
        onClose={() => setWarrantyOpen(false)}
      />

      <OrderTrackModal
        isOpen={trackingOpen}
        onClose={() => setTrackingOpen(false)}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      <QuoteModal
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
      />

      {/* Gemini AI Solar Advisor with Google Search Grounding */}
      <SolarAdvisorChatbot />
    </div>
  );
}
