# TCG — The Consulting Group

Live website source for The Consulting Group, Bengaluru. Official email: **umesh@tcg.ind.in**.

## Website

The repository root serves the V4 design: 21 screens covering six consulting practices, four industries, selected work, the firm, TCG Wealth and contact. It is a static HTML/CSS/JavaScript site with hash-based navigation and no build step. Vercel deploys `main`.

```sh
python3 -m http.server 4321 --bind 127.0.0.1
```

Open `http://127.0.0.1:4321/`.

- `index.html`: entry point and metadata.
- `app.js`: page templates and routing.
- `content.js`: practice, industry and project content.
- `experience.js`: interactive priorities, disclosures and challenge routing.
- `styles.css`: responsive layout and visual system.
- `assets/`: supplied logo, founder photo and generated conceptual hero image, alongside retained legacy assets.

Existing `/services`, `/sectors`, `/work`, `/about` and `/contact` URLs forward visitors to the corresponding new screen. The design-review toolbar is removed from the public site.

## Enquiries

The contact form creates a local review, then lets visitors open a prefilled email draft addressed to `umesh@tcg.ind.in`. It does not submit to a backend or send automatically.

## Design handoff

The original V4 prototype and reference captures remain in [`designs/v4/`](designs/v4/), including [the handoff](designs/v4/TCG-V4-Design-Handoff.md), [page gallery](designs/v4/TCG-V4-Design-Boards.html), and [asset provenance](designs/v4/TCG-V4-Asset-Notes.md). These document the original design stage; the root contains the public-site adaptations.

The hero cityscape is generated concept imagery, not a documentary photograph of a named location. Client artwork is labelled conceptual presentation material. No client results or funding guarantees have been invented.
