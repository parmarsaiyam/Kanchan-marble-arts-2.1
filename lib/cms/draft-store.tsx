"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import catalogJson from "@/content/catalog.json"
import galleryJson from "@/content/gallery.json"
import settingsJson from "@/content/settings.json"
import { CMS_FILES, type CmsContent, type CmsFileKey } from "./types"

const DRAFT_KEY = "kma-cms-draft-v2"

/** What shipped in this build of the site. */
function bundled(): CmsContent {
  return {
    catalog: catalogJson as CmsContent["catalog"],
    gallery: galleryJson as unknown as CmsContent["gallery"],
    settings: settingsJson as CmsContent["settings"],
  }
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function same(a: unknown, b: unknown) {
  return JSON.stringify(a) === JSON.stringify(b)
}

interface Stored {
  content: CmsContent
  /**
   * Set the moment a publish succeeds, and cleared once the rebuild lands.
   *
   * Between those two points the JSON compiled into this page is a build old,
   * so diffing against it would report changes that are already published. This
   * is what the CMS diffs against instead.
   */
  publishedBase?: CmsContent
}

export interface PublishCheck {
  name: string
  ok: boolean
  detail: string
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
  lastCommitUrl: string | null
  error: string | null
  clearError: () => void
  /** Result of the /api/cms/publish preflight, or null while it is running. */
  checks: PublishCheck[] | null
  recheck: () => Promise<void>
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
  const fromBuild = useMemo(bundled, [])
  const [content, setContent] = useState<CmsContent>(() => clone(fromBuild))
  const [publishedBase, setPublishedBase] = useState<CmsContent | null>(null)
  const [hydrated, setHydrated] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastPublishedAt, setLastPublishedAt] = useState<string | null>(null)
  const [lastCommitUrl, setLastCommitUrl] = useState<string | null>(null)
  const [checks, setChecks] = useState<PublishCheck[] | null>(null)

  // Restore any in-progress draft. Kept out of the first render so the server
  // and client agree before hydration.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(DRAFT_KEY)
      if (saved) {
        const stored = JSON.parse(saved) as Stored
        if (stored.content) setContent(stored.content)
        // If the build now contains exactly what was last published, the
        // rebuild has landed and the override is no longer needed.
        if (stored.publishedBase && !same(stored.publishedBase, bundled())) {
          setPublishedBase(stored.publishedBase)
        }
      }
    } catch {
      // A corrupt draft should not lock the owner out of the CMS.
      window.localStorage.removeItem(DRAFT_KEY)
    }
    setHydrated(true)
  }, [])

  const base = publishedBase ?? fromBuild

  useEffect(() => {
    if (!hydrated) return
    try {
      const payload: Stored = { content, ...(publishedBase ? { publishedBase } : {}) }
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(payload))
    } catch {
      // Quota exceeded, so the draft simply will not survive a reload.
    }
  }, [content, publishedBase, hydrated])

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

  /** Asks the server which piece of the publishing setup is missing. */
  const recheck = useCallback(async () => {
    try {
      const res = await fetch("/api/cms/publish", { method: "GET" })
      const body = await res.json().catch(() => null)
      setChecks(Array.isArray(body?.checks) ? body.checks : [])
    } catch {
      setChecks([{ name: "Connection", ok: false, detail: "Could not reach the site's own API." }])
    }
  }, [])

  useEffect(() => {
    void recheck()
  }, [recheck])

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

        // What was just sent is now the published state. Recording it here is
        // what stops the header showing "Publish 3" for the two minutes it
        // takes Netlify to rebuild, which used to look like a failed publish
        // and led to the same changes being published over and over.
        setPublishedBase(clone(content))
        setLastPublishedAt(new Date().toISOString())
        setLastCommitUrl(typeof body.commitUrl === "string" ? body.commitUrl : null)
      } catch (e) {
        setError(e instanceof Error ? e.message : "Publish failed")
        void recheck()
        throw e
      } finally {
        setPublishing(false)
      }
    },
    [changedFiles, content, recheck],
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
    lastCommitUrl,
    error,
    clearError: () => setError(null),
    checks,
    recheck,
  }

  return <DraftContext.Provider value={value}>{children}</DraftContext.Provider>
}

export function useDraft() {
  const ctx = useContext(DraftContext)
  if (!ctx) throw new Error("useDraft must be used inside <DraftProvider>")
  return ctx
}
