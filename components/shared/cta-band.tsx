import Link from "next/link"
import { Reveal } from "@/components/layout/reveal"

interface CtaBandProps {
  title: string
  body: string
  primary: { label: string; href: string; external?: boolean }
  secondary?: { label: string; href: string; external?: boolean }
}

function CtaLink({
  label,
  href,
  external,
  variant,
}: CtaBandProps["primary"] & { variant: "primary" | "secondary" }) {
  const className =
    variant === "primary"
      ? "cta press shrink-0 rounded-full bg-[var(--kma-gold)] px-[30px] py-[15px] text-center text-sm font-semibold text-[var(--kma-ivory)]"
      : "press shrink-0 rounded-full border border-[rgba(247,244,239,0.35)] px-[30px] py-[15px] text-center text-sm font-semibold"
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {label}
    </a>
  ) : (
    <Link href={href} className={className}>
      {label}
    </Link>
  )
}

/** Dark full-width call-to-action band closing a page. */
export function CtaBand({ title, body, primary, secondary }: CtaBandProps) {
  return (
    <Reveal className="kma-dk mt-16 bg-[var(--kma-ink-2)] text-[var(--kma-ivory)] lg:mt-24">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-5 py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-14 lg:py-20">
        <div>
          <h2 className="m-0 mb-3.5 font-serif text-[30px] font-bold leading-tight lg:text-[40px]">{title}</h2>
          <p className="m-0 max-w-[520px] text-[15px] text-[rgba(247,244,239,0.72)] lg:text-base">{body}</p>
        </div>
        <div className="flex flex-col gap-3 lg:flex-row">
          <CtaLink {...primary} variant="primary" />
          {secondary && <CtaLink {...secondary} variant="secondary" />}
        </div>
      </div>
    </Reveal>
  )
}
