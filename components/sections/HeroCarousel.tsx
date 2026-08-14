"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * ULTRA-SMOOTH CAROUSEL
 * - Uses same path for autoplay & manual navigation
 * - Autoplay uses rAF + synthetic click trigger for smooth transitions
 * - Fully optimized: no layout thrash, no async setState race
 * - Navigation remains manual + auto synced
 */

const slides: string[] = [
  "https://res.cloudinary.com/duuqhl0w9/image/upload/v1758472180/gallery/mandir/M-1.webp",
  "https://res.cloudinary.com/duuqhl0w9/image/upload/f_auto,q_auto/gallery/mandir/M-2.webp",
  "/images/Home.webp",
  "https://res.cloudinary.com/duuqhl0w9/image/upload/f_auto,q_auto/gallery/mandir/M-3.webp",
  "https://res.cloudinary.com/duuqhl0w9/image/upload/f_auto,q_auto/gallery/jain/J-4.webp",
];

export default function HeroCarousel(): JSX.Element {
  const [index, setIndex] = useState<number>(1);
  const intervalRef = useRef<number | null>(null);
  const buttonNextRef = useRef<HTMLButtonElement | null>(null);
  const buttonPrevRef = useRef<HTMLButtonElement | null>(null);
  const isPausedRef = useRef<boolean>(false);

  /** Move next and previous handlers (used by both buttons and autoplay) */
  const goNext = () =>
    setIndex((i) => (i + 1) % slides.length);
  const goPrev = () =>
    setIndex((i) => (i - 1 + slides.length) % slides.length);

  /** Autoplay using button triggers — identical smoothness */
  useEffect(() => {
    let lastTime = performance.now();
    let animationFrame: number;
    const duration = 4000; // ms per slide

    const tick = (now: number) => {
      if (isPausedRef.current) {
        lastTime = now;
        animationFrame = requestAnimationFrame(tick);
        return;
      }
      if (now - lastTime >= duration) {
        lastTime = now;
        // simulate same path as user click
        buttonNextRef.current?.click();
      }
      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  /** Pause autoplay on hover */
  const onMouseEnter = () => (isPausedRef.current = true);
  const onMouseLeave = () => (isPausedRef.current = false);

  /** Touch swipe (mobile) */
  const startX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    isPausedRef.current = true;
    startX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    isPausedRef.current = false;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? goNext() : goPrev());
  };

  /** Compute slide positions */
  const positions = slides.map((_, i) => {
    let offset = i - index;
    const half = Math.floor(slides.length / 2);
    if (offset > half) offset -= slides.length;
    if (offset < -half) offset += slides.length;
    return offset;
  });

  return (
    <div
      className="relative w-full overflow-hidden select-none"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative mx-auto aspect-[4/3] max-w-[550px] overflow-visible">
        {slides.map((src, i) => {
          const pos = positions[i];
          const distance = Math.abs(pos);
          const scale = distance === 0 ? 1 : distance === 1 ? 0.82 : 0.65;
          const translateX = pos * 24;
          const rotate = pos === -1 ? -3 : pos === 1 ? 3 : 0;
          const visible = distance <= 2;

          const style: React.CSSProperties = {
            transform: `translate3d(${translateX}%, -50%, 0) scale(${scale}) rotate(${rotate}deg)`,
            zIndex: 20 - distance,
            opacity: visible ? 1 : 0,
            transition:
              "transform 420ms cubic-bezier(0.22,1,0.36,1), opacity 360ms ease",
            willChange: "transform, opacity",
          };

          return (
            <div
              key={src + i}
              className="absolute left-1/2 top-1/2"
              style={style}
              onClick={() => setIndex(i)}
            >
              <div className="relative w-[320px] h-[260px] sm:w-[420px] sm:h-[340px] rounded-2xl overflow-hidden shadow-2xl bg-white">
                <Image
                  src={src}
                  alt={`slide-${i}`}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 90vw, 420px"
                />
              </div>
            </div>
          );
        })}

        {/* Nav Buttons (used for both manual + autoplay triggers) */}
        <button
          ref={buttonPrevRef}
          onClick={goPrev}
          aria-label="Previous"
          className="absolute left-[8%] top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white rounded-full w-10 h-10 shadow flex items-center justify-center transition-all"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#111827"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          ref={buttonNextRef}
          onClick={goNext}
          aria-label="Next"
          className="absolute right-[8%] top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white rounded-full w-10 h-10 shadow flex items-center justify-center transition-all"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#111827"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
