---
title: "How AI Is Changing Modern Software Development"
description: "A working view of where AI-assisted development genuinely helps, where it quietly costs you, and the review discipline that decides which one you get."
category: ai-development
publishedAt: 2026-05-19
keywords:
  - ai development
  - ai coding assistants
  - code review
  - developer productivity
  - software engineering
---

The discourse around AI and software development tends to arrive in two flavours: it changes everything, or it's a stochastic parrot that writes plausible nonsense. Neither matches what it's like to use these tools on real work every day.

What follows is a practitioner's view — what has actually changed in how software gets built, what hasn't, and the habits that separate teams who get value from it from teams who get technical debt with good grammar.

## What genuinely changed

### The cost of starting

The blank file used to be a real tax. Not the hard part of engineering, but a persistent friction — scaffolding, boilerplate, the shape of a config you've written twenty times and still look up.

That friction is mostly gone. The value isn't that the generated code is brilliant; it's that you're editing something instead of producing something, and editing is a faster mode to think in.

### Working in unfamiliar territory

The bigger shift is in how quickly you can become *productive-enough* in something you don't know well. A new API, an unfamiliar language, a codebase convention you haven't met.

This is also the sharpest edge. Confidence in an area you can't evaluate is exactly the situation where wrong answers survive. Which brings us to the actual skill.

### Tests and the boring middle

Test scaffolding, fixtures, edge-case enumeration, mechanical refactors, migration scripts, one-off data transformations — work that is necessary, well-specified, and dull. This is where assistance pays most reliably, because the correctness criteria are clear and the review is fast.

### The first pass of code review

Not as a replacement for review, but as a pass that catches the obvious before a person spends attention on it. Unhandled errors, missing null checks, an inconsistency with the file three directories over. Cheap to run, occasionally genuinely useful.

## What hasn't changed at all

**Understanding the problem.** Deciding what to build, for whom, and what "correct" means is untouched. Software failures are usually specification failures, and those happen upstream of any code.

**Architecture.** These tools optimise locally. They'll happily produce a well-written function that belongs in a different module, or a component that duplicates one that already exists two folders away. Nobody is holding the shape of the system but you.

**Accountability.** When it breaks in production, "the assistant wrote it" is not an explanation. You shipped it, therefore you wrote it.

**Judging tradeoffs.** Whether to add a dependency, whether the fast approach or the maintainable one is right for this deadline, whether a feature is worth its complexity — these are judgement calls informed by context that isn't in the codebase.

## Where it quietly costs you

> [!WARNING]
> The failure mode isn't code that doesn't work. It's code that works, looks right, and is subtly wrong in a way that gets found in production.

**Fluent wrongness.** Human-written wrong code often looks uncertain — an odd variable name, a strange structure, something that makes a reviewer pause. Generated wrong code reads exactly like generated right code. The usual smoke detectors don't fire.

**Security.** Authentication, authorisation, input validation, and anything touching secrets deserve heightened scrutiny. A plausible-looking permission check is a genuinely dangerous artefact.

**Invented APIs and packages.** Methods that don't exist, options that were never in the library, packages that were never published. Usually caught by the compiler; not always.

**Stale patterns.** Framework conventions move. Advice confidently reflecting the previous major version is common, and it compiles.

**Silent complexity growth.** When writing code is cheap, more of it gets written. Abstractions appear that nobody needed. The codebase grows faster than the understanding of it.

## The discipline that makes the difference

The most useful mental model we've found: **treat the output as a confident draft from a fast, well-read junior developer who has never seen your codebase and won't be around to maintain it.**

That framing gets the behaviour right. You'd read that person's pull request carefully. You wouldn't merge it because it looked tidy. You'd ask why they chose that approach. You'd check it against your conventions.

In practice:

**Review the diff, always.** If you can't explain what each line does, it doesn't go in. This is the whole discipline in one sentence.

**Scope requests narrowly.** "Write a function that takes X and returns Y, throwing on Z" produces something reviewable. "Build the payments module" produces something you'll rewrite.

**Give it real context.** Point at the existing patterns you want followed. Output that matches your codebase is worth far more than output that's generically good.

**Verify the interfaces.** Every external method, option, and package should be checked against real documentation, not assumed.

**Raise the bar with the stakes.** A test fixture and an authorisation check do not deserve the same level of scrutiny.

**Don't let it decide architecture.** Ask it to implement a decision you've made. Not to make the decision.

## What this means for teams

The skill mix shifts. Reading code carefully, holding a system in your head, writing a precise specification, and knowing when something is off — these get more valuable, not less. Typing speed and syntax recall get less valuable.

For juniors this is genuinely double-edged. The tools remove a lot of early frustration, and that frustration was where a fair amount of learning used to happen. The teams handling this well are explicit about it: use the tools, and separately make sure people can still work without them, because debugging something you didn't write requires understanding you only get by building things yourself.

Code review matters more, not less. It's now the main place where a human establishes that the code is correct rather than merely plausible.

## Our position

We use these tools daily and we'd be slower without them. We also don't ship anything a person hasn't read and understood, and we don't let them make structural decisions.

The interesting question was never whether AI writes code. It's what happens to a codebase when writing code stops being the constraint. Our answer so far: the constraint moves to understanding — knowing what to build, holding the system in your head, and being able to tell the difference between right and merely convincing.

That was always the hard part. It's just harder to avoid now.

If you're working out how this fits into how your team ships, [we're happy to talk about it](/#contact).
