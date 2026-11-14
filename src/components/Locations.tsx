import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink, UtensilsCrossed, Bike, Check } from 'lucide-react';
import { KARACHI_BRANCHES } from '../data/menuData';
import { Branch } from '../types';

interface LocationsProps {
  onOrderNow: () => void;
}

export const Locations: React.FC<LocationsProps> = ({ onOrderNow }) => {
  const [selectedBranch, setSelectedBranch] = useState<Branch>(KARACHI_BRANCHES[0]);

  const googleMapsUrl = 'https://maps.app.goo.gl/E6GP4R7zb5M1wvvC8';

  return (
    <section id="locations" className="py-20 bg-[#0d0f15] border-b border-[#1f2230] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#F59E0B] mb-2">
              <MapPin className="w-3.5 h-3.5" />
              Karachi Locations & Contact
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Find Us In <span className="text-[#E11D2A]">Karachi, Pakistan</span>
            </h2>
            <p className="text-neutral-400 mt-2 max-w-xl text-base">
              Visit our premium dine-in outlets or order piping hot delivery straight to your doorstep anywhere in Karachi.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#1a1d29] hover:bg-[#25293a] border border-[#2e3347] transition-all flex items-center gap-2"
            >
              <Navigation className="w-4 h-4 text-[#F59E0B]" />
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
            </a>

            <button
              onClick={onOrderNow}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#E11D2A] hover:bg-red-700 transition-colors shadow-lg shadow-red-950/50 cursor-pointer"
            >
              Order Now
            </button>
          </div>
        </div>

        {/* 2-Column Split: Karachi Branches Selector & Interactive Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Branch Cards List */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
              Select Karachi Branch ({KARACHI_BRANCHES.length} Outlets)
            </h3>

            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
              {KARACHI_BRANCHES.map((branch) => {
                const isSelected = selectedBranch.id === branch.id;
                return (
                  <div
                    key={branch.id}
                    onClick={() => setSelectedBranch(branch)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#181b26] border-[#E11D2A] shadow-md shadow-red-950/20'
                        : 'bg-[#13151e] border-[#232636] hover:border-neutral-600'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-heading font-bold text-sm sm:text-base text-white">
                            {branch.name}
                          </h4>
                          {isSelected && (
                            <span className="text-[10px] font-bold text-[#F59E0B] bg-amber-950/50 px-2 py-0.5 rounded border border-amber-500/30">
                              Selected
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-400 mt-1 flex items-start gap-1.5 leading-relaxed">
                          <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                          <span>{branch.address}</span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#232737] flex flex-wrap items-center justify-between text-xs text-neutral-400 gap-2">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#F59E0B]" /> {branch.timing}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px]">
                        {branch.dineIn && (
                          <span className="text-neutral-300 flex items-center gap-1">
                            <UtensilsCrossed className="w-3 h-3 text-emerald-400" /> Dine-In
                          </span>
                        )}
                        {branch.delivery && (
                          <span className="text-neutral-300 flex items-center gap-1">
                            <Bike className="w-3 h-3 text-[#F59E0B]" /> Delivery
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Google Maps Card & Active Branch Info */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Active Branch Callout */}
            <div className="p-5 rounded-2xl bg-[#141620] border border-[#2a2e40] shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-[#F59E0B] uppercase tracking-wider">
                  Active Outlet Details
                </span>
                <h4 className="font-heading font-extrabold text-lg text-white mt-0.5">
                  {selectedBranch.name}
                </h4>
                <p className="text-xs text-neutral-300 mt-1">{selectedBranch.address}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-neutral-400">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-red-400" /> {selectedBranch.phone}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" /> {selectedBranch.timing}
                  </span>
                </div>
              </div>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#E11D2A] to-[#c71723] hover:from-[#c71723] hover:to-[#a7131d] shadow-md flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
            </div>

            {/* Embedded Google Map */}
            <div className="relative rounded-2xl overflow-hidden bg-[#141620] border border-[#272a3a] h-[380px] shadow-2xl">
              <iframe
                title="Kababjees Fried Chicken Karachi Google Maps Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115822.45426177811!2d66.9744186523091!3d24.882583852899478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33ee2272e008f%3A0x64e43f55d64ffc4e!2sKababjees%20Fried%20Chicken!5e0!3m2!1sen!2spk!4v1709650000000!5m2!1sen!2spk"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(95%)' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Map floating prompt button */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#0c0e14]/90 backdrop-blur-md p-3 rounded-xl border border-[#2d3143] flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#E11D2A]" />
                  <span>Karachi, Sindh, Pakistan</span>
                </div>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F59E0B] font-bold hover:underline flex items-center gap-1"
                >
                  <span>Google Maps link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
