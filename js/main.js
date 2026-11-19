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

// Gallery lightbox: open on click, browse with prev/next or arrow keys, close with
// the close control, Escape, or a backdrop click. Only runs when a gallery is present.
(function () {
  var root = document.querySelector("[data-gallery]");
  var dialog = document.getElementById("gallery-lightbox");
  if (!root || !dialog || typeof dialog.showModal !== "function") return;

  var buttons = Array.prototype.slice.call(root.querySelectorAll(".gallery-item"));
  if (!buttons.length) return;

  var titleEl = dialog.querySelector("[data-gallery-title]");
  var detailEl = dialog.querySelector("[data-gallery-detail]");
  var countEl = dialog.querySelector("[data-gallery-count]");
  var indexLabel = dialog.querySelector("[data-gallery-index-label]");
  var closeBtn = dialog.querySelector("[data-gallery-close]");
  var prevBtn = dialog.querySelector("[data-gallery-prev]");
  var nextBtn = dialog.querySelector("[data-gallery-next]");
  var index = 0;
  var lastFocus = null;

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function render() {
    var item = buttons[index];
    var title = item.getAttribute("data-title") || "";
    var detail = item.getAttribute("data-detail") || "";
    titleEl.textContent = title;
    detailEl.textContent = detail;
    countEl.textContent = (index + 1) + " / " + buttons.length;
    if (indexLabel) indexLabel.textContent = pad(index + 1);
    prevBtn.disabled = buttons.length < 2;
    nextBtn.disabled = buttons.length < 2;
  }

  function openAt(i) {
    index = (i + buttons.length) % buttons.length;
    lastFocus = document.activeElement;
    render();
    if (!dialog.open) dialog.showModal();
    closeBtn.focus();
  }

  function close() {
    if (dialog.open) dialog.close();
  }

  function step(delta) {
    index = (index + delta + buttons.length) % buttons.length;
    render();
  }

  buttons.forEach(function (btn, i) {
    btn.addEventListener("click", function () {
      openAt(i);
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", close);
  if (prevBtn) prevBtn.addEventListener("click", function () { step(-1); });
  if (nextBtn) nextBtn.addEventListener("click", function () { step(1); });

  dialog.addEventListener("click", function (e) {
    if (e.target === dialog) close();
  });

  dialog.addEventListener("close", function () {
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  });

  document.addEventListener("keydown", function (e) {
    if (!dialog.open) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    }
  });
})();
