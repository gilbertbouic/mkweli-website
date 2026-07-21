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
      "Mkweli_v1.0.8.apk"
    );
  }
})();
