import { revalidateTag } from "next/cache"
import { isSignedIn, unauthorized } from "@/lib/cms/verify-user"
import { CONTENT_TAG, getContent, rollbackContent, storeAvailable, writeContent } from "@/lib/content/store"
import type { CmsContent } from "@/lib/cms/types"

export const dynamic = "force-dynamic"

/**
 * Publishing.
 *
 * This used to commit the three content JSON files to GitHub, which meant every
 * edit produced a commit and a full Netlify rebuild. Changing one word of an
 * announcement cost two minutes, a line in the git history and a line in the
 * deploy log.
 *
 * It now writes to the Netlify Blobs content store and purges one cache tag.
 * The change is live in seconds, with no build and no commit.
 *
 * Committing to git is still possible but only on request (`backupToGit`), so a
 * milestone can be snapshotted into version history deliberately rather than
 * every small edit forcing a deploy.
 */

/** Only these paths may ever be written, whatever the client sends. */
const ALLOWED_PATHS = new Set(["content/catalog.json", "content/gallery.json", "content/settings.json"])

/** Maps a repo path back onto the slice of content it holds. */
const PATH_TO_KEY: Record<string, keyof CmsContent> = {
  "content/catalog.json": "catalog",
  "content/gallery.json": "gallery",
  "content/settings.json": "settings",
}

const GITHUB_API = "https://api.github.com"

interface IncomingFile {
  path: string
  content: string
}

function ghHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  }
}

/**
 * Turns a failed GitHub response into something the owner can act on.
 *
 * GitHub always explains itself in the body; this reads that and maps the
 * common status codes onto the actual fix.
 */
async function describeFailure(res: Response, what: string, ctx: { repo: string; branch: string }) {
  let detail = ""
  try {
    const body = (await res.json()) as { message?: string }
    detail = body?.message ?? ""
  } catch {
    detail = await res.text().catch(() => "")
  }

  const hint =
    res.status === 401
      ? "GITHUB_TOKEN is not valid. It may have expired, or been copied with a character missing."
      : res.status === 403
        ? "The token is valid but not allowed to do this. A fine-grained token needs Repository permissions → Contents: Read and write, and this repository must be in its list."
        : res.status === 404
          ? `Nothing found at ${ctx.repo} on branch ${ctx.branch}. Either GITHUB_REPO is not "owner/repository", the branch name in GITHUB_BRANCH is wrong, or the token cannot see this repository.`
          : ""

  return [`${what} failed (HTTP ${res.status}).`, detail && `GitHub said: ${detail}.`, hint].filter(Boolean).join(" ")
}

function config() {
  return {
    token: process.env.GITHUB_TOKEN,
    repo: process.env.GITHUB_REPO,
    branch: process.env.GITHUB_BRANCH || "main",
  }
}

/**
 * Preflight check, shown in the CMS so "why can I not publish" has an answer
 * without needing a change to try it with. Never echoes a secret back.
 */
export async function GET() {
  if (!isSignedIn()) return unauthorized()

  const { token, repo, branch } = config()
  const checks: { name: string; ok: boolean; detail: string }[] = []

  const blobs = await storeAvailable()
  checks.push({
    name: "Instant publishing",
    ok: blobs,
    detail: blobs
      ? "connected. Changes go live in seconds with no rebuild."
      : "the content store is not reachable, so the site is serving the copy baked into the last deploy. This is normal when running locally; on Netlify it means the deploy predates the blobs setup, so redeploy once.",
  })

  checks.push({
    name: "Image uploads",
    ok: Boolean(process.env.CLOUDINARY_API_SECRET),
    detail: process.env.CLOUDINARY_API_SECRET
      ? "Cloudinary key set."
      : "CLOUDINARY_API_SECRET is not set in Netlify, so uploading a photo will fail.",
  })

  // Optional. Only used by the "save a copy to GitHub" button.
  if (token && repo) {
    try {
      const res = await fetch(`${GITHUB_API}/repos/${repo}`, { headers: ghHeaders(token), cache: "no-store" })
      if (!res.ok) {
        checks.push({
          name: "Git backup (optional)",
          ok: false,
          detail: await describeFailure(res, "Reading the repository", { repo, branch }),
        })
      } else {
        const info = (await res.json()) as { permissions?: { push?: boolean }; default_branch?: string }
        checks.push({
          name: "Git backup (optional)",
          ok: Boolean(info.permissions?.push),
          detail: info.permissions?.push
            ? `ready. Snapshots go to ${repo} on ${branch}.`
            : "the token can read this repository but not write to it. Set Contents: Read and write.",
        })
      }
    } catch (e) {
      checks.push({
        name: "Git backup (optional)",
        ok: false,
        detail: `Could not reach github.com: ${e instanceof Error ? e.message : "unknown error"}`,
      })
    }
  } else {
    checks.push({
      name: "Git backup (optional)",
      ok: true,
      detail: "not configured. Publishing does not need it.",
    })
  }

  return Response.json({ ok: checks.every((c) => c.ok), checks })
}

/** Commits a snapshot to git. Only reached when the owner asks for one. */
async function commitToGit(files: IncomingFile[], message?: string) {
  const { token, repo, branch } = config()
  if (!token || !repo) throw new Error("GITHUB_TOKEN and GITHUB_REPO must be set to save a copy to GitHub.")
  const headers = ghHeaders(token)
  const ctx = { repo, branch }

  const refRes = await fetch(`${GITHUB_API}/repos/${repo}/git/ref/heads/${branch}`, { headers, cache: "no-store" })
  if (!refRes.ok) throw new Error(await describeFailure(refRes, `Reading branch "${branch}"`, ctx))
  const baseSha: string = (await refRes.json()).object.sha

  const commitRes = await fetch(`${GITHUB_API}/repos/${repo}/git/commits/${baseSha}`, { headers, cache: "no-store" })
  if (!commitRes.ok) throw new Error(await describeFailure(commitRes, "Reading the current commit", ctx))
  const baseCommit = await commitRes.json()

  const blobs = await Promise.all(
    files.map(async (file) => {
      const res = await fetch(`${GITHUB_API}/repos/${repo}/git/blobs`, {
        method: "POST",
        headers,
        body: JSON.stringify({ content: file.content, encoding: "utf-8" }),
      })
      if (!res.ok) throw new Error(await describeFailure(res, `Uploading ${file.path}`, ctx))
      return { path: file.path, mode: "100644" as const, type: "blob" as const, sha: (await res.json()).sha }
    }),
  )

  const treeRes = await fetch(`${GITHUB_API}/repos/${repo}/git/trees`, {
    method: "POST",
    headers,
    body: JSON.stringify({ base_tree: baseCommit.tree.sha, tree: blobs }),
  })
  if (!treeRes.ok) throw new Error(await describeFailure(treeRes, "Building the commit tree", ctx))

  const newCommitRes = await fetch(`${GITHUB_API}/repos/${repo}/git/commits`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      message: `${message?.trim() || "CMS: content snapshot"}\n\nSaved from the studio CMS.`,
      tree: (await treeRes.json()).sha,
      parents: [baseSha],
    }),
  })
  if (!newCommitRes.ok) throw new Error(await describeFailure(newCommitRes, "Creating the commit", ctx))
  const newCommit = await newCommitRes.json()

  const updateRes = await fetch(`${GITHUB_API}/repos/${repo}/git/refs/heads/${branch}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ sha: newCommit.sha, force: false }),
  })
  if (!updateRes.ok) throw new Error(await describeFailure(updateRes, "Moving the branch", ctx))

  return `https://github.com/${repo}/commit/${newCommit.sha}`
}

export async function POST(request: Request) {
  if (!isSignedIn()) return unauthorized()

  let body: { files?: IncomingFile[]; message?: string; backupToGit?: boolean; action?: string }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }

  // Undo the last publish. Also instant, also no rebuild.
  if (body.action === "rollback") {
    try {
      const done = await rollbackContent()
      if (!done) return Response.json({ error: "There is no earlier version to go back to." }, { status: 400 })
      revalidateTag(CONTENT_TAG)
      return Response.json({ ok: true, note: "Rolled back. The site is already showing the previous version." })
    } catch (e) {
      return Response.json({ error: e instanceof Error ? e.message : "Rollback failed" }, { status: 502 })
    }
  }

  const files = body.files ?? []
  if (!files.length) return Response.json({ error: "Nothing to publish" }, { status: 400 })

  const parsed: Partial<CmsContent> = {}
  for (const file of files) {
    if (!ALLOWED_PATHS.has(file.path)) {
      return Response.json({ error: `Refusing to write ${file.path}` }, { status: 400 })
    }
    try {
      Object.assign(parsed, { [PATH_TO_KEY[file.path]]: JSON.parse(file.content) })
    } catch {
      return Response.json({ error: `${file.path} is not valid JSON` }, { status: 400 })
    }
  }

  try {
    // Start from what is live and lay the changed slices on top, so publishing
    // one section can never blank out another.
    const current = await getContent()
    const next: CmsContent = { ...current, ...parsed }

    await writeContent(next)
    // Purges the cached read in lib/content/store, so the next request to any
    // page already sees the new content.
    revalidateTag(CONTENT_TAG)

    let commitUrl: string | null = null
    if (body.backupToGit) {
      commitUrl = await commitToGit(files, body.message)
    }

    return Response.json({
      ok: true,
      commitUrl,
      files: files.map((f) => f.path),
      note: commitUrl
        ? "Live now. A copy was also committed to GitHub, which will trigger a rebuild."
        : "Live now. No rebuild needed.",
    })
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "Publish failed" }, { status: 502 })
  }
}
