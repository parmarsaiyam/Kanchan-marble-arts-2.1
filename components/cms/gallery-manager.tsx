"use client"

import { useMemo, useState } from "react"
import { ArrowDown, ArrowUp, Eye, EyeOff, Trash2 } from "lucide-react"
import { useDraft } from "@/lib/cms/draft-store"
import type { GalleryItem, ItemStatus } from "@/lib/cms/types"
import { MediaUploader, type UploadedAsset } from "./media-uploader"
import { RatioLegend } from "./ratio-legend"
import { StatusBadge, TextInput } from "./fields"

const CATEGORIES = ["Mandirs", "Murtis", "Jain", "Tulsi Stand", "Articles", "Video"]

export function GalleryManager() {
  const { content, update } = useDraft()
  const images = content.gallery.images
  const [filter, setFilter] = useState("All")

  const counts = useMemo(() => {
    const map = new Map<string, number>()
    images.forEach((img) => map.set(img.category, (map.get(img.category) ?? 0) + 1))
    return map
  }, [images])

  const visible = filter === "All" ? images : images.filter((img) => img.category === filter)

  const setImages = (next: GalleryItem[]) => update("gallery", { ...content.gallery, images: next })

  const patch = (src: string, changes: Partial<GalleryItem>) =>
    setImages(images.map((img) => (img.src === src ? { ...img, ...changes } : img)))

  const remove = (src: string) => setImages(images.filter((img) => img.src !== src))

  /** Moves within the full list, using the neighbour shown in the current filter. */
  const move = (src: string, dir: -1 | 1) => {
    const from = images.findIndex((i) => i.src === src)
    const to = from + dir
    if (from < 0 || to < 0 || to >= images.length) return
    const next = [...images]
    ;[next[from], next[to]] = [next[to], next[from]]
    setImages(next)
  }

  const onUploaded = (assets: UploadedAsset[]) => {
    const added: GalleryItem[] = assets.map((a) => ({
      src: a.url,
      w: a.width,
      h: a.height,
      category: filter === "All" || filter === "Video" ? "Mandirs" : filter,
      caption: "",
      status: "draft",
      ...(a.resourceType === "video" ? { video: { url: a.url } } : {}),
    }))
    setImages([...added, ...images])
  }

  return (
    <div>
      <header className="mb-6">
        <h1 className="m-0 font-serif text-[30px] font-bold leading-tight lg:text-[38px]">Gallery</h1>
        <p className="m-0 mt-1.5 text-sm text-[var(--kma-muted)]">
          {images.length} images · {counts.size} categories
        </p>
      </header>

      <div className="mb-6 flex flex-wrap gap-2">
        <FilterPill label="All" count={images.length} active={filter === "All"} onClick={() => setFilter("All")} />
        {CATEGORIES.map((c) => (
          <FilterPill
            key={c}
            label={c}
            count={counts.get(c) ?? 0}
            active={filter === c}
            onClick={() => setFilter(c)}
          />
        ))}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
        <MediaUploader
          folder="gallery"
          accept="image/*,video/*"
          onUploaded={onUploaded}
          hint="Uploads go to Cloudinary in the same folder structure the site already uses. New photos arrive as drafts, so nothing appears on the site until you publish."
        />
        <RatioLegend slotIds={["product-cover", "category-tile", "stone-swatch", "video"]} />
      </div>

      <div className="overflow-hidden rounded-2xl border border-[var(--kma-hairline)] bg-[rgba(255,255,255,0.55)]">
        {visible.length === 0 && (
          <p className="m-0 px-5 py-8 text-center text-sm text-[var(--kma-muted)]">Nothing in this category yet.</p>
        )}
        {visible.map((img) => {
          const status: ItemStatus = img.status ?? "live"
          return (
            // On a phone the four action buttons move to a row underneath
            // rather than a column beside, which is what used to leave the
            // caption field about 150px wide and unusable.
            <div
              key={img.src}
              className="flex flex-wrap items-start gap-3 border-b border-[var(--kma-hairline)] p-3.5 last:border-b-0 sm:flex-nowrap sm:gap-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt=""
                className="h-16 w-16 flex-none rounded-xl bg-[var(--kma-surface)] object-cover sm:h-[76px] sm:w-[76px]"
                loading="lazy"
                decoding="async"
              />

              <div className="min-w-0 flex-1 basis-[min(100%,220px)]">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <select
                    value={img.category}
                    onChange={(e) => patch(img.src, { category: e.target.value })}
                    className="rounded-full border border-[rgba(36,31,26,0.18)] bg-white px-2.5 py-1 text-[12px] font-semibold"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  <StatusBadge status={status} />
                  <span className="text-[11px] text-[var(--kma-muted-2)]">
                    {img.w}×{img.h}
                  </span>
                  {img.video && (
                    <span className="rounded-full bg-[rgba(36,31,26,0.08)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em]">
                      video
                    </span>
                  )}
                </div>

                <TextInput
                  value={img.caption}
                  placeholder="Caption, also used as the image's alt text"
                  onChange={(e) => patch(img.src, { caption: e.target.value })}
                />
                {!img.caption.trim() && (
                  <p className="m-0 mt-1 text-[12px] text-[var(--kma-gold-deep)]">Needs a caption before publishing.</p>
                )}
              </div>

              <div className="flex w-full flex-none flex-row gap-1 sm:w-auto sm:flex-col">
                <IconButton label="Move up" onClick={() => move(img.src, -1)}>
                  <ArrowUp className="h-4 w-4" />
                </IconButton>
                <IconButton label="Move down" onClick={() => move(img.src, 1)}>
                  <ArrowDown className="h-4 w-4" />
                </IconButton>
                <IconButton
                  label={status === "hidden" ? "Show on site" : "Hide from site"}
                  onClick={() => patch(img.src, { status: status === "hidden" ? "live" : "hidden" })}
                >
                  {status === "hidden" ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </IconButton>
                <IconButton label="Remove" danger onClick={() => remove(img.src)}>
                  <Trash2 className="h-4 w-4" />
                </IconButton>
              </div>
            </div>
          )
        })}
      </div>

      <p className="m-0 mt-4 text-[12px] leading-relaxed text-[var(--kma-muted-2)]">
        Removing an image here takes it off the site but leaves the original in Cloudinary, so nothing is
        permanently lost.
      </p>
    </div>
  )
}

function FilterPill({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
        active
          ? "bg-[var(--kma-ink)] text-[var(--kma-ivory)]"
          : "border border-[rgba(36,31,26,0.18)] text-[var(--kma-ink)] hover:border-[rgba(36,31,26,0.32)]"
      }`}
    >
      {label} <span className={active ? "opacity-55" : "text-[var(--kma-muted-2)]"}>{count}</span>
    </button>
  )
}

function IconButton({
  children,
  label,
  onClick,
  danger,
}: {
  children: React.ReactNode
  label: string
  onClick: () => void
  danger?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`flex h-8 w-8 items-center justify-center rounded-lg border border-[rgba(36,31,26,0.14)] bg-white transition-colors ${
        danger ? "text-[#8c2f1d] hover:bg-[rgba(190,60,40,0.08)]" : "text-[var(--kma-muted)] hover:text-[var(--kma-ink)]"
      }`}
    >
      {children}
    </button>
  )
}
