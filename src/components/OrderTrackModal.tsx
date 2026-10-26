import React, { useState } from 'react';
import { X, Truck, Search, CheckCircle2, Clock, MapPin, PackageCheck } from 'lucide-react';
import { SAMPLE_TRACKING_ORDERS } from '../data/solarData';
import { OrderTrackingInfo } from '../types/solar';

interface OrderTrackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderTrackModal: React.FC<OrderTrackModalProps> = ({ isOpen, onClose }) => {
  const [orderQuery, setOrderQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [orderInfo, setOrderInfo] = useState<OrderTrackingInfo | null>(null);

  if (!isOpen) return null;

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const q = orderQuery.trim().toUpperCase();
    if (!q) return;

    setSearched(true);
    if (SAMPLE_TRACKING_ORDERS[q]) {
      setOrderInfo(SAMPLE_TRACKING_ORDERS[q]);
    } else {
      // Dynamic fallback for demo
      setOrderInfo({
        orderNumber: q,
        customerName: 'Valued HomePower Client',
        city: 'Rawalpindi',
        orderDate: 'October 25, 2026',
        totalAmount: 285000,
        status: 'dispatched',
        courierName: 'Trax Logistics Heavy Cargo',
        trackingNumber: 'TRX-' + Math.floor(100000 + Math.random() * 900000),
        estimatedDelivery: 'Within 2-3 Business Days',
        timeline: [
          { title: 'Order Confirmed', description: 'Payment verified and unit assigned', timestamp: 'Yesterday, 10:30 AM', done: true },
          { title: 'Quality Inspection', description: 'Inverter firmware testing & serial logging', timestamp: 'Yesterday, 03:00 PM', done: true },
          { title: 'Dispatched from Central Warehouse', description: 'Loaded on heavy freight transport', timestamp: 'Today, 09:00 AM', done: true },
          { title: 'Destination Hub Arrival', description: 'Sorting at regional delivery station', timestamp: 'In Transit', done: false },
          { title: 'Delivered & Installed', description: 'Commissioning by certified installer', timestamp: 'Pending', done: false }
        ],
        items: [
          { productName: 'HomePower Hybrid Inverter 6kW Max', qty: 1, price: 269000 }
        ]
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base font-bold text-slate-900">
              Solar Equipment Delivery Tracker
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-xs text-slate-600">
            Track the status of your pallet shipment, firmware QA inspection, and certified installer arrival.
          </p>

          <form onSubmit={handleTrack} className="flex gap-2">
            <input
              type="text"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              placeholder="Enter Order # (e.g. HP-89211 or HP-94102)"
              className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 font-mono uppercase focus:outline-none focus:border-emerald-600"
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Track</span>
            </button>
          </form>

          {/* Quick presets */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span>Try sample orders:</span>
            <button
              type="button"
              onClick={() => {
                setOrderQuery('HP-89211');
              }}
              className="text-emerald-700 underline cursor-pointer font-mono"
            >
              HP-89211
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => {
                setOrderQuery('HP-94102');
              }}
              className="text-emerald-700 underline cursor-pointer font-mono"
            >
              HP-94102
            </button>
          </div>

          {/* Tracking result */}
          {searched && orderInfo && (
            <div className="space-y-5 pt-2">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block">Order Number</span>
                  <strong className="text-slate-900 font-mono text-sm">{orderInfo.orderNumber}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Courier Partner</span>
                  <span className="text-slate-800 font-medium">{orderInfo.courierName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Tracking ID</span>
                  <span className="text-emerald-700 font-mono font-bold">{orderInfo.trackingNumber}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Estimated Delivery</span>
                  <strong className="text-slate-900">{orderInfo.estimatedDelivery}</strong>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="space-y-4 pl-2">
                {orderInfo.timeline.map((step, idx) => (
                  <div key={idx} className="relative flex gap-4 items-start">
                    {/* Step Icon */}
                    <div className="relative z-10">
                      {step.done ? (
                        <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center">
                          <Clock className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    {/* Step Line */}
                    {idx < orderInfo.timeline.length - 1 && (
                      <div
                        className={`absolute left-3.5 top-7 w-0.5 h-10 ${
                          step.done ? 'bg-emerald-600' : 'bg-slate-200'
                        }`}
                      />
                    )}

                    {/* Step Info */}
                    <div className="flex-1 text-xs">
                      <div className="flex justify-between items-center">
                        <strong className={step.done ? 'text-slate-900' : 'text-slate-500'}>
                          {step.title}
                        </strong>
                        <span className="text-[11px] text-slate-400 font-mono">{step.timestamp}</span>
                      </div>
                      <p className="text-slate-500 mt-0.5 text-[11px]">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
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
