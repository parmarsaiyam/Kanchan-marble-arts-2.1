import type { Metadata } from "next"
import { AboutContent } from "./about-content"
import { en } from "@/lib/i18n/dictionaries/en"
import { faqKeys, aboutFactKeys } from "@/lib/content/faq"
import { phoneDisplay, email } from "@/lib/config/site"

const SITE = "https://kanchanmarblearts.com"

export const metadata: Metadata = {
  title: "About Us | Marble Temple Manufacturers in Mumbai Since 2002",
  description:
    "Kanchan Marble Arts is a family-run marble temple manufacturer in Kandivali East, Mumbai, hand-carving custom marble mandirs, white marble Jain mandirs and murtis since 2002. Australian, Makrana and Italian marble, delivered and fitted across Mumbai.",
  alternates: { canonical: "/about" },
  keywords: [
    "marble temple manufacturers in Mumbai",
    "marble mandir shop near Kandivali",
    "marble murti manufacturer Mumbai",
    "custom marble mandir Mumbai",
    "handmade marble mandir",
    "white marble Jain mandir",
  ],
  openGraph: {
    title: "About Kanchan Marble Arts | Marble Temple Manufacturers in Mumbai",
    description:
      "Family-run marble workshop in Kandivali East since 2002. Custom marble mandirs, Jain temples and hand-carved murtis in Australian, Makrana and Italian marble.",
    url: `${SITE}/about`,
  },
}

/**
 * FAQPage + Breadcrumb structured data. Built from the English dictionary, the
 * same copy the page prerenders, so the markup always matches visible text,
 * which is Google's requirement for FAQ rich results.
 */
function AboutJsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${SITE}/about#faq`,
        mainEntity: [
          ...faqKeys.map((key) => ({
            "@type": "Question",
            name: en.ui.faq.items[key].q,
            acceptedAnswer: { "@type": "Answer", text: en.ui.faq.items[key].a },
          })),
          ...aboutFactKeys.map((key) => ({
            "@type": "Question",
            name: en.ui.about.facts.items[key].q,
            acceptedAnswer: { "@type": "Answer", text: en.ui.about.facts.items[key].a },
          })),
          {
            "@type": "Question",
            name: en.ui.about.facts.items.contact.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: en.ui.about.facts.items.contact.a(phoneDisplay, email),
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "About", item: `${SITE}/about` },
        ],
      },
    ],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
}

export default function AboutPage() {
  return (
    <>
      <AboutJsonLd />
      <AboutContent />
    </>
  )
}
