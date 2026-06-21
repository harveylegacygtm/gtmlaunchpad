# Tool Connections Registry

Single source of truth for how every Launchpad tool connects. The connect-tools
and tools-doctor skills and every API action skill read from here. Env var names
are fixed contracts. Do not rename them without updating the scripts.

Keys live in the user's Claude Code settings env block (the home-folder file, not
the project), so they never land in a git repo. See settings.example.json.

| Tool | Env vars (exact names) | Base URL | Auth | Where to get the key | Signup token |
| --- | --- | --- | --- | --- | --- |
| Sendkit | `SENDKIT_API_KEY`, optional `SENDKIT_WORKSPACE_ID` | `https://api.sendkit.ai` | Header `X-Api-Key: sk_...` (or `Authorization: Bearer sk_...`). Platform keys add `X-Workspace-Id: ws_...` | Sendkit dashboard, Settings, API | {{AFF-Sendkit}} |
| InboxKit | `INBOXKIT_API_KEY`, `INBOXKIT_WORKSPACE_ID` | `https://api.inboxkit.com` | Header `Authorization: Bearer KEY` on every call, plus header `X-Workspace-Id: <uuid>` on all endpoints except `/v1/api/account`. Get the workspace id from `/v1/api/workspaces/list` | Dashboard, Settings, API & Integrations | {{AFF-InboxKit}} |
| Dynadot | `DYNADOT_API_KEY`, `DYNADOT_API_SECRET` | `https://api.dynadot.com` | Search uses the stable `api3.json` command API with the key as a `key` query param (read-only, no signing). RESTful v2 sensitive ops (register, set_renew_option) use `Authorization: Bearer KEY` plus `X-Signature` = HMAC-SHA256 signed with the secret. Note: RESTful v2 search access is restricted as of Oct 2025, so the generator uses api3.json | Account, Tools, API | {{AFF-Dynadot}} |
| Spaceship | `SPACESHIP_API_KEY`, `SPACESHIP_API_SECRET` | `https://spaceship.dev/api/v1` | Headers `X-Api-Key` and `X-Api-Secret` | Launchpad (Spaceship), API Manager | {{AFF-Spaceship}} |

## Rules every connection follows

- Keys are 100% user-supplied. The plugin ships zero keys.
- Read keys from `process.env.<NAME>` only. Never hardcode, never accept a key as
  a command-line argument (args leak in process lists).
- Create a scoped, least-privilege key and set a spending cap where the tool
  allows it.
- Any action that spends money or sends mail requires an explicit human "yes"
  first. No auto-buy, no auto-launch.
- Never print a key back to the screen. The doctor reports status, not secrets.

## Endpoints used (filled in as each action skill is built)

- Sendkit (base `https://api.sendkit.ai`, this is sendkit.ai the sequencer, NOT
  sendkit.dev): reads used by scripts/sendkit/sk.mjs: `GET /v1/campaigns`,
  `GET /v1/mailboxes`, `GET /v1/tags`, `GET /v1/analytics/campaigns/{id}` (or
  `GET /v1/campaigns/{id}/analytics`), `GET /v1/warmup-stats`. Gated send:
  `POST /v1/campaigns/{id}/start`. Build (create-campaign skill, body schema to
  confirm): `POST /v1/campaigns`, `POST /v1/campaigns/{id}/leads/import-csv`,
  `POST /v1/campaigns/{id}/send-test-email`. Analytics metric field names are
  mapped defensively in sk.mjs; confirm on first real run.
- Spaceship: `POST /domains/available` or `GET /domains/{domain}/available`,
  `POST /domains/{domain}` (register), `PUT /domains/{domain}/autorenew`
- Dynadot: search via `GET api3.json?command=search&domain0=...&show_price=1`
  (used by scripts/domains/check.mjs). Register and disable-renew via RESTful v2
  `POST /register` and `PUT /set_renew_option` (HMAC-signed; wired in
  domain-purchase)
- InboxKit (base `https://api.inboxkit.com`, used by scripts/inboxkit/ik.mjs):
  reads `GET /v1/api/account`, `POST /v1/api/mailboxes/list`,
  `POST /v1/api/mailboxes/status`, `GET /v1/api/dns/list`,
  `POST /v1/api/dns/verify`, `GET /v1/api/warmup/stats`. Gated spend:
  `POST /v1/api/mailboxes/buy`, `POST /v1/api/domains/register`,
  `POST /v1/api/warmup/add`. Action: `POST /v1/api/sequencers/export` (push
  mailboxes into Sendkit). Provisioning chain: buy mailboxes -> poll status until
  active -> add warmup -> export to sequencer. Also does inbox-placement tests,
  email insights, and InfraGuard blacklist monitoring.
