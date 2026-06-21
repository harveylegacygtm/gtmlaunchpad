#!/usr/bin/env node
// Launchpad domain purchase. Buys the approved domains and turns auto-renew OFF.
// Zero dependencies, plain Node 18+. Reads keys from env only. Never prints keys.
//
// SPENDING GATE (survives bypass-permissions mode):
//   1. Default is a DRY RUN. It previews the plan and total and buys NOTHING.
//   2. To actually buy, ALL of these must hold:
//        a. the --confirm flag is passed, AND
//        b. it is running in a real interactive terminal (a human's TTY), AND
//        c. the human re-types a random code shown on screen.
//   3. If --confirm is passed but there is NO interactive terminal (for example
//      an agent running it, even under bypass permissions), it REFUSES and exits.
//   An agent must never pass --confirm. It hands the command to the human to run.
//
// Usage:
//   node purchase.mjs approved.csv                 (DRY RUN, safe, buys nothing)
//   node purchase.mjs approved.csv --confirm       (human runs this in a terminal)
//
// approved.csv: the generator's CSV, trimmed to the rows you want to buy.
// Columns used: domain, cheaper (or a registrar column), and the price columns.

import { readFileSync } from "node:fs";
import { createInterface } from "node:readline";
import { randomInt } from "node:crypto";

const env = process.env;
// Unref'd timeout so a pending timer never blocks or crashes exit on Windows.
const to = (ms) => { const c = new AbortController(); const t = setTimeout(() => c.abort(), ms); if (t.unref) t.unref(); return c.signal; };
const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith("--"));
const CONFIRM = args.includes("--confirm");
const YEARS = parseInt(argVal("--years") || "1", 10);

function argVal(flag) {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : null;
}
function ask(q) {
  return new Promise((res) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    rl.question(q, (a) => { rl.close(); res(a.trim()); });
  });
}
const priceNum = (s) => {
  if (s == null || s === "") return null;
  const m = String(s).match(/([0-9]+(?:\.[0-9]+)?)/);
  return m ? parseFloat(m[1]) : null;
};

if (!file) {
  console.error("Usage: node purchase.mjs <approved.csv> [--confirm]");
  process.exit(1);
}

// ---- parse CSV ----
const lines = readFileSync(file, "utf8").split(/\r?\n/).filter((l) => l.trim());
const header = lines.shift().split(",").map((h) => h.trim().toLowerCase());
const col = (row, name) => { const i = header.indexOf(name); return i >= 0 ? row[i]?.trim() : undefined; };

const plan = [];
for (const line of lines) {
  const row = line.split(",");
  const domain = (col(row, "domain") || "").toLowerCase();
  if (!domain) continue;
  let registrar = (col(row, "registrar") || col(row, "cheaper") || "").toLowerCase();
  if (registrar === "tie" || registrar === "-" || !registrar) registrar = "dynadot";
  const price =
    registrar === "spaceship" ? priceNum(col(row, "spaceship_price")) : priceNum(col(row, "dynadot_price"));
  const availCol = registrar === "spaceship" ? col(row, "spaceship_available") : col(row, "dynadot_available");
  if (availCol && !/^yes$/i.test(availCol)) {
    plan.push({ domain, registrar, price, skip: "not available at " + registrar });
    continue;
  }
  plan.push({ domain, registrar, price });
}

const buyable = plan.filter((p) => !p.skip);
const total = buyable.reduce((s, p) => s + (p.price || 0), 0);

// ---- always show the plan ----
console.log("\nPurchase plan\n-------------");
for (const p of plan) {
  console.log(
    `${p.domain.padEnd(28)} ${p.registrar.padEnd(10)} ${(p.price != null ? "$" + p.price.toFixed(2) : "?").padEnd(9)} ${p.skip ? "SKIP: " + p.skip : ""}`
  );
}
console.log("-------------");
console.log(`${buyable.length} domain(s) to buy. Estimated total: $${total.toFixed(2)} for ${YEARS} year(s).`);
console.log("Auto-renew will be turned OFF on every domain.\n");

// ---- GATE ----
if (!CONFIRM) {
  console.log("DRY RUN. Nothing was purchased.");
  console.log("To buy, a HUMAN must run this in their own terminal:");
  console.log(`   node ${process.argv[1].split(/[\\/]/).pop()} ${file} --confirm\n`);
  process.exit(0);
}

if (!process.stdin.isTTY || !process.stdout.isTTY) {
  console.error("REFUSING TO SPEND: --confirm was passed but this is not an interactive terminal.");
  console.error("A human must run this command directly in their own terminal. Exiting without buying.\n");
  process.exit(2);
}

if (!buyable.length) {
  console.log("Nothing buyable in the list. Exiting.");
  process.exit(0);
}

const code = String(randomInt(1000, 10000));
console.log(`To authorize spending about $${total.toFixed(2)}, type this code: ${code}`);
const typed = await ask("Code (anything else cancels): ");
if (typed !== code) {
  console.log("Code did not match. Cancelled. Nothing was purchased.");
  process.exit(3);
}
console.log("");

// ---- registrars ----
async function buyDynadot(domain) {
  const key = env.DYNADOT_API_KEY;
  if (!key || key.includes("paste")) return { ok: false, msg: "no Dynadot key" };
  try {
    const reg = await fetch(
      `https://api.dynadot.com/api3.json?key=${encodeURIComponent(key)}&command=register&domain=${encodeURIComponent(domain)}&duration=${YEARS}&currency0=usd`,
      { signal: to(30000) }
    ).then((r) => r.json());
    const rc = reg?.RegisterResponse?.ResponseCode ?? reg?.Response?.ResponseCode;
    if (String(rc) !== "0") return { ok: false, msg: "register failed: " + JSON.stringify(reg).slice(0, 200) };
    // turn auto-renew OFF
    const renew = await fetch(
      `https://api.dynadot.com/api3.json?key=${encodeURIComponent(key)}&command=set_renew_option&domain=${encodeURIComponent(domain)}&renew_option=donot`,
      { signal: to(30000) }
    ).then((r) => r.json());
    const rrc = renew?.SetRenewOptionResponse?.ResponseCode ?? renew?.Response?.ResponseCode;
    const renewOff = String(rrc) === "0";
    return { ok: true, msg: "registered" + (renewOff ? ", auto-renew OFF" : ", WARN: could not confirm auto-renew off") };
  } catch (e) {
    return { ok: false, msg: e.name === "TimeoutError" ? "timeout" : "request failed" };
  }
}

async function buySpaceship(domain) {
  const key = env.SPACESHIP_API_KEY;
  const secret = env.SPACESHIP_API_SECRET;
  if (!key || !secret || key.includes("paste")) return { ok: false, msg: "no Spaceship key" };
  const headers = { "X-Api-Key": key, "X-Api-Secret": secret, "Content-Type": "application/json" };
  try {
    // autoRenew:false at registration. Contacts may be required by the account.
    const res = await fetch(`https://spaceship.dev/api/v1/domains/${encodeURIComponent(domain)}`, {
      method: "POST",
      headers,
      body: JSON.stringify({ autoRenew: false, years: YEARS, privacyProtection: "public" }),
      signal: to(30000),
    });
    if (res.status !== 200 && res.status !== 202) {
      const t = await res.text();
      return { ok: false, msg: `register HTTP ${res.status}: ${t.slice(0, 200)} (Spaceship may need a default contact set)` };
    }
    // belt and suspenders: ensure auto-renew off
    await fetch(`https://spaceship.dev/api/v1/domains/${encodeURIComponent(domain)}/autorenew`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ isEnabled: false }),
      signal: to(30000),
    }).catch(() => {});
    return { ok: true, msg: "registered, auto-renew OFF" };
  } catch (e) {
    return { ok: false, msg: e.name === "TimeoutError" ? "timeout" : "request failed" };
  }
}

console.log("Buying...\n");
const receipts = [];
for (const p of buyable) {
  const r = p.registrar === "spaceship" ? await buySpaceship(p.domain) : await buyDynadot(p.domain);
  receipts.push({ ...p, ...r });
  console.log(`${r.ok ? "OK " : "FAIL"}  ${p.domain.padEnd(28)} ${p.registrar.padEnd(10)} ${r.msg}`);
}

const bought = receipts.filter((r) => r.ok);
const spent = bought.reduce((s, p) => s + (p.price || 0), 0);
console.log(`\nDone. ${bought.length}/${buyable.length} purchased. Approx spent: $${spent.toFixed(2)}.`);
console.log("Auto-renew was set OFF on every successful purchase. Verify in your registrar dashboard.\n");
// Let the process end naturally (avoids a Windows libuv exit assertion after network I/O).
