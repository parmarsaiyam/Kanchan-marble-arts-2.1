"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface ScrollObserverProps {
  children: React.ReactNode
  className?: string
  animation?: "fade-in" | "slide-up" | "slide-in-left" | "slide-in-right"
  delay?: number
}

export function ScrollObserver({ children, className = "", animation = "fade-in", delay = 0 }: ScrollObserverProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0 translate-x-0"
          : animation === "slide-up"
            ? "opacity-0 translate-y-8"
            : animation === "slide-in-left"
              ? "opacity-0 -translate-x-8"
              : animation === "slide-in-right"
                ? "opacity-0 translate-x-8"
                : "opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  )
}
