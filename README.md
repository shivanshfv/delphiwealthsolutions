# Delphi Wealth Solutions - Website

Static site. No build step, no framework. Open `index.html` in a browser, or drop the whole
folder onto any static host (Netlify, Vercel, S3, GitHub Pages). To recreate in Webflow/Framer,
all design tokens live at the top of `styles.css` (`:root` custom properties).

## Files

| File | Purpose |
|---|---|
| `index.html` | Home |
| `approach.html` | Process + compensation disclosure |
| `about.html` | Founder bio (placeholder structure) |
| `faq.html` | 8 questions for skeptical HNW prospects |
| `contact.html` | Calendly slot + minimal inquiry form |
| `styles.css` | Single shared stylesheet (design tokens at top) |
| `main.js` | Animations: preloader, page-transition veil, split-text reveals, parallax, custom cursor, magnetic buttons, accordion. Honors `prefers-reduced-motion`. |
| `logo-light.png` / `logo-dark.png` | Your DW logo, cut out from "Logo A.png" as transparent light/dark variants. The header swaps between them automatically as it passes over dark and light sections. |
| `favicon.png` | DW monogram on ink, generated from your logo |
| `fonts/` | Self-hosted Cormorant Garamond + Inter (no third-party requests) |

`favicon.svg` (the old E mark) and `Logo A.png` (your original) are no longer referenced by
the site; you can delete them or keep them as source files.

## Placeholders

All bracketed placeholders were removed from the live pages on 2026-08-06 so nothing
unfinished is consumer-facing. **See `PLACEHOLDER-LOG.md`** for the full list of what was
removed (license number, email/phone, Calendly embed, bio, credentials) and exactly how
to add each item back.

## Contact form

The form is front-end only: it shows a confirmation message but sends nothing. Wire it to
Formspree/Basin/Netlify Forms (add the `action` attribute) or your CRM before launch.

## Compliance notes - re-review after FINRA registration

The entire site is scoped to **financial planning, consulting, and insurance**. It deliberately:

- never mentions portfolio/asset/investment management as a service, AUM, or asset-based fees;
- states affirmatively that you are not securities-registered and place no investment products
  (FAQ iv "Do you sell investments?" - **this answer must be rewritten the day you register**);
- makes no performance promises, guarantees, or projections anywhere.

If/when you register with FINRA or as an RIA, re-review at minimum: FAQ i, ii, and iv;
the "What We Don't Do" section on Home; the compensation section on Approach (the site now states planning is complimentary and compensation is carrier-based); and the footer
disclosure on all five pages. Also re-review the phrase "our advice answers to your interests"
(Home) with compliance counsel at that time.

## Design tokens

Ink `#14181F` · Alabaster `#F7F3EC` · Bronze `#A8894F` (gradient `#7E6535 / #E7D6A8 / #7E6535`).
Cormorant Garamond 400/500 for display, Inter 400/500 for body, self-hosted in `fonts/`.
