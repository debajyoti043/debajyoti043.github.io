/* Motion layer: trailing cursor, hover magnification, pointer-follow card glow,
   scroll reveals, progress bar, count-ups, portrait tilt.
   Every effect is opt-out: coarse pointers, narrow screens and
   prefers-reduced-motion all fall back to a plain static page. */

(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Evaluated lazily — at parse time the viewport may not be measurable yet. */
  var fine = false;
  function measure() {
    fine = window.matchMedia("(pointer: fine)").matches && window.innerWidth > 1024;
  }

  /* Signals to CSS that JS is driving the reveals. Without this class the
     content renders plainly visible, so a JS failure can never leave the
     page blank. Set immediately, before first paint. */
  document.documentElement.classList.add("js-motion");

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  var lerp = function (a, b, n) { return a + (b - a) * n; };

  /* ------------------------------------------------------------------
     1. Cursor — a dot that tracks tightly and a ring that lags behind,
        swelling into a filled blob over anything interactive.
     ------------------------------------------------------------------ */
  function initCursor() {
    if (!fine || reduced) return;

    var dot = document.createElement("div");
    var ring = document.createElement("div");
    dot.id = "cursor-dot";
    ring.id = "cursor-ring";
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    var mx = window.innerWidth / 2, my = window.innerHeight / 2;
    var dx = mx, dy = my, rx = mx, ry = my;
    var live = false;

    window.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      if (!live) { live = true; document.body.classList.add("cursor-live"); }
    }, { passive: true });

    document.addEventListener("mouseleave", function () {
      document.body.classList.remove("cursor-live");
      live = false;
    });

    (function frame() {
      /* Follow rates, per frame. Higher = snappier, lower = more trail.
         The ring is the visible "lag"; below ~0.15 it reads as sluggish
         and can strand itself across the page on fast movements. */
      dx = lerp(dx, mx, 0.65);  // dot: near-instant
      dy = lerp(dy, my, 0.65);
      rx = lerp(rx, mx, 0.30);  // ring: trails, but keeps up
      ry = lerp(ry, my, 0.30);
      dot.style.transform  = "translate3d(" + dx + "px," + dy + "px,0) translate(-50%,-50%)";
      ring.style.transform = "translate3d(" + rx + "px," + ry + "px,0) translate(-50%,-50%)";
      requestAnimationFrame(frame);
    })();

    /* grow over interactive targets — delegated so it covers injected markup */
    var SEL = "a, button, input, textarea, select, summary, [data-cursor]";
    document.addEventListener("mouseover", function (e) {
      if (e.target.closest && e.target.closest(SEL)) {
        ring.classList.add("grow");
        dot.classList.add("hide");
      }
    });
    document.addEventListener("mouseout", function (e) {
      if (e.target.closest && e.target.closest(SEL)) {
        ring.classList.remove("grow");
        dot.classList.remove("hide");
      }
    });
  }

  /* ------------------------------------------------------------------
     2. Pointer-follow glow inside cards (sets --mx / --my)
     ------------------------------------------------------------------ */
  function initGlow() {
    if (!fine || reduced) return;
    document.addEventListener("mousemove", function (e) {
      var card = e.target.closest && e.target.closest(".card, .post-card, .embed-slot");
      if (!card) return;
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
    }, { passive: true });
  }

  /* ------------------------------------------------------------------
     3. Magnetic pull on primary buttons
     ------------------------------------------------------------------ */
  function initMagnetic() {
    if (!fine || reduced) return;
    document.querySelectorAll("[data-magnetic], .btn-primary").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        el.style.transform = "translate(" + x * 0.18 + "px," + (y * 0.18 - 3) + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }

  /* ------------------------------------------------------------------
     4. Reveal on scroll
     ------------------------------------------------------------------ */
  function initReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    var showAll = function () {
      items.forEach(function (el) { el.classList.add("in"); });
    };

    if (reduced || !("IntersectionObserver" in window)) { showAll(); return; }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    items.forEach(function (el, i) {
      /* stagger siblings a touch unless the page set its own delay */
      if (!el.style.getPropertyValue("--d")) {
        el.style.setProperty("--d", ((i % 6) * 0.07) + "s");
      }
      io.observe(el);
    });

    /* Safety net: if the observer never reports (background tab, a browser
       that throttles it, anything unexpected), reveal everything rather than
       leaving the page stuck invisible. */
    setTimeout(function () {
      if (!document.querySelector("[data-reveal]:not(.in)")) return;
      showAll();
      io.disconnect();
    }, 2200);
  }

  /* ------------------------------------------------------------------
     5. Scroll progress bar
     ------------------------------------------------------------------ */
  function initProgress() {
    var bar = document.createElement("div");
    bar.id = "progress";
    document.body.appendChild(bar);

    /* Ambient gradient layer, behind everything. Built here rather than in
       the HTML so it costs nothing when JS is unavailable. */
    var amb = null;
    if (!reduced) {
      amb = document.createElement("div");
      amb.id = "ambient";
      amb.setAttribute("aria-hidden", "true");
      amb.innerHTML = '<span class="a1"></span><span class="a2"></span><span class="a3"></span>';
      document.body.appendChild(amb);
    }

    var root = document.documentElement;
    var queued = false;

    var tick = function () {
      queued = false;
      var h = root.scrollHeight - window.innerHeight;
      var p = h > 0 ? window.scrollY / h : 0;
      p = Math.min(1, Math.max(0, p));
      bar.style.transform = "scaleX(" + p + ")";
      /* One shared variable drives every ambient blob (see #ambient in CSS). */
      root.style.setProperty("--sp", p.toFixed(4));
    };

    /* Coalesce scroll events into one write per frame. */
    var onScroll = function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
  }

  /* ------------------------------------------------------------------
     6. Count-up numbers  (<span data-count="12">)
     ------------------------------------------------------------------ */
  function initCounters() {
    var els = document.querySelectorAll("[data-count]");
    if (!els.length) return;

    var run = function (el) {
      var target = parseFloat(el.getAttribute("data-count"));
      if (isNaN(target)) return;
      if (reduced) { el.textContent = target; return; }
      var dur = 1300, start = performance.now();
      var step = function (now) {
        var t = Math.min(1, (now - start) / dur);
        var eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased);
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = target;
      };
      requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) { els.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        run(en.target);
        io.unobserve(en.target);
      });
    }, { threshold: 0.5 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------------
     7. Hero portrait tilt
     ------------------------------------------------------------------ */
  function initTilt() {
    if (!fine || reduced) return;
    document.querySelectorAll("[data-tilt]").forEach(function (box) {
      box.addEventListener("mousemove", function (e) {
        var r = box.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        box.style.transform =
          "perspective(900px) rotateY(" + (px * 7) + "deg) rotateX(" + (-py * 7) + "deg) translateZ(0)";
      });
      box.addEventListener("mouseleave", function () { box.style.transform = ""; });
    });
  }

  ready(function () {
    measure();
    /* Each guarded so one failure can't stop the rest of the page working. */
    [initCursor, initGlow, initMagnetic, initReveal, initProgress, initCounters, initTilt]
      .forEach(function (fn) {
        try { fn(); } catch (e) { if (window.console) console.warn("motion:", fn.name, e); }
      });
  });

  /* Re-evaluate on resize so the cursor appears/disappears when a window
     crosses the desktop threshold. */
  window.addEventListener("resize", function () {
    var was = fine;
    measure();
    if (fine !== was && fine && !document.getElementById("cursor-ring")) {
      try { initCursor(); } catch (e) {}
    }
  }, { passive: true });
})();
