"use client"

import { mediaSlots, ratioLabel, type MediaSlot } from "@/lib/content/media-ratios"

/** Little proportional box so the shape is obvious at a glance. */
function RatioChip({ slot }: { slot: MediaSlot }) {
  const [w, h] = slot.ratio
  const boxW = 34
  const boxH = Math.round((boxW * h) / w)
  return (
    <div className="flex h-[46px] w-[46px] flex-none items-center justify-center">
      <div
        style={{ width: boxW, height: Math.min(boxH, 46) }}
        className="rounded-[4px] border border-[rgba(154,123,47,0.55)] bg-[rgba(154,123,47,0.14)]"
      />
    </div>
  )
}

/**
 * "Shapes we crop to", shown next to every uploader so the owner knows how a
 * photo will be cropped before it goes anywhere near the live site.
 */
export function RatioLegend({ slotIds }: { slotIds?: string[] }) {
  const slots = slotIds ? mediaSlots.filter((s) => slotIds.includes(s.id)) : mediaSlots

  return (
    <div className="rounded-2xl border border-[var(--kma-hairline)] bg-[rgba(255,255,255,0.5)] p-5">
      <div className="kicker mb-3.5">Shapes we crop to</div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-3.5 sm:grid-cols-2">
        {slots.map((slot) => (
          <div key={slot.id} className="flex items-start gap-3">
            <RatioChip slot={slot} />
            <div className="min-w-0">
              <div className="text-[13px] font-semibold text-[var(--kma-ink)]">
                {ratioLabel(slot)} · {slot.usedIn}
              </div>
              <p className="m-0 mt-0.5 text-[12px] leading-snug text-[var(--kma-muted)]">
                {slot.note} Minimum {slot.minWidth}px wide.
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="m-0 mt-4 border-t border-[var(--kma-hairline)] pt-3 text-[12px] leading-relaxed text-[var(--kma-muted-2)]">
        Gallery photos keep whatever shape they arrive in, so nothing is cropped there. Everywhere else, anything
        off-ratio is centre-cropped, never squashed.
      </p>
    </div>
  )
}

/** Single-slot version, shown under an image field. */
export function RatioNote({ slot }: { slot: MediaSlot }) {
  return (
    <div className="mt-2 flex items-center gap-2 text-[12px] text-[var(--kma-muted)]">
      <span className="rounded-full bg-[rgba(154,123,47,0.14)] px-2 py-0.5 font-semibold text-[var(--kma-gold-deep)]">
        {ratioLabel(slot)}
      </span>
      {slot.note} Minimum {slot.minWidth}px wide.
    </div>
  )
}
