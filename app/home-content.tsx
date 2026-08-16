"use client"

import Link from "next/link"
import Image from "next/image"
import { Hero } from "@/components/home/hero"
import { Reveal } from "@/components/layout/reveal"
import { TestimonialsRow } from "@/components/shared/testimonials-row"
import { HomeSteps } from "@/components/home/home-steps"
import { WorkshopVisit } from "@/components/shared/workshop-visit"
import { products } from "@/lib/content/products"
import { useLanguage } from "@/lib/i18n/context"

/** Collection tiles. Copy lives in the dictionary under `home.collections.items`. */
const collections = [
  {
    key: "mandirs",
    image: "/images/mmandir.webp",
    alt: "Beautiful marble mandir with intricate carvings and traditional architecture",
  },
  {
    key: "murtis",
    image: "/images/murti.webp",
    alt: "Elegant marble murti sculpture with detailed craftsmanship",
  },
  {
    key: "articles",
    image: "/images/articles.webp",
    alt: "Decorative marble articles including pillars and ornamental pieces",
  },
  {
    key: "jain",
    image: "/images/jain.webp",
    alt: "Traditional Jain marble designs with symbolic patterns",
  },
] as const

/** Chosen in the CMS via the "Featured on home" toggle. */
const featured = products.filter((p) => p.featured).slice(0, 3)

/**
 * Home gallery preview. These photos range from 0.40 to 1.50 aspect, so any
 * fixed-height grid cell has to crop them. Each carries its intrinsic size and
 * is laid out in a masonry column flow, so every image is shown whole.
 */
const mosaic = [
  {
    src: "https://res.cloudinary.com/duuqhl0w9/image/upload/f_auto,q_auto/gallery/mandir/M-3.webp",
    alt: "Traditional marble temple with red and gold accents",
    w: 1000,
    h: 800,
  },
  {
    src: "https://res.cloudinary.com/duuqhl0w9/image/upload/f_auto,q_auto/gallery/murti/hanuman-1.webp",
    alt: "Lord Hanuman, hand-carved in premium Italian marble",
    w: 500,
    h: 700,
  },
  {
    src: "https://res.cloudinary.com/duuqhl0w9/image/upload/f_auto,q_auto/gallery/murti/Rk.webp",
    alt: "Radha Krishna murti with fine hand-carved detailing",
    w: 900,
    h: 600,
  },
  {
    src: "https://res.cloudinary.com/duuqhl0w9/image/upload/f_auto,q_auto/gallery/TS-1.webp",
    alt: "Marble tulsi stand with floral engravings",
    w: 600,
    h: 800,
  },
  {
    src: "https://res.cloudinary.com/duuqhl0w9/image/upload/f_auto,q_auto/gallery/A-2.webp",
    alt: "Handcrafted marble railing pillar with elegant finish",
    w: 600,
    h: 800,
  },
  {
    src: "https://res.cloudinary.com/duuqhl0w9/image/upload/f_auto,q_auto/gallery/mandir/M-2.webp",
    alt: "Modern Corian mandir design for contemporary homes",
    w: 400,
    h: 1000,
  },
]

const sectionShell = "mx-auto max-w-[1280px] px-5 lg:px-14"

function SectionLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="press hidden border-b border-[var(--kma-gold)] pb-1 text-sm font-semibold text-[var(--kma-gold-deep)] lg:inline-block"
    >
      {label} →
    </Link>
  )
}

export function HomeContent() {
  const { d, tc, tcat, tprice } = useLanguage()
  const productText = d.content.products

  return (
    <div>
      <Hero />

      {/* Collections */}
      <Reveal className={`${sectionShell} pt-14 lg:pt-24`}>
        <div className="mb-6 flex items-end justify-between lg:mb-11">
          <div>
            <div className="kicker mb-3.5 lg:mb-4">{d.ui.home.collections.kicker}</div>
            <h2 className="m-0 max-w-[620px] font-serif text-[30px] font-bold leading-[1.16] lg:text-[44px] lg:leading-[1.14]">
              {d.ui.home.collections.title}
            </h2>
          </div>
          <SectionLink href="/products" label={d.ui.home.collections.link} />
        </div>
        <div className="rv-stagger flex gap-3.5 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:gap-[22px] lg:overflow-visible lg:pb-0">
          {collections.map((c, i) => {
            const item = d.ui.home.collections.items[c.key]
            return (
              <Link key={c.key} href="/products" className="tile block w-[210px] flex-none lg:w-auto">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-[var(--kma-surface)]">
                  <Image
                    src={c.image}
                    alt={tc(c.alt)}
                    width={480}
                    height={640}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-3 flex items-baseline gap-2.5 lg:mt-[18px]">
                  <span className="kicker !text-[10px] !text-[var(--kma-gold)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="m-0 font-serif text-xl font-semibold lg:text-[23px]">{item.title}</h3>
                </div>
                <p className="m-0 mt-2 hidden text-sm leading-relaxed text-[var(--kma-muted)] lg:block">
                  {item.description}
                </p>
              </Link>
            )
          })}
        </div>
        <div className="mt-5 lg:hidden">
          <Link href="/products" className="text-sm font-semibold text-[var(--kma-gold-deep)]">
            {d.ui.home.collections.link} →
          </Link>
        </div>
      </Reveal>

      {/* Workshop: tinted band, so it reads as its own section */}
      <Reveal className="kma-band mt-14 py-14 lg:mt-24 lg:py-24">
        <div className={`${sectionShell} grid grid-cols-1 items-center gap-7 lg:grid-cols-2 lg:gap-20`}>
          <div className="tile aspect-[3/2] overflow-hidden rounded-[22px] lg:rounded-3xl">
            <Image
              src="/images/abouttop.webp"
              alt={tc("Master craftsman at work in the Kanchan Marble Arts workshop")}
              width={900}
              height={600}
              className="wash h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="kicker mb-3 lg:mb-[18px]">{d.ui.home.workshop.kicker}</div>
            <h2 className="m-0 mb-4 font-serif text-[30px] font-bold leading-[1.16] lg:mb-7 lg:text-[42px] lg:leading-[1.14]">
              {d.ui.home.workshop.title}
            </h2>
            <p className="mb-[18px] text-base leading-[1.8] text-[var(--kma-body)] lg:text-[17px]">
              {d.ui.home.workshop.body1}
            </p>
            <p className="mb-6 text-base leading-[1.8] text-[var(--kma-body)] lg:mb-[34px] lg:text-[17px]">
              {d.ui.home.workshop.body2}
            </p>
            {/* Home is the page most visitors land on, so each major section
                offers one route deeper into the site rather than only up to
                the nav. This one carries the reader on to the full story. */}
            <div className="mb-6 lg:mb-8">
              <Link
                href="/about"
                className="press inline-block border-b border-[var(--kma-gold)] pb-1 text-sm font-semibold text-[var(--kma-gold-deep)]"
              >
                {d.ui.home.workshop.link} →
              </Link>
            </div>
            <hr className="rule" />
            <div className="flex flex-wrap gap-6 pt-5 lg:gap-11 lg:pt-6">
              {(
                [
                  ["Australian", d.ui.home.workshop.stones.australian],
                  ["Indian", d.ui.home.workshop.stones.indian],
                  ["Italian", d.ui.home.workshop.stones.italian],
                ] as const
              ).map(([stone, note]) => (
                <div key={stone}>
                  <div className="text-[13px] font-bold">{d.content.stones[stone] ?? stone}</div>
                  <div className="text-[13px] text-[var(--kma-muted-2)]">{note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Featured pieces */}
      <Reveal className={`${sectionShell} pt-14 lg:pt-[104px]`}>
        <div className="mb-6 flex items-end justify-between lg:mb-11">
          <h2 className="m-0 font-serif text-[30px] font-bold leading-[1.16] lg:text-[42px] lg:leading-[1.14]">
            {d.ui.home.featured.title}
          </h2>
          <SectionLink href="/products" label={d.ui.home.featured.link} />
        </div>
        <div className="rv-stagger grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[26px]">
          {featured.map((product) => {
            const text = productText[product.slug] ?? product
            return (
              <Link key={product.slug} href={`/products/${product.slug}`} className="tile block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--kma-surface)]">
                  <Image
                    src={product.image}
                    alt={text.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-[rgba(247,244,239,0.94)] px-[13px] py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--kma-ink)]">
                    {tcat(product.category)}
                  </span>
                </div>
                <h3 className="mb-1.5 mt-[18px] text-[19px] font-bold">{text.title}</h3>
                <p className="m-0 mb-3.5 text-sm leading-relaxed text-[var(--kma-muted)]">{text.description}</p>
                <div className="mb-3 text-sm font-bold text-[var(--kma-gold-deep)]">{tprice(product.price)}</div>
                <span className="border-b border-[rgba(36,31,26,0.25)] pb-[3px] text-[13px] font-semibold">
                  {d.ui.common.quickView}
                </span>
              </Link>
            )
          })}
        </div>
      </Reveal>

      <HomeSteps />

      {/* Jain heritage band */}
      <Reveal className="kma-dk mt-14 bg-[var(--kma-ink)] text-[var(--kma-cream)] lg:mt-[104px]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-8 px-5 py-14 lg:grid-cols-2 lg:gap-20 lg:px-14 lg:py-24">
          <div>
            <div className="kicker mb-3.5 !text-[var(--kma-gold-light)] lg:mb-[18px]">{d.ui.home.jain.kicker}</div>
            <h2 className="m-0 mb-4 font-serif text-[30px] font-bold leading-[1.16] text-[var(--kma-ivory)] lg:mb-[26px] lg:text-[40px]">
              {d.ui.home.jain.title}
            </h2>
            <p className="mb-[18px] text-[15px] leading-[1.8] text-[rgba(247,244,239,0.8)] lg:text-[17px]">
              {d.ui.home.jain.body1}
            </p>
            <p className="mb-6 text-[15px] leading-[1.8] text-[rgba(247,244,239,0.8)] lg:mb-[34px] lg:text-[17px]">
              {d.ui.home.jain.body2}
            </p>
            <Link
              href="/products"
              className="press inline-block rounded-full border border-[rgba(201,171,95,0.55)] px-7 py-3.5 text-sm font-semibold text-[var(--kma-cream)]"
            >
              {d.ui.home.jain.cta}
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            <div className="tile aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src="https://res.cloudinary.com/duuqhl0w9/image/upload/f_auto,q_auto/gallery/jain/J-3.webp"
                alt={tc("Elegant white marble mandir with intricate Jain carvings")}
                width={600}
                height={800}
                className="wash h-full w-full object-cover"
              />
            </div>
            <div className="tile mt-6 aspect-[3/4] overflow-hidden rounded-2xl lg:mt-11">
              <Image
                src="https://res.cloudinary.com/duuqhl0w9/image/upload/f_auto,q_auto/gallery/jain/J-5.webp"
                alt={tc("Traditional design mandir showcasing 14 swapnas carvings")}
                width={600}
                height={800}
                className="wash h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </Reveal>

      {/* Gallery mosaic */}
      <Reveal className={`${sectionShell} pt-14 lg:pt-[104px]`}>
        <div className="mb-6 flex items-end justify-between lg:mb-9">
          <div>
            <div className="kicker mb-3.5 lg:mb-4">{d.ui.home.mosaic.kicker}</div>
            <h2 className="m-0 max-w-[560px] font-serif text-[30px] font-bold leading-[1.16] lg:text-[42px] lg:leading-[1.14]">
              {d.ui.home.mosaic.title}
            </h2>
          </div>
          <SectionLink href="/gallery" label={d.ui.home.mosaic.link} />
        </div>
        <div className="columns-2 gap-2.5 [column-fill:balance] lg:columns-3 lg:gap-4 xl:columns-4">
          {mosaic.map((img) => (
            <Link
              key={img.src}
              href="/gallery"
              className="tile mb-2.5 block break-inside-avoid overflow-hidden rounded-[14px] bg-[var(--kma-surface)] lg:mb-4 lg:rounded-2xl"
            >
              <Image
                src={img.src}
                alt={tc(img.alt)}
                width={img.w}
                height={img.h}
                sizes="(max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                className="h-auto w-full"
              />
            </Link>
          ))}
        </div>
        <div className="mt-5 lg:hidden">
          <Link href="/gallery" className="text-sm font-semibold text-[var(--kma-gold-deep)]">
            {d.ui.home.mosaic.link} →
          </Link>
        </div>
      </Reveal>

      <TestimonialsRow />

      {/* Where to find us: light ground, sits directly above the footer */}
      <WorkshopVisit withHeading />

      <div className="h-14 lg:h-24" />
    </div>
  )
}
