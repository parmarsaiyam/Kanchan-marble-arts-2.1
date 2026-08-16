"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, Suspense } from "react"
import { trackPageView } from "@/lib/analytics"

/**
 * Reports a page view every time the URL changes.
 *
 * Next.js swaps pages without reloading the browser, so Google Analytics never
 * notices navigation on its own. Without this it would only ever record the
 * page someone landed on.
 */
function GAListenerContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const query = searchParams?.toString()
    trackPageView(pathname + (query ? `?${query}` : ""))
  }, [pathname, searchParams])

  return null
}

export default function GAListener() {
  // useSearchParams needs a Suspense boundary during prerendering.
  return (
    <Suspense fallback={null}>
      <GAListenerContent />
    </Suspense>
  )
}
