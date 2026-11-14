import React from 'react';
import { ShieldCheck, HeartHandshake, Flame, Sparkles, Utensils, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#0d0f15] border-b border-[#1f2230] relative overflow-hidden">
      {/* Decorative background lighting */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Heritage */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#F59E0B]">
              <Sparkles className="w-3.5 h-3.5" />
              The Kababjees Heritage & Passion
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              Crafting Karachi’s Most <span className="text-[#E11D2A]">Iconic Crunch</span>
            </h2>

            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
              Born from Karachi’s world-renowned passion for authentic taste and culinary mastery, <strong className="text-white font-semibold">Kababjees Fried Chicken</strong> was created with a single obsession: to serve fried chicken that is truly shatteringly crispy on the outside, and burstingly juicy on the inside.
            </p>

            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              We never use frozen chicken. Every single piece is hand-selected 100% grain-fed fresh poultry, marinated in our secret 14-spice blend for 12 hours, double-dusted in our proprietary seasoned flour, and pressure-cooked at exact temperatures to lock in every drop of natural juice.
            </p>

            {/* 4 Pillars of Excellence */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#141620] border border-[#272b3b] space-y-1.5">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Halal & Fresh Daily</span>
                </div>
                <p className="text-xs text-neutral-400 leading-normal">
                  Sourced daily from certified poultry suppliers. Zero preservatives, zero frozen meat.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#141620] border border-[#272b3b] space-y-1.5">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Flame className="w-4 h-4 text-[#F59E0B] shrink-0" />
                  <span>Secret 14-Spice Crunch</span>
                </div>
                <p className="text-xs text-neutral-400 leading-normal">
                  Proprietary herb & spice batter formula that delivers an unmatched savory crunch.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#141620] border border-[#272b3b] space-y-1.5">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Utensils className="w-4 h-4 text-red-500 shrink-0" />
                  <span>Precision Pressure Fryers</span>
                </div>
                <p className="text-xs text-neutral-400 leading-normal">
                  Commercial pressure frying seals moisture instantly, leaving chicken golden and non-greasy.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#141620] border border-[#272b3b] space-y-1.5">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <HeartHandshake className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Customer Satisfaction</span>
                </div>
                <p className="text-xs text-neutral-400 leading-normal">
                  Serving over a million satisfied foodies with rapid delivery and warm Karachi hospitality.
                </p>
              </div>
            </div>

            {/* Quality Checklist */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-neutral-300 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> ISO Food Safety Standards
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Temperature Monitored Kitchens
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 100% Trans-Fat Free Oil
              </span>
            </div>
          </div>

          {/* Right Column: Visual Brand Platter */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden bg-[#141620] border border-[#2c3042] shadow-2xl">
              <img
                src="/src/assets/images/crispy_chicken_platter_1793884338397.jpg"
                alt="Kababjees Fried Chicken Master Preparation"
                className="w-full h-[420px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1017] via-transparent to-black/30 pointer-events-none" />

              {/* Floating quote badge */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#0f1118]/90 backdrop-blur-md border border-[#2d3143]">
                <p className="text-xs text-neutral-300 italic font-medium leading-relaxed">
                  "At Kababjees, great taste isn’t an accident. It’s a relentless commitment to fresh ingredients, bold Pakistani spice heritage, and uncompromising quality."
                </p>
                <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#F59E0B] font-bold uppercase tracking-wider">
                  <span>Kababjees Culinary Team</span>
                  <span>Karachi, Pakistan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
