import type React from "react"
import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import { JsonLd } from "@/components/layout/json-ld"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { MobileCTA } from "@/components/layout/mobile-cta"
import { ScrollToTop } from "@/components/layout/scroll-to-top"
import GAListener from "@/components/layout/ga-listener"
import { LanguageProvider } from "@/lib/i18n/context"

import "./globals.css"
import Script from "next/script"


const playfair = localFont({
  src: [
    {
      path: "../public/fonts/Playfair_Display/PlayfairDisplay-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Playfair_Display/PlayfairDisplay-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-serif",
  display: "swap",
})

const inter = localFont({
  src: [
    {
      path: "../public/fonts/Inter/Inter-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Inter/Inter-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
}

export const metadata: Metadata = {
  metadataBase: new URL("https://kanchanmarblearts.com"),
  title: "Kanchan Marble Arts | Marble Mandir & Murti Manufacturer in Mumbai",
  description:
    "Kanchan Marble Arts is a trusted marble mandir and murti manufacturer in Mumbai with 20+ years of craftsmanship. Specializing in custom marble mandirs, Jain temples, murtis, and marble articles made from Italian, Indian and Australian marble.",

  keywords: [
    "marble mandir manufacturer in Mumbai",
    "custom marble mandir",
    "jain marble mandir",
    "marble murti maker in India",
    "white marble temple",
    "italian marble mandir",
    "marble temple for home",
    "marble articles Mumbai",
    "best marble shop in Mumbai",
    "custom marble work in India",
    "marble ghumat",
    "tulsi stand marble",
    "jain mandir design marble",
    "handcrafted marble mandir",
  ],

  authors: [{ name: "Kanchan Marble Arts", url: "https://kanchanmarblearts.com" }],
  creator: "Kanchan Marble Arts",
  publisher: "Kanchan Marble Arts",

  openGraph: {
    title: "Kanchan Marble Arts | Custom Marble Mandirs & Jain Temples",
    description:
      "Premium custom marble mandirs, Jain temples, murtis and decorative marble articles handcrafted in Mumbai. 20+ years of legacy, trusted across India.",
    type: "website",
    locale: "en_IN",
    siteName: "Kanchan Marble Arts",
    url: "https://kanchanmarblearts.com",
    images: [
      {
        url: "https://kanchanmarblearts.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Custom white marble mandir handcrafted by Kanchan Marble Arts in Mumbai",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Kanchan Marble Arts | Custom Marble Mandirs in Mumbai",
    description:
      "Explore handcrafted marble mandirs, Jain temples, murtis and marble décor created with 20+ years of devotion and craftsmanship.",
    images: ["https://kanchanmarblearts.com/images/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
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

  category: "Marble Manufacturer & Religious Art",
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <JsonLd />
        <meta name="google-site-verification" content="RiZ6RRTorHjfEMOSfhC_pHUkPQTlW4uk_6dFswGIzBg" />
        {/* GA base script - loads after interactive so it won't run in SSR */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = window.gtag || gtag;
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { page_path: window.location.pathname });
          `}
        </Script>
      </head>
      <body className="antialiased">
        {/* LanguageProvider drives every translated string on the site (EN / हिन्दी / ગુજરાતી) */}
        <LanguageProvider>
          {/* kma-frame carries the drifting gold-vein background behind the whole page */}
          <div className="kma-frame min-h-screen">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
          <MobileCTA />
          <ScrollToTop />
        </LanguageProvider>
        <GAListener />
      </body>
    </html>
  );
}
