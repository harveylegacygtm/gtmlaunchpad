---
name: sendkit-create-campaign
description: >
  Use this skill to build a cold email campaign in Sendkit the right way: spintax
  the copy, QA it, despam it, load the mailboxes and settings, add leads, send a
  test, and launch only after a human approves. Trigger when the user says
  "create my campaign," "build a campaign in Sendkit," "set up my sequence in
  Sendkit," "load my copy into Sendkit," "launch my campaign," or hands over copy
  ready to send. Do not just explain it. Build the campaign with them step by
  step and produce a tested draft ready to launch.
allowed-tools: Read, Write, Bash
---

# Sendkit Create Campaign: Build It Right, Launch It Safe

Do not summarize this. Build the campaign with the user. What they walk away
with: a Sendkit draft campaign with spintaxed, QA-passed copy, the right
mailboxes and settings, leads loaded, a test email checked, and a launch that
only fires when they approve in their own terminal.

Work one step at a time. Confirm each step before the next. Nothing sends to real
leads until the gated start.

## Step 0: Preflight

Confirm Sendkit is connected:

```
node ${CLAUDE_PLUGIN_ROOT}/scripts/doctor.mjs sendkit
```

If MISSING or BAD, route to connect-tools, then come back.

## Step 1: Get the copy and campaign basics

Ask for:

1. The cold email copy (subject + body for each step in the sequence). If they do
   not have it, send them to the 09-copy-frameworks skill first.
2. The campaign name and which playbook it is (from 08-campaign-architecture).
3. The lead list (a CSV with at least an email column, from 10-lead-list).

## Step 2: Spintax the copy

Run every email through the spintax-sendkit skill so each send varies. Sendkit
uses single braces for spintax {a|b|c} and double braces for variables
{{firstName}}. Keep variables untouched.

## Step 3: QA and despam

Run the copy-qa agent on every email and spintax block. It loads the spam-word
list (reference/spam_words.md) and checks grammar, length, one CTA, no AI-isms,
no em-dashes, variables intact, and that every spintax option reads right.

Then the manual spam check: have the user paste each email into a spam-word
checker (Mailmeteor's free one) since that step has no API. Fix anything flagged.
Do not move on until copy QA passes clean. This is the SOP 11 Copy QA gate.

## Step 4: Load mailboxes, tags, and settings

Pull what is live in their account:

```
node ${CLAUDE_PLUGIN_ROOT}/scripts/sendkit/sk.mjs mailboxes
node ${CLAUDE_PLUGIN_ROOT}/scripts/sendkit/sk.mjs tags
```

Show the mailboxes and tags, and decide together:

- Which mailboxes (or which tag) send this campaign.
- Daily send limit per mailbox (start conservative, soft launch is 10 to 20% of
  target, see 11-launch).
- Schedule: sending days, hours, time zone.
- Tracking: opens off is safer for deliverability.

## Step 5: Assemble the spec and create the draft

Write the campaign spec to a JSON file (spec.json). Shape it from their answers.
A best-effort shape (adjust field names to the live API if create returns an
error, or run `sk.mjs inspect <existingCampaignId>` to mirror a real one):

```json
{
  "name": "Playbook A - SaaS founders",
  "mailboxTags": ["tag-from-step-4"],
  "schedule": { "timezone": "America/New_York", "days": [1,2,3,4,5], "startHour": 9, "endHour": 17 },
  "dailyLimit": 30,
  "trackOpens": false,
  "sequence": [
    { "stepNumber": 1, "delayDays": 0, "subject": "{{spintax subject}}", "body": "{{spintax body}}" },
    { "stepNumber": 2, "delayDays": 3, "subject": "...", "body": "..." }
  ]
}
```

Create the draft:

```
node ${CLAUDE_PLUGIN_ROOT}/scripts/sendkit/sk.mjs create spec.json
```

The script POSTs the spec as-is and prints the new campaign id, or the API error
so you can fix a field name and re-run. This makes only a draft, nothing sends.

## Step 6: Add the leads

Make sure the list is clean first (verified, deduped by domain, suppression list
applied, see 10-lead-list and the 11-launch pre-launch checklist). Then:

```
node ${CLAUDE_PLUGIN_ROOT}/scripts/sendkit/sk.mjs add-leads <campaignId> leads.csv
```

## Step 7: Send a test and final QA

```
node ${CLAUDE_PLUGIN_ROOT}/scripts/sendkit/sk.mjs test <campaignId> your@email.com
```

Have them open it and run Copy QA pass 2: does it read human, variables filled,
spintax clean, signature right, nothing awkward. Fix and re-test until perfect.

## Step 8: Launch (human-gated)

Launching sends real mail, so it is gated like spending money. You never launch
for them. Show them the command and let them run it in their own terminal:

```
node ${CLAUDE_PLUGIN_ROOT}/scripts/sendkit/sk.mjs start <campaignId> --confirm
```

It shows a code, they type it to authorize, and only then does it go live. If run
without a real terminal (an agent, even in bypass mode), it refuses. Remind them
to soft launch (10 to 20% of target) and watch deliverability daily (11-launch).

## Rules

Follow CLAUDE.md. Grade 6, short sentences, no em-dashes, lead with the outcome.
Keys from env only, never printed. Never run start with --confirm yourself. The
copy comes from 09-copy-frameworks, spintax from spintax-sendkit, QA from the
copy-qa agent and reference/spam_words.md, mailboxes and warmup from
05-deliverability, leads from 10-lead-list, settings and soft launch from
11-launch. After launch, sendkit-analyze-campaign reads the numbers. The create
body shape is best-effort, confirm it on first run (inspect an existing campaign
or read the API response). Connection details live in reference/tool-connections.md.
Build questions go to the orchestrator skill.
