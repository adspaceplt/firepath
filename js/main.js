// Page behavior: header state on scroll, mobile menu, and scroll reveals.
// Runs after js/site.js has rendered the shared header and footer.
(function () {
  var root = document.documentElement;
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function setMenu(open) {
    root.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector(".nav-toggle-label").textContent = open ? "Close" : "Menu";
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(!root.classList.contains("nav-open"));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && root.classList.contains("nav-open")) {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  document.querySelectorAll("[data-reveal-group]").forEach(function (group) {
    var step = parseInt(group.getAttribute("data-reveal-group"), 10) || 90;
    group.querySelectorAll("[data-reveal]").forEach(function (el, i) {
      el.style.setProperty("--d", i * step + "ms");
    });
  });

  var items = document.querySelectorAll("[data-reveal]");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("is-in"); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

  items.forEach(function (el) { observer.observe(el); });
})();
