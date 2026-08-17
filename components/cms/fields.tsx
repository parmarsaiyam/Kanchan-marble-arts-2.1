"use client"

import { useState, type ReactNode } from "react"
import { Check } from "lucide-react"
import { locales, localeMeta, type Locale } from "@/lib/i18n/config"

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="mb-5">
      <div className="kicker mb-[7px]">{label}</div>
      {children}
      {hint && <p className="m-0 mt-1.5 text-[12px] leading-snug text-[var(--kma-muted-2)]">{hint}</p>}
    </div>
  )
}

const inputClass =
  "w-full rounded-xl border border-[rgba(36,31,26,0.18)] bg-white px-3.5 py-[11px] text-sm text-[var(--kma-ink)] outline-none transition-colors focus:border-[var(--kma-gold)]"

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className ?? ""}`} />
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClass} resize-y leading-relaxed ${props.className ?? ""}`} />
}

export function Toggle({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean
  onChange: (next: boolean) => void
  label: string
  hint?: string
}) {
  return (
    // `min-w-0` on the text column stops a long hint from pushing the switch
    // off the edge of a narrow card, which is what used to happen on phones.
    <label className="flex cursor-pointer items-start gap-3 py-2">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 box-content h-6 w-11 flex-none overflow-hidden rounded-full p-0 transition-colors ${
          checked ? "bg-[var(--kma-gold)]" : "bg-[rgba(36,31,26,0.22)]"
        }`}
      >
        {/* Anchored with an explicit `left`. It used to rely on the static
            position, which put the knob wherever the browser's default button
            padding happened to leave it, so the checked state overflowed the
            track. Track 44px, knob 20px, 2px inset: travel is exactly 20px. */}
        <span
          className={`pointer-events-none absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-[var(--kma-ink)]">{label}</span>
        {hint && <span className="block text-[12px] leading-snug text-[var(--kma-muted-2)]">{hint}</span>}
      </span>
    </label>
  )
}

/**
 * EN / हिं / ગુ tabs over a single field.
 *
 * English is the stored base value; the other two are optional and fall back to
 * English on the live site, so the tab shows a dot when a translation is still
 * empty rather than pretending the field is done.
 */
export function TranslatedField({
  label,
  hint,
  value,
  onChange,
  multiline = false,
  maxLength,
  placeholder,
}: {
  label: string
  hint?: string
  /** Keyed by locale; `en` is required. */
  value: Partial<Record<Locale, string>>
  onChange: (next: Partial<Record<Locale, string>>) => void
  multiline?: boolean
  maxLength?: number
  placeholder?: string
}) {
  const [active, setActive] = useState<Locale>("en")
  const current = value[active] ?? ""
  const Comp = multiline ? TextArea : TextInput

  return (
    <div className="mb-5">
      {/* Wraps on a narrow screen. Before, a long label and the three language
          pills fought for the same row and the pills spilled out of the card. */}
      <div className="mb-[7px] flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <div className="kicker min-w-0">{label}</div>
        <div className="flex flex-none items-center gap-1 rounded-full border border-[var(--kma-hairline)] p-0.5">
          {locales.map((code) => {
            const filled = Boolean((value[code] ?? "").trim())
            return (
              <button
                key={code}
                type="button"
                onClick={() => setActive(code)}
                lang={localeMeta[code].htmlLang}
                title={localeMeta[code].label}
                className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                  active === code
                    ? "bg-[var(--kma-ink)] text-[var(--kma-ivory)]"
                    : "text-[var(--kma-muted)] hover:text-[var(--kma-ink)]"
                }`}
              >
                {localeMeta[code].short}
                {code !== "en" && !filled && (
                  <span className="h-1 w-1 rounded-full bg-[var(--kma-gold)]" aria-label="not translated" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      <Comp
        value={current}
        rows={multiline ? 3 : undefined}
        maxLength={maxLength}
        placeholder={active === "en" ? placeholder : value.en || placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
          onChange({ ...value, [active]: e.target.value })
        }
      />

      <div className="mt-1.5 flex items-start justify-between gap-4">
        <p className="m-0 text-[12px] leading-snug text-[var(--kma-muted-2)]">
          {active === "en"
            ? hint
            : `Leave empty and ${localeMeta[active].label} visitors see the English text.`}
        </p>
        {maxLength && (
          <span
            className={`flex-none text-[12px] tabular-nums ${
              current.length > maxLength * 0.95 ? "font-semibold text-[#8c2f1d]" : "text-[var(--kma-muted-2)]"
            }`}
          >
            {current.length} / {maxLength}
          </span>
        )}
      </div>
    </div>
  )
}

/** Per-language completeness summary, as in the design's Translations panel. */
export function TranslationStatus({ fields }: { fields: Partial<Record<Locale, string>>[] }) {
  return (
    <div className="rounded-2xl border border-[var(--kma-hairline)] bg-[rgba(255,255,255,0.5)] p-4">
      <div className="kicker mb-3">Translations</div>
      {locales.map((code) => {
        const missing = fields.filter((f) => !(f[code] ?? "").trim()).length
        const complete = missing === 0
        return (
          <div key={code} className="flex items-center justify-between py-1.5 text-sm">
            <span lang={localeMeta[code].htmlLang} className="text-[var(--kma-ink)]">
              {localeMeta[code].label}
            </span>
            <span
              className={`flex items-center gap-1.5 text-[13px] ${
                complete ? "text-[var(--kma-gold-deep)]" : "text-[var(--kma-muted-2)]"
              }`}
            >
              {complete ? (
                <>
                  <Check className="h-3.5 w-3.5" strokeWidth={2.4} /> Complete
                </>
              ) : (
                `${missing} field${missing === 1 ? "" : "s"} left`
              )}
            </span>
          </div>
        )
      })}
      <p className="m-0 mt-2 border-t border-[var(--kma-hairline)] pt-2.5 text-[12px] leading-snug text-[var(--kma-muted-2)]">
        Untranslated fields fall back to English on the live site.
      </p>
    </div>
  )
}

export function StatusBadge({ status }: { status: "live" | "draft" | "hidden" }) {
  const styles = {
    live: "bg-[rgba(37,211,102,0.15)] text-[#1a7a41]",
    draft: "bg-[rgba(154,123,47,0.16)] text-[var(--kma-gold-deep)]",
    hidden: "bg-[rgba(36,31,26,0.09)] text-[var(--kma-muted)]",
  }[status]
  return (
    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${styles}`}>
      {status}
    </span>
  )
}
