# 05 - Email Deliverability: Principles & Protocols

*The Launchpad Playbook · Module: E in SCOPE - Email Deliverability*

**Reading time:** 18-22 min • **Action time:** 60-90 min first-time setup; ~0/week if outsourced

## What you get from this SOP

By the end of this page:

- **You'll land in the primary inbox - on purpose.** A clean sending system (domains, inboxes, warm-up) that actually reaches prospects, so the offer and copy you sweated over get *read* - not buried in spam where nobody looks.

- **You'll stop lighting money on fire.** You'll dodge the setup mistakes that burn domains in 2-4 weeks instead of 3+ months, tank "perfect" campaigns into spam, and force you to rebuild infrastructure you already paid for once.

- **You'll unlock a Launchpad-only deal.** We hand you the exact managed setup we run across our own agencies - *plus* a no-commitment way to spin it up cheap with our infrastructure partner. (It's in the setup section below. Keep reading.)

**TL;DR**

- Deliverability is whether your email lands in the primary inbox or rots in spam. Get this wrong and nothing else in SCOPE matters - that's why **E is the foundation.**

- Two systems judge your mail: **ESPs** (the inbox host - Gmail, Outlook) and **SEGs** (security gateways in front of enterprise inboxes). Landing difficulty, easiest → hardest: **Google/non-Outlook → Outlook → SEG.**

- **First 90 days: send only to non-Outlook ESP leads** if you can. Build reputation on the easy lanes before you fight the hard ones.

- Five things drive deliverability, in order: (1) inbox & domain setup, (2) sequencer & warm-up, (3) your list, (4) your offer, (5) your copy.

- Don't DIY infrastructure - outsource to a managed provider. Never send from your main domain. Start on **Google**; add **Microsoft 365** or **Azure** only when your TAM or volume calls for it.

# **If you rather skip all of this technical set up and just worry about closing deals,**

# We’ll install and manage this system for your business.

# 👉 Book a call here: {{CTA-BookCall}}

## Why this is the foundation of SCOPE

SCOPE: Scale, Copy, Offer, Prospect, Email Deliverability. We teach Scale first so you see the math - then we build from the **bottom up**, and the bottom is **E**.

E holds up everything else. Best ICP in the world, an offer people would crawl over glass for, copy that could make a marble statue book a meeting - none of it counts if you land in spam, because you're broadcasting into a void. When did you last open your spam folder to see who emailed you? Never. Neither do your prospects.

Fix this first. Get it right and the rest of the system has a chance. Get it wrong and everything downstream is dead on arrival.

## What deliverability actually is

Between you hitting send and your prospect reading the email, three invisible things happen in milliseconds:

- **Authentication.** Providers check whether your sending domain is legit via three records - SPF, DKIM, DMARC. Missing or wrong? Flagged before the email is even considered.

- **Reputation ****&**** age.** They check your domain's history. Brand-new = suspicious. Older + clean = trusted. Spam complaints on record = done.

- **Inbox placement.** They decide primary inbox, promotions, or spam - using dozens of signals built from the first two.

You never see this. You only see the result: your reply rate. So when people say "my campaign isn't working," half the time the campaign is fine and the email never arrives.

**Deliverability is the engineering problem of staying in the primary inbox at scale.** Boring, technical, and the single most important thing in the system.

## Who actually judges your email: ESPs and SEGs

Before you build anything, understand who's on the other side deciding inbox vs. spam. There are two:

**ESP - Email Service Provider.** The system that hosts a mailbox. It shows up twice in your world:

- Your **sending ESP** - where *your* mailboxes live (Google Workspace, Microsoft 365, Azure).

- The **receiving ESP** - where your *prospect's* inbox lives (Gmail/Google Workspace, Outlook/Microsoft 365, Yahoo, etc.).

**SEG - Secured Email Gateway.** A security layer that sits *in front of* an inbox and filters mail before it ever reaches the ESP. Common at mid-size and enterprise orgs: Proofpoint, Mimecast, Barracuda, Cisco. They are built to block exactly what cold email looks like.

### The performance hierarchy (easiest → hardest to land)

Same email, same setup - your placement changes dramatically based on what's receiving it:

- **Google / non-Outlook ESPs** - most forgiving, best placement. Your bread and butter.

- **Outlook / Microsoft 365 ESPs** - stricter filters, age-sensitive.

- **SEG-protected inboxes** - the hardest. Designed to stop outsiders.

### The 90-day rule

**For your first 90 days, if possible, send only to leads on non-Outlook ESPs.** You're building domain and mailbox reputation from zero - don't spend it fighting the hardest filters before you've proven the basics on the easy lanes.

**Use domain ESP filters.** Most modern lead platforms now tag each company by its recipient ESP - non-Outlook vs. Outlook/SEG. Filter your list to non-Outlook for the first 90 days, then expand. **Proceed with caution:** respect the hierarchy, and don't point fresh infrastructure at SEGs.

## The 5 things that affect deliverability

The whole model in one analogy. You're ordering the best pizza of your life. Five things decide whether it shows up hot, correct, and worth re-ordering - and they map exactly onto what decides whether your email lands:

- **1. Inbox ****&**** domain setup - the chef and the oven.** How the pizza gets cooked. Most important by a mile.

- **2. Sequencer ****&**** warm-up pool - the delivery guy.** The platform that carries your email to the door; providers learn to trust or distrust it.

- **3. The list - the people you're delivering to.** Deliver a meat-lover's to a building of vegans and they report you.

- **4. The offer - the taste.** A weak offer means dead campaigns, and dead campaigns quietly rot your sender reputation.

- **5. The copy - the presentation.** How you plate the offer, plus the technical hygiene that keeps filters from flagging you.

We take each in order. Setup gets the most room - it matters most and it's the part you set up once and hand off.

# 1. Inbox & domain setup - the most important thing you'll build

Get it right once and everything else has a foundation. Get it wrong and you'll burn domains faster than you can buy them.

## Never send from your main domain

Rule one, no exceptions. If your company runs on yourcompany.com, you do **not** run cold outbound from it. One bad campaign tanks your reputation and suddenly your team can't get invoices delivered.

Instead, buy **lookalike domains**: yourcompany.io, getyourcompany.com, tryyourcompany.com. They point back to your brand, but if one burns, you throw it away and your real domain never feels it.

## Generate your domain names with Claude

Don't brainstorm by hand. Give Claude your brand and rules and let it produce a batch:

*"**I'm setting up lookalike domains for cold email. Primary domain: [yourcompany.com]. Brand keyword: [brand]. Generate 25 lookalike sending-domain options using patterns like get[brand], try[brand], the[brand], join[brand], use[brand], [brand]hq, [brand]app. Must be under 35 characters. Allowed TLDs: [insert]. No hyphens, no numbers, short, readable, clearly tied to my brand. Output as a CSV, one per line.**"*

## Pick a registrar

**Default: Dynadot** {{AFF-Dynadot}} (clean bulk-buying and DNS). Alternatives: **Spaceship** {{AFF-Spaceship}}**, Porkbun.** Two rules: don't register these at the same registrar as your main company domain, and buy in small batches. Never put more than ~250 domains in one account, in case of a mass ban.

Spaceship often price-matches the same .com and .co domains, so it is a fine swap if you want to shop price or you just prefer it. Buy the same way, follow the same rules, and connect to InboxKit the same way.

## Cheap vs. premium domains - which to buy

- **Cheap (.info): ~$3-4 each.** Cheaper to start - but they **burn out faster, 100%.**

- **Premium (.com / .co): ~$10-12 each.** Best deliverability, longest-lasting.

Why cheap burns: cold emailers piled onto cheap TLDs like .info - almost every .info registration today is *for* cold email. Spam filters caught on, so they burn faster than they used to.

**Two scenarios:**

- **You have budget and want best-in-market → buy premium right away.**

- **You need to prove cold-email ROI before committing budget → start cheap.** But know that once you prove the system, you'll **rebuild your infra on premium domains** for best results - so you're paying twice.

- **If your deal size is over $5k → skip the cheap phase. Go premium immediately.** The math justifies it.

## The DNS records - SPF, DKIM, DMARC

Three acronyms you'll see constantly. Exactly how much you need to know:

- **SPF** - lists which servers may send for your domain.

- **DKIM** - a signature proving the email really came from you, untampered.

- **DMARC** - a policy telling receivers what to do on a failure, and reporting back.

All three must exist and be correct on **every** sending domain. If one is missing or wrong, deliverability suffers and you look spammy on arrival. That's all you need - you don't need to know how they work under the hood. Setting these up by hand across hundreds of inboxes is hundreds of error-prone hours. Which is why:

## Why you should outsource setup

One of the few places we're completely unambiguous: **do not set up your own outbound infrastructure.**

- **It's tedious and error-prone.** Buying domains, configuring DNS on each, provisioning, warming, monitoring, replacing burnt domains - a full-time job for an expert.

- **The ****"****savings****"**** are an illusion.** Specialized providers buy in bulk; the reseller rate is roughly half of retail. That often covers the service fee, and you save the labor on top.

- **Your job is to run campaigns, not infrastructure.** Every hour on DNS is an hour not on offer, copy, or list.

**🎁 Launchpad Deal - Managed Infrastructure (InboxKit)** Our default go to infra set up provider: **InboxKit.** You just buy your domain and import it into inboxkit. They then configure SPF/DKIM/DMARC on every one, provision inboxes in your chosen mix, run warm-up and export them straight to your sequencer.

**What you unlock through The Launchpad:** a **custom pricing link - start with as little as $3 per inboxes/month, no commitment**.

Usually - you need to buy a monthly subscription where each inbox costs you $3.5-3.9 per mailbox, but with the Inboxkit Launchpad deal, you can launch your first campaign with just $3 per mailbox. 

You might not think 0.5 is a big difference but if you have a set up of 100 mailboxes - that’s $50 saved. **Think when you get to 1000, 10,000 mailboxes. **

👉 Sign up here: {{AFF-InboxKit}} and use code **GTMLAUNCHPAD** at checkout to lock in $3 per mailbox instead of $3.50.

A managed partner at scale also gives you **pattern recognition** - a team sending millions/month spots a provider's bad week or a dead warm-up protocol far faster than any single sender, and tells you what to change. 

That's most of how results stay consistent month to month.

## Your inbox lanes - Google, Microsoft 365, and Azure

| **Factor** | **Google Workspace** | **Microsoft 365 (real inboxes)** | **Azure tenants** |
| --- | --- | --- | --- |
| Inboxes per domain | 3 | 3 | 50 per tenant (1-2 domains per tenant) |
| Cold emails / inbox / day | ~15-20 | ~10 | ~2-5 |
| Cost / inbox / month | ~$3.50 | ~$3.50 | ~$0.60 |
| Best for | Default - your primary lane | Outlook/SEG-heavy ICPs | Cheap volume at scale |
| Main watch-out | - (most predictable) | Age-sensitive; needs aged mailboxes | One bad mailbox drags all 50 |

**Google is your primary lane, always - and the best all-around place to start.** Most predictable provider in the game, best to inbox, the benchmark everyone measures against. If you land in primary on Google, your fundamentals are sound. Start here.

**Azure is the cheap way to add scale** - 50 mailboxes per tenant at ~$0.60 each, far cheaper per email at volume. The catch: reputation is **pooled across the entire tenant**, so one slipping mailbox can damage all 50. Azure mailboxes can also burn faster than Google. Directionally, same setup: if Google gets ~2% reply rate, **Azure might land ~1.5-1.8%.**

**Microsoft 365 real inboxes are the premium Microsoft lane** - each carries its own isolated reputation, same cost as Google (~$3.50), and they're native to Microsoft-heavy environments.

### When to actually use Microsoft 365

Use M365 when your **TAM lives behind Outlook and SEGs heavily.** Concrete niches:

- **Healthcare orgs with 100+ employees**

- **Any organization with 500+ employees**

- **Regulated industries** - aviation, defense/military, finance, and the like

These run Outlook + SEGs and trust Microsoft-to-Microsoft mail more than Google-to-Microsoft cross-provider mail.

**The caveat - age is everything.** Only **warmed, ~3-month-old M365 mailboxes** can reliably land in these orgs. SEGs and Microsoft weight sender-reputation *age* heavily - a fresh M365 box gets bounced no matter how clean you send

So you must warm and send healthy for ~3 months before pointing M365 at enterprise/SEG targets.

### Pro tip - the Google → Microsoft 365 swap

If your offer serves **both** sub-500 and 500+ employee companies, build in this order:

- **Build your outbound + infra for the ≤500-employee segment first.**

- **Start on Google infra.** Run it, get consistent results, and keep warming domains and mailboxes - for **3+ months.**

- Once those domains have 3+ months of clean history: **cancel the Google subscription on them, swap the now-aged domains to Microsoft 365,** and warm the new M365 mailboxes for **2-4 weeks.**

- **Now send to the enterprise/SEG segment.** Expect **~2%+ reply rate** into SEG/Microsoft inboxes.

Why it works: the SEG trusts the **domain's** age and clean history; the 2-4 week warm rebuilds the **mailbox** layer on M365. Reality check: if that same setup got you ~4% on Google (to easier ESPs), aged M365 into enterprise might land **~1.5-2%** - lower, but it's pipeline you otherwise couldn't touch. Offer, copy, and list still matter most.

**Directional note:** the reply-rate figures above (Google ~2-4%, Azure ~1.5-1.8%, aged M365 ~1.5-2% into enterprise) are from our own sending, same-setup comparisons. Treat them as ranges, not guarantees - your numbers depend on offer, copy, and list.

### The case for SMTP mailboxes (advanced)

**What they are.** SMTP (Simple Mail Transfer Protocol) sending means sending through a raw mail-relay service rather than provisioned Google/Microsoft mailboxes - you send programmatically through an SMTP provider's servers.

**When to use them:**

- **Extremely high volume at low cost** - think 1-2 million+ emails/month.

- **When you're already advanced** with cold email and have proven infra.

**How to adopt:** don't switch blind. **Test SMTP head-to-head against your current best-performing infra** - same offer, copy, list. If SMTP delivers better (or as well, cheaper), keep it. If not, stay on mailboxes. For most readers in year one, this is not your move - master Google first.

**A few SMTP we recommend:**

- **Aerosends**

- **Missioninboxes**

## What warming up is - and why you can't skip it

Warming up means gradually mimicking real human sending so your inboxes don't look like spam cannons on day one. Two parties need confidence: the **sending ESP** (hosting your inboxes) and the **receiving ESP** (hosting your prospect's). Send full volume from day one and you'll kill inboxes 5-10× faster. A warmed mailbox lasts 3+ months; an un-warmed one often dies in 2-4 weeks.

**Warm-up protocol:** put each inbox in warm-up for 14-21 days before real volume. Warm-up emails should outnumber cold ("golden ratio"). Domain age does **not** transfer to mailbox reputation - even an aged domain needs every new mailbox warmed. Warm-up never fully stops; keep it running to maintain reputation.

Current per-platform baselines (from our partner InboxKit, re-tested across thousands of mailboxes):

| **Platform** | **Cold/day** | **Warm-up/day** | **Ratio (warm:cold)** | **Warm-up reply rate** |
| --- | --- | --- | --- | --- |
| Google Workspace | 15 | ~25 | 1 : 1.75 | 60% |
| Microsoft 365 | 10 | ~20 | 1 : 2 | 50-60% |
| Azure (per mailbox) | 2 | 5 (hard max) | - (5 max) | 60%+ |

**Ramp-up** (separate from warm-up): ramp cold volume gradually before full speed. Google: start 2-3/day, +2-3/day to ~15 over ~4 weeks. M365: start 2-3/day, +2/day to ~10 over ~4 weeks. Azure: start 1/day, +1/day to the 5 ceiling over ~5-7 days.

**Heads up:** warm-up and ramp protocols change quarterly - sometimes monthly. These are a current baseline, not physics. Get regular updates from your provider - especially when you buy the mailboxes.

## If your audience uses personal email domains

Some ICPs receive business mail at personal addresses (local contractors, small SMBs, many creators). Expect infrastructure to burn **3-5× faster**: personal inboxes have aggressive consumer spam filters, and sequencers can't warm against personal Gmail (no warm-up signal exists), so every send looks cold. 

You still warm for two weeks to prove out the sending side.

## Sizing it: how many inboxes and domains

Once you know your monthly send volume (from SOP 04), work from your daily target:

- **Google:** daily ÷ 15 = inboxes; inboxes ÷ 3 = domains.

- **Microsoft 365:** daily ÷ 10 = inboxes ÷ 3 = domains. .

- **Azure:** daily ÷ 2 = inboxes; inboxes ÷ 50 = domains (1 domain/tenant).

[The Launchpad calculator (SOP 04, Infra Calculator tab)](https://docs.google.com/spreadsheets/d/1gwuSKqS1QftrCzvMZqPy-yVfdHorb3dLGv8AYSjhYQk/copy) does this across your provider mix automatically. **Set your split here, then run it.**

**[LOOM: LOOM-04-MoneyModel-InfraCalc]** Now that you have picked your provider mix (Google, M365, or Azure), set the split in the calculator and read your monthly cost and ROI.

## Putting it together - setup via InboxKit

You give InboxKit your domainsm they configure SPF/DKIM/DMARC on every one, provision inboxes in your chosen mix, and start warm-up to the right ratios. 

You never touch a DNS record. When warm-up finishes, connect the inboxes to your sequencer and send.

**[LOOM: LOOM-05-InboxKit-Setup]** Full end-to-end ordering tutorial. 👉 {{AFF-InboxKit}}

# 2. The sequencer & its warm-up pool

Your delivery guy. The sequencer does the actual mass sending - connect dozens to thousands of inboxes to one platform and it handles distribution and warm-up. It carries a recognizable identity at the receiving end, so the platform you send through becomes part of your reputation, separate from your domains. It also runs the warm-up pool and IP infrastructure.

**🎁 Launchpad Deal - Sequencer (Sendkit.ai)** Our default: **Sendkit.ai** - delivers well, runs on isolated IP infrastructure, stays affordable at any volume, and is InboxKit's native sequencer (managed inboxes plug straight in with warm-up pre-configured). **What you ****unlock through The Launchpad:** **10% off every Sendkit plan + 500 credits to launch.** 👉 Sign up: {{AFF-Sendkit}} and use code **10GTMLAUNCHPAD**.

Other options: **Instantly** (easiest to start, good below ~5k/day), **EmailBison** (built for ~500k/month+). We still prefer Sendkit - delivers as well as Bison for 99% of cases at a price that works at any volume.

# How To Export Mailboxes From Inboxkit To Sendkit And Other Sequencers

For running your sequencer day to day (building, launching, testing, optimizing), see **SOP 11** (Launch, Operate & Diagnose).

# 3. The list - why who you email affects deliverability

Two things about your list move deliverability:

**Valid emails.** Every bounce tells providers you don't know who you're emailing. Bounce rate is the canary - when it climbs, list quality slipped.

**Fit.** Email the wrong person about the wrong thing and you get the most damaging signal there is - a spam complaint. The threshold is brutal: ~0.3% of recipients marking you as spam starts tanking your reputation (3 complaints per 1,000). Tight targeting is deliverability protection, not just a reply-rate lever.

This SOP won't teach list-building. For who to target, see **SOP 06** (ICP Mapping); for sourcing and verifying, see **SOP 10** (Lead List Building). Carry over one rule: **double-verify every email through two+ providers before it enters a campaign, and re-verify every 30 days** for job changes.

# 4. The offer - why a weak offer hurts your inbox

The taste of the pizza. The deliverability connection most people miss: a campaign that gets no replies **degrades your infrastructure over time.** Providers watch engagement - mail that lands and just sits there reads as unwanted, and you slide into spam even with perfect setup. A strong offer generates the engagement that keeps reputation healthy.

This SOP won't teach the offer - see **SOP 07** (Offer & Lead Magnet). Just understand the link: offer quality is a deliverability input, not only a conversion input.

# 5. The copy - why presentation affects placement

The box and garnish. It matters least of the five, but has three direct lines to deliverability:

- **It triggers (or avoids) spam complaints.** Aggressive, salesy copy gets reported; relevant, low-pressure copy gets ignored at worst.

- **It carries technical hygiene.** Spam-trigger words and identical wording across thousands of sends get fingerprinted. Vary phrasing (use spintax). Beginner habit: **turn off open tracking** - the pixel adds a redirect that can drag placement.

- **It earns engagement.** Copy people want to reply to extends your infrastructure's life.

This SOP won't teach copy - see **SOP 09** (Copy Frameworks). Carry over: relevance and restraint protect your inbox; pressure and repetition burn it.

# What to monitor

Not set-and-forget, even with a managed provider. Two numbers tell you almost everything:

**Reply rate (overall).** Steady 2.5% suddenly drops to 1.5% with nothing else changed? Something deliverability-side is happening. Pause and investigate before scaling.

**Bounce rate.** Under 3% on a clean list. Above 5% = list quality dropped. Above 10% = emergency, pause immediately or you'll burn domains.

**The rhythm:** Daily (5 min) - reply vs. baseline, bounce rate. Weekly (30 min) - domain rotation, warm-up status, sample bounces, and a **placement test** (send to seed inboxes across Gmail, Outlook, Yahoo and confirm where you land). Monthly (1-2 hrs) - full audit with your provider; adjust your Google/M365/Azure mix based on what's working.

**Trust placement, not the dashboard.** Many warm-up tools report every email as "primary inbox" by default - even when it's in spam - because a healthy-looking dashboard sells. Insist on a tool that reports real placement (primary vs. spam, per mailbox).

**Pro tip - batch your campaigns and launch weekly.** Don't dump tens of thousands of leads into one always-on campaign; a bad week gets buried in the averages and takes weeks to surface. Smaller weekly batches let you isolate which week slipped and react fast.

# Reading bounce messages

Bounce messages are diagnostic gold - most people delete them unread.

| **Bounce reason** | **What it means** | **Action** |
| --- | --- | --- |
| "Mailbox does not exist" / "User unknown" | Invalid address | Re-verify the list |
| "Domain age too young" | Sending domain too new | Slow down; warm longer. Send to non outlook ESP first |
| "Listed on blocklist" | Domain/IP flagged | Pause, investigate, switch domains |
| "Message rejected as spam" | Content/reputation | Audit copy and list - if changing copy/list does not improve delvierabilty - switch infra |
| "Recipient mailbox is full" | Stale lead | Remove |
| "Internal company filter" / gateway reject | **A SEG is blocking outsiders** | This segment needs the aged-M365 approach above |
| "Greylisted, try again later" | Temporary rate-limit | Usually auto-resolves |

**The pattern that matters most:** if bounce rate is climbing AND most bounces read "spam," "blocked," or "blocklist," your sender reputation is in trouble - pause everything. If bounces are mostly "mailbox does not exist," it's a **list** problem, not infrastructure.

# Common mistakes that wreck deliverability

- **Sending from your main domain.** Always use lookalikes.

- **Pushing volume too fast on new infrastructure.** Skip or compress warm-up and you burn a month of capacity.

- **Pointing fresh infra at Outlook/SEG targets.** Respect the hierarchy - easy lanes first, aged M365 for the hard ones.

- **Ignoring bounces.** The best leading indicator of trouble.

- **Putting everything on one provider.** Hedge across lanes and shift toward whatever's performing.

- **DIY-ing infrastructure to ****"****save money.****"** Once you price in labor and misconfiguration risk, the savings are usually negative.

# Your setup, start to finish

- Decide your monthly send volume (SOP 04).

- Choose your provider mix and run the Infra Calculator. **Default beginners to Google-only or a Google-heavy mix; reserve M365 for Outlook/SEG-heavy TAM and Azure for cheap scale.**

- Choose your managed provider (InboxKit) → order lookalike domains + inboxes → kick off warm-up.

- Connect inboxes to your sequencer (Sendkit.ai) and confirm warm-up is running.

- While warm-up runs (1-2 weeks), work SOPs 06-10 (ICP, Offer, Campaign Architecture, Copy, List) so you have something worth sending.

- When warm-up finishes, ramp per platform, then launch in weekly batches.

- **First 90 days: send to non-Outlook ESP leads only.** Monitor reply and bounce daily; run the weekly placement test.

**Sequence matters:** you don't write copy first. Stand up infrastructure first; build the rest while it warms.

**Next:** SOP 06 - Prospect: ICP Mapping (who to put on the list you just built the infrastructure to reach).

# 👉 Want us to set up and manage this exact system inside your business so you can focus on closing deals, not managing infrastructure? 

# **Book a call here: {{CTA-BookCall}}** 🚀