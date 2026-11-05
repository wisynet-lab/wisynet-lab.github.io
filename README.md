# WiSyNet — Wireless System Networks

A complete, English-language laboratory website for GitHub Pages, using a white background with **Azzurro DEIB `#8DB9CD`**, **Blue Heritage Politecnico `#102c53`**, and **Azzurro di Accent `#2942db`**.

## Second iteration — November 2026

This edition increases the typography throughout, adds navy sections with light text and pale-blue panels, and makes the gallery the full-width feature at the top of the homepage. The welcome text sits below it. Photos stay upright and slide forward/back through depth; the central image faces the viewer flat, with a slim frame and readable captions beneath the stage.

Animations use CSS transforms/opacity and a one-time intersection observer. There is no animation library or continuous scroll/render loop. Reduced-motion preferences disable the animations. Existing content files, navigation, filters and future booking configuration still work.

To update an already published first version, replace the website files with the contents of this package. If you have edited content since downloading the first version, retain your `content/` files and custom images, copy in the updated `scripts/` and `assets/css/` / `assets/js/` folders, then run `npm run build` before uploading the generated HTML.

## Publish in a few minutes

1. Unzip this project.
2. Create a GitHub repository, such as `wisynet-lab`.
3. Upload **the contents of the `wisynet-lab` folder** into the repository root. `index.html` must be at the root, not inside another folder. Preserve the `assets`, `content`, `scripts` and `docs` folders. Include `.nojekyll` (a hidden file); if the upload interface omits it, create an empty `.nojekyll` file on GitHub.
4. Open **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**, then **main** and **/ (root)**. Save.
5. Your project website will be available at `https://YOUR-USERNAME.github.io/wisynet-lab/`. A repository named `YOUR-USERNAME.github.io` instead publishes at `https://YOUR-USERNAME.github.io/`.

All HTML is already built. **No package installation, framework, server, API key or build step is required to publish the supplied files.** The initial upload includes all images and fonts; no third-party CDN is needed at runtime.

Reference: [GitHub Pages quickstart](https://docs.github.com/en/pages/quickstart). Publishing may take a few minutes.

## Preview locally

Open `index.html` in a browser. For a more realistic preview, run this from the project folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`. Windows installations may use `py -m http.server 8000`.

## What's included

| Page | Features |
| --- | --- |
| Home | Welcome, full-width cinematic postcard gallery, research themes, RESTART acknowledgement, news and contact |
| Group | PI biography and DEIB portrait, individual member cards, circular portraits |
| Publications | Verified selected arXiv records, search, year/type filters, PDF links and expandable BibTeX |
| Teaching | Clearly labelled sample courses, expandable course details, student contact |
| News | Verified RESTART news and labelled sample stories, category filters |
| Instruments | Sourced capability categories, search and filters, configurable external booking links |
| Sources & credits | Source links, image credits, distinction between verified and placeholder content |

The site has responsive layouts, keyboard controls, visible focus indicators, a skip link, reduced-motion support, a mobile menu and no-JavaScript fallbacks. The slideshow starts paused; the visitor can play it. It pauses on interaction or when the tab is hidden.

## Edit content

For maintainable edits, change the appropriate JSON file, then run the small dependency-free builder using **Node.js 20 or newer**:

```bash
npm run build
npm run check
```

You do **not** need to run `npm install`. Commit/upload the changed content and generated HTML together. The browser displays the generated HTML, so editing JSON without rebuilding will not update the live pages. You can edit HTML directly for a quick change, but a later rebuild will overwrite that edit.

| File | What to change |
| --- | --- |
| `content/site.json` | Name, navigation, contact email, funding/institution links, year, booking configuration and optional public URL |
| `content/home.json` | Welcome copy, research cards and carousel images/captions |
| `content/group.json` | Member names, roles, bios, photos and links; first member is the featured PI |
| `content/publications.json` | Publications, links, types, years and BibTeX |
| `content/teaching.json` | Courses and descriptions |
| `content/news.json` | News stories; dates use `YYYY-MM-DD`; put newest entries first |
| `content/instruments.json` | Capabilities, instrument metadata and per-instrument booking URLs |
| `assets/css/styles.css` | Appearance; the three brand colors are CSS variables at the top |
| `scripts/lib/layout.mjs` | Shared header, navigation, metadata and footer |
| `scripts/pages/` | Independent page templates |

If setting `site.url`, use the full deployment address including the repository path, such as `https://example.github.io/wisynet-lab/`. Rebuild to add correct canonical and Open Graph URLs. It is deliberately blank initially, because your GitHub account and repository are not yet known.

## Add your photographs

1. Copy images into `assets/images/`, for example `lab-bench.jpg`, `group-day.jpg` and `antenna-test.jpg`.
2. Edit the `gallery` array in `content/home.json`:

```json
{
  "src": "assets/images/lab-bench.jpg",
  "alt": "A clear description of what this photograph shows",
  "caption": "A new experiment takes shape",
  "label": "01 / LAB LIFE",
  "credit": "Photo: Your photographer",
  "fit": "contain",
  "position": "50% 50%"
}
```

3. Rebuild and upload the new images and generated HTML.

**Different image proportions and resolutions work together.** `contain` (the default) displays the full image without distortion or cropping within the postcard. Portrait and panoramic images have breathing room around them. Choose `cover` only if you want the frame filled by cropping; `position` selects the crop's focal point. Recommended: JPEG/WebP photos around 1600 px on the longest edge, under 500 KB when practical. PNG and SVG also work. Files are referenced locally; there is no browser upload/admin service on GitHub Pages.

The gallery uses a flat, upright central photo and smaller photos sliding behind it. It supports one image or many, with click-to-focus, previous/next, dots, left/right/Home/End keys, touch swipe and optional playback. For the three supplied photos, each surrounding card can be clicked to move forward. For larger collections, arrows and dots reach all images.

## Add a member

Copy a member object in `content/group.json`. Use a unique `id`, set `placeholder` to `false`, fill in the bio and links, and point `image` to a portrait in `assets/images/`. The CSS crops the portrait into a circle. Prefer a square image with the face near the centre. Remove unused optional `email`, `profile`, or `website` fields. Replace the sample profiles rather than presenting them as real people.

## Add another section

1. Add a navigation entry to `content/site.json`, for example `{ "id": "projects", "label": "Projects", "file": "projects.html" }`.
2. Create `scripts/pages/projects.mjs`:

```js
import {pageIntro} from '../lib/components.mjs';
export default () => `${pageIntro('OUR PROJECTS', 'Ideas in progress.', 'Explore our research projects.')}
  <section class="container section-content"><p>Project descriptions go here.</p></section>`;
```

3. Run `npm run build`. The page automatically gets the shared header, footer, active navigation and mobile menu.

For a separate `content/projects.json`, add `projects` to the content-name array in `scripts/build.mjs`; your renderer will then receive `{projects}`. Keep HTML output files in the root so relative paths work at both GitHub project paths and custom domains.

## Instrument booking later

The public directory is **not a live inventory**, and no booking is submitted by this starter. Exact models, individual assets, availability and access policies remain to be supplied.

For a Google Form or other external request form, update `content/site.json`:

```json
"booking": {
  "mode": "external",
  "url": "https://docs.google.com/forms/d/e/YOUR-FORM-ID/viewform",
  "label": "Request instrument access"
}
```

Replace the example with your actual form URL, then rebuild. Each instrument can override the global destination using its own `bookingUrl`, including a Google Form prefilled link. With `mode: "disabled"` and empty per-instrument URLs, cards display “Booking information coming soon”. The lab contact link remains available.

For Snipe-IT, each instrument has an optional `assetId`. The site can link to an authenticated portal using `bookingUrl`; the portal handles access. A later read-only inventory export can populate the public JSON. **Do not put Snipe-IT API tokens, private asset data, credentials or reservation records in this public repository.** Any authenticated API integration needs a server/service outside GitHub Pages, or a secured export process. The architecture is described in [docs/INTEGRATIONS.md](docs/INTEGRATIONS.md).

## Source decisions and placeholders

Verified information includes the PI's DEIB biography/portrait, department contact and footer information, RESTART research scope, two linked arXiv records and one RESTART event report. Other bios, courses and sample entries are labelled. The carousel uses local stock photos, not photos of WiSyNet.

The owner's requested expansion **Wireless System Networks** is used as the website title. RESTART's directory uses **Wireless System and Network Technologies**; this difference is documented on the sources page. The PI designation comes from the owner; the DEIB profile independently verifies the academic biography.

Before public launch, replace the visible sample cards/images as desired, confirm the lab-specific contact and access details, and add any grant-specific wording/logos required by your RESTART agreement. No grant identifier or exact funding amount has been invented. The institutional privacy links are explicitly labelled as DEIB links; the sources page describes this website's own technical behaviour.

See [docs/SOURCES.md](docs/SOURCES.md) for provenance and [docs/ASSETS.md](docs/ASSETS.md) for asset locations and rights information.
