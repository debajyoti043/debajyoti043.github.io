/* Renders the data-driven blocks on the single-page site:
   publications, the gallery platform sections, and the contact icon row.
   Each block is optional — if its container isn't on the page, it's skipped. */

(function () {
  "use strict";

  var BRAND = {
    instagram: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.846-10.405a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z",
    facebook: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
  };
  /* Flat brand colours. Instagram's mark is a gradient, so it gets one
     defined per-instance below (ids must be unique or the first wins). */
  var BRAND_COLOR = { facebook: "#1877F2", linkedin: "#0A66C2" };
  var gradSeq = 0;

  /* `brand: true` paints the glyph in the platform's own colours;
     otherwise it inherits currentColor. */
  function svg(net, brand) {
    if (!brand) {
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + BRAND[net] + '"/></svg>';
    }
    if (net === "instagram") {
      var id = "ig-grad-" + (++gradSeq);
      return '<svg viewBox="0 0 24 24" aria-hidden="true">' +
               '<defs><radialGradient id="' + id + '" cx="30%" cy="107%" r="150%">' +
                 '<stop offset="0%"  stop-color="#FDF497"/>' +
                 '<stop offset="5%"  stop-color="#FDF497"/>' +
                 '<stop offset="45%" stop-color="#FD5949"/>' +
                 '<stop offset="60%" stop-color="#D6249F"/>' +
                 '<stop offset="90%" stop-color="#285AEB"/>' +
               '</radialGradient></defs>' +
               '<path fill="url(#' + id + ')" d="' + BRAND[net] + '"/>' +
             '</svg>';
    }
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' +
             '<path fill="' + (BRAND_COLOR[net] || "currentColor") + '" d="' + BRAND[net] + '"/>' +
           '</svg>';
  }

  /* ---------------- Publications ---------------- */
  function renderPublications() {
    var list = document.getElementById("pub-list");
    if (!list || typeof PUBLICATIONS === "undefined") return;

    var link = document.getElementById("scholar-link");
    if (link && typeof SCHOLAR_URL !== "undefined") link.href = SCHOLAR_URL;

    if (!PUBLICATIONS.length) {
      list.innerHTML = '<p class="dim" style="padding:1.5rem;">No publications added yet — edit <code>assets/js/publications.js</code>.</p>';
      return;
    }
    list.innerHTML = PUBLICATIONS.map(function (p, i) {
      var n = String(PUBLICATIONS.length - i);
      if (n.length < 2) n = "0" + n;
      var links = (p.links || []).map(function (l) {
        return '<a class="arrow-link" href="' + l.url + '" target="_blank" rel="noopener">' +
               l.label + ' <span aria-hidden="true">→</span></a>';
      }).join("");
      return '<article class="pub">' +
               '<div class="pub-index">' + n + '</div>' +
               '<div>' +
                 '<div class="pub-title">' + p.title + '</div>' +
                 '<div class="pub-meta">' + p.authors + ' · ' + p.venue + ' · ' + p.year + '</div>' +
                 '<div class="pub-links">' + links + '</div>' +
               '</div>' +
             '</article>';
    }).join("");
  }

  /* ---------------- Gallery ---------------- */
  function renderGallery() {
    var host = document.getElementById("gallery-sections");
    if (!host || typeof GALLERY_PROFILES === "undefined") return;

    var BASE = window.SITE_BASE || "";
    var FALLBACK = BASE + "assets/img/favicon-180.png";

    /* The card leads with his profile photo *for that network* — each account
       uses a different picture. If the file hasn't been added yet the onerror
       swap quietly falls back to the site portrait, so a missing file never
       renders as a broken image. */
    function linkCard(net, label, note) {
      var p = GALLERY_PROFILES[net];
      var src = p.avatar ? BASE + "assets/img/social/" + p.avatar : FALLBACK;
      var img = '<img src="' + src + '" alt="" ' +
                'onerror="this.onerror=null;this.src=\'' + FALLBACK + '\';" />';
      return '<a class="gallery-link-card" href="' + p.url + '" target="_blank" rel="noopener">' +
               '<span class="glc-avatar">' + img +
                 '<span class="glc-badge" data-net="' + net + '">' + svg(net, true) + '</span>' +
               '</span>' +
               '<strong>' + label + '</strong>' +
               '<span class="glc-handle">' + p.handle + '</span>' +
               '<span>' + note + '</span>' +
             '</a>';
    }

    /* An embed section, rendered only for a platform that actually has posts. */
    function embedSection(net, title, posts, buildEmbed) {
      var p = GALLERY_PROFILES[net];
      return '<div class="gallery-section" data-reveal>' +
               '<div class="gallery-head">' +
                 '<h3>' + svg(net, true) + title + '</h3>' +
                 '<a class="handle" href="' + p.url + '" target="_blank" rel="noopener">' + p.handle + ' ↗</a>' +
               '</div>' +
               '<div class="gallery-grid">' + posts.map(buildEmbed).join("") + '</div>' +
             '</div>';
    }

    var ig = typeof INSTAGRAM_POSTS !== "undefined" ? INSTAGRAM_POSTS : [];
    var fb = typeof FACEBOOK_POSTS !== "undefined" ? FACEBOOK_POSTS : [];
    var own = typeof PHOTOS !== "undefined" ? PHOTOS : [];

    /* His own image files, if any. Shown first — they're the fastest to load
       and don't depend on any third party. Lazy-loaded so a long gallery
       doesn't stall the page. */
    var ownHtml = "";
    if (own.length) {
      ownHtml =
        '<div class="gallery-section" data-reveal>' +
          '<div class="gallery-head"><h3>Photographs</h3>' +
            '<span class="handle">' + own.length + (own.length === 1 ? " photo" : " photos") + '</span>' +
          '</div>' +
          '<div class="gallery-grid">' +
            own.map(function (p) {
              var src = (window.SITE_BASE || "") + "assets/img/gallery/" + p.src;
              return '<figure class="photo-card">' +
                       '<img src="' + src + '" alt="' + (p.caption || "") + '" loading="lazy" />' +
                       (p.caption ? '<figcaption>' + p.caption + '</figcaption>' : '') +
                     '</figure>';
            }).join("") +
          '</div>' +
        '</div>';
    }

    /* The three profiles sit side by side in a single row. Previously each
       network got its own full-width section holding one card, which left the
       area looking mostly empty. */
    var profilesHtml =
      '<div class="profile-row" data-reveal>' +
        linkCard("instagram", "Instagram", "Photos and everyday things.") +
        linkCard("facebook",  "Facebook",  "Albums, family and friends.") +
        linkCard("linkedin",  "LinkedIn",  "Research updates and professional news.") +
      '</div>';

    /* Embed sections appear underneath, and only for a platform that has
       posts added. LinkedIn has no public photo-embed widget, so it never
       gets one. */
    var embedsHtml = "";
    if (ig.length) {
      embedsHtml += embedSection("instagram", "Instagram", ig, function (url) {
        return '<div class="embed-slot"><blockquote class="instagram-media" ' +
               'data-instgrm-permalink="' + url + '" data-instgrm-version="14" ' +
               'style="margin:0;width:100%;border:0;"></blockquote></div>';
      });
    }
    if (fb.length) {
      embedsHtml += embedSection("facebook", "Facebook", fb, function (url) {
        return '<div class="embed-slot"><div class="fb-post" data-href="' + url + '" data-width="500"></div></div>';
      });
    }

    host.innerHTML = ownHtml + profilesHtml + embedsHtml;

    /* Only pull in a platform's SDK when there is something for it to render. */
    if (ig.length) {
      var s = document.createElement("script");
      s.async = true;
      s.src = "https://www.instagram.com/embed.js";
      s.onload = function () { if (window.instgrm) window.instgrm.Embeds.process(); };
      document.body.appendChild(s);
    }
    if (fb.length) {
      if (!document.getElementById("fb-root")) {
        var r = document.createElement("div");
        r.id = "fb-root";
        document.body.appendChild(r);
      }
      var f = document.createElement("script");
      f.async = true; f.defer = true; f.crossOrigin = "anonymous";
      f.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0";
      f.onload = function () { if (window.FB) window.FB.XFBML.parse(); };
      document.body.appendChild(f);
    }
  }

  /* ---------------- Contact socials ---------------- */
  function renderContactSocials() {
    var el = document.getElementById("contact-socials");
    if (el && window.renderSocialRow) el.innerHTML = window.renderSocialRow(true);
  }

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    [renderPublications, renderGallery, renderContactSocials].forEach(function (fn) {
      try { fn(); } catch (e) { if (window.console) console.warn("sections:", fn.name, e); }
    });
  });
})();
