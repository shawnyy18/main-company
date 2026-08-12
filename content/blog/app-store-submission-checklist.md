---
title: "How to Prepare Your App Before Submitting to the App Store"
description: "The requirements that reject apps are rarely the ones teams worry about. A practical checklist covering account deletion, privacy, user-generated content, and what to test on real devices."
category: app-development
publishedAt: 2026-05-05
updatedAt: 2026-07-30
keywords:
  - app store review
  - ios submission
  - app store guidelines
  - account deletion
  - app privacy
---

Most App Store rejections aren't caused by anything exotic. They're caused by requirements that are well documented, easy to satisfy, and left until the week of submission — when satisfying them means backend work, new screens, and legal copy nobody has written.

This is the list we work through before submitting. It's written for iOS, though most of it applies to Google Play with different names.

> [!IMPORTANT]
> Treat everything here as a feature to be scoped, not a form to fill in at the end. Several of these items require backend work.

## Accounts

### In-app account deletion

If your app lets people create an account, it must let them delete that account **from inside the app**. Not a link to a web form, not an email to support — an in-app path that's easy to find, usually in settings.

Deletion has to actually remove the account and its data, except where you're legally required to retain something. That means knowing everywhere a user's data lives: their rows, their uploaded media, their memberships in shared content, and anything cached elsewhere.

Questions to answer before you build it:

- What happens to content the user shared with other people?
- What happens to groups or conversations they created?
- Is media in storage deleted, or just the database rows pointing at it?
- Is there a confirmation step, and is it clear that this is permanent?
- Is anything retained for legal or accounting reasons, and does your privacy policy say so?

This is consistently the requirement that costs the most to retrofit, because it exercises every part of your data model at once.

### Sign-in

- If you offer third-party sign-in, check whether an equivalent privacy-preserving option is required for your case.
- Account creation should be necessary. If core features work without an account, gating them behind one invites questions.
- Deleting the app should not be the only way to sign out.

## Privacy

- **Privacy policy URL** — live, reachable, and specific to your app. A generic company policy that doesn't mention what the app collects is a weak answer.
- **Privacy declarations** — the data your app and every SDK in it collects, declared accurately. Accuracy matters more than minimalism; a wrong declaration is worse than a broad one.
- **Privacy manifests** — required for the app and for third-party SDKs that fall under the rules. Check every dependency, including ones pulled in transitively.
- **Permission prompts** — every permission needs a usage description that explains *why*, in plain language. "This app needs camera access" is not a reason.
- **AI services** — if your app sends user data to an external AI provider, expect to need a consent screen that names the provider and explains what's being shared.

Ask permission at a moment where it makes sense. A camera prompt on first launch, before the user has seen anything, gets denied — and a denied permission is expensive to recover.

## User-generated content

If users can post, message, or upload anything other users see, you take on a set of obligations. Missing these is a common and avoidable rejection.

| Requirement | What it means in practice |
| --- | --- |
| Report content | A path to flag a specific post, message, or user. |
| Block users | A way to stop another user from contacting or seeing them. |
| Filter objectionable content | Some mechanism, even if simple, plus a policy. |
| Act on reports | A stated timeframe and a real process behind it. |
| Published terms | Terms of use that set out what isn't allowed. |
| Contact route | A way to reach you about abuse. |

Note that these are product features — screens, backend, and someone's time — not settings. Scope them accordingly.

## Push notifications

- Ask at a moment that makes the value obvious, not on launch.
- The app must work if permission is refused.
- Push must not be required to use the app.
- Don't use notifications for marketing without appropriate consent.
- Test the full path on a real device: permission granted, denied, revoked in Settings, and app terminated.

## Metadata and assets

- **App name and subtitle** — accurate, no keyword stuffing.
- **Screenshots** — from the actual app, at the required sizes, showing real functionality. No misleading composites.
- **Description** — matches what the app does. Don't describe features that aren't in this build.
- **Age rating** — answered honestly, and consistent with the presence of user-generated content.
- **Support URL** — a real page where someone can get help.
- **What's New** — meaningful, not "bug fixes and improvements" on a first release.
- **Demo account** — if any feature is behind a login, provide working credentials in review notes. An account that has expired or been rate-limited is a guaranteed delay.

## In-app purchases

- Digital goods and services go through in-app purchase.
- Restore purchases must exist and must work.
- Prices and terms must be clear before the user commits.
- Subscriptions need their terms, renewal behaviour, and cancellation path visible.
- Test the full purchase, restore, and cancellation flow in the sandbox before submitting.

## Technical readiness

- Builds against a current SDK and runs on currently supported OS versions.
- No placeholder text, test data, or debug UI anywhere in the shipping build.
- No crashes on launch, and no crash on first run with a clean install.
- Works on the smallest and largest supported screen sizes.
- Handles no network, slow network, and network lost mid-action.
- Handles being backgrounded and resumed at every step of a long operation.
- Respects Dark Mode and Dynamic Type if you claim to support them.

## What to test on real devices

Simulators hide the failures that get apps rejected. Before submitting, test on physical hardware:

- **A small device and a large one.** Layout clipping and unreachable buttons show up at the extremes.
- **Camera and photo library.** Permission granted, denied, and limited-access selection.
- **Push notifications**, end to end, with the app closed.
- **Widgets**, if you have them: fresh install, no data yet, stale data, and every supported size.
- **Poor connectivity.** Use a network link conditioner. Most upload bugs only appear on a slow connection.
- **Low storage and low battery**, if your app captures or stores media.
- **A clean install**, exactly as a reviewer will experience it. Not your development device with two months of state on it.

That last one catches more problems than anything else on this list.

## Before you hit submit

1. Every URL in App Store Connect resolves — privacy policy, support, marketing.
2. The demo account works, right now, on the submitted build.
3. Review notes explain anything non-obvious, including how to reach features behind conditions.
4. The build number is new and the version is correct.
5. Someone who didn't build the app has installed it fresh and used it.

## If you're rejected

It's routine, and usually specific. Read the message carefully — it names a guideline. Fix the actual issue rather than the one you assume it means, reply in Resolution Center with what changed, and resubmit. If you believe the reviewer has misunderstood, you can explain; do it politely and with detail.

Budget for at least one round. Teams that assume first-time approval and schedule a launch event around it are the ones who end up shipping something rushed.

---

We work through this list on every iOS project, including [our own](/blog/what-we-learned-building-our-own-products). If you'd like help getting an app submission-ready — or a second pair of eyes before you submit — [get in touch](/#contact).
