import React, { useState, useMemo } from 'react';
import { Search, Flame, Plus, Check, SlidersHorizontal, Sparkles } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { MenuItem } from '../types';

interface MenuProps {
  onAddToCart: (item: MenuItem, flavor?: string, drink?: string) => void;
}

export const Menu: React.FC<MenuProps> = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSpicy, setSelectedSpicy] = useState<string>('all');
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [selectedFlavor, setSelectedFlavor] = useState<string>('');
  const [selectedDrink, setSelectedDrink] = useState<string>('');
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  // Filter items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSpicy =
        selectedSpicy === 'all' || (item.spicyLevel && item.spicyLevel === selectedSpicy);
      return matchesCategory && matchesSearch && matchesSpicy;
    });
  }, [activeCategory, searchQuery, selectedSpicy]);

  const handleOpenItem = (item: MenuItem) => {
    // If item has options, open modal; otherwise add directly
    if (item.options?.flavors?.length || item.options?.drinkChoice?.length) {
      setSelectedItemForModal(item);
      setSelectedFlavor(item.options.flavors ? item.options.flavors[0] : '');
      setSelectedDrink(item.options.drinkChoice ? item.options.drinkChoice[0] : '');
    } else {
      triggerAdd(item);
    }
  };

  const triggerAdd = (item: MenuItem, flavor?: string, drink?: string) => {
    onAddToCart(item, flavor, drink);
    setAddedItemNotice(item.id);
    setTimeout(() => {
      setAddedItemNotice((prev) => (prev === item.id ? null : prev));
    }, 1200);
    setSelectedItemForModal(null);
  };

  return (
    <section id="menu" className="py-20 bg-[#0b0c10] border-b border-[#1f2230] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#F59E0B] mb-2">
            <Flame className="w-3.5 h-3.5 fill-[#F59E0B]" />
            Prepared Fresh on Order
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Explore Our <span className="text-[#E11D2A]">Crispy Menu</span>
          </h2>
          <p className="text-neutral-400 mt-3 text-base">
            From our iconic 14-spice crispy fried chicken to monster zingers and loaded cheesy fries, taste Karachi’s crunchiest fast food.
          </p>
        </div>

        {/* Filter Bar: Categories + Search */}
        <div className="space-y-4 mb-10">
          {/* Category Tabs (Segmented control) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#E11D2A] text-white shadow-lg shadow-red-900/30'
                    : 'bg-[#141620] text-neutral-300 hover:text-white hover:bg-[#1f2334] border border-[#262a3a]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search + Spice filter bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search fried chicken, zingers, fries, deals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#141620] border border-[#272b3b] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E11D2A] transition-colors"
              />
            </div>

            {/* Spice Filter Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-[#141620] border border-[#272b3b] rounded-xl self-start sm:self-auto">
              <span className="text-xs text-neutral-400 px-2 font-medium flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Spice:
              </span>
              {(['all', 'Mild', 'Spicy', 'Extra Spicy'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedSpicy(lvl)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    selectedSpicy === lvl
                      ? 'bg-[#232738] text-white border border-[#3b415c]'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {lvl === 'all' ? 'All' : lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#141620] rounded-2xl border border-[#232738]">
            <p className="text-neutral-300 text-lg font-semibold">No food items found matching your filter.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setSelectedSpicy('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-bold text-[#F59E0B] border border-amber-500/40 rounded-lg hover:bg-amber-500/10"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl bg-[#141620] border border-[#25293a] hover:border-[#E11D2A]/60 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/50"
              >
                <div>
                  {/* Item Image with Fallback and Badges */}
                  <div className="relative h-48 w-full bg-[#1b1e2c] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141620] via-transparent to-black/20" />

                    {/* Metadata tags */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      {item.spicyLevel && (
                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1 ${
                            item.spicyLevel === 'Extra Spicy'
                              ? 'bg-red-700 text-white'
                              : item.spicyLevel === 'Spicy'
                              ? 'bg-amber-600 text-white'
                              : 'bg-emerald-700 text-white'
                          }`}
                        >
                          <Flame className="w-3 h-3 fill-current" />
                          {item.spicyLevel}
                        </span>
                      )}
                      {item.popular && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#10121a]/90 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Popular
                        </span>
                      )}
                      {item.isNew && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-600 text-white">
                          NEW
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body details */}
                  <div className="p-4">
                    <h3 className="font-heading font-bold text-base text-white group-hover:text-amber-400 transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1.5 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Footer price & Order button */}
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
                    onClick={() => handleOpenItem(item)}
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
                        <span>Add to Order</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Customizing Options (Flavor / Drink) */}
        {selectedItemForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#141620] border border-[#2e3346] rounded-2xl max-w-md w-full p-6 text-white shadow-2xl relative">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs text-[#F59E0B] font-bold uppercase tracking-wider">Customize Order</span>
                  <h3 className="font-heading font-extrabold text-xl text-white mt-0.5">
                    {selectedItemForModal.name}
                  </h3>
                  <div className="text-sm font-black text-amber-400 font-condensed mt-1">
                    Rs. {selectedItemForModal.price.toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedItemForModal(null)}
                  className="text-neutral-400 hover:text-white p-1 rounded-lg"
                >
                  ✕
                </button>
              </div>

              {/* Flavor selection */}
              {selectedItemForModal.options?.flavors && (
                <div className="mb-4">
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wide mb-2">
                    Select Recipe / Flavor:
                  </label>
                  <div className="space-y-2">
                    {selectedItemForModal.options.flavors.map((flavor) => (
                      <button
                        key={flavor}
                        onClick={() => setSelectedFlavor(flavor)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between border cursor-pointer ${
                          selectedFlavor === flavor
                            ? 'bg-red-950/40 border-[#E11D2A] text-white'
                            : 'bg-[#1b1e2a] border-[#292e3e] text-neutral-300 hover:border-neutral-500'
                        }`}
                      >
                        <span>{flavor}</span>
                        {selectedFlavor === flavor && <Check className="w-4 h-4 text-[#E11D2A]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Drink choice */}
              {selectedItemForModal.options?.drinkChoice && (
                <div className="mb-6">
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wide mb-2">
                    Choose Beverage:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedItemForModal.options.drinkChoice.map((drink) => (
                      <button
                        key={drink}
                        onClick={() => setSelectedDrink(drink)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between border cursor-pointer ${
                          selectedDrink === drink
                            ? 'bg-red-950/40 border-[#E11D2A] text-white'
                            : 'bg-[#1b1e2a] border-[#292e3e] text-neutral-300 hover:border-neutral-500'
                        }`}
                      >
                        <span className="truncate">{drink}</span>
                        {selectedDrink === drink && <Check className="w-3.5 h-3.5 text-[#E11D2A] shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setSelectedItemForModal(null)}
                  className="flex-1 py-3 rounded-xl text-xs font-bold text-neutral-300 bg-[#1b1e2a] hover:bg-[#25293a] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => triggerAdd(selectedItemForModal, selectedFlavor, selectedDrink)}
                  className="flex-1 py-3 rounded-xl text-xs font-bold text-white bg-[#E11D2A] hover:bg-red-700 transition-colors shadow-lg shadow-red-900/40"
                >
                  Add to Cart · Rs. {selectedItemForModal.price.toLocaleString()}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
