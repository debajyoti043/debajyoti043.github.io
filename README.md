# debajyotideb.com — the whole site, and how to change it

This is the complete source of the website. It is **plain HTML, CSS and
JavaScript** — no build step, no server, no database, no npm. Every file here
is a file you can open in Notepad, edit, and save. That is deliberate: it means
the site can never "break" in a way that requires starting over, and you will
never need a tool you don't have.

**You never have to start over.** Everything is in this one folder. Copy the
folder anywhere and it still works.

---

## The short version

| I want to…                          | Open this file                    |
|-------------------------------------|-----------------------------------|
| Change any words on the page        | `index.html`                      |
| Add a publication                   | `index.html` (3 places — see below) |
| Change colours, spacing, fonts      | `assets/css/style.css`            |
| Change social links / profile pics  | `assets/js/gallery-posts.js`      |
| Replace the CV                      | `assets/cv/` (see below)          |
| Turn the Journal back on            | `assets/js/main.js` (see below)   |
| Back everything up                  | `backup-to-google-drive.bat`      |

---

## What the site is

**One single continuous page.** Visitors scroll from top to bottom; the nav at
the top jumps them to a section rather than loading a new page. The sections,
in order, are:

| Section id  | What it is                                                   |
|-------------|--------------------------------------------------------------|
| `#top`      | Hero — portrait, name, one-line intro                        |
| *(stats)*   | Three cards: at LSU since 2023, BUET, LSU                    |
| `#about`    | Bio, research interests, "beyond the lab"                    |
| `#research` | Publications list + Google Scholar link                      |
| `#cv`       | Full CV, readable on the page, plus "View CV as PDF"         |
| `#socials`  | Instagram / Facebook / LinkedIn link-out cards, side by side |
| `#contact`  | Contact form + direct links                                  |

---

## Every file, and what it does

```
index.html                  THE HOME PAGE. All visible text lives here.
                            Sections are marked with <section id="about"> etc.
cv.html                     The full CV — education, research, skills,
                            coursework, industry, earlier research, teaching.
                            The home page shows only a short "Selected
                            experience"; the complete record is here.

assets/
  css/
    style.css               All styling, both light and dark themes.
                            Colours are CSS variables near the top — change a
                            variable once and it updates everywhere.
  js/
    main.js                 Header, footer, nav, light/dark toggle, the loading
                            curtain, and the scroll-spy that highlights the nav
                            as you scroll. Also holds the JOURNAL_LIVE switch.
    motion.js               The trailing cursor, hover magnification, and the
                            fade-in-on-scroll reveals.
    sections.js             Draws the publications list, the Socials cards and
                            the contact icons from the data files below.
    publications.js         YOUR PUBLICATIONS. Add or edit entries here.
    gallery-posts.js        Your social profile links, handles and which
                            profile photo each one uses.
  cv/
    CV.tex                  LaTeX source of the CV (edit in Overleaf).
    Debajyoti-Deb-CV.pdf    The compiled PDF the site links to. Opens in a new
                            tab titled "Debajyoti Deb CV"; the browser's own
                            viewer gives visitors the download button.
  img/
    portrait.png            Hero photo and default social avatar.
    buet-logo.png           BUET logo (stats card).
    lsu-logo.svg            LSU logo (stats card).
    favicon.svg             Circular browser-tab icon.
    favicon-64.png          Fallback tab icons for older browsers.
    favicon-180.png
    og-image.png            1200x630 preview card shown when the site is
                            shared on LinkedIn, X, Facebook, Slack, iMessage.
    social/
      instagram.jpg         Your Instagram profile photo (400x400).
      facebook.jpg          Your Facebook profile photo (400x400).
      originals/            Untouched copies of what you uploaded, in case a
                            crop needs redoing.
      README.txt            How to replace these photos.
    gallery/
      README.txt            Where to drop photos if you ever host your own.

robots.txt                  Tells crawlers what they may read. Everything is
                            allowed, and the AI crawlers are named explicitly.
sitemap.xml                 Lists the page and the CV PDF for search engines.
llms.txt                    A plain-text summary of who you are and what you
                            work on, written for AI answer engines to quote.
CNAME                       Tells GitHub to serve debajyotideb.com. DO NOT
                            DELETE — the domain stops working without it.
backup-to-google-drive.bat  Double-click to back up to your Google Drive.
make-backup-zip.ps1         Helper used by the .bat above.
.claude/launch.json         Config for previewing the site locally.
.gitignore                  Files git should ignore.
.git/                       Version history — every saved version of the site.
README.md                   This file.
```

The Journal is **offline** and its files are parked outside this folder at:

```
C:\Users\Deb\Claude Code\_journal-offline\journal\
```

---

## How to make the most common changes

### Change text on the page

Open `index.html` in Notepad (or any editor), use Ctrl+F to find the sentence
you want to change, type over it, save, refresh the browser. That is the whole
process. Text sits between tags like `<p>` and `</p>` — change the words, leave
the tags alone.

### Add a publication

Publications used to be drawn by JavaScript. They are now written directly
into `index.html` as plain HTML, because search engines and AI crawlers do not
run JavaScript and were seeing an empty box where your papers should be.

That means a new paper goes in **three places**. All three are in
`index.html`, and each one is right next to an existing example to copy:

1. **The visible list** — find `id="pub-list"`, copy an `<article class="pub">`
   block, paste it at the top, edit the fields, and renumber the
   `pub-index` values so the newest paper has the highest number.
2. **The structured data** — in `<head>`, find the JSON-LD block and copy a
   `"@type": "ScholarlyArticle"` entry. This is what Google, ChatGPT, Claude,
   Gemini and Perplexity actually read.
3. **`llms.txt`** in the site root — add it to the Publications list there.

`assets/js/publications.js` is now only a fallback and a machine-readable
record. Editing it alone will **not** change the site.

### Change a social link or profile photo

Open `assets/js/gallery-posts.js`. `GALLERY_PROFILES` holds the URL, handle and
photo filename for each network. To swap a photo, drop a square image into
`assets/img/social/` and put its filename there. If a photo is missing, the
site falls back to your portrait automatically — it will not break.

### Replace the CV

1. Edit `assets/cv/CV.tex` in Overleaf (upload it, or paste it in).
2. Download the compiled PDF.
3. Rename it to exactly `Debajyoti-Deb-CV.pdf` and drop it into `assets/cv/`,
   replacing the old one.
4. Update the matching text inside the `#cv` section of `index.html` so the
   on-page CV and the PDF say the same thing.

Keep the `\hypersetup{pdftitle={Debajyoti Deb CV}...}` line in the .tex — that
is what makes the browser tab say "Debajyoti Deb CV".

### Turn the Journal back on

1. Move the `journal` folder from `C:\Users\Deb\Claude Code\_journal-offline\`
   back into this folder, beside `index.html`.
2. Open `assets/js/main.js` and change `var JOURNAL_LIVE = false;` to
   `var JOURNAL_LIVE = true;`

The Journal link reappears in the nav. Add entries in `journal/posts.js`.

### Change colours

Open `assets/css/style.css`. The top of the file is a block of CSS variables
(`--ink`, `--paper`, `--ember`, and so on) for the light theme, followed by the
dark theme's overrides. Change a value there and it applies across the whole
site. If you change one, check the text still reads clearly in **both** themes.

---

## Previewing changes before they go live

The site is static, so you can just double-click `index.html` — but a few
things behave better over a real server. To run one locally, use the preview
config in `.claude/launch.json`, or run this in PowerShell from inside this
folder and then open <http://localhost:8081>:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -Command "$l=[Net.HttpListener]::new();$l.Prefixes.Add('http://localhost:8081/');$l.Start();while($l.IsListening){$c=$l.GetContext();$p=[Uri]::UnescapeDataString($c.Request.Url.AbsolutePath).TrimStart('/');if($p -eq ''){$p='index.html'};$f=Join-Path (Get-Location) $p;if(Test-Path -LiteralPath $f -PathType Leaf){$b=[IO.File]::ReadAllBytes($f);$c.Response.OutputStream.Write($b,0,$b.Length)}else{$c.Response.StatusCode=404};$c.Response.Close()}"
```

---

## The site is LIVE at debajyotideb.com

It is hosted free on **GitHub Pages** from this repository:
<https://github.com/debajyoti043/debajyoti043.github.io>

Publishing and backing up are now **the same action**. When you push to GitHub,
GitHub rebuilds debajyotideb.com about a minute later, and your code is safely
off this computer at the same time.

### To publish a change

Edit whatever you want, then run `auto-publish.ps1` (right-click > Run with
PowerShell). It saves your changes, pushes them to GitHub, and the live site
updates itself. If nothing changed it does nothing.

### Automatic publishing — ALREADY SET UP

**This is done. You do not need to do anything.**

A shortcut sits in your Windows Startup folder:

```
C:\Users\Deb\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\
    Publish debajyotideb.com.lnk
```

Every time you log in to Windows it runs `auto-publish.ps1` in a hidden window.
If you changed something, it is committed, pushed, and live on
debajyotideb.com about a minute later. If you changed nothing, it does nothing
and exits. **No Google Drive, no background app, no memory used** — it runs for
a second at login and stops.

A Windows *Scheduled Task* would also have added a 9 PM daily run, but creating
one on this PC requires Administrator rights. The Startup shortcut needs none
and covers the same need, since you log in most days.

**To turn it off:** press `Win+R`, type `shell:startup`, press Enter, and delete
`Publish debajyotideb.com.lnk`. That is the whole removal process.

**To publish right now** without waiting for a login, right-click
`auto-publish.ps1` and choose *Run with PowerShell*.

**One caveat worth knowing:** with the task registered, any change you save gets
published automatically. That is the point, but it does mean a half-finished
edit can go live. If you are mid-experiment, either unregister the task or make
your changes and check them locally first.

Every run is logged to `auto-publish.log` next to this file.

### How the domain is wired

Namecheap holds `debajyotideb.com`. Its DNS points at GitHub:

```
A      @      185.199.108.153
A      @      185.199.109.153
A      @      185.199.110.153
A      @      185.199.111.153
CNAME  www    debajyoti043.github.io.
```

The `CNAME` file in this folder tells GitHub which domain to answer on. **Do
not delete it** — without it, GitHub stops serving debajyotideb.com.

---

## Being found — by Google and by AI

The site is set up to be discovered both by traditional search engines (SEO)
and by AI systems that answer questions — ChatGPT, Claude, Gemini, Perplexity,
Google's AI Overviews (this is what people mean by GEO, AEO or LLMO).

**The single most important thing that changed:** your publications are now
plain HTML instead of being drawn by JavaScript. AI crawlers do not run
JavaScript, so before this they saw an empty box where your two papers should
be — the most citable thing on the whole site was invisible to them.

What is in place:

| Thing | Where | What it does |
|---|---|---|
| Structured data | JSON-LD in `<head>` | States as machine-readable fact who you are, where you work, what you study, and both papers with their DOIs. This is what AI systems read to decide what is true about you. |
| `robots.txt` | site root | Explicitly welcomes GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot and others. |
| `llms.txt` | site root | A clean plain-text summary written to be quoted by AI answer engines, including a note asking them not to overstate your lab skills. |
| `sitemap.xml` | site root | Points search engines at the page and the CV PDF. |
| Canonical + Open Graph | `<head>` | One official URL, and a proper preview card when the link is shared. |

**Keeping it working:** when you change a fact on the page — a new job title,
a new paper, a new institution — change it in the JSON-LD block and in
`llms.txt` too. If those three disagree, machines trust the structured data,
and you end up with AI systems confidently saying something out of date.

**Worth doing once, by hand (both free, both need your login):**

- **Google Search Console** — <https://search.google.com/search-console>. Add
  `debajyotideb.com`, verify it, and submit `sitemap.xml`. This is how you get
  indexed quickly instead of waiting, and how you see what people searched to
  find you.
- **Bing Webmaster Tools** — <https://www.bing.com/webmasters>. Same idea, and
  it feeds ChatGPT's search results.

**Also worth doing:** put `debajyotideb.com` on your Google Scholar profile,
your LinkedIn, and in your email signature. Search engines and AI systems both
weigh links from places that already know who you are, and Scholar and
LinkedIn are the two strongest signals you have.

---

## Backups — this is the whole safety net

**`backup-to-google-drive.bat`** — double-click it. That's the whole routine.

**Google Drive does not need to be running, and must NOT be set to start with
Windows.** The script handles it:

1. If Drive is already running, it just uses it and leaves it running.
2. If Drive is closed, it starts Drive itself (takes about 8 seconds), copies
   the files, waits 45 seconds for the upload, then **closes Drive again**.

So Drive uses zero memory except during the backup. That is deliberate — the
app sits at ~135 MB when resident, which is not worth paying for something used
once a session.

Everything lands in `My Drive\Website-Backup\`, holding `Portfolio website` and
`_journal-offline`. Check it at drive.google.com any time.

If Drive can't be reached at all, the script falls back to building a dated
`.zip` on the Desktop and opening drive.google.com so you can drag it in.

Run it after any session where you changed something.

If the upload hasn't finished when Drive closes, nothing is lost — the files
sit in Drive's local cache and finish uploading the next time it starts.

Every saved version is also kept in the hidden `.git` folder inside this
directory, and that folder is included in the backup — so a restored backup
brings the full history with it.

---

## Still to do

- **Turn on HTTPS.** GitHub issues the certificate automatically within about
  an hour of the domain going live. Once it has, go to the repo's
  **Settings > Pages** and tick **Enforce HTTPS**, so the site is served over
  `https://` instead of `http://`. This is a one-time click.
- **Register the auto-publish task** so you never have to remember to publish.
  Open PowerShell **as Administrator** and paste the command in the section
  above. Skip it if you would rather publish by hand.
- **Contact form**: the contact section currently shows a direct "Send me an
  email" button, which always works. If you want a real form instead, sign up
  free at [formspree.io](https://formspree.io) and follow the instructions in
  the comment inside the `#contact` section of `index.html`.
- **BUET dates**: the site says "2018–2020" for the research assistant role.
  The Overleaf CV says May 2018 – Mar 2020; LinkedIn says Apr 2018 – Dec 2019.
  Pick whichever is right and make `index.html` and `CV.tex` agree.

---

## A note on what is deliberately *not* in the CV

The public CV leaves out the mobile number, named referees with their phone
numbers and addresses, undergraduate CGPA, and GRE/IELTS scores. That is
intentional — this document sits on the open internet. If an employer asks for
those, send a separate private copy rather than adding them here.
