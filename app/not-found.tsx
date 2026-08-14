"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"
import { useT } from "@/lib/i18n/context"

export default function NotFound() {
  const d = useT()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-6xl font-serif font-bold text-accent mb-4">404</h1>
          <h2 className="text-2xl font-serif font-semibold text-foreground mb-2">{d.ui.notFound.title}</h2>
          <p className="text-muted-foreground">{d.ui.notFound.body}</p>
        </div>

        <div className="space-y-4">
          <Button asChild size="lg" className="w-full">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              {d.ui.notFound.goHome}
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="w-full bg-transparent">
            <Link href="/products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {d.ui.notFound.viewProducts}
            </Link>
          </Button>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          <p>
            {d.ui.notFound.needHelp}{" "}
            <Link href="/contact" className="text-accent hover:underline">
              {d.ui.notFound.contactUs}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
