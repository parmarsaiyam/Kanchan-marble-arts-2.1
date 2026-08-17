import type React from "react"
import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import { JsonLd } from "@/components/layout/json-ld"
import { socialImage } from "@/lib/config/media"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { MobileCTA } from "@/components/layout/mobile-cta"
import { ScrollToTop } from "@/components/layout/scroll-to-top"
import GAListener from "@/components/layout/ga-listener"
import { LanguageProvider } from "@/lib/i18n/context"
import { BackgroundField } from "@/components/layout/background-field"

import "./globals.css"
import Script from "next/script"


/**
 * Fonts are WOFF2. They used to be TTF, which meant every first-time visitor
 * downloaded 1.05 MB of font before any text could render in the right face.
 * The same four faces as WOFF2 come to 352 KB.
 *
 * `adjustFontFallback` matches the system fallback's metrics to the real font,
 * so the swap from fallback to webfont does not shift the layout.
 */
const playfair = localFont({
  src: [
    { path: "../public/fonts/Playfair_Display/PlayfairDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Playfair_Display/PlayfairDisplay-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-serif",
  display: "swap",
  preload: true,
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
})

const inter = localFont({
  src: [
    { path: "../public/fonts/Inter/Inter-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Inter/Inter-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
  adjustFontFallback: "Arial",
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
  // No `template` here. Each page sets a full title tuned to length and to the
  // keyword it targets, so appending branding again would only push them past
  // what Google renders.
  title: "Marble Mandir for Home in Mumbai | Kanchan Marble Arts",
  alternates: { canonical: "/" },
  description:
    "Custom marble mandirs for homes in Mumbai, hand-carved since 2002. White marble Jain mandirs with Ashtamangala and 14 Swapna, premium pooja mandirs, small home temples and marble murtis, made to your size in Australian, Makrana or Italian marble, delivered and fitted free across Mumbai. Workshop in Kandivali East.",

  keywords: [
    "marble mandir for home in Mumbai",
    "custom marble mandir Mumbai",
    "white marble Jain mandir",
    "Jain marble temple for home",
    "handmade marble mandir",
    "customized Jain mandir",
    "marble mandir with ashtamangala",
    "Jain mandir with 14 swapna",
    "small marble mandir for home",
    "premium marble pooja mandir",
    "marble temple manufacturers in Mumbai",
    "marble mandir shop near Kandivali",
    "marble murti manufacturer Mumbai",
  ],

  authors: [{ name: "Kanchan Marble Arts", url: "https://kanchanmarblearts.com" }],
  creator: "Kanchan Marble Arts",
  publisher: "Kanchan Marble Arts",

  openGraph: {
    title: "Marble Mandir for Home in Mumbai | Kanchan Marble Arts",
    description:
      "Premium custom marble mandirs, Jain temples, murtis and decorative marble articles handcrafted in Mumbai. 20+ years of legacy, trusted across India.",
    type: "website",
    locale: "en_IN",
    siteName: "Kanchan Marble Arts",
    url: "https://kanchanmarblearts.com",
    images: [
      {
        url: socialImage(),
        width: 1200,
        height: 630,
        alt: "Custom white marble mandir handcrafted by Kanchan Marble Arts in Mumbai",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Custom Marble Mandir & Jain Temple Makers in Mumbai",
    description:
      "Explore handcrafted marble mandirs, Jain temples, murtis and marble décor created with 20+ years of devotion and craftsmanship.",
    images: [socialImage()],
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
            // send_page_view:false, because GAListener sends every page view itself,
            // including client-side navigations. Leaving it on would double-count
            // the first page of every visit.
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { send_page_view: false });
          `}
        </Script>
      </head>
      <body className="antialiased">
        {/* LanguageProvider drives every translated string on the site (EN / हिन्दी / ગુજરાતી) */}
        <LanguageProvider>
          {/* Animated gold field. A fixed sibling behind the page, not a layer
              inside it, so it can react to scroll independently of the content. */}
          <BackgroundField />

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
