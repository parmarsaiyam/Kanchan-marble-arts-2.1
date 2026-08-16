"use client"

import Link from "next/link"
import Image from "next/image"
import { Check, Phone } from "lucide-react"
import { getProduct, relatedProducts } from "@/lib/content/products"
import { ProductGallery } from "@/components/catalog/product-gallery"
import { Reveal } from "@/components/layout/reveal"
import { whatsappHref, telHref } from "@/lib/config/site"
import { useEffect } from "react"
import { useLanguage } from "@/lib/i18n/context"
import { trackCall, trackProductView, trackWhatsApp } from "@/lib/analytics"

const detailStepKeys = ["consult", "design", "craft", "fit"] as const

export function ProductDetail({ slug }: { slug: string }) {
  const { d, tf, tcat, tstone, tprice } = useLanguage()
  const product = getProduct(slug)

  // Records which pieces get looked at. Runs before the early return guard
  // below so the hook order stays stable across renders.
  useEffect(() => {
    if (product) trackProductView(product.slug, product.category)
  }, [product])

  if (!product) return null

  const related = relatedProducts(product)
  const text = d.content.products[product.slug] ?? product
  const category = tcat(product.category)

  return (
    <div className="pb-40 lg:pb-0">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1280px] px-5 pt-5 text-[13px] text-[var(--kma-muted-2)] lg:px-14 lg:pt-[26px]">
        <Link href="/products" className="hover:text-[var(--kma-ink)]">
          {d.ui.productDetail.breadcrumbRoot}
        </Link>
        &nbsp;&nbsp;/&nbsp;&nbsp;
        <Link href="/products" className="hover:text-[var(--kma-ink)]">
          {category}
        </Link>
        &nbsp;&nbsp;/&nbsp;&nbsp;
        <span className="text-[var(--kma-ink)]">{text.title}</span>
      </div>

      {/* Main split */}
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-8 px-5 pt-6 lg:grid-cols-[1fr_460px] lg:gap-16 lg:px-14 lg:pt-8">
        <ProductGallery images={product.gallery} title={text.title} />

        <div className="lg:sticky lg:top-[110px]">
          <div className="kicker mb-2.5 lg:mb-3.5">{category}</div>
          <h1 className="m-0 mb-3.5 font-serif text-[30px] font-bold leading-[1.1] lg:mb-[18px] lg:text-[44px] lg:leading-[1.06]">
            {text.title}
          </h1>
          <p className="m-0 mb-6 text-base leading-relaxed text-[var(--kma-body)] lg:mb-7 lg:text-[17px]">
            {text.description}
          </p>
          <hr className="rule" />
          <div className="py-5 lg:py-[22px]">
            <div className="kicker mb-3 lg:mb-3.5">{d.ui.productDetail.whatYouGet}</div>
            <div className="flex flex-col gap-2.5 text-[15px] text-[var(--kma-body)]">
              {product.features.map((feature) => (
                <div key={feature} className="flex items-center gap-[11px]">
                  <span className="h-[5px] w-[5px] flex-none rounded-full bg-[var(--kma-gold)]" />
                  {tf(feature)}
                </div>
              ))}
            </div>
          </div>
          {product.stones.length > 0 && (
            <>
              <hr className="rule" />
              <div className="py-5 lg:py-[22px]">
                <div className="kicker mb-3 lg:mb-3.5">{d.ui.productDetail.chooseStone}</div>
                <div className="flex flex-wrap gap-2 lg:gap-[9px]">
                  {product.stones.map((stone, i) => (
                    <span
                      key={stone}
                      className={`rounded-full border px-4 py-2 text-[13px] font-semibold lg:px-[18px] lg:py-[9px] ${
                        i === 0
                          ? "border-[var(--kma-ink)] text-[var(--kma-ink)]"
                          : "border-[rgba(36,31,26,0.2)] text-[var(--kma-muted)]"
                      }`}
                    >
                      {tstone(stone)}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
          <hr className="rule" />
          <div className="pb-5 pt-6 lg:pb-[22px] lg:pt-[26px]">
            <div className="kicker mb-1.5">{d.ui.common.price}</div>
            <div className="font-serif text-[26px] leading-none text-[var(--kma-gold-deep)] lg:text-[32px]">
              {tprice(product.price)}
            </div>
            <p className="m-0 mt-2.5 text-[13px] text-[var(--kma-muted-2)]">{d.ui.productDetail.priceNote}</p>
          </div>
          <div className="flex flex-col gap-2.5">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsApp("product_detail")}
              className="cta press rounded-full bg-[var(--kma-gold)] py-4 text-center text-[15px] font-semibold text-[var(--kma-ivory)]"
            >
              {d.ui.common.enquireAboutPiece}
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="press rounded-full border border-[rgba(36,31,26,0.22)] py-4 text-center text-[15px] font-semibold"
            >
              {d.ui.productDetail.whatsappPhoto}
            </a>
          </div>
          <div className="mt-5 flex items-center gap-2.5 text-[13px] text-[var(--kma-muted)] lg:mt-[22px]">
            <Check className="h-4 w-4 text-[var(--kma-gold-deep)]" strokeWidth={2} />
            {d.ui.productDetail.repliesNote}
          </div>
        </div>
      </div>

      {/* How this one is made */}
      <Reveal className="mx-auto max-w-[1280px] px-5 pt-16 lg:px-14 lg:pt-24">
        <hr className="rule" />
        <div className="grid grid-cols-1 gap-8 pt-9 lg:grid-cols-[280px_1fr] lg:gap-16 lg:pt-11">
          <h2 className="m-0 font-serif text-[26px] font-bold leading-[1.1] lg:text-[32px]">
            {d.ui.productDetail.howItIsMade}
          </h2>
          <div className="rv-stagger grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {detailStepKeys.map((key, i) => {
              const step = d.ui.productDetail.steps[key]
              return (
                <div key={key}>
                  <div className="mb-3 font-serif text-sm text-[var(--kma-gold)]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="mb-1.5 text-base font-bold">{step.title}</div>
                  <p className="m-0 text-sm leading-relaxed text-[var(--kma-muted)]">{step.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </Reveal>

      {/* Related */}
      <Reveal className="mx-auto max-w-[1280px] px-5 pt-14 lg:px-14 lg:pt-[88px]">
        <div className="mb-5 flex items-end justify-between lg:mb-8">
          <h2 className="m-0 font-serif text-2xl font-bold lg:text-[32px]">
            {d.ui.productDetail.alsoIn(category)}
          </h2>
          <Link
            href="/products"
            className="press hidden border-b border-[var(--kma-gold)] pb-1 text-sm font-semibold text-[var(--kma-gold-deep)] lg:inline-block"
          >
            {d.ui.productDetail.allOf(category)} →
          </Link>
        </div>
        <div className="rv-stagger flex gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:pb-0">
          {related.map((rel) => {
            const relText = d.content.products[rel.slug] ?? rel
            return (
              <Link key={rel.slug} href={`/products/${rel.slug}`} className="tile block w-[150px] flex-none lg:w-auto">
                <div className="aspect-[4/5] overflow-hidden rounded-[14px] bg-[var(--kma-surface)] lg:rounded-2xl">
                  <Image
                    src={rel.image}
                    alt={relText.title}
                    width={400}
                    height={500}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mb-0 mt-2.5 text-sm font-bold lg:mb-[3px] lg:mt-3.5 lg:text-base">{relText.title}</h3>
                <div className="hidden text-[13px] text-[var(--kma-muted-2)] lg:block">{tcat(rel.category)}</div>
              </Link>
            )
          })}
        </div>
      </Reveal>

      <div className="h-16 lg:h-24" />

      {/* Mobile sticky price bar */}
      <div className="lg:hidden fixed inset-x-0 bottom-0 z-50 border-t border-[rgba(36,31,26,0.12)] bg-[rgba(247,244,239,0.96)] px-4 pb-[max(1.375rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl">
        <div className="mb-2.5 flex items-center justify-between px-1">
          <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--kma-muted-2)]">
            {d.ui.common.startingFrom}
          </div>
          <div className="text-[17px] font-bold text-[var(--kma-gold-deep)]">
            {product.price.replace("Starting from ", "")}
          </div>
        </div>
        <div className="flex gap-2.5">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="cta press flex-1 rounded-full bg-[var(--kma-gold)] py-[15px] text-center text-[15px] font-bold text-[var(--kma-ivory)]"
          >
            {d.ui.productDetail.enquireShort}
          </a>
          <a
            href={telHref}
            onClick={() => trackCall("product_detail")}
            aria-label={d.ui.common.callAria}
            className="press flex h-[52px] w-[54px] items-center justify-center rounded-full border border-[rgba(36,31,26,0.2)]"
          >
            <Phone className="h-[19px] w-[19px]" />
          </a>
        </div>
      </div>
    </div>
  )
}
