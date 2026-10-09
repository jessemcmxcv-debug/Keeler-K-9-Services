# Keeler K9 Services — preview

This branch is a **preview** of the updated Keeler K9 Services website.
It is **not live**.

The public site at [keelerk9services.ca](https://keelerk9services.ca) is still the original site on the `main` branch. GitHub Pages publishes `main` only. Do not merge this branch until you have decided how the new site should be hosted. Merging it into `main` would replace the live pages with this app, and GitHub Pages cannot run it.

## What changed

- Phone number (437) 869-6893, David Keeler, and North Mississauga / Brampton are in the header and footer, with tap-to-call on phones.
- Angel’s existing photos are kept and served as smaller copies. They were not replaced.
- Gallery, lightbox, intake form, and the simple owner dashboard are in this version.
- No email address and no donation link were invented. Both can be filled in later from the dashboard.
- Haley references, empty pages, and the broken image reference from the old site are not part of this version.
- The original website files and photos are preserved in `legacy/`.

## Still needed from you

- A real contact email, when you have one.
- The real donation link, when you have one.

## Run the preview locally

```bash
npm install
npm run dev
```

Then open the site and use **Admin** to review dogs, intake messages, contact details, and the donation setting. Changes stay in the browser until you publish them inside the dashboard. Nothing here updates keelerk9services.ca by itself.
