"use client"

import { useState } from "react"
import Image from "next/image"
import { useT } from "@/lib/i18n/context"

export function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [selected, setSelected] = useState(0)
  const d = useT()

  return (
    <div>
      <div className="mb-3.5 aspect-square overflow-hidden bg-[var(--kma-surface)] lg:aspect-[4/5] lg:rounded-[28px] max-lg:-mx-5">
        <Image
          src={images[selected]}
          alt={title}
          width={800}
          height={1000}
          priority
          className="h-full w-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3 max-lg:px-0 lg:gap-3.5">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setSelected(i)}
              aria-label={d.ui.productDetail.viewImage(i + 1, title)}
              className={`aspect-square overflow-hidden rounded-xl bg-[var(--kma-surface)] lg:rounded-2xl ${
                i === selected ? "outline outline-2 outline-offset-2 outline-[var(--kma-gold)]" : ""
              }`}
            >
              <Image src={src} alt="" width={220} height={220} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
