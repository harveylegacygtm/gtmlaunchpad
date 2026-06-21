---
name: diagnostic
description: >
  Use this skill when a running campaign is underperforming or the user is
  stuck. Trigger on "my replies dropped," "opens are low," "I'm landing in
  spam," "calls aren't showing up," "results tanked," "why isn't this working,"
  "analyze my campaign numbers," "is this campaign working," or any request to
  read or fix campaign performance. This is the fix router and the analysis
  layer. It takes the raw numbers, computes the rates, classifies the campaign,
  finds the broken pillar bottom-up, and hands off to the skill that fixes it.
  For Sendkit users it pulls the numbers live via sendkit-analyze-campaign instead
  of asking. This is SOP 11's diagnostic framework. Do not just explain it. Run
  the numbers with them and name the broken pillar.
allowed-tools: Read, Write
---

# Diagnostic Router (the fix path and the analysis layer)

Do not summarize this. Run the numbers with the user, name the one broken
pillar, and route to the skill that fixes it. Work the funnel bottom-up, because
a low number near the top is almost always caused by something below it. Fix one
thing, re-measure, then move up.

## Step 1: Get the numbers

If they use Sendkit, do not make them copy numbers by hand. Pull them live with
the sendkit-analyze-campaign skill. It runs the analyze script and returns the
rates and a per-campaign verdict already, then hands the result straight back
here. Use that as your input and skip to Step 4.

Otherwise, ask for the raw campaign numbers. Pasted or exported is fine:

- Emails sent (and the period)
- Bounces (count or %)
- Replies (count)
- Positive replies (count)
- Calls booked
- Calls held (shown)
- Qualification rate and close rate if they have them

If they only describe a symptom, ask for at least sent, bounces, replies, and
positive replies. You cannot diagnose without the bottom of the funnel.

## Step 2: Compute the rates

Do the math for them. Do not make them do it:

- Bounce rate = bounces / sent
- Reply rate = replies / sent
- Positive reply rate = positive replies / replies
- Leads contacted per positive = sent / positive replies
- LTA = calls booked / replies
- Show rate = calls held / calls booked

Show the numbers back in one short table so they can see it.

## Step 3: Compare to the benchmark

The good-campaign benchmark (from 11-launch):

- Bounce under 3%
- Reply rate 2%+
- Positive reply rate 15%+ of replies
- 1 positive per 50 to 100 contacts
- LTA 50% (min 30%), show rate 70%+

Caveat before you call anything broken: a low reply rate with a high positive
reply rate can be normal for some niches (real estate replies less but converts).
Read leads-per-positive, not raw reply rate, before you "fix" a message that is
not broken.

## Step 4: Classify the campaign

Give one verdict (from 11-launch):

- Winning (at benchmark): scale. Do not optimize. More volume, same playbook.
  Stop here, no fix needed.
- Mediocre (within 50% of benchmark): optimize. Find the weak layer in Step 5,
  test 2 to 3 variants, 1,000+ contacts each.
- Losing (50%+ below benchmark): pause and rethink. Walk all four pillars
  bottom-up. The fix is usually upstream.

Also check the data is real before you conclude. 100 emails and 1 reply is not
data. Need 500 to 1,000 sent before any verdict.

## Step 5: Find the broken pillar (bottom-up)

Walk the four pillars in order. The first one that fails is the cause. Do not
reach for copy first.

1. Deliverability. Does it hit the inbox? Reply dropped on the same list and copy
   with nothing changed, or bounce climbed. Confirm infra with tools-doctor, dial
   sending back, re-warm or stand up fresh inboxes with inboxkit-provision (and
   new domains via domain-generator and domain-purchase if needed). Route to
   05-deliverability.
2. Prospect (list and targeting). Right people? Two modes: targeting off (you
   book calls but qualification rate is bad) or data quality off (right company
   and title but bounce spikes from invalid or catch-all emails). Route to
   06-market-research and 10-lead-list.
3. Offer and Copy (the message). Deliverability and targeting check out but
   engagement is low. Test a copy-angle variant and a lead-magnet variant in
   parallel (spin and QA them with spintax-sendkit and copy-qa). Route to
   09-copy-frameworks and 07-offer.
4. Scale. All three below check out but still not enough calls. You are probably
   under-volumed. Send more at the same ratio once the math confirms it. Route to
   04-scale.

Back half: replies are healthy but calls do not book or do not show (low LTA or
show rate). Route to 13-lead-to-appointment.

After a fix, re-measure with sendkit-analyze-campaign (Sendkit users) before you
conclude anything.

## Step 6: Name it and route

State the broken pillar in one line, give the verdict (scale, optimize, or kill),
then invoke the matching skill. The full four-pillar diagnostic engine lives in
11-launch. Offer to write the diagnosis to a file if it is involved.

## The rule

One cause at a time. Find the lowest broken number in the funnel, fix that,
re-measure, then move up. Do not change five things at once or you learn nothing.

## Where this hands off

Build questions ("where do I start," "what's next") go to the
launchpad-orchestrator skill instead. Follow CLAUDE.md. Reference Loom and
affiliate tokens, never raw URLs.
