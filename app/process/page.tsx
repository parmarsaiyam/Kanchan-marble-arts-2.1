import type { Metadata } from "next"
import { ProcessContent } from "./process-content"
import { BreadcrumbJsonLd } from "@/components/layout/breadcrumb-json-ld"

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

export default function ProcessPage() {
  return (
    <>
      <BreadcrumbJsonLd name="Craft" path="/process" />
      <ProcessContent />
    </>
  )
}
