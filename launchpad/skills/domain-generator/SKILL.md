---
name: domain-generator
description: >
  Use this skill to find available sending domains and compare prices across
  Dynadot and Spaceship. Trigger when the user says "find me domains," "generate
  domain names," "check domain availability," "what domains can I buy," "I need
  lookalike domains," "compare domain prices," or anything about picking or
  sourcing cold-email domains. Give it a branded keyword and a TLD, it generates
  lookalike variants, checks both registrars live, and returns an available-with-
  prices list. Do not just explain it. Run the check and produce their domain
  shortlist. To buy, hand off to the domain-purchase skill.
allowed-tools: Read, Write, Bash
---

# Domain Generator: Find and Price Sending Domains

Do not summarize this. Run the search and hand the user a real shortlist. What
they walk away with: a list of available lookalike domains, the price from each
registrar side by side, the cheaper pick per domain, and a CSV they keep. They
never send from their main domain, so this finds the lookalikes they send from.

## Step 0: Preflight the connection

This skill needs Dynadot or Spaceship keys. Run the doctor first:

```
node ${CLAUDE_PLUGIN_ROOT}/scripts/doctor.mjs dynadot
node ${CLAUDE_PLUGIN_ROOT}/scripts/doctor.mjs spaceship
```

If both are MISSING, route to the connect-tools skill, then come back. One
registrar is enough to run, but both gives a price comparison.

## Step 1: Get the inputs

Ask for:

1. The branded keyword or company name (for example "legacygtm").
2. The TLDs to try (.com is default and safest; .co, .io, .org are common
   lookalike options).
3. How many domains they need. If they do not know, the 05-deliverability skill
   sets the count from their sending volume (roughly 3 inboxes per domain, and
   the volume decides the inbox count). Default to generating about 15 candidates
   so there is room to pick.

## Step 2: Generate lookalike candidates

Build variants on their keyword using the 05-deliverability naming convention.
Never their main domain. Good patterns:

- Prefixes: get, try, use, go, the (getlegacygtm.com, trylegacygtm.com)
- Suffixes: hq, hub, app, co (legacygtmhq.com, legacygtmhub.com)
- TLD swaps on the clean name (legacygtm.co, legacygtm.io)

Keep them readable and on-brand. Avoid hyphens and numbers (they read as spam).
Cap the batch around 15 to 25 so the registrar rate limits are not an issue.
Write the candidates one per line to a temp file (for example domains.txt).

## Step 3: Run the check

```
node ${CLAUDE_PLUGIN_ROOT}/scripts/domains/check.mjs domains.txt --out domains.csv
```

Add `--registrar dynadot` or `--registrar spaceship` to check just one. The
script reads keys from env, never prints them, and outputs availability and price
from each registrar plus the cheaper pick. Price shows where the registrar's API
returns it (Dynadot returns it on search; confirm the final price at checkout).

## Step 4: Recommend and deliver

Show the table. Then recommend the shortlist: available, cheaper, and most
on-brand first. Flag anything that is taken so they do not waste time on it.
Write the CSV so they keep it. The CSV is also the exact input the next skill
buys from.

## Step 5: Hand off to purchase

When they pick the ones to buy, hand the approved CSV to the domain-purchase
skill. That skill buys them at the cheaper registrar, turns auto-renew off, and
gates the spend behind an explicit yes. Buying domains is covered by the Dynadot
({{AFF-Dynadot}}) and Spaceship ({{AFF-Spaceship}}) accounts.

## Rules

Follow CLAUDE.md. Grade 6, short sentences, no em-dashes, lead with the outcome.
Keys come from env only, never printed, never committed. This is an operational
tool under the 05-deliverability stage: 05 decides how many domains and the
naming rules, this skill finds and prices them, and domain-purchase buys them.
Connection details live in reference/tool-connections.md. Build questions go to
the launchpad-orchestrator skill.
