"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Lightbox } from "@/components/sections/lightbox"
import galleryData from "@/content/gallery.json"
import { useLanguage } from "@/lib/i18n/context"

type GalleryImage = {
  src: string
  w: number
  h: number
  category: string
  caption: string
}

const images = galleryData.images as GalleryImage[]
const INITIAL_COUNT = 12

export function Gallery() {
  const { d, tc, tcat } = useLanguage()
  const categories = useMemo(() => {
    const seen = new Map<string, number>()
    images.forEach((img) => seen.set(img.category, (seen.get(img.category) ?? 0) + 1))
    return Array.from(seen.entries())
  }, [])

  const [filter, setFilter] = useState<string>("All")
  const [showAll, setShowAll] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = filter === "All" ? images : images.filter((img) => img.category === filter)
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT)
  const remaining = filtered.length - visible.length

  const selectFilter = (next: string) => {
    setFilter(next)
    setShowAll(false)
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

      {/* Masonry */}
      <div
        key={`${filter}-${showAll}`}
        className="kma-fade-up columns-2 gap-2.5 pt-5 lg:columns-3 lg:gap-5 lg:pt-9"
      >
        {visible.map((img, i) => (
          <figure key={img.src} className="mb-2.5 break-inside-avoid lg:mb-5">
            <button
              onClick={() => setLightboxIndex(i)}
              className="tile block w-full overflow-hidden rounded-[14px] bg-[var(--kma-surface)] lg:rounded-2xl"
              aria-label={d.ui.gallery.viewImage(tc(img.caption))}
            >
              <Image
                src={img.src}
                alt={tc(img.caption)}
                width={img.w}
                height={img.h}
                className="h-auto w-full"
                loading={i < 6 ? "eager" : "lazy"}
              />
            </button>
            <figcaption className="mt-2 hidden text-[13px] leading-normal text-[var(--kma-muted)] lg:mt-2.5 lg:block">
              {tc(img.caption)}
            </figcaption>
          </figure>
        ))}
      </div>

      {remaining > 0 && (
        <div className="flex justify-center pt-5">
          <button
            onClick={() => setShowAll(true)}
            className="press rounded-full border border-[rgba(36,31,26,0.22)] px-8 py-3.5 text-sm font-semibold"
          >
            {d.ui.gallery.loadRemaining(remaining)}
          </button>
        </div>
      )}

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
