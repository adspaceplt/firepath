# Firepath

Static site for Firepath Sdn. Bhd. Open `index.html` in a browser (double-click the file, or drag it into a browser window). No install step and no local server are required.

Pages: `index.html` (Home), `products.html`, `resources.html`, `about.html`, `contact.html`.

## Shared template

The header and footer are rendered by `js/site.js` on every page. To change navigation, WhatsApp, email, address, social links, or the company registration number, edit the `SITE` object at the top of that file once.

- `registrationNo`: shown in the footer copyright line. Until it is set, the footer reads "Registration no. to be added".
- `social`: Facebook, Instagram, and LinkedIn have empty `url` values and show as dimmed icons. Add the profile URLs to turn them into links.

A new page needs three things: `<body data-page="name">`, the `data-site-header` and `data-site-footer` slots, and the two scripts at the end of the body. Copy any existing page as the starting point and add it to `SITE.nav`.

`js/main.js` handles the sticky header, mobile menu, and scroll reveal animations. Motion is turned off when the visitor's system asks for reduced motion.

## Assets

- `assets/firepath-logo.png`: the logo from the brief, with the white background removed.
- `assets/firepath-logo-reversed.png`: the same logo with the navy lettering switched to off-white so it reads on the dark site. Replace it with an official reversed logo if one exists.
- `assets/favicon.svg`: browser tab icon based on the logo mark.

The source brief is `materials/Firepath.docx`. It is marked private and confidential, so `.gitignore` keeps it out of the repository; it exists only on the local machine. Further copy, logos, photos, and references go in `materials/`.
