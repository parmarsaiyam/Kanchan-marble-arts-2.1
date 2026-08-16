# How this site is put together

A map of the project for anyone opening it for the first time. Every folder has
one job, and this explains what that job is.

---

## The short version

- **`app/`**: the pages. One folder per URL.
- **`components/`**: the reusable pieces the pages are built from.
- **`lib/`**: logic and data with no visual output.
- **`content/`**: the text and image lists the owner edits. **The CMS writes here.**
- **`public/`**: static files served as-is (fonts, logos, photos). `robots.txt`
  and `sitemap.xml` are *not* here. They are generated at build time by
  `app/robots.ts` and `app/sitemap.ts` so they can never go stale.

---

## `app/`: pages and URLs

Next.js turns each folder into a URL: `app/gallery/page.tsx` becomes `/gallery`.

| Folder | URL | What it is |
|---|---|---|
| `app/page.tsx` | `/` | Homepage |
| `app/products/` | `/products` | The catalogue |
| `app/products/[slug]/` | `/products/jain-mandir` | One product. `[slug]` means "any product name", and nine pages are generated from `content/catalog.json` at build time |
| `app/gallery/` | `/gallery` | Photo gallery |
| `app/process/` | `/process` | How pieces are made |
| `app/about/` | `/about` | Studio story, facts, FAQ |
| `app/contact/` | `/contact` | Visit / contact |
| `app/admin/` | `/admin` | **The CMS.** Password-protected, never indexed |
| `app/api/` | none | Server endpoints. No visible page |

### The `page.tsx` + `*-content.tsx` pattern

Most pages come in two files:

- **`page.tsx`** runs on the server. It holds the SEO information, the part the browser
  tab title, the Google description, the structured data.
- **`*-content.tsx`** runs in the browser. It holds everything the visitor sees
  and interacts with.

They are separate because the language switcher needs to run in the browser, but
SEO tags must exist on the server before any JavaScript loads. Splitting them
gets both.

### `app/api/`: the server endpoints

| Route | Purpose |
|---|---|
| `cms/login`, `cms/logout`, `cms/session` | CMS password sign-in |
| `cms/publish` | Commits content changes to GitHub, which redeploys the site |
| `cloudinary/sign` | Authorises an image upload without exposing the secret key |

---

## `components/`: the building blocks

Grouped by **where they are used**, so a change to the gallery never means
hunting through unrelated files.

| Folder | Contains |
|---|---|
| `layout/` | Things on every page: header, footer, announcement bar, floating call/WhatsApp buttons, animated background |
| `home/` | Homepage only: hero, hero carousel, four-step strip |
| `catalog/` | Products: the grid with filters, the product image viewer |
| `gallery/` | The photo grid and the full-screen lightbox |
| `shared/` | Used on more than one page: FAQ, testimonials, call-to-action band, workshop/map block, process steps |
| `cms/` | The `/admin` interface. Not part of the public site |
| `ui/` | Generic buttons, inputs and dialogs from the component library |

---

## `lib/`: logic, no visuals

| Folder | Contains |
|---|---|
| `config/site.ts` | Phone number, email, address, WhatsApp link, nav links. **Change contact details here, because everything else reads from it** |
| `content/products.ts` | Reads `content/catalog.json` and gives the rest of the site typed access to it |
| `content/faq.ts` | The order the FAQ questions appear in |
| `content/media-ratios.ts` | Which shape each image slot is cropped to. The CMS shows this to the owner before upload |
| `i18n/` | The three languages |
| `cms/` | CMS internals: session cookies, draft storage, content types |

### `lib/i18n/`: English, Hindi and Gujarati

```
dictionaries/en.ts   Every English string. THE MASTER FILE.
dictionaries/hi.ts   Hindi
dictionaries/gu.ts   Gujarati
context.tsx          Tracks the chosen language, remembers it, supplies the text
```

**To change any text on the site, edit `en.ts`**, then the same key in `hi.ts`
and `gu.ts`.

The Hindi and Gujarati files are typed against the English one, so if you add a
key to English and forget the other two, the build fails with an error naming
the missing key. Nothing can silently go untranslated.

---

## `content/`: what the CMS edits

| File | Holds |
|---|---|
| `catalog.json` | The nine products |
| `gallery.json` | Gallery photos, captions, categories |
| `settings.json` | Business details and the announcement bar |

These are plain JSON so they can be edited by hand *or* through `/admin`.

### How publishing works

```
You edit in /admin
      ↓  saved in your browser as a draft, the live site is untouched
Press "Publish"
      ↓  the server commits the changed JSON to GitHub
Netlify notices the commit
      ↓  rebuilds the site (about 1–2 minutes)
Changes are live
```

Nothing reaches visitors until Publish, and every publish is an ordinary git
commit, so any change can be undone by reverting it.

---

## Styling

Tailwind CSS, with the palette and custom effects in `app/globals.css`:

- **Colour tokens** (`--kma-gold`, `--kma-ink`, …) are defined once at the top.
- **Effect classes**: `.cta` (the sweeping shine on gold buttons), `.press`
  (hover lift), `.tile` (image zoom on hover), `.rv` (fade in on scroll).
- **`.kma-bg-*`**: the animated gold background layers.

Every animation is switched off automatically for visitors who have "reduce
motion" enabled in their operating system.

---

## Environment variables

Copy `.env.example` to `.env.local` and fill it in. The same values go into
Netlify under *Site configuration → Environment variables*.

| Variable | Needed for |
|---|---|
| `CMS_PASSWORD` | The `/admin` password. **Defaults to `admin`, change this** |
| `CMS_SESSION_SECRET` | Signs the login cookie |
| `CLOUDINARY_API_KEY` / `_SECRET` | Uploading images from the CMS |
| `GITHUB_TOKEN` / `GITHUB_REPO` | Publishing changes |
| `NEXT_PUBLIC_GA_ID` | Google Analytics |

Anything starting `NEXT_PUBLIC_` is visible to visitors. Everything else stays
on the server. Never rename a secret to `NEXT_PUBLIC_`.
