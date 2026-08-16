"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n/context"

export const HERO_SLIDES = [
  { src: "/images/Home.webp", alt: "Marble mandir crafted by Kanchan Marble Arts" },
  {
    src: "https://res.cloudinary.com/duuqhl0w9/image/upload/f_auto,q_auto/gallery/murti/combo-1.webp",
    alt: "Hand-carved marble murtis in premium Italian marble",
  },
  {
    src: "https://res.cloudinary.com/duuqhl0w9/image/upload/v1758472180/gallery/mandir/M-1.webp",
    alt: "Elegant australian marble mandir with intricate jain carvings",
  },
  {
    src: "https://res.cloudinary.com/duuqhl0w9/image/upload/f_auto,q_auto/gallery/mandir/M-3.webp",
    alt: "Traditional marble temple with red and gold accents",
  },
  {
    src: "https://res.cloudinary.com/duuqhl0w9/image/upload/f_auto,q_auto/gallery/mandir/M-2.webp",
    alt: "Modern Corian mandir design for contemporary homes",
  },
]

const AUTOPLAY_MS = 3600

function ArrowIcon({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <polyline
        points={dir === "prev" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"}
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Desktop: stacked coverflow — the focused card centred, neighbours tilted behind it. */
export function HeroCoverflow() {
  const { d, tc } = useLanguage()
  const [index, setIndex] = useState(1)
  const [paused, setPaused] = useState(false)

  const goNext = useCallback(() => setIndex((i) => (i + 1) % HERO_SLIDES.length), [])
  const goPrev = useCallback(() => setIndex((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length), [])

  useEffect(() => {
    if (paused) return
    const t = setInterval(goNext, AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [paused, goNext])

  const positions = useMemo(
    () =>
      HERO_SLIDES.map((_, i) => {
        let offset = i - index
        const half = Math.floor(HERO_SLIDES.length / 2)
        if (offset > half) offset -= HERO_SLIDES.length
        if (offset < -half) offset += HERO_SLIDES.length
        return offset
      }),
    [index],
  )

  return (
    <div
      className="relative flex w-full justify-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[44/40] w-full max-w-[520px]">
        {HERO_SLIDES.map((slide, i) => {
          const pos = positions[i]
          const distance = Math.abs(pos)
          const visible = distance <= 2

          const wrapperStyle: React.CSSProperties = {
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "86%",
            height: "92%",
            transform: `translate3d(calc(-50% + ${pos * 26}%), -50%, 0) scale(${
              distance === 0 ? 1 : distance === 1 ? 0.82 : 0.65
            }) rotate(${pos === -1 ? -3 : pos === 1 ? 3 : 0}deg)`,
            zIndex: 20 - distance,
            opacity: visible ? 1 : 0,
            transition: "transform 520ms cubic-bezier(0.22,1,0.36,1), opacity 420ms ease",
            cursor: pos === 0 ? "default" : "pointer",
            pointerEvents: visible ? "auto" : "none",
          }

          return (
            <div
              key={slide.src}
              style={wrapperStyle}
              onClick={() => pos !== 0 && setIndex(i)}
              aria-hidden={pos !== 0}
            >
              <div className="relative h-full w-full overflow-visible rounded-2xl bg-white shadow-[0_26px_60px_rgba(36,31,26,0.28)]">
                <Image
                  src={slide.src}
                  alt={tc(slide.alt)}
                  fill
                  className="wash rounded-2xl object-cover"
                  sizes="(max-width: 1024px) 92vw, 480px"
                  priority={i === 1}
                />
                <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_0_1px_rgba(247,244,239,0.3)]" />

                {pos === 0 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        goPrev()
                      }}
                      aria-label={d.ui.hero.prevSlide}
                      className="press absolute left-[-22px] top-1/2 z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(247,244,239,0.95)] text-[var(--kma-ink)] shadow-[0_6px_18px_rgba(36,31,26,0.18)] hover:bg-white"
                    >
                      <ArrowIcon dir="prev" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        goNext()
                      }}
                      aria-label={d.ui.hero.nextSlide}
                      className="press absolute right-[-22px] top-1/2 z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(247,244,239,0.95)] text-[var(--kma-ink)] shadow-[0_6px_18px_rgba(36,31,26,0.18)] hover:bg-white"
                    >
                      <ArrowIcon dir="next" />
                    </button>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/** Mobile: one slide at a time, swipeable, dots beneath. */
export function HeroMobileCarousel() {
  const { d, tc } = useLanguage()
  const [index, setIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const goNext = useCallback(() => setIndex((i) => (i + 1) % HERO_SLIDES.length), [])
  const goPrev = useCallback(() => setIndex((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length), [])

  const startAutoplay = useCallback(() => {
    if (timer.current) clearInterval(timer.current)
    timer.current = setInterval(goNext, 4000)
  }, [goNext])

  useEffect(() => {
    startAutoplay()
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [startAutoplay])

  const handleTouchStart = (e: React.TouchEvent) => {
    if (timer.current) clearInterval(timer.current)
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current
    touchStartX.current = null
    if (start != null) {
      const dx = e.changedTouches[0].clientX - start
      if (Math.abs(dx) > 50) (dx < 0 ? goNext : goPrev)()
    }
    startAutoplay()
  }

  return (
    <div className="w-full">
      <div
        className="relative aspect-[54/48] w-full overflow-hidden rounded-2xl bg-[#e6dfd3] shadow-[0_18px_40px_rgba(36,31,26,0.2)]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {HERO_SLIDES.map((slide, i) => {
          const offset = i - index
          return (
            <div
              key={slide.src}
              className="absolute inset-0 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(${offset * 100}%)`,
                opacity: Math.abs(offset) <= 1 ? 1 : 0,
                zIndex: offset === 0 ? 5 : 1,
              }}
              aria-hidden={offset !== 0}
            >
              <Image
                src={slide.src}
                alt={tc(slide.alt)}
                fill
                className="wash object-cover"
                sizes="100vw"
                priority={i === 0}
              />
            </div>
          )
        })}

        <button
          onClick={goPrev}
          aria-label={d.ui.hero.prevSlide}
          className="absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(247,244,239,0.9)] text-[var(--kma-ink)] shadow-[0_6px_18px_rgba(36,31,26,0.18)]"
        >
          <ArrowIcon dir="prev" />
        </button>
        <button
          onClick={goNext}
          aria-label={d.ui.hero.nextSlide}
          className="absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(247,244,239,0.9)] text-[var(--kma-ink)] shadow-[0_6px_18px_rgba(36,31,26,0.18)]"
        >
          <ArrowIcon dir="next" />
        </button>
      </div>

      <div className="mt-3 flex justify-center gap-2.5">
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            onClick={() => setIndex(i)}
            aria-label={d.ui.hero.goToSlide(i + 1)}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              i === index ? "scale-110 bg-[var(--kma-gold)]" : "bg-[rgba(36,31,26,0.2)]"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
