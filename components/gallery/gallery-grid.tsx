"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Lightbox } from "@/components/gallery/lightbox"
import { useLanguage } from "@/lib/i18n/context"
import { trackFilter, trackGalleryImage } from "@/lib/analytics"
import type { GalleryItem } from "@/lib/cms/types"

/**
 * Widths the browser should assume for each thumbnail.
 *
 * This was missing, which is the whole reason the gallery felt broken. With no
 * `sizes`, the browser falls back to assuming every image fills the viewport,
 * so a phone showing a two-column grid was downloading the 1920px file for a
 * 170px slot. Now it picks a width that matches the column it lands in.
 */
const THUMB_SIZES = "(max-width: 1023px) 48vw, (max-width: 1320px) 31vw, 400px"

export function Gallery({ images }: { images: GalleryItem[] }) {
  const { d, tc, tcat } = useLanguage()

  const categories = useMemo(() => {
    const seen = new Map<string, number>()
    images.forEach((img) => seen.set(img.category, (seen.get(img.category) ?? 0) + 1))
    return Array.from(seen.entries())
  }, [images])

  const [filter, setFilter] = useState<string>("All")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const visible = filter === "All" ? images : images.filter((img) => img.category === filter)

  const selectFilter = (next: string) => {
    setFilter(next)
    trackFilter("gallery", next)
  }

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

      {/*
        Every thumbnail is in the markup from the start.

        There used to be a scroll observer that revealed nine more at a time.
        Because the layout is CSS columns, adding items made the browser
        rebalance every column, so the images already on screen jumped: the
        "flicker" before anything appeared. Rendering the full set means the
        columns are laid out once and never move.

        Nothing extra is downloaded for it. `loading="lazy"` is the browser's
        own deferral, so images below the fold are still only fetched as they
        come near the viewport, without any JavaScript deciding when.
      */}
      <div key={filter} className="kma-fade-up columns-2 gap-2.5 pt-5 lg:columns-3 lg:gap-5 lg:pt-9">
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
                sizes={THUMB_SIZES}
                className="h-auto w-full"
                // The first six cover roughly one screen on either layout.
                loading={i < 6 ? "eager" : "lazy"}
                fetchPriority={i < 2 ? "high" : "auto"}
                decoding="async"
              />
            </button>
            <figcaption className="mt-2 hidden text-[13px] leading-normal text-[var(--kma-muted)] lg:mt-2.5 lg:block">
              {tc(img.caption)}
            </figcaption>
          </figure>
        ))}
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
