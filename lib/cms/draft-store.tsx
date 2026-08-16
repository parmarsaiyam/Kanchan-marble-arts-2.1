"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import catalogJson from "@/content/catalog.json"
import galleryJson from "@/content/gallery.json"
import settingsJson from "@/content/settings.json"
import { CMS_FILES, type CmsContent, type CmsFileKey } from "./types"

const DRAFT_KEY = "kma-cms-draft-v1"

/** What is currently committed in the repo: the baseline every draft diffs against. */
function published(): CmsContent {
  return {
    catalog: catalogJson as CmsContent["catalog"],
    gallery: galleryJson as unknown as CmsContent["gallery"],
    settings: settingsJson as CmsContent["settings"],
  }
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

interface DraftContextValue {
  content: CmsContent
  /** Repo state, for diffing and for discarding back to it. */
  base: CmsContent
  update: <K extends CmsFileKey>(key: K, next: CmsContent[K]) => void
  /** Which of the three files differ from what is committed. */
  changedFiles: CmsFileKey[]
  /** Item-level count shown as "N unpublished changes". */
  changeCount: number
  discard: () => void
  publishing: boolean
  publish: (message?: string) => Promise<void>
  lastPublishedAt: string | null
  error: string | null
  clearError: () => void
}

const DraftContext = createContext<DraftContextValue | null>(null)

/** Rough per-item diff so the header can say how much is waiting to go live. */
function countChanges(base: CmsContent, draft: CmsContent) {
  let n = 0

  const baseProducts = new Map(base.catalog.products.map((p) => [p.slug, JSON.stringify(p)]))
  for (const p of draft.catalog.products) {
    const before = baseProducts.get(p.slug)
    if (!before || before !== JSON.stringify(p)) n += 1
    baseProducts.delete(p.slug)
  }
  n += baseProducts.size // deleted products

  const baseImages = new Map(base.gallery.images.map((g) => [g.src, JSON.stringify(g)]))
  for (const g of draft.gallery.images) {
    const before = baseImages.get(g.src)
    if (!before || before !== JSON.stringify(g)) n += 1
    baseImages.delete(g.src)
  }
  n += baseImages.size

  if (JSON.stringify(base.settings) !== JSON.stringify(draft.settings)) n += 1

  return n
}

export function DraftProvider({ children }: { children: ReactNode }) {
  const base = useMemo(published, [])
  const [content, setContent] = useState<CmsContent>(() => clone(base))
  const [hydrated, setHydrated] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastPublishedAt, setLastPublishedAt] = useState<string | null>(null)

  // Restore any in-progress draft. Kept out of the first render so the server
  // and client agree before hydration.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(DRAFT_KEY)
      if (saved) setContent(JSON.parse(saved) as CmsContent)
    } catch {
      // A corrupt draft should not lock the owner out of the CMS.
      window.localStorage.removeItem(DRAFT_KEY)
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(content))
    } catch {
      // Quota exceeded, so the draft simply will not survive a reload.
    }
  }, [content, hydrated])

  const update = useCallback(<K extends CmsFileKey>(key: K, next: CmsContent[K]) => {
    setContent((prev) => ({ ...prev, [key]: next }))
  }, [])

  const discard = useCallback(() => {
    setContent(clone(base))
    window.localStorage.removeItem(DRAFT_KEY)
  }, [base])

  const changedFiles = useMemo(
    () =>
      (Object.keys(CMS_FILES) as CmsFileKey[]).filter(
        (key) => JSON.stringify(base[key]) !== JSON.stringify(content[key]),
      ),
    [base, content],
  )

  const changeCount = useMemo(() => countChanges(base, content), [base, content])

  const publish = useCallback(
    async (message?: string) => {
      setPublishing(true)
      setError(null)
      try {
        const files = changedFiles.map((key) => ({
          path: CMS_FILES[key],
          content: JSON.stringify(content[key], null, 2) + "\n",
        }))
        if (!files.length) return

        const res = await fetch("/api/cms/publish", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ files, message }),
        })
        const body = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(body.error || `Publish failed (${res.status})`)

        setLastPublishedAt(new Date().toISOString())
        // The draft is now the published state, so stop flagging it as pending.
        window.localStorage.removeItem(DRAFT_KEY)
      } catch (e) {
        setError(e instanceof Error ? e.message : "Publish failed")
        throw e
      } finally {
        setPublishing(false)
      }
    },
    [changedFiles, content],
  )

  const value: DraftContextValue = {
    content,
    base,
    update,
    changedFiles,
    changeCount,
    discard,
    publishing,
    publish,
    lastPublishedAt,
    error,
    clearError: () => setError(null),
  }

  return <DraftContext.Provider value={value}>{children}</DraftContext.Provider>
}

export function useDraft() {
  const ctx = useContext(DraftContext)
  if (!ctx) throw new Error("useDraft must be used inside <DraftProvider>")
  return ctx
}
