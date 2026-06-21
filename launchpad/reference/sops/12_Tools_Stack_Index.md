# 12 — Tools Stack Index

*The Launchpad Playbook  •  Module: Cross-cutting reference (tools)  •  Reading time: ~12 min  •  Action time: 30 min to pick your stack; 1–2 hours to set up the core tools*

## What you get from this SOP

**The exact tool stack to buy, in the order to buy it, and nothing you don't need.**

By the end you'll know which tools to set up day one, which to add later as you scale, and roughly what each costs. The Money Model (SOP 04) tells you how much you'll spend. This tells you where it goes.

## 👉 Want us to set up and run this whole stack for you so you can just focus on closing deals? 

## **Book a call here: {{CTA-BookCall}}** 🚀

## How to use this document

This is the master reference for every tool we use across the methodology. Bookmark it. Come back when you're ready to buy something.

**This is a minimum viable stack.** There's a gazillion sales and AI tools on the market. You don't need to know all of them. You just need enough to start.

The Launchpad Cost Calculator (SOP 04) tells you what your total monthly spend looks like for your volume. This document tells you which tools that money goes toward, and in what order to buy them.

## Decision flow — what to buy first

Don't buy everything at once. Buy in this order:

- Domain registrar (~$3–10/quarter per domain)

- Inbox infrastructure provider (InboxKit recommended)

- Sequencer (Sendkit default)

- Lead orchestration (Clay default; Bitscale/Prospectee alts; Claude Code DIY)

- Lead source primary (AI Ark default)

- Lead scoring / enrichment (OpenAI API key with Clay, via Claygent or a Clay ChatGPT column)

- Email finder waterfall (emails included in AI Ark + Prospeo; Findymail, Enrich.so as backups)

- Reply management (MasterInbox)

- Call booking software (Calendly, or comes with your CRM)

- CRM (GHL recommended; HubSpot if you need a full marketing stack)

- Call recording / sales enablement (Fathom)

## Non-Negotiable stack

### Domain registrars

**What it does:** You buy domains here. These are the lookalike domains you send from (yourcompany.io, getyourcompany.com, etc.). Never your main domain.

**When to buy:** Day one. Before anything else.

| **Tool** | **Best for** | **Affiliate** |
| --- | --- | --- |
| Dynadot | Bulk domain purchases, clean UI, reliable | {{AFF-Dynadot}} |
| Spaceship | Modern interface, good for first-timers | {{AFF-Spaceship}} |
| Porkbun | Solid pricing, good third option to rotate | {{AFF-Porkbun}} |

**Use this when:** Any of the three works. We rotate across all three because of quarterly availability and pricing swings on .info, .co, and .com variants.

**[LOOM: LOOM-05-Dynadot-BuyDomains]** The domain-buying walkthrough.

**Skip if:** You're using a managed inbox provider (like InboxKit) where you can buy domains straight from them.

### Inbox infrastructure (InboxKit)

**What it does:** Provisions, configures, and maintains the inboxes you send from. Handles DNS records, warmup, and ongoing health monitoring. Replaces burnt domains automatically.

**When to buy:** Day one. The single biggest "do not DIY" decision in the methodology.

| **Tool** | **Best for** | **Pricing** | **Affiliate** |
| --- | --- | --- | --- |
| InboxKit | Default for everyone. Managed Google + Microsoft 365 + Azure inboxes, automatic warmup, domain rotation | ~50% off retail (passes through reseller savings) | {{AFF-InboxKit}} |

**[LOOM: LOOM-05-InboxKit-Setup]** Full ordering walkthrough (also referenced in SOP 05).

### Sequencer (Sendkit)

**What it does:** The platform that actually sends your campaigns. Connects to your inboxes, runs sequences, handles spintax, manages bounces, and shows your core metrics.

**When to buy:** Day one, same time as inbox infrastructure, so it can run warmup.

| **Tool** | **Best for** | **Pricing** | **Affiliate** |
| --- | --- | --- | --- |
| Sendkit | Default. Best UX, strong inbox warmup, isolated IP, native to InboxKit | $97–$300+/mo by tier | {{AFF-Sendkit}} |
| Instantly | Alternative. Easy to start, good below ~5k/day | $97+/mo | {{AFF-Instantly}} |

### Lead orchestration (Clay / alternatives)

**What it does:** The spreadsheet-on-steroids that takes raw company and people data, enriches it with signals, scores it, and outputs the final list you upload to your sequencer. The system's brain.

**When to buy:** Day one.

| **Tool** | **Best for** | **Pricing** | **Affiliate** |
| --- | --- | --- | --- |
| Clay | Default. Most polished UX, biggest integration ecosystem, broad enrichment library | ~$446/mo for the tier we use | {{AFF-Clay}} |
| Bitscale | Budget alternative. Same workflow as Clay, ~3x cheaper | ~$150/mo | {{AFF-Bitscale}} |
| Claude Code (DIY) | Power users who want full custom control via scripting | Anthropic's paid plan | n/a |

**Use this when:**

- **Clay** if budget supports it and you'll use the broader integration ecosystem (most users).

- **Bitscale** if you need the ~3x savings to make the math work, and you're not running ads or complex CRM integrations.

- **Claude Code DIY** if you have the technical chops and want maximum flexibility: your own enrichment pipelines, scoring logic, and scrapers. Highest ceiling, most setup work.

**[LOOM: LOOM-12-Clay-HowToUse]** The orchestration walkthrough.

### Lead source primary (AI Ark)

**What it does:** Source of company data, people data, and verified emails. Replaces what most people use Apollo for. Has API access, so it works as both a discovery tool and an email-finder API in your waterfall.

**When to buy:** Day one. You need somewhere to find leads.

| **Tool** | **Best for** | **Pricing** | **Affiliate** |
| --- | --- | --- | --- |
| AI Ark | Default primary source. Broad coverage, good email accuracy, API access | Credit-based, scales with volume | {{AFF-AIArk}} |

**How it fits in:** AI Ark is your first-pass tool. You pull company and people data with verified emails. For people AI Ark doesn't have or can't verify, you cascade through the waterfall (below). Most people get 60–70% of their list from AI Ark alone.

**[LOOM: LOOM-12-AIArk-HowToUse]**

### Lead source alternative (local businesses)

If your market is local or brick-and-mortar, Google Maps sources are your best friend. Build your own scraper with Serper.dev (a Google Maps scraper), or browse a local-business database like localpipe.io. Both have trade-offs.

**[LOOM: LOOM-12-LocalMaps-LeadSources]**

### Lead list enrichment / scoring (OpenAI API key via Clay)

You'll create your own OpenAI API key at platform.openai.com. This key plugs into Clay (or an alternative).

**What it does:**

- **Website scraping / internet research:** if it's on the internet and scrapable, Claygent can get it. Great for automated account research at scale, to generate data for qualification and personalization.

- **Content creation / modification:** based on the data you have, it can score and qualify the account, or write the personalization for each account and lead.

**[LOOM: LOOM-12-Clay-OpenAIEnrichment]** When to use which function.

### Email finder waterfall

**What it does:** When AI Ark doesn't have a verified email for a contact, these are the providers you cascade through. Each has different coverage, so combining 2–3 in a waterfall raises your hit rate.

**When to buy:** Growth tier and above, when you're hitting AI Ark misses often enough that the missed leads are worth the spend.

| **Tool** | **Best for** | **Pricing** | **Affiliate** |
| --- | --- | --- | --- |
| Prospeo | Second-pass after AI Ark. Good fallback rate, pricier per credit | Credit-based | {{AFF-Prospeo}} |
| Icypeas | Third-pass. Catches some the others miss | Credit-based | {{AFF-Icypeas}} |

**Waterfall order rule:** cheapest first, most expensive last. AI Ark → Prospeo → Icypeas is a typical order. Stop the moment you get a verified email.

### Email validation waterfall

| **Tool** | **Best for** | **Pricing** | **Affiliate** |
| --- | --- | --- | --- |
| MillionVerifier | First layer of email verification | Credit-based | {{AFF-MillionVerifier}} |
| BounceBan | Catch-all email verification | Credit-based | {{AFF-BounceBan}} |

**[LOOM: LOOM-12-Waterfall-FinderValidator]**

### Call booking software (Calendly, or your CRM)

**What it does:** Call scheduling with built-in automations. Easy to use, fast to start.

**When to buy:** Day one.

| **Tool** | **Pricing** | **Sign-up link** |
| --- | --- | --- |
| Calendly | $10/seat | {{AFF-Calendly}} |
| CRM-native scheduler | Comes with your CRM | — |

### Reply management (MasterInbox)

**What it does:** Unifies replies across all your sub-inboxes and LinkedIn into one view. AI-categorizes replies (positive, OOO, objection, referral). Lets your team handle them without logging into the sequencer. Saves quick-reply templates. Integrates with Slack so positive replies notify the team in real time.

**When to buy:** When you send more than 5,000 emails a day, or you're combining email with LinkedIn.

| **Tool** | **Pricing** | **Affiliate** |
| --- | --- | --- |
| MasterInbox | Tier-based by inbox count | {{AFF-MasterInbox}} |

**Use this when:** You're past the "I check my sequencer's inbox a few times a day" stage. With a teammate, a VA, or a high-volume solo workflow, it starts paying for itself fast.

**Skip if:** You're solo and low-volume, and managing replies in Sendkit's native inbox is fine for now.

See SOP 13 — Lead-to-Appointment for the playbook on handling replies and using MasterInbox well.

### CRM (GHL / HubSpot)

**What it does:** Track deals, manage pipelines, and build automation around your closed-won → upsell motion. Cold outbound feeds the top of this; the CRM tracks what happens after the call.

| **Tool** | **Best for** | **Pricing** | **Affiliate** |
| --- | --- | --- | --- |
| GHL (GoHighLevel) | Modern, flexible, plays well with the outbound stack. Our default | Free tier; ~$29/seat for paid | {{AFF-GoHighLevel}} |
| HubSpot | Full marketing/sales/service stack. Overkill for outbound-only, useful if you also run inbound | Free tier; pricing scales fast | {{AFF-HubSpot}} |

**Use this when:**

- **GHL** if you mostly run outbound and want a clean CRM that doesn't fight you.

- **HubSpot** if you run multi-channel (outbound + ads + content) and need one platform.

**[LOOM: LOOM-12-GHL-HowToUse]** GHL training walkthrough. 

### Call recording / sales enablement (Fathom)

**What it does:** Records and transcribes your sales calls. Lets you search transcripts, pull objections, and feed them into AI for sentiment analysis on what's actually happening on calls.

**When to buy:** Day one. The data is gold for refining offer, copy, and ICP.

**Pricing:** Free tier covers most solo operators; paid ~$15/mo/user for advanced features.

**Affiliate:** {{AFF-Fathom}}

**Use this when:** You want to close the loop between campaigns and what happens on calls. Common objections become copy updates. Prospect language becomes copy improvements. This feeds the sentiment loop in SOP 09.

## Action items

- Map your monthly volume (use the Launchpad Money Model, SOP 04).

- Identify your day-one stack: domain registrar, InboxKit, sequencer, lead orchestration, AI Ark.

- Sign up and provision in order: domain registrar first, InboxKit second, sequencer third. Start warmup.

- While warmup runs, sign up for AI Ark and Clay (or an alternative) and start building your first list.

The goal: sending warm-up emails in 1–2 days, and live cold campaigns within 14–21 days after the inbox starts warming. Don't over-tool. Start with the minimum and add as the system tells you what it needs.

**Next:** [{{SOP-13}}]

# 👉 Want us to do this all for you and get you 10–30+ qualified meetings booked a month?

# **Book a call here: {{CTA-BookCall}}** 🚀