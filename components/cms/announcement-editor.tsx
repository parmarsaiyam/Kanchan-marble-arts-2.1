"use client"

import { X } from "lucide-react"
import { useDraft } from "@/lib/cms/draft-store"
import { ANNOUNCEMENT_TONES, type Announcement, type AnnouncementTone, type Translated } from "@/lib/cms/types"
import { Field, TextInput, Toggle, TranslatedField } from "./fields"

const MAX_DESKTOP = 110
const MAX_MOBILE = 70

/** Maps the flat `_hi` / `_gu` fields in settings.json onto tabbed values. */
function group(anno: Announcement, field: "text" | "mobileText" | "linkText"): Translated {
  return {
    en: anno[field] ?? "",
    hi: (anno[`${field}_hi` as keyof Announcement] as string) ?? "",
    gu: (anno[`${field}_gu` as keyof Announcement] as string) ?? "",
  }
}
function ungroup(field: "text" | "mobileText" | "linkText", value: Translated) {
  return {
    [field]: value.en ?? "",
    [`${field}_hi`]: value.hi ?? "",
    [`${field}_gu`]: value.gu ?? "",
  }
}

const toneStyles: Record<AnnouncementTone, { bar: string; dot: string; text: string }> = {
  festival: { bar: "bg-[var(--kma-ink)]", dot: "bg-[var(--kma-gold-light)]", text: "text-[var(--kma-cream)]" },
  offer: { bar: "bg-[var(--kma-gold)]", dot: "bg-[var(--kma-ink)]", text: "text-[var(--kma-ivory)]" },
  notice: { bar: "bg-[var(--kma-surface)]", dot: "bg-[var(--kma-gold)]", text: "text-[var(--kma-ink)]" },
}

export function AnnouncementEditor() {
  const { content, update } = useDraft()
  const anno: Announcement = (content.settings.announcement as Announcement) ?? {
    enabled: false,
    text: "",
  }

  const patch = (changes: Partial<Announcement>) =>
    update("settings", { ...content.settings, announcement: { ...anno, ...changes } })

  const tone = anno.tone ?? "festival"
  const styles = toneStyles[tone]

  return (
    <div>
      <header className="mb-6">
        <h1 className="m-0 font-serif text-[30px] font-bold leading-tight lg:text-[38px]">Announcements</h1>
        <p className="m-0 mt-1.5 text-sm text-[var(--kma-muted)]">One at a time, shown on every page.</p>
      </header>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_400px]">
        <div>
          <div className="mb-6 rounded-2xl border border-[var(--kma-hairline)] bg-[rgba(255,255,255,0.5)] p-4">
            <Toggle
              checked={anno.enabled}
              onChange={(v) => patch({ enabled: v })}
              label="Show the announcement bar"
              hint="Turn off and the site loses the bar entirely. Nothing else shifts."
            />
          </div>

          <TranslatedField
            label="Message"
            value={group(anno, "text")}
            onChange={(v) => patch(ungroup("text", v) as Partial<Announcement>)}
            multiline
            maxLength={MAX_DESKTOP}
            hint="Keep it under 110 characters so it stays on one line."
          />

          <TranslatedField
            label="Short version, used on phones"
            value={group(anno, "mobileText")}
            onChange={(v) => patch(ungroup("mobileText", v) as Partial<Announcement>)}
            maxLength={MAX_MOBILE}
            hint="Leave empty to reuse the full message."
          />

          <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-2">
            <TranslatedField
              label="Link text"
              value={group(anno, "linkText")}
              onChange={(v) => patch(ungroup("linkText", v) as Partial<Announcement>)}
            />
            <Field label="Link goes to" hint="A page on the site, e.g. /contact or /products.">
              <TextInput
                value={anno.href ?? ""}
                placeholder="/contact"
                onChange={(e) => patch({ href: e.target.value })}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-2">
            <Field label="Starts" hint="Leave empty to start as soon as you publish.">
              <TextInput
                type="datetime-local"
                value={anno.startsAt ?? ""}
                onChange={(e) => patch({ startsAt: e.target.value })}
              />
            </Field>
            <Field label="Ends automatically" hint="The bar disappears on its own. Nobody has to switch it off.">
              <TextInput
                type="datetime-local"
                value={anno.endsAt ?? ""}
                onChange={(e) => patch({ endsAt: e.target.value })}
              />
            </Field>
          </div>

          <Field label="Tone">
            <div className="flex flex-wrap gap-2">
              {ANNOUNCEMENT_TONES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => patch({ tone: t.id })}
                  title={t.hint}
                  className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                    tone === t.id
                      ? "bg-[var(--kma-ink)] text-[var(--kma-ivory)]"
                      : "border border-[rgba(36,31,26,0.18)] hover:border-[rgba(36,31,26,0.34)]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </Field>

          <div className="mt-2 rounded-2xl border border-[var(--kma-hairline)] bg-[rgba(255,255,255,0.5)] p-4">
            <div className="kicker mb-1">Behaviour</div>
            <Toggle
              checked={anno.dismissible ?? true}
              onChange={(v) => patch({ dismissible: v })}
              label="Visitor can dismiss it"
            />
            <Field label="Stays dismissed for">
              <TextInput
                type="number"
                min={0}
                max={90}
                value={anno.dismissDays ?? 7}
                onChange={(e) => patch({ dismissDays: Number(e.target.value) })}
              />
            </Field>
          </div>
        </div>

        <aside>
          <div className="sticky top-6">
            <div className="kicker mb-3">How it will look</div>

            <div className="mb-5 overflow-hidden rounded-xl border border-[var(--kma-hairline)]">
              <div className={`relative flex items-center justify-center gap-3 px-10 py-2.5 ${styles.bar}`}>
                <span className={`h-1.5 w-1.5 flex-none rounded-full ${styles.dot}`} />
                <span className={`text-[12px] ${styles.text}`}>{anno.text || "Your message appears here"}</span>
                {anno.linkText && (
                  <span className={`text-[12px] font-semibold ${styles.text} underline`}>{anno.linkText}</span>
                )}
                {(anno.dismissible ?? true) && (
                  <X className={`absolute right-3 h-3.5 w-3.5 opacity-55 ${styles.text}`} />
                )}
              </div>
            </div>

            <div className="kicker mb-3">On a phone</div>
            <div className="mx-auto w-[240px] overflow-hidden rounded-[20px] border-[6px] border-[var(--kma-ink)]">
              <div className={`relative flex items-center gap-2 px-3 py-2 ${styles.bar}`}>
                <span className={`h-1.5 w-1.5 flex-none rounded-full ${styles.dot}`} />
                <span className={`flex-1 text-[10px] leading-snug ${styles.text}`}>
                  {anno.mobileText || anno.text || "Short version"}
                </span>
                {(anno.dismissible ?? true) && <X className={`h-3 w-3 opacity-55 ${styles.text}`} />}
              </div>
              <div className="h-16 bg-[var(--kma-ivory)]" />
            </div>

            <p className="m-0 mt-5 rounded-xl bg-[rgba(154,123,47,0.09)] p-3.5 text-[12px] leading-relaxed text-[var(--kma-body)]">
              Only one announcement runs at a time. When the end date passes the bar disappears on its own, so an
              expired festival offer can never be left up by accident.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
