"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { Lightbox } from "@/components/gallery/lightbox"
import galleryData from "@/content/gallery.json"
import { useLanguage } from "@/lib/i18n/context"
import { trackFilter, trackGalleryImage } from "@/lib/analytics"

type GalleryImage = {
  src: string
  w: number
  h: number
  category: string
  caption: string
}

const images = galleryData.images as GalleryImage[]

/** How many thumbnails render immediately, and how many more each scroll adds. */
const FIRST_BATCH = 12
const BATCH_SIZE = 9

export function Gallery() {
  const { d, tc, tcat } = useLanguage()
  const categories = useMemo(() => {
    const seen = new Map<string, number>()
    images.forEach((img) => seen.set(img.category, (seen.get(img.category) ?? 0) + 1))
    return Array.from(seen.entries())
  }, [])

  const [filter, setFilter] = useState<string>("All")
  const [shown, setShown] = useState(FIRST_BATCH)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const filtered = filter === "All" ? images : images.filter((img) => img.category === filter)
  const visible = filtered.slice(0, shown)
  const hasMore = shown < filtered.length

  const selectFilter = (next: string) => {
    setFilter(next)
    trackFilter("gallery", next)
    setShown(FIRST_BATCH)
  }

  /**
   * Infinite scroll. A sentinel sits below the grid; when it comes near the
   * viewport we reveal the next batch. `rootMargin` starts the load before the
   * sentinel is actually visible, so images are usually decoded by the time
   * they scroll into view and the grid never appears to stall.
   */
  useEffect(() => {
    const node = sentinelRef.current
    if (!node || !hasMore) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown((n) => Math.min(n + BATCH_SIZE, filtered.length))
        }
      },
      { rootMargin: "600px 0px" },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [hasMore, filtered.length])

  return (
    <>
      {/* Filter rail */}
      <div className="sticky top-[var(--kma-stack-h)] z-30 -mx-5 border-b border-[rgba(36,31,26,0.12)] bg-[var(--kma-ivory)] px-5 pb-3.5 pt-5 lg:static lg:mx-0 lg:border-[rgba(36,31,26,0.14)] lg:bg-transparent lg:px-0 lg:pb-[22px] lg:pt-0">
        <div className="flex gap-2 overflow-x-auto lg:gap-[9px]">
          <button
            onClick={() => selectFilter("All")}
            className={`press flex-none rounded-full px-5 py-2.5 text-[13px] font-semibold ${
              filter === "All"
                ? "bg-[var(--kma-ink)] text-[var(--kma-ivory)]"
                : "border border-[rgba(36,31,26,0.2)]"
            }`}
          >
            {d.ui.common.all}{" "}
            <span className={filter === "All" ? "opacity-50" : "text-[var(--kma-muted-2)]"}>{images.length}</span>
          </button>
          {categories.map(([category, n]) => (
            <button
              key={category}
              onClick={() => selectFilter(category)}
              className={`press flex-none rounded-full px-5 py-2.5 text-[13px] font-semibold ${
                filter === category
                  ? "bg-[var(--kma-ink)] text-[var(--kma-ivory)]"
                  : "border border-[rgba(36,31,26,0.2)]"
              }`}
            >
              {tcat(category)}{" "}
              <span className={filter === category ? "opacity-50" : "text-[var(--kma-muted-2)]"}>{n}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Masonry */}
      <div
        key={filter}
        className="kma-fade-up columns-2 gap-2.5 pt-5 lg:columns-3 lg:gap-5 lg:pt-9"
      >
        {visible.map((img, i) => (
          <figure key={img.src} className="mb-2.5 break-inside-avoid lg:mb-5">
            <button
              onClick={() => {
                setLightboxIndex(i)
                trackGalleryImage(img.caption)
              }}
              className="tile block w-full overflow-hidden rounded-[14px] bg-[var(--kma-surface)] lg:rounded-2xl"
              aria-label={d.ui.gallery.viewImage(tc(img.caption))}
            >
              <Image
                src={img.src}
                alt={tc(img.caption)}
                width={img.w}
                height={img.h}
                className="h-auto w-full"
                loading={i < 4 ? "eager" : "lazy"}
                decoding="async"
              />
            </button>
            <figcaption className="mt-2 hidden text-[13px] leading-normal text-[var(--kma-muted)] lg:mt-2.5 lg:block">
              {tc(img.caption)}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Watched by the observer above; also a quiet loading hint. */}
      <div ref={sentinelRef} className="flex justify-center py-8" aria-hidden>
        {hasMore && (
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-[rgba(36,31,26,0.18)] border-t-[var(--kma-gold)]" />
        )}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={visible}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  )
}
