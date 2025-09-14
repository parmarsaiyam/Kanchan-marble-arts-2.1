import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { JsonLd } from "@/components/json-ld"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileCTA } from "@/components/mobile-cta"

import "./globals.css"


const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: "cover",
}

export const metadata: Metadata = {
  title: "Kanchan Marble Arts - Custom Mandirs & Murtis | 20+ Years of Trust",
  description:
    "Premium marble mandirs, murtis, and artistic pieces crafted with care for over 20 years. Custom designs, expert fitting, and nationwide delivery.",
  keywords:
    "marble mandir, marble murti, custom marble work, marble art, marble temple, marble sculpture, jain marble, marble craftsmanship",
  authors: [{ name: "Kanchan Marble Arts" }],
  creator: "Kanchan Marble Arts",
  publisher: "Kanchan Marble Arts",
  openGraph: {
    title: "Kanchan Marble Arts - Custom Mandirs & Murtis",
    description: "Premium marble mandirs, murtis, and artistic pieces crafted with care for over 20 years.",
    type: "website",
    locale: "en_US",
    siteName: "Kanchan Marble Arts",
    url: "https://kanchanmarblearts.com",
    images: [
      {
        url: "https://kanchanmarblearts.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kanchan Marble Arts - Premium Marble Craftsmanship",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kanchan Marble Arts - Custom Mandirs & Murtis",
    description: "Premium marble mandirs, murtis, and artistic pieces crafted with care for over 20 years.",
    images: ["https://kanchanmarblearts.com/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icons/icon-180x180.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Kanchan Marble Arts",
  },
  formatDetection: {
    telephone: false,
  },
  category: "business",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <JsonLd />
        <link rel="canonical" href="https://kanchanmarblearts.com" />
      </head>
      <body className="antialiased marble-texture">
        <Header />
        <main className="pt-16 animate-fade-in">{children}</main>
        <Footer />
        <MobileCTA />
      </body>
    </html>
  )
}
