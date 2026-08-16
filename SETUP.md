# Setup guide

Everything needed to get the site, the CMS and analytics working on Netlify.
Follow top to bottom. Nothing here costs money.

---

## Part 0. Commit and push

Do this first so you can undo anything later.

```bash
git status                    # look at what changed
git add -A
git commit -m "SEO, CMS setup and copy pass"
git push
```

Netlify sees the push and rebuilds by itself, in about two minutes. The site
will work exactly as before. The CMS needs keys, which is the next part.

---

## Part 1. Netlify, step by step

You will spend about ten minutes here, all of it in one screen.

### 1a. Find the right screen

Log in at **app.netlify.com**, click your site, then
**Site configuration → Environment variables**.

Every step below is "click **Add a variable**, type a key, paste a value, save".

### 1b. What each variable is for

| Key | What it does | Where the value comes from |
|---|---|---|
| `CMS_PASSWORD` | Your `/admin` password | You invent it |
| `CMS_SESSION_SECRET` | Signs the login cookie so nobody can forge it | `openssl rand -base64 32` |
| `CLOUDINARY_API_KEY` | Lets the CMS upload photos | cloudinary.com → Settings → API Keys |
| `CLOUDINARY_API_SECRET` | Same, the secret half | Same screen |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Which Cloudinary account | `duuqhl0w9` |
| `GITHUB_TOKEN` | Lets Publish save your edits | GitHub, see 1d |
| `GITHUB_REPO` | Which repo to save into | `your-username/your-repo` |
| `GITHUB_BRANCH` | Which branch | `main` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics | GA → Admin → Data streams, looks like `G-XXXXXXX` |

Only the two starting with `NEXT_PUBLIC_` are safe to be seen by visitors. That
prefix literally means "send this to the browser", so never add it to a secret.

### 1c. Getting the Cloudinary keys

Cloudinary is a free image host with a CDN. You upload a photo once, and it
serves a copy from a server near each visitor. Your images are already there:
that is what `res.cloudinary.com/duuqhl0w9/...` means in the code.

Anyone can *view* those images. Only someone with the secret key can *upload*.
That is the whole reason the CMS needs a key.

1. cloudinary.com → log in → **Settings → API Keys**
2. Copy **API Key** and **API Secret**
3. Paste them into Netlify as the two variables above

### 1d. Getting the GitHub token

Your site is *static*: the pages are pre-built into plain HTML files, which is
why it loads fast and costs nothing to run. When you press **Publish** in the
CMS, it saves the new text into your GitHub repository, and Netlify notices and
rebuilds the pages. The token is what lets it save.

1. github.com → **Settings → Developer settings → Personal access tokens →
   Fine-grained tokens → Generate new token**
2. Fill in:
   - **Token name:** `kma-cms`
   - **Expiration:** 1 year, and set a calendar reminder to renew
   - **Repository access:** *Only select repositories*, then pick **this repo only**
   - **Permissions → Repository permissions → Contents: Read and write**

   That single permission is all it needs. Grant nothing else.
3. Generate, then copy the token. GitHub shows it **once**.
4. Paste it into Netlify as `GITHUB_TOKEN`.

### 1e. Change the CMS password

Right now the password is `admin`, and the CMS shows a red warning because of
it. That login can edit your site and upload to your Cloudinary, so change it.

```bash
openssl rand -base64 32       # paste the output as CMS_SESSION_SECRET
```

`CMS_PASSWORD` is whatever you will remember.

### 1f. Redeploy, or none of this takes effect

This is the step people miss. Environment variables are read at **build** time,
so the deploy that is already live knows nothing about them.

**Deploys → Trigger deploy → Clear cache and deploy site.**

### 1g. Check it worked

1. Open `yoursite.com/admin`, sign in. The red password warning should be gone.
2. **Gallery**, change a caption. The header should show "Publish 1".
3. Press **Publish**.
4. Look at GitHub. There should be a new commit touching `content/gallery.json`.
5. Wait about two minutes, reload the site, the caption is live.

If step 3 fails, it is almost always the GitHub token: wrong repo, wrong branch
name, or the Contents permission was left on "Read-only".

### Working locally

```bash
cp .env.example .env.local     # then fill in the same values
npm run dev                    # open http://localhost:3000/admin
```

Careful: local publishing commits to the **real** repository and triggers a
**real** deploy. There is no separate test mode.

---

## Part 2. Google Analytics

**What GA4 is:** a free counter that records what people do on your site.

**Three words you will keep seeing:**
- **Event:** something a visitor did, such as "clicked WhatsApp".
- **Key event:** an event you marked as important. GA's word for a conversion.
- **Engaged session:** a visit longer than 10 seconds, or with 2 or more pages.

### 2a. Confirm the ID is set

`NEXT_PUBLIC_GA_ID` in Netlify, from GA under **Admin → Data streams → your
site**. This one starts with `NEXT_PUBLIC_` on purpose. It runs in the browser
and it is not a secret.

### 2b. The events the site sends

| Event | Fires when |
|---|---|
| `contact_whatsapp` | Any WhatsApp button |
| `contact_call` | Any phone button |
| `contact_email` | The email card |
| `get_directions` | Any map or directions button |
| `view_product` | A product page is opened |
| `quick_view_product` | The quick-view popup |
| `filter_list` | Products or gallery filtered |
| `view_gallery_image` | A gallery photo opened full screen |
| `faq_open` | An FAQ question expanded |
| `language_change` | Hindi or Gujarati chosen |

Every contact event carries a `source` telling you *where* it was clicked
(`hero`, `mobile_fab`, `contact_page`, `product_detail` and so on). That answers
"which page actually produces enquiries", usually the most useful thing to know.

### 2c. Mark your conversions

**Admin → Events.** Wait until an event appears in the list, which can take 24
hours, then toggle **Mark as key event** for `contact_whatsapp`, `contact_call`
and `get_directions`.

### 2d. Build a dashboard worth opening

**Reports → Library → Create new report → Overview**, then add cards for:

1. **Key events by source.** Which page drives enquiries.
2. **Views by page title.** Most popular pages.
3. **Sessions by session default channel group.** Where visitors come from:
   Google, WhatsApp shares, direct.
4. **Views by city.** Confirms you are reaching Mumbai.

Save, then **Reports → Library → your collection → Publish**.

### 2e. Also do these

- **Enhanced measurement** (Admin → Data streams → your stream). Switch it on.
  Free scroll tracking, outbound clicks and site search, no code needed.
- **Link Google Search Console** (Admin → Product links). Shows which search
  terms bring people in, which pairs with the keyword work already done.
- **Google Business Profile.** For a local shop this drives more calls than the
  website does. Make sure the name, address and phone match the site exactly.
  Google cross-checks them, and the site's structured data now matches.

### 2f. What to actually look at

Weekly, one number: **key events**. If WhatsApp clicks go up, the site is
working. Everything else is diagnosis.

Ignore bounce rate. It means very little for a business where the correct
outcome is often "read the phone number and call".

Also treat the numbers as trends rather than a headcount. Ad blockers stop GA
for roughly 10 to 30 percent of visitors, and there is nothing to be done about
that on a free setup.

---

## Part 3. SEO, and what is already done

The site now ships with all of this in place. Nothing here needs your attention
unless something changes.

| Item | Where it lives |
|---|---|
| Search Console verification | meta tag in `app/layout.tsx` |
| Google Analytics | `app/layout.tsx` + `lib/analytics.ts` |
| Sitemap | `app/sitemap.ts`, generated at build, includes all 9 product pages |
| robots.txt | `app/robots.ts`, generated at build, blocks `/admin` and `/api` |
| Canonical URLs | every page's `alternates.canonical` |
| LocalBusiness + Organization | `components/layout/json-ld.tsx`, on every page |
| Product schema | `app/products/[slug]/page.tsx` |
| FAQ schema | `app/about/page.tsx`, matches the visible FAQ |
| Breadcrumbs | `components/layout/breadcrumb-json-ld.tsx`, on every page |
| OpenGraph and Twitter cards | `app/layout.tsx`, image at `/images/og-image.jpg` |
| WebP and AVIF | `next.config.mjs`, automatic per visitor |
| Clean URLs, 404 page, HTTPS | routing, `app/not-found.tsx`, Netlify |

### The two things only you can do

1. **Google Search Console.** Verify the site if you have not, then submit
   `https://kanchanmarblearts.com/sitemap.xml` once. Check the Coverage report
   about a week after launch.
2. **Google Business Profile.** Same name, same address, same phone number as
   the site. For "marble mandir shop near Kandivali" this matters more than
   anything on the website.

### If images ever break after a deploy

`next.config.mjs` now optimises images instead of serving the originals. If a
deploy ever shows broken images, set `unoptimized: true` back inside the
`images` block and redeploy. That is the whole rollback.

---

## Part 4. Do you need Supabase?

**Short answer: no, not now.**

**What Supabase is:** a hosted database, a spreadsheet your website can read and
write in real time.

### How your site works today

```
Content lives in    content/*.json  (text files in GitHub)
Pages are built     once, at deploy time, into plain HTML
Visitors get        a finished HTML file from a CDN
Images come from    Cloudinary's CDN
```

Nothing runs a database when someone visits. That is why the site is fast and
free, and why it cannot fall over under traffic.

### What Supabase would change

| | Today (JSON + GitHub) | With Supabase |
|---|---|---|
| Publish speed | about 2 min rebuild | Instant |
| Page speed | Fastest possible | Slower, every visit queries a database |
| Cost | Rs 0 forever | Free tier, but **pauses after 7 days of inactivity** |
| Undo a mistake | `git revert` | Only if you set up backups |
| Moving parts | Zero | A service that can go down |

### On your CDN goal

You already have exactly what you asked for. **Supabase would not improve image
loading at all.** You would still store Cloudinary URLs, just in a database row
instead of a JSON file. Same URL, same CDN, same speed. The only change is that
your site would have to make a database call first to *find* the URL, which is
strictly slower than having it baked into the page.

Storing image files *inside* a database is the thing to avoid, and neither
option does that. Both store the URL. That part is already right.

### The one real cost warning

Supabase's free tier **pauses your project after 7 days with no activity**. For
a site with quiet weeks you could wake up to a broken shop, and restarting it is
manual. JSON files cannot do that.

### When to revisit

Add a database only when you need something JSON genuinely cannot do:

- Customers log in and see their order status
- Orders and enquiries stored, rather than arriving by WhatsApp
- Live stock levels changing many times a day
- Several staff editing at once and overwriting each other

None of those apply to a nine-product showcase updated a few times a month.

**Verdict:** stay on JSON. The two-minute publish delay is the only downside,
and it buys you zero cost, zero maintenance, and a site that cannot go down.

---

## Free tier limits, for reference

| Service | Free allowance | Realistic usage |
|---|---|---|
| **Netlify** | 100 GB bandwidth, 300 build-min/month | A small site uses 1 to 2 GB. Each publish is about 2 build-min, so roughly 150 publishes a month |
| **Cloudinary** | 25 credits/month, about 25 GB delivery | Comfortable for a photo-led site |
| **GitHub** | Unlimited private repos | Free |
| **Google Analytics** | 10M events/month | Free |

Your only realistic ceiling is Netlify build minutes. Batch several edits into
one Publish and you will never come close.

---

## Security checklist before launch

- [ ] `CMS_PASSWORD` changed from `admin`
- [ ] `CMS_SESSION_SECRET` set to a random string
- [ ] GitHub token is fine-grained, this repo only, Contents only
- [ ] `.env.local` is not committed (it is in `.gitignore`, confirm with `git status`)
- [ ] Signed in to `/admin` once and the red warning is gone
- [ ] Triggered a **clear cache and deploy** after adding the variables
