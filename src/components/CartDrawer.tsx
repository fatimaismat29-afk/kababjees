import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Bike, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: (orderDetails: {
    orderType: 'delivery' | 'pickup';
    area: string;
    subtotal: number;
    deliveryFee: number;
    total: number;
    specialNotes: string;
  }) => void;
}

const KARACHI_AREAS = [
  'Clifton (Blocks 1-9)',
  'DHA Phase 1 - 8',
  'PECHS / Tariq Road',
  'Bahadurabad / Sharfabad',
  'Gulshan-e-Iqbal (Blocks 1-19)',
  'Gulistan-e-Jauhar',
  'North Nazimabad',
  'Federal B Area',
  'KDA Scheme 1 / Tipu Sultan',
  'Malir Cantt / Model Colony',
  'Saddar / Garden',
];

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [selectedArea, setSelectedArea] = useState<string>(KARACHI_AREAS[0]);
  const [specialNotes, setSpecialNotes] = useState<string>('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const deliveryFee = orderType === 'delivery' ? (subtotal > 2000 ? 0 : 150) : 0;
  const total = subtotal + deliveryFee;

  const handleCheckoutClick = () => {
    onProceedToCheckout({
      orderType,
      area: selectedArea,
      subtotal,
      deliveryFee,
      total,
      specialNotes,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#12141c] border-l border-[#272b3c] w-full max-w-md h-full flex flex-col text-white shadow-2xl relative">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#232737] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-600/20 text-[#E11D2A] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg text-white">Your Food Basket</h3>
              <span className="text-xs text-neutral-400">
                {items.length} {items.length === 1 ? 'item' : 'items'} selected
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-[#1a1d28] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Type Toggle (Delivery vs Pickup) */}
        <div className="p-4 bg-[#0e1017] border-b border-[#202434]">
          <div className="grid grid-cols-2 gap-2 p-1 bg-[#171923] rounded-xl border border-[#272b3b]">
            <button
              onClick={() => setOrderType('delivery')}
              className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                orderType === 'delivery'
                  ? 'bg-[#E11D2A] text-white shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Bike className="w-3.5 h-3.5" />
              <span>Karachi Delivery</span>
            </button>
            <button
              onClick={() => setOrderType('pickup')}
              className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                orderType === 'pickup'
                  ? 'bg-[#E11D2A] text-white shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Takeaway Pickup</span>
            </button>
          </div>

          {orderType === 'delivery' && (
            <div className="mt-3">
              <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                Delivering to Karachi Area:
              </label>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full bg-[#171a26] border border-[#2c3143] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E11D2A]"
              >
                {KARACHI_AREAS.map((area) => (
                  <option key={area} value={area} className="bg-[#12141c]">
                    {area}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-400">
              <ShoppingBag className="w-14 h-14 text-neutral-600 mb-3 stroke-1" />
              <p className="text-base font-bold text-neutral-200">Your basket is empty</p>
              <p className="text-xs text-neutral-400 mt-1 max-w-xs">
                Explore our crispy fried chicken, zingers, and combo meals to add delicious food to your order.
              </p>
            </div>
          ) : (
            items.map((item, index) => (
              <div
                key={`${item.menuItem.id}-${index}`}
                className="p-3.5 rounded-xl bg-[#171a25] border border-[#272b3c] flex gap-3 items-center justify-between"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading font-bold text-sm text-white truncate">
                    {item.menuItem.name}
                  </h4>
                  {(item.selectedFlavor || item.selectedDrink) && (
                    <p className="text-[11px] text-[#F59E0B] font-medium truncate mt-0.5">
                      {[item.selectedFlavor, item.selectedDrink].filter(Boolean).join(' · ')}
                    </p>
                  )}
                  <div className="text-xs font-black text-neutral-200 mt-1 font-condensed tabular-nums">
                    Rs. {(item.menuItem.price * item.quantity).toLocaleString()}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center bg-[#0f1118] border border-[#2d3246] rounded-lg">
                    <button
                      onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                      className="p-1.5 text-neutral-400 hover:text-white transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-white tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                      className="p-1.5 text-neutral-400 hover:text-white transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(index)}
                    className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}

          {items.length > 0 && (
            <div className="pt-2">
              <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                Special Kitchen Instructions (Optional):
              </label>
              <input
                type="text"
                placeholder="e.g. Extra napkins, chili sauce, call upon arrival..."
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                className="w-full bg-[#171a25] border border-[#272b3c] rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E11D2A]"
              />
            </div>
          )}
        </div>

        {/* Footer Billing & Checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#232737] bg-[#0f1118] space-y-3">
            <div className="space-y-1.5 text-xs text-neutral-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-white tabular-nums">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Karachi Delivery Fee</span>
                <span className="font-semibold text-white tabular-nums">
                  {orderType === 'pickup' ? (
                    'Free (Takeaway)'
                  ) : deliveryFee === 0 ? (
                    <span className="text-emerald-400 font-bold">FREE (Orders &gt; Rs. 2,000)</span>
                  ) : (
                    `Rs. ${deliveryFee}`
                  )}
                </span>
              </div>
              <div className="pt-2 border-t border-[#232636] flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">Estimated Total</span>
                <span className="text-2xl font-black text-[#F59E0B] font-condensed tabular-nums">
                  Rs. {total.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckoutClick}
              className="w-full py-3.5 rounded-xl text-sm font-extrabold text-white bg-gradient-to-r from-[#E11D2A] to-[#b9151f] hover:from-[#c91823] hover:to-[#9f0f18] shadow-lg shadow-red-950/50 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center flex items-center justify-center gap-1.5 text-[11px] text-neutral-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cash on Delivery & Online Card accepted</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
