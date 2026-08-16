"use client"

import Link from "next/link"
import { Reveal } from "@/components/layout/reveal"
import { useT } from "@/lib/i18n/context"

const stepKeys = ["consult", "design", "craft", "deliver"] as const

const STROKE = "var(--kma-gold)"

/**
 * One continuous dashed path weaving through all four steps, ending in an
 * arrowhead. `vectorEffect="non-scaling-stroke"` keeps the line an even weight
 * even though `preserveAspectRatio="none"` stretches the viewBox to the row.
 */
function DesktopTrail() {
  return (
    <svg
      viewBox="0 0 1200 150"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-[26px] hidden h-[150px] w-full lg:block"
    >
      <path
        d="M150 104 C 250 104 350 26 450 26 C 550 26 650 104 750 104 C 850 104 950 26 1050 26 L 1128 26"
        stroke={STROKE}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="5 8"
        vectorEffect="non-scaling-stroke"
        opacity="0.9"
      />
      <path
        d="M1116 18 L 1130 26 L 1116 34"
        stroke={STROKE}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

/** Vertical weave down the left rail on phones, arrowhead after the last step. */
function MobileTrail() {
  return (
    <svg
      viewBox="0 0 44 100"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
      className="pointer-events-none absolute bottom-0 left-[21px] top-0 h-full w-[44px] lg:hidden"
    >
      <path
        d="M1 0 C 1 20 42 26 42 50 C 42 74 1 80 1 100"
        stroke={STROKE}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="5 8"
        vectorEffect="non-scaling-stroke"
        opacity="0.9"
      />
    </svg>
  )
}

/**
 * Four steps laid out as a zig-zag: alternating high/low on desktop, alternating
 * indent on mobile, with a single dashed trail weaving from the first step to an
 * arrowhead past the last.
 */
export function HomeSteps() {
  const d = useT()

  return (
    <Reveal className="kma-band mt-14 py-14 lg:mt-[104px] lg:py-24">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-14">
      <div className="kicker mb-3 lg:mb-4">{d.ui.home.steps.kicker}</div>
      <h2 className="m-0 mb-9 max-w-[560px] font-serif text-[30px] font-bold leading-[1.16] lg:mb-14 lg:text-[42px] lg:leading-[1.14]">
        {d.ui.home.steps.title}
      </h2>

      <div className="relative lg:pb-16">
        <DesktopTrail />

        <div className="relative grid grid-cols-1 gap-0 lg:grid-cols-4 lg:gap-9">
          {stepKeys.map((key, i) => {
            const step = d.ui.home.steps.items[key]
            const last = i === stepKeys.length - 1
            const high = i % 2 === 1

            return (
              <div
                key={key}
                className={`relative flex gap-4 lg:block ${high ? "lg:mt-0" : "lg:mt-[78px]"} ${
                  // Mobile zig-zag: every other step steps in from the rail.
                  i % 2 === 1 ? "pl-6" : "pl-0"
                }`}
              >
                {/* Left rail on mobile: medallion, with the trail weaving below it */}
                <div className="relative flex w-11 flex-none justify-center lg:w-auto lg:justify-start">
                  <div
                    className={`relative z-10 flex h-11 w-11 flex-none rotate-[-6deg] items-center justify-center rounded-[14px] border border-[rgba(154,123,47,0.5)] bg-[var(--kma-ivory)] font-serif text-[15px] font-bold text-[var(--kma-gold-deep)] shadow-[0_4px_14px_rgba(36,31,26,0.08)] lg:h-[54px] lg:w-[54px] lg:rounded-[18px] lg:text-[18px] ${
                      i % 2 === 1 ? "rotate-[6deg]" : ""
                    }`}
                  >
                    <span className="-rotate-[6deg]">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  {!last && (
                    <div className="absolute inset-x-0 top-11 bottom-[-14px] lg:hidden">
                      <MobileTrail />
                    </div>
                  )}
                </div>

                <div className={last ? "pb-2" : "pb-10 lg:pb-0"}>
                  <h3 className="m-0 mb-2 mt-2.5 text-xl font-bold lg:mt-6 lg:text-[22px]">{step.title}</h3>
                  <p className="m-0 max-w-[300px] text-sm leading-[1.7] text-[var(--kma-muted)] lg:max-w-[240px]">
                    {step.body}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Mobile arrowhead closing the trail */}
        <svg
          viewBox="0 0 24 20"
          fill="none"
          aria-hidden
          className="absolute -bottom-1 left-[13px] h-5 w-6 lg:hidden"
        >
          <path
            d="M4 4 L 11 15 L 18 4"
            stroke={STROKE}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* The four summaries stop short of the detail on /process, so the strip
          ends with a link there instead of leaving the reader at a dead end. */}
      <div className="mt-8 lg:mt-4">
        <Link
          href="/process"
          className="press inline-block border-b border-[var(--kma-gold)] pb-1 text-sm font-semibold text-[var(--kma-gold-deep)]"
        >
          {d.ui.home.steps.link} →
        </Link>
      </div>
      </div>
    </Reveal>
  )
}
