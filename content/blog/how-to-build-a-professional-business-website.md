---
title: "How to Build a Professional Business Website"
description: "What separates a website that brings in work from one that just exists: structure, speed, trust signals, and the handful of technical details that actually affect whether Google shows you to anyone."
category: web-development
publishedAt: 2026-06-23
keywords:
  - business website
  - web development
  - seo
  - core web vitals
  - lead generation
---

Most business websites fail quietly. They load, they look acceptable, nobody complains — and they generate almost nothing. The failure isn't visual. It's that the site was built as a brochure when the business needed a sales tool.

Here's what we look at when building one that works.

## Start with the job the site has to do

Before choosing a stack or a template, answer one question: **what should a visitor do here?**

For most service businesses there is exactly one primary action — start an enquiry — and two or three secondary ones: understand what you do, see proof you can do it, find how to contact you another way. Every page should be answerable against that list.

If a page doesn't move someone toward the primary action or build the credibility that makes it possible, it's decoration.

### The structure that works for most service businesses

- **Home** — what you do, who for, and the single clearest path to contact.
- **Services** — one section or page per offering, in the customer's language.
- **Proof** — work you've done, products you've built, or specifics that show competence.
- **About** — who you are and why you're credible. People buy from people.
- **Contact / start a project** — a short form and a real email address.
- **Legal** — privacy policy, cookie policy, terms if you sell anything.

That's usually enough to launch. Blogs, resources, and case study libraries come after the core works — not instead of it.

## Write the content before designing the pages

This is the step almost everyone skips, and it's the one that determines whether the site reads as confident or generic.

Design built around real copy fits the message. Design built around placeholder text forces the message to fit the layout, and you end up with three-word headlines that say nothing because that's what the space allowed.

Write the headline, the supporting paragraph, and the button label for each section first. If you can't write a clear headline for a section, the section probably doesn't need to exist.

> [!TIP]
> A good test for service copy: could a competitor put their name on this sentence without changing anything? If yes, it isn't saying enough.

## Speed is not a technical detail

Google's Core Web Vitals are a confirmed ranking signal, and while they act more as a tie-breaker between similarly relevant pages than as an override for content quality, the bigger effect is on conversion. Slow, unstable pages lose people before the content gets a chance.

The thresholds Google treats as "good", measured on real visitors at the 75th percentile:

| Metric | Measures | Good |
| --- | --- | --- |
| LCP (Largest Contentful Paint) | Loading | Under 2.5s |
| INP (Interaction to Next Paint) | Responsiveness | Under 200ms |
| CLS (Cumulative Layout Shift) | Visual stability | Under 0.1 |

Anything above 4.0s LCP, 500ms INP, or 0.25 CLS is rated poor.

The practical things that move these:

- **Serve images at the size they're displayed**, in a modern format, with `width` and `height` set so the browser reserves space. Unsized images are the most common cause of layout shift.
- **Lazy-load anything below the fold**, and only below the fold. Lazy-loading your hero image makes LCP worse.
- **Ship less JavaScript.** Most marketing sites need very little. Every animation library is a tax paid by every visitor.
- **Reserve space for anything that loads late** — embeds, ads, cookie banners.
- **Use a framework that renders on the server.** Static or server-rendered HTML gets content on screen without waiting for a bundle.

## The SEO that actually matters

Ignore the checklists with sixty items. For a business website, a small number of things do nearly all the work.

**Unique title and meta description per page.** Not templated, not duplicated. The title is what people see in results; write it for a human deciding whether to click.

**One `<h1>` per page**, describing what the page is about, with a sensible `<h2>`/`<h3>` hierarchy underneath. This isn't a ranking trick — it's how the page gets understood by search engines and screen readers alike.

**Canonical URLs**, so the same content at two addresses doesn't compete with itself.

**A sitemap and a robots file**, and a check that you haven't accidentally blocked the pages you care about. This happens more often than you'd think, usually when a staging configuration reaches production.

**Structured data** describing your organisation, so search engines can connect your name, logo, and profiles:

```json title="Organization JSON-LD"
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Company Ltd.",
  "url": "https://yourcompany.com",
  "logo": "https://yourcompany.com/logo.png",
  "sameAs": [
    "https://www.linkedin.com/company/yourcompany",
    "https://www.facebook.com/yourcompany"
  ]
}
```

**Real content on the page.** Search engines are not fooled by a site with beautiful transitions and four sentences of text. If you want to rank for what you do, the site has to say what you do, at length, in words people actually search for.

## Make the contact path effortless

The enquiry form is the most important element on the site, and it's frequently the worst-built one.

- **Ask for as little as possible.** Name, email, and a message will do. Every additional field costs you submissions.
- **Show a real confirmation.** Not a silent page reload — a clear message that it worked.
- **Handle failure visibly.** If the send fails, say so and keep what they typed.
- **Publish an email address too.** Some people won't use a form, and a visible address is itself a trust signal.
- **Make sure someone reads it.** Forms that route to an unmonitored inbox are worse than no form.

## Accessibility is table stakes

It also overlaps almost completely with good engineering:

- Semantic HTML — real buttons, real links, real headings.
- Every interactive element reachable and usable by keyboard.
- Visible focus states, not `outline: none`.
- Alt text on meaningful images, empty alt on decorative ones.
- Text contrast that holds up on a phone in daylight.

Sites that do this are easier for search engines to parse and easier for everyone to use. There is no tradeoff to manage.

## Measure the two things that matter

You need to know how many people arrive and how many enquire. That's it, at first.

Search Console tells you what people searched to find you and which pages they landed on. An analytics tool tells you where traffic comes from and where it stops. Beyond those two, most measurement is a distraction until you have enough traffic for the numbers to mean anything.

If you set cookies for analytics or advertising, get consent properly and give people a way to change their mind — a requirement in a growing number of jurisdictions, and a reasonable thing to do regardless.

## Launching is the start

A website is not a project that finishes. The version that launches is a hypothesis. What makes it good over time is that someone looks at the search queries, notices which pages people leave from, and keeps improving the copy.

The sites that generate work are almost never the most beautiful ones. They're the ones where somebody kept asking whether it was doing its job.

If you'd like us to take a look at yours — or build the next one — [tell us about the project](/#contact).
