import React from 'react';
import { X, Scale, Trash2, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types/solar';
import { ProductSvgIllustration } from './ProductSvgIllustration';

interface ProductCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparedProducts: Product[];
  onRemoveProduct: (id: number) => void;
  onClearAll: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCompareModal: React.FC<ProductCompareModalProps> = ({
  isOpen,
  onClose,
  comparedProducts,
  onRemoveProduct,
  onClearAll,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const comparisonAttributes = [
    { label: 'Category', key: 'categoryName' },
    { label: 'Brand', key: 'brand' },
    { label: 'Model SKU', key: 'sku' },
    { label: 'Rated Capacity', key: 'capacity' },
    { label: 'Operating Voltage', key: 'voltage' },
    { label: 'Conversion Efficiency', key: 'efficiency' },
    { label: 'MPPT Trackers', key: 'mpptChannels', format: (val: any) => val ? `${val} Channel(s)` : 'N/A' },
    { label: 'Max PV Input Voltage', key: 'maxPvVoltage' },
    { label: 'Physical Weight', key: 'weightKg', format: (val: any) => `${val} kg` },
    { label: 'Warranty Period', key: 'warrantyMonths', format: (val: any) => `${val / 12} Years (${val} Months)` },
    { label: 'Stock Status', key: 'stock', format: (val: any) => val > 0 ? `${val} Units Available` : 'Backorder' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-slate-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base font-bold text-slate-900">
              Solar Hardware Technical Comparison ({comparedProducts.length}/4)
            </h3>
          </div>
          <div className="flex items-center gap-4">
            {comparedProducts.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer font-medium"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="overflow-x-auto flex-1 p-6">
          {comparedProducts.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Scale className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">No hardware selected for comparison</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Select &quot;Compare&quot; on any inverter, battery or solar panel in the catalog to review specifications side-by-side.
              </p>
            </div>
          ) : (
            <table className="w-full text-xs text-left border-collapse min-w-[600px]">
              <thead>
                <tr>
                  <th className="p-3 bg-slate-50 font-bold text-slate-700 border border-slate-200 w-44">
                    Specification
                  </th>
                  {comparedProducts.map((p) => (
                    <th
                      key={p.id}
                      className="p-3 bg-white border border-slate-200 align-top min-w-[200px]"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] text-emerald-700 font-bold uppercase">{p.brand}</span>
                        <button
                          onClick={() => onRemoveProduct(p.id)}
                          className="text-slate-400 hover:text-rose-600 p-0.5 cursor-pointer"
                          title="Remove from comparison"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="w-full h-24 bg-slate-50 rounded-lg p-2 mb-2 flex items-center justify-center">
                        <ProductSvgIllustration type={p.imageSvgType} className="w-full h-full max-h-20" />
                      </div>
                      <h4 className="font-bold text-slate-900 text-xs line-clamp-2 leading-tight mb-2">
                        {p.name}
                      </h4>
                      <div className="text-sm font-mono font-bold text-slate-900 mb-3 tabular-nums">
                        Rs {(p.salePrice || p.price).toLocaleString()}
                      </div>
                      <button
                        onClick={() => onAddToCart(p)}
                        className="w-full py-1.5 px-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-medium text-[11px] flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add to Cart</span>
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {comparisonAttributes.map((attr) => (
                  <tr key={attr.key} className="hover:bg-slate-50/70">
                    <td className="p-3 font-semibold text-slate-700 bg-slate-50/80 border border-slate-200">
                      {attr.label}
                    </td>
                    {comparedProducts.map((p) => {
                      const raw = (p as any)[attr.key];
                      const val = attr.format ? attr.format(raw) : (raw || '—');
                      return (
                        <td
                          key={p.id}
                          className="p-3 border border-slate-200 font-mono text-slate-800"
                        >
                          {val}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg cursor-pointer"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
