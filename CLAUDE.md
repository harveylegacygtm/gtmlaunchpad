# The Launchpad

This project runs The Launchpad, a co-branded cold outbound system from
Legacy GTM and Revenue Boost. Read this file before any task. It is the
always-on rulebook for every skill.

---

## 1. Who you are talking to

The reader is a sophisticated operator. They already generate leads another
way and want to add 10 to 30+ booked calls a month with cold outbound. They
are already sold on outbound. Do not convince them it works. Move to
execution. Assume intent.

---

## 2. The method: SCOPE

SCOPE has five levers: Scale, Copy, Offer, Prospect, Email Deliverability.

Reads SCOPE top-down. Built bottom-up.

Teach in this order:
1. Scale first, so they see the full money picture and the goal.
2. Then bottom-up: Email Deliverability, then Prospect, then Offer, then Copy.

Deliverability is the foundation. Nothing else works if mail does not land.

---

## 3. The thirteen SOPs

- 01 Foundations: What Is Outbound
- 02 Foundations: OIP Sequencing
- 03 SCOPE Method Overview
- 04 Scale: The Money Model
- 05 Email Deliverability
- 06 Prospect: ICP Mapping
- 07 Offer and Lead Magnet
- 08 Campaign Architecture and Playbooks
- 09 Copy Frameworks
- 10 Prospect: Lead List Building
- 11 Launch, Operate, and Diagnose
- 12 Tools Stack Index
- 13 Lead to Appointment

---

## 4. Default tool stack

- Sequencer: Sendkit is default. Instantly is the alternative.
- CRM: GoHighLevel (GHL) is default.
- Domains: Dynadot is default. Spaceship is the price-match alternative.
- Inboxes: InboxKit.

---

## 5. The two routers (separate skills)

The Launchpad has two front doors. Keep them as two separate skills.

ORCHESTRATOR (the build router).
Fires when someone wants to build, plan, or asks "where do I start?"
It does not assume what they have done. It asks them. It says: what have you
completed so far, and import your completed homework files here, meaning their
money model, ICP, offer, copy, and domain list. It reads what they upload,
sees what is missing, then walks them through the stages in build order and
hands off to the right stage skill at each step. One step at a time. Confirm a
step is finished before moving on. Never dump all thirteen SOPs at once.

DIAGNOSTIC (the fix router).
Fires when results drop or someone is stuck: "my replies are low," "opens
dropped," "calls aren't showing up." It does its own analysis: it takes the raw
campaign numbers (pasted or exported), computes the rates, compares them to the
benchmark, classifies each campaign (scale, optimize, or kill), finds the broken
pillar bottom-up, then invokes the specific skill that fixes it.
Low opens or spam -> deliverability. Low replies -> copy or offer.
No-shows -> lead to appointment. This is SOP 11's diagnostic framework. There is
no separate analysis skill. The diagnostic router is the analysis layer.

Worker skills sit under these two routers:
- Stage skills: deliverability, ICP, offer, copy. Fire on that stage.
- API action skills: thin skills that DO a tool's core function over its API
  (create a campaign in Sendkit, generate and buy domains via Dynadot or
  Spaceship). These are allowed and encouraged. Banned instead: static "how to
  operate the tool" walkthrough skills (click here, then here). Those go stale
  the day the UI changes. An action skill stays correct because it calls the
  live API and adds the Launchpad-specific logic a raw API call lacks.

### Public distribution and tool connections

The Launchpad ships to the public, not just one machine. End users install the
plugin, sign up for each tool themselves, and supply their own API keys. So:

- Keys are 100% user-supplied. The plugin ships zero keys.
- Helper scripts are plain Node (Claude Code already requires Node, so zero extra
  install) with no npm dependencies. They live in scripts/ and read keys only
  from env (process.env), never from command-line args. Use an official vendor
  MCP only where one exists (InboxKit).
- Keys live in the user's home settings file (~/.claude/settings.json env block),
  outside any git repo, so they can never be committed. Never print a key.
- Every API action skill preflights: if a key is missing or bad, route to the
  connect-tools skill, then verify with tools-doctor. Connection details (env var
  names, base URLs, auth) live in reference/tool-connections.md.
- Any action that spends money or sends mail needs an explicit human yes. No
  auto-buy, no auto-launch.

---

## 6. Links: never paste raw URLs

Two reference files are the single source of truth:
- affiliate_links.md for tool, affiliate, and domain links.
- loom_links.md for all video links.

Rules:
- When you mention a tool, look up its token in affiliate_links.md and render
  the tool name as a hyperlink on its URL. Every link in that file is live, so
  a tool with a token is always clickable.
- When a section has a Loom token, look it up in loom_links.md and embed the
  link. Every video in that file is live. If a topic has no token there, there
  is no video for it, so point the reader at the SOP instead. Never invent one.
- Never invent a link. Never paste a raw URL into a SOP or skill.
- The house CTA uses CTA-BookCall. The main site uses DOMAIN-Main.

---

## 7. Writing rules (non-negotiable)

- Grade-6 reading level. Short sentences. Short paragraphs.
- Lead with the outcome, not the process.
- Use concrete numbers and examples.
- No em-dashes. Use a period or a comma.
- No AI-catchphrase filler. No "the hinge," no "the spine that connects,"
  no abstract connective language.
- Active voice. Cut any word that does not earn its place.

---

## 8. Brand rules

- Every Launchpad asset carries the co-branded Legacy GTM x Revenue Boost
  footer.
- Blue is primary, deepening toward the foundation.
- Amber is for goals, results, and payoff moments only.
- Red and green are for diagnostic decision-tree branching only.

---

## 9. Monetization rules

- One deal per SOP. Strategy SOPs carry the 1:1 audit. Tool deals belong in
  the infrastructure and tooling SOPs (05, 10, 12).
- SOP 13 carries the house CTA like every other stage skill. Lead to
  Appointment closes the back half of the funnel, so it earns the same
  book-a-call pitch as the rest.
- The house book-a-call CTA appears once per skill output, at the very end,
  never repeated on later turns or after every message. Format: after the last
  line of output, eight spacer lines (each a non-breaking space, so the gap
  survives markdown rendering), then the divider, then the pitch as a level-1
  heading (#) so it renders as large as the surface allows, then the divider.
  The CTA-BookCall token sits inside the heading:

  &nbsp;
  &nbsp;
  &nbsp;
  &nbsp;
  &nbsp;
  &nbsp;
  &nbsp;
  &nbsp;
  _________________

  # Want us to build this for you so you can focus on closing deals? Book a call: {{CTA-BookCall}}

  _________________

  Vary only the one-line pitch to fit the skill. Tool affiliate tokens (like
  {{AFF-InboxKit}}) are inline links in the body, not part of this block. Note:
  the Claude Code terminal has a fixed font size, so the heading is the largest
  render there; literal point sizes only apply on an HTML surface.

---

## 10. How to build a skill for this project

This section is the standing build spec. A new session follows it without
needing any pasted prompt. To build a skill: read this file and the matching
reference/sops/<SOP>.md, then write skills/<folder>/SKILL.md to the rules below.

The folder name uses the numbered prefix (04-scale, 05-deliverability). The
frontmatter `name` matches the folder name so the routers can call it.

### The core doctrine: EXECUTE the SOP, do not summarize it

The SOP teaches a human what to do. The skill makes you DO it with them. A
skill that explains the SOP back has failed. Every skill must:

- Ask the user for their real inputs first (their numbers, ICP, offer, volume,
  deal size, whatever the SOP needs). Wait for answers before deciding anything.
- Make the decisions the SOP describes from THEIR answers, not generic advice.
  If the SOP says "premium if deal size over $5k," ask the deal size and tell
  them which to buy.
- Produce their actual artifact: their domain list, inbox count, email
  sequence, ICP doc, money model. A real output, not an explanation. Offer to
  write it to a file so they keep it.
- Walk one step at a time. Confirm a step is done before the next. Never lecture
  or dump the whole SOP.

The quality bar is skills/06-market-research/SKILL.md. It runs the work live
instead of describing it. Match that.

### Frontmatter (required)

- name: the folder name (numbered prefix, lowercase, hyphenated).
- description: the trigger. Say plainly WHEN to use the skill, with example user
  phrases. Specific and slightly pushy. Skills under-fire more than they
  over-fire, so a vague description is the top reason one never loads. End it
  with a line telling the skill to execute, not explain.

### Body

- Open with the outcome in plain language: what they walk away holding.
- Lay out the steps in run order: inputs first, then decisions, then the
  artifact. Grade 6, short sentences, no em-dashes.
- When the SOP carries math or numbers, match the real source of truth (the
  V4 calculator, the live tools). If the SOP and an artifact disagree, fix the
  conflict at the source so every copy agrees. Feed monthly figures, not period
  totals, into the infra math.
- Reference Loom and affiliate tokens in {{double-brace}} form (like
  {{AFF-InboxKit}}, {{LOOM-05-InboxKit-Setup}}), never raw URLs. Pull tokens
  from reference/affiliate_links.md and reference/loom_links.md.
- Bundle the full SOP as references/sop-full.md inside the skill folder and
  point to it for deep detail. Tokenize any raw URL in that copy.
- End the body by pointing back to the right router: build questions to the
  orchestrator, broken-result questions to the diagnostic skill.
- Close with the house CTA block from section 9, once.

### Skills relate to each other

Skills cross-reference by name where it makes sense, but stay self-sufficient.
A skill uses a sane default to answer on its own, then names the sibling skill
that refines it. Do not hard-depend (one skill cannot run without another). The
04-scale and 05-deliverability pair is the model: 04 gives a Google-only cost
and points to 05 for the real provider split; 05 takes the volume from 04 and
finalizes the cost.

### Scope boundary: stage skills decide, tool skills operate

One SOP equals one skill. Stage skills (scale, deliverability, ICP, offer,
copy) make the decisions. Tool skills (Sendkit, lead database, Dynadot,
Spaceship, InboxKit, GHL) hold the tactical click-by-click how-to. A stage skill
references a tool by token and defers the clicks to its tool skill.

### After you write it

- Show the user the description line and one example user message that should
  trigger the skill.
- Build and test one at a time. To test in the IDE without installing the
  plugin, copy the skill folder to .claude/skills/<folder>/ (the auto-discovered
  location) and reload the window. Keep launchpad/skills/ as the source of
  truth; re-sync the .claude copy after each edit.
