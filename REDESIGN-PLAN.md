# FSKLanding Redesign Plan

**Status:** Plan only — no code changes made.
**Date:** August 18, 2026
**Decisions locked:** Editorial/studio direction · Two services (digital product commerce removed) · Real projects replace the mockup animation

---

## 1. Why the site reads as generic

This is a diagnosis from the actual code, not a vibe. Each item is a specific, fixable tell.

| # | Tell | Where |
| --- | --- | --- |
| 1 | Pill badge above an H1, then two `rounded-full` CTAs side by side — the single most common AI-generated hero pattern in existence | `page.tsx:59–83` |
| 2 | `#4f46e5` — Tailwind's default indigo-600, untouched | `globals.css:13` |
| 3 | `hover:-translate-y-0.5` repeated on every interactive element. One micro-interaction doing all the work | `page.tsx`, `Navbar.tsx`, `about/page.tsx` |
| 4 | Three equal service cards numbered 01/02/03 | `page.tsx:106–125` |
| 5 | Headlines are aphorisms, not claims: "Three focused ways we create value." / "The right model for the right idea." / "Software we believe should exist." They could belong to any company | `page.tsx` |
| 6 | 100 lines of hand-drawn fake UI inside `page.tsx` + 190 lines of keyframes in `globals.css`, cross-fading on a 12-second loop. It is decoration pretending to be product | `page.tsx:228–330`, `globals.css:104–295` |
| 7 | **Zero proof.** No client names, no live URLs, no case studies, no metrics, no screenshots of anything real | site-wide |
| 8 | A whole section that says nothing: "Strategy, design, engineering, and launch stay connected." | `page.tsx:181–194` |
| 9 | `apps.ts` contains one app; the section header says "Software we believe should exist" (plural, grand) | `page.tsx:163`, `apps.ts:22` |
| 10 | Inter — a good typeface, and the default choice of ~40% of the web | `layout.tsx:9` |

**Root cause:** the site describes capability instead of showing work. Every generic tell above is a symptom of having nothing concrete to put on the page. Fixing the design without fixing that produces a prettier generic site.

---

## 2. What I need from you before Phase 3

You said there are real builds not in this repo. I can't plan the work section around projects I haven't seen. Fill this in for each one — 2 to 4 projects is the right number.

```
PROJECT [n]
Name:                    [project or client name — or "Confidential" + industry]
Live URL:                [if public]
Year:                    [2025 / 2026]
Category:                [Real estate / Web app / Mobile app / Internal tool]
What it does:            [one sentence a non-technical person understands]
The problem:             [what was broken or missing before]
What we built:           [3–5 bullet points of actual scope]
Stack:                   [Next.js, Supabase, Swift, etc.]
Outcome:                 [only if true and provable — otherwise leave blank]
Assets:                  [screenshots / recordings / can I screenshot the live site?]
Can we name the client:  [yes / no]
```

**On honesty:** if there's no outcome metric, we say nothing rather than inventing "40% faster." Named scope with real screenshots outperforms invented numbers, and invented numbers are the thing prospects check.

**If assets are thin:** I can capture live sites in a browser at proper resolution, and for private builds we present anonymized UI with the client described by industry ("a Metro Manila brokerage"). Both are legitimate.

---

## 3. Design direction — editorial / studio

Concrete decisions, not adjectives.

### Typography
- **Display:** a real editorial face. My recommendation: **Instrument Serif** (free, Google Fonts, distinctive without being trendy) for H1/H2 only. Alternatives if you want sans: **Bricolage Grotesque** or **Geist**.
- **Body:** keep Inter — it's fine as a supporting face and already loaded.
- **Scale:** widen the jump. Display 76–112px desktop / 40–48px mobile. Body up to 18px, line-height 1.6.
- **Detail:** `text-wrap: balance` on headings, tighter tracking (`-0.03em`) on display sizes.

### Color
- Drop indigo entirely.
- **Paper:** `#FAF9F6` (warm off-white) instead of pure white.
- **Ink:** `#0F1115` (already correct — keep).
- **Accent:** one only. The amber `#FBBF24` already living in your logo ring is a defensible choice and ties to the brand mark. Used sparingly — rules, active states, one CTA.
- Surfaces defined by hairline rules, not grey fills.

### Form
- **Hard corners.** Remove `rounded-full` and `rounded-2xl` everywhere. Buttons become rectangles with a 1px border or solid ink fill. The preview windows already use hard edges — lean into it.
- **Visible structure:** hairline rules between sections, section numbers in mono, generous whitespace.
- **Asymmetry:** no more 1fr/1fr/1fr. Content sits on an intentional grid where columns are unequal.
- **Shadows:** delete almost all of them. Editorial layouts use rules and space, not `shadow-2xl`.

### Motion
- Delete the 12-second CSS loop entirely.
- Replace with: scroll-triggered reveals (short, 300ms, opacity + 8px translate), and real image transitions in the work section.
- `prefers-reduced-motion` must actually disable everything — the current implementation hides two windows on reduced motion, which breaks the layout.

---

## 4. New homepage structure

Current → proposed:

| Now | Proposed |
| --- | --- |
| Hero + fake animated preview | **Hero** — a claim, not a slogan. Real work visible above the fold. |
| Services (3 cards) | **Selected work** — 2–4 real projects. This is the new center of gravity. |
| Partnerships (3 models) | **Services (2)** — real estate systems, web & mobile apps. |
| Products (Lenso) | **How we work** — the Build for you / with you / by FSK model, compressed to one tight row. It's true and it's differentiating, so it stays. |
| "One accountable team" filler | **Products** — Lenso, with the 8 real screenshots you already have in `/public`. |
| Contact | **Contact** — same form, restyled. |
| | *"One accountable team" section: deleted.* |

**Hero copy:** replace "We turn ideas into software people can use." That sentence fits any software company on earth. Direction — say what you build and who for: *"Real-estate platforms and mobile products, built in the Philippines."* Final wording once I see the project list.

**New routes:**
- `/work` — index of all projects
- `/work/[slug]` — case study pages, following the pattern `apps/[appname]` already establishes

---

## 5. Removing "Digital product commerce"

Mechanical and safe. Every location confirmed by grep:

| File | What changes |
| --- | --- |
| `src/app/page.tsx` | `services[1]` object (L16–22) · `preview-commerce` window (L288–305) · "02 Commerce" tab (L253) · hero paragraph (L66–68) |
| `src/app/globals.css` | Entire preview animation block (L104–295) is removed as part of the redesign anyway |
| `src/app/about/page.tsx` | "digital commerce experiences" (L46–49) · CTA copy (L82–84) |
| `src/components/Footer.tsx` | Description line (L26–27) |
| `src/app/layout.tsx` | `description` (L21), `keywords` (L22–31), OG + Twitter descriptions (L41, L56) |
| `src/lib/blog/structured-data.ts` | Organization schema services |
| `src/components/ProjectLeadForm.tsx` + `src/app/api/leads/route.ts` | Project-type options — must stay in sync, the API likely validates against the list |
| `src/app/privacy/page.tsx` | Service description, if present |

**Leave alone:** `content/blog/what-we-learned-building-our-own-products.md` — editorial content, still true, and unpublishing it would break URLs.

**Watch:** the `/api/leads` route may validate project type server-side. Both ends change together or the form breaks silently.

---

## 6. Sequencing

| Phase | Work | Blocked by |
| --- | --- | --- |
| **0** | You fill in the project intake (§2) | — |
| **1** | Remove digital product commerce site-wide | — (can start now) |
| **2** | Design tokens: fonts, color, radius, motion. `globals.css` + `layout.tsx` | — |
| **3** | `src/lib/projects.ts` + `/work` + `/work/[slug]` | Phase 0 |
| **4** | Homepage rebuild — hero, work section, services, products | 2, 3 |
| **5** | Propagate to About, Footer, Navbar, blog CTA, OG image | 4 |
| **6** | Verify: `next build`, mobile 375px, reduced-motion, Lighthouse, no dead anchors | 5 |

Phases 1 and 2 are unblocked and independently shippable. I'd suggest starting there while you gather project details.

---

## 7. Risks and constraints

- **The blog is large and working.** ~40 files under `components/blog` and `lib/blog` with their own scoped CSS. Design tokens are shared, so a color/radius change will reach the blog — needs a visual pass, but no structural changes there.
- **Don't touch:** `apps/[appname]` legal pages. The Lenso privacy/terms content is App Store-facing and referenced by Apple. Restyle only, never reword.
- **AdSense + cookie consent** are wired in (`AdSlot`, `CookieConsent`, `consent.ts`). Leave the logic alone.
- **`og-fsk.svg`** will need regenerating once the visual identity changes.
- **Scope discipline:** this is a redesign of one landing page plus a new work section. Not a rebuild of the blog, the app pages, or the legal system.

---

## 8. Open questions

1. **Fonts** — Instrument Serif for display, or stay all-sans?
2. **Accent** — amber from the logo, or a different brand color you have in mind?
3. **Real estate specificity** — is there one property client whose work anchors the whole positioning? That changes the hero from generic to sharp.
4. **`/work` in the nav** — replace "Services" with "Work" as the first nav item? Work-first is the studio convention.
