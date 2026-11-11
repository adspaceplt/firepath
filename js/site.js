// Shared header and footer for every page. Edit SITE to change navigation,
// contact details, social links, or the registration number in one place.
// Pages mark their slots with data-site-header / data-site-footer and set
// <body data-page="..."> to highlight the current nav link.
var SITE = {
  company: "Firepath Sdn. Bhd.",
  registrationNo: "",
  tagline: "Johor exclusive distributor for Tyco / Johnson Controls.",
  whatsappDisplay: "012 603 0200",
  whatsappUrl: "https://wa.me/60126030200",
  email: "enquiry@firepath.com.my",
  address: ["4744, Jln Sri Putri 5,", "Tmn Putri,", "81000 Kulai, Johor."],
  nav: [
    { page: "home", href: "index.html", label: "Home" },
    { page: "products", href: "products.html", label: "Products" },
    { page: "resources", href: "resources.html", label: "Resources" },
    { page: "about", href: "about.html", label: "About" },
    { page: "contact", href: "contact.html", label: "Contact" }
  ],
  // An empty url renders a dimmed "to be added" icon instead of a link.
  social: [
    { label: "WhatsApp", icon: "whatsapp", url: "https://wa.me/60126030200" },
    { label: "Email", icon: "email", url: "mailto:enquiry@firepath.com.my" },
    { label: "Facebook", icon: "facebook", url: "" },
    { label: "Instagram", icon: "instagram", url: "" },
    { label: "LinkedIn", icon: "linkedin", url: "" }
  ]
};

(function () {
  var ICONS = {
    whatsapp: '<path d="M20.5 11.6a8.6 8.6 0 0 1-12.7 7.5L3.5 20.5l1.4-4.2a8.6 8.6 0 1 1 15.6-4.7z"/><path d="M9.2 8.4c.2-.4.5-.5.8-.5h.5l1 2.2-.8 1c.5 1.1 1.4 2 2.5 2.5l1-.8 2.2 1v.5c0 .3-.1.6-.5.8-.7.4-1.6.5-2.6.1a7.5 7.5 0 0 1-4.2-4.2c-.4-1-.3-1.9.1-2.6z"/>',
    email: '<rect x="3.5" y="5.5" width="17" height="13" rx="1.5"/><path d="m4 7 8 6 8-6"/>',
    facebook: '<path d="M14.5 3.5h-1.8a3.7 3.7 0 0 0-3.7 3.7v2.6H7v3.4h2v7.3h3.4v-7.3h2.4l.5-3.4h-2.9V7.6c0-.5.4-.9.9-.9h1.2z"/>',
    instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="3.8"/><path d="M17.1 6.9h.01"/>',
    linkedin: '<rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/><path d="M8 10.5v6M8 7.5v.01M11.5 16.5v-6M11.5 13.2c0-1.6 1-2.7 2.4-2.7s2.1 1 2.1 2.6v3.4"/>'
  };

  var current = document.body.getAttribute("data-page");

  function icon(name) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + ICONS[name] + "</svg>";
  }

  function navLinks() {
    return SITE.nav.map(function (item, i) {
      var cur = item.page === current ? ' aria-current="page"' : "";
      return '<a href="' + item.href + '" style="--i:' + i + '"' + cur + ">" + item.label + "</a>";
    }).join("");
  }

  function header() {
    return (
      '<header class="site-header">' +
        '<div class="wrap header-row">' +
          '<a class="brand" href="index.html" aria-label="Firepath home">' +
            '<img src="assets/firepath-logo-reversed.png" alt="Firepath" width="1100" height="207">' +
          "</a>" +
          '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">' +
            '<span class="nav-toggle-label">Menu</span>' +
            '<span class="nav-toggle-bars" aria-hidden="true"></span>' +
          "</button>" +
          '<nav class="site-nav" id="site-nav" aria-label="Site">' + navLinks() + "</nav>" +
        "</div>" +
      "</header>"
    );
  }

  function social() {
    return SITE.social.map(function (s) {
      if (!s.url) {
        return '<span class="social-link is-pending" role="img" aria-label="' + s.label +
          ' (link to be added)" title="' + s.label + ' link to be added">' + icon(s.icon) + "</span>";
      }
      var external = s.url.indexOf("http") === 0 ? ' target="_blank" rel="noopener"' : "";
      return '<a class="social-link" href="' + s.url + '" aria-label="' + s.label + '"' + external + ">" +
        icon(s.icon) + "</a>";
    }).join("");
  }

  function footer() {
    var year = new Date().getFullYear();
    var reg = SITE.registrationNo || "Registration no. to be added";
    var pages = SITE.nav.map(function (item) {
      return '<li><a href="' + item.href + '">' + item.label + "</a></li>";
    }).join("");

    return (
      '<footer class="site-footer">' +
        '<div class="wrap footer-grid">' +
          '<div class="footer-brand">' +
            '<img src="assets/firepath-logo-reversed.png" alt="Firepath" width="1100" height="207">' +
            "<p>" + SITE.tagline + "</p>" +
          "</div>" +
          "<div>" +
            '<p class="footer-title">Pages</p>' +
            '<ul class="footer-list">' + pages + "</ul>" +
          "</div>" +
          "<div>" +
            '<p class="footer-title">Contact</p>' +
            '<ul class="footer-list">' +
              '<li><a href="' + SITE.whatsappUrl + '">WhatsApp ' + SITE.whatsappDisplay + "</a></li>" +
              '<li><a href="mailto:' + SITE.email + '">' + SITE.email + "</a></li>" +
              '<li class="footer-address">' + SITE.address.join("<br>") + "</li>" +
            "</ul>" +
          "</div>" +
          "<div>" +
            '<p class="footer-title">Follow</p>' +
            '<div class="social">' + social() + "</div>" +
          "</div>" +
        "</div>" +
        '<div class="wrap footer-bottom">' +
          "<p>&copy; " + year + " " + SITE.company + " (" + reg + "). All rights reserved.</p>" +
          "<p>Kulai, Johor, Malaysia</p>" +
        "</div>" +
      "</footer>"
    );
  }

  var headerSlot = document.querySelector("[data-site-header]");
  var footerSlot = document.querySelector("[data-site-footer]");
  if (headerSlot) headerSlot.outerHTML = header();
  if (footerSlot) footerSlot.outerHTML = footer();
})();
