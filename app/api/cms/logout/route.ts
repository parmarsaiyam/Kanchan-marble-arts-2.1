import { cookies } from "next/headers"
import { SESSION_COOKIE, sessionCookieOptions } from "@/lib/cms/session"

export const dynamic = "force-dynamic"

/** Clears the session cookie. */
export async function POST() {
  cookies().set(SESSION_COOKIE, "", { ...sessionCookieOptions, maxAge: 0 })
  return Response.json({ ok: true })
}
