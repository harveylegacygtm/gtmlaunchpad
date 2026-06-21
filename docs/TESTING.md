# The Launchpad — Tester Checklist

Thanks for testing. Run these in order. For each, the "Pass" column is what good
looks like. If something is off, open a GitHub issue (see bottom).

Setup once: install Claude Code, then in it run:

```
/plugin marketplace add harveylegacygtm/gtmlaunchpad
/plugin install launchpad@launchpad-marketplace
```

Most skills are free to test. The few that spend money or send email are clearly
marked GATED and will not do anything until you approve in your own terminal.

---

## 0. Setup and connections (do first)

| Prompt | Skill | Pass = |
| --- | --- | --- |
| "connect my tools" | connect-tools | Walks you to sign up, get a key, and paste it into ~/.claude/settings.json. Never asks you to type the key into chat |
| "check my connections" | tools-doctor | Prints OK / SET / MISSING / BAD per tool. Never prints the key itself |

## 1. The two routers

| Prompt | Skill | Pass = |
| --- | --- | --- |
| "help me build my outbound system" | orchestrator | Asks build-or-fix, asks what you have done, starts at the money model. Does not dump everything at once |
| "my replies dropped" | diagnostic | Asks for numbers (or pulls them from Sendkit), computes the rates, names ONE broken pillar bottom-up |

## 2. SCOPE strategy skills

| Prompt | Skill | Pass = |
| --- | --- | --- |
| "build my money model" | 04-scale | Asks deal size and goal, returns email volume and cost |
| "set up my domains and inboxes" | 05-deliverability | Decides domain and inbox counts from your volume, gives a build plan and cost |
| "build my ICP" | 06-market-research | Asks for customer data, produces ICP, signal map, two lists |
| "build my offer" | 07-offer | Runs the value equation, produces offer and lead magnet |
| "design my campaigns" | 08-campaign-architecture | Locks a campaign lineup from your ICP and offer |
| "write my cold email" | 09-copy-frameworks | Writes real sequences using your pains and offer |
| "build my lead list" | 10-lead-list | Decides data sources and waterfall, produces the list spec |
| "how do I go live and what do I track" | 11-launch | Dated launch timeline plus a leading/lagging dashboard |
| "I get replies but no calls" | 13-lead-to-appointment | Builds the objection playbook and show-up engine |

## 3. Utilities

| Prompt | Skill | Pass = |
| --- | --- | --- |
| "spintax this for SendKit: [paste an email]" | spintax-sendkit | Returns {a\|b\|c} spintax, keeps {{variables}} intact |
| "QA my copy: [paste email]" or "QA my lead list CSV" | copy-qa | Flags broken merges, spam words, AI tells row by row, asks before upload |

## 4. Tool skills, read paths (safe, no spend)

| Prompt | Skill | Pass = |
| --- | --- | --- |
| "find me domains for [keyword], .com and .co" | domain-generator | Returns available domains, price from each registrar, and a CSV |
| "analyze my campaigns" | sendkit-analyze-campaign | Pulls live numbers, scores winning/mediocre/losing, hands to diagnostic |
| "list my mailboxes" / "check my warmup" | inboxkit-provision (read parts) | Lists mailboxes, DNS, warmup status |

## 5. The spend/send GATES (test these deliberately)

The most important tests. Try to make it spend without approving, and confirm it
refuses.

| Prompt | Skill | Pass = |
| --- | --- | --- |
| "buy these domains: [approved CSV]" | domain-purchase | Shows plan and total, dry-run by default, buys nothing. Tells you to run --confirm yourself in a terminal |
| "provision my inboxes" / "buy my mailboxes" | inboxkit-provision | Same gate on buy-mailboxes and add-warmup |
| "build and launch my campaign in Sendkit" | sendkit-create-campaign | Builds a draft, sends a test, launch is gated |

Gate stress test (run in your own terminal):

```
node <plugin>/scripts/domains/purchase.mjs approved.csv --confirm < /dev/null
```

Pass = it REFUSES with "not an interactive terminal" and exit code 2. This proves
the gate survives bypass-permissions mode. An agent can never complete a purchase.

## 6. Full end-to-end (one tester, real keys)

This is the run that confirms the buy/create calls against the live APIs.

1. "connect my tools" then "check my connections" (all green)
2. "help me build my outbound system" then go through 04 and 05
3. "find me domains" then "buy these domains" (approve the gate in a real terminal)
4. "provision my inboxes": buy mailboxes, verify DNS, warmup, export to Sendkit
5. 06 to 10: build ICP, offer, campaigns, copy, list
6. "QA my copy" then "build my campaign in Sendkit", send a test, launch (approve)
7. Later: "analyze my campaigns", and if a number is low, "my replies dropped"

If any buy/create step errors, copy the exact API response into an issue. The
request shapes live in editable spec files, so a fix is usually a one-line change.

---

## How to report a bug

Open an issue at https://github.com/harveylegacygtm/gtmlaunchpad/issues with:

- The skill or prompt you used
- What you expected vs what happened
- Any error text (never paste your API keys)
