---
name: sendkit-analyze-campaign
description: >
  Use this skill to pull live campaign numbers from Sendkit and turn them into a
  verdict and next steps. Trigger when the user says "analyze my campaign,"
  "how are my campaigns doing," "pull my Sendkit numbers," "check my campaign
  performance," "which campaign is winning," "is this campaign working," or wants
  real data behind a diagnosis. It reads the metrics from the Sendkit API,
  computes the rates, scores each campaign against benchmark, and hands the
  result to the diagnostic skill. Do not just explain it. Pull the numbers and
  give the verdict.
allowed-tools: Read, Bash
---

# Sendkit Analyze: Pull the Numbers, Get the Verdict

Do not summarize this. Pull the real data and tell the user what to do. What they
walk away with: each campaign's reply rate, positive rate, bounce, and leads per
positive, a winning/mediocre/losing verdict, and a clear next step. This skill is
the live data front end for the diagnostic skill (SOP 11). It fetches, the
diagnostic decides.

## Step 0: Preflight

Confirm Sendkit is connected:

```
node ${CLAUDE_PLUGIN_ROOT}/scripts/doctor.mjs sendkit
```

If MISSING or BAD, route to connect-tools, then come back.

## Step 1: Pick the campaigns

List what is running so the user can pick:

```
node ${CLAUDE_PLUGIN_ROOT}/scripts/sendkit/sk.mjs campaigns
```

Then analyze one campaign, or all of them:

```
node ${CLAUDE_PLUGIN_ROOT}/scripts/sendkit/sk.mjs analyze <campaignId>
node ${CLAUDE_PLUGIN_ROOT}/scripts/sendkit/sk.mjs analyze all --out report.csv
```

The script reads keys from env, never prints them, computes the rates, and prints
a verdict per campaign. It writes a CSV with --out.

## Step 2: Read the verdict

For each campaign the script returns the four leading numbers and one of:

- WINNING (at benchmark): scale it, do not optimize. More volume, same playbook.
- MEDIOCRE (within 50% of benchmark): optimize. Find the weak pillar.
- LOSING (50%+ below): pause and diagnose bottom-up.
- not enough data: keep sending, 500+ before any call.

Benchmark: bounce under 3%, reply 2%+, positive 15%+ of replies, 1 positive per
50 to 100 contacts (the same benchmark as 11-launch).

## Step 3: Hand off to the diagnostic

For any MEDIOCRE or LOSING campaign, hand the numbers to the diagnostic skill. It
walks the four pillars bottom-up (deliverability, prospect, offer and copy,
scale) and names the one broken pillar, then routes to the skill that fixes it:

- Deliverability -> 05-deliverability
- List or targeting -> 06-market-research and 10-lead-list
- Offer or copy -> 07-offer and 09-copy-frameworks
- Under-volumed -> 04-scale

For a WINNING campaign, do not tinker. Tell them to scale it.

## Step 4: Close the loop

If the fix is copy, the sentiment loop in 09-copy-frameworks rewrites it. If it is
ICP, 06-market-research rebuilds it. Then relaunch and re-analyze here to confirm
the lift. Lagging numbers (LTA, show rate) come from 13-lead-to-appointment, not
from Sendkit sending data.

## Rules

Follow CLAUDE.md. Grade 6, short sentences, no em-dashes, lead with the outcome.
Keys from env only, never printed. This skill pulls Sendkit data and feeds the
diagnostic skill, which is the brain. It pairs with sendkit-create-campaign (which
builds and launches) and reports up to 11-launch's dashboard. Metric field names
are mapped defensively in the script, confirm on first real run. Connection
details live in reference/tool-connections.md. Build questions go to the
orchestrator skill.
