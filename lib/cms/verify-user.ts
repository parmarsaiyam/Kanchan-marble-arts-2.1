import { cookies } from "next/headers"
import { isValidSessionValue, SESSION_COOKIE } from "./session"

/**
 * Guard for every CMS write route.
 *
 * Checks the signed session cookie set by /api/cms/login. Because the check
 * lives here on the server, the upload and publish routes stay protected
 * even if someone calls them directly with curl.
 */
export function isSignedIn(): boolean {
  return isValidSessionValue(cookies().get(SESSION_COOKIE)?.value)
}

/** Standard 401 so every protected route fails identically. */
export function unauthorized() {
  return Response.json({ error: "Not signed in" }, { status: 401 })
}
