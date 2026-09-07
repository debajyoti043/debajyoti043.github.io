/* Shared chrome: header, footer, mobile nav, theme toggle.
   Each page sets `window.SITE_BASE` (path prefix to the project root, e.g. "" or "../")
   before this loads, so links resolve from subfolders like /journal/. */

(function () {
  var BASE = window.SITE_BASE || "";
  var PAGE = document.body.getAttribute("data-page") || "";

  /* The main site is one continuous page: these are in-page sections, not
     separate documents. From a sub-page (the Journal) they need to point back
     at index.html first, so `sectionHref` handles both cases. */
  var SECTIONS = [
    { id: "top",      label: "Home" },
    { id: "about",    label: "About" },
    { id: "research", label: "Research" },
    { id: "cv",       label: "CV" },
    { id: "socials",  label: "Socials" },
    { id: "contact",  label: "Contact" }
  ];
  /* Only the single-page home uses in-page "#section" links and scroll-spy.
     Every other page (cv.html, the Journal) must link back to index.html#id,
     so this is a whitelist rather than "anything that isn't the Journal". */
  var ON_MAIN = PAGE === "home";

  /* ---- Journal visibility ---------------------------------------------
     The Journal is OFFLINE. Its files are not in this site folder at all —
     they are parked at:

         C:\Users\Deb\Claude Code\_journal-offline\journal\

     so the pages cannot be reached even by typing the URL.

     TO PUBLISH IT LATER, two steps:
       1. move that `journal` folder back in beside index.html
       2. set JOURNAL_LIVE below to true                                   */
  var JOURNAL_LIVE = false;

  function sectionHref(id) {
    return ON_MAIN ? "#" + id : BASE + "index.html#" + id;
  }

  /* ---- Social profiles -------------------------------------------------
     Edit a URL here and it updates the footer, the contact page and
     anywhere else the row is rendered. Order below is the display order. */
  /* Professional profiles first — this row is what an academic reader scans.
     Instagram and Facebook stay reachable but sit after the academic links.
     TODO (optional): if you create an ORCID or ResearchGate profile, add it
     here directly after Google Scholar. Do not add a placeholder URL. */
  var SOCIAL = [
    { net: "scholar",   label: "Google Scholar", url: "https://scholar.google.com/citations?user=YbjPVIoAAAAJ&hl=en" },
    { net: "linkedin",  label: "LinkedIn",       url: "https://www.linkedin.com/in/deb-debajyoti" },
    { net: "email",     label: "Email",          url: "mailto:debajyotideb.che.buet@gmail.com" },
    { net: "instagram", label: "Instagram",      url: "https://www.instagram.com/debajyoti_djd/" },
    { net: "facebook",  label: "Facebook",       url: "https://www.facebook.com/debajyotiDJD" }
  ];

  /* Brand glyphs, 24x24 viewBox, single path, filled with currentColor. */
  var ICONS = {
    linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    instagram: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.846-10.405a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z",
    facebook: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    scholar: "M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.29 14.978 9.5 12 9.5c-2.977 0-5.548 1.79-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z",
    email: "M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.236-8 4.882-8-4.882V6.5l8 4.882L20 6.5v1.736z"
  };

  /* Renders the icon row. `labelled` adds the network name beside each glyph. */
  function socialRow(labelled) {
    return '<div class="social-row">' + SOCIAL.map(function (s) {
      var cls = "social-btn" + (labelled ? " labelled" : "");
      var ext = s.net === "email" ? "" : ' target="_blank" rel="noopener"';
      return '<a class="' + cls + '" data-net="' + s.net + '" href="' + s.url + '"' + ext +
             ' aria-label="' + s.label + '" title="' + s.label + '">' +
               '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + ICONS[s.net] + '"/></svg>' +
               (labelled ? '<span>' + s.label + '</span>' : '') +
             '</a>';
    }).join("") + '</div>';
  }
  window.renderSocialRow = socialRow;

  function navItems() {
    var items = SECTIONS.map(function (s) {
      return '<li><a data-section="' + s.id + '" href="' + sectionHref(s.id) + '">' + s.label + "</a></li>";
    });
    /* Shown once the Journal goes live. Also kept visible while actually on a
       Journal page, so those pages still have a working nav if opened directly. */
    if (JOURNAL_LIVE || PAGE === "journal") {
      items.push('<li><a class="journal-link' + (PAGE === "journal" ? " active" : "") +
                 '" href="' + BASE + 'journal/index.html">Journal</a></li>');
    }
    return items.join("");
  }

  var SUN =
    '<svg class="i-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/>' +
    '<path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var MOON =
    '<svg class="i-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg>';

  var headerHtml =
    '<div class="nav">' +
      '<a class="nav-brand" href="' + BASE + 'index.html">' +
        '<span class="brand-avatar"><img src="' + BASE + 'assets/img/favicon-180.png" alt="" /></span>' +
        '<span class="brand-name"><strong>Debajyoti</strong> Deb</span>' +
      '</a>' +
      '<ul class="nav-links" id="nav-links">' + navItems() + '</ul>' +
      '<div class="nav-right">' +
        '<button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">' + SUN + MOON + '</button>' +
        '<button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu" aria-expanded="false"><i></i></button>' +
      '</div>' +
    '</div>';

  var footerHtml =
    '<div class="container footer-inner">' +
      '<div>' +
        '<div class="footer-brand">Debajyoti Deb<span style="color:var(--accent)">.</span></div>' +
        '<p class="dim" style="margin:0;font-size:0.88rem;">Environmental engineering · Louisiana State University</p>' +
        '<p class="dim" style="margin:0.4rem 0 0;font-size:0.82rem;">&copy; <span id="year"></span> — built by hand.</p>' +
      '</div>' +
      '<div>' +
        '<p class="dim" style="margin:0 0 0.75rem;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.1em;font-weight:700;">Elsewhere</p>' +
        socialRow(false) +
      '</div>' +
    '</div>';

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  /* ---- Loading curtain -------------------------------------------------
     Lifts once the window has loaded, with a minimum on-screen time so it
     reads as intentional rather than a flicker on fast loads. The CSS
     carries its own safety dismissal, so this only needs to handle the
     normal path. */
  function liftCurtain() {
    var el = document.getElementById("curtain");
    if (!el) return;
    var MIN_MS = 900;
    var start = window.__curtainStart || Date.now();

    var go = function () {
      var waited = Date.now() - start;
      setTimeout(function () {
        el.classList.add("lift");
        /* stop the element from lingering in the a11y tree */
        setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 700);
      }, Math.max(0, MIN_MS - waited));
    };

    if (document.readyState === "complete") go();
    else window.addEventListener("load", go);
  }

  /* ---- Favicon --------------------------------------------------------
     favicon-180.png / favicon-64.png are pre-masked circles with transparent
     corners (generated from the portrait), so the tab icon reads as a round
     avatar the way it does on the reference site. A square source would show
     as a square no matter what CSS does — the mask has to be baked into the
     file. Falls back to the monogram SVG if the circles are missing. */
  function upgradeFavicon() {
    var small = BASE + "assets/img/favicon-64.png";
    var large = BASE + "assets/img/favicon-180.png";
    var probe = new Image();
    probe.onload = function () {
      if (!probe.naturalWidth) return;
      var links = document.querySelectorAll('link[rel~="icon"], link[rel="apple-touch-icon"]');
      for (var i = 0; i < links.length; i++) links[i].parentNode.removeChild(links[i]);

      [
        { rel: "icon", type: "image/png", sizes: "64x64", href: small },
        { rel: "icon", type: "image/png", sizes: "180x180", href: large },
        { rel: "apple-touch-icon", href: large }
      ].forEach(function (spec) {
        var l = document.createElement("link");
        l.rel = spec.rel;
        if (spec.type) l.type = spec.type;
        if (spec.sizes) l.setAttribute("sizes", spec.sizes);
        l.href = spec.href;
        document.head.appendChild(l);
      });
    };
    probe.src = small;
  }

  ready(function () {
    var h = document.getElementById("site-header");
    var f = document.getElementById("site-footer");
    if (h) h.innerHTML = headerHtml;
    if (f) f.innerHTML = footerHtml;

    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();

    upgradeFavicon();
    liftCurtain();

    /* mobile menu */
    var burger = document.getElementById("nav-toggle");
    var list = document.getElementById("nav-links");
    if (burger && list) {
      burger.addEventListener("click", function () {
        var open = list.classList.toggle("open");
        burger.setAttribute("aria-expanded", open ? "true" : "false");
      });
      list.addEventListener("click", function (e) {
        if (e.target.tagName === "A") {
          list.classList.remove("open");
          burger.setAttribute("aria-expanded", "false");
        }
      });
    }

    /* theme */
    var tt = document.getElementById("theme-toggle");
    if (tt) {
      tt.addEventListener("click", function () {
        var dark = document.documentElement.getAttribute("data-theme") === "dark";
        var next = dark ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        try { localStorage.setItem("theme", next); } catch (e) {}
      });
    }

    /* header border once scrolled */
    if (h) {
      var onScroll = function () {
        h.classList.toggle("stuck", window.scrollY > 8);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    if (ON_MAIN) initScrollSpy();
  });

  /* ---- Scroll spy -------------------------------------------------------
     Highlights the nav item for whichever section is currently being read.

     Deliberately computed from scroll position rather than
     IntersectionObserver: IO reports asynchronously and can stay silent in
     throttled or non-rendering contexts, which leaves the nav stuck on the
     wrong item. A direct measurement is cheap, synchronous and always right.
     A "reading line" a third of the way down the viewport decides the
     current section; the last section whose top has crossed it wins. */
  function initScrollSpy() {
    var links = {};
    var ids = [];
    document.querySelectorAll("#nav-links a[data-section]").forEach(function (a) {
      var id = a.getAttribute("data-section");
      if (document.getElementById(id)) { links[id] = a; ids.push(id); }
    });
    if (!ids.length) return;

    var current = null;
    var queued = false;

    function measure() {
      queued = false;
      var line = window.scrollY + (window.innerHeight * 0.33);
      var pick = ids[0];

      for (var i = 0; i < ids.length; i++) {
        var el = document.getElementById(ids[i]);
        if (el.getBoundingClientRect().top + window.scrollY <= line) pick = ids[i];
      }

      /* At the very bottom, make sure the final section is the active one —
         a short last section may never cross the reading line. */
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        pick = ids[ids.length - 1];
      }

      if (pick === current) return;
      current = pick;
      ids.forEach(function (id) { links[id].classList.toggle("active", id === pick); });
    }

    function onScroll() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
  }

})();
