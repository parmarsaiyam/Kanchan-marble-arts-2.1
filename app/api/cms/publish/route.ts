import { isSignedIn, unauthorized } from "@/lib/cms/verify-user"

export const dynamic = "force-dynamic"

/** Only these paths may ever be written, whatever the client sends. */
const ALLOWED_PATHS = new Set(["content/catalog.json", "content/gallery.json", "content/settings.json"])

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
 * Commits the changed content files to the default branch, which triggers a
 * Netlify rebuild and puts the changes live.
 *
 * Files are committed as a single tree + commit rather than one Contents-API
 * call each: separate calls would produce a build per file, and a half-applied
 * set if one of them failed.
 */
export async function POST(request: Request) {
  if (!isSignedIn()) return unauthorized()

  const token = process.env.GITHUB_TOKEN
  const repo = process.env.GITHUB_REPO // "owner/name"
  const branch = process.env.GITHUB_BRANCH || "main"

  if (!token || !repo) {
    return Response.json(
      { error: "Publishing is not configured. Set GITHUB_TOKEN and GITHUB_REPO." },
      { status: 500 },
    )
  }

  let body: { files?: IncomingFile[]; message?: string }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }

  const files = body.files ?? []
  if (!files.length) return Response.json({ error: "Nothing to publish" }, { status: 400 })

  for (const file of files) {
    if (!ALLOWED_PATHS.has(file.path)) {
      return Response.json({ error: `Refusing to write ${file.path}` }, { status: 400 })
    }
    try {
      JSON.parse(file.content)
    } catch {
      return Response.json({ error: `${file.path} is not valid JSON` }, { status: 400 })
    }
  }

  const headers = ghHeaders(token)

  try {
    // 1. Where the branch currently points.
    const refRes = await fetch(`${GITHUB_API}/repos/${repo}/git/ref/heads/${branch}`, { headers, cache: "no-store" })
    if (!refRes.ok) throw new Error(`Could not read branch ${branch} (${refRes.status})`)
    const ref = await refRes.json()
    const baseSha: string = ref.object.sha

    const commitRes = await fetch(`${GITHUB_API}/repos/${repo}/git/commits/${baseSha}`, { headers, cache: "no-store" })
    if (!commitRes.ok) throw new Error("Could not read the current commit")
    const baseCommit = await commitRes.json()

    // 2. A blob per changed file.
    const blobs = await Promise.all(
      files.map(async (file) => {
        const res = await fetch(`${GITHUB_API}/repos/${repo}/git/blobs`, {
          method: "POST",
          headers,
          body: JSON.stringify({ content: file.content, encoding: "utf-8" }),
        })
        if (!res.ok) throw new Error(`Could not upload ${file.path}`)
        const blob = await res.json()
        return { path: file.path, mode: "100644" as const, type: "blob" as const, sha: blob.sha }
      }),
    )

    // 3. One tree, one commit, one build.
    const treeRes = await fetch(`${GITHUB_API}/repos/${repo}/git/trees`, {
      method: "POST",
      headers,
      body: JSON.stringify({ base_tree: baseCommit.tree.sha, tree: blobs }),
    })
    if (!treeRes.ok) throw new Error("Could not build the commit tree")
    const tree = await treeRes.json()

    const message =
      body.message?.trim() ||
      `CMS: update ${files.map((f) => f.path.replace("content/", "")).join(", ")}`

    const newCommitRes = await fetch(`${GITHUB_API}/repos/${repo}/git/commits`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        message: `${message}\n\nPublished from the studio CMS.`,
        tree: tree.sha,
        parents: [baseSha],
      }),
    })
    if (!newCommitRes.ok) throw new Error("Could not create the commit")
    const newCommit = await newCommitRes.json()

    // 4. Fast-forward the branch. Not forced: if someone else pushed while the
    //    owner was editing, this fails rather than discarding their work.
    const updateRes = await fetch(`${GITHUB_API}/repos/${repo}/git/refs/heads/${branch}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ sha: newCommit.sha, force: false }),
    })
    if (!updateRes.ok) {
      return Response.json(
        {
          error:
            "The site changed while you were editing. Reload the CMS to pick up the latest version, then publish again.",
        },
        { status: 409 },
      )
    }

    return Response.json({
      ok: true,
      commit: newCommit.sha,
      files: files.map((f) => f.path),
      note: "Netlify is rebuilding. Changes are usually live within a couple of minutes.",
    })
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "Publish failed" }, { status: 502 })
  }
}
