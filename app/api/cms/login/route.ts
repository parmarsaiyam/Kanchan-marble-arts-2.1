import { cookies } from "next/headers"
import { createSessionValue, passwordMatches, SESSION_COOKIE, sessionCookieOptions } from "@/lib/cms/session"

export const dynamic = "force-dynamic"

/** Exchanges the CMS password for a signed, httpOnly session cookie. */
export async function POST(request: Request) {
  let body: { password?: string }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 })
  }

  if (!body.password || !passwordMatches(body.password)) {
    // Deliberately vague: never confirm whether a password was "close".
    return Response.json({ error: "Incorrect password" }, { status: 401 })
  }

  cookies().set(SESSION_COOKIE, createSessionValue(), sessionCookieOptions)
  return Response.json({ ok: true })
}
