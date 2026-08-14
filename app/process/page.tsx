import type { Metadata } from "next"
import { ProcessContent } from "./process-content"

export const metadata: Metadata = {
  title: "Our Process - Kanchan Marble Arts | From Design to Installation",
  description:
    "Discover our meticulous 4-step process for creating custom marble mandirs and murtis. From consultation to installation, we ensure perfection at every stage.",
  openGraph: {
    title: "Our Process - Kanchan Marble Arts",
    description: "Discover our meticulous process for creating custom marble mandirs and murtis.",
  },
}

export default function ProcessPage() {
  return <ProcessContent />
}
