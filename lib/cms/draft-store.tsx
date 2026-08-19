"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import catalogJson from "@/content/catalog.json"
import galleryJson from "@/content/gallery.json"
import settingsJson from "@/content/settings.json"
import { CMS_FILES, type CmsContent, type CmsFileKey } from "./types"

const DRAFT_KEY = "kma-cms-draft-v3"

/** What shipped in this build. Only used until the live content arrives. */
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

export interface PublishCheck {
  name: string
  ok: boolean
  detail: string
}

interface DraftContextValue {
  content: CmsContent
  /** What the site is serving right now. Drafts are diffed against this. */
  base: CmsContent
  update: <K extends CmsFileKey>(key: K, next: CmsContent[K]) => void
  changedFiles: CmsFileKey[]
  changeCount: number
  discard: () => void
  publishing: boolean
  publish: (options?: { message?: string; backupToGit?: boolean }) => Promise<void>
  rollback: () => Promise<void>
  lastPublishedAt: string | null
  lastCommitUrl: string | null
  error: string | null
  notice: string | null
  clearError: () => void
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
  const [base, setBase] = useState<CmsContent>(bundled)
  const [content, setContent] = useState<CmsContent>(() => clone(bundled()))
  const [hydrated, setHydrated] = useState(false)
  const [touched, setTouched] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [lastPublishedAt, setLastPublishedAt] = useState<string | null>(null)
  const [lastCommitUrl, setLastCommitUrl] = useState<string | null>(null)
  const [checks, setChecks] = useState<PublishCheck[] | null>(null)

  /** Pulls what the site is actually serving, which is the real baseline. */
  const loadLive = useCallback(async (adoptAsDraft: boolean) => {
    try {
      const res = await fetch("/api/cms/content", { cache: "no-store" })
      if (!res.ok) return
      const body = (await res.json()) as { content?: CmsContent }
      if (!body.content?.catalog?.products) return
      setBase(body.content)
      if (adoptAsDraft) setContent(clone(body.content))
    } catch {
      // Offline or signed out. The bundled copy stays as the baseline.
    }
  }, [])

  // Restore any in-progress draft, then fetch the live baseline. Both happen
  // after the first render so the server and client markup agree.
  useEffect(() => {
    let restored = false
    try {
      const saved = window.localStorage.getItem(DRAFT_KEY)
      if (saved) {
        const stored = JSON.parse(saved) as CmsContent
        if (stored?.catalog?.products) {
          setContent(stored)
          setTouched(true)
          restored = true
        }
      }
    } catch {
      window.localStorage.removeItem(DRAFT_KEY)
    }
    // With no draft in progress, adopt live content as the starting point too.
    void loadLive(!restored)
    setHydrated(true)
  }, [loadLive])

  useEffect(() => {
    if (!hydrated || !touched) return
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(content))
    } catch {
      // Quota exceeded, so the draft simply will not survive a reload.
    }
  }, [content, hydrated, touched])

  const update = useCallback(<K extends CmsFileKey>(key: K, next: CmsContent[K]) => {
    setTouched(true)
    setContent((prev) => ({ ...prev, [key]: next }))
  }, [])

  const discard = useCallback(() => {
    setContent(clone(base))
    setTouched(false)
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
    async (options?: { message?: string; backupToGit?: boolean }) => {
      setPublishing(true)
      setError(null)
      setNotice(null)
      try {
        const files = changedFiles.map((key) => ({
          path: CMS_FILES[key],
          content: JSON.stringify(content[key], null, 2) + "\n",
        }))
        if (!files.length) return

        const res = await fetch("/api/cms/publish", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ files, message: options?.message, backupToGit: options?.backupToGit }),
        })
        const body = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(body.error || `Publish failed (${res.status})`)

        // What was sent is now live, so it becomes the baseline immediately and
        // the header stops showing unpublished changes.
        setBase(clone(content))
        setTouched(false)
        window.localStorage.removeItem(DRAFT_KEY)
        setLastPublishedAt(new Date().toISOString())
        setLastCommitUrl(typeof body.commitUrl === "string" ? body.commitUrl : null)
        setNotice(typeof body.note === "string" ? body.note : null)
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

  const rollback = useCallback(async () => {
    setPublishing(true)
    setError(null)
    try {
      const res = await fetch("/api/cms/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "rollback" }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(body.error || "Could not roll back")
      await loadLive(true)
      setTouched(false)
      window.localStorage.removeItem(DRAFT_KEY)
      setNotice(typeof body.note === "string" ? body.note : "Rolled back.")
    } catch (e) {
      setError(e instanceof Error ? e.message : "Rollback failed")
    } finally {
      setPublishing(false)
    }
  }, [loadLive])

  const value: DraftContextValue = {
    content,
    base,
    update,
    changedFiles,
    changeCount,
    discard,
    publishing,
    publish,
    rollback,
    lastPublishedAt,
    lastCommitUrl,
    error,
    notice,
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
