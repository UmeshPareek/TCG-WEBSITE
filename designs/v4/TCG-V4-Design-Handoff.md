# TCG — Direction 04: Momentum

**We solve problems. So you can move forward.**

Prepared 12 October 2026. Official contact: **umesh@tcg.ind.in**.

## Open the work

- `TCG-V4-Interactive-Prototype.html`: self-contained interactive design, with assets embedded. Open in a modern browser.
- `TCG-V4-Design-Boards.html`: gallery of all 21 pages and mobile examples; keep `tcg-v4/screenshots/` alongside it.
- `TCG-V4-Page-by-Page-Guide.html`: opens the design guide and page index.
- `tcg-v4/`: editable source, assets and page captures.

## Reference interpretation

The owner's references informed composition and interaction, not copied brand assets or claims.

- [OCI / Buzzworthy](https://oci.madebybuzzworthy.com/): full-screen photography, oversized typography and strong colour transitions.
- [Sincro](https://sincro.es/en/us/): editorial grids, generous space, structured navigation and precise information hierarchy.
- [EZERA / MadeByCat article](https://ezeratech.ae/insights/madebycat-digital-experience-partner): a connected narrative and expressive visual design with clear positioning. The homepage was also reviewed via the article's brand link.

TCG uses its own red identity, an original conceptual city image, a large direct proposition and clear paths into the full service offering. The rejected knot, sticky notes and sculptural-column component are absent from this direction.

## Homepage experience

1. Full-bleed city image, “We solve problems” and “So you can move forward.”
2. Three priority choices: pitch, operations and business funding. Selecting one changes the supporting message and enquiry destination.
3. Red positioning statement explains the six connected practices.
4. Expandable service rows reveal scope, key outputs and links to practice detail. Only one row stays open.
5. Selected project presentations provide concrete context.
6. Six client challenges connect to suggested work, relevant practices and an editable enquiry brief.
7. TCG Wealth, sector expertise, process and a clear closing invitation.

## Visual system

| Element | Value / intent |
|---|---|
| Paper | `#FAFAF7` |
| Ink | `#202320` |
| TCG red | `#A32A20` |
| Stone | `#E9E8E3` |
| Wealth dark | `#242B26` |
| Typography | Helvetica Neue where available, Arial fallback; oversized regular sans-serif headlines |
| Structure | Thin rules, explicit section indices, broad editorial grids |
| Desktop hero | Full viewport, minimum 720px, maximum 1150px |
| Mobile hero | Stacked headline, supporting copy and three priority buttons |
| Motion | Brief image entrance and hover feedback; no automatic slide changes; reduced-motion support |

The supplied TCG PNG is unchanged and displayed through a CSS crop of transparent outer padding. The type system and shared spacing carry through all 21 pages.

## Page-by-page direction

Routes below are appended after the prototype filename, for example `TCG-V4-Interactive-Prototype.html#/wealth`.

| # | Page | Route | Section sequence and purpose |
|---|---|---|---|
| 01 | Home | `#/` | Full-screen photographic hero and priority selector → red positioning statement → expandable expertise → selected work → six-problem finder → Wealth → sectors → process → enquiry CTA. Establish the proposition and offer clear exploration paths. |
| 02 | Expertise | `#/services` | Six-practice directory → TCG Wealth panel → engagement process → CTA. Show the full range without making visitors decode internal departments. |
| 03 | Finance & investor readiness | `#/services/finance` | Positioning → business questions → financial models, pitch decks, pricing and reporting → deliverables → Gully Bowls → adjacent practices → preselected enquiry. |
| 04 | Operations & management systems | `#/services/operations` | Operating needs → SOPs, cost tracking, staffing and platforms → outputs → Gully Bowls → related expertise. Connect process design to execution. |
| 05 | Technology & product | `#/services/technology` | Platform proposition → workflow questions → operations platforms, SaaS, dashboards and automation → outputs → SP Freight → related practices. |
| 06 | Brand & digital experience | `#/services/brand` | Brand proposition → naming, identity, packaging and websites → practical outputs → the switch. → related practices. |
| 07 | Compliance, tax & incorporation | `#/services/compliance` | Foundation proposition → incorporation, filings, audit/structuring support → engagement outputs → adjacent practices → enquiry. |
| 08 | Legal & business advisory | `#/services/legal` | Commercial clarity → contracts, NDAs, notices and structure → outputs → related practices → enquiry. |
| 09 | Industries | `#/industries` | Four sector entry points, each with a distinctive geometric treatment and clear context. |
| 10 | Food, beverage & hospitality | `#/industries/hospitality` | Context → operating formats → economics, consistency and brand needs → Gully Bowls → relevant practices. |
| 11 | Logistics & supply chain | `#/industries/logistics` | Context → workflows → systems, reporting and commercial communication → SP Freight → relevant practices. |
| 12 | Real estate, PropTech & co-living | `#/industries/real-estate` | Context → proposition, operations and investor story → the switch. and CashMyRent → relevant practices. |
| 13 | Sports & human performance | `#/industries/performance` | Context → offer, launch and relationships → Centre of Human Performance scope → relevant practices. |
| 14 | Selected work | `#/work` | Portfolio introduction → industry filters → four project entries → wider published portfolio → CTA. |
| 15 | Gully Bowls | `#/work/gully-bowls` | Client and scope → concept visual → financial and operating toolkit → delivered items → related projects. |
| 16 | SP Freight Systems | `#/work/sp-freight` | Client and scope → concept product visual → Placement OS and reporting → delivered items → related projects. |
| 17 | the switch. | `#/work/the-switch` | Client and scope → concept brand treatment → identity, website and investor materials → delivered items → related projects. |
| 18 | CashMyRent | `#/work/cashmyrent` | Client and scope → concept visual → property-management platform → delivered items → related projects. |
| 19 | The firm | `#/about` | Purpose → origin → real founder portrait and statement → three principles → specialist segments → CTA. |
| 20 | TCG Wealth | `#/wealth` | Dedicated charcoal hero → funding conversation → business/purpose/next step → adjacent expertise → FAQs → preselected funding enquiry. |
| 21 | Contact | `#/contact` | Direct contact and next-step explanation → stage and practice routing → short brief → local review state. Funding field appears for Wealth. |

The additional `#/design` route is the design guide, outside the 21 client-facing screens.



## Content and production scope

The six practices, industries, founder information and project scopes are based on the existing TCG website. Pitch decks, operations management platforms and business debt funding reflect the owner's additions. Copy and expanded scope descriptions are proposed for owner review. No client results, testimonials, interest rates or funding guarantees were invented.

The official address `umesh@tcg.ind.in` is used in visible contact details, direct email links and the enquiry email-draft destination. The form creates a local review state; sending is not automatic. No enquiry was sent during verification.

TCG Wealth is described only as business debt funding. Supply its precise operating model, products, terms, eligibility and required disclosures before publication. Client presentation visuals remain labelled concepts; replace them with approved real project imagery where available.

The city image is an AI-generated conceptual urban scene, not a documentary photograph of Bengaluru or a TCG office. For launch, a commissioned city/business film or licensed photograph could replace this asset without changing the layout.

## Developer notes

`content.js` holds business content. `app.js` holds page templates and routing. `experience.js` holds priority selection, service disclosures and challenge routing. `styles.css` holds the responsive design, including direction-specific overrides.

This is a UI/UX prototype. Production requires crawlable routes, page metadata, final image optimisation, backend enquiry delivery, privacy copy, spam protection, and a full accessibility audit. No production deployment or live-site change was made.

## Verification

- JavaScript syntax checked.
- All 21 pages checked on desktop and mobile; one H1 per page and no horizontal overflow after the homepage correction.
- Desktop image checks found no broken loaded images.
- Priority choices route to the correct practice and prefilled enquiry brief.
- Service accordion and mobile menu exercised.
- Official email updated in the interface and draft destination.
- Desktop and mobile design captures included.

