import React, { useState } from 'react';
import { Camera, Maximize2, X, Sparkles } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/menuData';

export const Gallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  return (
    <section id="gallery" className="py-20 bg-[#0b0c10] border-b border-[#1f2230]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#F59E0B] mb-2">
            <Camera className="w-3.5 h-3.5" />
            Visual Feasts
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Our Food <span className="text-[#E11D2A]">Gallery</span>
          </h2>
          <p className="text-neutral-400 mt-3 text-base">
            Take a closer look at our crispy golden fried chicken, dripping monster zingers, and sizzling loaded sides.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative h-80 rounded-2xl overflow-hidden bg-[#141620] border border-[#272a3a] cursor-pointer shadow-lg hover:border-amber-500/50 transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Tag in corner */}
              <div className="absolute top-3 left-3 bg-[#0c0d14]/80 backdrop-blur-md text-[#F59E0B] text-[11px] font-bold px-2.5 py-1 rounded-md border border-[#2d3246] flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>{item.tag}</span>
              </div>

              {/* Expand Icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Content bottom */}
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <h3 className="font-heading font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-300 mt-1 line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full bg-[#141620] border border-[#2b3042] rounded-2xl overflow-hidden shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative max-h-[70vh] bg-black">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="w-full h-auto max-h-[70vh] object-contain mx-auto"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 bg-[#141620] border-t border-[#262939]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider">
                    {selectedPhoto.tag}
                  </span>
                </div>
                <h3 className="font-heading font-extrabold text-xl text-white">
                  {selectedPhoto.title}
                </h3>
                <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
                  {selectedPhoto.caption}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
