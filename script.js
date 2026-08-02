(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      if (open) {
        mobileNav.hidden = true;
      } else {
        mobileNav.hidden = false;
      }
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Header shadow on scroll
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    if (!header) return;
    header.style.boxShadow =
      window.scrollY > 8 ? "0 8px 30px rgba(0,0,0,0.35)" : "none";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = document.querySelectorAll(
    ".value-card, .feature, .list-card, .use-card, .how-panel, .steps li, .download-panel, .faq-list details"
  );

  if (reduceMotion) {
    targets.forEach((el) => el.classList.add("visible"));
  } else {
    targets.forEach((el) => el.classList.add("reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    targets.forEach((el) => io.observe(el));
  }

  // Prefer latest release page; fall back note is already in HTML
  const apk = document.getElementById("apk-download");
  if (apk) {
    // Keep primary CTA pointing at releases/latest so new versions work without republishing
    apk.setAttribute(
      "href",
      "Mkweli_v1.0.12.apk"
    );
  }

  // Small shared download counter (seed + remote increments)
  (function initDownloadCounter() {
    const host = document.querySelector("[data-dl-counter]");
    if (!host) return;
    const product = host.getAttribute("data-dl-product") || "app";
    const seed = Math.max(0, parseInt(host.getAttribute("data-dl-seed") || "0", 10) || 0);
    const apiBase = "https://api.counterapi.dev/v1/mkweli-tech/apk-" + product;
    const format = (n) => n.toLocaleString("en-US");
    let last = seed;
    const render = (n) => {
      last = n;
      host.textContent = format(n) + " downloads";
    };
    render(seed);
    fetch(apiBase + "/")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && typeof data.count === "number") render(seed + data.count);
      })
      .catch(() => {});
    let lock = false;
    const track = () => {
      if (lock) return;
      lock = true;
      window.setTimeout(() => {
        lock = false;
      }, 2000);
      fetch(apiBase + "/up")
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (data && typeof data.count === "number") render(seed + data.count);
          else render(last + 1);
        })
        .catch(() => {
          render(last + 1);
        });
    };
    document.querySelectorAll("[data-dl-link]").forEach((a) => {
      a.addEventListener("click", track);
    });
  })();
})();
