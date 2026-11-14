import React from 'react';
import { Sparkles, Users, Check, Plus, ArrowRight } from 'lucide-react';
import { SPECIAL_OFFERS } from '../data/menuData';
import { DealItem } from '../types';

interface DealsProps {
  onAddDealToCart: (deal: DealItem) => void;
}

export const Deals: React.FC<DealsProps> = ({ onAddDealToCart }) => {
  return (
    <section id="deals" className="py-20 bg-[#0d0f15] border-b border-[#1f2230] relative overflow-hidden">
      {/* Subtle radial highlight */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#F59E0B] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Limited-Time Super Savers
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Special Offers & <span className="text-[#E11D2A]">Family Meals</span>
            </h2>
            <p className="text-neutral-400 mt-2 max-w-xl text-base">
              Massive savings on our biggest crunch combos, bucket feasts, and party meals made for sharing across Karachi.
            </p>
          </div>

          <a
            href="#menu"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#F59E0B] hover:text-amber-300 transition-colors group self-start md:self-auto"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPECIAL_OFFERS.map((deal) => (
            <div
              key={deal.id}
              className="group rounded-2xl bg-[#141620] border border-[#272b3c] hover:border-[#E11D2A]/60 transition-all duration-300 flex flex-col overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-red-950/30"
            >
              {/* Image banner with discount badge */}
              <div className="relative h-48 overflow-hidden bg-[#1a1d2b]">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141620] via-transparent to-black/30" />

                {/* Discount Tag */}
                <div className="absolute top-3 left-3 bg-[#E11D2A] text-white text-[11px] font-black tracking-wider px-2.5 py-1 rounded-md shadow-md uppercase">
                  {deal.discountBadge}
                </div>

                {/* Serving size */}
                <div className="absolute bottom-3 right-3 bg-[#0d0e14]/80 backdrop-blur-sm text-neutral-300 text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1.5 border border-[#2b2f42]">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  <span>{deal.serves}</span>
                </div>
              </div>

              {/* Deal Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg text-white group-hover:text-amber-400 transition-colors leading-snug">
                    {deal.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 mb-4 font-medium">
                    {deal.subtitle}
                  </p>

                  {/* Included items */}
                  <ul className="space-y-2 mb-6 border-t border-[#232636] pt-3 text-xs text-neutral-300">
                    {deal.itemsIncluded.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & Add Button */}
                <div className="pt-4 border-t border-[#232636] flex items-center justify-between">
                  <div>
                    <span className="block text-xs line-through text-neutral-500 tabular-nums">
                      Rs. {deal.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-xl font-black text-white font-condensed tabular-nums">
                      Rs. {deal.price.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => onAddDealToCart(deal)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#E11D2A] hover:bg-red-700 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-red-950/50"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Claim Deal</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
