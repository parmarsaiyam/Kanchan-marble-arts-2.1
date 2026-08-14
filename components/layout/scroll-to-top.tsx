"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronUp } from "lucide-react"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const footer = document.querySelector("footer") // 👈 assumes your footer tag exists
    if (!footer) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Show the button when footer is visible
          if (entry.isIntersecting) {
            setIsVisible(true)
          } else {
            setIsVisible(false)
          }
        })
      },
      { threshold: 0.1 } // 0.1 = button shows when 10% of footer is visible
    )

    observer.observe(footer)

    return () => observer.disconnect()
  }, [])


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <Button
        onClick={scrollToTop}
        size="lg"
        className="px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-full flex items-center gap-2"
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-5 w-5" />
        <span className="text-sm font-medium">Scroll to top</span>
      </Button>
    </div>
  )
}
