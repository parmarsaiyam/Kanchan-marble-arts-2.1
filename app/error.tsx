"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw, Home } from "lucide-react"
import Link from "next/link"
import { useT } from "@/lib/i18n/context"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const d = useT()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-accent mb-4">{d.ui.error.heading}</h1>
          <h2 className="text-2xl font-serif font-semibold text-foreground mb-2">{d.ui.error.title}</h2>
          <p className="text-muted-foreground">{d.ui.error.body}</p>
        </div>

        <div className="space-y-4">
          <Button onClick={reset} size="lg" className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            {d.ui.error.tryAgain}
          </Button>

          <Button asChild variant="outline" size="lg" className="w-full bg-transparent">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              {d.ui.error.goHome}
            </Link>
          </Button>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          {error.digest && <p>{d.ui.error.errorId(error.digest)}</p>}
          <p>
            {d.ui.error.needHelp}{" "}
            <Link href="/contact" className="text-accent hover:underline">
              {d.ui.error.contactSupport}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
