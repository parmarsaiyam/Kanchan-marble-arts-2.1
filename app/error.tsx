"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-accent mb-4">Oops!</h1>
          <h2 className="text-2xl font-serif font-semibold text-foreground mb-2">Something went wrong</h2>
          <p className="text-muted-foreground">
            We encountered an unexpected error. Please try refreshing the page or contact us if the problem persists.
          </p>
        </div>

        <div className="space-y-4">
          <Button onClick={reset} size="lg" className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>

          <Button asChild variant="outline" size="lg" className="w-full bg-transparent">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
          </Button>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          <p>Error ID: {error.digest}</p>
          <p>
            Need help?{" "}
            <Link href="/contact" className="text-accent hover:underline">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
