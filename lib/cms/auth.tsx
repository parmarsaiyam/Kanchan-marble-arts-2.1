"use client"

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"

/**
 * Client half of CMS auth.
 *
 * There is no token to juggle: signing in sets an httpOnly cookie the browser
 * attaches to every same-origin request automatically. This context only tracks
 * *whether* we are signed in, so the UI can show the lock screen or the CMS.
 */
interface AuthValue {
  signedIn: boolean
  /** False until we have asked the server, so we don't flash the lock screen. */
  ready: boolean
  /** True while the deployment is still on the placeholder password. */
  insecureDefault: boolean
  login: (password: string) => Promise<{ ok: boolean; error?: string }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [signedIn, setSignedIn] = useState(false)
  const [ready, setReady] = useState(false)
  const [insecureDefault, setInsecureDefault] = useState(false)

  // Ask the server whether the existing cookie is still valid.
  useEffect(() => {
    let cancelled = false
    fetch("/api/cms/session")
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return
        setSignedIn(Boolean(d.signedIn))
        setInsecureDefault(Boolean(d.usingDefaultPassword))
      })
      .catch(() => undefined)
      .finally(() => !cancelled && setReady(true))
    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback(async (password: string) => {
    const res = await fetch("/api/cms/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      setSignedIn(true)
      return { ok: true }
    }
    const body = await res.json().catch(() => ({}))
    return { ok: false, error: body.error ?? "Could not sign in" }
  }, [])

  const logout = useCallback(async () => {
    await fetch("/api/cms/logout", { method: "POST" })
    setSignedIn(false)
  }, [])

  return (
    <AuthContext.Provider value={{ signedIn, ready, insecureDefault, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>")
  return ctx
}
