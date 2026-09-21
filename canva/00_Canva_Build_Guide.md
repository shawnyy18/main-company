# Canva Build Guide — Client Package Documents

Read this once, set up the brand kit, then build the two documents. Everything after this is copy-and-paste.

---

## 1. Document setup

**Create → Custom size → 2480 × 3508 px** (A4 at 300dpi), or search Canva for **"A4 Document"**.

Do not use "Presentation" — these get read on a phone in Messenger, and 16:9 forces the reader to zoom.

**Margins:** 200px on all sides. Canva has no margin guide, so add four guides manually: **File → Settings → Show rulers**, then drag guides to 200 / 2280 (vertical) and 200 / 3308 (horizontal). Nothing crosses those lines except full-bleed colour blocks.

---

## 2. Brand kit

Set these once under **Brand → Brand Kit** so you never pick a colour by eye.

| Role | Hex | Where it goes |
| --- | --- | --- |
| Ink | `#0F1115` | All headings, all body text |
| Paper | `#FAF9F6` | Page background — never pure white |
| Amber | `#FBB114` | Accent rules, the recommended-tier badge, price underlines |
| Blue | `#1B6FE8` | Secondary accent only. Links, the care-plan block |
| Grey text | `#56544E` | Supporting copy, feature lists |
| Muted | `#8A877F` | Captions, page numbers, footnotes |
| Border | `#E4E1DA` | Hairlines between sections |

Amber and blue both come out of your logo mark. Do not add a fifth colour.

**Fonts** — Canva has both free:

| Use | Font | Size | Weight |
| --- | --- | --- | --- |
| Page titles | **Instrument Serif** | 96–130px | Regular |
| Tier names | Instrument Serif | 64px | Regular |
| Prices | Instrument Serif | 88px | Regular |
| Body and features | **Inter** | 30–34px | Regular |
| Labels, eyebrows | Inter | 22px | Medium, letter-spacing 200, ALL CAPS |
| Page numbers | Inter | 20px | Regular |

Instrument Serif matches the new website exactly, so the document and the site look like one company.

---

## 3. Rules that keep it from looking generic

These are the difference between "made in Canva" and "made by a design studio."

1. **No rounded corners.** Square everything — boxes, images, badges. Canva defaults to rounded; turn it off each time.
2. **No drop shadows, no gradients.** Separation comes from hairlines and whitespace.
3. **Hairlines, not boxes.** Use a 2px `#E4E1DA` line between sections instead of putting cards in outlined containers.
4. **One accent per page.** Amber appears once — on the recommended tier, or under a price. Not both.
5. **Left-align everything.** No centred body text. Centre only the cover title if you want.
6. **Generous whitespace.** If a page feels tight, move content to a new page. Pages are free.
7. **Numbered pages** in the bottom-left, mono-ish, `#8A877F`. Small detail, reads as considered.

---

## 4. The three assets you need before you start

1. **Logo, transparent PNG.** The current `fsk-logo-icon.png` has a dark square baked in. Export a version with just the blocks on transparent so it can sit on paper. In Canva you can also place the dark version inside a small `#0F1115` square — that works, but transparent is cleaner.
2. **Marketlink screenshot.** `public/work/marketlink-home.jpg` in the repo. This is your proof page.
3. **Lenso screenshot.** `public/work/lenso-1.png` — already cropped to the device, no App Store captions.

---

## 5. How to reuse this per client

Build each document once as a **Canva Template**, then for every prospect:

1. **Make a copy** — never edit the master.
2. Change the **cover subtitle** to their business name: *"Prepared for [Business Name]"*.
3. Delete the tiers that are clearly wrong for them. A solo dentist does not need to see the ₱49,999 tier; sending three options instead of four raises the chance they pick one.
4. On the recommended tier, move the amber **"Recommended for you"** badge to whichever tier you actually recommend.
5. Update the **valid-until date** on the terms page — 14 days from sending.
6. **Share → Download → PDF Standard.** Not PDF Print — the file gets large and nobody is printing this.

Name the file `FSK-[Business Name]-Packages-[YYYY-MM-DD].pdf`. It looks deliberate and it stops you sending a stale version.

---

## 6. One thing to get right

The **care plan page is not optional and not an upsell.** In both documents it sits immediately after the tiers, before the terms, and the entry tier states plainly that a 12-month plan is included in the price.

If you present it as an add-on, most clients decline and your entry tier goes back to earning a junior hourly rate. If you present it as part of how the package works, most clients accept — because at handover they are thinking about who fixes the site when it breaks, not about saving ₱1,500.

---

*Files: `01_Business_Website_Pack.md` · `02_Real_Estate_Pack.md`*
