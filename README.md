# TCG — The Consulting Group

Live website source for The Consulting Group, Bengaluru. Official email: **umesh@tcg.ind.in**.

## Website

The repository root serves 23 public pages: eight consulting practices, four industries, selected work, the firm, TCG Wealth and contact. Pages are generated as complete HTML with regular URLs, individual search metadata, canonical links and a sitemap. Vercel deploys `main` using its existing static hosting configuration.

After changing templates, content, or SEO metadata, rebuild and validate before committing:

```sh
node scripts/build.cjs
node scripts/check.cjs
python3 scripts/preview.py 4321
```

Open `http://127.0.0.1:4321/`. The preview server supports the same clean URLs as production. No packages or external build dependencies are required. Generated HTML is committed, so Vercel does not need a build step.

- `app.js`: shared page templates and browser interactions.
- `content.js`: practice, industry and project content.
- `experience.js`: interactive priorities, disclosures and challenge routing.
- `seo.js`: page titles, descriptions and production domain.
- `scripts/build.cjs`: prerenders the pages, structured data, robots.txt and sitemap.xml.
- `styles.css`: responsive layout and visual system.
- `assets/`: logo, founder portrait, concept cityscape and sourced sector photographs.
- `index.html`, root and nested `.html` pages: generated files; edit the templates rather than these outputs.

Old `/#/services/...` links migrate to the corresponding clean URL, preserving enquiry query parameters. `/sectors` redirects to `/industries`. Archived design files are excluded from indexing via an `X-Robots-Tag` response header.

The SEO canonical domain is currently `https://tcg-website-iota.vercel.app`, the verified production deployment. If a custom domain becomes primary, update `SITE_URL` in `seo.js`, rebuild and configure the domain/redirects before publishing. Submit the sitemap to the verified domain’s Search Console property when access is available.

## Enquiries

The contact form creates a local review, then lets visitors open a prefilled email draft addressed to `umesh@tcg.ind.in`. It does not submit to a backend or send automatically.

## Design handoff

The original V4 prototype and reference captures remain in [`designs/v4/`](designs/v4/), including [the handoff](designs/v4/TCG-V4-Design-Handoff.md), [page gallery](designs/v4/TCG-V4-Design-Boards.html), and [asset provenance](designs/v4/TCG-V4-Asset-Notes.md). These document the original design stage; the root contains the public-site adaptations.

The hero cityscape is generated concept imagery, not a documentary photograph of a named location. Client artwork is labelled conceptual presentation material. No client results or funding guarantees have been invented.
