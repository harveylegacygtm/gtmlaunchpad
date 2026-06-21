# The Launchpad

A complete cold outbound system you run inside Claude Code. It guides you to
build, launch, and scale cold email to 10 to 30+ booked calls a month, and it
does the work with you: buys domains, sets up inboxes, writes and QAs copy,
builds campaigns, and diagnoses what to fix.

Built on the SCOPE method (Scale, Copy, Offer, Prospect, Email Deliverability)
by Legacy GTM x Revenue Boost.

---

## What you need

- [Claude Code](https://claude.com/claude-code) installed (it includes Node, so
  there is nothing else to install).
- Your own accounts and API keys for the tools you want to automate: Sendkit
  (sequencer), InboxKit (inboxes), Dynadot or Spaceship (domains). You only need
  the ones you use.

You do not need to be technical. The skills run the commands for you.

---

## Install

In Claude Code, run:

```
/plugin marketplace add <OWNER>/gtmlaunchpad
/plugin install launchpad@launchpad-marketplace
```

(Replace `<OWNER>` with the GitHub account that hosts this repo.) To update
later: `/plugin marketplace update`.

---

## First-time setup (once)

1. Run the **connect-tools** skill: say "connect my tools." It walks you through
   signing up for each tool, getting your API key, and pasting it into your
   Claude Code settings file (`~/.claude/settings.json`). Your keys live in your
   home folder, never in this repo, and never in chat.
2. Run **tools-doctor**: say "check my connections." Green means you are ready.

That is the whole setup. See the exact key names in
[launchpad/reference/tool-connections.md](launchpad/reference/tool-connections.md).

---

## How to use it

- **Building from scratch?** Say "help me build my outbound system." The
  **orchestrator** finds your stage and walks you through it one step at a time.
- **Something is broken?** Say "my replies dropped" or "calls aren't showing up."
  The **diagnostic** pulls your numbers, finds the one broken pillar, and fixes
  it.

You can also call any step directly, for example "build my money model," "find me
domains," "write my cold email," or "analyze my campaign."

### What is inside

- **Strategy (SCOPE):** money model, deliverability plan, ICP research, offer,
  campaign architecture, copy frameworks, lead list, launch and operate, and the
  reply-to-show conversion engine.
- **Tools that do the work:** find and buy domains, provision inboxes with DNS
  and warmup, build and launch campaigns in Sendkit, and analyze performance.
- **Helpers:** spintax, copy QA, connection setup and health checks.

---

## Safety and costs

- **You approve every spend and send.** Buying domains or mailboxes, and
  launching a campaign, are hard-gated: nothing happens until you confirm in your
  own terminal by typing a code. This holds even in bypass-permissions mode.
- **You pay the third-party costs** (domains, inboxes, sequencer). The Launchpad
  never charges you and ships with no keys of its own.
- **You are responsible for compliance** with anti-spam law (CAN-SPAM, GDPR, and
  similar) and for how you use the system.

---

## For the maintainer

- The plugin source of truth is [launchpad/](launchpad/). The build rulebook is
  [CLAUDE.md](CLAUDE.md).
- Before going live, paste real links into
  [launchpad/reference/affiliate_links.md](launchpad/reference/affiliate_links.md)
  and [launchpad/reference/loom_links.md](launchpad/reference/loom_links.md), and
  set the booking link (`CTA-BookCall`) and main site (`DOMAIN-Main`). Every skill
  and SOP that uses a token updates at once.
- `.claude/` is a local-only test mirror (git-ignored). Do not edit it directly,
  it is a copy of `launchpad/`.

---

## License

Proprietary. All rights reserved. See [LICENSE](LICENSE).
