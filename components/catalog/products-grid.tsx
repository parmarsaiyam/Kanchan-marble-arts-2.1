"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { X } from "lucide-react"
import { productCategories, type Product } from "@/lib/content/products"
import { whatsappHref } from "@/lib/config/site"
import { useLanguage } from "@/lib/i18n/context"
import { trackFilter, trackQuickView } from "@/lib/analytics"

const filters = ["All", ...productCategories] as const
type Filter = (typeof filters)[number]

function count(products: Product[], filter: Filter) {
  return filter === "All" ? products.length : products.filter((p) => p.category === filter).length
}

function FilterPill({
  products,
  filter,
  active,
  onClick,
}: {
  products: Product[]
  filter: Filter
  active: boolean
  onClick: () => void
}) {
  const { d, tcat } = useLanguage()
  return (
    <button
      onClick={onClick}
      className={`press flex-none rounded-full px-5 py-2.5 text-[13px] font-semibold ${
        active
          ? "bg-[var(--kma-ink)] text-[var(--kma-ivory)]"
          : "border border-[rgba(36,31,26,0.2)] text-[var(--kma-ink)]"
      }`}
    >
      {filter === "All" ? d.ui.common.all : tcat(filter)}{" "}
      <span className={active ? "opacity-50" : "text-[var(--kma-muted-2)]"}>{count(products, filter)}</span>
    </button>
  )
}

function QuickView({ product, onClose }: { product: Product; onClose: () => void }) {
  const { d, tf, tcat, tprice } = useLanguage()
  useEffect(() => trackQuickView(product.slug), [product.slug])
  const text = d.content.products[product.slug] ?? product

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-[rgba(30,26,22,0.6)] backdrop-blur-sm lg:items-center lg:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={text.title}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88vh] w-full overflow-y-auto rounded-t-[28px] bg-[var(--kma-ivory)] px-[22px] pb-7 pt-3 lg:max-w-[880px] lg:rounded-[28px] lg:p-10"
      >
        <div className="mx-auto mb-5 h-1 w-[42px] rounded-full bg-[rgba(36,31,26,0.2)] lg:hidden" />
        <div className="hidden justify-end lg:flex">
          <button
            onClick={onClose}
            aria-label={d.ui.products.closeQuickView}
            className="press -mr-2 -mt-4 p-2 opacity-60"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-10">
          <div className="mb-[18px] aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--kma-surface)] lg:mb-0 lg:aspect-[4/5]">
            <Image
              src={product.image}
              alt={text.title}
              width={700}
              height={875}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="kicker mb-2 !text-[10px] lg:!text-[11px]">{tcat(product.category)}</div>
            <h2 className="m-0 mb-2.5 font-serif text-[26px] font-bold leading-[1.1] lg:text-[32px]">{text.title}</h2>
            <p className="m-0 mb-[18px] text-[15px] leading-[1.65] text-[var(--kma-body)]">{text.description}</p>
            <div className="mb-5 grid grid-cols-2 gap-x-3.5 gap-y-2 text-[13px] text-[var(--kma-muted)]">
              {product.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <span className="h-1 w-1 flex-none rounded-full bg-[var(--kma-gold)]" />
                  {tf(feature)}
                </div>
              ))}
            </div>
            <hr className="rule mb-[18px]" />
            <div className="mb-[18px] flex items-center justify-between">
              <div>
                <div className="kicker mb-1 !text-[10px]">{d.ui.common.price}</div>
                <div className="text-xl font-bold text-[var(--kma-gold-deep)]">{tprice(product.price)}</div>
              </div>
              <Link
                href={`/products/${product.slug}`}
                className="border-b border-[rgba(36,31,26,0.25)] pb-[3px] text-[13px] font-semibold"
              >
                {d.ui.common.fullDetails}
              </Link>
            </div>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="cta press block rounded-full bg-[var(--kma-gold)] py-4 text-center text-[15px] font-semibold text-[var(--kma-ivory)]"
            >
              {d.ui.common.enquireAboutPiece}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

/** `products` is the live catalogue, fetched on the server so an edit in the
 *  CMS shows up without a rebuild. */
export function Products({ products }: { products: Product[] }) {
  const { d, tcat } = useLanguage()
  const [filter, setFilter] = useState<Filter>("All")
  const [quickView, setQuickView] = useState<Product | null>(null)

  const visible = filter === "All" ? products : products.filter((p) => p.category === filter)

  return (
    <>
      {/* Filter rail */}
      <div className="sticky top-[var(--kma-stack-h)] z-30 -mx-5 border-b border-[rgba(36,31,26,0.12)] bg-[var(--kma-ivory)] px-5 pb-3.5 pt-5 lg:static lg:mx-0 lg:border-b lg:border-[rgba(36,31,26,0.14)] lg:bg-transparent lg:px-0 lg:pb-5 lg:pt-0">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 overflow-x-auto lg:gap-[9px]">
            {filters.map((f) => (
              <FilterPill
                key={f}
                products={products}
                filter={f}
                active={filter === f}
                onClick={() => {
                  setFilter(f)
                  trackFilter("products", f)
                }}
              />
            ))}
          </div>
          <span className="hidden text-[13px] text-[var(--kma-muted-2)] lg:block">
            {d.ui.products.showing(visible.length)}
          </span>
        </div>
      </div>

      {/* Grid */}
      <div
        key={filter}
        className="kma-fade-up grid grid-cols-2 gap-x-3.5 gap-y-5 pt-[22px] lg:grid-cols-3 lg:gap-x-[26px] lg:gap-y-7 lg:pt-10"
      >
        {visible.map((product) => {
          const text = d.content.products[product.slug] ?? product
          return (
            <div key={product.slug} className="tile">
              <button
                onClick={() => setQuickView(product)}
                className="block w-full text-left"
                aria-label={d.ui.common.quickViewOf(text.title)}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-[var(--kma-surface)] lg:rounded-2xl">
                  <Image
                    src={product.image}
                    alt={text.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 400px"
                    className="object-cover"
                  />
                  <span className="absolute left-4 top-4 hidden rounded-full bg-[rgba(247,244,239,0.94)] px-[13px] py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--kma-ink)] lg:inline-block">
                    {tcat(product.category)}
                  </span>
                </div>
              </button>
              <h3 className="mb-1 mt-3 text-[15px] font-bold leading-snug lg:mb-1.5 lg:mt-[18px] lg:text-[19px]">
                {text.title}
              </h3>
              <div className="text-xs text-[var(--kma-muted-2)] lg:hidden">{tcat(product.category)}</div>
              <p className="m-0 mb-3 hidden text-sm leading-relaxed text-[var(--kma-muted)] lg:block">
                {text.description}
              </p>
              <button
                onClick={() => setQuickView(product)}
                className="hidden border-b border-[rgba(36,31,26,0.25)] pb-[3px] text-[13px] font-semibold lg:inline-block"
              >
                {d.ui.common.quickView}
              </button>
            </div>
          )
        })}
      </div>

      {quickView && <QuickView product={quickView} onClose={() => setQuickView(null)} />}
    </>
  )
}
