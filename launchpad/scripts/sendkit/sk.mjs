#!/usr/bin/env node
// Launchpad Sendkit helper. Read-only ops plus a gated campaign start.
// Zero dependencies, plain Node 18+. Reads keys from env only. Never prints keys.
//
// Base: https://api.sendkit.ai   Auth: X-Api-Key (+ optional X-Workspace-Id)
//
// Subcommands:
//   mailboxes              list sending mailboxes (id, email, tags, status)
//   tags                   list AI tagging labels
//   campaigns              list campaigns (id, name, status)
//   analyze <id|all>       campaign metrics + rates vs benchmark  [--out csv]
//   warmup [mailboxId]     warmup stats
//   inspect <campaignId>   dump a campaign's JSON (to calibrate the create shape)
//   create <spec.json>     create a DRAFT campaign from a JSON spec file
//   add-leads <id> <csv>   add leads from a CSV to a campaign
//   test <id> <email>      send one test email to yourself (QA before launch)
//   start <campaignId>     START sending. GATED: needs --confirm + a human TTY +
//                          a re-typed code. An agent cannot complete this.
//
// create/add-leads/test only build and test a DRAFT. They never send to real
// leads. Only `start` does, and it is gated. Sending is treated like spending.

import { writeFileSync, readFileSync } from "node:fs";
import { createInterface } from "node:readline";
import { randomInt } from "node:crypto";

const BASE = "https://api.sendkit.ai";
const env = process.env;
const args = process.argv.slice(2);
const cmd = args[0];
const argVal = (f) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : null; };

// Unref'd timeout so a pending timer never blocks or crashes exit on Windows.
const to = (ms) => { const c = new AbortController(); const t = setTimeout(() => c.abort(), ms); if (t.unref) t.unref(); return c.signal; };

const KEY = env.SENDKIT_API_KEY;
if (!KEY || KEY.includes("paste")) {
  console.error("No Sendkit key. Run connect-tools to set SENDKIT_API_KEY.");
  process.exit(1);
}
const HEADERS = {
  "X-Api-Key": KEY,
  ...(env.SENDKIT_WORKSPACE_ID ? { "X-Workspace-Id": env.SENDKIT_WORKSPACE_ID } : {}),
  "Content-Type": "application/json",
};

async function api(path, opts = {}) {
  const res = await fetch(BASE + path, { headers: HEADERS, signal: to(20000), ...opts });
  const text = await res.text();
  let json;
  try { json = text ? JSON.parse(text) : {}; } catch { json = { _raw: text }; }
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.slice(0, 300)}`);
  return json;
}

// pull an array out of whatever envelope the API uses
const listOf = (j) => (Array.isArray(j) ? j : j.data || j.items || j.results || j.mailboxes || j.campaigns || j.tags || []);

// recursively find the first number under any of these key names (case-insensitive)
function findNum(obj, names) {
  const want = names.map((n) => n.toLowerCase());
  let hit = null;
  (function walk(o) {
    if (hit != null || !o || typeof o !== "object") return;
    for (const [k, v] of Object.entries(o)) {
      if (typeof v === "number" && want.includes(k.toLowerCase())) { hit = v; return; }
      if (v && typeof v === "object") walk(v);
    }
  })(obj);
  return hit;
}

function ask(q) {
  return new Promise((res) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    rl.question(q, (a) => { rl.close(); res(a.trim()); });
  });
}

async function cmdMailboxes() {
  const j = await api("/v1/mailboxes?limit=200");
  const rows = listOf(j);
  console.log(`\n${rows.length} mailbox(es)\n`);
  for (const m of rows) {
    const tags = (m.tags || m.labels || []).map((t) => (typeof t === "string" ? t : t.name)).join(",");
    console.log(`${(m.id || m.mailboxId || "").toString().padEnd(26)} ${(m.email || m.address || "").padEnd(34)} ${(m.status || "").padEnd(10)} ${tags}`);
  }
  console.log("");
}

async function cmdTags() {
  const j = await api("/v1/tags");
  const rows = listOf(j);
  console.log(`\n${rows.length} tag(s):`);
  for (const t of rows) console.log("  " + (typeof t === "string" ? t : t.name || JSON.stringify(t)));
  console.log("");
}

async function cmdCampaigns() {
  const j = await api("/v1/campaigns?limit=200");
  const rows = listOf(j);
  console.log(`\n${rows.length} campaign(s)\n`);
  for (const c of rows) console.log(`${(c.id || c.campaignId || "").toString().padEnd(26)} ${(c.status || "").padEnd(12)} ${c.name || ""}`);
  console.log("");
  return rows;
}

function metricsFrom(a) {
  const sent = findNum(a, ["sent", "emailsSent", "totalSent", "sentCount"]) || 0;
  const bounced = findNum(a, ["bounced", "bounces", "bounceCount"]) || 0;
  const replied = findNum(a, ["replied", "replies", "replyCount", "uniqueReplies"]) || 0;
  const positive = findNum(a, ["positiveReplies", "positive", "interested", "positiveReplyCount"]) || 0;
  const rate = (n, d) => (d ? n / d : null);
  return {
    sent, bounced, replied, positive,
    bounceRate: rate(bounced, sent),
    replyRate: rate(replied, sent),
    positiveRate: rate(positive, replied),
    leadsPerPositive: positive ? Math.round(sent / positive) : null,
  };
}

const pct = (x) => (x == null ? "-" : (x * 100).toFixed(1) + "%");
const verdict = (m) => {
  if (!m.sent || m.sent < 500) return "not enough data (need 500+ sent)";
  const ok = (m.bounceRate ?? 1) < 0.03 && (m.replyRate ?? 0) >= 0.02 && (m.positiveRate ?? 0) >= 0.15 &&
    m.leadsPerPositive != null && m.leadsPerPositive <= 100;
  if (ok) return "WINNING - at benchmark, scale it";
  const half = (m.replyRate ?? 0) >= 0.01 && (m.bounceRate ?? 1) < 0.06;
  return half ? "MEDIOCRE - optimize, diagnose the weak pillar" : "LOSING - pause and diagnose bottom-up";
};

async function cmdAnalyze() {
  const which = args[1];
  let ids = [];
  if (!which || which === "all") {
    const rows = await api("/v1/campaigns?limit=200").then(listOf);
    ids = rows.map((c) => ({ id: c.id || c.campaignId, name: c.name }));
  } else {
    ids = [{ id: which, name: which }];
  }
  const out = [];
  for (const c of ids) {
    let a;
    try { a = await api(`/v1/analytics/campaigns/${c.id}`); }
    catch { try { a = await api(`/v1/campaigns/${c.id}/analytics`); } catch (e) { console.log(`${c.name}: analytics error ${e.message}`); continue; } }
    const m = metricsFrom(a);
    out.push({ name: c.name, id: c.id, ...m });
    console.log(`\n${c.name} (${c.id})`);
    console.log(`  sent ${m.sent}  bounce ${pct(m.bounceRate)}  reply ${pct(m.replyRate)}  positive/reply ${pct(m.positiveRate)}  leads/positive ${m.leadsPerPositive ?? "-"}`);
    console.log(`  -> ${verdict(m)}`);
  }
  console.log("");
  const outPath = argVal("--out");
  if (outPath && out.length) {
    const head = "campaign,id,sent,bounce_rate,reply_rate,positive_rate,leads_per_positive,verdict\n";
    const body = out.map((m) => [m.name, m.id, m.sent, m.bounceRate ?? "", m.replyRate ?? "", m.positiveRate ?? "", m.leadsPerPositive ?? "", verdict(m)].join(",")).join("\n");
    writeFileSync(outPath, head + body + "\n");
    console.log("Wrote " + outPath + "\n");
  }
  console.log("Next: hand these numbers to the diagnostic skill to find the broken pillar.\n");
}

async function cmdWarmup() {
  const id = args[1];
  const j = await api(id ? `/v1/warmup-stats/${id}` : "/v1/warmup-stats");
  console.log("\n" + JSON.stringify(j, null, 2) + "\n");
}

async function cmdStart() {
  const id = args[1];
  if (!id) { console.error("Usage: node sk.mjs start <campaignId> [--confirm]"); process.exitCode = 1; return; }
  // No network before the gate. Show the id only, so refuse/dry-run exit cleanly.
  console.log(`\nAbout to START sending campaign ${id}.`);
  console.log("This sends real email to real people.\n");

  if (!args.includes("--confirm")) {
    console.log("DRY RUN. Nothing was sent.");
    console.log("To go live, a HUMAN must run this in their own terminal:");
    console.log(`   node sk.mjs start ${id} --confirm\n`);
    return;
  }
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    console.error("REFUSING TO SEND: --confirm passed but this is not an interactive terminal.");
    console.error("A human must run this directly in their own terminal. Exiting without sending.\n");
    process.exitCode = 2;
    return;
  }
  const code = String(randomInt(1000, 10000));
  console.log(`To authorize going live, type this code: ${code}`);
  const typed = await ask("Code (anything else cancels): ");
  if (typed !== code) { console.log("Code did not match. Cancelled. Nothing was sent."); process.exitCode = 3; return; }
  await api(`/v1/campaigns/${id}/start`, { method: "POST", body: "{}" });
  console.log("\nCampaign started. Watch deliverability daily (soft launch = 10-20%).\n");
}

async function cmdInspect() {
  const id = args[1];
  if (!id) { console.error("Usage: node sk.mjs inspect <campaignId>"); process.exitCode = 1; return; }
  const j = await api(`/v1/campaigns/${id}`);
  console.log("\n" + JSON.stringify(j, null, 2) + "\n");
  console.log("Use these field names to shape your create spec.json.\n");
}

// The skill owns the body shape. This just POSTs the spec file as-is, so the
// shape can be calibrated by editing the spec, never this script.
async function cmdCreate() {
  const specPath = args[1];
  if (!specPath) { console.error("Usage: node sk.mjs create <spec.json>"); process.exitCode = 1; return; }
  let spec;
  try { spec = JSON.parse(readFileSync(specPath, "utf8")); }
  catch (e) { console.error("Could not read/parse " + specPath + ": " + e.message); process.exitCode = 1; return; }
  const j = await api("/v1/campaigns", { method: "POST", body: JSON.stringify(spec) });
  const id = j.id || j.campaignId || j.data?.id;
  console.log("\nCreated DRAFT campaign.");
  if (id) console.log("Campaign id: " + id);
  console.log(JSON.stringify(j, null, 2).slice(0, 600) + "\n");
  console.log("Next: add-leads, send a test email, then a HUMAN runs start.\n");
}

async function cmdAddLeads() {
  const id = args[1];
  const csv = args[2];
  if (!id || !csv) { console.error("Usage: node sk.mjs add-leads <campaignId> <leads.csv>"); process.exitCode = 1; return; }
  const lines = readFileSync(csv, "utf8").split(/\r?\n/).filter((l) => l.trim());
  const head = lines.shift().split(",").map((h) => h.trim());
  const leads = lines.map((line) => {
    const cells = line.split(",");
    const o = {};
    head.forEach((h, i) => { o[h] = (cells[i] || "").trim(); });
    return o;
  });
  const j = await api(`/v1/campaigns/${id}/leads`, { method: "POST", body: JSON.stringify({ leads }) });
  console.log(`\nSent ${leads.length} lead(s) to campaign ${id}.`);
  console.log(JSON.stringify(j, null, 2).slice(0, 400) + "\n");
}

async function cmdTest() {
  const id = args[1];
  const email = args[2];
  if (!id || !email) { console.error("Usage: node sk.mjs test <campaignId> <your@email>"); process.exitCode = 1; return; }
  const j = await api(`/v1/campaigns/${id}/send-test-email`, { method: "POST", body: JSON.stringify({ email }) });
  console.log(`\nTest email requested to ${email}. Check your inbox and QA it.`);
  console.log(JSON.stringify(j, null, 2).slice(0, 300) + "\n");
}

const table = { mailboxes: cmdMailboxes, tags: cmdTags, campaigns: cmdCampaigns, analyze: cmdAnalyze, warmup: cmdWarmup, inspect: cmdInspect, create: cmdCreate, "add-leads": cmdAddLeads, test: cmdTest, start: cmdStart };
const fn = table[cmd];
if (!fn) {
  console.error("Subcommands: mailboxes | tags | campaigns | analyze <id|all> | warmup [id] | inspect <id> | create <spec.json> | add-leads <id> <csv> | test <id> <email> | start <id>");
  process.exit(1);
}
try { await fn(); } catch (e) { console.error("Error: " + e.message); process.exit(1); }
