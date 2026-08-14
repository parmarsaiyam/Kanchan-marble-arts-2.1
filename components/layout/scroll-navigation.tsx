"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ScrollNavigationProps {
  sections: Array<{
    id: string
    label: string
  }>
}

export function ScrollNavigation({ sections }: ScrollNavigationProps) {
  const [activeSection, setActiveSection] = useState("")
  const [hoveredSection, setHoveredSection] = useState("")

  useEffect(() => {
    // Force scroll to top on page load/navigation
    const forceScrollToTop = () => {
      window.scrollTo(0, 0)
      setActiveSection(sections[0].id)
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100 // Adjusted for better detection

      // Find which section is currently in view
      let currentSection = sections[0].id // Default to first section
      
      // Special handling for home section - check if we're at the very top
      if (scrollPosition < 150) {
        currentSection = sections[0].id // Always show home as active when near top
      } else {
        for (let i = 0; i < sections.length; i++) {
          const section = document.getElementById(sections[i].id)
          if (section) {
            const sectionTop = section.offsetTop
            const sectionBottom = sectionTop + section.offsetHeight
            
            if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionBottom - 100) {
              currentSection = sections[i].id
              break
            }
          }
        }
      }
      
      setActiveSection(currentSection)
    }

    const handleInitialScroll = () => {
      // Set initial active section based on scroll position
      handleScroll()
    }

    const handleResize = () => {
      // Recalculate on resize to handle any layout changes
      setTimeout(handleScroll, 100)
    }

    // Handle page navigation - always start at top
    const handlePageLoad = () => {
      // Force scroll to top and set hero as active
      forceScrollToTop()
    }

    // Force scroll to top immediately when component mounts
    forceScrollToTop()

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize, { passive: true })
    
    // Set initial active section after a small delay to ensure DOM is ready
    setTimeout(handleInitialScroll, 100)
    
    // Handle page load and navigation
    window.addEventListener("load", handlePageLoad)
    window.addEventListener("pageshow", handlePageLoad)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("load", handlePageLoad)
      window.removeEventListener("pageshow", handlePageLoad)
    }
  }, [sections])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      if (sectionId === sections[0].id) {
        // Special handling for home section - scroll to top
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      } else {
        const headerOffset = 80 // Account for fixed header height
        const elementPosition = element.offsetTop - headerOffset
        
        // For better positioning, scroll to show the section title near the navbar
        const adjustedPosition = elementPosition - 20 // Small offset for better visual balance

        window.scrollTo({
          top: Math.max(0, adjustedPosition),
          behavior: "smooth",
        })
      }
    }
  }

  return (
    <div className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div className="flex flex-col space-y-4">
        {sections.map((section, index) => (
          <div key={section.id} className="relative group">
            {/* Hover label */}
            <div
              className={cn(
                "absolute right-8 top-1/2 -translate-y-1/2 px-3 py-1 bg-foreground text-background text-sm font-medium rounded-lg shadow-lg transition-all duration-300 whitespace-nowrap",
                hoveredSection === section.id
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-2 pointer-events-none",
              )}
            >
              {section.label}
              <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-foreground border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
            </div>

            {/* Dot button */}
            <button
              onClick={() => scrollToSection(section.id)}
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection("")}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-500 ease-out hover:scale-150 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
                activeSection === section.id
                  ? "bg-accent shadow-lg scale-125 ring-2 ring-accent/30"
                  : "bg-muted-foreground/40 hover:bg-accent/70 border-2 border-background shadow-md",
              )}
              aria-label={`Scroll to ${section.label}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
