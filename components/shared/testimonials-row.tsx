"use client"

import testimonialsData from "@/content/testimonials.json"
import { Reveal } from "@/components/layout/reveal"
import { useTestimonialText } from "@/lib/i18n/context"

interface Testimonial {
  name: string
  location: string
  review: string
}

const testimonials = (testimonialsData.testimonials as Testimonial[]).slice(0, 3)

/** Three testimonials above a hairline — used on Home and Visit. */
export function TestimonialsRow() {
  const tt = useTestimonialText()

  return (
    <Reveal className="mx-auto max-w-[1280px] px-5 pt-16 lg:px-14 lg:pt-[104px]">
      <hr className="rule" />
      <div className="rv-stagger grid grid-cols-1 gap-9 pt-9 md:grid-cols-3 lg:gap-12 lg:pt-12">
        {testimonials.map((source) => {
          const t = tt(source)
          return (
            <div key={source.name}>
              <p className="mb-5 text-[17px] leading-relaxed text-[var(--kma-body)] lg:text-lg">
                &ldquo;{t.review}&rdquo;
              </p>
              <div className="text-[13px] font-bold">{t.name}</div>
              <div className="text-[13px] text-[var(--kma-muted-2)]">{t.location}</div>
            </div>
          )
        })}
      </div>
    </Reveal>
  )
}
