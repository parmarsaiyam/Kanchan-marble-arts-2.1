"use client"

import { useState } from "react"
import { ChevronLeft, Plus, Star, Trash2, X } from "lucide-react"
import { useDraft } from "@/lib/cms/draft-store"
import type { CatalogProduct, ItemStatus, Translated } from "@/lib/cms/types"
import { getSlot } from "@/lib/content/media-ratios"
import { MediaUploader, type UploadedAsset } from "./media-uploader"
import { RatioLegend, RatioNote } from "./ratio-legend"
import { Field, StatusBadge, TextInput, Toggle, TranslatedField, TranslationStatus } from "./fields"
import type { Locale } from "@/lib/i18n/config"

const CATEGORIES = ["Mandirs", "Murtis", "Articles", "Jain"]

/** Folds the plain English field and its i18n siblings into one tabbed value. */
function toTranslated(base: string, extra?: Translated): Translated {
  return { en: base, ...(extra ?? {}) }
}
function fromTranslated(value: Translated) {
  const { en = "", ...rest } = value
  return { base: en, extra: rest }
}

export function ProductEditor() {
  const { content, update } = useDraft()
  const products = content.catalog.products
  const [editing, setEditing] = useState<string | null>(null)

  const setProducts = (next: CatalogProduct[]) => update("catalog", { ...content.catalog, products: next })
  const patch = (slug: string, changes: Partial<CatalogProduct>) =>
    setProducts(products.map((p) => (p.slug === slug ? { ...p, ...changes } : p)))

  const product = products.find((p) => p.slug === editing)

  if (product) {
    return <SingleProduct product={product} onBack={() => setEditing(null)} onPatch={patch} />
  }

  return (
    <div>
      <header className="mb-6">
        <h1 className="m-0 font-serif text-[30px] font-bold leading-tight lg:text-[38px]">Products</h1>
        <p className="m-0 mt-1.5 text-sm text-[var(--kma-muted)]">
          {products.length} pieces · {products.filter((p) => p.status === "live").length} live
        </p>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((p) => (
          <button
            key={p.slug}
            onClick={() => setEditing(p.slug)}
            className="flex gap-3.5 rounded-2xl border border-[var(--kma-hairline)] bg-[rgba(255,255,255,0.55)] p-3 text-left transition-colors hover:border-[rgba(36,31,26,0.3)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.image}
              alt=""
              className="h-[72px] w-[58px] flex-none rounded-lg bg-[var(--kma-surface)] object-cover"
              loading="lazy"
            />
            <div className="min-w-0">
              <div className="mb-1 flex items-center gap-2">
                <StatusBadge status={p.status} />
                {p.featured && <Star className="h-3.5 w-3.5 text-[var(--kma-gold)]" fill="currentColor" />}
              </div>
              <div className="truncate text-sm font-bold text-[var(--kma-ink)]">{p.title}</div>
              <div className="text-[12px] text-[var(--kma-muted-2)]">
                {p.category} · {p.price}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function SingleProduct({
  product,
  onBack,
  onPatch,
}: {
  product: CatalogProduct
  onBack: () => void
  onPatch: (slug: string, changes: Partial<CatalogProduct>) => void
}) {
  const i18n = product.i18n ?? {}
  const coverSlot = getSlot("product-cover")!

  const setTitle = (value: Translated) => {
    const { base, extra } = fromTranslated(value)
    onPatch(product.slug, { title: base, i18n: { ...i18n, title: extra } })
  }
  const setDescription = (value: Translated) => {
    const { base, extra } = fromTranslated(value)
    onPatch(product.slug, { description: base, i18n: { ...i18n, description: extra } })
  }
  const setPrice = (value: Translated) => {
    const { base, extra } = fromTranslated(value)
    onPatch(product.slug, { price: base, i18n: { ...i18n, price: extra } })
  }

  const setFeature = (index: number, text: string) =>
    onPatch(product.slug, { features: product.features.map((f, i) => (i === index ? text : f)) })
  const addFeature = () => onPatch(product.slug, { features: [...product.features, ""] })
  const removeFeature = (index: number) =>
    onPatch(product.slug, { features: product.features.filter((_, i) => i !== index) })

  const onUploaded = (assets: UploadedAsset[]) => {
    const urls = assets.map((a) => a.url)
    const gallery = [...product.gallery, ...urls]
    onPatch(product.slug, { gallery, image: product.image || gallery[0] })
  }

  const removeImage = (url: string) => {
    const gallery = product.gallery.filter((g) => g !== url)
    onPatch(product.slug, { gallery, image: product.image === url ? (gallery[0] ?? "") : product.image })
  }

  const makeCover = (url: string) => onPatch(product.slug, { image: url })

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-5 flex items-center gap-1.5 text-sm font-semibold text-[var(--kma-muted)] hover:text-[var(--kma-ink)]"
      >
        <ChevronLeft className="h-4 w-4" /> All products
      </button>

      <header className="mb-6 flex flex-wrap items-center gap-3">
        <h1 className="m-0 font-serif text-[26px] font-bold leading-tight lg:text-[34px]">{product.title}</h1>
        <StatusBadge status={product.status} />
      </header>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_320px]">
        <div>
          <TranslatedField
            label="Product name"
            value={toTranslated(product.title, i18n.title)}
            onChange={setTitle}
            hint="Also used as the image alt text and the page title."
          />

          <TranslatedField
            label="Description"
            multiline
            value={toTranslated(product.description, i18n.description)}
            onChange={setDescription}
          />

          <Field label="Features, one per line">
            <div className="flex flex-col gap-2">
              {product.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <TextInput value={f} onChange={(e) => setFeature(i, e.target.value)} />
                  <button
                    type="button"
                    onClick={() => removeFeature(i)}
                    aria-label={`Remove ${f || "feature"}`}
                    className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-[rgba(36,31,26,0.14)] bg-white text-[var(--kma-muted)] hover:text-[#8c2f1d]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addFeature}
                className="flex w-fit items-center gap-1.5 rounded-full border border-[rgba(36,31,26,0.18)] px-3.5 py-1.5 text-[13px] font-semibold hover:border-[rgba(36,31,26,0.34)]"
              >
                <Plus className="h-3.5 w-3.5" /> Add feature
              </button>
            </div>
          </Field>

          <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-2">
            <Field label="Category">
              <select
                value={product.category}
                onChange={(e) => onPatch(product.slug, { category: e.target.value })}
                className="w-full rounded-xl border border-[rgba(36,31,26,0.18)] bg-white px-3.5 py-[11px] text-sm"
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
            <div>
              <TranslatedField
                label="Price label"
                value={toTranslated(product.price, i18n.price)}
                onChange={setPrice}
                hint='Shown exactly as written, e.g. "Starting from ₹25,000".'
              />
            </div>
          </div>

          <Field label="Images, the first is the cover">
            <div className="mb-3 flex flex-wrap gap-2.5">
              {product.gallery.map((url) => (
                <div key={url} className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt=""
                    className={`h-[104px] w-[84px] rounded-xl bg-[var(--kma-surface)] object-cover ${
                      product.image === url ? "outline outline-2 outline-offset-2 outline-[var(--kma-gold)]" : ""
                    }`}
                    loading="lazy"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(url)}
                    aria-label="Remove image"
                    className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--kma-ink)] text-[var(--kma-ivory)]"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                  {product.image !== url && (
                    <button
                      type="button"
                      onClick={() => makeCover(url)}
                      className="mt-1 w-full text-[11px] font-semibold text-[var(--kma-gold-deep)]"
                    >
                      Make cover
                    </button>
                  )}
                </div>
              ))}
            </div>
            <MediaUploader folder="gallery/mandir" onUploaded={onUploaded} />
            <RatioNote slot={coverSlot} />
          </Field>

          <div className="mt-8">
            <RatioLegend slotIds={["product-cover", "product-hero", "product-thumb", "video"]} />
          </div>
        </div>

        <aside className="flex flex-col gap-5">
          <div className="rounded-2xl border border-[var(--kma-hairline)] bg-[rgba(255,255,255,0.5)] p-4">
            <div className="kicker mb-2">Status</div>
            <Field label="">
              <select
                value={product.status}
                onChange={(e) => onPatch(product.slug, { status: e.target.value as ItemStatus })}
                className="w-full rounded-xl border border-[rgba(36,31,26,0.18)] bg-white px-3.5 py-[11px] text-sm"
              >
                <option value="live">Live (visible on the site)</option>
                <option value="draft">Draft (not on the site yet)</option>
                <option value="hidden">Hidden (taken down)</option>
              </select>
            </Field>
            <Toggle
              checked={product.featured}
              onChange={(v) => onPatch(product.slug, { featured: v })}
              label="Featured on home"
              hint="Shows in the Featured pieces row. The first three featured products are used."
            />
            <Toggle
              checked={product.showPrice}
              onChange={(v) => onPatch(product.slug, { showPrice: v })}
              label="Show price on card"
            />
          </div>

          <TranslationStatus
            fields={[
              toTranslated(product.title, i18n.title),
              toTranslated(product.description, i18n.description),
              toTranslated(product.price, i18n.price),
            ]}
          />

          <div className="rounded-2xl border border-[var(--kma-hairline)] bg-[rgba(255,255,255,0.5)] p-4">
            <div className="kicker mb-2">SEO</div>
            <p className="m-0 text-[12px] leading-relaxed text-[var(--kma-muted)]">
              The address stays{" "}
              <code className="break-all rounded bg-[rgba(36,31,26,0.06)] px-1 py-0.5 text-[11px]">
                /products/{product.slug}
              </code>
              . Renaming the product does not change it, so existing links and search rankings are kept.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
