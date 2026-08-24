# 11 - Launch, Operate & Diagnose

*The Launchpad Playbook  •  Module: Operating Layer  •  Reading time: ~16 min*

**After the build (06–10):  Launch → Operate → Diagnose**

## What you get from this SOP

**How to take everything you built live without torching your domains, then keep it running and fix it fast when the numbers dip.**

By the end you'll be able to:

- Launch the right way (warm up, soft launch, ramp, steady state) and start getting pipeline in **week 2** with the fast-track lane while email warms.

- Read the **four numbers that tell you what to fix today**, and the four that tell you if the system is healthy.

- Diagnose any broken campaign **bottom-up through the four pillars**, and find the real problem. It's almost always lower in the stack than you think.

## TL;DR

- **Launch isn't ****"****press send.****"** It's a multi-week sequence: stand up infrastructure and warm it while you build, then soft launch, ramp, and reach steady state. Skip the warmup and you burn your domains.

- **Email is gated by 2–3 weeks of warmup.** Want pipeline sooner? Run the fast-track lane (LinkedIn + cold calling), prepped week 1, live week 2, while email warms in the background.

- Track leading metrics (reply, positive reply, leads-per-positive, bounce) for what to fix today. Track lagging metrics (LTA, show rate, deals) for whether the system is healthy.

- The good-campaign benchmark: 1 positive reply per 50–100 contacts (depending on the niche). Hit it and you don't optimize. You scale.

- When something breaks, diagnose bottom-up through the four pillars: **Deliverability → Prospect → Offer ****&**** Copy → Scale.** The fix is almost always lower in the stack than you think.

## Where this fits

The five-step build loop is done. ICP, offer, campaign, copy, and list are ready (06–10). This is the operating layer. It doesn't change what you built. It puts it live, keeps it healthy, and fixes it when it slips. Three jobs: launch the system, operate it on a rhythm, and diagnose it when the numbers drop.

# 👉 Want us to fully manage the system for you so you can focus on closing deals? **Book a call here: {{CTA-BookCall}}** 🚀

# Part A - Launch

## What "launch" actually means

Most people think launch means hitting send on the first campaign. That's wrong by about three weeks. Launch is a sequence: stand up the infrastructure and warm it while you build, prove the system at low volume, then ramp to full volume only once the inboxes are healthy. Most failures happen because operators try to skip the warmup and seed phases. Don't.

## The timeline - two lanes

Email can't be rushed. New inboxes need 2–3 weeks of warmup before they can safely send real volume. So the realistic timeline runs two lanes at the same time: the email lane (warming in the background) and an optional fast-track lane (LinkedIn + cold calling) that gets pipeline moving while email warms. This is roughly what working with an agency looks like. Doing it yourself runs on the same clock.

| **Week** | **Email lane** | **Fast-track lane (LinkedIn + cold call)** | **Email vol.** |
| --- | --- | --- | --- |
| 1 - Setup & strategy | Buy domains, set up inboxes (InboxKit), configure DNS, start warmup. Build ICP → offer → campaign → copy in parallel | Prep LinkedIn profiles + connection/message assets; build the cold-call list + scripts | 0 |
| 2 - Build & warm | Warmup continues; finalize lists (qualify → enrich → score) and copy; configure sequencer | LinkedIn + cold calling go LIVE. Leads start flowing | 0 |
| 3 - Soft launch | Warmup ~2–3 wks done; pull fresh emails 2–3 days out; seed-test placement; soft launch email | Multi-channel running on A-tier signal leads | 10–20% |
| 4 - Ramp | Volume climbs 30–50%/day as inboxes prove healthy; add 2nd campaign; begin variant testing | Continue on top-scored accounts | 50–70% |
| 5–6 - Steady state | Full volume, 3–4 playbooks in parallel, reply handling active | Reserved for highest-score multi-touch | 100% |

Email goes live around week 3 and reaches steady state by weeks 5–6. Anyone who wants pipeline faster runs the fast-track lane and is effectively live in week 2. It's the same logic as your signal campaigns: the highest-scored leads are exactly the ones worth the LinkedIn + call effort (see List Building (SOP 10) and Campaign Architecture (SOP 08)).

### Why the fast-track lane works

LinkedIn and cold calling don't need warmup. There's no domain reputation to burn, so both are live on day one. While your inboxes warm, you can already be touching your A-tier signal accounts. For a signal campaign that's the multi-touch motion anyway (email + LinkedIn + call). The fast-track lane just front-loads the two channels that are ready immediately.

## Pre-launch checklist

Before the first email, confirm every box. Infrastructure or list problems during launch burn domains. Copy or tracking problems just waste the campaign.

**Infrastructure**

☐  Inboxes warmed (2–3 weeks of warmup activity) 

☐  SPF, DKIM, DMARC verified on every sending domain (deferred if you use a managed provider) 

☐  Sequencer connected

**Lists**

☐  Emails verified (waterfall complete, catch-alls flagged/removed), pulled fresh 2–3 days out 

☐  List deduped by domain 

☐  Suppression / unsubscribe list loaded across all domains

☐  ICP scoring applied; A-tier and B-tier identified

**Copy** (run the full Copy QA below)

☐  Copy QA checklist passed on every email in the sequence

**Tracking**

☐  Reply / bounce / unsubscribe tracking on ☐  CRM integration tested (positive replies flow through)

## Copy QA - run this on every email before launch

A bad variable or a broken spintax bracket can wreck a whole send. Walk this list on every email, twice.

**Pass 1**

☐  No grammar or punctuation errors? 

☐  Variables populated correctly? No grammar errors, no weird-sounding variables? 

☐  No spam words? (check with a spam-word checker like Mailmeteor's free spam checker) 

☐  Spintaxed?    

☐  No spam word inside the spintax?    

☐  Spintax makes sense (every option reads right)?    

☐  No spintax errors?       

☐  No grammar errors       

☐  Not missing a { or } bracket, or a |       

☐  On Sendkit: both variables and spintax use double brackets → {{firstName}}, {{Hi|Hello|Hey}} 

☐  Correct signature? Signature should sit inside the {{signature}} variable 

☐  Test-emailed to yourself and everything looks good?

**Pass 2**

☐  Copy flows smooth. Nothing sounds awkward, weird, or like an "AI" giveaway?    

☐  NO " – ". One dash only. 

☐  Unsubscribe language added (for clients who require it)?

## Soft launch - week 3

Goal: prove the system at small volume before you scale. Send 10–20% of target across the first several days, one campaign at a time, watching deliverability daily. Bounce under 3% (pause at 5%+), spam complaints under 0.1% (pause at 0.5%+), and seed-test your own Gmail/Outlook for inbox placement. Don't add campaigns, raise volume, or touch copy yet. You don't have enough data. If something's off, jump to Part C and diagnose. If it's healthy, ramp.

## Ramp - week 4

Increase daily volume ~30–50% as health holds. Add a second campaign (a different playbook, see (SOP 08)). Begin variant testing within email 1 (3–4 variants of the strongest playbook). Once you have 1,000+ contacts per variant: a variant 50%+ worse, pause and replace; a clear winner, scale its share; all within 30% of each other, keep running, you need more data.

## Steady state - weeks 5–6

Full target volume, 3–4 playbooks in parallel against the A-tier list, reply handling fully active (SOP 13), daily reply triage in place. Lagging metrics start to mean something. Still no major copy or offer changes and no new ICPs yet. Prove the current one first.

# Part B - Operate

## Metrics - leading vs lagging

Two groups. Both matter, for different jobs.

### Leading - fix it today

- **Bounce rate.** List + infrastructure health. Target under 3%.

- **Reply rate.** Copy + ICP fit + deliverability. Target 2%+.

- **Positive reply rate.** Offer + copy + ICP precision. Target 15%+ of replies.

- **Leads contacted per positive.** Combined efficiency. Target 1 per 50–100 ((SOP 04)).

### Lagging - system health (1–2 weeks to mean anything)

- **Lead-to-Appointment (LTA).** Reply-handling quality ((SOP 13)). Target 50%, min 30%.

- **Show rate.** Pre-call nurture ((SOP 13)). Target 70%+.

- **Qualification rate.** Targeting precision. Target 80%+.

- **Close rate.** Sales process, ~20% typical. Revenue per email is the ROI number that feeds the money model.

Leading metrics are your daily dashboard. Don't read too much into lagging metrics in month one.

## The good-campaign benchmark

A campaign is healthy when reply rate is 2%+, positive reply is 15%+ of replies, you're getting 1 positive per 50–100 contacts, and bounce is under 3%. Hit those four and don't optimize. Scale. The most common mistake here is tinkering with a winner because "it could be better." It could. But scaling a winner 5x beats squeezing 20% more out of it. Choose volume.

## Scale / optimize / kill

Three states, three actions:

- **Winning (at benchmark) → scale.** More volume on the same playbook. Mirror it to nearby segments (same offer, new vertical or size band). Don't change copy or offer. Don't get clever.

- **Mediocre (within 50% of benchmark) → optimize.** Diagnose with the four pillars (Part C). Test 2–3 directional variants of the weak layer, 1,000+ contacts each before you judge.

- **Losing (50%+ below benchmark) → pause and rethink.** Don't iterate on something structurally broken. Walk the four pillars bottom-up. The fix is usually upstream (ICP, offer, infra). Fix it, then treat it as a fresh campaign. Hope isn't a strategy.

## Reading negative replies - the underrated signal

Negative replies are feedback, not failure. Track the type:

- **"****We have a vendor.****"** Tells you their stack and who you'd replace. Market intel.

- **"****Too expensive / out of budget.****"** Positioning, ICP fit, or value framing. If 50% of negatives cite price, the offer needs work.

- **"****We don't do X / wrong size.****"** List quality is off. The targeting filter let in non-fits.

- **"****Not now / focused on Y.****"** Timing patterns. Some industries have cyclical buying windows you can exploit.

Every 30 days, dump the last 60 days of replies into Claude: what objections recur, what language describes the problem, what proof lands? Feed it into next month's copy. This is the sentiment loop from Copy (SOP 09). Most teams skip it.

## The optimization rhythm

- **Daily (15 min):** watch deliverability and lead pacing. If you average 2–3 leads a day, a day below that means something's wrong.

- **Weekly (1 hr):** per-campaign metrics (winners / mediocre / losers); schedule the week's tests; sample negative replies.

- **Monthly (3–4 hrs):** full sentiment loop on replies + call transcripts; refresh copy on top playbooks; plan next month's portfolio.

- **Quarterly (full day):** ICP review; offer review; tool-stack review; money-model recalibration.

When the rhythm runs, your job shifts from "launch a campaign" to "operate a system." That's the destination.

# Part C - Diagnose: the Four Pillars

## Diagnose bottom-up

When a campaign underperforms, most people reach for copy first. Wrong end of the stack. Diagnose through four pillars in this order. It's the full SCOPE method worked backwards (E → P → O+C → S):

- **Email Deliverability.** Does it hit the inbox?

- **Prospect** (list quality & targeting). Right people?

- **Offer ****&**** Copy** (the message). Right pitch, right words?

- **Scale.** Are you sending enough, and does the math work?

The order is the logic. If it doesn't hit the inbox, nothing else matters. If the list is wrong, the message reaches the wrong people. If the message is weak, no amount of volume saves it. And if all three are healthy, you may simply not be sending enough. Work up only after each layer checks out.

### Pillar 1 - Email Deliverability

**Symptoms.** Reply rate drops on the same list and copy with nothing else changed (e.g., 2.5% → 1.5%), or bounce climbs. Both point at infrastructure before anything else.

**How to read it.** The bounce message tells you a lot: whether the mailbox is inactive, the domain's too young or banned, you're landing in spam, or the company filters external email. Seed-test your own Gmail/Outlook for placement.

**Fix.** Dial sending back hard, pause the affected domains, re-warm. Stand up fresh infrastructure in the background, and lean on the fast-track lane (LinkedIn + calls) to keep pipeline moving while inboxes recover. Full detail in Email Deliverability (SOP 05).

### Pillar 2 - Prospect (list quality & targeting)

Two different failure modes:

- **Targeting off.** You book calls but the qualification rate is bad. Wrong headcount, title, or ICP slipped the filter. It shows up in qualification rate, not always in reply rate. Fix: rebuild the list with correct targeting, relaunch with the same winning copy.

- **Data quality off.** Right company and title, but invalid or catch-all emails got through, so bounce spikes. Fix: re-verify (double-verify), drop catch-alls.

Both are covered in List Building (SOP 10).

### Pillar 3 - Offer & Copy (the message)

**Symptoms.** Deliverability and targeting both check out, but engagement is low. In the build these are two docs. In diagnosis they're one layer with two levers, and you test them at the same time, because you usually can't tell upfront which one is holding you back:

- **Copy lever.** Same lead magnet, new angle. A different opener, pain, or proof. Sometimes this alone doubles replies. The bait was fine, the pitch wasn't.

- **Lead-magnet lever.** Same copy approach, new bait. A different free thing to say yes to. Sometimes the words are fine and the magnet was the weak link.

**Run both as parallel variants**, each changing one lever, so you can read which actually moved results (sometimes both do, on their own). Test directionally: eggs and flour, not word swaps. The **core offer** (price, packaging, positioning, risk reversal) is the slow, expensive lever you only reach for if neither moves the needle (Offer (SOP 07)).

**On leverage.** In the build, the core offer has the most leverage of the three. A better offer beats better copy. But in optimization, copy and lead-magnet swaps do almost all the work, so that's where you start.

**The caveat that saves you from chasing ghosts.** A low reply rate with a high positive reply rate can be normal for some industries (real estate replies less but converts when it does). Read leads-per-positive, not raw reply rate, before you "fix" a message that isn't broken.

### Pillar 4 - Scale (are you sending enough?)

**Symptoms.** The three layers below all check out. You're hitting the inbox, reaching the right people, and the message converts, but you're still not booking enough calls. The layer everyone forgets: you're probably not broken, you're just under-volumed.

**Fix.** Send more at the same ratio. The identical ratio at higher volume books more calls, and that's the point where cold email becomes profitable. But you have to know the math first: revenue per lead and emails per lead. Those two numbers live in the Money Model (SOP 04). If the unit economics work, the fix isn't to tinker, it's to scale.

## The diagnostic decision tree

Short on time? Find your symptom below, the pillar and first fix follow.

| The symptom | Likely pillar | First fix |
|---|---|---|
| High bounce (>5%) | Deliverability + data | Read bounce messages; pause / re-warm; re-verify the list. |
| Reply rate dropped on the same list & copy | Deliverability | Check infra / warmup; dial back and re-warm. |
| Low reply on a new / changed list | Prospect | Rebuild the list; relaunch the same winning copy. |
| Lots of calls, low qualification rate | Prospect | Tighten ICP filters; re-score. |
| Clean deliverability + targeting, low engagement | Offer & Copy | Test a copy-angle variant and a lead-magnet variant in parallel; core offer last. |
| Decent replies, negatives cite price / not a priority | Offer, core | Rework price / positioning / risk reversal. |
| Lots of positive replies, few calls booked (low LTA) | Booking process | Work the lead-to-appointment process: reply faster, make scheduling one-click, tighten follow-up. |
| Low reply but high positive reply | Often normal | Don't fix it yet. Check leads-per-positive before changing anything. |
| All layers healthy, just not enough calls | Scale | Send more at the same ratio; confirm revenue-per-lead & emails-per-lead. |

## Structuring tests after you diagnose

Once you know the pillar, the next step writes itself:

- **Infrastructure.** Dial back sending, re-warm, stand up new inboxes; bridge with the fast-track lane meanwhile.

- **List quality.** Pause, build a new list, relaunch with the same winning copy.

- **Offer ****&**** Copy (message).** Run a copy-angle variant and a lead-magnet variant in parallel, 1,000+ contacts each; revisit the core offer only if neither moves.

- **Scale.** If the layers are healthy, don't tinker. Send more at the same ratio once the math (04) confirms the unit economics work.

Fix the pillar that's actually broken, not the one that's easiest to tinker with.

## Common launch and diagnostic mistakes

- **Skipping warmup.** New domains get burned. 2–3 weeks, always.

- **Skipping the soft launch.** 0 to 100% in week one spreads any list or copy issue across all domains at once.

- **Optimizing too early.** 100 emails and 1 reply isn't data. Send 500–1,000 before you conclude anything.

- **Killing a winner by over-tweaking.** Scale instead.

- **Keeping a loser alive.** 50%+ below benchmark after 1,000 contacts, pause, diagnose, restart.

- **Diagnosing top-down.** Reaching for copy when the inbox or list is the problem. Work bottom-up.

- **Tracking only leading or only lagging metrics.** You need both.

## Action items

- Stand up infrastructure and start warmup in week 1; build the system (06–10) in parallel.

- Decide whether to run the fast-track lane (LinkedIn + cold calling live week 2).

- Run the pre-launch checklist and the Copy QA; don't send until every box is checked.

- Soft launch at 10–20% in week 3; watch deliverability daily.

- Ramp to 50–70% in week 4; add a second campaign and start variant testing.

- Hit steady state by weeks 5–6; set up the leading + lagging dashboard and the daily/weekly/monthly/quarterly rhythm.

- When a campaign slips, diagnose bottom-up through the four pillars before changing anything.

When the rhythm is running, you've stopped launching campaigns and started operating a system. That's the actual destination.

**Next:** (SOP 12)

# 👉 Want us to do this all for you and get you 10–30+ qualified meetings booked a month?

# **Book a call here: {{CTA-BookCall}}** 🚀