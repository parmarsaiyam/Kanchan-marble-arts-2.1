import { cookies } from "next/headers"
import { isValidSessionValue, SESSION_COOKIE, usingDefaultPassword } from "@/lib/cms/session"

export const dynamic = "force-dynamic"

/** Lets the CMS shell ask "am I still signed in?" on load. */
export async function GET() {
  const valid = isValidSessionValue(cookies().get(SESSION_COOKIE)?.value)
  return Response.json({ signedIn: valid, usingDefaultPassword: usingDefaultPassword() })
}
