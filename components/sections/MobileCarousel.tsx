"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const slides: string[] = [ 
  "/images/Home.webp",
  "https://res.cloudinary.com/duuqhl0w9/image/upload/f_auto,q_auto/gallery/murti/combo-1.webp",
  "https://res.cloudinary.com/duuqhl0w9/image/upload/v1758472180/gallery/mandir/M-1.webp",
  "https://res.cloudinary.com/duuqhl0w9/image/upload/f_auto,q_auto/gallery/mandir/M-3.webp",
  "https://res.cloudinary.com/duuqhl0w9/image/upload/f_auto,q_auto/gallery/mandir/M-2.webp",
];

export default function MobileCarousel(): JSX.Element {
  const [index, setIndex] = useState<number>(0);
  const touchStartX = useRef<number | null>(null);
  const autoplayRef = useRef<number | null>(null);

  const goNext = () => setIndex((i) => (i + 1) % slides.length);
  const goPrev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  // autoplay
  useEffect(() => {
    autoplayRef.current = window.setInterval(goNext, 4000);
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    };
  }, []);

  // swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    if (start == null) return;
    const dx = e.changedTouches[0].clientX - start;
    touchStartX.current = null;

    if (Math.abs(dx) > 50) {
      dx < 0 ? goNext() : goPrev();
    }
    autoplayRef.current = window.setInterval(goNext, 4000);
  };

  return (
    <div className="w-full max-w-[95%] mx-auto mt-2">
      {/* Carousel Wrapper */}
      <div
        className="relative w-full rounded-2xl overflow-hidden aspect-[54/48] bg-white"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((src, i) => {
          const offset = i - index;
          const translate = `${offset * 100}%`;
          const visible = Math.abs(offset) <= 1;

          return (
            <div
              key={src + i}
              className="absolute inset-0 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(${translate})`,
                opacity: visible ? 1 : 0,
                zIndex: offset === 0 ? 5 : 1,
              }}
            >
              <Image
                src={src}
                alt={`slide-${i}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority={offset === 0}
              />
            </div>
          );
        })}

        {/* Navigation Arrows */}
        <button
          onClick={goPrev}
          aria-label="Previous"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center"
          style={{ boxShadow: "0 6px 18px rgba(2,6,23,0.12)" }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <polyline
              points="15 18 9 12 15 6"
              stroke="#111827"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          onClick={goNext}
          aria-label="Next"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center"
          style={{ boxShadow: "0 6px 18px rgba(2,6,23,0.12)" }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <polyline
              points="9 18 15 12 9 6"
              stroke="#111827"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Dots BELOW the carousel */}
      <div className="flex justify-center gap-3 mt-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === index
                ? "bg-amber-700 scale-110"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
