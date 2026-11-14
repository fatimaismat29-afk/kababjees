import React, { useState } from 'react';
import { Hero } from './Hero';
import { 
  Flame, 
  MapPin, 
  Bike, 
  Clock, 
  Star, 
  ShieldCheck, 
  ArrowRight, 
  Plus, 
  Check, 
  Sparkles, 
  PhoneCall, 
  ThumbsUp,
  Award,
  ChevronRight
} from 'lucide-react';
import { MENU_ITEMS, SPECIAL_OFFERS, KARACHI_BRANCHES } from '../data/menuData';
import { MenuItem, DealItem } from '../types';

interface HomePageProps {
  onNavigate: (page: 'home' | 'menu' | 'deals' | 'about' | 'gallery' | 'locations') => void;
  onAddToCart: (item: MenuItem) => void;
  onAddDealToCart: (deal: DealItem) => void;
  onOpenOrder: () => void;
}

const KARACHI_ZONES = [
  { name: 'Clifton & Sea View', estTime: '30 mins', active: true },
  { name: 'DHA Phase 1 to 8', estTime: '30 mins', active: true },
  { name: 'PECHS & Bahadurabad', estTime: '25 mins', active: true },
  { name: 'Gulshan-e-Iqbal', estTime: '30 mins', active: true },
  { name: 'North Nazimabad', estTime: '35 mins', active: true },
  { name: 'Gulistan-e-Jauhar', estTime: '35 mins', active: true },
  { name: 'Malir & Model Colony', estTime: '40 mins', active: true },
  { name: 'KDA & Tipu Sultan', estTime: '25 mins', active: true },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Hamza Siddiqui',
    area: 'Clifton Block 4, Karachi',
    rating: 5,
    comment: 'Best zinger in Karachi hands down! The crunch stays shatteringly crisp even after delivery. The garlic sauce is unbeatable.',
    itemOrdered: 'Mighty Double Crunch Zinger',
  },
  {
    id: 2,
    name: 'Dr. Ayesha Tariq',
    area: 'DHA Phase 6, Karachi',
    rating: 5,
    comment: 'The 8-piece family bucket has become our Friday weekend ritual. 100% fresh chicken, perfectly spiced, never greasy.',
    itemOrdered: 'Mega 8-Pc Family Bucket',
  },
  {
    id: 3,
    name: 'Bilal Ahmed',
    area: 'Gulshan-e-Iqbal Block 13-C, Karachi',
    rating: 5,
    comment: 'Loaded cheesy fries are simply addictive! Generous chunks of crispy chicken and jalapenos smothered in real cheese.',
    itemOrdered: 'Supreme Loaded Cheesy Fries',
  },
];

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onAddToCart,
  onAddDealToCart,
  onOpenOrder,
}) => {
  const [selectedZone, setSelectedZone] = useState(KARACHI_ZONES[0]);
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  // Top 4 featured items
  const featuredBestsellers = [
    MENU_ITEMS.find((i) => i.id === 'zinger-classic')!,
    MENU_ITEMS.find((i) => i.id === 'kfc-orig-2pc')!,
    MENU_ITEMS.find((i) => i.id === 'loaded-cheese-fries')!,
    MENU_ITEMS.find((i) => i.id === 'deal-family-8pc')!,
  ].filter(Boolean);

  const heroDeal = SPECIAL_OFFERS[0]; // Mega Feast Bucket

  const handleQuickAdd = (item: MenuItem) => {
    onAddToCart(item);
    setAddedItemNotice(item.id);
    setTimeout(() => {
      setAddedItemNotice((prev) => (prev === item.id ? null : prev));
    }, 1200);
  };

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <Hero
        onExploreMenu={() => onNavigate('menu')}
        onOrderNow={onOpenOrder}
      />

      {/* 2. Karachi Express Delivery Zone Bar */}
      <section className="bg-[#12141d] border-b border-[#202434] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#161824] border border-[#272b3c] flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-[#F59E0B] flex items-center justify-center shrink-0">
                <Bike className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-extrabold text-white text-sm sm:text-base">
                    Fast Karachi Delivery Checker
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    Live Now
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Select your neighborhood to verify delivery speed to your doorstep
                </p>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-1 sm:w-64">
                <MapPin className="w-4 h-4 text-red-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={selectedZone.name}
                  onChange={(e) => {
                    const found = KARACHI_ZONES.find((z) => z.name === e.target.value);
                    if (found) setSelectedZone(found);
                  }}
                  className="w-full bg-[#1e2232] border border-[#30364c] rounded-xl pl-9 pr-8 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-[#E11D2A] cursor-pointer"
                >
                  {KARACHI_ZONES.map((z) => (
                    <option key={z.name} value={z.name} className="bg-[#141620]">
                      {z.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="px-4 py-2.5 rounded-xl bg-[#0f1118] border border-[#2b2f42] flex items-center gap-2 shrink-0">
                <Clock className="w-4 h-4 text-[#F59E0B]" />
                <div className="text-xs">
                  <span className="text-neutral-400 block text-[10px]">Est. Time:</span>
                  <span className="font-bold text-white">{selectedZone.estTime}</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('menu')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#E11D2A] hover:bg-red-700 transition-colors shrink-0 shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Order to {selectedZone.name.split(' ')[0]}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Bestsellers ("Karachi's Top Picks") */}
      <section className="py-16 sm:py-20 bg-[#0b0c10] border-b border-[#1f2230]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#F59E0B] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Customer Favorites
              </div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                Karachi’s Most <span className="text-[#E11D2A]">Ordered Items</span>
              </h2>
              <p className="text-neutral-400 mt-1 text-sm max-w-lg">
                Fresh out of the fryer! The signature dishes that Karachi food lovers order round the clock.
              </p>
            </div>

            <button
              onClick={() => onNavigate('menu')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#F59E0B] hover:text-amber-300 transition-colors group cursor-pointer self-start sm:self-auto"
            >
              <span>Explore All {MENU_ITEMS.length} Menu Items</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBestsellers.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl bg-[#141620] border border-[#272b3b] hover:border-[#E11D2A]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-red-950/20"
              >
                <div>
                  <div className="relative h-48 w-full bg-[#1b1e2c] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141620] via-transparent to-black/20" />
                    
                    <div className="absolute top-2.5 left-2.5 bg-[#E11D2A] text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow">
                      Top Seller
                    </div>

                    {item.spicyLevel && (
                      <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-sm text-neutral-200 text-[10px] font-semibold px-2 py-0.5 rounded border border-[#2b2f42] flex items-center gap-1">
                        <Flame className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />
                        <span>{item.spicyLevel}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-heading font-bold text-base text-white group-hover:text-amber-400 transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1.5 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 mt-auto border-t border-[#202434] flex items-center justify-between">
                  <div className="pt-3">
                    {item.originalPrice && (
                      <span className="block text-[11px] line-through text-neutral-500 tabular-nums">
                        Rs. {item.originalPrice.toLocaleString()}
                      </span>
                    )}
                    <span className="text-lg font-black text-white font-condensed tabular-nums">
                      Rs. {item.price.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => handleQuickAdd(item)}
                    className={`mt-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
                      addedItemNotice === item.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#E11D2A] text-white hover:bg-red-700 active:scale-95'
                    }`}
                  >
                    {addedItemNotice === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Special Deal Spotlight Banner */}
      <section className="py-16 bg-[#0f1118] border-b border-[#1f2230] relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="rounded-3xl bg-gradient-to-r from-[#171a26] via-[#151722] to-[#1a1215] border border-[#2b3044] p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Offer Details */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E11D2A] text-white text-xs font-black uppercase tracking-wider shadow">
                  Deal of the Day · Save Rs. 550
                </div>

                <h3 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                  KABABJEES MEGA <br />
                  <span className="text-[#F59E0B]">8-PC FAMILY FEAST</span>
                </h3>

                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-xl">
                  Feed the whole crew with 8 crispy chicken pieces, 2 juicy zinger burgers, large golden crinkle fries, 4 warm dinner rolls, and a 1.5L chilled drink.
                </p>

                <div className="flex items-baseline gap-3 pt-2">
                  <span className="text-3xl sm:text-4xl font-black text-white font-condensed tabular-nums">
                    Rs. {heroDeal.price.toLocaleString()}
                  </span>
                  <span className="text-base line-through text-neutral-500 tabular-nums">
                    Rs. {heroDeal.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    Serves 4 - 5 Persons
                  </span>
                </div>

                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onAddDealToCart(heroDeal)}
                    className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-[#E11D2A] to-[#b9151f] hover:from-[#d01824] hover:to-[#9f0f18] shadow-lg shadow-red-950/60 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Claim Deal Now</span>
                  </button>
                  <button
                    onClick={() => onNavigate('deals')}
                    className="px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-neutral-200 bg-[#1e2232] hover:bg-[#272c40] border border-[#31374f] transition-colors cursor-pointer"
                  >
                    View All Deals
                  </button>
                </div>
              </div>

              {/* Right Column: Visual */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden border border-[#343a50] shadow-2xl">
                  <img
                    src="/src/assets/images/hero_fried_chicken_1793884337139.jpg"
                    alt="Kababjees Mega Feast Deal"
                    className="w-full h-72 sm:h-80 object-cover object-center transform hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why Kababjees Crunch is Unmatched */}
      <section className="py-16 sm:py-20 bg-[#0b0c10] border-b border-[#1f2230]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#F59E0B] mb-2">
              <Award className="w-3.5 h-3.5" />
              The Gold Standard
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              Why Karachi Loves Our <span className="text-[#E11D2A]">Fried Chicken</span>
            </h2>
            <p className="text-neutral-400 mt-2 text-sm sm:text-base">
              No shortcuts, no compromises. Here is how we deliver perfection in every single bite.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#141620] border border-[#262a3a] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-red-600/20 text-[#E11D2A] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-base text-white">100% Fresh Poultry</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                We strictly reject frozen imported meat. Every batch is farm-fresh grain-fed chicken delivered daily under cold chain controls.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141620] border border-[#262a3a] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-[#F59E0B] flex items-center justify-center">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-base text-white">Secret 14-Spice Batter</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Hand-coated in our proprietary blend of 14 herbs and aromatic spices, marinated for 12 hours for deep flavor in every fiber.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141620] border border-[#262a3a] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-base text-white">Commercial Pressure Frying</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Our high-pressure fryers instantly seal in natural juices, creating a paper-thin shatteringly crispy crust without excess grease.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141620] border border-[#262a3a] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Bike className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-base text-white">Piping Hot Delivery</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Dispatched in thermal insulated delivery boxes to ensure your chicken arrives just as crunchy and piping hot as dine-in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Karachi Foodies Testimonials */}
      <section className="py-16 sm:py-20 bg-[#0d0f15] border-b border-[#1f2230]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#F59E0B] mb-2">
                <ThumbsUp className="w-3.5 h-3.5" />
                Verified Reviews
              </div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                What Karachiites <span className="text-[#E11D2A]">Say About Us</span>
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-neutral-300">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span>4.8 / 5.0 Rating (25,000+ Reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-2xl bg-[#141620] border border-[#262a3a] flex flex-col justify-between space-y-4 shadow-lg"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(t.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#232737] flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-heading font-bold text-white">{t.name}</h4>
                    <span className="text-[11px] text-neutral-400">{t.area}</span>
                  </div>
                  <span className="text-[10px] text-[#F59E0B] bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20">
                    {t.itemOrdered}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Midnight Cravings & Hotline Callout */}
      <section className="py-12 bg-gradient-to-r from-[#E11D2A] via-[#c2141f] to-[#991b1b] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-300 block mb-1">
                Midnight Cravings Covered Till 3:00 AM
              </span>
              <h3 className="font-heading font-black text-2xl sm:text-3xl tracking-tight">
                Craving Hot Fried Chicken Right Now in Karachi?
              </h3>
              <p className="text-xs sm:text-sm text-red-100 mt-1 max-w-lg">
                Order online in 2 minutes or dial our Karachi UAN delivery helpline for instant support.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href="tel:021111666111"
                className="px-5 py-3 rounded-xl bg-[#0b0c10] hover:bg-[#151722] text-white text-xs font-bold transition-all shadow-lg flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#F59E0B]" />
                <span>Call (021) 111-666-111</span>
              </a>

              <button
                onClick={onOpenOrder}
                className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black uppercase tracking-wider transition-all shadow-lg cursor-pointer"
              >
                Order Online
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Karachi Branches Quick Strip */}
      <section className="py-16 bg-[#0b0c10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#F59E0B] mb-1">
                <MapPin className="w-3.5 h-3.5" />
                Find Us Near You
              </div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                Visit Our Karachi Outlets
              </h2>
            </div>

            <button
              onClick={() => onNavigate('locations')}
              className="text-xs font-bold text-[#F59E0B] hover:text-amber-300 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
            >
              <span>View Interactive Map & Directions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {KARACHI_BRANCHES.map((b) => (
              <div
                key={b.id}
                onClick={() => onNavigate('locations')}
                className="p-3.5 rounded-xl bg-[#141620] border border-[#242838] hover:border-amber-500/50 transition-colors cursor-pointer text-center"
              >
                <span className="font-heading font-bold text-xs text-white block truncate">
                  {b.name.split(' ')[0]}
                </span>
                <span className="text-[11px] text-neutral-400 block truncate mt-0.5">
                  {b.area.split('/')[0]}
                </span>
                <span className="text-[10px] text-[#F59E0B] block mt-1">Open till 3 AM</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
