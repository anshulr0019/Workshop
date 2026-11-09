# Manoj Automobile

A mobile-first React + Vite website for the workshop. The public website works on static hosting; live Google reviews additionally require a server function.

## Run and verify

```sh
npm ci
npm run dev
npm run typecheck
npm test
npm run build
npm run preview
```

Use Node 22.12+ or a current supported LTS. The production output is `dist/`. Deploy that directory, **not the repository root**. The repository already tracked `node_modules/` and `dist/`; `.gitignore` now ignores new generated files, but existing tracked entries should be removed from Git tracking as a separate housekeeping change.

## What works now

- Responsive design with real owner/team photos, lightweight scroll reveals, reduced-motion support and keyboard focus states.
- Mobile call, Maps and WhatsApp actions; accessible mobile navigation and native FAQ disclosures.
- Car/service selection that prepares a WhatsApp quote enquiry, plus free-text questions and suggested issue buttons. Customers review and send messages in WhatsApp; the website does not claim an enquiry was delivered or a visit confirmed.
- Click-to-load Google Maps once an exact embed is configured; a WhatsApp location request otherwise. Local privacy/terms pages, favicon, search/social metadata and AutoRepair structured data.
- Google review UI and a server-only Google Places integration, with failure and no-configuration fallbacks. **Live reviews are not enabled yet.**

## Owner details to confirm before launch

1. Phone numbers: **+91 92131 72194** (primary: call button and WhatsApp) and **+91 81788 96377**. Both are listed in `business.phones`.
2. Exact street address and Google Maps listing. The previous site only pointed to the Dabri area. Until you supply the exact listing, links clearly open a business search, not precise directions.
3. Hours: every day 9:30 AM–10 PM (confirmed Nov 2026). Booking slots in `BookAppointment.tsx` follow these; update both together. Confirm public-holiday handling.
4. The existing 30+ years experience claim, offered services, supported vehicles, and team photos.
5. Prices are intentionally not shown anywhere on the site. The old price estimator is kept in `archive/` only for reference.
6. Review the plain-language privacy/terms pages against the actual hosting and workshop practices.

Business settings are centralized in `src/data/business.ts`. Also keep contact details in `index.html` (structured data and no-JavaScript fallback) and `public/privacy.html` / `public/terms.html` in sync.

## 3D engine scroll story

Between the hero and Services, a pinned section tells "Understand the engine. Care for the whole car." with **real 3D models** rendered by three.js (loaded lazily, rendered only when the scroll position changes). It follows normal scrolling, reverses when scrolling up, falls back to text-only if WebGL fails, and shows a still frame under reduced motion.

- Engine: a real 3D scan, "Four-cylinder engine" by Artec 3D (CC BY 3.0, https://www.artec3d.com/3d-models/four-cylinder-engine), simplified from 10M to 150k triangles and meshopt-compressed to `public/models/engine-artec-i4.glb` (0.9 MB). The credit is shown on the section, as the licence requires.
- Car: add a licensed GLB in `models.car` in `src/engine-story/config.ts` (url, bonnet node name, engine mount point). With no car, the engine-only sequence runs.
- Camera, engine path, timing, copy, scroll length: `src/engine-story/config.ts`. Scene: `src/engine-story/scene.ts`. Section: `src/components/EngineStory.tsx`; styles: `.story*` at the end of `src/index.css`.

## Hindi / English

A हिंदी / English switch in the header translates the whole site (remembered in the visitor's browser; first visit follows the phone's language). English text in the components doubles as the lookup key in `src/i18n/hi.ts`; to change wording, edit both. Missing Hindi strings fall back to English and are logged in development (`[i18n] missing Hindi`). Customer reviews and the address are shown as written. The Hind font covers Devanagari and downloads only when Hindi text is on screen.

## Open now badge and breakdown help

- `src/components/OpenStatus.tsx` shows "Open now · Closes 10 PM" / "Closed now · Opens 9:30 AM" in Delhi time, from `opensAt`/`closesAt` in `src/data/business.ts` (keep in sync with `hours` and the booking slots).
- `src/components/BreakdownHelp.tsx` (below the brands strip): Call now, or open WhatsApp with the visitor's location link (asked only on tap; see the privacy page).

## Booking appointments

The **Book a visit** section (`src/components/BookAppointment.tsx`) collects name, mobile, car, fuel, work needed, a preferred day (up to 30 days ahead) and a time slot. Slots follow the workshop hours, and slots that have already passed are hidden for today. Submitting opens WhatsApp with the request filled in; the customer taps send and Manoj Ji replies to confirm. Nothing is stored on a server.

## Live Google reviews (all of them)

`/api/reviews` reads **every** review from the workshop's Google Business Profile, newest first, with Manoj Ji's replies, and Vercel shares the result from its edge for an hour (so roughly 24 Google calls a day however busy the site is). If that isn't configured it falls back to the Places API (5 reviews), and if that is off too, the reviews saved in `src/data/reviews.ts` are shown.

One-time setup (the Google account that manages the listing on Google Maps must do the sign-in in step 5):

1. Create a project at console.cloud.google.com.
2. Ask Google for Business Profile API access: https://developers.google.com/my-business/content/prereqs (form asks for the project number; approval can take a few days and usage quota is 0 until then).
3. Once approved, enable **My Business Account Management API**, **My Business Business Information API** and **Google My Business API** in that project.
4. *APIs & Services → OAuth consent screen*: External, add the scope `.../auth/business.manage`, then **Publish app** (status "In production"). In "Testing" mode Google expires the refresh token after 7 days. An unverified-app warning during your own sign-in is expected; click *Advanced → continue*.
5. *Credentials → Create OAuth client ID → Desktop app*. Then run locally:
   `GBP_CLIENT_ID=... GBP_CLIENT_SECRET=... node scripts/google-business-setup.mjs`
   Open the printed link, sign in with the listing owner's account, and copy the printed `GBP_REFRESH_TOKEN` and `GBP_LOCATION`.
6. In Vercel → Settings → Environment Variables (Production) set `GBP_CLIENT_ID`, `GBP_CLIENT_SECRET`, `GBP_REFRESH_TOKEN`, `GBP_LOCATION`, `GOOGLE_MAPS_URL` and `VITE_LIVE_REVIEWS=true`, then redeploy.

The refresh token can manage the Business Profile: keep it only in Vercel's server variables, never in a `VITE_` variable or in Git. Revoke it any time at myaccount.google.com/permissions.

## Showing Google reviews without an API key

Paste real reviews from the Google Maps listing into `src/data/reviews.ts` (name, star rating, text exactly as written, and how long ago), plus the overall rating and review count. They appear in the Reviews section whenever live reviews are off. Copy them unchanged and do not pick only the best ones. Set `VITE_GOOGLE_PLACE_ID` so the **Write a review** button opens Google's review form directly.

## Connect Google Maps and live reviews

Copy `.env.example` to `.env.local` for local configuration. Put production values in the hosting dashboard; never commit an API key.

1. Obtain the correct workshop listing URL and Google Place ID. Set `VITE_GOOGLE_MAPS_URL` and `VITE_GOOGLE_PLACE_ID`. Optionally copy the iframe `src` from the verified listing’s **Share → Embed a map** into `VITE_GOOGLE_MAPS_EMBED_URL` (must start with `https://www.google.com/maps/embed?`); until then the location card asks Manoj Ji for the pin on WhatsApp. Set `GOOGLE_PLACE_ID` to the **same** ID on the server.
2. In the workshop’s Google Cloud project, enable Places API (New) and billing. Create a server-side key restricted to Places API (New), plus an appropriate application restriction for your server infrastructure. Configure quotas, billing alerts and host-level abuse/rate limiting before enabling the public endpoint. Billing alerts alone do not cap spend.
3. Set the server secret `GOOGLE_PLACES_API_KEY`. **Never put it in a variable beginning with `VITE_`, React code, a public JSON file, or a URL.**
4. On Vercel, import the project with the Vite preset, build command `npm run build` and output `dist`. `api/reviews.mjs` provides `GET /api/reviews`. On another host, adapt `server/google-reviews.mjs` into that host’s function format and route `/api/reviews` to it.
5. Only after the endpoint is configured, set `VITE_LIVE_REVIEWS=true` and rebuild/redeploy. A plain static `dist/` upload cannot execute the server function. The normal Vite dev server does not execute Vercel functions; use the host’s local function runtime to test live integration.
6. Check that the live rating, review authors and listing URL all belong to the correct workshop. Keep the API key out of browser requests and built assets.

Google Places returns up to five reviews ordered by relevance, **not the full review history or necessarily the latest reviews**. The page displays original review text, author name/profile/photo when provided, review source links, provider attribution and Google Maps attribution. It does not filter out lower ratings. Data is fetched when the reviews section approaches the viewport and is not persisted or cached. No calls are made when the feature is disabled. If the endpoint times out or fails, the Google Maps link remains usable.

References: [Place Details](https://developers.google.com/maps/documentation/places/web-service/place-details), [review fields](https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places), [attribution and policy requirements](https://developers.google.com/maps/documentation/places/web-service/policies), [usage and billing](https://developers.google.com/maps/documentation/places/web-service/usage-and-billing).

## Before putting the domain live

- Set HTTPS and one canonical domain. Add the final absolute canonical URL, `og:url`, a real social share image with an absolute `og:image` URL, and a sitemap after the domain is chosen. No placeholder domain has been inserted.
- Verify all business details above, then place a real test call and send a WhatsApp test message yourself. Automated checks inspect the generated links without contacting customers or the workshop.
- Test on a real Android phone and iPhone, including the keyboard, browser safe areas, slow mobile internet and links to WhatsApp/Maps. Browser viewport checks cannot replace those device tests.
- If using live reviews, test the production endpoint, observe billing and verify your abuse controls. Live Google access has not been tested without the workshop’s credentials.

## Old prototypes

`AdminDashboard.tsx` and `PricePrediction.tsx` remain as unmounted source for future work. They are **not imported by the public app** and are not shipped in its JavaScript bundle. The hardcoded admin password has been removed. The local admin prototype only accepts `LOCAL DEMO` in development; this is explicitly not authentication. Its browser-only localStorage data is not a shared workshop database. A real admin app requires server-side authentication, authorization and persistent storage before deployment.

The fake testimonials and fixed Google star count were removed. The unauthenticated AI request and fabricated vehicle health score were replaced in the public experience with direct workshop enquiries.

## Useful next additions

1. Real workshop exterior and repair photos, including a recognizable arrival landmark.
2. A full Hindi language option for local customers.
3. Owner-approved service packages with clear inclusions and exclusions.
4. A Google review QR card at the workshop linking to the confirmed business profile.
5. Later: authenticated job tracking, digital invoices and opt-in service reminders backed by a real database.

## Verification performed

- TypeScript check and production build pass.
- Five automated tests cover unconfigured reviews, preserved ratings/attribution, empty reviews, upstream failures/secret handling and read-only endpoint behavior.
- Browser checks at 320, 375, 390, 430, 768, 1024 and 1440px: no horizontal overflow.
- Checked mobile menu dismissal, quote selection, encoded WhatsApp enquiries (including Hindi and ampersands), FAQ expansion, local anchor targets and loaded images.
- Original photos (~25 MB combined) were resized to JPEGs (~150 KB combined); originals remain in the source folder and are not included in the public build.
