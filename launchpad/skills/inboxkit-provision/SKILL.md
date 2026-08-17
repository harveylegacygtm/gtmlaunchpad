---
name: inboxkit-provision
description: >
  Use this skill to stand up sending infrastructure in InboxKit: buy mailboxes on
  the domains, set and verify DNS (SPF, DKIM, DMARC), add warmup, and export the
  inboxes into Sendkit. Trigger when the user says "set up my inboxes," "buy my
  mailboxes," "provision InboxKit," "create my sending accounts," "set up DNS for
  my domains," "start warmup," "connect my inboxes to Sendkit," or anything about
  building the email infrastructure. Buying spends money, so it is hard-gated. Do
  not just explain it. Build the infrastructure with them step by step.
allowed-tools: Read, Write, Bash
---

# InboxKit Provision: Build the Sending Infrastructure

Do not summarize this. Build the infrastructure with the user. What they walk
away with: mailboxes bought on their domains, DNS verified, warmup running, and
the inboxes exported into Sendkit, ready to send. This is the 05-deliverability
build, executed.

Work one step at a time. Every step that spends money is gated: nothing is bought
until a human approves in their own terminal.

## Step 0: Preflight

```
node ${CLAUDE_PLUGIN_ROOT}/scripts/doctor.mjs inboxkit
node ${CLAUDE_PLUGIN_ROOT}/scripts/inboxkit/ik.mjs account
```

If MISSING, route to connect-tools (InboxKit needs INBOXKIT_API_KEY and
INBOXKIT_WORKSPACE_ID). The account call shows their credits and the per-mailbox
cost, so they know the budget before buying.

## Step 1: Decide the domains and counts

From 05-deliverability: how many inboxes they need (volume drives it), and the
plan of about 3 mailboxes per domain. Two ways to get domains:

- They already own domains (bought via the domain-generator and domain-purchase
  skills). Connect them to InboxKit and point nameservers.
- Register new domains through InboxKit (gated):

```
node ${CLAUDE_PLUGIN_ROOT}/scripts/inboxkit/ik.mjs register-domains spec.json
```

where spec.json carries `domains` (name + registration_years) and
`contact_details`. Set `"use_wallet_balance": true` to pay from credits, else the
script returns a Stripe checkout URL to finish.

## Step 2: Set and verify DNS

InboxKit manages SPF, DKIM, and DMARC. Check and verify each domain:

```
node ${CLAUDE_PLUGIN_ROOT}/scripts/inboxkit/ik.mjs dns yourdomain.com
node ${CLAUDE_PLUGIN_ROOT}/scripts/inboxkit/ik.mjs verify yourdomain.com,otherdomain.com
```

Verify is read-only and reports healthy / needs-repair per domain. Do not buy
mailboxes until DNS is healthy.

## Step 3: Buy the mailboxes (gated)

Write a spec.json with the mailboxes to create. About 3 per domain, real human
names, GOOGLE platform by default (max 5 per domain for Google/Microsoft):

```json
{
  "mailboxes": [
    { "first_name": "Sam", "last_name": "Lee", "username": "sam", "platform": "GOOGLE", "domain_name": "getlegacygtm.com" },
    { "first_name": "Dana", "last_name": "Kim", "username": "dana", "platform": "GOOGLE", "domain_name": "getlegacygtm.com" }
  ]
}
```

Then run the gated buy. You only ever run the dry run. The human runs the
--confirm version in their own terminal:

```
node ${CLAUDE_PLUGIN_ROOT}/scripts/inboxkit/ik.mjs buy-mailboxes spec.json          (dry run, shows cost)
node ${CLAUDE_PLUGIN_ROOT}/scripts/inboxkit/ik.mjs buy-mailboxes spec.json --confirm  (human runs this)
```

New mailboxes start as "scheduled".

## Step 4: Poll until active

```
node ${CLAUDE_PLUGIN_ROOT}/scripts/inboxkit/ik.mjs status <uid,uid>
node ${CLAUDE_PLUGIN_ROOT}/scripts/inboxkit/ik.mjs mailboxes --status active
```

Wait until they are active before warmup.

## Step 5: Add warmup (gated)

Warmup is the 2 to 3 week foundation (see 11-launch). Write a spec.json with
`mailbox_uids` and run the gated add:

```
node ${CLAUDE_PLUGIN_ROOT}/scripts/inboxkit/ik.mjs add-warmup spec.json --confirm
node ${CLAUDE_PLUGIN_ROOT}/scripts/inboxkit/ik.mjs warmup-stats
```

Warmup recurs as a credit cost, so it is gated like a purchase. Check warmup-stats
to watch health climb.

## Step 6: Export the inboxes to Sendkit

Push the warmed mailboxes straight into the sequencer so they are ready for a
campaign. spec.json carries `sequencer_uid` and `mailbox_uids`:

```
node ${CLAUDE_PLUGIN_ROOT}/scripts/inboxkit/ik.mjs export spec.json
```

Now the inboxes show up in Sendkit (sendkit-create-campaign uses them, by tag).

## Rules

Follow CLAUDE.md. Grade 6, short sentences, no em-dashes, lead with the outcome.
Keys from env only, never printed. Never run a buy or warmup-add with --confirm
yourself, hand it to the human. This skill executes the 05-deliverability build:
05 decides the counts and naming, this provisions, domain-generator and
domain-purchase supply domains, 11-launch sets the warmup timeline, and the
inboxes feed sendkit-create-campaign. InboxKit can also run inbox-placement
(spam) tests, email-insights deliverability reports, and InfraGuard blacklist
monitoring. Connection details live in reference/tool-connections.md. Build
questions go to the orchestrator skill.
