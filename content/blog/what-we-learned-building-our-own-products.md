---
title: "What We Learned Building Our Own Software Products"
description: "Client work and product work reward different instincts. Notes from building Lenso — an iOS app we own — and what it changed about how we scope, decide, and say no."
category: case-studies
publishedAt: 2026-06-09
keywords:
  - product building
  - case study
  - lenso
  - ios development
  - supabase
  - software products
---

FSK Codehouse does three kinds of work: we build for clients, we build with partners, and we build our own products. The third one is the smallest slice of our time and by far the most instructive, because it removes the thing client work always supplies — someone else deciding what "done" means.

[Lenso](/apps/lenso) is our iOS app. It's a private photo-sharing and messaging app for close friends: you send real moments, keep up through a home screen widget, chat one-on-one or in groups, and schedule time capsules to arrive later. It hasn't launched yet, so there are no results to report and no numbers to quote. What there is, is a list of things we now do differently.

> [!NOTE]
> This is a working note, not a success story. Lenso is still pre-launch. Everything below is about the building, not the outcome.

## Owning the product changes which questions get asked

On client work, scope arrives as a requirement. Someone has decided the app needs group chat, and the job is to build good group chat.

On your own product, nobody hands you that. You have to ask whether group chat earns its place — against the build cost, the moderation burden, the support load, and the surface area it adds to every future change. The honest answer is sometimes no, and there's no one to overrule you.

The habit this builds is useful everywhere. We now push harder on *why* a feature is in scope during client discovery, because we've felt what it costs to carry one that didn't need to be there.

## The widget reached back into everything

Lenso's premise is that you keep up with close friends without opening the app. That makes the home screen widget a core feature rather than a companion.

Widgets are a genuinely different constraint. They render on the system's schedule, from cached data, without running your full app, and they need to be fast and correct with whatever they already have. You can't fetch on demand and hope.

That single requirement shaped decisions well outside the widget:

- What gets cached locally, and in what shape.
- How fresh "fresh enough" is, and who decides.
- Which data has to be available offline versus fetched on open.
- How the app and the widget stay consistent without duplicating logic.

The lesson generalises: **the feature with the tightest constraint should be designed first**, because it will silently constrain everything else. Designing the main feed first and bolting a widget on afterwards would have meant rebuilding the data layer. This is also part of why Lenso is native rather than cross-platform — a decision we unpack in [React Native vs native development](/blog/react-native-vs-native-development).

## Backend choices are decisions you live inside

Lenso uses Supabase for authentication, database, realtime, storage, and backend functions. Consolidating those into one platform was the right call for a small team — but it means the data model and the permission model are the same conversation.

With row-level security, "who can see this?" stops being application logic and becomes part of the schema. That's better, because the rule lives next to the data instead of scattered across screens. It's also less forgiving, because a permissive policy is a real problem rather than a bug in one code path.

What we'd tell ourselves at the start:

- **Write the access rules down before writing the schema.** Not after. They're a design input.
- **Test the negative cases.** It's easy to verify that a friend can see a moment. What matters is proving that a non-friend can't.
- **Plan the deletion path early.** Storage cleanup, orphaned media, and account deletion are all much harder to retrofit than to design in.

That last point isn't optional, incidentally — the App Store requires apps with accounts to offer in-app account deletion, and doing it properly means knowing everywhere a user's data lives.

## Compliance is a feature, not paperwork

We knew the store requirements. We still underestimated how much of them is product design rather than a checklist at the end.

An app where people share content with each other inherits real obligations: reporting, blocking, a way to act on abuse, and a policy someone actually has to enforce. Account deletion needs a screen, a confirmation, and a backend that genuinely removes things. Push notifications need a permission moment that makes sense to the user, which means deciding *when* to ask.

All of that is UI, copy, backend work, and product thinking. Treated as paperwork, it becomes a scramble a week before submission. Treated as features, it gets scoped like features. We now put them in the build plan from day one on every project — ours and our clients'. The [App Store submission checklist](/blog/app-store-submission-checklist) is essentially the list we wrote for ourselves.

## Decide how it makes money before you build it

Lenso is planned to show advertising to free accounts through Google AdMob. Knowing that early mattered more than we expected, because "there will be ads in the feed" is a design constraint, not a switch you flip later.

Where they sit, how often, what happens to scroll position, how they interact with pagination, and what a paid account removes — all of that is easier to answer while the feed is being built than after it's finished. A monetisation model bolted onto a finished product tends to fight it.

## The discipline that actually matters is saying no

Client projects have a natural brake: a budget, a scope document, a date. Your own product has none of those, and there is always one more thing that would make it better.

What worked for us was writing down, in advance, what the first release is *not*. Not a backlog — an explicit list of good ideas that are deliberately out. When the temptation came around a third time, the answer already existed and didn't need re-litigating.

## What this changed about client work

The point of building our own products isn't the products. It's that a few things stop being abstract:

- We scope store compliance, account deletion, and moderation as features from the start.
- We ask what has the tightest technical constraint and design that first.
- We push clients to name what's *out* of the first release, not just what's in.
- We treat monetisation as an architectural input rather than a later decision.
- We're more sceptical of features that sound obviously good.

When Lenso ships we'll write about what actually happened, including the parts that didn't go to plan. Until then, this is what we know.

If you're building something of your own and want a team that has felt these tradeoffs from the inside, [tell us what you're working on](/#contact).
