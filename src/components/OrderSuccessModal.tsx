import React from 'react';
import { CheckCircle2, Flame, Bike, Clock, Phone, MapPin } from 'lucide-react';
import { CartItem } from '../types';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: {
    orderId: string;
    customerName: string;
    customerPhone: string;
    address: string;
    paymentMethod: string;
    total: number;
    items: CartItem[];
  } | null;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  onClose,
  orderData,
}) => {
  if (!isOpen || !orderData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#12141c] border border-[#2d3246] rounded-2xl max-w-lg w-full p-6 text-white shadow-2xl relative">
        {/* Success Icon */}
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-3">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest">
            Order Confirmed!
          </span>
          <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mt-1">
            Thank You, {orderData.customerName}!
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 mt-1">
            Your Kababjees Fried Chicken order has been dispatched to the kitchen.
          </p>
        </div>

        {/* Order Reference Box */}
        <div className="mt-5 p-4 rounded-xl bg-[#171a26] border border-[#262a3a] flex items-center justify-between">
          <div>
            <span className="text-[11px] text-neutral-400 block">Order ID</span>
            <span className="font-heading font-extrabold text-base text-white font-mono">
              #{orderData.orderId}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-neutral-400 block">Estimated Time</span>
            <span className="text-sm font-bold text-amber-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> 30 - 35 Mins
            </span>
          </div>
        </div>

        {/* Simulated Live Order Tracker */}
        <div className="mt-4 p-4 rounded-xl bg-[#171a26] border border-[#262a3a]">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wide block mb-3">
            Live Kitchen Status:
          </span>

          <div className="space-y-3 relative pl-2">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">
                ✓
              </div>
              <div>
                <div className="text-xs font-bold text-white">Order Received & Sent to Branch</div>
                <div className="text-[11px] text-neutral-400">Order verified via automated system</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-amber-500/20 text-[#F59E0B] border border-amber-500/40 flex items-center justify-center shrink-0">
                <Flame className="w-4 h-4 fill-[#F59E0B]" />
              </div>
              <div>
                <div className="text-xs font-bold text-amber-300">Crispy Chicken Pressure-Frying Now</div>
                <div className="text-[11px] text-neutral-400">Double-battered with 14 spices</div>
              </div>
            </div>

            <div className="flex items-center gap-3 opacity-60">
              <div className="w-7 h-7 rounded-full bg-[#202434] text-neutral-400 flex items-center justify-center shrink-0">
                <Bike className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-neutral-300">Rider Dispatched</div>
                <div className="text-[11px] text-neutral-500">Piping hot delivery in insulated thermal box</div>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="mt-4 text-xs text-neutral-300 space-y-1.5 p-3 rounded-xl bg-[#0f1118]">
          <div className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
            <span className="truncate">{orderData.address}</span>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-neutral-400">Payment: {orderData.paymentMethod}</span>
            <span className="text-sm font-extrabold text-white font-condensed">
              Total: Rs. {orderData.total.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Contact and close */}
        <div className="mt-5 space-y-3">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl text-xs font-bold text-white bg-[#E11D2A] hover:bg-red-700 transition-colors shadow-lg cursor-pointer"
          >
            Done & Continue Browsing
          </button>

          <div className="flex items-center justify-center gap-2 text-xs text-neutral-400">
            <Phone className="w-3.5 h-3.5 text-red-400" />
            <span>Need updates? Call Karachi Helpline: (021) 111-666-111</span>
          </div>
        </div>
      </div>
    </div>
  );
};
