export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Kanchan Marble Arts",
    description:
      "Premium marble mandirs, murtis, and artistic pieces crafted with care for over 20 years. Custom designs, expert fitting, and nationwide delivery.",
    url: "https://kanchanmarblearts.com",
    telephone: "+919876543210",
    email: "info@kanchanmarblearts.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Marble Street, Artisan Quarter",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      postalCode: "302001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "26.9124",
      longitude: "75.7873",
    },
    openingHours: ["Mo-Sa 09:00-19:00", "Su 10:00-17:00"],
    priceRange: "₹₹₹",
    image: "https://kanchanmarblearts.com/images/logo.png",
    logo: "https://kanchanmarblearts.com/images/logo.png",
    sameAs: [
      "https://www.facebook.com/kanchanmarblearts",
      "https://www.instagram.com/kanchanmarblearts",
      "https://wa.me/919876543210",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
      bestRating: "5",
      worstRating: "1",
    },
    foundingDate: "2002",
    founder: {
      "@type": "Person",
      name: "Kanchan Family",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    serviceType: [
      "Custom Marble Mandirs",
      "Marble Murtis",
      "Marble Sculptures",
      "Jain Religious Art",
      "Marble Installation",
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}
