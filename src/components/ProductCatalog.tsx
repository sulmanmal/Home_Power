import React, { useState, useMemo } from 'react';
import { ShoppingBag, Eye, Scale, Check, ShieldCheck, Zap, ArrowUpDown, Filter, Sparkles } from 'lucide-react';
import { Product, ProductCategory } from '../types/solar';
import { ProductSvgIllustration } from './ProductSvgIllustration';

interface ProductCatalogProps {
  products: Product[];
  selectedCategory: ProductCategory | 'all';
  onSelectCategory: (cat: ProductCategory | 'all') => void;
  searchQuery: string;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  comparedIds: number[];
  onToggleCompare: (id: number) => void;
  showInstallerPrices: boolean;
  setShowInstallerPrices: (show: boolean) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onQuickView,
  onAddToCart,
  comparedIds,
  onToggleCompare,
  showInstallerPrices,
  setShowInstallerPrices,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'efficiency'>('featured');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');

  // Extract unique brands
  const brands = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.brand)));
    return ['all', ...list];
  }, [products]);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        const matchesBrand = selectedBrand === 'all' || p.brand === selectedBrand;
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.sku.toLowerCase().includes(query) ||
          (p.capacity && p.capacity.toLowerCase().includes(query)) ||
          p.description.toLowerCase().includes(query);

        return matchesCategory && matchesBrand && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') {
          return (a.salePrice || a.price) - (b.salePrice || b.price);
        }
        if (sortBy === 'price-desc') {
          return (b.salePrice || b.price) - (a.salePrice || a.price);
        }
        if (sortBy === 'efficiency') {
          const effA = parseFloat(a.efficiency || '0');
          const effB = parseFloat(b.efficiency || '0');
          return effB - effA;
        }
        // Default: featured first, then newest
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, selectedBrand, searchQuery, sortBy]);

  const categories: { key: ProductCategory | 'all'; label: string }[] = [
    { key: 'all', label: 'All Hardware' },
    { key: 'inverters', label: 'Solar Inverters' },
    { key: 'batteries', label: 'Battery Storage' },
    { key: 'panels', label: 'Solar Panels' },
    { key: 'accessories', label: 'Balance of System' },
  ];

  return (
    <section id="catalog" className="py-16 sm:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-2">
              <Zap className="w-4 h-4 text-emerald-600" />
              <span>Tested &amp; Certified Hardware Catalog</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Solar Inverters, LiFePO4 &amp; Tier-1 Panels
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Direct factory distribution with serialized warranties and installer support.
            </p>
          </div>

          {/* Installer Pricing Toggle */}
          <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200 self-start md:self-auto shadow-xs">
            <span className="text-xs font-medium text-slate-700">Installer Wholesale Rate:</span>
            <button
              onClick={() => setShowInstallerPrices(!showInstallerPrices)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                showInstallerPrices ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  showInstallerPrices ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Filter Controls Bar (Interactive Segmented Buttons) */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200 shadow-2xs">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => onSelectCategory(c.key)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === c.key
                    ? 'bg-emerald-700 text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Brand Filter & Sort Dropdowns */}
          <div className="flex items-center gap-3 text-xs">
            {/* Brand Filter */}
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
              <span className="text-slate-500 font-medium">Brand:</span>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="bg-transparent border-none text-slate-800 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="all">All Brands</option>
                {brands.filter((b) => b !== 'all').map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent border-none text-slate-800 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="efficiency">Highest Efficiency</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const isCompared = comparedIds.includes(product.id);
            const displayPrice = showInstallerPrices && product.installerPrice
              ? product.installerPrice
              : product.salePrice || product.price;

            const hasDiscount = !showInstallerPrices && product.salePrice && product.salePrice < product.price;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Visual Illustration Container */}
                  <div className="relative w-full h-56 bg-slate-100/80 p-4 flex items-center justify-center overflow-hidden border-b border-slate-100">
                    <ProductSvgIllustration type={product.imageSvgType} className="w-full h-full max-h-48" />

                    {/* Compare check box on top-left */}
                    <button
                      onClick={() => onToggleCompare(product.id)}
                      className={`absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                        isCompared
                          ? 'bg-emerald-700 text-white'
                          : 'bg-white/90 text-slate-700 hover:bg-white shadow-xs'
                      }`}
                    >
                      <Scale className="w-3 h-3" />
                      <span>{isCompared ? 'Compared' : 'Compare'}</span>
                    </button>

                    {/* Stock indicator badge */}
                    <div className="absolute top-3 right-3 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60 font-medium">
                      {product.stock > 10 ? 'In Stock' : `Only ${product.stock} Left`}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    {/* Brand & Clean Metadata (Zero-Pill discipline) */}
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">{product.brand}</span>
                      <span aria-hidden="true">·</span>
                      <span>SKU: {product.sku}</span>
                      {product.capacity && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-emerald-700 font-semibold">{product.capacity}</span>
                        </>
                      )}
                    </div>

                    {/* Product Title */}
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                      {product.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Key Technical Metric Chips (Clean Unboxed) */}
                    <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 font-mono">
                      {product.efficiency && (
                        <span>Eff: <strong className="text-slate-800">{product.efficiency}</strong></span>
                      )}
                      {product.voltage && (
                        <>
                          <span aria-hidden="true" className="text-slate-300">/</span>
                          <span>Volt: <strong className="text-slate-800">{product.voltage}</strong></span>
                        </>
                      )}
                      <span aria-hidden="true" className="text-slate-300">/</span>
                      <span>
                        Warranty: <strong className="text-slate-800">{product.warrantyMonths / 12} Yrs</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Strip with Pricing & Actions */}
                <div className="p-5 pt-0">
                  <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                    {/* Price */}
                    <div>
                      {showInstallerPrices ? (
                        <div className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">
                          Installer Wholesale
                        </div>
                      ) : hasDiscount ? (
                        <div className="text-[11px] text-slate-400 line-through tabular-nums">
                          Rs {product.price.toLocaleString()}
                        </div>
                      ) : null}

                      <div className="text-lg font-extrabold text-slate-900 font-mono tabular-nums">
                        Rs {displayPrice.toLocaleString()}
                      </div>
                    </div>

                    {/* Quick View & Cart Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onQuickView(product)}
                        className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        title="View Detailed Specs"
                        aria-label="Quick View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onAddToCart(product)}
                        className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <h3 className="text-base font-bold text-slate-800">No hardware matched your criteria</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting the search filter or selecting another category.</p>
            <button
              onClick={() => {
                onSelectCategory('all');
                setSelectedBrand('all');
              }}
              className="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
