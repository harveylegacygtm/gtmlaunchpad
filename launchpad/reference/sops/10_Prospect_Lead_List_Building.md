# 10 - Prospect: Lead List Building

*The Launchpad Playbook  •  Module: P in SCOPE - Prospect (execution)  •  Reading time: ~14 min*

**Step 5 of 5:  ICP → Offer → Campaign → Copy → List**

## What you get from this SOP

**How to build a list of real buyers - people who actually need what you sell, can afford it, and are ready to act right now. Not 10,000 random names. A clean, scored list of the right people, built cheap.**

By the end you'll be able to:

- Build a list of **real buyers** - people with the need, the budget, and the itch to act - instead of a pile of names that never reply.

- Build in the right order - **accounts → qualify → enrich ****&**** score → contacts → emails** - so you only ever pay for leads worth paying for and keep enrichment cost cheap.

- Pull emails **last, 2–3 days before launch**, so your list is fresh and your bounce rate stays safe.

## TL;DR

- The order: **Accounts → Qualify → Enrich ****&**** Score → Contacts → Emails (last).** Build companies, qualify them with AI, then spend on contacts and emails. Most people do this backwards and pay for it.

- AI Ark and Prospeo are your main databases. Clay is your **workbench, not a data source** - its data pricing changed and isn't worth it anymore. Bring data from AI Ark/Prospeo or other sources, run the workflow in Clay's free and AI columns.

- **Layer your spend.** Only enrich and find emails for companies you've already confirmed are your ICP. This is the single biggest cost lever in the whole playbook.

- Score by signals (from your Signal-to-Offer Map). More signals = higher score = a signal campaign and multi-touch. Break a big list into batches by priority.

- **Get emails LAST - 2–3 days before launch.** Email data goes stale fast. Find 8–10 contacts per company, verify, then cut to 5 before sending.

## Where this fits

This is the execution step. Your campaigns are designed, your copy is written, and the Dream Email told you exactly what data each campaign needs. Now you go build the list to match - as cheaply as you can.

You build one list per campaign, and the build changes by campaign type. The Signal-to-Offer Map from ICP (SOP 06) tells you what to enrich for. The campaign tells you which signals matter. The Dream Email tells you the data you wish you had. The gap between what you wish you had and what you can afford is the cost call you make here.

**🎁 Launchpad Deal - 500 leads to launch with (Sendkit)** Want a head start while you learn the build? **Get 500 leads with verified emails - enough to launch your first campaign - through Sendkit.** You can be sending this week. 👉 Claim it here: {{AFF-Sendkit}} and use code **10GTMLAUNCHPAD** for 10% off every Sendkit plan.

## The order: Accounts → Qualify → Enrich & Score → Contacts → Emails

This is the whole workflow, and the order is the point. Each step filters the next, so you never spend on the wrong company.

- **Accounts.** Find the companies that match your ICP on the basics.

- **Qualify.** Use AI to confirm each company is actually your ICP - before you look at a single contact.

- **Enrich ****&**** Score.** On qualified companies only, pull the signals your campaign needs and score them.

- **Contacts.** Find decision-makers at the scored, prioritized companies.

- **Emails.** Find and verify emails - last, and fresh.

Here's why the order matters: find contacts first and you spend credits on people at companies that don't even qualify, then waste email lookups on contacts you'll never use, and end up with a list full of the wrong people. Qualify companies before you spend on contacts. Always.

## Two lists, two builds

You're running two campaign types and they build differently:

- **Evergreen build.** Broad ICP filters, AI qualify, light enrichment, find emails across the whole qualified set. Cheaper, scales, the cash cow.

- **Signal build.** Same start, then add signal enrichment, score, and prioritize. The top tiers get very personal copy and multi-touch (email + LinkedIn + a call). Costs more per lead, converts far higher.

Same skeleton, different depth of enrichment. The score decides which lead gets which treatment.

## The databases - pick by ICP

Each source has different strengths, cost, and coverage. Combining two or three covers more of your market than any one alone. Lead with these.

**Note - as you use the databases more - you can gravitate to your favorite database based on the filters that they have and their platform experience. Costs are very similar to each other, and many times, it comes down to preference.**

### AI Ark - primary source

Replaces what most people used Apollo for. Pulls company data, people data, and verified emails (via {{AFF-BounceBan}}) in one tool, and it has an API - so it works as both a discovery tool and a first-pass email finder in your waterfall. For most users it covers 60–70% of your market on its own. Start here. [{{AFF-AIArk}}]

### Prospeo - primary #2

Your second database, for where AI Ark misses. Strong work-email coverage and verification. Use it after AI Ark in the waterfall, and as a second source on the account pull. [{{AFF-Prospeo}}]

### Clay - orchestration, not data

Clay is the spreadsheet-on-steroids where you qualify, enrich, score, and run waterfalls - the workbench, not the well. Its data pricing changed, so the per-record data cost isn't worth it anymore. **Don't pay Clay for data.** Bring your data from AI Ark and Prospeo. Cheaper orchestration tools like Bitscale run about 3x less, but Clay is still the tried-and-true default. Power users can DIY the whole pipeline in Claude Code. 

If you are new to it - I recommend starting with Clay first, then learn other systems later. 

Sign up for Clay here: [{{AFF-Clay}}]

Note: this training is built entirely on Clay. If you've never used it (or a tool like it), watch Clay University's basic training first - here:

Here’s a loom showing you which Clay University module you should learn first: [LOOM: LOOM-10-Clay-WhichModuleFirst]

### Niche, local, and re-engagement sources

- **Local businesses (Google Maps):** Localpipe.io {{AFF-Localpipe}} (our go to), Serper.dev, or D7 scrape Google Maps for physical-location ICPs (HVAC, dental, retail). Returns name, address, phone, website, ratings.

- **LinkedIn Sales Nav:** behavioral filters (headcount growth, new-in-role, activity). Export with Phantombuster or Evaboot - Sales Nav has no clean API.

- **Custom scraping:** Apify for industry directories, association lists, conference attendees, and review sites the big databases miss.

- **Your CRM:** the most underused source. Closed-lost deals from 6–12+ months ago are gold - the problem, budget, or buyer may have changed. Re-engage them quarterly.

Full tool list with setup notes is in the Tools Stack Index . A quick source matrix by ICP:

| **Your ICP** | **Primary** | **Secondary** |
| --- | --- | --- |
| Tech / SaaS (US/EU) | AI Ark | Prospeo + LinkedIn Sales Nav |
| Enterprise | AI Ark | Prospeo + Sales Nav |
| Recently-funded startups | AI Ark | Crunchbase + Prospeo |
| International (Asia, LATAM) | AI Ark | Prospeo + local directories |
| Local / physical businesses | Localpipe.io | Scraper.tech (Google Maps) |
| Niche sub-industries | Industry directories (Apify) | AI Ark + Prospeo |

# 👉 Want us to map out your TAM and show you how to build high-converting lists - or do it all for you - so you can focus on closing qualified leads? **Book a call here: {{CTA-BookCall}}** 🚀

## The layered build - step by step in Clay

This is the multi-source build, ordered so your spend only ever lands on qualified companies.

- **Define the campaign and its signals.** One workbook = one campaign. Lock the ICP, persona, and the signals this campaign needs (from ICP and Campaign Architecture). Don't mix campaigns in one workbook.

- **Pull accounts only.** Apply your ICP filters in AI Ark; add Prospeo and Clay's free Find Company for coverage. Grab companies, not people yet. Dedupe by domain - domain is the most reliable key.

- **Do a pre-pull QA before you spend.** Check 5–10 results by hand: are these the right companies? Confirm the source returns the fields you need. Estimate cost (credits per record × records) before you hit run. Can't answer those? Fix the query first.

- **Qualify accounts with AI (pass/fail).** Filters get you companies that look right, not ones that truly fit. Run an AI column that confirms each company is your ICP (what they do, B2B vs B2C, real fit) and drop the fails before spending another credit.

- **Enrich qualified accounts for signals.** On the survivors only, pull the Signal-to-Offer triggers your campaign needs (funding, hiring, new-in-role, tech, lawsuits - whatever your map calls for). Layer the spend. Never enrich a company that didn't qualify.

- **Score and tier.** Auto-score 0–100 against your rubric. More signals = higher score. Tier A/B/C/D and break a big list into batches by priority.

- **Assign treatment by tier.** A-tier + signal → the signal campaign (very personal copy, multi-touch). B/C → the evergreen campaign. D → drop.

- **Find contacts at the prioritized accounts.** One persona per campaign. Pull 8–10 contacts per company at this stage (verification will thin them out).

- **Find and verify emails - last and fresh.** Run the waterfall (below) 2–3 days before launch, verify, then cut to 5 contacts per company with verified emails. Export.

**[LOOM: LOOM-10-Clay-MultiSourceBuild]** The whole build start to finish: pull accounts in AI Ark and Prospeo, AI qualify, enrich and score, find contacts, run the email waterfall, then export the clean list.

## AI account enrichment and scoring

This is where most of the leverage - and most of the wasted money - lives. Done right, AI qualifies and scores thousands of companies for pennies. Done wrong, it burns budget on made-up answers.

### Why the filters aren't enough

AI Ark and Prospeo filters get you companies that look right on paper - industry, size, location. They don't tell you what a company actually does, whether it truly fits, or whether it has your pain right now. That judgment is what AI is for: read the website, confirm the fit, find the signal.

### The resourcefulness mindset

Before you spend anything on AI, ask: can I solve this with what I already have?

- **Use what came back free first.** What fields do you already have? What can you build from them?

- **Look for patterns.** Sample your data by hand. Can a simple rule sort it instead of AI?

- **Don't overuse AI.** Every AI call costs money and can make things up. Use it surgically, not by default.

### Pro tip - Clay formula vs AI

Ask: is this a rule, or a judgment call? Rule-based ("remove everything after the comma," clean a company name, split a full name) → use a free formula. Judgment-based ("is this company B2B or B2C?") → use AI. Formulas are free; AI isn't. Learn what formulas can do and you'll save real money.

### Claygent vs GPT

| **Use Claygent when…** | **Use a GPT column when…** |
| --- | --- |
| You need to GO somewhere (a website, the web) | You need to ANALYZE data already in your table |
| The data isn't in your table yet | The data is there but needs transforming |
| You need to SEARCH for something external | A formula can't handle the complexity |

### Prompt setup - gather context once, reuse it

Some tasks do best as one big prompt (cheaper, harder to debug); some as a few small ones (more expensive, easier to fix). Test your outputs before running at scale. For complex work, use a setup prompt that gathers context once, then feed it into smaller prompts:

- **Prompt 1 (Setup):** Pull a short summary of what this company does.

- **Prompt 2 (Qualify):** Given that summary, does this match our ICP of [X, Y, Z]? Output PASS or FAIL only.

- **Prompt 3 (Personalize):** Given that summary + signal, write one specific cold-email opener.

Notice prompt 3: the same enrichment that qualifies and scores the company also writes the personalization line. That's the Signal-to-Offer Map (SOP 06) in action - one pass, two jobs. You don't enrich twice.

### Writing custom prompts

- **Be specific about the output.** "Output only the cleaned name." "Output PASS or FAIL only."

- **Give an example.** "Input 'Dr. John Smith Jr.' → Output 'John'."

- **Handle edge cases.** "If no info is available, output N/A."

- **Keep it short.** Longer prompts aren't better - more words, more room to make things up. Draft with Claude or Clay's prompt generator, then tighten.

### AI quality assurance

AI makes mistakes; your job is to catch them before they hit the campaign. The most common one is an apology sitting in a data column ("I'm sorry, I cannot find…"). Catch them with a QA column that flags any row with a failure phrase:

Flag this row as CHECK if the value is blank, equals N/A, or contains any of: "sorry," "apologize," "cannot," "couldn't find," "no information," "not found," "unable to," "unknown," "as an AI," "not available." Otherwise mark OK.

Then filter for CHECK to see your miss rate, and spot-check 10–20 random rows against the source.

**[LOOM: LOOM-10-Clay-EnrichQA]** Running the qualify column, the personalization prompt, and the QA column that catches apology outputs before they cost you.

### Lowest-spend tactics

- **Set the table to manual.** Build and test your enrichment on 10 rows, then 20–50, before any full run.

- **Check the URL is valid first.** Don't run AI or enrichment on a bad website - that's a guaranteed wasted credit.

- **Cost checkpoints.** After 10 rows: is the output useful, and what did it cost? After 50: check hit rate and AI errors, then forecast the full cost (cost per row × total rows) before scaling.

- **Know the number before you click run.** If you can't estimate cost per row × rows, you're not ready.

## The email waterfall - find emails last

Email accuracy separates good lists from disasters. Invalid and catch-all addresses spike your bounce rate and tank deliverability (>5% bounce is dangerous; >10% is an emergency - see Email Deliverability (SOP 05)). Run a waterfall: when one provider can't return a verified email, try the next. Cheapest first, stop at the first verified hit.

- **Dedupe by LinkedIn URL first.** Same URL = same person. Dedupe before you spend a credit finding emails.

- **The waterfall:** AI Ark (primary, via {{AFF-BounceBan}}) → Prospeo → Icypeas. Three to five steps covers ~99% of cases. Stop the moment you get a verified email.

- **Verify everything.** Run MillionVerifier first; if it returns anything other than "ok," run BounceBan on that address. Only send to emails one of the two marks deliverable.

- **Drop catch-all-only addresses** unless you've confirmed them another way. They look delivered but no one reads them.

Verification cuts a list by 20–50%. That's exactly why you find 8–10 contacts per company first - you'll land around 5 verified, which is the cap you want anyway.

## Freshness - why emails come last

Email data decays faster than anything else in your list. People change jobs, leave companies, and let addresses go dead. An email you pulled six weeks ago may already bounce.

- Pull emails 2–3 days before launch, not weeks ahead. This is the single best way to protect your bounce rate.

- Any list you haven't sent in 60+ days is stale - re-pull and re-verify before sending.

- AI Ark and Prospeo refresh their data about every 30 days, so a fresh pull really does return fresher addresses.

## Final list hygiene and export

Your export is the file that goes into the sequencer. Clean it in order:

- Dedupe on the email column in Clay before export.

- **Limit to 5 contacts per company after verification.** In Sheets: =IF(COUNTIF($A$2:A2,A2)<=5,"Keep","Remove") on the domain column, then filter to Keep. (You found 8–10; verification and this cap bring you to 5.)

- Hide all working columns. Export only the required fields plus the campaign's custom variables - nothing else, or you'll get upload errors and messy data.

Required fields for a campaign-ready list:

| **Field** | **Notes** |
| --- | --- |
| First name | Cleaned for copy - no titles (Dr., Mr.) or suffixes (Jr., III) |
| Last name / full name | Standard |
| Job title | As displayed |
| Cleaned company name | No URLs or Ltd/Inc/LLC; 3–4 words max |
| Website + LinkedIn URL | Clean format, no trailing slashes |
| Verified email + provider/status | Only verified emails go to the campaign |
| Custom + qualification variables | Personalization fields + the score/signals/location |

Store lists per client in a Raw → Enriched folder structure, named the same way every time (e.g. *Client | Campaign | Qualification | Date*). The enriched sheet is the final deliverable.

## Common list-building mistakes

- **Skipping the qualify step.** Spending on contacts and emails at companies that were never your ICP. Qualify companies first - that's the whole point of the order.

- **Finding emails first.** You end up with "people we have emails for" instead of "the right people." Emails are last, not first.

- **Paying Clay for data.** Use AI Ark/Prospeo for data; Clay to run the workflow.

- **Relying on one source.** One database = 30–40% of your market invisible. Combine two or three on the account pull.

- **Not deduping by LinkedIn URL before finding emails.** You pay twice for the same person.

- **Overusing AI / running it on bad URLs.** Wasted credits and made-up answers. Formulas first, check the URL, test on 10–50 rows.

- **Mixing personas in one list.** One persona per campaign. Build separate lists.

- **Using stale data.** Lists older than 60 days bounce. Re-pull and re-verify before sending.

- **Chasing size over quality.** 1,000 A-tier scored prospects beat 10,000 random ones.

- **More than 5 contacts per company.** The fastest way to get marked as spam and lose the whole company.

## Action items

- Open AI Ark, apply your ICP filters, and pull accounts only. Add Prospeo for coverage; dedupe by domain in Clay when combining lists.

- Run a pre-pull QA: sample 5–10, confirm fields, estimate cost.

- Run an AI qualify column (PASS/FAIL) and drop the fails.

- Enrich the survivors for your campaign's signals; auto-score 0–100 and tier into batches.

- Assign treatment by tier (signal/multi-touch vs evergreen) and find 8–10 contacts at the top companies, one persona.

- 2–3 days before launch, run the email waterfall, verify, and cut to 5 per company.

- Hide working columns, export the required fields, and load the sequencer.

That's a complete, cost-layered list build - scored, prioritized, fresh, and matched to the copy you already wrote.

**Next:** (SOP 11)

# 👉 Want us to do this all for you and get you 10–30+ qualified meetings booked a month?

# **Book a call here: {{CTA-BookCall}}** 🚀