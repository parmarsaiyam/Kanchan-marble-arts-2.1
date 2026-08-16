import type { Metadata } from "next"
import { ContactContent } from "./contact-content"
import { BreadcrumbJsonLd } from "@/components/layout/breadcrumb-json-ld"

export const metadata: Metadata = {
  title: "Marble Mandir Shop Near Kandivali | Visit Our Mumbai Workshop",
  description:
    "Visit our marble mandir workshop at Ashok Nagar, Kandivali East, two minutes from Akurli Metro, open 9 AM to 9 PM every day. Free consultation and quote for custom marble mandirs, Jain temples and murtis anywhere in Mumbai.",
  alternates: { canonical: "/contact" },
  keywords: [
    "marble mandir shop near Kandivali",
    "marble temple manufacturers in Mumbai",
    "custom marble mandir Mumbai",
    "marble murti manufacturer Mumbai",
  ],
  openGraph: {
    title: "Visit Our Marble Mandir Workshop in Kandivali East, Mumbai",
    description: "Ashok Nagar, Kandivali East, two minutes from Akurli Metro. Open 9 AM to 9 PM, seven days a week.",
    url: "https://kanchanmarblearts.com/contact",
  },
}

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd name="Visit" path="/contact" />
      <ContactContent />
    </>
  )
}
