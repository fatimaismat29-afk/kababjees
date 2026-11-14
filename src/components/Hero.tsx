import React from 'react';
import { ArrowRight, Flame, ShieldCheck, Clock, Award, Star } from 'lucide-react';

interface HeroProps {
  onExploreMenu: () => void;
  onOrderNow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onOrderNow }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0b0c10] via-[#11131a] to-[#0b0c10] pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-[#1f2230]">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Editorial brand kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#181a24] border border-[#2c3042] text-xs font-semibold text-neutral-300">
              <span className="flex items-center gap-1.5 text-[#F59E0B]">
                <Flame className="w-3.5 h-3.5 fill-[#F59E0B]" />
                Karachi’s Favorite Crispy Chicken
              </span>
              <span className="text-neutral-500">·</span>
              <span className="text-neutral-400">100% Fresh Halal Poultry</span>
            </div>

            {/* Prompt's exact bold headline */}
            <h1 className="font-heading font-black text-4xl sm:text-6xl xl:text-7xl tracking-tight text-white uppercase leading-[1.05] text-balance">
              CRISPY. <span className="text-[#E11D2A] text-shadow">JUICY.</span> <br />
              <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent">
                IRRESISTIBLE.
              </span>
            </h1>

            {/* Prompt's exact subtitle */}
            <p className="text-lg sm:text-xl text-neutral-300 max-w-xl font-normal leading-relaxed">
              Experience the ultimate fried chicken taste at Kababjees Fried Chicken. Crafted with our secret 14-spice coating, pressure-fried to mouth-watering golden perfection.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <button
                onClick={onOrderNow}
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-extrabold text-white bg-gradient-to-r from-[#E11D2A] via-[#d01824] to-[#b9151f] hover:from-[#d01824] hover:to-[#9f0f18] shadow-xl shadow-red-900/40 hover:shadow-red-800/60 transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-7 py-4 rounded-xl text-base font-bold text-neutral-100 bg-[#161823] hover:bg-[#202332] border border-[#2d3143] hover:border-amber-500/40 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Explore Our Menu</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-[#1e212d] grid grid-cols-3 gap-4 w-full">
              <div className="flex flex-col">
                <span className="text-xs text-neutral-400 flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Halal
                </span>
                <span className="text-sm font-bold text-white mt-0.5">Certified Fresh</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-neutral-400 flex items-center gap-1.5 font-medium">
                  <Clock className="w-4 h-4 text-[#F59E0B]" /> 35-Min Delivery
                </span>
                <span className="text-sm font-bold text-white mt-0.5">Hot Across Karachi</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-neutral-400 flex items-center gap-1.5 font-medium">
                  <Award className="w-4 h-4 text-red-500" /> 14 Secret Spices
                </span>
                <span className="text-sm font-bold text-white mt-0.5">Signature Recipe</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Golden frame background accent */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-[#E11D2A] via-[#F59E0B] to-transparent rounded-3xl opacity-40 blur-xl"></div>

              {/* Main Card */}
              <div className="relative rounded-2xl overflow-hidden bg-[#141620] border border-[#2b2f42] shadow-2xl">
                <img
                  src="/src/assets/images/hero_fried_chicken_1793884337139.jpg"
                  alt="Kababjees Crispy Fried Chicken Bucket"
                  className="w-full h-80 sm:h-96 object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e14] via-black/20 to-transparent pointer-events-none" />

                {/* Floated Hot Deal Callout */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0f1118]/90 backdrop-blur-md border border-[#2d3143] flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-[#F59E0B] tracking-wider uppercase">
                      Special Karachi Combo
                    </span>
                    <span className="text-sm font-bold text-white">Mega 8-Pc Family Bucket</span>
                    <span className="text-xs text-neutral-400">8 Pcs Chicken + 2 Zingers + Large Fries</span>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <span className="block text-xs line-through text-neutral-500">Rs. 3,040</span>
                    <span className="text-lg font-black text-white font-condensed">Rs. 2,490</span>
                  </div>
                </div>
              </div>

              {/* Rating floating tag */}
              <div className="absolute -top-4 -right-3 sm:-right-4 px-3.5 py-2 rounded-xl bg-[#151722]/95 border border-[#32364c] shadow-xl flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">4.8 / 5.0 Rating</div>
                  <div className="text-[10px] text-neutral-400">25,000+ Karachi Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
