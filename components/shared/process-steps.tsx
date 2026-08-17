"use client"

import Image from "next/image"
import { Reveal } from "@/components/layout/reveal"
import { useLanguage } from "@/lib/i18n/context"
import { media } from "@/lib/config/media"

type StepKey = "consultation" | "planning" | "crafting" | "installation"

/** Media per step. The copy itself lives in the dictionary under `process.steps`. */
const stepMedia: Record<StepKey, { src: string; alt: string; aspect: string; washed?: boolean }> = {
  consultation: {
    src: media.stepConsult,
    alt: "A mandir drawing spread on the workshop bench, being talked through",
    aspect: "aspect-[3/2]",
    washed: true,
  },
  planning: {
    src: media.stepPlanning,
    alt: "Marble slabs stacked at the workshop, waiting to be matched and cut",
    aspect: "aspect-square",
    washed: true,
  },
  crafting: {
    src: media.stepCrafting,
    alt: "A murti part finished, chisel marks still showing in the stone",
    aspect: "aspect-[3/4]",
  },
  installation: {
    src: media.stepInstall,
    alt: "A finished mandir installed in a home, lit from above",
    aspect: "aspect-[3/4]",
  },
}

const stepKeys: StepKey[] = ["consultation", "planning", "crafting", "installation"]

export function ProcessSteps() {
  const { d, tc } = useLanguage()

  return (
    <>
      <div>
        {stepKeys.map((key, i) => {
          const step = d.ui.process.steps[key]
          const media = stepMedia[key]
          return (
            <Reveal
              key={key}
              className={`grid grid-cols-1 gap-4 py-9 lg:grid-cols-[120px_1fr_1fr] lg:gap-14 lg:py-14 ${
                i > 0 ? "border-t border-[rgba(36,31,26,0.14)]" : "lg:pt-0"
              } ${i === 0 ? "pt-0" : ""}`}
            >
              <div className="font-serif text-[34px] leading-none text-[var(--kma-gold)] lg:text-[56px]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h2 className="m-0 mb-3.5 font-serif text-[26px] font-bold leading-[1.12] lg:mb-[18px] lg:text-[34px] lg:leading-[1.1]">
                  {step.title}
                </h2>
                <div className={`tile mb-4 overflow-hidden rounded-2xl bg-[var(--kma-surface)] lg:hidden ${media.aspect}`}>
                  <Image
                    src={media.src}
                    alt={tc(media.alt)}
                    width={800}
                    height={600}
                    className={`h-full w-full object-cover ${media.washed ? "wash" : ""}`}
                  />
                </div>
                <p className="m-0 mb-[18px] text-base leading-[1.75] text-[var(--kma-body)] lg:mb-[26px] lg:text-[17px] lg:leading-[1.8]">
                  {step.description}
                </p>
                <div className="flex flex-col gap-2 text-sm text-[var(--kma-muted)] lg:grid lg:grid-cols-2 lg:gap-2.5">
                  {step.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-center gap-2.5">
                      <span className="h-[5px] w-[5px] flex-none rounded-full bg-[var(--kma-gold)]" />
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
              <div
                className={`tile hidden overflow-hidden rounded-[20px] bg-[var(--kma-surface)] lg:block ${media.aspect}`}
              >
                <Image
                  src={media.src}
                  alt={tc(media.alt)}
                  width={800}
                  height={600}
                  className={`h-full w-full object-cover ${media.washed ? "wash" : ""}`}
                />
              </div>
            </Reveal>
          )
        })}
      </div>

      {/* Quality assurance */}
      <Reveal className="mt-6 rounded-3xl bg-[var(--kma-surface)] p-7 lg:mt-14 lg:rounded-[28px] lg:px-[72px] lg:py-16">
        <div className="grid grid-cols-1 items-start gap-3.5 lg:grid-cols-[280px_1fr] lg:gap-16">
          <h2 className="m-0 font-serif text-2xl font-bold leading-[1.12] lg:text-[34px] lg:leading-[1.1]">
            {d.ui.process.quality.title}
          </h2>
          <p className="m-0 text-[15px] leading-[1.75] text-[var(--kma-body)] lg:text-lg lg:leading-[1.8]">
            {d.ui.process.quality.body}
          </p>
        </div>
      </Reveal>
    </>
  )
}
