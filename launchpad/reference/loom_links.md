# The Launchpad: Master Loom File

Single source of truth for every Loom video.

How it works:
- SOPs and skills hold the TOKEN, not the raw Loom URL.
- When you finish recording, paste the link into the URL column and set Done.
- One edit here updates every place that uses the token.
- A video referenced in more than one SOP has ONE token. The "Also used in"
  column lists the extra spots so you record it once.

Token format: LOOM-{SOP}-{Tool or Topic}-{Detail}
Status: Done / Not Done

---

| Token | SOP | What the video shows | URL | Status | Also used in |
|---|---|---|---|---|---|
| LOOM-03-SCOPE-Trailer | 03 | Series trailer: Harvey walks the SCOPE pyramid, the five levers, why order matters | <<PASTE LOOM>> | Not Done | |
| LOOM-04-MoneyModel-Intro | 04 | Intro: the one sentence every founder should be able to say | <<PASTE LOOM>> | Not Done | |
| LOOM-04-MoneyModel-Walkthrough | 04 | Fill one ICP column end to end, read the funnel output | <<PASTE LOOM>> | Not Done | |
| LOOM-04-MoneyModel-InfraCalc | 04 | Infra calculator: provider split, monthly cost, ROI, cheap vs premium domains | <<PASTE LOOM>> | Not Done | SOP 05 |
| LOOM-05-Dynadot-BuyDomains | 05 | Buying domains in Dynadot, DIY walkthrough | <<PASTE LOOM>> | Not Done | SOP 12 |
| LOOM-05-InboxKit-Setup | 05 | Full end-to-end InboxKit ordering tutorial | <<PASTE LOOM>> | Not Done | SOP 12 |
| LOOM-05-InboxKit-ExportToSendkit | 05 | Export warmed InboxKit mailboxes into Sendkit before launch | <<PASTE LOOM>> | Not Done | |
| LOOM-06-Claude-ICPResearch | 06 | Run the Claude market-research skill on a real list, output ICP and anti-ICP live | <<PASTE LOOM>> | Not Done | |
| LOOM-07-Offer-Intro | 07 | Intro: it is almost never the copy, it is the offer | <<PASTE LOOM>> | Not Done | |
| LOOM-07-Offer-GrandSlamMagnet | 07 | Build a stacked offer live, then AI builds a custom lead magnet | <<PASTE LOOM>> | Not Done | |
| LOOM-09-Copy-DreamEmailAI | 09 | Write a Dream Email, dial it to evergreen, AI writes personalization at scale | <<PASTE LOOM>> | Not Done | |
| LOOM-10-LeadList-Intro | 10 | Intro: why most people build their list backwards | <<PASTE LOOM>> | Not Done | |
| LOOM-10-Clay-WhichModuleFirst | 10 | Which Clay University module to learn first | <<PASTE LOOM>> | Not Done | |
| LOOM-10-Clay-MultiSourceBuild | 10 | Full multi-source list build in Clay, start to finish | <<PASTE LOOM>> | Not Done | |
| LOOM-10-Clay-EnrichQA | 10 | Qualify column, personalization prompt, QA column | <<PASTE LOOM>> | Not Done | |
| LOOM-11-Launch-Intro | 11 | Intro: launch is not press send, the 3-week sequence | <<PASTE LOOM>> | Not Done | |
| LOOM-11-Diagnose-Dashboard | 11 | Leading/lagging dashboard, diagnose a stuck campaign bottom-up | <<PASTE LOOM>> | Not Done | |
| LOOM-12-Clay-HowToUse | 12 | Clay orchestration walkthrough | <<PASTE LOOM>> | Not Done | |
| LOOM-12-AIArk-HowToUse | 12 | How to use AI Ark | <<PASTE LOOM>> | Not Done | |
| LOOM-12-LocalMaps-LeadSources | 12 | Local / Google Maps lead sources | <<PASTE LOOM>> | Not Done | |
| LOOM-12-Clay-OpenAIEnrichment | 12 | OpenAI key + enrichment in Clay, when to use which function | <<PASTE LOOM>> | Not Done | |
| LOOM-12-Waterfall-FinderValidator | 12 | Build your finder / validator waterfall | <<PASTE LOOM>> | Not Done | |
| LOOM-12-GHL-HowToUse | 12 | GHL training walkthrough | <<PASTE LOOM>> | Not Done | |
| LOOM-13-Sendkit-Notifications | 13 | Notifications and speed-to-lead on Sendkit, unified master inbox, snippets | <<PASTE LOOM>> | Not Done | |
| LOOM-13-ShowUpEngine | 13 | Build the five show-up pieces, set the scheduler booking window | <<PASTE LOOM>> | Not Done | |

---

## Rule for skills and SOPs

When a section has a Loom token:
- If Status is Done: embed the link as "Watch the walkthrough" on the URL.
- If Status is Not Done: leave the token as plain text so it is easy to find
  and fill later. Do not invent a link.
