---
title: "React Native vs Native Development: Which Should You Choose?"
description: "The performance argument is mostly settled. The decision now comes down to platform integration, team shape, and how much of your product lives outside the main app screen."
category: app-development
publishedAt: 2026-07-14
keywords:
  - react native
  - native development
  - swiftui
  - expo
  - cross-platform
  - ios development
---

For years this question was argued on performance, and for years the answer was "it depends on how much you care about animation smoothness." That framing is now out of date.

React Native's New Architecture — JSI, Fabric, and TurboModules — is the default rather than an experiment, and Expo has removed most of the tooling pain that used to make cross-platform projects unpleasant. On the other side, SwiftUI has closed a lot of the productivity gap that made React Native attractive to teams who mainly wanted to build UI faster.

So performance is no longer the deciding factor for most apps. Something more practical is.

## The question that actually decides it

> [!IMPORTANT]
> How much of your product lives *outside* the main app screen?

Widgets, share extensions, background refresh, live activities, deep OS integrations, tightly controlled camera pipelines — this is where the two approaches genuinely diverge. Everything inside the app's own screens is a solved problem in both.

If your app is screens, lists, forms, and network calls, React Native will serve you well and you'll ship to two platforms with one team. If your product's value depends on things the operating system provides, you will spend a meaningful share of your budget writing native code anyway — at which point the cross-platform layer is buying you less than it costs.

## Where each one is clearly the right call

| Situation | Lean towards |
| --- | --- |
| You need iOS and Android from one team | React Native |
| Time to market is the binding constraint | React Native |
| Your team already writes TypeScript/React daily | React Native |
| The app is content, commerce, forms, dashboards | React Native |
| Home screen widgets are core to the experience | Native |
| Custom camera or real-time media pipeline | Native |
| Heavy background work or OS-level integration | Native |
| iOS carries the overwhelming majority of value | Native |
| You want same-day access to new OS features | Native |

The middle rows are the honest ones. Most of the interesting disagreements happen there.

## What React Native gives you

One codebase, one team, one set of product decisions. That is a bigger deal than it sounds. The saving is not just the second implementation — it is the second design review, the second QA pass, the second round of bug reports, and the second set of platform quirks to keep in your head.

Expo has made the surrounding work materially easier too: builds, over-the-air updates, and native module configuration used to be the part of React Native projects that quietly consumed weeks.

```tsx title="A React Native screen"
export default function MomentsScreen() {
  const { data, isLoading, refetch } = useMoments();

  if (isLoading) return <MomentsSkeleton />;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <MomentCard moment={item} />}
      onRefresh={refetch}
      refreshing={false}
    />
  );
}
```

Where it costs you: anything requiring a native module you don't already have. That means writing Swift or Kotlin, bridging it, and maintaining it across React Native upgrades. One or two of those is fine. A product built mostly on them is a React Native app with a native app hidden inside it.

## What native gives you

Direct access, no translation layer, and no waiting. When Apple ships something at WWDC, you can use it that week. Widgets, extensions, and system integrations are first-class rather than something you bridge to.

```swift title="A SwiftUI view"
struct MomentsView: View {
  @StateObject private var model = MomentsModel()

  var body: some View {
    List(model.moments) { moment in
      MomentRow(moment: moment)
    }
    .refreshable { await model.reload() }
    .task { await model.loadIfNeeded() }
  }
}
```

The cost is duplication. Two codebases means two of everything — including two places for a bug to hide and two release trains to coordinate. For a small team, that is the whole argument against it.

## A concrete example from our own work

[Lenso](/apps/lenso), the iOS app we're building, is native Swift and SwiftUI. The deciding factor was not performance — it was the home screen widget.

Lenso's premise is that you keep up with close friends without opening the app; the widget is not a companion feature, it is a large part of the point. Widgets have to render quickly from cached data, on the system's schedule, without running the full app. That constraint reached back into the data model and the caching strategy, and it is the kind of requirement that argues for building where the platform lives.

The camera capture path pushed the same direction. Once you are writing significant native code for the two things your product is actually about, the case for a cross-platform layer weakens considerably.

That is a reason specific to Lenso, not a general verdict. A different product with the same team could easily have gone the other way.

## Questions worth answering before you choose

1. **Which platform matters most to your users?** If the honest answer is "iOS, by a distance," native gets more attractive.
2. **What does your team already know?** A React team shipping React Native will out-deliver the same team learning Swift, at least for the first year.
3. **Which OS features are load-bearing?** List them. If the list is long, that is your answer.
4. **How long will you maintain it?** Cross-platform saves most of its money in year two and beyond, when both apps need the same change.
5. **Who maintains it after launch?** The framework your team can hire for is worth more than the framework that benchmarks best.

## The rule of thumb we use

Start from React Native if the product is primarily its own screens and you need two platforms. Start from native if the product's value depends on the platform itself, or if one platform carries most of the weight.

And be suspicious of anyone who answers this question without asking what you're building. The performance debate has largely been settled by the frameworks themselves. What's left is a product decision.

If you're weighing this for a specific app and want to talk it through against your actual feature list, get in touch — it's a shorter conversation than it looks, once the widget question gets asked.

## Further reading

- [How much does it cost to build a mobile app in 2026?](/blog/how-much-does-it-cost-to-build-a-mobile-app) — how platform choice moves the number.
- [How to prepare your app before submitting to the App Store](/blog/app-store-submission-checklist) — the requirements that apply either way.
