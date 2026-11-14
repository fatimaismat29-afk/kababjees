import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, MapPin, Phone, User, CreditCard, Banknote } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  orderDetails: {
    orderType: 'delivery' | 'pickup';
    area: string;
    subtotal: number;
    deliveryFee: number;
    total: number;
    specialNotes: string;
  };
  onOrderSuccess: (orderData: {
    orderId: string;
    customerName: string;
    customerPhone: string;
    address: string;
    paymentMethod: string;
    total: number;
    items: CartItem[];
  }) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  orderDetails,
  onOrderSuccess,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');
  const [errors, setErrors] = useState<{ name?: string; phone?: string; address?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; phone?: string; address?: string } = {};

    if (!customerName.trim()) {
      newErrors.name = 'Please provide your name';
    }
    if (!customerPhone.trim() || customerPhone.length < 10) {
      newErrors.phone = 'Please enter a valid Pakistani mobile number (e.g. 0300-1234567)';
    }
    if (orderDetails.orderType === 'delivery' && !deliveryAddress.trim()) {
      newErrors.address = 'Please enter complete Karachi street & house address';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedOrderId = `KFC-${Math.floor(1000 + Math.random() * 9000)}`;
      onOrderSuccess({
        orderId: generatedOrderId,
        customerName,
        customerPhone,
        address: orderDetails.orderType === 'delivery' ? `${deliveryAddress}, ${orderDetails.area}, Karachi` : `Pickup at Flagship Shaheed-e-Millat Branch, Karachi`,
        paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Card on Delivery',
        total: orderDetails.total,
        items,
      });
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-[#12141c] border border-[#2b2f42] rounded-2xl max-w-xl w-full p-6 text-white shadow-2xl relative my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#232737]">
          <div>
            <span className="text-[11px] font-bold text-[#F59E0B] uppercase tracking-wider">
              {orderDetails.orderType === 'delivery' ? 'Express Delivery' : 'Takeaway Pickup'}
            </span>
            <h3 className="font-heading font-extrabold text-2xl text-white mt-0.5">
              Complete Your Order
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-[#1a1d28] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {/* Order Summary Snapshot */}
          <div className="p-3.5 rounded-xl bg-[#171a25] border border-[#262a3a] flex items-center justify-between text-xs">
            <div>
              <span className="text-neutral-400">Order Total ({items.length} items):</span>
              <div className="font-black text-amber-400 text-lg font-condensed">
                Rs. {orderDetails.total.toLocaleString()}
              </div>
            </div>
            <div className="text-right text-neutral-300">
              <span className="font-semibold block">Karachi, Pakistan</span>
              <span className="text-[11px] text-neutral-400">30 - 40 Mins Express</span>
            </div>
          </div>

          {/* Customer Name */}
          <div>
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wide mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="e.g. Tariq Mehmood"
                value={customerName}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                className={`w-full bg-[#181a26] border rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E11D2A] ${
                  errors.name ? 'border-red-500' : 'border-[#2c3042]'
                }`}
              />
            </div>
            {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
          </div>

          {/* Contact Mobile */}
          <div>
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wide mb-1">
              Karachi Mobile Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                placeholder="e.g. 0300-1234567"
                value={customerPhone}
                onChange={(e) => {
                  setCustomerPhone(e.target.value);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                className={`w-full bg-[#181a26] border rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E11D2A] ${
                  errors.phone ? 'border-red-500' : 'border-[#2c3042]'
                }`}
              />
            </div>
            {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
          </div>

          {/* Delivery Address (if Delivery) */}
          {orderDetails.orderType === 'delivery' && (
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wide mb-1">
                Delivery Address in {orderDetails.area} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                <textarea
                  rows={2}
                  placeholder="House/Apartment #, Street, Near landmark..."
                  value={deliveryAddress}
                  onChange={(e) => {
                    setDeliveryAddress(e.target.value);
                    if (errors.address) setErrors((prev) => ({ ...prev, address: undefined }));
                  }}
                  className={`w-full bg-[#181a26] border rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#E11D2A] ${
                    errors.address ? 'border-red-500' : 'border-[#2c3042]'
                  }`}
                />
              </div>
              {errors.address && <p className="text-xs text-red-400 mt-1">{errors.address}</p>}
            </div>
          )}

          {/* Payment Method */}
          <div>
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wide mb-2">
              Payment Method:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border flex items-center gap-3 transition-colors text-left cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'bg-red-950/40 border-[#E11D2A] text-white'
                    : 'bg-[#181a26] border-[#2c3042] text-neutral-400'
                }`}
              >
                <Banknote className="w-5 h-5 text-amber-400" />
                <div>
                  <div className="text-xs font-bold text-white">Cash on Delivery</div>
                  <div className="text-[10px] text-neutral-400">Pay cash upon arrival</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border flex items-center gap-3 transition-colors text-left cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'bg-red-950/40 border-[#E11D2A] text-white'
                    : 'bg-[#181a26] border-[#2c3042] text-neutral-400'
                }`}
              >
                <CreditCard className="w-5 h-5 text-amber-400" />
                <div>
                  <div className="text-xs font-bold text-white">Card on Delivery</div>
                  <div className="text-[10px] text-neutral-400">Rider carries POS machine</div>
                </div>
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-[#232737] flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-5 rounded-xl text-xs font-bold text-neutral-300 bg-[#181a26] hover:bg-[#202332] transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3.5 rounded-xl text-sm font-extrabold text-white bg-gradient-to-r from-[#E11D2A] to-[#b9151f] hover:from-[#c91823] hover:to-[#9f0f18] transition-all shadow-lg shadow-red-950/60 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Order · Rs. {orderDetails.total.toLocaleString()}</span>
                </>
              )}
            </button>
          </div>

          <div className="text-center text-[11px] text-neutral-400 flex items-center justify-center gap-1.5 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Guaranteed fresh & piping hot · Karachi Fast Food Service</span>
          </div>
        </form>
      </div>
    </div>
  );
};
