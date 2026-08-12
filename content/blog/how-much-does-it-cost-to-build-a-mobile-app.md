---
title: "How Much Does It Cost to Build a Mobile App in 2026?"
description: "Why there is no single price for an app, which decisions actually move the number, and what to prepare so a quote reflects reality instead of guesswork."
category: app-development
publishedAt: 2026-07-28
featured: true
keywords:
  - app development cost
  - mobile app budget
  - app scoping
  - ios development
  - project estimation
---

It is the first question almost every client asks, and it is the hardest one to answer honestly in a single sentence. "How much does an app cost?" is close to asking how much a building costs. A studio flat and a hospital are both buildings.

What we can do is something more useful than a made-up number: explain exactly which decisions move the cost, which costs are fixed and knowable, and what to bring to a conversation so the estimate you get is grounded in your actual project rather than in averages from someone else's.

## Why we don't publish a price table

Price tables for app development are usually one of two things: a marketing device, or an average of projects that have nothing to do with yours. Both are misleading.

The reason is that almost all of the cost in an app is **engineering time**, and engineering time is driven by scope and complexity, not by the category the app falls into. Two apps that both get described as "a social app for sharing photos" can differ by a factor of five in effort depending on whether messages are real-time, whether there is a home screen widget, whether content is moderated, and whether it ships on one platform or two.

So instead of prices, this article talks in **build effort** — roughly how much work a feature adds. Multiply that by whatever rate your team or agency charges and you get a number that is actually about your project.

> [!NOTE]
> The one place we can be exact is the platform fees, because Apple and Google publish them. Everything else depends on scope.

## The costs that are fixed and knowable

These are the same for everyone and worth budgeting for separately from build cost.

| Item | Cost | Notes |
| --- | --- | --- |
| Apple Developer Program | $99 per year | Required to ship on the App Store, and to keep the app listed. |
| Google Play Console | $25 one-time | Charged once at registration, for the life of the account. |
| Domain name | Low, annual | For your marketing site, support page, and privacy policy. |
| Backend hosting | Usage-based | Small at launch; grows with users and stored media. |
| Media storage and delivery | Usage-based | The line item most often forgotten in photo and video apps. |
| Analytics / crash reporting | Free tier is usually enough early | Paid tiers matter once traffic grows. |

Two things to note. First, the Apple fee is **recurring** — if it lapses, your app comes off the store. Second, storage and bandwidth are the costs that scale with success, so they belong in your plan even if they are near zero on day one.

## What actually drives the build cost

### 1. How many platforms you ship

This is the single biggest lever. Shipping iOS only, then Android later, is a genuinely different project from shipping both at once — not just in code, but in design review, QA, store submissions, and support. We wrote about how to make that call in [React Native vs native development](/blog/react-native-vs-native-development).

### 2. Whether your data is real-time

A feed that refreshes when you pull down is straightforward. A feed that updates live, with read receipts, typing indicators, and consistent state across devices, is a different class of problem. Real-time features touch the data model, the backend, the client cache, and the offline behaviour all at once.

### 3. How much of the app is "just screens"

Screens are the cheap part. What costs money is everything hanging off them:

- **Authentication** — sign-up, sign-in, password reset, session handling, and account deletion (which the App Store requires in-app for any app with accounts).
- **Permissions** — camera, photo library, notifications, location. Each one needs a request flow, a denied state, and a settings path.
- **Offline and failure states** — what the app does with no signal, a failed upload, or a half-finished action.
- **Media handling** — capture, compression, upload, retry, caching, and cleanup. This is consistently underestimated.

### 4. Platform integrations

Home screen widgets, share extensions, background refresh, push notifications, deep links, in-app purchases, and Sign in with Apple all sit outside the main app and each carries its own build, test, and review overhead. A widget in particular tends to reshape your data model, because it has to render quickly from cached data without running your full app.

### 5. Design maturity

If you arrive with a finished, opinionated design system, engineering starts immediately. If design happens alongside the build, expect rework — not because anyone did a bad job, but because decisions get made twice.

### 6. Compliance and content safety

If users can post content that other users see, you inherit obligations: reporting, blocking, moderation, and a way to respond to abuse. These are App Store requirements, not nice-to-haves, and they are a real slice of the build. Our [App Store submission checklist](/blog/app-store-submission-checklist) goes through them.

## A more honest way to scope

Rather than asking "what does an app cost", break the app into three buckets and be ruthless about the third.

```text
MUST SHIP     The app is pointless without this.
SHOULD SHIP   Materially better with it, but launchable without.
LATER         Genuinely valuable, genuinely not now.
```

Then, for each item in the first bucket, write down the states it needs — not just the happy path:

```text
Feature: Upload a photo
  - Empty state (no photos yet)
  - Capture / pick from library
  - Permission denied
  - Upload in progress
  - Upload failed, retry
  - Offline, queued
  - Success
```

Seven states, one feature. Doing this exercise for your five core features tells you more about cost than any calculator will, and it is the single most useful document you can bring to a quote.

## Where projects go over budget

In our experience the overruns are rarely technical surprises. They are usually one of these:

- **Scope that arrives late.** A feature added in month three costs more than the same feature in month one, because it has to fit around what already exists.
- **Decisions that stay open.** Waiting on a decision is expensive in a way that does not show up on any invoice until the end.
- **No definition of done.** Without a written scope, "finished" is a matter of opinion, and opinions are unbounded.
- **Skipping the boring parts.** Analytics, error reporting, and store compliance are easy to defer and painful to retrofit.
- **Content.** Copy, imagery, and legal text are almost always the last thing to arrive and the first thing to block a submission.

## What to bring to a quote

If you want an estimate that means something, come with:

1. **The problem, in one paragraph.** Not the solution — the problem.
2. **Who it is for**, specifically enough that you could name three of them.
3. **Your must-ship list**, ideally with the states written out as above.
4. **Platform intent** — iOS first, both at once, or web too.
5. **Anything that already exists** — an API, a database, a brand, a design file.
6. **Your real constraint** — a launch date, a fixed budget, or a demo you have to make.

That last one matters more than people expect. A fixed budget is not a problem; it is a design constraint. Told early, it shapes scope sensibly. Discovered late, it stops a project.

> [!TIP]
> If your budget is genuinely fixed, say so at the start. A good team will scope to it. The alternative is a proposal you can't accept and a month lost.

## The short version

There is no honest average. There is only your scope, your platforms, and how clearly the work is defined before it starts. Fixed costs are small and knowable. Everything else follows from decisions you control — most of which are cheapest to make right now, before anyone writes code.

If you're working through this and want a second opinion on scope before you commit to a build, that's a conversation we're happy to have.
