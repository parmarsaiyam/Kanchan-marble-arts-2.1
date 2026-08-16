import { phoneNumber, email, mapsUrl } from "@/lib/config/site"

const SITE = "https://kanchanmarblearts.com"

/**
 * Site-wide LocalBusiness / Organization graph.
 *
 * NAP (name, address, phone) must match the site and the Google Business
 * Profile exactly, because mismatches are one of the most common causes of weak local
 * ranking, so these values are pulled from lib/site.ts rather than retyped.
 */
export function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        // Organization is listed alongside LocalBusiness so one node satisfies
        // both of Google's guidelines. Two separate nodes for the same shop
        // would read as two different businesses.
        "@type": ["Organization", "LocalBusiness", "HomeAndConstructionBusiness"],
        "@id": `${SITE}/#business`,
        name: "Kanchan Marble Arts",
        alternateName: "Kanchan Marble Arts, Marble Mandir and Murti Manufacturer",
        description:
          "Marble mandir and murti manufacturer in Mumbai since 2002. Custom marble mandirs for home, white marble Jain mandirs with Ashtamangala and 14 Swapna carving, hand-carved murtis and marble articles, designed, carved, delivered and fitted by our own workshop in Kandivali East.",
        url: SITE,
        telephone: phoneNumber,
        email,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Ashok Nagar, near Akurli Metro Station, beside Mahanagar CNG Pump, Kandivali East",
          addressLocality: "Mumbai",
          addressRegion: "Maharashtra",
          postalCode: "400101",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 19.1966446,
          longitude: 72.8598068,
        },
        hasMap: mapsUrl,
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "09:00",
            closes: "21:00",
          },
        ],
        priceRange: "₹₹",
        currenciesAccepted: "INR",
        image: [`${SITE}/images/og-image.jpg`, `${SITE}/images/Home.webp`],
        // Google wants the logo as an ImageObject when it is used for the
        // brand icon in search results, not a bare URL string.
        logo: {
          "@type": "ImageObject",
          "@id": `${SITE}/#logo`,
          url: `${SITE}/images/kma-logo.png`,
          contentUrl: `${SITE}/images/kma-logo.png`,
          caption: "Kanchan Marble Arts",
        },
        sameAs: ["https://www.facebook.com/kanchanmarblearts", "https://www.instagram.com/kanchanmarblearts"],
        foundingDate: "2002",
        slogan: "Trust, set in stone.",
        knowsLanguage: ["en-IN", "hi-IN", "gu-IN"],
        areaServed: [
          { "@type": "City", name: "Mumbai" },
          { "@type": "City", name: "Thane" },
          { "@type": "City", name: "Navi Mumbai" },
          { "@type": "Country", name: "India" },
        ],
        makesOffer: [
          "Custom marble mandir for home in Mumbai",
          "White marble Jain mandir and Jain marble temple for home",
          "Jain mandir with Ashtamangala and 14 Swapna carving",
          "Premium marble pooja mandir",
          "Small marble mandir for home",
          "Hand-carved marble murti",
          "Marble tulsi stand, jaali and decorative articles",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
          areaServed: { "@type": "City", name: "Mumbai" },
        })),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Marble mandirs, Jain temples and murtis",
          itemListElement: [
            { "@type": "OfferCatalog", name: "Marble mandirs", url: `${SITE}/products` },
            { "@type": "OfferCatalog", name: "Jain marble mandirs", url: `${SITE}/products` },
            { "@type": "OfferCatalog", name: "Marble murtis", url: `${SITE}/products` },
            { "@type": "OfferCatalog", name: "Marble articles", url: `${SITE}/products` },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: SITE,
        name: "Kanchan Marble Arts",
        inLanguage: ["en-IN", "hi-IN", "gu-IN"],
        publisher: { "@id": `${SITE}/#business` },
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
}
