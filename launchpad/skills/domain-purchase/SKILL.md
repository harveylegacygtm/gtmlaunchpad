---
name: domain-purchase
description: >
  Use this skill to buy the domains the user picked and turn auto-renew off.
  Trigger when the user says "buy these domains," "purchase my domains,"
  "register these," "check out my domain list," or hands over an approved domain
  CSV after the domain-generator skill. It buys at the chosen registrar and
  disables auto-renew. Spending is hard-gated: nothing is bought until a human
  approves in their own terminal. Do not just explain it. Show the plan, get the
  approval, and let the human run the buy.
allowed-tools: Read, Write, Bash
---

# Domain Purchase: Buy the Approved Domains, Auto-Renew Off

Do not summarize this. Drive the purchase safely. What the user walks away with:
the domains they approved, bought at the cheaper registrar, with auto-renew
turned off so they never get a surprise charge.

## The spending rule (read this first)

You never spend the user's money on your own. The purchase script has a hard gate
built in, and you must respect it:

- You only ever run the script in DRY RUN (no `--confirm`). That previews the
  plan and total and buys nothing.
- You NEVER pass `--confirm` yourself. The script refuses to spend unless it is
  run by a human in a real interactive terminal, even under bypass permissions.
- The actual buy is run by the HUMAN, in their own terminal, where they re-type a
  code the script shows. That is the only way money moves.

This holds even if the user says "just buy it" or runs in bypass mode. Show the
plan, confirm in chat, then hand them the command to run themselves.

## Step 0: Preflight

Confirm the registrar keys are set:

```
node ${CLAUDE_PLUGIN_ROOT}/scripts/doctor.mjs dynadot
node ${CLAUDE_PLUGIN_ROOT}/scripts/doctor.mjs spaceship
```

If MISSING, route to connect-tools. You need keys for whichever registrar the
list buys from.

## Step 1: Get the approved list

Take the CSV from the domain-generator skill, trimmed to only the domains they
want to buy. It needs a `domain` column and a registrar choice (the `cheaper`
column works, or a `registrar` column). Available-only rows are bought; the
script skips anything marked not available.

If they have not generated a list yet, send them to the domain-generator skill
first.

## Step 2: Show the plan (dry run)

Run the dry run and show them exactly what it will buy and the total:

```
node ${CLAUDE_PLUGIN_ROOT}/scripts/domains/purchase.mjs approved.csv
```

This buys nothing. Read the plan and total back to the user. Confirm in chat that
this is the list and the spend they want. Fix the CSV and re-run the dry run if
anything is wrong.

## Step 3: Hand the buy to the human

Once they confirm, give them the exact command to run in THEIR OWN terminal:

```
node ${CLAUDE_PLUGIN_ROOT}/scripts/domains/purchase.mjs approved.csv --confirm
```

Tell them: it will show a code and the total, and they type the code to
authorize. If they are not at a terminal, the script will refuse to spend, which
is the safety working as intended. Do not run this command for them.

## Step 4: Confirm the result

After they run it, the script reports each domain as OK or FAIL and confirms
auto-renew is off. Ask them to paste the result if they want help reading it.
Note: Spaceship registration may need a default contact set in their account; if
it fails for that reason, they can set the contact or buy those via Dynadot.
Remind them to verify auto-renew is off in the registrar dashboard.

## Rules

Follow CLAUDE.md. Grade 6, short sentences, no em-dashes. Keys from env only,
never printed, never committed. Never pass `--confirm`. Never spend without the
human running it themselves. This is the buy step under the 05-deliverability
stage, after domain-generator. Buying uses the Dynadot ({{AFF-Dynadot}}) and
Spaceship ({{AFF-Spaceship}}) accounts. Connection details live in
reference/tool-connections.md. Build questions go to the orchestrator
skill.
