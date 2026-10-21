---
layout: ../../layouts/DocLayout.astro
title: "Finance Tracker: Product Overview"
project: "Finance Tracker"
projectSlug: "finance-tracker"
kind: "Product overview"
summary: "How the app builds one trustworthy ledger from email and statements: matching rules, tags that learn, reminders, security, the Money Score and Ask."
---

An iOS personal finance tracker for India that builds one clean, de-duplicated ledger from two
sources: receipts and bank alerts read from Gmail, and bank or card statements uploaded now and then.
Everything runs on the phone.

iPhones cannot read SMS, which is what most Indian money apps rely on: so email plus statements is
the workable data strategy here, and reconciling the two is the point of the app.

## How it avoids double counting

A payment is stored **once**. Every email and statement line that mentions it attaches to that single
record as *evidence*, rather than becoming another transaction.

Matching runs in order: exact reference (UPI RRN, card auth code) → same card, same amount, date
within ±3 days, similar merchant → anything ambiguous goes to a review queue instead of being merged.
Statement lines become the source of truth for their account and period, and importing one produces a
report: matched, added because the email was missing, and in email but not on the statement.

Amounts are stored as paise (`Int64`), so totals never drift. Transfers between your own accounts,
card bill payments, investments and reversals are excluded from spending.

## Gmail

Sign-in is Google's installed-app flow (system browser sheet, PKCE, no SDK); the refresh token lives
in the Keychain and the app asks only for `gmail.readonly`. The first sync reads 90 days, later ones
only what arrived since, and a message already read is never read again.

Each email takes one of three routes:

- **Bank alerts** from HDFC, ICICI, SBI, Axis, Kotak and a dozen other issuers are read by rules on
  the phone: amount, direction, masked account digits, UPI reference or auth code, merchant, date.
- **Receipts and anything the rules cannot read** go to Claude Haiku when an Anthropic key is set,
  and come back as structured JSON. Card digits the model reports are dropped unless they appear
  in the email.
- **Everything else** (OTPs, offers, bill reminders, declined payments) is skipped.

Refunds find the purchase they undo and mark it reversed; card bill payments are transfers.

## Tags that learn

Payments to an unknown payee land in the review queue as "needs a tag", with a nudge on Today and,
when the app refreshes in the background, a notification you can tag straight from the lock screen.
Tag one and the choice becomes a rule for that merchant: its other untagged payments follow at once,
and new ones arrive tagged. Beyond the built-in categories you can make your own tags (Gym, Kids,
Pets), each sitting under a category so charts still add up. Rules and tags are managed in
Settings → Tags & rules.

## Notifications and reminders

Reminders are rebuilt from live data whenever it changes: EMIs two days ahead, credit card bills
(read from statement and due-date emails) three days ahead and on the day until a payment settles
them, a monthly recap on the 1st, an optional evening nudge to log cash spends, and a reminder when
the ledger hasn't synced in three days. After a background refresh the app announces new payments,
payments needing a tag, and 80% / 100% of the monthly budget. Each kind has its own switch, and
amounts can be kept off the lock screen.

## Security

Face ID (or the passcode) on launch and on return, after a delay you choose. The same check guards
exporting, erasing, API keys and turning the lock off. Balances are hidden in the app switcher and,
optionally, whenever the screen is recorded or mirrored. Secrets live in the Keychain, device-only;
CSV exports are written with complete file protection.

## Money Score

A 0-100 score, rebuilt daily from five weighted parts:

| Part | Points | What it measures |
|---|---|---|
| Budget pace | 40 | Spend against the straight-line budget for today's date |
| Today's spend | 20 | Today against your median day over the last 30 |
| Housekeeping | 15 | Review queue cleared, a statement reconciled recently |
| Obligations | 15 | Every EMI due this month has a matching debit |
| Saved | 10 | Share of this month's income still unspent |

Above 60 keeps a streak alive. Days earn XP, every seventh streak day pays a bonus, and levels widen
as they climb. Weekly quests are generated from real spending and their progress is recomputed from
transactions, never hand-incremented. Badges unlock from live conditions.

## Ask

Ask questions about your own money: "what is my biggest leak right now?": from any screen. Add an
OpenRouter key in Settings and pick a model from its live catalogue. Replies stream in. Each message
carries a briefing of the current ledger, and the model can search and total the whole ledger with
tools (by merchant, category, dates, amount), so answers about March or about Amazon are exact.
It can also propose changes: re-tag a payment, mark a transfer, add a cash spend: which appear as
cards and apply only when you tap Confirm.

Keys (OpenRouter, Anthropic, statement passwords) live in the Keychain, never in the database or in
this repository.

## First run and everyday use

Onboarding is one decision per screen with a thin progress bar: welcome, how it works, monthly
budget, connect Gmail (with the read-only promise shown at the moment access is asked for), Face ID,
then a live "Building your ledger" screen that counts emails read and transactions found, ending on
what was found rather than an empty dashboard. Every permission can be skipped, and sample data is
one tap away for a look around.

After that, Today carries a setup checklist (Gmail, EMIs, reminders, app lock) ticked off from live
state. Transactions and EMIs can be added, edited and deleted by hand. EMI reminders are local
notifications two days ahead, asked for only when turned on. An eye button hides every amount;
balances are always hidden in the app switcher. Syncs, saves and deletes confirm with a toast.
Settings holds accounts, budget, notifications, privacy, appearance, CSV export and erase-all, with
API keys one level down under Intelligence.

## Design

iOS 26 Liquid Glass on a near-monochrome canvas: true black or warm off-white, one ink accent, and
desaturated pigment reserved for data. SF Pro with lining figures. The motion is the character -
a metaball tab bar that stretches between tabs, zoom morphs from the score ring and transaction rows
into their detail screens, scroll-driven depth on the bento grid, an animated money-flow river on
Insights, and a particle burst when something is won. All of it respects Reduce Motion.

## Status

The ledger, scoring, quests, Ask and Gmail sync are built. Statement import (password-protected
PDFs reconciled against email) is next. Settings can still load sample data to populate every screen.
