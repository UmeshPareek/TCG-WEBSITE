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

Visitors choose an NDA request or introductory meeting, provide name, company, email and an optional preferred time, then review a message locally. They can open a draft addressed to `umesh@tcg.ind.in` or WhatsApp +91 82177 16904, or copy the message into their usual email service. Sending takes place in the visitor’s selected app. No agreement is signed, availability is queried or meeting reserved by this form. The owner confirmed retaining WhatsApp and the independent bot avatar on 15 October 2026. Legal wording and calendar setup remain pending.

`engagement.js` contains the shared branded service guide and request flow. The guide answers from a bounded, local TCG service knowledge base. It does not use Gemini or a remote model. It retains the latest six questions in this browser tab’s session storage, with a Clear chat control. Request form details are not persisted. The introductory input collapses after 12 seconds of inactivity without hiding a focused input or an open conversation.

To activate signing and real scheduling later: confirm TCG’s registered contracting entity and approved NDA; choose a signature provider with a completed-document record and notifications; connect Umesh’s calendar to a scheduler that checks busy time privately and sends invitations to both parties. Gate booking on verified signing status if required. Do not treat a browser checkbox or email draft as a signed NDA or a confirmed booking.

## Interaction controls

`interaction.css` holds the refined CTA, assistant and section navigator styling. Ask TCG uses an independent generated bot avatar, `assets/assistant-avatar.webp`. It is not derived from the TCG logo. The supplied `assets/TCG-LOGO.png` remains unchanged in the site header, footer and conversation chooser. Generation prompt and provenance: `assets/assistant-avatar.md`.

The navigation and closing CTA open a native dialog with meeting, NDA and WhatsApp routes. Service context is retained in the contact query string; `journey=meeting` selects the introductory meeting flow. Links still reach contact without JavaScript. Escape closes the dialog and restores focus.

The floating assistant and persistent section control are hidden on first arrival on every page and appear after 160px of scrolling. They hide again at the top; an open or focused assistant remains accessible. The in-content homepage arrow remains available.

The homepage down arrow and persistent section control share one scroll controller. The control follows the page sections, shows reading progress, and returns to the top at the page end. It guards against overlapping clicks during smooth scrolling, respects reduced motion, and stays separate from Ask TCG.

## Design handoff

The original V4 prototype and reference captures remain in [`designs/v4/`](designs/v4/), including [the handoff](designs/v4/TCG-V4-Design-Handoff.md), [page gallery](designs/v4/TCG-V4-Design-Boards.html), and [asset provenance](designs/v4/TCG-V4-Asset-Notes.md). These document the original design stage; the root contains the public-site adaptations.

The hero cityscape is generated concept imagery, not a documentary photograph of a named location. Client artwork is labelled conceptual presentation material. No client results or funding guarantees have been invented.

The Wealth hero follows the homepage’s full-width photographic treatment. It uses a real close-up photograph of Indian rupee notes at `assets/photography/wealth-funds.webp`, with a smaller responsive variant and a monochrome treatment. The headline and copy identify business funding for expansion, operations and new opportunities. Its source and licence are recorded in `assets/photography/README.md`. The hero does not repeat the TCG Wealth wordmark beneath the site logo. Earlier artwork is retained as unused design exploration.

## Section scrolling

`viewport.css` gives desktop sections a minimum height equal to the visible viewport below the navigation. Longer sections remain full-height document content, and the native browser scroll container uses proximity snapping. The homepage has an overlay header, so its sections use the full viewport; other pages use the measured sticky-header height. Section arrows use the same offset. Mobile, reduced-motion, menus, dialogs and focused form controls use normal scrolling. No wheel or touch events are cancelled and no content is forced into a fixed-height scrolling panel.

## Internal billing desk

Open `/billing` directly. It is deliberately absent from public navigation and the sitemap, with noindex metadata and response headers. It is a standalone internal tool, not a customer portal. Its code is publicly hosted, but records are stored only in IndexedDB in the browser profile and origin where they were entered. There is no server database, account, encryption layer or multi-device sync. Do not treat noindex as access control. Anyone using that same computer/browser profile can access its records.

Start in **Business details**, review TCG's name, the supplied HSR Layout address, contact details, typed Umesh Pareek signatory block and editable default terms, and add actual bank or UPI instructions if desired. The signature is a typed sign-off, not a cryptographic or handwritten signature. Already-issued invoices retain their issuer and billing snapshots. Create a draft, add service lines and optionally record an advance, then review and issue it. Numbers start at `TCG/26-27/0001` and increment atomically in this browser. Each April starts a financial-year sequence. Issued numbers are not reused, including void invoices. Do not issue from independent browser profiles or devices: their sequences are independent.

Money is calculated in integer paise. Payments, advances, refunds and corrections have retained records; payment status is calculated from receipts and the balance. Delivery statuses and internal work notes are tracked separately. Financial details freeze at issue. To correct an issued invoice, resolve receipts, void it with a reason and create a new draft. There is no GST charge or GSTIN, and the document is labelled Invoice, not Tax Invoice. Basic terms can be edited before issue and should match the agreed engagement.

**Download PDF** produces an A4 invoice locally using self-hosted jsPDF and Noto Sans. **Print / Save PDF** provides a browser alternative. **Share on WhatsApp** previews a message and opens a draft for the user to send. Attach the downloaded PDF manually, or use the native file share sheet where supported. It uses no paid WhatsApp API and never sends automatically. **Mark as sent** is a manual record, not a delivery receipt. Internal work notes are excluded from client documents and sharing.

Export a JSON backup regularly and keep it private. Clearing site data removes local records. Restore validates the backup and numbering and is allowed only in an empty workspace to avoid overwriting records or colliding invoice numbers. A localhost preview and `https://www.tcg.ind.in/billing` are different storage origins. To move records, export from the original browser/origin and restore once into the empty destination, then issue from only that destination. Existing records are never automatically moved or deleted.

Validation: `node scripts/check-billing.mjs` exercises money, advances, payments, refunds, numbering, backup checks and WhatsApp encoding and generates synthetic PDF fixtures under `/tmp/tcg-billing-qa`. Browser QA covers draft creation, advance recording, issue, delivery status, work notes, sent marking, PDF export, backup export/restore and responsive layout. Synthetic QA data is not seeded on production.
