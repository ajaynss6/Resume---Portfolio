---
layout: ../../layouts/DocLayout.astro
title: "Life Archivist: Product Requirements"
project: "Life Archivist"
projectSlug: "life-archivist"
kind: "PRD"
summary: "Vision, scope cut into gated releases, requirements, a decisions log with the reason behind every call, success metrics and open questions."
---

Condensed from the original product spec (2026-10-06). Decisions and deviations are marked **Decision**.

## Vision
A private, searchable memory of your life, built automatically from data you permit: location, places, movement, calendar, photos, health, notes.

> "Your life, automatically remembered."

Aha moment: the user sees a correct day and realizes "I didn't manually log any of this."

## User (v1)
**Decision:** the founder, dogfooding on a personal iPhone with a free Apple developer account. App Store later. This removes App Review, backend and account requirements from v1 and keeps privacy simple (nothing leaves the device).
**Revised in v0.7 (D36):** build for the general public. The first run, empty states and copy assume someone who has never heard of the app.
**For now (D52):** the founder's iPhone. The app is ready for strangers; distribution waits for the paid account.

## Core concept: Life Event
Every interpreted event has: id, type, start, end, location, source, confidence, created/updated.
Types: `PLACE_VISIT`, `TRAVEL`, `WORKOUT`, `CALENDAR_EVENT`, `PHOTO_ACTIVITY`, `SLEEP`, `MANUAL_EVENT`, `ROUTINE`, `MEETING`.
Implemented: `PLACE_VISIT` (Stay, detected or entered by the user), `TRAVEL`, and gaps (paused, not recorded, deleted).

## Scope

### MVP, cut into two releases
**Decision:** the spec's MVP (7 sources, 9 experiences, AI) is too large to validate. The aha moment depends only on location quality. If visit detection is wrong, AI on top answers wrong with confidence.

| Release | Contents | Gate |
|---|---|---|
| **v0.1 (built)** | Location engine, stays/travel, place naming, Today timeline, day map, tracking log, privacy screen | Device protocol T1 to T10 (BUILD_PLAN.md) |
| **v0.2 (built)** | Ask-don't-guess tagging and review flow, corrections, gap filling, place history, Google Timeline import, backup/restore, per-instance deletion, Face ID, reliability notifications | T11 to T17 |
| **v0.3 (built)** | Ask your life: cited answers computed on device; questions read by rules, Apple Intelligence, or Claude (opt-in) | T18 to T21; 10 PRD example questions correct on 30 days of real data |
| **v0.4 (built)** | The rest of the suite: motion modes, visit editing (times, split, merge, rooms), memories, people, calendar, Health, photos, daily summary, week/month map and heatmap, Insights (stats, routines, trends, nudges, trips, journal, mood links), on this day, offline cities and countries, more Ask questions, encrypted and automatic backups, Privacy Center, bug-report export | T22 to T32; 2 weeks of daily use with under 1 correction per day on average |
| **v0.5 (built)** | The app asks you to tag places: a notification shortly after you leave an unknown place, with one-tap answers, and a "Places to name" list of spots you keep going to | T33, T34 |
| **v0.6 (built)** | Asks while you are there (15 min in): where you are at spots you return to, who you are with at social places; closeness tiers; contacts search; lock screen widget | T33, T35 to T37 |
| **v0.7 (built)** | The brainstorm: calendar hints, same as usual, Siri, Action button, Live Activity, voice memory, groups, drift, birthdays, person page, weekly review, chapters, unusual weeks, year in review, trip book, one-line journal, notes to future self, tracking health, iCloud sync (off until paid); sitting and walking time, Health over the phone. Also built for strangers: intro, every permission on one screen, Getting started, first-day Today. Traffic folds into drives and is counted; vehicles from car Bluetooth, CarPlay or Shortcuts; cab, auto, bus, metro, train and more; workouts suggest their place; people as faces | T38 to T55 |
| **v0.8 (built)** | How fast you travel per vehicle and mode; routes compared; suggestions; patterns from all data with reliability; the evening-before note and the weekly "what I learned", folded into the 9 PM and Sunday notifications; car to desk and lifts; vehicles named once; opt-in weather | T56 to T61 |
| Optimise | Battery tuning from T6, time zone per sample, route thinning, stored events if slow, Swift 6 app mode | After device data |

### Screens (spec section 27) vs status
| Screen | Status |
|---|---|
| Onboarding, permission setup | Built |
| Today timeline | Built: map, daily summary, calendar, workouts, photos, memories, sleep, mood, on this day |
| Map | Built: day, week, month, heatmap |
| Place detail | Built: visit count, time spent, first and last visit, every visit, rooms |
| Search / Ask AI, AI answer | Built (Ask tab): answer, breakdown, caveats, cited visits, "Read as" line |
| Insights, daily summary | Built: Insights tab; summary on Today |
| Settings, Privacy Center | Built: Me + Privacy Center with a switch per source |
| Edit Life Event | Built: change place (this visit), edit place (all visits), not a place, travel mode, fill gap, adjust times, split, merge, room, people, memory, delete |

### Navigation
Spec: 5 tabs (Today, Map, Search, Insights, Me). **Built:** Today, Map, Ask, Insights, Me. Places moved inside Insights (founder decision), keeping the spec's five.

## Requirements carried forward unchanged
- Location: track lat, lon, timestamp, accuracy, speed, altitude, heading, motion state; switch between SLC, standard updates, visits, geofencing, motion. Never continuous max-accuracy GPS by default.
- Places: auto-detect frequent places; user confirms and renames; user-defined places with category.
- Rooms: never claim room-level from GPS. Manual/experimental only (see PLATFORM_CONSTRAINTS.md).
- Calendar is a contextual signal, not truth. Photos linked by time and GPS. Health: no medical diagnosis.
- People: optional manual association; no inference from private communications.
- Confidence: never present uncertain inference as fact; corrections improve future classification.
- Privacy: local-first, permission-first, minimum context to AI, export, delete, pause.
- Battery: must not noticeably damage daily battery life.
- Code: SwiftUI, MVVM, Swift concurrency, protocol-based services, testable logic outside views.
- AI provider abstraction (OpenAI, Anthropic, local); never send the whole database.

## Decisions log

| # | Decision | Why |
|---|---|---|
| D1 | iOS 18 minimum | Modern SwiftUI/MapKit APIs; Observation; covers the dev device |
| D2 | SQLite via GRDB, not SwiftData | 100k+ time-series rows, aggregate SQL queries, schema portable to Android Room |
| D3 | Raw data immutable; events recomputed on read | Algorithm will change often; fixes apply to all history; corrections stored as overlays |
| D4 | Battery policy as a pure state machine in LifeCore | Unit-testable without a phone; the iOS layer just executes commands |
| D5 | Anchor samples during stationary periods | GPS is off during stays; anchors keep stays provable and departures observed |
| D6 | Committed .xcodeproj with a synchronized app folder | Founder decision: open and run, Xcode edits stick. Synchronized folders mean adding files never touches the project file. Replaced XcodeGen |
| D7 | AI as planner over local queries | Arithmetic in code, citations by construction, minimal data sent. Refined by D16 |
| D8 | Database included in iPhone backups | Losing history on phone change is the worse failure; revisit before launch |
| D9 | No Android abstractions now | Portability lives in the schema and LifeCore test suite, not speculative interfaces |
| D10 | Place names come from the user, not a map service | Founder decision: user input, then automatic. Keeps "nothing leaves the device" true |
| D11 | Ask, don't guess | Founder decision. Unknown and ambiguous stays and unrecorded periods become one-tap questions; inferred Home/Work and imported names are options, never labels |
| D12 | Two places in one spot are always asked | Founder decision: "tag it manually". No time-of-day guessing |
| D13 | Google Timeline import for day-one history | Fastest path to the aha moment without a server; the user's own data |
| D14 | Backups are user-held files, merged on restore | Survives reinstall and new phones with no cloud component |
| D15 | Local reliability alerts (watchdog, signature expiry) | A memory product that silently stops recording is the worst failure |
| D16 | Models plan, code answers | No hallucinated numbers, citations by construction, works offline for common questions. Replaces D7's "LLM writes prose from tool results" |
| D17 | Rules, then Apple Intelligence, then Claude | Founder decision: "both, local first". Claude is opt-in with the user's key and sees only the question, date and place names |
| D18 | Cities by explicit lookup | Places come from the user (D10). A city is looked up only when the user taps, sending just the name. Superseded for known cities by D20 |
| D19 | "Build the whole suite" before device validation | Founder decision ("optimise later"). Risk accepted: tracking bugs surface in every feature; mitigated by the day bug-report export and replay |
| D20 | Offline geography (Natural Earth, 1.6 MB) | Cities, states, countries and trips with nothing sent anywhere |
| D21 | Health, calendar and photos read on demand, never stored | A source switched off disappears everywhere at once; nothing to leak or migrate |
| D22 | HealthKit capability off by default | Personal (free) teams may not be able to sign it, which would block installing the whole app |
| D23 | Summaries worded on the phone only | Founder decision. Template first; Apple Intelligence rewording kept only if its numbers match |
| D24 | Places inside Insights; five tabs | Founder decision |
| D25 | Second cloud option: any OpenAI-compatible server | Covers the spec's provider abstraction (OpenAI and local models) with one implementation |
| D26 | Ask 15 minutes into a stay, only at spots you return to (revised in v0.6; v0.5 asked after leaving) | Founder decision: memory is fresh and the sign is in view. Leaving earlier means it was a stop. First visits wait for the review: most are one-offs. Capped at 4 a day, quiet 22:00 to 07:00 |
| D28 | Closeness from hours together outside work, recent months weighted | Founder decision. Counting meetings alone would rank colleagues first; a monthly dinner should beat a daily 10-minute chat. Business contacts are not ranked |
| D29 | Contacts: full access, search as you type | Founder decision. Only names the user picks are saved, with the contact ID to avoid duplicates |
| D35 | Your answers, then Health, then the phone | Founder decision. Health sleep beats the phone's "sitting"; a Watch run or ride sets the travel mode; anything you entered or corrected beats both |
| D31 | Live Activity starts only when the app is open | iOS lets apps start one from the background only through a push server, which this app does not have (local-first). It updates and ends in the background |
| D32 | iCloud sync merges whole backups | Built now, off until the paid account (the iCloud capability cannot be signed for free). Merging is additive, so deletions do not sync; stated in the app |
| D33 | Voice memories keep text only | Transcribed on the phone where the language allows; the audio is never saved |
| D34 | Apple Watch later | Founder decision |
| D30 | Widget taps are queued, the app applies them | The widget cannot open the database without moving it into a shared container; queueing keeps the database where it is. The tick shows at once; the timeline updates on the app's next wake |
| D27 | Name spots, not just visits | Naming a spot you keep going to answers every past and future visit there at once; it is the highest-value question the app can ask |
| D36 | Building for the general public | Founder decision (v0.7). First run, empty states and permission copy now assume a stranger, not the founder. Distribution still needs the paid account (App Store, HealthKit) |
| D37 | Every permission asked up front, on one screen | Founder decision, replacing "one at a time". One checklist with a reason per source and "Allow all" asking in turn; each stays optional except deciding on location. Accepted cost: grant rates may be lower than asking in context |
| D38 | Traffic is part of the drive, counted, never a visit | Founder decision. Stops made in a vehicle (motion "automotive", or connected to your car) fold into the trip; time stopped or under 5 km/h is "in traffic" per trip, per day, in Insights and Ask |
| D39 | Vehicle from a connection, never from a guess | A Bluetooth or CarPlay device becomes "your car" only when you say so; Shortcuts automations cover the app being asleep. CarPlay detection through the CarPlay framework needs an Apple entitlement and is not used |
| D40 | Trip questions apart from place questions | Founder decision to tag every vehicle. Kept as "N trips to tag" so trips never inflate the place review; the last answer for the same route is offered first; a switch in Me turns them off |
| D42 | Learn from day one, say how sure | Founder decision. Every pattern carries its reliability (learning under 3, early 3 to 4, reliable from 5) and what each scale still needs (time slots, 2 weeks for weekdays, a year for seasons). Alerts and the digest use only early or reliable patterns; the evening alert only reliable ones |
| D43 | Weather, opt-in | Founder decision. Off by default; when on, a position rounded to about 10 km goes to Apple Weather, an exception to "nothing leaves the phone". Needs the WeatherKit capability (paid account) |
| D44 | Barometer whenever GPS is on, plus a short tail after arriving | Founder decision, revised. Recorded in every mode while GPS is on. The walk from the car to the desk usually ends after the tracker settles (the car park is within the stillness radius), so a coarse 3 km location stream keeps the app running until Motion says you sat down, 15 minutes at most. Lift detection only uses samples after leaving the vehicle, so car park ramps are not lifts. Departures are still mostly missed: GPS only turns on once you are about 120 m away |
| D45 | Same route, not same distance | Comparing modes over equal distances on different roads misleads; trips are compared between the same two places, direction included |
| D41 | Workouts suggest, never label | A workout during an unnamed stay offers the place where that activity usually happens as the one-tap answer (ask, don't guess, D11) |
| D46 | Journal first, three tabs: Journal, Explore, Ask (search tab); Me behind an avatar | **Built in v0.9, device tests pending.** Founder decision, from the UX study. Revises D24. The day in words is the product; Map, Places, People and Insights move into Explore, nothing is removed |
| D47 | Guess visibly, confirm in one tap | **Built in v0.9, device tests pending.** Founder decision. Bends D11: unconfirmed suggestions appear in the journal in italics ("maybe Third Wave Coffee"). Nothing becomes a label without a tap, so uncertain inference is never stated as fact |
| D48 | Nearby place names from Apple Maps, opt-in | **Built in v0.9, device tests pending.** Founder decision. Amends D10: typing names is the biggest tagging cost. Off by default; one location per new spot, only when the user is asked about it, cached per spot; names are offered, never applied |
| D49 | Questions during a visit arrive silently | **Built in v0.9, device tests pending.** Founder decision. Revises D26: same timing (15 minutes into a 2nd visit) and cap of 4, but passive interruption level: no sound, no screen wake |
| D50 | Unrecorded gaps are questions only when over 1 hour | **Built in v0.9, device tests pending.** Founder decision. Shorter gaps are muted rows and do not count in the review. No auto-fill: A2 (never guess across missing data) holds |
| D51 | One notification at 9 PM, one on Sunday evening | Founder decision (2026-10-07, merging the branches). "Tomorrow is slower" leads the 9 PM review and "what I learned" goes inside "Your week"; each arrives alone only when its review is switched off |
| D52 | Your phone now, the public later | Founder decision (2026-10-07). D36 stands for the first run and copy, so a stranger could use the app, but the target today is the founder's iPhone on a free account; App Store distribution waits for the paid account |
| D53 | How a trip was made: your answer, Health, your car, motion, speed | Merging D35 and D39: a Watch workout outranks a car connection because the connection is the phone's evidence; both outrank motion |
| D54 | Photos are read for what is in them, on the iPhone: scene, text, face count, quality | **Built in v0.9, device tests pending.** Founder decision. Revises D21 (time and location only). Photos are the memory layer: they name places (text on signs), suggest the kind of stop (food in the evening, a beach far from home), fill "No signal" gaps, pick a cover photo per day and keep screenshots and receipts out. Only labels per photo ID are stored, never images; a Privacy Center switch turns it off and deletes them. Analysis runs while charging. Labels only ever suggest (D47) |
| D55 | On-device face grouping from the start | **Built in v0.9, device tests pending.** Founder decision, against the study's recommendation (count faces and suggest names). Apple does not expose the Photos app's People names, so the app groups faces itself and the user names each group. Conditions: separate explicit consent before the first run; face data stays on the iPhone and out of backups and exports; one switch deletes all of it; names come only from the user; legal review (GDPR Art. 9, India DPDP Act, Illinois BIPA) before any release beyond the founder's phone |
| D56 | Correct locations on the map: move a place's pin and area, or move one visit | **Built in v0.9, device tests pending.** Founder decision. Place: drag the map under a fixed pin with every past visit shown as a dot and a preview of which visits join or leave before saving (applies to all visits through overlays, D3). One visit: "Wrong spot?" on the stop, drag to the true position, then pick a place; stored as a correction, raw GPS untouched |
| D57 | The evening notification comes after you get home | **Built in v0.9, device tests pending.** Founder decision (2026-10-07, merging the redesign with D51). D51 stands: one evening notification and "Your week" on Sunday. The evening one is sent about 30 minutes after you get home, at 9 PM if you are not home by then, and is skipped when nothing is open and there is no tomorrow alert |
| D58 | The redesign keeps D37's one permission screen | Founder decision (2026-10-07). The redesign's head start (Google import, Calendar, Apple Maps names) joins D37's checklist; Photos, Motion and Health are asked there too, not later in context as the UX study first proposed |

## Success metrics (v0.1)
- Recall: stays of 15+ minutes captured: target 95%.
- Time accuracy: arrival/departure within 5 minutes: target 90% of stays.
- Phantom stays (traffic, signals): under 1 per day.
- Battery: under 5% of daily usage on Balanced.
- Zero crashes over 3 days.

## Non-goals (v1)
Email, messaging, browser history, screen time, finance, cloud sync, multi-user, Android, App Store submission.

## Open questions
1. Does region/visit relaunch survive force-quit on your iPhone and iOS version? (T5)
2. Real battery cost of Balanced and Detailed on your commute? (T6)
3. Is 100 m stay clustering right for your places (e.g. table tennis academy vs nearby shops)? (T7)
