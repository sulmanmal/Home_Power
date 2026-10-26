import React, { useState } from 'react';
import { X, ShoppingBag, ShieldCheck, Check, Zap, Truck, FileText } from 'lucide-react';
import { Product } from '../types/solar';
import { ProductSvgIllustration } from './ProductSvgIllustration';

interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  showInstallerPrice: boolean;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  showInstallerPrice,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'features'>('specs');

  if (!isOpen || !product) return null;

  const effectivePrice = showInstallerPrice && product.installerPrice
    ? product.installerPrice
    : product.salePrice || product.price;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-600 bg-white/80 rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Visual Illustration */}
          <div className="bg-slate-100/90 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-200">
            <div className="w-full h-64 max-w-xs flex items-center justify-center">
              <ProductSvgIllustration type={product.imageSvgType} className="w-full h-full max-h-56" />
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Genuine Serialized Hardware</span>
            </div>
          </div>

          {/* Right Column: Product Details & Cart Action */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              {/* Brand and SKU */}
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">{product.brand}</span>
                <span aria-hidden="true">·</span>
                <span>SKU: {product.sku}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 font-medium">{product.stock} in stock</span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 leading-snug">
                {product.name}
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Price */}
              <div className="pt-2">
                {showInstallerPrice ? (
                  <div className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">
                    Installer Wholesale Pricing
                  </div>
                ) : product.salePrice && product.salePrice < product.price ? (
                  <div className="text-xs text-slate-400 line-through">
                    Rs {product.price.toLocaleString()}
                  </div>
                ) : null}
                <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
                  Rs {effectivePrice.toLocaleString()}
                </div>
              </div>

              {/* Tabs for Specs / Features */}
              <div className="pt-2">
                <div className="flex border-b border-slate-200 text-xs font-medium">
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-2 px-3 border-b-2 cursor-pointer ${
                      activeTab === 'specs'
                        ? 'border-emerald-700 text-emerald-700 font-semibold'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab('features')}
                    className={`pb-2 px-3 border-b-2 cursor-pointer ${
                      activeTab === 'features'
                        ? 'border-emerald-700 text-emerald-700 font-semibold'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Engineering Features
                  </button>
                </div>

                <div className="mt-3 max-h-40 overflow-y-auto pr-1">
                  {activeTab === 'specs' ? (
                    <div className="space-y-1.5 text-xs">
                      {Object.entries(product.specs).map(([label, val]) => (
                        <div key={label} className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                          <span className="font-medium text-slate-500">{label}:</span>
                          <span className="font-mono text-slate-900 text-right">{val}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ul className="space-y-2 text-xs text-slate-700">
                      {product.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-slate-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-l-lg cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 font-mono text-xs font-bold text-slate-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-r-lg cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => {
                    onAddToCart(product, quantity);
                    onClose();
                  }}
                  className="flex-1 py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart — Rs {(effectivePrice * quantity).toLocaleString()}</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Nationwide Insured Freight</span>
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{product.warrantyMonths / 12}-Year Official Warranty</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
