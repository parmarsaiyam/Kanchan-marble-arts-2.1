/**
 * Every image the site renders from code, in one place.
 *
 * The local copies under public/images were deleted, so these are Cloudinary
 * public ids. The custom loader in ./cloudinary-loader turns each one into a
 * full URL at the exact width the browser asked for, which is why no
 * transformation appears here.
 *
 * Photos the owner manages (gallery items, product shots) are not listed here.
 * Those live in content/*.json and are edited through the CMS.
 */

import { WASH_PREFIX } from "./cloudinary-loader"

/** Marks a Cloudinary public id, for readability at the call sites. */
const cld = (publicId: string) => publicId

export const media = {
  /** Hero carousel, home page. */
  heroMandir: cld("images/Home.webp"),
  heroJain: cld("gallery/jain/J-3.webp"),
  heroMurti: cld("gallery/murti/tirthanker-1.webp"),
  heroTemple: cld("gallery/mandir/M-5.webp"),

  /** Home collection tiles. */
  collectionMandirs: cld("images/mmandir.webp"),
  collectionMurtis: cld("images/murti.webp"),
  collectionArticles: cld("images/articles.webp"),
  collectionJain: cld("images/jain.webp"),

  /** The workshop, used on home, about and the craft page. */
  workshop: cld("images/abouttop.webp"),
  jainHeritage: cld("images/aboutbottom.webp"),

  /** Stone swatches on the about page. */
  stoneAustralian: cld("images/australian.webp"),
  stoneIndian: cld("images/indian.webp"),
  stoneItalian: cld("images/italian.webp"),

  /** Craft page, one per step. */
  stepConsult: cld("images/abouttop.webp"),
  stepPlanning: cld("images/italian.webp"),
  stepCrafting: cld("gallery/murti/tirthanker-1.webp"),
  stepInstall: cld("gallery/mandir/M-7.webp"),

  /** Home gallery mosaic. */
  mosaic: [
    cld("gallery/mandir/M-3.webp"),
    cld("gallery/murti/hanuman-1.webp"),
    cld("gallery/murti/Rk.webp"),
    cld("gallery/TS-1.webp"),
    cld("gallery/A-2.webp"),
    cld("gallery/mandir/M-2.webp"),
  ],

  /** Jain band, home page. */
  jainBandLeft: cld("gallery/jain/J-3.webp"),
  jainBandRight: cld("gallery/jain/J-5.webp"),

  /** Still in /public: small, needed immediately, and not worth a second host. */
  logo: "/images/kma-logo.png",
} as const

/**
 * Marks an image for the softened, slightly desaturated treatment.
 *
 * This used to be a CSS `filter` on the element, which the GPU re-applied on
 * every paint. Cloudinary now does it once and caches the result, so the
 * browser draws an ordinary image. Same look, none of the per-frame cost.
 */
export function washed(publicId: string) {
  return `${WASH_PREFIX}${publicId}`
}

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "duuqhl0w9"

/**
 * A fully-formed Cloudinary URL, for the places `next/image` cannot reach:
 * OpenGraph tags, structured data and the manifest. `c_pad` letterboxes onto
 * the page's ivory rather than cropping, so nothing important is cut off.
 */
export function socialImage(publicId: string = media.heroMandir, width = 1200, height = 630) {
  const transform = `c_pad,w_${width},h_${height},b_rgb:f5f1ea,f_jpg,q_auto:good`
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transform}/${publicId}`
}
