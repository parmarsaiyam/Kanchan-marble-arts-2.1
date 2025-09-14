"use client"

import { Button } from "@/components/ui/button"
import { Wifi, RefreshCw } from "lucide-react"

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <Wifi className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-3xl font-serif font-bold text-foreground mb-4">You're Offline</h1>
          <p className="text-muted-foreground">
            It looks like you've lost your internet connection. Please check your connection and try again.
          </p>
        </div>

        <Button onClick={() => window.location.reload()} size="lg" className="w-full">
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>

        <div className="mt-8 text-sm text-muted-foreground">
          <p>Some content may be available offline</p>
        </div>
      </div>
    </div>
  )
}
