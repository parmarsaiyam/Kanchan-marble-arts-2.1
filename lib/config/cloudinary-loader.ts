/**
 * Custom next/image loader. Every photo on this site lives in Cloudinary.
 *
 * Before this, `next/image` proxied each request through Netlify's image CDN,
 * which meant the browser waited on two CDNs in series: Netlify fetched the
 * file from Cloudinary, resized it, then sent it on. Cloudinary already does
 * resizing and format conversion, so that middle hop was pure latency, and on
 * Netlify it was metered.
 *
 * Now the browser talks to Cloudinary directly. One hop, and the transform is
 * part of the URL, so every size is cached at the edge forever.
 *
 * `f_auto` picks AVIF or WebP per browser, `q_auto:good` compresses by content
 * rather than a fixed number, and `c_limit` never upscales past the original.
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "duuqhl0w9"
const UPLOAD = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`

/** A Cloudinary transform segment: `f_auto`, `w_800`, or several comma-joined. */
const TRANSFORM_SEGMENT = /^[a-z]{1,3}_[^,/]+(?:,[a-z]{1,3}_[^,/]+)*$/

/** Cloudinary's optional cache-busting version, e.g. `v1758472180`. */
const VERSION_SEGMENT = /^v\d+$/

/**
 * Strips whatever transform a URL was hand-written with, so ours is the only
 * one applied. Keeps any version segment, which is part of the asset identity.
 */
function publicPathOf(afterUpload: string): string {
  const parts = afterUpload.split("/").filter(Boolean)
  if (parts.length > 1 && TRANSFORM_SEGMENT.test(parts[0]) && !VERSION_SEGMENT.test(parts[0])) {
    parts.shift()
  }
  return parts.join("/")
}

/**
 * The "washed" look, previously a CSS `filter` on the element.
 *
 * A filter is recomputed by the GPU on every paint, and these images sit on the
 * hero carousel where they are also being transformed, so the browser was
 * re-filtering a full-bleed photo every frame of the transition. Cloudinary can
 * apply the same colour shift once, cache the result at the edge, and send a
 * plain image that costs nothing to draw.
 */
const WASH = "e_saturation:-12,e_contrast:-4,e_brightness:3"

/** Prefix a public id with this to get the washed treatment. */
export const WASH_PREFIX = "wash:"

export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}): string {
  const washed = src.startsWith(WASH_PREFIX)
  if (washed) src = src.slice(WASH_PREFIX.length)

  // A fixed quality is only honoured when a component asks for one. Otherwise
  // q_auto:good, which spends more bytes on detailed carving and fewer on flat
  // marble, and drops further on a slow connection.
  const q = quality ? `q_${quality}` : "q_auto:good"
  const transform = `f_auto,${q},w_${width},c_limit${washed ? `,${WASH}` : ""}`

  if (src.startsWith(`${UPLOAD}/`)) {
    return `${UPLOAD}/${transform}/${publicPathOf(src.slice(UPLOAD.length + 1))}`
  }

  // A Cloudinary URL from another account, or any other host. Leave it alone
  // rather than building a URL that would 404.
  if (src.startsWith("http://") || src.startsWith("https://")) return src

  // Anything still served from /public (the logo, the icons). No transform is
  // possible, so hand back the path untouched.
  if (src.startsWith("/")) return src

  // A bare public id such as "images/Home.webp".
  return `${UPLOAD}/${transform}/${src}`
}
