# Placeholder Log - removed from the live pages on 2026-08-06

Everything below was removed from (or filled in on) the consumer-facing pages at your
request. Nothing in this file is linked from the site; it exists so you can restore each
item later. Work through it top to bottom when you're ready.

## Filled in (no action needed unless something is wrong)

| Item | Value used | Where |
|---|---|---|
| Advisor name | Rajeev Bansal | Footer disclosure, every page |
| Founder name | Rajeev Bansal | About: heading + portrait caption |
| City | Pleasanton, California | Footer "Correspondence" block, every page; About credentials |

## Removed - add back later

### 1. CA insurance license number `#[LICENSE]`
Removed from three spots:
- Footer of every page, the standalone line above the disclosure:
  `<p class="footer__license">CA Insurance License #[LICENSE]</p>`
  Reinsert it as the first child of `<div class="footer__legal">`.
- Footer disclosure sentence, which used to read
  `...Insurance Producer in the state of California, License #[LICENSE].`
  and now ends at `...state of California.` - append `, License #______` when you have it.
- About page credentials list, the row
  `<li data-reveal style="--d:.1s"><b>CA Insurance License</b><span>#______</span></li>`

### 2. Email and phone
Removed from the footer "Correspondence" column on every page. It now shows only the city.
Original markup to restore above the city line:
```html
<a href="mailto:YOUR@EMAIL">YOUR@EMAIL</a>
<a href="tel:+1XXXXXXXXXX">(XXX) XXX-XXXX</a>
```

### 3. Calendly scheduling panel (contact.html)
The whole "Choose a time" column was removed; the page now shows the inquiry form alone
under the label "Write to Us". To restore two-column scheduling + form:
- Change the label back to something like `Two Ways In`.
- Remove the inline `style="grid-template-columns:minmax(0,680px);..."` from
  `<div class="contact-grid">` so it returns to two columns.
- Add this as the first column, with your real Calendly URL:
```html
<div data-reveal style="--d:.1s">
  <h3 class="h-3" style="margin-bottom:26px">Choose a time</h3>
  <div class="calendly-inline-widget" data-url="https://calendly.com/YOUR-LINK" style="min-width:320px;height:640px;"></div>
  <script src="https://assets.calendly.com/assets/external/widget.js" async></script>
</div>
```
(The `.calendly-slot` placeholder styles are still in styles.css if you want the framed
panel back instead.)

### 4. Founder bio paragraphs (about.html)
Three paragraphs were removed between the "Rajeev Bansal" heading and the credentials
list. Add them back as `<p class="lede" data-reveal style="--d:.2s;margin-top:26px">` (and
`--d:.3s` / `--d:.4s`, `margin-top:24px` for the second and third). The prompts they held:
1. Two or three sentences, first person, on where you began: the industry you came from,
   what you saw there, and the moment you decided advice should be sold differently.
2. A paragraph on how you work: the kinds of clients you serve, what a long-term
   relationship with you actually looks like, and what you refuse to do.
3. A closing personal note: family, city, something human. One or two sentences.

### 5. Credentials rows (about.html)
Two rows were removed from the `.creds` list (a "Based in Pleasanton" row fills the gap
for now; replace or keep it as you like):
```html
<li data-reveal style="--d:.26s"><b>PRIOR FIRM OR ROLE</b><span>YEARS</span></li>
<li data-reveal style="--d:.34s"><b>EDUCATION</b><span>INSTITUTION</span></li>
```

### 6. "Adjust this paragraph" note (about.html)
The "Why Delphi" dark band kept its paragraph; only the bracketed editing note at the end
was removed. The paragraph is written in your voice - reread it and make it your own
telling when you do the bio.

### 7. "Finalize with counsel" flag (footer disclosure, every page)
The visible `[PLACEHOLDER: FINALIZE WITH COUNSEL]` tag was removed, but the obligation
was not: the disclosure paragraph is a conservative draft, not legal advice. Have counsel
review it before launch - especially now that it names Rajeev Bansal.

## Still open (were never bracketed placeholders)

- About page photo: the framed DW panel (`.portrait`) still stands in for a real portrait.
- Contact form backend: shows a confirmation but sends nothing until wired to a form
  service (Formspree / Basin / Netlify Forms) or your CRM.
- The old wordmark files `logo-light.png` / `logo-dark.png` are still used by the
  preloader (by request). The header, footer, and favicon now use the monogram
  (`logo-mark-light.png` / `logo-mark-dark.png`).
