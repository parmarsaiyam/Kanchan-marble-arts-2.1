import { isSignedIn, unauthorized } from "@/lib/cms/verify-user"
import { getContent } from "@/lib/content/store"

export const dynamic = "force-dynamic"

/**
 * The content the site is serving right now.
 *
 * The CMS uses this as the baseline it diffs drafts against. It used to diff
 * against the JSON compiled into the page, which was a deploy old the moment
 * anything was published, so the header kept claiming there were unpublished
 * changes that had in fact already gone live.
 */
export async function GET() {
  if (!isSignedIn()) return unauthorized()
  return Response.json({ content: await getContent() })
}
