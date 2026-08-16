"use client"

import { useEffect, useRef } from "react"

/**
 * The animated gold field behind the whole site.
 *
 * Three fixed layers, each a pair of nested divs:
 *
 *   outer  → moves with the page scroll (parallax). Each layer uses a different
 *            depth factor, so they slide past one another as you scroll.
 *   inner  → runs its own slow CSS keyframe drift, so the field is never
 *            completely still even when the page is not being scrolled.
 *
 * They are split because an element can only have one `transform`: the scroll
 * offset and the keyframe animation would otherwise overwrite each other.
 *
 * Scroll position is written straight to the DOM inside a requestAnimationFrame
 * rather than held in React state, because a state update per scroll event would
 * re-render the entire page tree while the user is scrolling.
 */
export function BackgroundField() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Respect the OS "reduce motion" setting: no scroll coupling at all.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        // Normalised 0..1 through the page, plus raw pixels for the parallax.
        const max = document.body.scrollHeight - window.innerHeight
        const y = window.scrollY
        node.style.setProperty("--kma-sy", String(y))
        node.style.setProperty("--kma-sp", String(max > 0 ? y / max : 0))
      })
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={ref} className="kma-bg" aria-hidden>
      {/* Layer A: wide, slow pools. Moves least, so it reads as furthest away. */}
      <div className="kma-bg-scroll" style={{ ["--depth" as string]: "0.03" }}>
        <div className="kma-bg-a" />
      </div>
      {/* Layer B: smaller highlights drifting the other way. */}
      <div className="kma-bg-scroll" style={{ ["--depth" as string]: "0.07" }}>
        <div className="kma-bg-b" />
      </div>
      {/* Layer C: directional marble veining, the layer you actually notice. */}
      <div className="kma-bg-scroll" style={{ ["--depth" as string]: "0.12" }}>
        <div className="kma-bg-c" />
      </div>
    </div>
  )
}
