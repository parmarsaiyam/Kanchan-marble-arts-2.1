import { unstable_cache } from "next/cache"
import catalogSeed from "@/content/catalog.json"
import gallerySeed from "@/content/gallery.json"
import settingsSeed from "@/content/settings.json"
import type { CmsContent } from "@/lib/cms/types"

/**
 * Where the site's editable content actually comes from.
 *
 * It used to be the three JSON files in content/, compiled straight into the
 * pages. That meant every CMS edit had to become a git commit and a full
 * Netlify rebuild: two minutes, a commit in the history and a line in the
 * deploy log, for changing one line of an announcement.
 *
 * Content now lives in a Netlify Blobs store, which is a key-value bucket that
 * comes with the site at no extra cost. Publishing writes to it and purges the
 * cache below, so the change is live in seconds with no build and no commit.
 *
 * The JSON files stay in the repo as the seed. They are what a brand new
 * deployment starts from, and what the site falls back to if the store is ever
 * unreachable, so the site can never render empty.
 */

const STORE_NAME = "kma-content"
const KEY = "content"
const PREVIOUS_KEY = "content-previous"

/** Cache tag purged on publish. See app/api/cms/publish. */
export const CONTENT_TAG = "kma-content"

/** What ships in the repo. The floor the site can always fall back to. */
export function seedContent(): CmsContent {
  return {
    catalog: catalogSeed as CmsContent["catalog"],
    gallery: gallerySeed as unknown as CmsContent["gallery"],
    settings: settingsSeed as CmsContent["settings"],
  }
}

/**
 * Blobs is only wired up when the code runs on Netlify. Locally, and during the
 * build, `getStore` throws for want of a site id, which is why every call here
 * is wrapped and falls back to the seed rather than failing the page.
 */
async function store() {
  const { getStore } = await import("@netlify/blobs")
  // Strong consistency: after publishing, the very next read has to see the new
  // value, otherwise the owner reloads and thinks nothing happened.
  return getStore({ name: STORE_NAME, consistency: "strong" })
}

async function readFromBlobs(): Promise<CmsContent | null> {
  try {
    const value = (await (await store()).get(KEY, { type: "json" })) as CmsContent | null
    // A partial object would render half a site, so treat anything missing a
    // slice as unusable and let the seed take over.
    if (!value?.catalog?.products || !value?.gallery?.images || !value?.settings) return null
    return value
  } catch {
    return null
  }
}

/**
 * The content every page reads.
 *
 * Wrapped in `unstable_cache` so a page render does not hit the blob store on
 * every request; the tag lets publishing purge it immediately. `revalidate` is
 * the safety net: if a tag purge is ever missed, the site still picks the
 * change up within a minute on its own.
 */
export const getContent = unstable_cache(async () => (await readFromBlobs()) ?? seedContent(), ["kma-content-v1"], {
  tags: [CONTENT_TAG],
  revalidate: 60,
})

/** Replaces the live content. Called only by the authenticated publish route. */
export async function writeContent(next: CmsContent) {
  const s = await store()
  // Keep one version back, so a bad publish can be undone without a deploy.
  const current = await s.get(KEY, { type: "json" }).catch(() => null)
  if (current) await s.setJSON(PREVIOUS_KEY, current)
  await s.setJSON(KEY, next)
}

/** Swaps the live content back to the version before the last publish. */
export async function rollbackContent(): Promise<boolean> {
  const s = await store()
  const previous = (await s.get(PREVIOUS_KEY, { type: "json" }).catch(() => null)) as CmsContent | null
  if (!previous) return false
  await s.setJSON(KEY, previous)
  return true
}

/** True when this deployment can actually store content, i.e. it is on Netlify. */
export async function storeAvailable() {
  try {
    await (await store()).get(KEY, { type: "json" })
    return true
  } catch {
    return false
  }
}
