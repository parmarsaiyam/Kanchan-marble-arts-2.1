import type { Metadata } from "next"
import { ProcessContent } from "./process-content"
import { BreadcrumbJsonLd } from "@/components/layout/breadcrumb-json-ld"
import { en } from "@/lib/i18n/dictionaries/en"

const SITE = "https://kanchanmarblearts.com"

export const metadata: Metadata = {
  title: "How We Make a Customized Marble Mandir | Design to Installation",
  description:
    "The four steps behind every handmade marble mandir we build: consultation and measurement, approved design sketches, hand-carving by our artisans, then delivery and fitting. Most customized marble mandirs take four to eight weeks.",
  alternates: { canonical: "/process" },
  keywords: [
    "customized Jain mandir",
    "custom marble mandir Mumbai",
    "handmade marble mandir",
    "marble temple manufacturers in Mumbai",
  ],
  openGraph: {
    title: "How We Make a Customized Marble Mandir | Kanchan Marble Arts",
    description: "Consultation, approved sketches, hand-carving, then delivery and fitting, usually four to eight weeks.",
    url: "https://kanchanmarblearts.com/process",
  },
}

/**
 * HowTo markup for the four steps.
 *
 * The page already lays out consultation, planning, carving and installation in
 * order, with a description each, which is exactly what HowTo describes. Steps
 * are read from the English dictionary so the markup can never say something
 * different from the visible text.
 */
function ProcessJsonLd() {
  const steps = ["consultation", "planning", "crafting", "installation"] as const
  const graph = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${SITE}/process#howto`,
    name: "How a customized marble mandir is made",
    description: en.ui.process.subhead,
    totalTime: "P28D",
    supply: [
      { "@type": "HowToSupply", name: "Australian white marble" },
      { "@type": "HowToSupply", name: "Makrana or Rajasthani marble" },
      { "@type": "HowToSupply", name: "Italian Carrara marble" },
    ],
    step: steps.map((key, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: en.ui.process.steps[key].title,
      text: en.ui.process.steps[key].description,
      url: `${SITE}/process#step-${i + 1}`,
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
}

export default function ProcessPage() {
  return (
    <>
      <BreadcrumbJsonLd name="Craft" path="/process" />
      <ProcessJsonLd />
      <ProcessContent />
    </>
  )
}
