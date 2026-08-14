"use client"

import { Button } from "@/components/ui/button"
import { Wifi, RefreshCw } from "lucide-react"
import { useT } from "@/lib/i18n/context"

export default function OfflinePage() {
  const d = useT()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <Wifi className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-3xl font-serif font-bold text-foreground mb-4">{d.ui.offline.title}</h1>
          <p className="text-muted-foreground">{d.ui.offline.body}</p>
        </div>

        <Button onClick={() => window.location.reload()} size="lg" className="w-full">
          <RefreshCw className="w-4 h-4 mr-2" />
          {d.ui.offline.tryAgain}
        </Button>

        <div className="mt-8 text-sm text-muted-foreground">
          <p>{d.ui.offline.note}</p>
        </div>
      </div>
    </div>
  )
}
