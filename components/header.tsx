"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/gallery", label: "Gallery" },
    { href: "/process", label: "Process" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/60 backdrop-blur-xl border-b border-border/40 shadow-lg shadow-black/5"
          : "bg-background/80 backdrop-blur-md border-b border-border/30"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <Image
                src="/images/kma-logo.png"
                alt="Kanchan Marble Arts"
                width={250}
                height={100}
                className="h-16 w-auto"
                priority
                
              />
            </Link>
          </div>

          <div className="flex items-center">
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-all duration-200 px-3 py-2 rounded-lg relative hover:bg-accent/10 ${
                    pathname === link.href ? "text-accent bg-accent/10" : "text-foreground/90 hover:text-accent"
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden ml-4">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 hover:bg-accent/10 hover:text-accent"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-4 space-y-1 bg-card/80 backdrop-blur-xl border-t border-border/40 rounded-b-lg shadow-lg">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 text-base font-semibold rounded-lg transition-colors ${
                    pathname === link.href
                      ? "text-accent bg-accent/10"
                      : "text-foreground/90 hover:text-accent hover:bg-accent/5"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
