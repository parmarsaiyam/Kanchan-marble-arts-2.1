"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

const slides: string[] = [
  "https://res.cloudinary.com/duuqhl0w9/image/upload/v1758472180/gallery/mandir/M-1.webp",
  "/images/Home.webp",
  "https://res.cloudinary.com/duuqhl0w9/image/upload/f_auto,q_auto/gallery/murti/combo-1.webp",
  "https://res.cloudinary.com/duuqhl0w9/image/upload/f_auto,q_auto/gallery/mandir/M-3.webp",
  "https://res.cloudinary.com/duuqhl0w9/image/upload/f_auto,q_auto/gallery/mandir/M-2.webp",
];

export default function HeroCarouselBackup(): JSX.Element {
  const [index, setIndex] = useState<number>(1);
  const idxRef = useRef(index);
  idxRef.current = index;

  // kickstart first-image load
  useEffect(() => {
    const img = new window.Image();
    img.src = slides[0];
  }, []);

  const positions = useMemo(() => {
    return slides.map((_, i) => {
      let offset = i - index;
      const half = Math.floor(slides.length / 2);
      if (offset > half) offset -= slides.length;
      if (offset < -half) offset += slides.length;
      return offset;
    });
  }, [index]);

  const goNext = () => setIndex((i) => (i + 1) % slides.length);
  const goPrev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full flex justify-start">
      {/* fixed aspect ratio box for reliable heights */}
      <div className="relative w-full max-w-[620px] aspect-[44/40] overflow-visible">
        {slides.map((src, i) => {
          const pos = positions[i];
          const distance = Math.abs(pos);
          const visible = distance <= 2;

          const translateX = pos * 24;
          const scale = distance === 0 ? 1 : distance === 1 ? 0.82 : 0.65;
          const rotate = pos === -1 ? -3 : pos === 1 ? 3 : 0;

          const wrapperStyle: React.CSSProperties = {
            transform: `translate3d(${translateX}%, -50%, 0) scale(${scale}) rotate(${rotate}deg)`,
            zIndex: 20 - distance,
            opacity: visible ? 1 : 0,
            transition: "transform 420ms cubic-bezier(0.22,1,0.36,1), opacity 360ms ease",
            left: "50%",
            top: "50%",
            position: "absolute",
            cursor: "pointer",
          };

          return (
            <div key={src + i} style={wrapperStyle} onClick={() => setIndex(i)} aria-hidden={pos !== 0}>
              {/* inner card that contains the image; position:relative allows intra-card absolute children */}
              <div className="relative rounded-2xl overflow-visible bg-white shadow-2xl"
                   style={{
                     width: "520px",
                     height: "460px",
                     maxWidth: "480px",
                     maxHeight: "440px",
                   }}>
                <Image
                  src={src}
                  alt={`slide-${i}`}
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(max-width:768px) 92vw, 420px"
                  priority={pos === 0}
                  loading={pos === 0 ? "eager" : "lazy"}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMScgaGVpZ2h0PScxJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLz4="
                />

                {/* Only render the nav buttons inside the center card (pos === 0) so they hug the focused image */}
                {pos === 0 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); goPrev(); }}
                      aria-label="Previous slide"
                      className="absolute left-[-48px] top-1/2 -translate-y-1/2 z-40 bg-white/95 hover:bg-white rounded-full w-10 h-10 shadow flex items-center justify-center"
                      style={{ boxShadow: "0 6px 18px rgba(2,6,23,0.12)" }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <polyline points="15 18 9 12 15 6" stroke="#111827" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    <button
                      onClick={(e) => { e.stopPropagation(); goNext(); }}
                      aria-label="Next slide"
                      className="absolute right-[-48px] top-1/2 -translate-y-1/2 z-40 bg-white/95 hover:bg-white rounded-full w-10 h-10 shadow flex items-center justify-center"
                      style={{ boxShadow: "0 6px 18px rgba(2,6,23,0.12)" }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <polyline points="9 18 15 12 9 6" stroke="#111827" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
