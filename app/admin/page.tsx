"use client"

import { AuthProvider } from "@/lib/cms/auth"
import { DraftProvider } from "@/lib/cms/draft-store"
import { Studio } from "@/components/cms/studio"

export default function AdminPage() {
  return (
    <AuthProvider>
      <DraftProvider>
        <Studio />
      </DraftProvider>
    </AuthProvider>
  )
}
