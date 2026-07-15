# TCG — The Consulting Group

Official website for **The Consulting Group (TCG)** — a full-spectrum consulting
firm in Bengaluru. One promise, everywhere: **we solve problems.**

> Operator's Editorial — ink + warm paper + one decisive crimson. Warm as a
> friend, sharp as a consultant. Built for MSMEs and marquee brands alike.

## Stack

- **Multi-page static site** — plain HTML/CSS/JS, **no build step**
- **GSAP + ScrollTrigger** and **Lenis** (smooth scroll) via CDN
- Fonts: **Fraunces** (display) · **General Sans** (body) · **JetBrains Mono** (labels)
- Deployed on **Vercel** (clean URLs, auto-deploy on push)

Everything degrades gracefully: `prefers-reduced-motion` is honoured, reveals fall
back to plain visibility, and the site is fully readable without JavaScript.

## Structure

```
TCG-WEBSITE/
├── index.html         # Home — hero, problem, sectors, MSME manifesto, proof, portfolio teaser
├── services.html      # What we do — six portfolios, start-at-zero, process
├── sectors.html       # Sectors — five industries in depth
├── work.html          # Work — the client wall (hover/tap reveal + sector filter)
├── about.html         # About — origin, founder, operator ethos, Bengaluru
├── contact.html       # Contact — warm form (composes an email; Formspree-ready)
├── assets/
│   ├── css/main.css   # Full design system (tokens, type, components, motion)
│   ├── js/main.js     # Cursor, Lenis, reveals, hero sequence, portfolio, transitions
│   ├── logos/         # Client logos + TCG mark + founder photo
│   └── img/           # (reserved for future imagery)
├── vercel.json        # Clean URLs, security + cache headers
└── README.md
```

## Run locally

No build needed — serve the folder with any static server:

```bash
npx serve .          # then open the printed URL
# or
python3 -m http.server 4321   # note: use /work.html style URLs (no clean-URL rewrite)
```

`npx serve` mirrors Vercel's clean URLs (`/work`, `/about`, …).

## Editing notes

- **Design tokens** (colours, fonts, easing) live at the top of `assets/css/main.css`
  as CSS variables — change them there and they cascade everywhere.
- **Portfolio wall** (`work.html`): each tile has a `data-sector` (for the filter)
  and an in-DOM `.panel` (so the hover reveal is keyboard-focusable and
  screen-reader readable). Add a client by copying a `.tile` block.
- **Contact form** (`contact.html`): works with zero backend by opening a
  pre-filled email. To deliver to an inbox instead, create a free form at
  [formspree.io](https://formspree.io) and set `FORM_ENDPOINT` near the bottom
  of the page.
- **Client display**: all names/logos come from the public deck. If any client
  later needs to be hidden, swap its tile to the "Confidential — sector shown"
  pattern already used for the NDA tile.

## Deployment

Hosted on Vercel. Every push to `main` auto-deploys.

## Contact

hello@theconsultinggroup.in
Bengaluru, Karnataka, India
