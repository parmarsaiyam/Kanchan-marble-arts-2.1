"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { whatsappHref } from "@/lib/config/site"
import { useLanguage } from "@/lib/i18n/context"

type LightboxImage = {
  src: string
  w: number
  h: number
  category: string
  caption: string
}

interface LightboxProps {
  images: LightboxImage[]
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export function Lightbox({ images, currentIndex, onClose, onNavigate }: LightboxProps) {
  const { d, tc, tcat } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const thumbsRef = useRef<HTMLDivElement>(null)

  const currentImage = images[currentIndex]
  const minSwipeDistance = 50

  const goToPrevious = useCallback(() => {
    onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1)
    setIsLoading(true)
  }, [currentIndex, images.length, onNavigate])

  const goToNext = useCallback(() => {
    onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0)
    setIsLoading(true)
  }, [currentIndex, images.length, onNavigate])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "ArrowRight") goToNext()
    },
    [onClose, goToPrevious, goToNext],
  )

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }
  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX)
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > minSwipeDistance) goToNext()
    if (distance < -minSwipeDistance) goToPrevious()
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [handleKeyDown])

  // Keep the active thumbnail in view
  useEffect(() => {
    thumbsRef.current
      ?.querySelector<HTMLElement>(`[data-index="${currentIndex}"]`)
      ?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" })
  }, [currentIndex])

  if (!currentImage) return null

  return (
    <div
      className="fixed inset-0 z-[70] flex flex-col bg-[#151412]"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label={d.ui.gallery.lightboxLabel}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-5 lg:px-8 lg:pt-6">
        <span className="text-xs uppercase tracking-[0.16em] text-[rgba(247,244,239,0.55)]">
          {tcat(currentImage.category)} · {currentIndex + 1} / {images.length}
        </span>
        <button
          onClick={onClose}
          aria-label={d.ui.gallery.closeLightbox}
          className="press flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(247,244,239,0.12)] text-[var(--kma-ivory)]"
        >
          <X className="h-4 w-4" strokeWidth={2.2} />
        </button>
      </div>

      {/* Desktop arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          goToPrevious()
        }}
        aria-label={d.ui.gallery.previousImage}
        className="press absolute left-6 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(247,244,239,0.12)] text-[var(--kma-ivory)] lg:flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          goToNext()
        }}
        aria-label={d.ui.gallery.nextImage}
        className="press absolute right-6 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(247,244,239,0.12)] text-[var(--kma-ivory)] lg:flex"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Image */}
      <div
        className="flex min-h-0 flex-1 items-center justify-center px-3 py-4 lg:px-24"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex max-h-full max-w-full items-center justify-center">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[rgba(247,244,239,0.3)] border-t-[var(--kma-ivory)]" />
            </div>
          )}
          <Image
            src={currentImage.src || "/placeholder.svg"}
            alt={tc(currentImage.caption)}
            width={currentImage.w}
            height={currentImage.h}
            className="h-auto max-h-[62vh] w-auto max-w-full rounded-[14px] object-contain lg:max-h-[68vh]"
            onLoad={() => setIsLoading(false)}
            priority
          />
        </div>
      </div>

      {/* Bottom: caption, thumbs, CTA */}
      <div className="px-5 pb-7 lg:px-8 lg:pb-8" onClick={(e) => e.stopPropagation()}>
        <p className="m-0 mb-4 text-[15px] leading-relaxed text-[var(--kma-ivory)] lg:mb-5 lg:text-center">
          {tc(currentImage.caption)}
        </p>
        <div ref={thumbsRef} className="mb-5 flex gap-[7px] overflow-x-auto lg:justify-center">
          {images.map((img, i) => (
            <button
              key={`${img.src}-${i}`}
              data-index={i}
              onClick={() => {
                onNavigate(i)
                setIsLoading(true)
              }}
              aria-label={d.ui.gallery.viewImageNumber(i + 1)}
              className={`h-[46px] w-[46px] flex-none overflow-hidden rounded-[10px] ${
                i === currentIndex
                  ? "outline outline-[1.5px] outline-offset-2 outline-[var(--kma-gold)]"
                  : "opacity-55 hover:opacity-90"
              }`}
            >
              <Image src={img.src} alt="" width={92} height={92} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="press mx-auto block max-w-[420px] rounded-full border border-[rgba(247,244,239,0.35)] py-3.5 text-center text-sm font-semibold text-[var(--kma-ivory)]"
        >
          {d.ui.common.enquireAboutPiece}
        </a>
      </div>
    </div>
  )
}
