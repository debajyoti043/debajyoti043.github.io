# Portfolio Website

A plain HTML/CSS/JS multi-page portfolio site with dark/light mode, built for
Debajyoti Deb (PhD student, Environmental Engineering, Louisiana State University).

No build step, no backend, no storage — everything is static files plus a
couple of official third-party embed widgets (Instagram/Facebook, Formspree).

## Structure

```
index.html          Home
about.html           Bio
research.html        Publications (edit assets/js/publications.js)
gallery.html         Instagram/Facebook photo embeds (edit assets/js/gallery-posts.js)
cv.html              CV viewer/download (add assets/cv/CV.pdf)
contact.html         Contact form (Formspree) + direct links
journal/             Separate informal section — stories, opinions, movie reviews
  index.html
  post.html
  posts.js           Edit this to add/remove journal entries
assets/
  css/style.css       Design system + all styling, both themes
  js/main.js          Shared nav/footer + theme toggle
  js/motion.js        Cursor, hover magnification, scroll reveals
  js/publications.js  Your publications list + Google Scholar URL
  js/gallery-posts.js Instagram/Facebook post URLs to embed
  cv/                 Put your CV.pdf here
```

## Design system

Everything is driven by CSS custom properties at the top of `style.css`, defined
once for light and again under `:root[data-theme="dark"]`. Change a token there
and it propagates across every page.

| Token | Role |
| --- | --- |
| `--bg`, `--bg-2` | page and alternating-section backgrounds |
| `--panel`, `--panel-2` | translucent card fills (rest / hover) |
| `--line`, `--line-2` | hairline borders (rest / hover) |
| `--ink`, `--ink-2`, `--ink-3` | primary, secondary, tertiary text |
| `--accent` + `--on-accent` | emerald accent and text that sits on it |
| `--ember` | the Journal's warm counterpoint |
| `--ease` | `cubic-bezier(.16,1,.3,1)` — the slow-out easing used throughout |

**To change the accent colour**, edit `--accent` / `--accent-2` / `--accent-tint`
in *both* the `:root` and `:root[data-theme="dark"]` blocks. Keep an eye on
contrast: every text/background pair currently clears WCAG AA (4.5:1) in both
themes, including the small uppercase labels.

Fonts are Newsreader (display) + DM Sans (body), loaded from Google Fonts with
local serif/sans fallbacks if the network is unavailable.

## Motion

`assets/js/motion.js` adds the interactive layer:

- **Custom cursor** — a dot that tracks tightly plus a ring that lerp-trails
  behind it, swelling into a filled blob over any link, button or field.
  The ring is painted in a *fixed* near-white and composited with
  `mix-blend-mode: difference`, so it inverts whatever is under it rather than
  painting a colour of its own: near-black on the light page, near-white on the
  dark one, and the opposite hue over a coloured button (crimson over the
  emerald button, blue over the Journal's amber). Text under the blob inverts
  too. **Do not swap that fill per theme** — a theme-flipped value cancels
  itself out against its own background and the ring vanishes.
- **Hover magnification** — images scale, cards lift and a pointer-following
  radial glow tracks across them (driven by `--mx` / `--my`).
- **Scroll reveals**, a scroll progress bar, count-up stats, and a subtle 3D
  tilt on the hero portrait.

All of it is opt-out by design: touch devices, screens under 1024px and anyone
with `prefers-reduced-motion` get a clean static page instead. The reveal
animations only engage once JS confirms it is running (`.js-motion` on `<html>`),
with a 2.2s safety net — so content can never end up stranded invisible.

To exempt an element from the cursor's grow effect, or to opt an arbitrary
element *in*, use the `data-cursor` attribute. Add `data-reveal` to any element
to have it fade up on scroll, and `data-magnetic` for a magnetic hover pull.

## Social links

All profile links live in one place: the `SOCIAL` array near the top of
`assets/js/main.js`. Edit a URL there and it updates the footer icon row, the
Contact page, and anywhere else the row is rendered. Each entry needs a `net`
key that matches an icon in the `ICONS` map just below it.

Render the row anywhere with `window.renderSocialRow(labelled)` — pass `true`
for icon + name pills, `false` for bare circular icons.

## Favicon (the icon in the browser tab)

Pages ship with `assets/img/favicon.svg` — a "DD" monogram in the site's
emerald — so the tab is never blank.

**To show your photo there instead:** save a *square* portrait as
`assets/img/portrait.jpg`. That's it. On load, `main.js` probes for that file
and, if it exists, swaps every icon link over to it. No markup to edit. Delete
the file and it falls back to the monogram automatically.

A square crop matters — a rectangular image gets squashed into the tab's square
icon slot. Roughly 400×400 is plenty.

## Things to fill in before you publish

1. **Google Scholar** — open `assets/js/publications.js` and:
   - Set `SCHOLAR_URL` to your real profile URL (`https://scholar.google.com/citations?user=...`)
   - Replace the example `PUBLICATIONS` entries with your real papers (title, authors, venue, year, links)

2. **Photos (Instagram/Facebook)** — open `assets/js/gallery-posts.js` and add permalink
   URLs for the specific posts you want shown. To get one:
   - Instagram: open the post → "..." menu → Embed → copy the URL
   - Facebook: open the post → "..." menu → Embed → copy the URL
   These render live from Instagram/Facebook's own servers — nothing is uploaded here.

3. **CV** — drop your CV as `assets/cv/CV.pdf` (same filename, so no HTML edits needed).

4. **Contact form** — sign up free at [formspree.io](https://formspree.io), create a form,
   and replace `YOUR_FORM_ID` in `contact.html` with your form's ID.

5. **Bio & photo** — edit the placeholder text in `about.html` and `index.html`, and
   swap the placeholder hero photo URL in `index.html` for a real photo (a direct image
   link, e.g. from your LinkedIn or a hosted image).

6. **Social links** — update the LinkedIn/GitHub/Instagram/Facebook URLs in
   `assets/js/main.js` (footer) and `contact.html`.

7. **Journal** — edit `journal/posts.js` to add your own stories/opinions/reviews.
   Each entry needs a unique `slug`, `title`, `date`, `category` (`story` / `view` / `review`),
   `excerpt`, and `contentHtml` (plain HTML, e.g. `<p>...</p>` paragraphs).

## Previewing locally

Just open `index.html` directly in a browser — no server required. (Instagram/Facebook
embeds and the contact form need an internet connection to load their scripts.)

## Deploying with your Namecheap domain

You haven't picked a host yet — a few solid options:

- **GitHub Pages (free)**: push this folder to a GitHub repo, enable Pages in repo
  settings, then in Namecheap DNS add a `CNAME` record pointing your domain (or `www`)
  at `yourusername.github.io`, plus the GitHub `A` records for the apex domain.
- **Netlify / Vercel (free)**: drag-and-drop deploy or connect a git repo; both give
  you a custom-domain setup wizard that tells you exactly which DNS records to add
  in Namecheap.
- **Namecheap hosting**: if you bought a hosting plan (not just the domain), upload
  this folder via FTP or the cPanel File Manager to your `public_html` directory.

Ask me when you're ready to deploy and I'll walk you through whichever one you pick.
