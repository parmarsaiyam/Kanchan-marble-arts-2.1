"use client"

import { useState } from "react"
import {
  AlertCircle,
  Bell,
  ExternalLink,
  Image as ImageIcon,
  LayoutGrid,
  Loader2,
  LogOut,
  Package,
  Settings,
  Undo2,
} from "lucide-react"
import { useAuth } from "@/lib/cms/auth"
import { useDraft } from "@/lib/cms/draft-store"
import { GalleryManager } from "./gallery-manager"
import { ProductEditor } from "./product-editor"
import { AnnouncementEditor } from "./announcement-editor"
import { RatioLegend } from "./ratio-legend"

type Section = "overview" | "products" | "gallery" | "announcements" | "settings"

/**
 * `short` is what the phone tab bar shows. Five tabs across a 360px screen give
 * each one about 70px, and "Announcements" or "Business details" simply do not
 * fit: they used to wrap to three lines and push the bar over the content.
 */
const NAV: { id: Section; label: string; short: string; icon: typeof LayoutGrid }[] = [
  { id: "overview", label: "Overview", short: "Home", icon: LayoutGrid },
  { id: "products", label: "Products", short: "Products", icon: Package },
  { id: "gallery", label: "Gallery", short: "Gallery", icon: ImageIcon },
  { id: "announcements", label: "Announcements", short: "Notices", icon: Bell },
  { id: "settings", label: "Business details", short: "Details", icon: Settings },
]

export function Studio() {
  const { signedIn, ready, insecureDefault, login, logout } = useAuth()
  const [section, setSection] = useState<Section>("overview")
  const {
    content,
    changeCount,
    discard,
    publish,
    publishing,
    error,
    clearError,
    lastPublishedAt,
    lastCommitUrl,
    checks,
    recheck,
  } = useDraft()

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-[var(--kma-gold)]" />
      </div>
    )
  }

  if (!signedIn) return <SignIn onLogin={login} />

  const onPublish = async () => {
    try {
      await publish()
    } catch {
      // The store already surfaced the message in the banner above.
    }
  }

  return (
    <div className="min-h-screen bg-[#ded5c6] text-[var(--kma-ink)]">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-[rgba(36,31,26,0.14)] bg-[rgba(222,213,198,0.95)] backdrop-blur-sm">
        <div className="mx-auto flex h-[62px] max-w-[1400px] items-center justify-between gap-3 px-4 lg:px-8">
          {/* The brand block is allowed to shrink to nothing on a phone so the
              Publish button never gets squeezed off the right edge. */}
          <div className="min-w-0 shrink">
            <div className="kicker !text-[9px]">Studio</div>
            <div className="truncate font-serif text-[15px] font-bold leading-tight sm:text-[17px]">
              Kanchan Marble Arts
            </div>
          </div>

          <div className="flex flex-none items-center gap-1.5 sm:gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-full border border-[rgba(36,31,26,0.2)] px-4 py-2 text-[13px] font-semibold hover:border-[rgba(36,31,26,0.36)] sm:flex"
            >
              Preview site <ExternalLink className="h-3.5 w-3.5" />
            </a>
            {changeCount > 0 && (
              <button
                onClick={discard}
                title="Throw away every unpublished change"
                className="flex flex-none items-center gap-1.5 rounded-full border border-[rgba(36,31,26,0.2)] px-2.5 py-2 text-[13px] font-semibold text-[var(--kma-muted)] hover:text-[var(--kma-ink)] sm:px-3"
              >
                <Undo2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Discard</span>
              </button>
            )}
            <button
              onClick={onPublish}
              disabled={changeCount === 0 || publishing}
              className="flex flex-none items-center gap-2 whitespace-nowrap rounded-full bg-[var(--kma-ink)] px-4 py-2.5 text-[13px] font-semibold text-[var(--kma-ivory)] transition-opacity disabled:opacity-40 sm:px-5"
            >
              {publishing && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              Publish{changeCount > 0 ? ` ${changeCount}` : ""}
            </button>
            <button
              onClick={logout}
              aria-label="Sign out"
              title="Sign out"
              className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-[rgba(36,31,26,0.2)] text-[var(--kma-muted)] hover:text-[var(--kma-ink)]"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>

        {insecureDefault && (
          <div className="flex items-start gap-2 bg-[rgba(190,60,40,0.12)] px-4 py-2.5 text-[13px] text-[#8c2f1d] lg:px-8">
            <AlertCircle className="mt-px h-4 w-4 flex-none" />
            <span>
              This CMS is still using the default password. Anyone who finds this page can edit the site and upload
              to your Cloudinary account. Set <code>CMS_PASSWORD</code> in Netlify to fix it.
            </span>
          </div>
        )}
        {error && (
          <div className="flex items-start gap-2 bg-[rgba(190,60,40,0.12)] px-4 py-2.5 text-[13px] text-[#8c2f1d] lg:px-8">
            <AlertCircle className="mt-px h-4 w-4 flex-none" />
            <span className="flex-1">{error}</span>
            <button onClick={clearError} className="font-semibold underline">
              Dismiss
            </button>
          </div>
        )}
        {lastPublishedAt && changeCount === 0 && !error && (
          <div className="bg-[rgba(37,211,102,0.14)] px-4 py-2 text-[13px] text-[#1a7a41] lg:px-8">
            Published. The site rebuilds automatically, and changes are usually live within a couple of minutes.
          </div>
        )}
      </header>

      <div className="mx-auto flex max-w-[1400px] gap-8 px-4 py-6 lg:px-8 lg:py-10">
        {/* Sidebar: a bottom tab bar on phones */}
        {/* pb-[env(safe-area-inset-bottom)] keeps the tabs clear of the home
            indicator on an iPhone, where they were being half covered. */}
        <nav className="fixed inset-x-0 bottom-0 z-30 flex items-stretch border-t border-[rgba(36,31,26,0.14)] bg-[rgba(222,213,198,0.97)] pb-[env(safe-area-inset-bottom)] backdrop-blur-sm lg:static lg:w-[208px] lg:flex-none lg:flex-col lg:gap-1 lg:border-0 lg:bg-transparent lg:pb-0 lg:backdrop-blur-none">
          {NAV.map(({ id, label, short, icon: Icon }) => {
            const active = section === id
            return (
              <button
                key={id}
                onClick={() => setSection(id)}
                aria-current={active ? "page" : undefined}
                className={`flex min-w-0 flex-1 flex-col items-center gap-1 px-1 py-2.5 text-[10px] font-semibold leading-tight lg:flex-none lg:flex-row lg:gap-3 lg:rounded-xl lg:px-3.5 lg:py-2.5 lg:text-sm ${
                  active
                    ? "text-[var(--kma-ink)] lg:bg-[rgba(36,31,26,0.08)]"
                    : "text-[var(--kma-muted)] hover:text-[var(--kma-ink)]"
                }`}
              >
                <Icon className="h-[18px] w-[18px] flex-none" strokeWidth={active ? 2.2 : 1.8} />
                <span className="truncate lg:hidden">{short}</span>
                <span className="hidden lg:inline">{label}</span>
              </button>
            )
          })}
        </nav>

        <main className="min-w-0 flex-1 pb-24 lg:pb-0">
          {section === "overview" && <Overview onGo={setSection} changeCount={changeCount} />}
          {section === "products" && <ProductEditor />}
          {section === "gallery" && <GalleryManager />}
          {section === "announcements" && <AnnouncementEditor />}
          {section === "settings" && <BusinessDetails />}
        </main>
      </div>
    </div>
  )

  function Overview({ onGo, changeCount }: { onGo: (s: Section) => void; changeCount: number }) {
    const products = content.catalog.products
    const images = content.gallery.images
    const videos = images.filter((i) => i.video).length
    const anno = content.settings.announcement as { enabled?: boolean } | undefined

    const cards = [
      { label: "Products", value: products.length, section: "products" as const },
      { label: "Gallery", value: images.length, section: "gallery" as const },
      { label: "Videos", value: videos, section: "gallery" as const },
      {
        label: "Announcement",
        value: anno?.enabled ? "Live" : "Off",
        section: "announcements" as const,
      },
    ]

    return (
      <div>
        <header className="mb-7">
          <h1 className="m-0 font-serif text-[30px] font-bold leading-tight lg:text-[38px]">Overview</h1>
          <p className="m-0 mt-1.5 max-w-[560px] text-sm leading-relaxed text-[var(--kma-muted)]">
            Everything you change is kept as a draft on this device. Nothing reaches the site until you press
            Publish.
          </p>
        </header>

        <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {cards.map((c) => (
            <button
              key={c.label}
              onClick={() => onGo(c.section)}
              className="rounded-2xl border border-[var(--kma-hairline)] bg-[rgba(255,255,255,0.55)] p-4 text-left transition-colors hover:border-[rgba(36,31,26,0.3)]"
            >
              <div className="font-serif text-[30px] font-bold leading-none">{c.value}</div>
              <div className="kicker mt-2">{c.label}</div>
            </button>
          ))}
        </div>

        <div className="mb-8 rounded-2xl border border-[var(--kma-hairline)] bg-[rgba(255,255,255,0.55)] p-5">
          <div className="kicker mb-2">Unpublished changes</div>
          {changeCount === 0 ? (
            <p className="m-0 text-sm text-[var(--kma-muted)]">
              Everything here matches the live site. Make a change and a Publish button appears at the top.
            </p>
          ) : (
            <p className="m-0 text-sm text-[var(--kma-body)]">
              <strong>
                {changeCount} change{changeCount === 1 ? "" : "s"}
              </strong>{" "}
              waiting. Press Publish at the top when you are happy, and the site rebuilds itself so the changes appear
              in a minute or two.
            </p>
          )}
          {lastCommitUrl && (
            <p className="m-0 mt-3 border-t border-[var(--kma-hairline)] pt-3 text-[13px] text-[var(--kma-muted)]">
              Last publish saved as{" "}
              <a
                href={lastCommitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--kma-gold-deep)] underline"
              >
                this commit
              </a>
              . If the site still looks old, check the Deploys tab in Netlify.
            </p>
          )}
        </div>

        <PublishHealth />

        <RatioLegend />
      </div>
    )
  }

  /**
   * Why publishing does or does not work, in plain language.
   *
   * Publishing depends on four environment variables and a GitHub token with
   * the right permission, none of which the owner can see from the browser.
   * When it failed there was nothing to look at, so this asks the server and
   * shows the answer. Collapsed when everything is fine.
   */
  function PublishHealth() {
    const failing = checks?.filter((c) => !c.ok) ?? []

    if (!checks) {
      return (
        <div className="mb-8 rounded-2xl border border-[var(--kma-hairline)] bg-[rgba(255,255,255,0.55)] p-5">
          <div className="kicker mb-2">Publishing</div>
          <p className="m-0 flex items-center gap-2 text-sm text-[var(--kma-muted)]">
            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Checking the connection to GitHub…
          </p>
        </div>
      )
    }

    if (failing.length === 0) {
      return (
        <div className="mb-8 rounded-2xl border border-[rgba(37,211,102,0.4)] bg-[rgba(37,211,102,0.08)] p-5">
          <div className="kicker mb-2">Publishing</div>
          <p className="m-0 text-sm text-[#1a7a41]">
            Connected to GitHub and Cloudinary. Anything you publish will go live on its own.
          </p>
        </div>
      )
    }

    return (
      <div className="mb-8 rounded-2xl border border-[rgba(190,60,40,0.35)] bg-[rgba(190,60,40,0.07)] p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="kicker mb-2">Publishing is not set up</div>
            <p className="m-0 mb-3 text-sm text-[var(--kma-body)]">
              {failing.length} thing{failing.length === 1 ? "" : "s"} need fixing before Publish can work. All of
              these are set in Netlify under <strong>Site configuration → Environment variables</strong>.
            </p>
          </div>
          <button
            onClick={() => void recheck()}
            className="flex-none rounded-full border border-[rgba(36,31,26,0.2)] px-3 py-1.5 text-[12px] font-semibold hover:border-[rgba(36,31,26,0.4)]"
          >
            Re-check
          </button>
        </div>
        <ul className="m-0 list-none space-y-2.5 p-0">
          {checks.map((c) => (
            <li key={c.name} className="flex items-start gap-2.5 text-[13px]">
              <span className={`mt-1.5 h-1.5 w-1.5 flex-none rounded-full ${c.ok ? "bg-[#1a7a41]" : "bg-[#8c2f1d]"}`} />
              <span className="min-w-0">
                <strong className="text-[var(--kma-ink)]">{c.name}</strong>{" "}
                <span className={c.ok ? "text-[var(--kma-muted)]" : "text-[#8c2f1d]"}>{c.detail}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="m-0 mt-4 border-t border-[rgba(190,60,40,0.2)] pt-3 text-[12px] leading-relaxed text-[var(--kma-muted)]">
          After changing a variable you must redeploy: <strong>Deploys → Trigger deploy → Clear cache and deploy
          site</strong>. Netlify reads these only when it builds, so the running site will not see a new value until
          then. This is the single most common reason publishing still fails after the variables look correct.
        </p>
      </div>
    )
  }

  function BusinessDetails() {
    const s = content.settings as Record<string, string>
    return (
      <div>
        <header className="mb-6">
          <h1 className="m-0 font-serif text-[30px] font-bold leading-tight lg:text-[38px]">Business details</h1>
        </header>
        <div className="rounded-2xl border border-[var(--kma-hairline)] bg-[rgba(255,255,255,0.55)] p-5">
          <dl className="m-0 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {["brandName", "tagline", "phone", "whatsapp", "email"].map((key) => (
              <div key={key}>
                <dt className="kicker mb-1">{key}</dt>
                <dd className="m-0 text-sm text-[var(--kma-body)]">{s[key] ?? "Not set"}</dd>
              </div>
            ))}
          </dl>
          <p className="m-0 mt-5 border-t border-[var(--kma-hairline)] pt-4 text-[12px] leading-relaxed text-[var(--kma-muted-2)]">
            These are read-only for now. The phone number and address also appear in the site&apos;s structured data
            for Google, so they need to be changed in one coordinated step. Say the word and I&apos;ll make this
            section editable.
          </p>
        </div>
      </div>
    )
  }
}

function SignIn({ onLogin }: { onLogin: (password: string) => Promise<{ ok: boolean; error?: string }> }) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError(null)
    const result = await onLogin(password)
    if (!result.ok) setError(result.error ?? "Could not sign in")
    setBusy(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#ded5c6] px-6">
      <form
        onSubmit={submit}
        className="w-full max-w-[380px] rounded-3xl border border-[var(--kma-hairline)] bg-[rgba(255,255,255,0.6)] p-8 text-center"
      >
        <div className="kicker mb-2">Studio</div>
        <h1 className="m-0 mb-3 font-serif text-[26px] font-bold leading-tight">Kanchan Marble Arts</h1>
        <p className="m-0 mb-6 text-sm leading-relaxed text-[var(--kma-muted)]">
          Sign in to manage products, photos and the announcement bar.
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          autoComplete="current-password"
          className="mb-3 w-full rounded-xl border border-[rgba(36,31,26,0.18)] bg-white px-3.5 py-3 text-center text-sm outline-none focus:border-[var(--kma-gold)]"
        />

        {error && <p className="m-0 mb-3 text-[13px] font-semibold text-[#8c2f1d]">{error}</p>}

        <button
          type="submit"
          disabled={busy || !password}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--kma-ink)] py-3.5 text-sm font-semibold text-[var(--kma-ivory)] disabled:opacity-40"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          Sign in
        </button>
      </form>
    </div>
  )
}
