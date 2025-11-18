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
    ];
  }, [slides]);

  const [current, setCurrent] = useState(0);

  const goToSlide = (index: number) => {
    setCurrent((index + carouselSlides.length) % carouselSlides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselSlides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [carouselSlides.length]);

  const currentSlide = carouselSlides[current % carouselSlides.length];

  return (
    <section className="rounded-lg border border-[#e2e8f0] bg-white p-4 shadow-sm lg:p-6">
      <div className="relative">
        <Link
          href={currentSlide.link}
          className="group relative block min-h-[320px] overflow-hidden rounded-xl bg-[#f8fafc] sm:min-h-[360px] lg:min-h-[420px]"
          aria-label={currentSlide.title}
        >
          <Image
            src={currentSlide.image}
            alt={currentSlide.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-105 group-hover:blur-[1px]"
            sizes="(min-width: 1024px) 60vw, 100vw"
          />
        </Link>

        <div className="absolute inset-x-0 bottom-0 flex justify-center px-6 pb-4 pt-6">
          <div className="flex gap-2 rounded-full border border-white/40 bg-black/30 px-4 py-2 backdrop-blur">
            {carouselSlides.map((slide, index) => (
              <button
                key={slide.title}
                onClick={() => goToSlide(index)}
                className={`h-2.5 w-8 rounded-full transition ${
                  current === index
                    ? "bg-[#ffb400]"
                    : "bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={current === index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
