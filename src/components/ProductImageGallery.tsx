'use client';

import { useEffect, useState } from 'react';

type ProductImageGalleryProps = {
  imageUrls: string[];
  productName: string;
};

export default function ProductImageGallery({ imageUrls, productName }: ProductImageGalleryProps) {
  const images = imageUrls.filter(Boolean);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener('change', updateMotionPreference);
    return () => mediaQuery.removeEventListener('change', updateMotionPreference);
  }, []);

  useEffect(() => {
    setCurrent((index) => Math.min(index, Math.max(images.length - 1, 0)));
  }, [images.length]);

  useEffect(() => {
    if (!hasMultipleImages || isPaused || prefersReducedMotion) return;
    const timer = window.setInterval(() => setCurrent((index) => (index + 1) % images.length), 3500);
    return () => window.clearInterval(timer);
  }, [hasMultipleImages, images.length, isPaused, prefersReducedMotion]);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-lg border border-slate-200 bg-white text-[#94a3b8]">
        <svg className="h-16 w-16 md:h-24 md:w-24" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  const goToImage = (index: number) => setCurrent((index + images.length) % images.length);

  return (
    <div
      className="space-y-3 md:space-y-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsPaused(false);
      }}
    >
      <div className="relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className={`flex h-full ${prefersReducedMotion ? '' : 'transition-transform duration-300 ease-in-out'}`} style={{ transform: `translateX(-${current * 100}%)` }}>
          {images.map((imageUrl, index) => (
            <div key={`${imageUrl}-${index}`} className="relative h-full w-full shrink-0">
              <img src={imageUrl} alt={`${productName} — image ${index + 1} of ${images.length}`} className="h-full w-full object-contain" />
            </div>
          ))}
        </div>

        {hasMultipleImages && (
          <>
            <button type="button" onClick={() => goToImage(current - 1)} className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b4f82] focus-visible:ring-offset-2" aria-label="Previous product image">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m15 18-6-6 6-6" /></svg>
            </button>
            <button type="button" onClick={() => goToImage(current + 1)} className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b4f82] focus-visible:ring-offset-2" aria-label="Next product image">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 18 6-6-6-6" /></svg>
            </button>
            <p className="absolute bottom-3 right-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-medium text-white" aria-live="polite">{current + 1} / {images.length}</p>
          </>
        )}
      </div>

      {hasMultipleImages && (
        <div className="grid grid-cols-4 gap-2 md:gap-3">
          {images.map((imageUrl, index) => (
            <button key={`${imageUrl}-thumbnail-${index}`} type="button" onClick={() => goToImage(index)} className={`relative aspect-square min-h-11 overflow-hidden rounded-md border bg-[#f8fafc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b4f82] focus-visible:ring-offset-2 ${current === index ? 'border-[#0b4f82] ring-1 ring-[#0b4f82]' : 'border-[#e2e8f0] hover:border-[#0b4f82]'}`} aria-label={`Show image ${index + 1} of ${images.length}`} aria-current={current === index}>
              <img src={imageUrl} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
