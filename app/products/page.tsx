import type { Metadata } from "next"
import { ProductsContent } from "./products-content"
import { BreadcrumbJsonLd } from "@/components/layout/breadcrumb-json-ld"

export const metadata: Metadata = {
  title: "Custom Marble Mandir for Home in Mumbai | Jain Mandir & Murti Collections",
  description:
    "Custom marble mandirs for homes in Mumbai: white marble Jain mandirs, premium marble pooja mandirs, small home temples and hand-carved murtis. Made to your size in Australian, Makrana or Italian marble, delivered and fitted free across Mumbai.",
  alternates: { canonical: "/products" },
  keywords: [
    "marble mandir for home in Mumbai",
    "custom marble mandir Mumbai",
    "premium marble pooja mandir",
    "small marble mandir for home",
    "white marble Jain mandir",
    "Jain marble temple for home",
    "handmade marble mandir",
    "marble murti manufacturer Mumbai",
  ],
  openGraph: {
    title: "Custom Marble Mandir for Home in Mumbai | Kanchan Marble Arts",
    description:
      "White marble Jain mandirs, premium pooja mandirs and hand-carved murtis, made to your size and fitted across Mumbai.",
    url: "https://kanchanmarblearts.com/products",
  },
}

export default function ProductsPage() {
  return (
    <>
      <BreadcrumbJsonLd name="Collections" path="/products" />
      <ProductsContent />
    </>
  )
}
