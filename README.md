# TCG - The Consulting Group

Live website source for The Consulting Group, Bengaluru. Official email: **umesh@tcg.ind.in**.

## Website

The repository root serves 23 public pages: eight consulting practices, four industries, selected work, the firm, TCG Wealth and contact. Pages are generated as complete HTML with regular URLs, individual search metadata, canonical links and a sitemap. Vercel deploys `main` using its existing static hosting configuration.

After changing templates, content, or SEO metadata, rebuild and validate before committing:

```sh
node scripts/build.cjs
node scripts/check.cjs
node scripts/check-engagement.cjs
python3 scripts/preview.py 4321
```

Open `http://127.0.0.1:4321/`. The preview server supports the same clean URLs as production. No packages or external build dependencies are required. Generated HTML is committed, so Vercel does not need a build step.

- `app.js`: shared page templates and browser interactions.
- `content.js`: practice, industry and project content.
- `engagement.js`: assistant answers, session continuity and NDA/meeting request review.
- `experience.js`: interactive priorities, disclosures and challenge routing.
- `seo.js`: page titles, descriptions and production domain.
- `scripts/build.cjs`: prerenders the pages, structured data, robots.txt and sitemap.xml.
- `styles.css`: responsive layout and visual system.
- `assets/`: logo, founder portrait, concept cityscape and sourced sector photographs.
- `index.html`, root and nested `.html` pages: generated files; edit the templates rather than these outputs.

Old `/#/services/...` links migrate to the corresponding clean URL, preserving enquiry query parameters. `/sectors` redirects to `/industries`. Archived design files are excluded from indexing via an `X-Robots-Tag` response header.

The primary domain is `https://www.tcg.ind.in`, verified serving the redesigned site on 13 October 2026. Canonicals, sitemap, social metadata and structured data use it. The Vercel alias permanently redirects to this domain, preserving paths and query parameters. The apex domain already redirects to www. `seo.js` remains the single source for the primary domain.

The homepage uses responsive WebP copies of the original cityscape. To regenerate them with cwebp:

```sh
cwebp -q 82 -m 6 assets/city-momentum.png -o assets/city-momentum.webp
cwebp -q 80 -m 6 -resize 960 0 assets/city-momentum.png -o assets/city-momentum-960.webp
```

Search Console verification and submission remain an account-side action; see `SEO-AUDIT.md`.

## Enquiries

Visitors choose an NDA request or introductory meeting, provide name, company, email and an optional preferred time, then review a message locally. They can open a WhatsApp draft for **+91 82177 16904** or an email draft to `umesh@tcg.ind.in`. Sending takes place in the visitor’s chosen app. No agreement is signed, availability is queried or meeting reserved by this form. The owner approved this request flow on 13 October 2026 pending legal wording and calendar setup.

`engagement.js` contains the shared branded service guide and request flow. The guide answers from a bounded, local TCG service knowledge base. It does not use Gemini or a remote model. It retains the latest six questions in this browser tab’s session storage, with a Clear chat control. Request form details are not persisted. The introductory input collapses after 12 seconds of inactivity without hiding a focused input or an open conversation.

To activate signing and real scheduling later: confirm TCG’s registered contracting entity and approved NDA; choose a signature provider with a completed-document record and notifications; connect Umesh’s calendar to a scheduler that checks busy time privately and sends invitations to both parties. Gate booking on verified signing status if required. Do not treat a browser checkbox or WhatsApp draft as a signed NDA or a confirmed booking.

## Interaction controls

`interaction.css` holds the refined CTA, assistant and section navigator styling. The assistant uses the original `assets/TCG-LOGO.png`, with the same crop as the site header. No logo drawing or mascot variant is used.

The navigation and closing CTA open a native dialog with meeting, NDA and WhatsApp routes. Service context is retained in the contact query string; `journey=meeting` selects the introductory meeting flow. Links still reach contact without JavaScript. Escape closes the dialog and restores focus.

The homepage down arrow and persistent section control share one scroll controller. The control follows the page sections, shows reading progress, and returns to the top at the page end. It guards against overlapping clicks during smooth scrolling, respects reduced motion, and stays separate from Ask TCG.

## Design handoff

The original V4 prototype and reference captures remain in [`designs/v4/`](designs/v4/), including [the handoff](designs/v4/TCG-V4-Design-Handoff.md), [page gallery](designs/v4/TCG-V4-Design-Boards.html), and [asset provenance](designs/v4/TCG-V4-Asset-Notes.md). These document the original design stage; the root contains the public-site adaptations.

The hero cityscape is generated concept imagery, not a documentary photograph of a named location. Client artwork is labelled conceptual presentation material. No client results or funding guarantees have been invented.
