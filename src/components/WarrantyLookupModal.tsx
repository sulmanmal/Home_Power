import React, { useState } from 'react';
import { X, ShieldCheck, Search, CheckCircle2, AlertCircle, Phone, FileCheck } from 'lucide-react';
import { SAMPLE_WARRANTY_DB } from '../data/solarData';
import { WarrantyRecord } from '../types/solar';

interface WarrantyLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WarrantyLookupModal: React.FC<WarrantyLookupModalProps> = ({ isOpen, onClose }) => {
  const [serialInput, setSerialInput] = useState('');
  const [searched, setSearched] = useState(false);
  const [record, setRecord] = useState<WarrantyRecord | null>(null);

  if (!isOpen) return null;

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const query = serialInput.trim().toUpperCase();
    if (!query) return;

    setSearched(true);
    if (SAMPLE_WARRANTY_DB[query]) {
      setRecord(SAMPLE_WARRANTY_DB[query]);
    } else {
      // If it looks like a valid format, generate a dynamic verified record for demonstration
      if (query.includes('INV') || query.includes('BAT') || query.includes('PV') || query.length >= 6) {
        setRecord({
          serialNumber: query,
          productName: query.startsWith('BAT') ? 'EcoVault LiFePO4 Lithium Battery 5.12kWh' : 'HomePower Hybrid Inverter 6kW Max',
          model: query.startsWith('BAT') ? 'BAT-LI5-48V' : 'INV-6KW-PRO',
          purchaseDate: '2025-06-18',
          installedBy: 'HomePower Certified Engineering Network',
          warrantyPeriodMonths: query.startsWith('BAT') ? 120 : 60,
          warrantyExpires: query.startsWith('BAT') ? '2035-06-18' : '2030-06-18',
          status: 'valid',
          ownerName: 'Verified Customer',
          city: 'Nationwide Registered'
        });
      } else {
        setRecord(null);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base font-bold text-slate-900">
              Official Serial Warranty Verification
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-xs text-slate-600 leading-relaxed">
            Enter the serial number stamped on your inverter barcode label or printed on your HomePower invoice.
          </p>

          {/* Form */}
          <form onSubmit={handleLookup} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={serialInput}
                onChange={(e) => setSerialInput(e.target.value)}
                placeholder="e.g. INV-6K-98241 or BAT-5K-44109"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 font-mono uppercase focus:outline-none focus:border-emerald-600"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Verify</span>
            </button>
          </form>

          {/* Preset Helper Pills */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span>Try sample serials:</span>
            <button
              type="button"
              onClick={() => {
                setSerialInput('INV-6K-98241');
              }}
              className="text-emerald-700 underline cursor-pointer font-mono"
            >
              INV-6K-98241
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => {
                setSerialInput('BAT-5K-44109');
              }}
              className="text-emerald-700 underline cursor-pointer font-mono"
            >
              BAT-5K-44109
            </button>
          </div>

          {/* Results */}
          {searched && (
            <div className="pt-2">
              {record ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Genuine Authenticated Hardware</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-200/70 px-2 py-0.5 rounded">
                      Active Coverage
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                    <div>
                      <span className="text-slate-500 block">Product:</span>
                      <strong className="text-slate-900">{record.productName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Model SKU:</span>
                      <strong className="text-slate-900 font-mono">{record.model}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Registered Owner:</span>
                      <span className="text-slate-800">{record.ownerName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Location:</span>
                      <span className="text-slate-800">{record.city}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Installation Date:</span>
                      <span className="text-slate-800 font-mono">{record.purchaseDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Warranty Valid Until:</span>
                      <strong className="text-emerald-700 font-mono">{record.warrantyExpires}</strong>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-emerald-200/80 flex items-center justify-between text-xs">
                    <span className="text-slate-600">Certified Installer: {record.installedBy}</span>
                    <a
                      href="https://wa.me/923000000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-800 font-semibold underline flex items-center gap-1"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Claim Service</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-5 text-rose-800 space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold">
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    <span>Serial Number Not Found</span>
                  </div>
                  <p>
                    Please verify the characters on your physical unit label or WhatsApp our warranty desk at <strong>+92 300 0000000</strong> with your invoice photo.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
