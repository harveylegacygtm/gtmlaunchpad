# The Launchpad: Master Links File

Single source of truth for every domain, booking, and affiliate link.

Status: InboxKit and Sendkit are LIVE with affiliate links and coupon codes.
The rest are placeholders. As deals close, paste the real URL into the URL
column, add any Coupon, and change Status to Live.

How it works:
- SOPs and skills never hold a raw URL. They hold the TOKEN in the first column.
- While Status is Placeholder, the token renders as plain text (tool name,
  not clickable).
- When Status is Live, the token renders as a hyperlink on the tool name.
- One edit here updates every place that uses the token. No hunting through SOPs.

---

## 1. Domain and booking (fill these first)

| Token | What it is | URL | Status |
|---|---|---|---|
| DOMAIN-Main | The Launchpad main site | <<PASTE>> | Placeholder |
| CTA-BookCall | Book-a-call link (the house CTA in every SOP) | https://calendly.com/d/ds6g-y9t-phf/launchpad-strategy-session | Live |
| LINK-Skill-MarketResearch | Shareable market-research Claude skill (SOP 06) | https://app.notion.com/p/100M-ICP-Research-3aa6584dbbc48129b71bf2ccb4d7507c | Live |
| LINK-Clay-TemplatePack | Clay template pack (SOP 10) | <<PASTE>> | Placeholder |
| LINK-MoneyModel-Sheet | The Launchpad Money Model calculator, V4 three-tab (SOP 04) | https://docs.google.com/spreadsheets/d/1gwuSKqS1QftrCzvMZqPy-yVfdHorb3dLGv8AYSjhYQk/edit?usp=sharing | Live |

---

## 2. Affiliate links (one row per tool found in the SOPs)

| Token | Tool | URL | Coupon | Status |
|---|---|---|---|---|
| AFF-InboxKit | InboxKit | https://inboxkit.com/r/gtmlaunchpad | GTMLAUNCHPAD (mailboxes $3 instead of $3.50) | Live |
| AFF-Sendkit | Sendkit | https://sendkit.ai | 10GTMLAUNCHPAD (10% off every Sendkit plan) | Live |
| AFF-GoHighLevel | GoHighLevel (GHL) | https://www.gohighlevel.com/?fp_ref=cassata-consulting-ventures-llc80 | | Live |
| AFF-Clay | Clay | https://clay.com?via=e53747 | | Live |
| AFF-Apify | Apify | https://www.apify.com/?fpr=pkhz24 | | Live |
| AFF-Phantombuster | Phantombuster | https://phantombuster.com?deal=aj90 | | Live |
| AFF-AIArk | AI Ark | https://www.ai-ark.com/?ref=launchpad | 10% off first 3 months, any plan (auto-applied via link) | Live |
| AFF-Dynadot | Dynadot | https://www.dynadot.com | | Live (regular site — affiliate pending Bella's tax/payment setup) |
| AFF-Spaceship | Spaceship | https://www.spaceship.com | | Live (regular site, no affiliate deal) |
| AFF-Porkbun | Porkbun | https://porkbun.com | | Live (regular site, no affiliate deal) |
| AFF-Instantly | Instantly (alt sequencer) | https://instantly.ai/?via=aj | | Live |
| AFF-Calendly | Calendly (scheduler) | https://calendly.com | | Live (regular site, no affiliate deal) |
| AFF-Fathom | Fathom (call recording) | https://fathom.video | | Live (regular site, no affiliate deal) |
| AFF-MillionVerifier | MillionVerifier | https://www.millionverifier.com | | Live (regular site, no affiliate deal) |
| AFF-HubSpot | HubSpot | <<PASTE>> | | Placeholder |
| AFF-Prospeo | Prospeo | https://prospeo.io/?via=ajf5 | | Live |
| AFF-Bitscale | Bitscale | https://bitscale.ai | | Live (regular site, no affiliate deal) |
| AFF-Icypeas | Icypeas | https://app.icypeas.com/create-account?scid=GvXrjHFq&_by=harvey10 | | Live |
| AFF-Findymail | Findymail | <<PASTE>> | | Placeholder |
| AFF-EnrichSo | Enrich.so | <<PASTE>> | | Placeholder |
| AFF-BounceBan | BounceBan | https://bounceban.com | | Live (regular site, no affiliate deal) |
| AFF-MasterInbox | MasterInbox | https://masterinbox.com | | Live (regular site, no affiliate deal) |
| AFF-Trigify | Trigify | https://www.trigify.io | | Live (regular site, no affiliate deal) |
| AFF-SerperDev | Serper.dev | https://serper.dev | | Live (regular site, no affiliate deal) |
| AFF-Localpipe | Localpipe.io | https://app.localpipe.io/auth?mode=signup&ref=harveyc826 | | Live |
| AFF-D7 | D7 Lead Finder | <<PASTE>> | | Placeholder |
| AFF-EmailBison | EmailBison | https://emailbison.com | | Live (regular site, no affiliate deal) |
| AFF-OpenAIAPI | OpenAI API | https://platform.openai.com | | Live (regular site, no affiliate deal) |
| AFF-Crunchbase | Crunchbase | https://www.crunchbase.com | | Live (regular site, no affiliate deal) |
| AFF-LinkedInSalesNav | LinkedIn Sales Navigator | https://business.linkedin.com/sales-solutions/sales-navigator | | Live (regular site, no affiliate deal) |
| AFF-BuiltWith | BuiltWith | https://builtwith.com | | Live (regular site, no affiliate deal) |
| AFF-Loom | Loom | https://www.loom.com | | Live (regular site, no affiliate deal) |
| AFF-Slack | Slack | https://slack.com | | Live (regular site, no affiliate deal) |
| AFF-Claude | Claude (Anthropic) | https://claude.ai | | Live (regular site, no affiliate deal) |
| AFF-HeyReach | HeyReach (LinkedIn automation) | <<PASTE>> | | Placeholder |
---

## Rule for skills and SOPs

When you mention a tool that has a token here:
- If Status is Live: render the tool name as a hyperlink on its URL.
- If Status is Placeholder: write the tool name as plain text.
- If the row has a Coupon, name the code right after the link so the user gets
  the deal price. Example: "Sign up at [InboxKit](url) and use code GTMLAUNCHPAD
  to get mailboxes for $3 instead of $3.50." One code per tool, exactly as written.
- Never paste a raw URL into a SOP or skill. Always use the token.
