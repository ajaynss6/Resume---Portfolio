---
layout: ../../layouts/DocLayout.astro
title: "Workout Log: UX Audit and Design Exploration"
project: "Workout Log"
projectSlug: "workout-log"
kind: "UX audit"
summary: "A screen-by-screen audit of the MVP through a beginner's eyes, benchmarked against Strong, Hevy, FitNotes, Liftd and Setlist, ending in principles and a roadmap ranked by beginner impact."
---

**Scope:** iOS / SwiftUI, high-level  
**Audience:** Beginner / casual lifters  
**Goals:** Audit the current app, map an ideal end-to-end journey, and apply competitor-informed best practices (Strong, Hevy, FitNotes, Liftd, Setlist).  
**Date:** September 2026  

---

## 1. Design Principles (beginner-first)

A beginner workout log succeeds when it **lowers the cost of showing up**. Every screen should be judged against these principles:

1. **Fastest path to a logged set wins.** The hero task is "log the set I just did." Anything that adds taps between rack and app is friction.
2. **Defaults over decisions.** Beginners don't know what weight, reps, or rest to use. Pre-fill everything; let them confirm, not configure.
3. **Show progress early and often.** Beginners quit before results are visible. Surface streaks, "first time," and "heaviest yet" moments immediately.
4. **One primary action per screen.** If a screen has two equally-weighted CTAs, a beginner will hesitate.
5. **Forgiving by default.** Never punish a missed set, a skipped workout, or an empty day. Never force naming, categorizing, or planning before a first workout.
6. **No jargon tax.** RPE, 1RM, volume, drop sets: hide behind "More" until the user opts in. Default to weight × reps × sets.
7. **Thumb-reachable, single-handed.** Logging happens at the gym, phone propped on a rack, one hand free.

---

## 2. Current App Audit

The app is already well-built: SwiftData, a clean 4-tab shell, a focused full-screen active logger, rest timer, PR toasts, and a summary screen. Below are the friction points a beginner would hit, mapped to where they occur.

### 2.1 Tab shell (`MainTabView.swift`)

**Today:** Home · Exercises · History · Progress

| Issue | Why it hurts beginners |
|---|---|
| **Progress is a top-level tab.** | Beginners have no data yet, so "Progress" opens to an empty chart on day one: a demotivating first impression. |
| **"Exercises" is a top-level tab.** | Beginners don't browse exercises; they want to start a workout. This tab competes for attention with the actual goal. |
| **Settings is buried behind a gear on Home.** | Fine, but unit toggle (lbs/kg) lives there and most beginners won't find it before logging their first set in the wrong unit. |
| **No "Today" anchoring.** | Home shows "Recent Workouts," not "Today." A returning beginner should land on a state that reflects *today's* intent. |

### 2.2 Home (`HomeView.swift`)

**Strengths**
- Primary action card adapts to three states (active workout / repeat last / first workout): this is genuinely good UX.
- Stat cards (streak, this week, volume) give instant gratification.
- "Repeat last workout with everything pre-filled" is the single best beginner feature in the app.

**Friction**
- **Three different "start" entry points** (Repeat last, Start Empty, New Workout sheet). The decision tree isn't obvious to a first-time user.
- **Stat cards appear before any data exists.** "Streak 0 days · 0 workouts · 0 volume" on day one is a cold, empty feeling. Beginners should see an encouraging empty state, not zeroes.
- **"See All" links to `WorkoutHistoryView` but the tab bar already has History.** Redundant navigation paths.
- **Recent workouts list shows volume.** For a beginner, "8,450 lbs" means nothing. "First time doing Push Day" or "3 PRs" is meaningful.

### 2.3 New Workout flow (`NewWorkoutView.swift`)

**Today:** Sheet → name (optional) → "Use Template" or "Build from Scratch" → pick exercises → set previews → Start.

| Issue | Why it hurts beginners |
|---|---|
| **"Build from Scratch" as the secondary button implies Templates are the default.** But templates ship with hardcoded weights (135 lb bench, 185 lb squat) that will be wrong for almost every beginner. | Setting wrong expectations on first use. |
| **`ExerciseBuilderRow` exposes reps/weight/RPE/warmup in the setup sheet.** | Pre-workout setup should be optional. Most users want to start now and dial in sets *during* the workout. |
| **SetPreviewCard shows "RPE" with no explanation.** | Beginner confusion. |
| **No "quick start" path.** A beginner who just wants to log "I did some bench press" must: open sheet → pick mode → open picker → pick exercise → start. That's 4+ taps before the timer starts. | The most common action takes the most taps. |
| **`autoName` produces "Workout · Sep 15"**: fine, but two days in a row produce identical names with no disambiguation. | Naming confusion later. |

### 2.4 Active Workout (`ActiveWorkoutView.swift`)

**Strengths**
- Full-screen, focused, dismisses keyboard on scroll, sticky action bar with rest timer: this is the right pattern.
- PR toast + haptics on a heavy set is a great beginner dopamine hit.
- Progress strip (sets done / total · elapsed) gives a sense of "almost there."
- Rest timer with per-exercise memory (`RestTimerStore`) is a thoughtful touch.

**Friction**
- **The logger is where set editing happens, but the setup sheet also let users pre-edit sets.** Two places to do the same thing confuses beginners. Recommendation: make the logger the *only* place to edit sets; setup only picks exercises.
- **Rest timer auto-starts on every completed non-warmup set.** Beginners resting 90s after a light set may find this nagging. It should be easier to silence/ignore than to engage.
- **Swap/Remove require confirmation dialogs mid-workout.** Necessary, but the dialogs are dense ("This deletes 3 logged sets"). Beginners may misread and lose data.
- **Toolbar title is a button to rename.** Discoverable only by accident. A "rename" menu item is clearer.
- **`showingFinishIncomplete` alerts on every incomplete non-warmup set.** Good intent, but beginners routinely skip last sets: the alert feels punitive.
- **No unit toggle accessible mid-workout.** If they realize it's kg, they must exit, go to Settings, come back.

### 2.5 Summary (`WorkoutSummaryView.swift`)

**Strengths**
- Celebration header with checkmark seal + haptic: correct emotional design.
- PR cards with "prev 135 → 155" deltas are exactly what a beginner needs to feel progress.
- "Done" is green and prominent.

**Friction**
- **No "next workout" or "schedule" CTA.** The summary is a dead end. A beginner finishes and the app releases them. Recommend: "Repeat in 3 days?" or "Add to schedule."
- **No share/export from summary.** Beginners love posting PRs. A share sheet would amplify motivation and the app.
- **Breakdown lists volume per exercise**: again, a number beginners can't interpret. "Heaviest set" or "PR count" per exercise would land better.

### 2.6 Progress (`ProgressView.swift`)

**Today:** Weekly volume bar chart by default; exercise picker → line chart with metric selector; PR section; body measurements.

| Issue | Why it hurts beginners |
|---|---|
| **Default chart is weekly *volume*.** Volume is an intermediate concept. A beginner's question is "am I getting stronger?" → best answered by "heaviest weight per exercise over time." | Wrong default metric for the audience. |
| **Three pickers stacked (exercise / timeframe / metric).** | High cognitive load. Timeframe should be a default "since you started," metric should default to "weight." |
| **Est. 1RM, RPE, volume presented as peers to "Weight."** | Concept overload for beginners. Hide behind an "Advanced" toggle. |
| **Body measurements section shows even when empty** ("No measurements recorded"). | Clutter on a screen that should celebrate lifting progress. |
| **No "firsts" timeline.** Beginners rack up "first time benching 135," "first 3-workout week," etc. These milestones are more motivating than charts. | Missed emotional hook. |

### 2.7 Exercise Library (`ExerciseLibraryView`)

Not reviewed line-by-line, but observed: it's a top-level tab. For beginners it's a reference, not a destination. Recommend demoting it to a sheet reachable from the picker.

---

## 3. Competitor-Informed Insights

Based on the established patterns in Strong, Hevy, FitNotes, Liftd, and Setlist:

| Pattern | Who does it well | How to adapt |
|---|---|---|
| **"Continue workout" persistent banner** that survives app kill | Strong, Hevy | Already present as `ActiveWorkoutCard` on Home: good. Make it even more prominent and add a Live Activity so it persists on the lock screen. |
| **Tap a set → big checkmark + auto rest timer + next-set highlight** | Strong | App does this. Add a "next set" autofocus / highlight so the user knows where to type next. |
| **Previous numbers inline beside each set** ("Last: 155×8") | Hevy, Strong | `previousSets(for:)` exists but verify it's surfaced *per set row*, not just in a detail sheet. Beginners need the comparison at a glance. |
| **Onboarding asks unit + experience, then suggests a starter template** | Hevy | Currently absent. A 3-screen onboarding (unit, goal, starter pick) would prevent the "empty Home" cold start. |
| **Streaks with grace days** (don't break a streak on a planned rest day) | Liftd | App's streak is strict. A "rest day allowed" toggle would prevent beginners from feeling they failed. |
| **PRs celebrated in-feed, not just in Progress tab** | Hevy | Surface a "PR this week" card on Home. |
| **Shareable workout summary card** | Hevy, Setlist | Add a share sheet from `WorkoutSummaryView`. |
| **"RPE optional" in settings** | Strong | Hide RPE entirely for beginners; expose in Settings → Advanced. |
| **Rest timer as a Live Activity / Dynamic Island** | Hevy | High value for beginners who put the phone down during rest. |
| **Quick log via shortcuts/widget** | Strong | A Home Screen widget "Start Last Workout" would cut the start flow to one tap. |

---

## 4. Ideal End-to-End Journey

### 4.1 First launch (one-time)

```
Splash
  → Welcome ("Log your first set in under 30 seconds")
  → Unit (lbs / kg)            [big taps, not a settings page]
  → Experience ("New to lifting? / Some experience / Experienced")
      └ new → suggest 3 starter templates (Full Body / Upper-Lower / PPL) with NO preset weights
  → Done → land on Home, primed with the chosen template as "Tap to start"
```

**Principle:** Never let a beginner see an empty Home. Always prime state on first launch.

### 4.2 Starting a workout (returning user)

The optimal flow is **one tap to a running workout** for the most common case:

```
Home
  └ Primary card shows "Continue Push Day" (if active) OR "Start Push Day again" (if last)
       └ tap → fullScreenCover → ActiveWorkoutView, sets pre-filled from last time
```

Secondary paths (new workout, templates) live behind a "New" menu: not the primary CTA.

### 4.3 During the workout

```
ActiveWorkoutView
  ├ progress strip (sets done / total · elapsed)
  ├ ExerciseCard (per exercise)
  │    ├ "Last: 155 × 8" inline beside current set
  │    ├ weight / reps fields, big tap targets
  │    ├ check to complete → haptic + rest timer auto-start + next set highlighted
  │    └ collapse when fully done
  └ StickyActionBar
       ├ elapsed / rest countdown
       ├ + Exercise
       └ Finish
```

Beginner guardrails:
- Rest timer auto-starts but is **easy to dismiss** with a single "Skip" tap and remembers the choice per exercise.
- Unit toggle accessible from the action bar overflow menu.
- RPE / warmup / notes hidden behind a "..." on each set row.

### 4.4 Finishing

```
Finish
  → (if incomplete sets) gentle confirm: "Mark remaining as skipped?"  [no destructive wording]
  → WorkoutSummaryView
       ├ celebration header + haptic
       ├ duration / volume / sets pills
       ├ PR section (if any): with share button
       ├ exercise breakdown (heaviest set per exercise, not volume)
       └ Done  → Home
            └ optional prompt: "Repeat this workout? We'll remind you." (no commitment required)
```

### 4.5 Between workouts (Home)

```
Home (no active workout)
  ├ "Start again" hero card (last workout, pre-filled)
  ├ This week: streak with grace-day indicator, PRs hit, workouts done
  ├ Recent (2-3 cards, with milestone labels: "First Push Day", "3 PRs", "Heaviest bench yet")
  └ empty-state replacement: encouraging "Your first workout is one tap away"
```

### 4.6 Long-term (Progress)

Defaults should answer a beginner's question: "am I getting stronger?": without configuration:

```
Progress (default view)
  ├ "Since you started" hero: workouts logged, total sets, streak
  ├ "Getting stronger" line chart: heaviest weight per top exercise, all-time
  ├ Milestones timeline: "First 135 lb bench", "10 workouts", "4-week streak"
  └ Advanced (collapsible): volume, 1RM, RPE, body measurements
```

---

## 5. High-Level Recommendations

Grouped by area, prioritized by beginner impact.

### 5.1 Information architecture
- **Reduce tabs to 3:** Home · History · Progress. Move Exercises into a sheet from the picker and from a "Library" entry on Home.
- **Surface Settings earlier:** unit toggle should appear in onboarding and be reachable from the active workout overflow menu.
- **Add an onboarding flow** (3 screens) that primes unit, experience, and a starter template.

### 5.2 Home
- Replace zero-stat cards with an **encouraging empty state** until the first workout is logged.
- Replace "Volume" stat with **"PRs this week"** or **"Workouts"** for the first 4 weeks; reveal volume once it's meaningful.
- Add a **"PR this week"** highlight card when applicable.
- Recent workout rows should show **milestone labels**, not raw volume.

### 5.3 New Workout / start flow
- Make **"Start last workout again"** the single primary CTA on Home when a previous workout exists.
- Demote "Build from Scratch" and "Templates" behind a "New workout" menu.
- **Remove set editing from the setup sheet**: pick exercises only; refine sets in the logger.
- Strip **RPE and warmup toggles from beginner setup**; expose via Settings → Advanced.
- Templates should **start with empty weight fields** (or "weight from your last session"), not hardcoded numbers.

### 5.4 Active Workout
- Add a **"next set" autofocus/highlight** after completing a set so the user knows where to type.
- Make rest timer **easy to skip** and **respect a per-exercise "don't auto-start" choice**.
- Move **unit toggle** into the overflow menu.
- Replace the **title-tap-to-rename** with an explicit "Rename" menu item.
- Soften the incomplete-sets alert wording for beginners ("Mark remaining as skipped?" instead of "Finish Anyway").
- Add an optional **Live Activity** so elapsed time and rest countdown persist on the lock screen.

### 5.5 Summary
- Add a **Share** button (image of the summary card with PRs).
- Replace per-exercise **volume** in the breakdown with **heaviest set** (more meaningful to beginners).
- Add a **"Repeat in 3 days"** soft prompt: no obligation, no scheduling complexity yet.

### 5.6 Progress
- Default metric = **"Weight"**, default timeframe = **"All time"**, default exercise = **most frequent**.
- Move Est. 1RM, RPE, volume, body measurements behind an **"Advanced"** collapsible.
- Add a **Milestones** section: firsts, PRs, streaks: beginner's primary motivation engine.
- Hide the body-measurements section entirely when empty.

### 5.7 System-level touches
- **Home Screen widget** "Start last workout": one-tap entry.
- **Live Activity** during a workout (elapsed + rest countdown).
- **Haptics** already used well; extend a subtle tick at each rest-countdown minute.

---

## 6. Suggested Roadmap (by beginner impact)

| Priority | Change | Effort |
|---|---|---|
| P0 | Onboarding (unit + experience + starter template) | Medium |
| P0 | Encouraging Home empty state; hide zero stats | Small |
| P0 | "Start last workout" as single primary CTA | Small |
| P0 | Defaults: Progress opens to Weight / All time / most-frequent exercise | Small |
| P1 | Reduce to 3 tabs; Exercises becomes a sheet | Medium |
| P1 | Remove set editing from New Workout sheet | Small |
| P1 | Hide RPE / warmup behind Advanced (Settings) | Small |
| P1 | "Next set" highlight after completing a set | Small |
| P1 | Soften incomplete-sets alert wording | Small |
| P2 | Milestones section in Progress | Medium |
| P2 | Share button in Summary | Small |
| P2 | Per-exercise breakdown shows heaviest set, not volume | Small |
| P2 | Unit toggle in active-workout overflow menu | Small |
| P3 | Home Screen widget "Start last workout" | Medium |
| P3 | Live Activity for elapsed + rest timer | Medium |
| P3 | Streak grace days | Small |
| P3 | Templates start with empty/last weights, not hardcoded | Small |

---

## 7. Open Questions

These would benefit from your input before any redesign work:

1. **Templates with hardcoded weights**: should we strip them, or keep them as a "suggested starting point" with a clear "adjust to your level" hint?
2. **Rest timer auto-start**: keep as-is, or make it opt-in per exercise on first use?
3. **Onboarding scope**: are you open to a one-time 3-screen onboarding, or keep it to a single "pick your unit" prompt?
4. **Body measurements**: is this a feature you want to keep for beginners, or move to a later/advanced tier?
5. **Sharing**: any concerns with a shareable summary image (privacy, branding)?
6. **Streak grace days**: should rest days always be allowed, or only with a "rest day" toggle the user sets explicitly?
