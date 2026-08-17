"use client"

import { useCallback, useRef, useState } from "react"
import { UploadCloud, Loader2, AlertCircle } from "lucide-react"
import { cloudinaryFolders } from "@/lib/content/media-ratios"

export interface UploadedAsset {
  url: string
  width: number
  height: number
  publicId: string
  resourceType: "image" | "video"
  format: string
}

/**
 * Drop zone that uploads straight to Cloudinary using a signature minted by
 * /api/cloudinary/sign. The file never passes through our own server, so large
 * videos are not bounded by the function's request limit.
 */
export function MediaUploader({
  folder = "gallery",
  accept = "image/*",
  multiple = true,
  onUploaded,
  hint,
}: {
  folder?: (typeof cloudinaryFolders)[number] | "gallery" | "video" | "site"
  accept?: string
  multiple?: boolean
  onUploaded: (assets: UploadedAsset[]) => void
  hint?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [progress, setProgress] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)

  const uploadAll = useCallback(
    async (files: File[]) => {
      if (!files.length) return
      setBusy(true)
      setError(null)
      const done: UploadedAsset[] = []

      try {
        for (const [i, file] of files.entries()) {
          setProgress(`Uploading ${i + 1} of ${files.length}…`)

          const signRes = await fetch("/api/cloudinary/sign", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ folder }),
          })
          const sign = await signRes.json()
          if (!signRes.ok) throw new Error(sign.error || "Could not authorise the upload")

          const form = new FormData()
          form.append("file", file)
          form.append("api_key", sign.apiKey)
          form.append("timestamp", String(sign.timestamp))
          form.append("folder", sign.folder)
          form.append("signature", sign.signature)

          const upRes = await fetch(sign.uploadUrl, { method: "POST", body: form })
          const up = await upRes.json()
          if (!upRes.ok) throw new Error(up?.error?.message || `Cloudinary rejected ${file.name}`)

          done.push({
            url: up.secure_url,
            width: up.width,
            height: up.height,
            publicId: up.public_id,
            resourceType: up.resource_type === "video" ? "video" : "image",
            format: up.format,
          })
        }

        onUploaded(done)
      } catch (e) {
        setError(e instanceof Error ? e.message : "Upload failed")
      } finally {
        setBusy(false)
        setProgress(null)
        if (inputRef.current) inputRef.current.value = ""
      }
    },
    [folder, onUploaded],
  )

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          uploadAll(Array.from(e.dataTransfer.files))
        }}
        onClick={() => !busy && inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && !busy && inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-4 py-7 text-center transition-colors sm:px-6 sm:py-10 ${
          dragging
            ? "border-[var(--kma-gold)] bg-[rgba(154,123,47,0.07)]"
            : "border-[rgba(36,31,26,0.2)] hover:border-[rgba(36,31,26,0.34)]"
        } ${busy ? "pointer-events-none opacity-70" : ""}`}
      >
        {busy ? (
          <Loader2 className="mb-3 h-7 w-7 animate-spin text-[var(--kma-gold)]" />
        ) : (
          <UploadCloud className="mb-3 h-7 w-7 text-[var(--kma-gold)]" strokeWidth={1.8} />
        )}
        <div className="text-[15px] font-semibold text-[var(--kma-ink)]">
          {busy ? progress : "Drop photos or a video here"}
        </div>
        <p className="m-0 mt-1.5 max-w-[420px] text-[13px] leading-relaxed text-[var(--kma-muted)]">
          {hint ??
            `Uploads go to Cloudinary under ${folder}, the same folders the site already uses. Existing images are untouched.`}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          hidden
          onChange={(e) => uploadAll(Array.from(e.target.files ?? []))}
        />
      </div>

      {error && (
        <div className="mt-3 flex items-start gap-2 rounded-xl bg-[rgba(190,60,40,0.08)] px-3.5 py-2.5 text-[13px] text-[#8c2f1d]">
          <AlertCircle className="mt-px h-4 w-4 flex-none" strokeWidth={2} />
          {error}
        </div>
      )}
    </div>
  )
}
