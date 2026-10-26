import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Check, Printer } from 'lucide-react';
import { CartItem } from '../types/solar';
import { ProductSvgIllustration } from './ProductSvgIllustration';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (productId: number, qty: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPct: number } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [shippingZone, setShippingZone] = useState<'punjab' | 'lahore' | 'other'>('lahore');
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'raast' | 'jazzcash' | 'cod'>('bank');

  // Customer details for checkout
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [generatedOrderNum, setGeneratedOrderNum] = useState('');

  // Calculations
  const subtotal = items.reduce((sum, item) => {
    const price = item.product.salePrice || item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const totalWeightKg = items.reduce((sum, item) => sum + item.product.weightKg * item.quantity, 0);

  // Shipping cost
  const baseShipping = shippingZone === 'lahore' ? 500 : shippingZone === 'punjab' ? 1500 : 2500;
  const shippingCost = subtotal > 350000 ? 0 : baseShipping;

  const discountAmount = appliedCoupon ? Math.round((subtotal * appliedCoupon.discountPct) / 100) : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'SOLAR5') {
      if (subtotal < 100000) {
        setCouponError('Minimum order amount for SOLAR5 is Rs 100,000');
        return;
      }
      setAppliedCoupon({ code: 'SOLAR5', discountPct: 5 });
      setCouponCode('');
    } else {
      setCouponError('Invalid coupon code. Try SOLAR5 for 5% off.');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert('Please fill in your name, delivery address, and phone number.');
      return;
    }
    const orderNum = 'HP-' + Math.floor(10000 + Math.random() * 90000);
    setGeneratedOrderNum(orderNum);
    setCheckoutStep('success');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between"
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base font-bold text-slate-900">
              {checkoutStep === 'cart'
                ? `Solar Equipment Cart (${items.length})`
                : checkoutStep === 'checkout'
                ? 'Delivery & Payment Details'
                : 'Order Confirmed'}
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {checkoutStep === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
                  <p className="text-sm font-semibold text-slate-700">Your cart is currently empty</p>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Browse our hybrid inverters, batteries, or calculate a customized system bundle.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-3 px-4 py-2 bg-emerald-700 text-white text-xs font-semibold rounded-lg"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Items List */}
                  <div className="divide-y divide-slate-100">
                    {items.map((item) => {
                      const itemPrice = item.product.salePrice || item.product.price;
                      return (
                        <div key={item.product.id} className="py-3 flex gap-3 items-center">
                          <div className="w-16 h-16 bg-slate-50 rounded-lg p-1.5 shrink-0 flex items-center justify-center border border-slate-100">
                            <ProductSvgIllustration
                              type={item.product.imageSvgType}
                              className="w-full h-full max-h-14"
                            />
                          </div>

                          <div className="flex-1 min-w-0 text-xs">
                            <div className="font-semibold text-slate-900 truncate">
                              {item.product.name}
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono">
                              {item.product.brand} · SKU: {item.product.sku}
                            </div>
                            <div className="text-xs font-bold text-slate-900 font-mono mt-1 tabular-nums">
                              Rs {itemPrice.toLocaleString()}
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-1 border border-slate-200 rounded">
                            <button
                              onClick={() => onUpdateQty(item.product.id, Math.max(1, item.quantity - 1))}
                              className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 text-xs cursor-pointer"
                            >
                              -
                            </button>
                            <span className="px-2 font-mono text-xs font-bold">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQty(item.product.id, item.quantity + 1)}
                              className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 text-xs cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          {/* Delete Item */}
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Coupon Code Input */}
                  <div className="pt-3 border-t border-slate-200">
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Coupon Code (try SOLAR5)"
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-2 text-xs font-mono uppercase focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-medium rounded-lg cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>
                    {appliedCoupon && (
                      <div className="text-xs text-emerald-700 font-medium mt-1.5 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Coupon {appliedCoupon.code} applied (5% discount)!</span>
                      </div>
                    )}
                    {couponError && <p className="text-xs text-rose-600 mt-1">{couponError}</p>}
                  </div>

                  {/* Shipping Zone Selector */}
                  <div className="pt-3 border-t border-slate-200 text-xs space-y-1.5">
                    <label className="font-semibold text-slate-700">Delivery Region (Heavy Freight):</label>
                    <select
                      value={shippingZone}
                      onChange={(e) => setShippingZone(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900"
                    >
                      <option value="lahore">Lahore Local Delivery (Rs 500)</option>
                      <option value="punjab">Punjab Province Inter-City (Rs 1,500)</option>
                      <option value="other">Sindh / KPK / Balochistan Cargo (Rs 2,500)</option>
                    </select>
                    <div className="text-[11px] text-slate-400">
                      Total Freight Mass: {totalWeightKg.toFixed(1)} kg · Free shipping on orders &gt; Rs 350,000
                    </div>
                  </div>

                  {/* Order Summary Box */}
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs space-y-2 font-mono">
                    <div className="flex justify-between text-slate-600">
                      <span>Equipment Subtotal:</span>
                      <span>Rs {subtotal.toLocaleString()}</span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between text-emerald-700 font-semibold">
                        <span>Discount ({appliedCoupon.code}):</span>
                        <span>-Rs {discountAmount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-600">
                      <span>Insured Freight:</span>
                      <span>{shippingCost === 0 ? 'FREE' : `Rs ${shippingCost.toLocaleString()}`}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 flex justify-between text-slate-900 font-bold text-sm">
                      <span>Estimated Total:</span>
                      <span className="text-emerald-700 font-bold">Rs {grandTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {checkoutStep === 'checkout' && (
            <form onSubmit={handleCompleteOrder} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Engr. Tariq Mehmood"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Phone / WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="0300-1234567"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Delivery Address &amp; City *</label>
                <textarea
                  required
                  rows={2}
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="Street, Sector/Area, City (e.g. House 42, Street 8, DHA Phase 5, Lahore)"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                />
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <label className="font-semibold text-slate-700">Payment Option:</label>
                <div className="space-y-2">
                  <label className="flex items-start gap-2 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'bank'}
                      onChange={() => setPaymentMethod('bank')}
                      className="accent-emerald-700 mt-0.5"
                    />
                    <div>
                      <strong className="text-slate-900 block">Meezan Direct Bank Transfer / IBAN</strong>
                      <span className="text-[11px] text-slate-500">
                        Title: Home Power Solutions | IBAN: PK00MEZN0000000000000000
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-2 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'raast'}
                      onChange={() => setPaymentMethod('raast')}
                      className="accent-emerald-700 mt-0.5"
                    />
                    <div>
                      <strong className="text-slate-900 block">Raast Instant Digital ID</strong>
                      <span className="text-[11px] text-slate-500">Instant 0-fee state bank transfer ID: 03000000000</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-2 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'jazzcash'}
                      onChange={() => setPaymentMethod('jazzcash')}
                      className="accent-emerald-700 mt-0.5"
                    />
                    <div>
                      <strong className="text-slate-900 block">JazzCash / Easypaisa Mobile Wallet</strong>
                      <span className="text-[11px] text-slate-500">Merchant Till: 0300-0000000</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-2 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-emerald-700 mt-0.5"
                    />
                    <div>
                      <strong className="text-slate-900 block">Cash on Delivery / On-Site Inspection</strong>
                      <span className="text-[11px] text-slate-500">Pay courier upon delivery and serial inspection</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-emerald-800 text-xs">
                Total Payable: <strong className="font-mono">Rs {grandTotal.toLocaleString()}</strong>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-medium"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm &amp; Place Solar Order</span>
                </button>
              </div>
            </form>
          )}

          {checkoutStep === 'success' && (
            <div className="space-y-5 text-center py-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Order Successfully Confirmed!</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Thank you, <strong>{customerName}</strong>. Your solar order has been received.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-2 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Order ID:</span>
                  <strong className="text-slate-900">{generatedOrderNum}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment Option:</span>
                  <span className="text-slate-900 uppercase">{paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Amount:</span>
                  <strong className="text-emerald-700">Rs {grandTotal.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Delivery Address:</span>
                  <span className="text-slate-800 truncate max-w-[200px]">{customerAddress}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600">
                Our logistics dispatch desk will call you at <strong>{customerPhone}</strong> to confirm the cargo truck departure.
              </p>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => window.print()}
                  className="py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Formal Order Receipt</span>
                </button>
                <button
                  onClick={() => {
                    onClearCart();
                    setCheckoutStep('cart');
                    onClose();
                  }}
                  className="py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold cursor-pointer"
                >
                  Done &amp; Continue
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer for Cart step */}
        {checkoutStep === 'cart' && items.length > 0 && (
          <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-3">
            <button
              onClick={() => setCheckoutStep('checkout')}
              className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout (Rs {grandTotal.toLocaleString()})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex justify-between items-center text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Clean Energy Equipment</span>
              </span>
              <button
                onClick={onClearCart}
                className="text-slate-400 hover:text-rose-600 underline cursor-pointer"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
