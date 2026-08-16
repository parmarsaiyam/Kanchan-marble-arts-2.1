import { createHash } from "crypto"
import { isSignedIn, unauthorized } from "@/lib/cms/verify-user"

export const dynamic = "force-dynamic"

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "duuqhl0w9"

/** Folders the CMS is allowed to write into, so uploads cannot land in stray paths. */
const ALLOWED_FOLDERS = [
  "gallery/mandir",
  "gallery/murti",
  "gallery/jain",
  "gallery/articles",
  "gallery/tulsi",
  "gallery",
  "video",
  "site",
]

/**
 * Signs a direct browser upload to Cloudinary.
 *
 * The API secret stays on the server; the browser receives only a signature for
 * the exact parameters it asked for, so it cannot widen the upload's scope.
 */
export async function POST(request: Request) {
  if (!isSignedIn()) return unauthorized()

  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET
  if (!apiKey || !apiSecret) {
    return Response.json(
      { error: "Cloudinary is not configured. Set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET." },
      { status: 500 },
    )
  }

  let body: { folder?: string; publicId?: string }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }

  const folder = body.folder ?? "gallery"
  if (!ALLOWED_FOLDERS.includes(folder)) {
    return Response.json({ error: `Folder "${folder}" is not allowed` }, { status: 400 })
  }

  const timestamp = Math.round(Date.now() / 1000)

  // Cloudinary signs the alphabetically-sorted, &-joined parameter list.
  const params: Record<string, string | number> = { folder, timestamp }
  if (body.publicId) params.public_id = body.publicId

  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&")

  const signature = createHash("sha1").update(toSign + apiSecret).digest("hex")

  return Response.json({
    cloudName: CLOUD_NAME,
    apiKey,
    timestamp,
    folder,
    ...(body.publicId ? { publicId: body.publicId } : {}),
    signature,
    uploadUrl: `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
  })
}
