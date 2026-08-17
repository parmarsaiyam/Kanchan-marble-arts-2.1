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
 * Turns a failed GitHub response into something the owner can act on.
 *
 * Every failure here used to collapse into one of a handful of generic strings
 * ("Could not read branch main"), which said nothing about whether the token
 * was missing a scope, pointed at the wrong repo, or had simply expired. GitHub
 * always explains itself in the body; this reads that and maps the common
 * status codes onto the actual fix.
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
          : res.status === 409
            ? "The branch moved while publishing. Reload the CMS and publish again."
            : ""

  return [`${what} failed (HTTP ${res.status}).`, detail && `GitHub said: ${detail}.`, hint]
    .filter(Boolean)
    .join(" ")
}

function config() {
  return {
    token: process.env.GITHUB_TOKEN,
    repo: process.env.GITHUB_REPO,
    branch: process.env.GITHUB_BRANCH || "main",
  }
}

/**
 * Preflight check, called by the CMS before it offers a Publish button.
 *
 * Answers "why can I not publish" without needing a change to try it with, and
 * without ever echoing a secret back to the browser.
 */
export async function GET() {
  if (!isSignedIn()) return unauthorized()

  const { token, repo, branch } = config()
  const checks: { name: string; ok: boolean; detail: string }[] = []

  checks.push({
    name: "GITHUB_TOKEN",
    ok: Boolean(token),
    detail: token ? `set, ${token.length} characters` : "not set in Netlify",
  })
  checks.push({
    name: "GITHUB_REPO",
    ok: Boolean(repo && /^[^/\s]+\/[^/\s]+$/.test(repo)),
    detail: repo ? `"${repo}"` : "not set in Netlify",
  })
  checks.push({ name: "GITHUB_BRANCH", ok: true, detail: `"${branch}"` })
  checks.push({
    name: "CLOUDINARY_API_SECRET",
    ok: Boolean(process.env.CLOUDINARY_API_SECRET),
    detail: process.env.CLOUDINARY_API_SECRET ? "set, uploads will work" : "not set, image uploads will fail",
  })

  if (token && repo) {
    try {
      const res = await fetch(`${GITHUB_API}/repos/${repo}`, { headers: ghHeaders(token), cache: "no-store" })
      if (!res.ok) {
        checks.push({ name: "Repository access", ok: false, detail: await describeFailure(res, "Reading the repository", { repo, branch }) })
      } else {
        const info = (await res.json()) as { permissions?: { push?: boolean }; default_branch?: string }
        const canPush = Boolean(info.permissions?.push)
        checks.push({
          name: "Repository access",
          ok: canPush,
          detail: canPush
            ? "the token can read and write this repository"
            : "the token can read this repository but not write to it. Set Contents: Read and write on the token.",
        })

        const refRes = await fetch(`${GITHUB_API}/repos/${repo}/git/ref/heads/${branch}`, {
          headers: ghHeaders(token),
          cache: "no-store",
        })
        checks.push({
          name: `Branch "${branch}"`,
          ok: refRes.ok,
          detail: refRes.ok
            ? "found"
            : `not found. This repository's default branch is "${info.default_branch}". Set GITHUB_BRANCH to that.`,
        })
      }
    } catch (e) {
      checks.push({
        name: "Repository access",
        ok: false,
        detail: `Could not reach github.com: ${e instanceof Error ? e.message : "unknown error"}`,
      })
    }
  }

  return Response.json({ ok: checks.every((c) => c.ok), checks })
}

/**
 * Commits the changed content files to the configured branch, which triggers a
 * Netlify rebuild and puts the changes live.
 *
 * Files go up as a single tree + commit rather than one Contents-API call each:
 * separate calls would produce a build per file, and a half-applied set if one
 * of them failed.
 */
export async function POST(request: Request) {
  if (!isSignedIn()) return unauthorized()

  const { token, repo, branch } = config()

  if (!token || !repo) {
    const missing = [!token && "GITHUB_TOKEN", !repo && "GITHUB_REPO"].filter(Boolean).join(" and ")
    return Response.json(
      {
        error: `Publishing is not configured: ${missing} ${missing.includes("and") ? "are" : "is"} not set. Add ${missing.includes("and") ? "them" : "it"} in Netlify under Site configuration → Environment variables, then run Deploys → Trigger deploy → Clear cache and deploy site. Environment variables only take effect on a new build.`,
      },
      { status: 500 },
    )
  }

  if (!/^[^/\s]+\/[^/\s]+$/.test(repo)) {
    return Response.json(
      { error: `GITHUB_REPO is "${repo}". It has to be in the form owner/repository, with no https:// and no .git.` },
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
  const ctx = { repo, branch }

  try {
    // 1. Where the branch currently points.
    const refRes = await fetch(`${GITHUB_API}/repos/${repo}/git/ref/heads/${branch}`, { headers, cache: "no-store" })
    if (!refRes.ok) throw new Error(await describeFailure(refRes, `Reading branch "${branch}"`, ctx))
    const ref = await refRes.json()
    const baseSha: string = ref.object.sha

    const commitRes = await fetch(`${GITHUB_API}/repos/${repo}/git/commits/${baseSha}`, { headers, cache: "no-store" })
    if (!commitRes.ok) throw new Error(await describeFailure(commitRes, "Reading the current commit", ctx))
    const baseCommit = await commitRes.json()

    // 2. A blob per changed file.
    const blobs = await Promise.all(
      files.map(async (file) => {
        const res = await fetch(`${GITHUB_API}/repos/${repo}/git/blobs`, {
          method: "POST",
          headers,
          body: JSON.stringify({ content: file.content, encoding: "utf-8" }),
        })
        if (!res.ok) throw new Error(await describeFailure(res, `Uploading ${file.path}`, ctx))
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
    if (!treeRes.ok) throw new Error(await describeFailure(treeRes, "Building the commit tree", ctx))
    const tree = await treeRes.json()

    const message =
      body.message?.trim() || `CMS: update ${files.map((f) => f.path.replace("content/", "")).join(", ")}`

    const newCommitRes = await fetch(`${GITHUB_API}/repos/${repo}/git/commits`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        message: `${message}\n\nPublished from the studio CMS.`,
        tree: tree.sha,
        parents: [baseSha],
      }),
    })
    if (!newCommitRes.ok) throw new Error(await describeFailure(newCommitRes, "Creating the commit", ctx))
    const newCommit = await newCommitRes.json()

    // 4. Fast-forward the branch. Not forced: if someone else pushed while the
    //    owner was editing, this fails rather than discarding their work.
    const updateRes = await fetch(`${GITHUB_API}/repos/${repo}/git/refs/heads/${branch}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ sha: newCommit.sha, force: false }),
    })
    if (!updateRes.ok) {
      const detail = await describeFailure(updateRes, "Moving the branch", ctx)
      return Response.json(
        {
          error:
            updateRes.status === 422
              ? "The site changed while you were editing. Reload the CMS to pick up the latest version, then publish again."
              : detail,
        },
        { status: updateRes.status === 422 ? 409 : 502 },
      )
    }

    return Response.json({
      ok: true,
      commit: newCommit.sha,
      commitUrl: `https://github.com/${repo}/commit/${newCommit.sha}`,
      files: files.map((f) => f.path),
      note: "Netlify is rebuilding. Changes are usually live within a couple of minutes.",
    })
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "Publish failed" }, { status: 502 })
  }
}
