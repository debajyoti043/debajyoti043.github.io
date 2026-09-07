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
| Add a publication                   | `assets/js/publications.js`       |
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
index.html                  THE WHOLE PAGE. All visible text lives here.
                            Sections are marked with <section id="about"> etc.

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
    social/
      instagram.jpg         Your Instagram profile photo (400x400).
      facebook.jpg          Your Facebook profile photo (400x400).
      originals/            Untouched copies of what you uploaded, in case a
                            crop needs redoing.
      README.txt            How to replace these photos.
    gallery/
      README.txt            Where to drop photos if you ever host your own.

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

Open `assets/js/publications.js`. Copy an existing block, paste it above the
others, and change the fields. The file has comments showing what each field
is.

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

## Backups — this is the whole safety net

**`backup-to-google-drive.bat`** — double-click it.

- If **Google Drive for Desktop** is installed, it copies the site and the
  offline Journal into `My Drive\Website-Backup\` and Drive syncs it to the
  cloud. This is the version worth having: one double-click, done.
- If it is **not** installed, it builds a dated `.zip` on your Desktop and
  opens drive.google.com so you can drag the zip in.

Run it after any session where you changed something.

Every saved version is also kept in the hidden `.git` folder inside this
directory, and that folder is included in the backup — so a restored backup
brings the full history with it.

---

## Still to do

- **Contact form**: `index.html` still contains the placeholder `YOUR_FORM_ID`.
  Sign up free at [formspree.io](https://formspree.io), create a form, and
  replace `YOUR_FORM_ID` with the id it gives you. Until then the form will not
  deliver mail.
- **BUET dates**: the site says "2018–2020" for the research assistant role.
  The Overleaf CV says May 2018 – Mar 2020; LinkedIn says Apr 2018 – Dec 2019.
  Pick whichever is right and make `index.html` and `CV.tex` agree.
- **Going live**: the domain `debajyotideb.com` is registered at Namecheap but
  the site is not published yet. Any static host works — Namecheap hosting,
  GitHub Pages (free), Netlify (free) — because there is nothing to run server
  side. Upload the contents of this folder and point the domain at it.

---

## A note on what is deliberately *not* in the CV

The public CV leaves out the mobile number, named referees with their phone
numbers and addresses, undergraduate CGPA, and GRE/IELTS scores. That is
intentional — this document sits on the open internet. If an employer asks for
those, send a separate private copy rather than adding them here.
