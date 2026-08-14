"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  className?: string
  as?: "div" | "section"
  id?: string
}

/** Scroll-reveal wrapper: fades/slides content in the first time it enters the viewport. */
export function Reveal({ children, className = "", as = "div", id }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in")
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  const Tag = as
  return (
    <Tag ref={ref} id={id} className={`rv ${className}`}>
      {children}
    </Tag>
  )
}
