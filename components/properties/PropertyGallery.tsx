"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PropertyImage } from "@/types";

interface PropertyGalleryProps {
  images: PropertyImage[];
  thumbnail?: string;
  title: string;
}

export default function PropertyGallery({ images, thumbnail, title }: PropertyGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const allImages = images.length
    ? images.sort((a, b) => a.order - b.order)
    : thumbnail
    ? [{ url: thumbnail, order: 0 }]
    : [{ url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80", order: 0 }];

  const main = allImages[0];
  const thumbs = allImages.slice(1, 5);

  const prev = () => setActiveIndex((i) => (i - 1 + allImages.length) % allImages.length);
  const next = () => setActiveIndex((i) => (i + 1) % allImages.length);

  return (
    <>
      <div className="rounded-2xl overflow-hidden">
        {/* Main + thumbnails */}
        <div className="grid grid-cols-3 gap-2">
          {/* Main image */}
          <div
            className="col-span-2 relative aspect-[4/3] cursor-zoom-in group"
            onClick={() => { setActiveIndex(0); setLightboxOpen(true); }}
          >
            <img
              src={allImages[activeIndex]?.url || main.url}
              alt={title}
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl flex items-center justify-center">
              <ZoomIn size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-rows-2 gap-2">
            {Array.from({ length: 4 }, (_, i) => {
              const img = allImages[i + 1];
              const isLast = i === 3 && allImages.length > 5;
              return (
                <div
                  key={i}
                  className="relative aspect-[4/3] cursor-pointer group overflow-hidden rounded-xl bg-surface-secondary"
                  onClick={() => { setActiveIndex(i + 1); setLightboxOpen(true); }}
                >
                  {img ? (
                    <>
                      <img src={img.url} alt={`${title} ${i + 2}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      {isLast && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-xl">
                          <span className="text-white font-bold text-lg">+{allImages.length - 5}</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full bg-surface-secondary rounded-xl" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={() => setLightboxOpen(false)}
          >
            <X size={20} />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft size={22} />
          </button>

          <img
            src={allImages[activeIndex]?.url}
            alt={title}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <ChevronRight size={22} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {activeIndex + 1} / {allImages.length}
          </div>
        </div>
      )}
    </>
  );
}
