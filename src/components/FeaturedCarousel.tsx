'use client';

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

type CarouselSlide = {
  image: string;
  title: string;
  description: string;
  link: string;
};

type FeaturedCarouselProps = {
  slides?: CarouselSlide[];
};

export default function FeaturedCarousel({ slides }: FeaturedCarouselProps) {
  const carouselSlides = useMemo<CarouselSlide[]>(() => {
    if (slides?.length) return slides;
    return [
      {
        image: "/assets/stock_img_1.jpg",
        title: "Stock Image 1",
        description: "",
        link: "/products",
      },
      {
        image: "/assets/stock_img_3.jpg",
        title: "Stock Image 3",
        description: "",
        link: "/products",
      },
      {
        image: "/assets/pakmon 1.jpeg",
        title: "Stock Image 1",
        description: "",
        link: "/products",
      },
      {
        image: "/assets/pakmon 2.jpeg",
        title: "Stock Image 3",
        description: "",
        link: "/products",
      },
    ];
  }, [slides]);

  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((index + carouselSlides.length) % carouselSlides.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Auto-slide every 3 seconds with sliding animation
  useEffect(() => {
    if (isAnimating) return;

    const timer = setTimeout(() => {
      setIsAnimating(true);
      setCurrent((prev) => (prev + 1) % carouselSlides.length);
      setTimeout(() => setIsAnimating(false), 600);
    }, 1500);

    return () => clearTimeout(timer);
  }, [carouselSlides.length, isAnimating, current]);

  return (
    <section className="rounded-lg border border-[#e2e8f0] bg-white p-4 shadow-sm lg:p-6">
      <div className="relative overflow-hidden rounded-xl">
        {/* Slides Container - Slides from right to left */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {carouselSlides.map((slide, index) => (
            <Link
              key={`${slide.title}-${index}`}
              href={slide.link}
              className="group relative min-h-[320px] w-full flex-shrink-0 overflow-hidden bg-[#f8fafc] sm:min-h-[360px] lg:min-h-[420px]"
              aria-label={slide.title}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
                sizes="(min-width: 1024px) 60vw, 100vw"
              />
            </Link>
          ))}
        </div>

        {/* Indicator Dots */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center px-6 pb-4 pt-6">
          <div className="flex gap-2 rounded-full border border-white/40 bg-black/30 px-4 py-2 backdrop-blur">
            {carouselSlides.map((slide, index) => (
              <button
                key={`${slide.title}-${index}`}
                onClick={() => goToSlide(index)}
                className={`h-2.5 w-8 rounded-full transition ${current === index
                  ? "bg-[#ffb400]"
                  : "bg-white/40 hover:bg-white/70"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={current === index}
              />
            ))}
          </div>
        </div>

        {/* Left/Right Navigation Arrows */}
        <button
          onClick={() => goToSlide(current - 1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur transition hover:bg-black/50"
          aria-label="Previous slide"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => goToSlide(current + 1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur transition hover:bg-black/50"
          aria-label="Next slide"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
