#!/usr/bin/env node
// Launchpad InboxKit helper. Reads + gated spend for provisioning inboxes.
// Zero dependencies, plain Node 18+. Reads keys from env only. Never prints keys.
//
// Base: https://api.inboxkit.com
// Auth: Authorization: Bearer INBOXKIT_API_KEY  (+ X-Workspace-Id on all but account)
//
// Reads:
//   account                      wallet, credits, per-mailbox cost, plan
//   mailboxes [--status active]  list mailboxes
//   status <uid,uid>             check mailbox status by uid
//   dns <domain>                 list DNS records for a domain
//   verify <domain,domain>       verify SPF/DKIM/DMARC (read-only)
//   warmup-stats                 warmup health across the workspace
//
// Gated spend (needs --confirm + a human TTY + a re-typed code, like buying):
//   buy-mailboxes <spec.json>    buy mailboxes (spends credits)
//   register-domains <spec.json> register domains (spends money)
//   add-warmup <spec.json>       add warmup subscriptions (spends credits)
//
// Action (not a charge):
//   export <spec.json>           push mailboxes into a sequencer (Sendkit)

import { readFileSync } from "node:fs";
import { createInterface } from "node:readline";
import { randomInt } from "node:crypto";

const BASE = "https://api.inboxkit.com";
const env = process.env;
const args = process.argv.slice(2);
const cmd = args[0];
const to = (ms) => { const c = new AbortController(); const t = setTimeout(() => c.abort(), ms); if (t.unref) t.unref(); return c.signal; };
const argVal = (f) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : null; };

const KEY = env.INBOXKIT_API_KEY;
if (!KEY || KEY.includes("paste")) { console.error("No InboxKit key. Run connect-tools to set INBOXKIT_API_KEY."); process.exit(1); }
const WS = env.INBOXKIT_WORKSPACE_ID;

function headers(needWs = true) {
  const h = { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" };
  if (needWs) {
    if (!WS || WS.includes("paste")) { console.error("This call needs INBOXKIT_WORKSPACE_ID. Run connect-tools."); process.exit(1); }
    h["X-Workspace-Id"] = WS;
  }
  return h;
}
async function api(path, { method = "GET", body, needWs = true } = {}) {
  const res = await fetch(BASE + path, { method, headers: headers(needWs), body: body ? JSON.stringify(body) : undefined, signal: to(25000) });
  const text = await res.text();
  let json; try { json = text ? JSON.parse(text) : {}; } catch { json = { _raw: text }; }
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.slice(0, 300)}`);
  return json;
}
const ask = (q) => new Promise((res) => { const rl = createInterface({ input: process.stdin, output: process.stdout }); rl.question(q, (a) => { rl.close(); res(a.trim()); }); });

// Shared spend gate. Returns true only if a human in a real terminal re-types the code.
async function gate(label) {
  if (!args.includes("--confirm")) {
    console.log("\nDRY RUN. Nothing was done.");
    console.log(`To proceed, a HUMAN must run this in their own terminal with --confirm.\n`);
    return false;
  }
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    console.error(`\nREFUSING: --confirm passed but this is not an interactive terminal.`);
    console.error("A human must run this directly in their own terminal. Exiting.\n");
    process.exitCode = 2; return false;
  }
  const code = String(randomInt(1000, 10000));
  console.log(`\nTo authorize ${label}, type this code: ${code}`);
  const typed = await ask("Code (anything else cancels): ");
  if (typed !== code) { console.log("Cancelled. Nothing was done."); process.exitCode = 3; return false; }
  return true;
}
const readSpec = (p) => { try { return JSON.parse(readFileSync(p, "utf8")); } catch (e) { console.error("Cannot read/parse " + p + ": " + e.message); process.exit(1); } };

// ---- reads ----
async function cmdAccount() {
  const a = await api("/v1/api/account", { needWs: false });
  console.log("\nInboxKit account");
  console.log(`  team: ${a.team}   credits remaining: ${a.credits_remaining}/${a.total_credits}`);
  console.log(`  cost/mailbox: Google $${a.cost_per_google_mailbox}  Outlook $${a.cost_per_ms_outlook_mailbox}`);
  if (a.current_plan) console.log(`  plan: ${a.current_plan.name} (${a.current_plan.cycle})`);
  console.log("");
}
async function cmdMailboxes() {
  const status = argVal("--status");
  const j = await api("/v1/api/mailboxes/list", { method: "POST", body: { limit: 200, ...(status ? { status } : {}) } });
  const rows = j.mailboxes || [];
  console.log(`\n${j.total ?? rows.length} mailbox(es)\n`);
  for (const m of rows) console.log(`${(m.uid || "").padEnd(26)} ${((m.username || "") + "@" + (m.domain_name || "")).padEnd(38)} ${(m.platform || "").padEnd(9)} ${m.status || ""}`);
  console.log("");
}
async function cmdStatus() {
  const uids = (args[1] || "").split(",").map((s) => s.trim()).filter(Boolean);
  if (!uids.length) { console.error("Usage: node ik.mjs status <uid,uid>"); process.exitCode = 1; return; }
  const j = await api("/v1/api/mailboxes/status", { method: "POST", body: { uids } });
  for (const m of j.mailboxes || []) console.log(`${(m.uid || "").padEnd(26)} ${m.status}`);
  console.log("");
}
async function cmdDns() {
  const domain = args[1];
  if (!domain) { console.error("Usage: node ik.mjs dns <domain>"); process.exitCode = 1; return; }
  const j = await api(`/v1/api/dns/list?domain=${encodeURIComponent(domain)}`);
  for (const r of j.dns_record?.records || []) console.log(`${(r.type || "").padEnd(6)} ${(r.host || "").padEnd(30)} ${(r.status || "").padEnd(11)} ${r.value}`);
  console.log("");
}
async function cmdVerify() {
  const domains = (args[1] || "").split(",").map((s) => s.trim()).filter(Boolean);
  if (!domains.length) { console.error("Usage: node ik.mjs verify <domain,domain>"); process.exitCode = 1; return; }
  const j = await api("/v1/api/dns/verify", { method: "POST", body: { domains } });
  console.log(`\nVerified ${j.summary?.total_verified ?? "?"}/${j.summary?.total_requested ?? "?"}, ${j.summary?.needs_repair ?? 0} need repair\n`);
  for (const r of j.results || []) console.log(`${(r.domain || "").padEnd(30)} ${r.overall_health}${r.needs_repair ? " (needs repair)" : ""}`);
  console.log("");
}
async function cmdWarmupStats() {
  const j = await api("/v1/api/warmup/stats");
  const s = j.stats || {};
  console.log(`\nWarmup: ${s.activeCount} active, ${s.pendingCount} pending, ${s.pausedCount} paused. Avg health ${s.avgHealthScore ?? "-"}. $${s.monthlyTotal}/mo\n`);
}

// ---- gated spend ----
async function cmdBuyMailboxes() {
  const spec = readSpec(args[1]);
  const n = (spec.mailboxes || []).length;
  let est = "";
  try { const a = await api("/v1/api/account", { needWs: false }); est = ` (~$${(a.cost_per_google_mailbox || 0) * n} at $${a.cost_per_google_mailbox}/Google mailbox)`; } catch {}
  console.log(`\nAbout to BUY ${n} mailbox(es)${est}.`);
  if (!(await gate(`buying ${n} mailbox(es)`))) return;
  const j = await api("/v1/api/mailboxes/buy", { method: "POST", body: spec });
  console.log(`\n${j.message || "done"}. ${(j.mailboxes || []).length} created (status starts 'scheduled').`);
  console.log("Poll: node ik.mjs status " + (j.mailboxes || []).map((m) => m.uid).join(",") + "\n");
}
async function cmdRegisterDomains() {
  const spec = readSpec(args[1]);
  const n = (spec.domains || []).length;
  console.log(`\nAbout to REGISTER ${n} domain(s). Use "use_wallet_balance": true to pay from credits, else you get a Stripe checkout URL.`);
  if (!(await gate(`registering ${n} domain(s)`))) return;
  const j = await api("/v1/api/domains/register", { method: "POST", body: spec });
  console.log(`\n${j.message || "done"}. cost: $${j.total_cost ?? "?"}.`);
  if (j.url) console.log("Finish payment here: " + j.url);
  console.log("");
}
async function cmdAddWarmup() {
  const spec = readSpec(args[1]);
  const n = (spec.mailbox_uids || []).length;
  console.log(`\nAbout to ADD WARMUP to ${n} mailbox(es) (recurring credit cost).`);
  if (!(await gate(`adding warmup to ${n} mailbox(es)`))) return;
  const j = await api("/v1/api/warmup/add", { method: "POST", body: spec });
  console.log(`\n${j.message || "done"}.\n`);
}

// ---- action (no charge) ----
async function cmdExport() {
  const spec = readSpec(args[1]);
  const j = await api("/v1/api/sequencers/export", { method: "POST", body: spec });
  const r = j.results || {};
  console.log(`\nExport to sequencer: ${r.new_exports_created} created, ${r.duplicate_exports_skipped} skipped.\n`);
}

const table = {
  account: cmdAccount, mailboxes: cmdMailboxes, status: cmdStatus, dns: cmdDns, verify: cmdVerify, "warmup-stats": cmdWarmupStats,
  "buy-mailboxes": cmdBuyMailboxes, "register-domains": cmdRegisterDomains, "add-warmup": cmdAddWarmup, export: cmdExport,
};
const fn = table[cmd];
if (!fn) {
  console.error("Subcommands: account | mailboxes [--status s] | status <uids> | dns <domain> | verify <domains> | warmup-stats | buy-mailboxes <spec.json> | register-domains <spec.json> | add-warmup <spec.json> | export <spec.json>");
  process.exit(1);
}
try { await fn(); } catch (e) { console.error("Error: " + e.message); process.exitCode = 1; }
