/* Rohit Roy — portfolio. Vanilla JS: theme toggle, scroll reveal, nav state. */
(function () {
  "use strict";

  var root = document.documentElement;
  var STORAGE_KEY = "theme";

  /* ---- Theme toggle (initial theme is set pre-paint by an inline <head> script) ---- */
  var toggle = document.getElementById("themeToggle");
  function syncToggle() {
    if (toggle) {
      toggle.setAttribute(
        "aria-pressed",
        root.getAttribute("data-theme") === "light" ? "true" : "false"
      );
    }
  }
  syncToggle();
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (e) {}
      syncToggle();
    });
  }

  /* ---- Nav shadow on scroll ---- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobile nav menu ---- */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    function setMenu(open) {
      navLinks.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    }
    navToggle.addEventListener("click", function () {
      setMenu(!navLinks.classList.contains("is-open"));
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) setMenu(false);
    });
  }

  /* ---- Scroll-spy: highlight the section currently in view ---- */
  if (navLinks && "IntersectionObserver" in window) {
    var navAnchors = navLinks.querySelectorAll("a[href^='#']");
    var sectionMap = {};
    navAnchors.forEach(function (a) {
      var sec = document.getElementById(a.getAttribute("href").slice(1));
      if (sec) sectionMap[sec.id] = a;
    });
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navAnchors.forEach(function (a) {
            a.classList.remove("is-active");
          });
          if (sectionMap[entry.target.id]) {
            sectionMap[entry.target.id].classList.add("is-active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    Object.keys(sectionMap).forEach(function (id) {
      spy.observe(document.getElementById(id));
    });
  }

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---- Timeline dots: glow while the entry is in the viewport's focus band ---- */
  var timelineItems = document.querySelectorAll(".timeline__item");
  if ("IntersectionObserver" in window && timelineItems.length) {
    var focusObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          entry.target.classList.toggle("is-focused", entry.isIntersecting);
        });
      },
      // Thin band across the vertical middle of the viewport.
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
    );
    timelineItems.forEach(function (el) {
      focusObserver.observe(el);
    });
  }

  /* ---- Email (assembled at runtime so the address isn't in page source) ---- */
  var emailLinks = document.querySelectorAll(".js-email");
  emailLinks.forEach(function (el) {
    var user = el.getAttribute("data-u");
    var domain = el.getAttribute("data-d");
    if (!user || !domain) return;
    var address = user + "@" + domain;
    el.setAttribute("href", "mailto:" + address);
    // Reveal the address as text only where the link has none (e.g. a plain link).
    if (el.dataset.showText === "true" && !el.textContent.trim()) {
      el.textContent = address;
    }
  });

  /* ---- Footer year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
