import React from 'react';
import { Flame, MapPin, Phone, Clock, Facebook, Instagram, Youtube, ExternalLink, ArrowUp } from 'lucide-react';
import { KARACHI_BRANCHES } from '../data/menuData';
import { PageView } from './Navbar';

interface FooterProps {
  onNavigate?: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent, page: PageView) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(page);
      scrollToTop();
    }
  };

  const googleMapsUrl = 'https://maps.app.goo.gl/E6GP4R7zb5M1wvvC8';

  return (
    <footer className="bg-[#08090d] border-t border-[#1d202c] text-neutral-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E11D2A] to-[#991b1b] flex items-center justify-center shadow-lg shadow-red-950/40">
                <Flame className="w-5 h-5 text-amber-300 fill-amber-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-xl text-white tracking-tight leading-none">
                  KABABJEES
                </span>
                <span className="font-condensed font-bold text-xs tracking-widest text-[#F59E0B] uppercase">
                  Fried Chicken · Karachi
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Karachi’s ultimate crispy fried chicken destination. Crafted with fresh, never-frozen chicken, hand-coated in 14 secret herbs and spices, and fried to golden perfection.
            </p>

            {/* Social media links */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#141620] border border-[#272b3c] flex items-center justify-center text-neutral-300 hover:text-white hover:border-[#E11D2A] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#141620] border border-[#272b3c] flex items-center justify-center text-neutral-300 hover:text-white hover:border-[#E11D2A] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#141620] border border-[#272b3c] flex items-center justify-center text-neutral-300 hover:text-white hover:border-[#E11D2A] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'home')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Home Page
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'menu')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Fried Chicken Menu
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'deals')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Special Offers & Combos
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'about')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Our 14-Spice Story
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'gallery')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Food Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'locations')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Karachi Branch Locations
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Top Karachi Branches */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Karachi Branches</h4>
            <ul className="space-y-2 text-xs">
              {KARACHI_BRANCHES.slice(0, 5).map((branch) => (
                <li key={branch.id}>
                  <button
                    onClick={(e) => handleLinkClick(e, 'locations')}
                    className="hover:text-amber-400 transition-colors text-left block w-full cursor-pointer"
                  >
                    <span className="font-semibold text-neutral-300">{branch.name}</span>
                    <span className="text-[11px] text-neutral-500 block truncate">{branch.area}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact & Timings */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Contact & Hours</h4>
            <div className="space-y-2.5 text-xs text-neutral-300">
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E11D2A] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">UAN Helpline</div>
                  <a href="tel:021111666111" className="hover:underline text-neutral-400">
                    (021) 111-666-111
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#F59E0B] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Opening Hours</div>
                  <div className="text-neutral-400">12:00 PM – 03:00 AM Daily</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Karachi, Pakistan</div>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F59E0B] hover:underline flex items-center gap-1 text-[11px] mt-0.5"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#181a24] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} Kababjees Fried Chicken Karachi. All rights reserved. 100% Halal Certified.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
