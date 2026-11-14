import React, { useState } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Flame, PhoneCall } from 'lucide-react';

export type PageView = 'home' | 'menu' | 'deals' | 'about' | 'gallery' | 'locations';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenOrder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenOrder,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0b0c10]/95 backdrop-blur-md border-b border-[#232634]">
      {/* Top Hotline Bar for Karachi */}
      <div className="bg-[#E11D2A] text-white text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-300"></span>
            <span>Hot & Fresh Fried Chicken Across Karachi · 35-Min Express Delivery</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs font-semibold">
            <a href="tel:021111666111" className="hover:underline flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5" /> UAN: (021) 111-666-111
            </a>
            <span>·</span>
            <span>Open Daily: 12:00 PM – 3:00 AM</span>
          </div>
        </div>
      </div>

      {/* Main Top Bar: Strict 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element Brand Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 shrink-0 group text-left cursor-pointer"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#E11D2A] to-[#991b1b] flex items-center justify-center shadow-lg shadow-red-900/30 group-hover:scale-105 transition-transform">
            <Flame className="w-6 h-6 text-amber-300 fill-amber-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-white leading-none">
              KABABJEES
            </span>
            <span className="font-condensed font-bold text-xs sm:text-sm tracking-widest text-[#F59E0B] uppercase">
              Fried Chicken · Karachi
            </span>
          </div>
        </button>

        {/* Zone 2: 5 clean single-line nav links including Home */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold tracking-wide">
          <button
            onClick={() => handleNavClick('home')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentPage === 'home'
                ? 'text-[#F59E0B] border-b-2 border-[#F59E0B] pb-0.5'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('menu')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentPage === 'menu'
                ? 'text-[#F59E0B] border-b-2 border-[#F59E0B] pb-0.5'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            Our Menu
          </button>
          <button
            onClick={() => handleNavClick('deals')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentPage === 'deals'
                ? 'text-[#F59E0B] border-b-2 border-[#F59E0B] pb-0.5'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            Special Deals
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentPage === 'about'
                ? 'text-[#F59E0B] border-b-2 border-[#F59E0B] pb-0.5'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            About Us
          </button>
          <button
            onClick={() => handleNavClick('gallery')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentPage === 'gallery'
                ? 'text-[#F59E0B] border-b-2 border-[#F59E0B] pb-0.5'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            Gallery
          </button>
          <button
            onClick={() => handleNavClick('locations')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentPage === 'locations'
                ? 'text-[#F59E0B] border-b-2 border-[#F59E0B] pb-0.5'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            Branches & Map
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-xl bg-[#161822] hover:bg-[#202332] text-neutral-200 border border-[#2b2e3d] transition-colors flex items-center justify-center cursor-pointer"
            aria-label="View shopping bag"
          >
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#E11D2A] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0b0c10]">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenOrder}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#E11D2A] to-[#c51622] hover:from-[#c51622] hover:to-[#a0121b] shadow-lg shadow-red-900/30 transition-all hover:shadow-red-800/50 cursor-pointer whitespace-nowrap shrink-0"
          >
            Order Now
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-[#161822] text-neutral-200 border border-[#2b2e3d] hover:bg-[#202332] transition-colors cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#10121a] border-b border-[#232634] px-6 py-5 flex flex-col gap-3 animate-in fade-in duration-200">
          <button
            onClick={() => handleNavClick('home')}
            className={`text-left text-base font-semibold py-1.5 cursor-pointer ${
              currentPage === 'home' ? 'text-[#F59E0B]' : 'text-neutral-200'
            }`}
          >
            Home Page
          </button>
          <button
            onClick={() => handleNavClick('menu')}
            className={`text-left text-base font-semibold py-1.5 cursor-pointer ${
              currentPage === 'menu' ? 'text-[#F59E0B]' : 'text-neutral-200'
            }`}
          >
            Our Menu
          </button>
          <button
            onClick={() => handleNavClick('deals')}
            className={`text-left text-base font-semibold py-1.5 cursor-pointer ${
              currentPage === 'deals' ? 'text-[#F59E0B]' : 'text-neutral-200'
            }`}
          >
            Special Deals & Combos
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`text-left text-base font-semibold py-1.5 cursor-pointer ${
              currentPage === 'about' ? 'text-[#F59E0B]' : 'text-neutral-200'
            }`}
          >
            About Us & Heritage
          </button>
          <button
            onClick={() => handleNavClick('gallery')}
            className={`text-left text-base font-semibold py-1.5 cursor-pointer ${
              currentPage === 'gallery' ? 'text-[#F59E0B]' : 'text-neutral-200'
            }`}
          >
            Food Gallery
          </button>
          <button
            onClick={() => handleNavClick('locations')}
            className={`text-left text-base font-semibold py-1.5 cursor-pointer ${
              currentPage === 'locations' ? 'text-[#F59E0B]' : 'text-neutral-200'
            }`}
          >
            Karachi Branches & Directions
          </button>

          <div className="pt-2 border-t border-[#232634] flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrder();
              }}
              className="w-full py-3 rounded-xl text-center font-bold text-white bg-gradient-to-r from-[#E11D2A] to-[#c51622] shadow-lg shadow-red-900/30 cursor-pointer"
            >
              Order Online Now
            </button>
            <a
              href="tel:021111666111"
              className="w-full py-2.5 rounded-xl text-center font-medium text-xs text-neutral-300 bg-[#161822] border border-[#2b2e3d] flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-red-500" />
              Call UAN: (021) 111-666-111
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
