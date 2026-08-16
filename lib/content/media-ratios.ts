/**
 * Where every image on the site is used, and the shape it is cropped to.
 *
 * The CMS shows this to the owner at upload time ("Shapes we crop to" in the
 * design), so a photo is never uploaded in a shape that will be centre-cropped
 * badly. Each entry is taken from the actual `aspect-*` class the section
 * renders. If you change a section's aspect ratio, change it here too.
 */

export interface MediaSlot {
  /** Stable id used by the CMS uploader. */
  id: string
  /** Human label shown in the CMS. */
  label: string
  /** Where it appears, in the owner's words. */
  usedIn: string
  /** `width / height`. */
  ratio: [number, number]
  /** Shortest acceptable long edge, in pixels. */
  minWidth: number
  /** Guidance shown under the crop preview. */
  note: string
  /** Cloudinary folder new uploads should join. */
  folder?: string
}

export const mediaSlots: MediaSlot[] = [
  {
    id: "product-cover",
    label: "Portrait 4:5, product cover",
    usedIn: "Collections grid, home featured pieces, quick view",
    ratio: [4, 5],
    minWidth: 1200,
    note: "The cover is cropped to this. Keep the piece centred with a little headroom.",
    folder: "gallery/mandir",
  },
  {
    id: "product-hero",
    label: "Portrait 4:5, product detail hero",
    usedIn: "Product detail page, main image",
    ratio: [4, 5],
    minWidth: 1600,
    note: "Shot upright, full mandir in frame. Crops to a square on phones, so keep the subject central.",
  },
  {
    id: "product-thumb",
    label: "Square 1:1, detail thumbnails",
    usedIn: "Product detail thumbnail strip",
    ratio: [1, 1],
    minWidth: 600,
    note: "Close-ups of carving and stone.",
  },
  {
    id: "category-tile",
    label: "Tall 3:4, category tile",
    usedIn: "Home collections row",
    ratio: [3, 4],
    minWidth: 960,
    note: "One representative piece per category, shot tall.",
  },
  {
    id: "stone-swatch",
    label: "Square 1:1, stone swatch",
    usedIn: "Studio page, the three marbles",
    ratio: [1, 1],
    minWidth: 800,
    note: "Fill the frame with the stone surface. No background.",
  },
  {
    id: "workshop",
    label: "Landscape 3:2, workshop",
    usedIn: "Home workshop split, Craft page steps",
    ratio: [3, 2],
    minWidth: 1400,
    note: "Wide shots of the bench, tools or a carver at work.",
  },
  {
    id: "about-banner",
    label: "Wide 2:1, full-bleed banner",
    usedIn: "Studio page banner",
    ratio: [2, 1],
    minWidth: 1800,
    note: "Very wide. Anchored slightly above centre, so leave room at the top.",
  },
  {
    id: "jain-band",
    label: "Landscape 5:4, Jain heritage band",
    usedIn: "Studio page dark band",
    ratio: [5, 4],
    minWidth: 1200,
    note: "Sits on a dark background, so brighter shots read better here.",
  },
  {
    id: "hero-slide",
    label: "Near-square 11:10, hero carousel",
    usedIn: "Homepage hero carousel",
    ratio: [11, 10],
    minWidth: 1400,
    note: "Slowly zooms while it is on screen, so leave a little margin around the piece.",
  },
  {
    id: "video",
    label: "Wide 16:9, video and poster",
    usedIn: "Product videos, workshop clips",
    ratio: [16, 9],
    minWidth: 1280,
    note: "Filmed sideways, not upright. Always needs a poster image, because video never autoplays with sound.",
    folder: "video",
  },
  {
    id: "og-image",
    label: "Social card 1.91:1",
    usedIn: "WhatsApp, Facebook and Google previews",
    ratio: [1200, 630],
    minWidth: 1200,
    note: "What people see when the link is shared. Text near the edges gets cropped.",
  },
]

/**
 * Gallery photos are laid out in a masonry flow and keep whatever shape they
 * arrive in, and nothing is cropped there.
 */
export const galleryKeepsAnyShape = true

/** Cloudinary folders already in use, so new uploads join the right one. */
export const cloudinaryFolders = [
  "gallery/mandir",
  "gallery/murti",
  "gallery/jain",
  "gallery/articles",
  "gallery/tulsi",
] as const

export function ratioLabel(slot: MediaSlot) {
  const [w, h] = slot.ratio
  return `${w}:${h}`
}

export function ratioPercent(slot: MediaSlot) {
  const [w, h] = slot.ratio
  return (h / w) * 100
}

export function getSlot(id: string) {
  return mediaSlots.find((s) => s.id === id)
}
