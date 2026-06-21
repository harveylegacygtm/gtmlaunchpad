#!/usr/bin/env node
// Launchpad domain checker. Takes a list of candidate domains and returns
// availability and price from Dynadot and Spaceship, side by side.
// Zero dependencies, plain Node 18+. Reads keys from env only. Never prints keys.
//
// Usage:
//   node check.mjs domains.txt                 (check all configured registrars)
//   node check.mjs domains.txt --out out.csv   (also write a CSV)
//   node check.mjs domains.txt --registrar dynadot   (one registrar)
//
// domains.txt: one domain per line (e.g. getlegacygtm.com).
//
// Dynadot uses the stable api3.json command API (read-only search, no signing).
// Spaceship uses the v1 batch availability endpoint.

import { readFileSync, writeFileSync } from "node:fs";

const env = process.env;
// Unref'd timeout so a pending timer never blocks or crashes exit on Windows.
const to = (ms) => { const c = new AbortController(); const t = setTimeout(() => c.abort(), ms); if (t.unref) t.unref(); return c.signal; };
const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith("--"));
const outPath = argVal("--out");
const only = (argVal("--registrar") || "both").toLowerCase();

function argVal(flag) {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : null;
}

if (!file) {
  console.error("Usage: node check.mjs <domains.txt> [--out out.csv] [--registrar dynadot|spaceship|both]");
  process.exit(1);
}

const domains = readFileSync(file, "utf8")
  .split(/\r?\n/)
  .map((d) => d.trim().toLowerCase())
  .filter(Boolean);

if (!domains.length) {
  console.error("No domains found in " + file);
  process.exit(1);
}

const priceNum = (s) => {
  if (s == null) return null;
  const m = String(s).match(/([0-9]+(?:\.[0-9]+)?)/);
  return m ? parseFloat(m[1]) : null;
};

// ---- Dynadot (api3.json command API, batched) ----
async function checkDynadot(list) {
  const out = {};
  if (only !== "both" && only !== "dynadot") return out;
  const key = env.DYNADOT_API_KEY;
  if (!key || key.includes("paste")) return mark(list, out, "no key");
  // api3 search supports domain0..domainN in one call.
  const params = new URLSearchParams({ key, command: "search", show_price: "1" });
  list.forEach((d, i) => {
    params.set(`domain${i}`, d);
    params.set(`currency${i}`, "usd");
  });
  try {
    const res = await fetch(`https://api.dynadot.com/api3.json?${params}`, { signal: to(15000) });
    const json = await res.json();
    const results = json?.SearchResponse?.SearchResults || [];
    for (const r of results) {
      const name = (r.DomainName || "").toLowerCase();
      out[name] = {
        available: /^yes$/i.test(r.Available) ? true : /^no$/i.test(r.Available) ? false : null,
        price: priceNum(r.Price),
      };
    }
    // any domain not echoed back
    for (const d of list) if (!out[d]) out[d] = { available: null, price: null, note: "no result" };
  } catch (e) {
    return mark(list, out, e.name === "TimeoutError" ? "timeout" : "request failed");
  }
  return out;
}

// ---- Spaceship (v1 batch availability) ----
async function checkSpaceship(list) {
  const out = {};
  if (only !== "both" && only !== "spaceship") return out;
  const key = env.SPACESHIP_API_KEY;
  const secret = env.SPACESHIP_API_SECRET;
  if (!key || !secret || key.includes("paste")) return mark(list, out, "no key");
  try {
    const res = await fetch("https://spaceship.dev/api/v1/domains/available", {
      method: "POST",
      headers: { "X-Api-Key": key, "X-Api-Secret": secret, "Content-Type": "application/json" },
      body: JSON.stringify({ domains: list }),
      signal: to(15000),
    });
    const json = await res.json();
    const results = json?.domains || (json?.domain ? [json] : []);
    for (const r of results) {
      const name = (r.domain || "").toLowerCase();
      const reg = (r.premiumPricing || []).find((p) => p.operation === "register") || (r.premiumPricing || [])[0];
      out[name] = {
        available: r.result === "available" ? true : r.result ? false : null,
        price: reg ? priceNum(reg.price) : null,
      };
    }
    for (const d of list) if (!out[d]) out[d] = { available: null, price: null, note: "no result" };
  } catch (e) {
    return mark(list, out, e.name === "TimeoutError" ? "timeout" : "request failed");
  }
  return out;
}

function mark(list, out, note) {
  for (const d of list) out[d] = { available: null, price: null, note };
  return out;
}

const [dyn, spc] = await Promise.all([checkDynadot(domains), checkSpaceship(domains)]);

const fmtAvail = (r) => (!r ? "-" : r.available === true ? "yes" : r.available === false ? "no" : r.note || "?");
const fmtPrice = (r) => (r && r.price != null ? "$" + r.price.toFixed(2) : "-");

const rows = domains.map((d) => {
  const a = dyn[d];
  const b = spc[d];
  let cheaper = "-";
  if (a?.available && b?.available && a.price != null && b.price != null) {
    cheaper = a.price < b.price ? "Dynadot" : b.price < a.price ? "Spaceship" : "tie";
  } else if (a?.available && a.price != null) cheaper = "Dynadot";
  else if (b?.available && b.price != null) cheaper = "Spaceship";
  return { domain: d, dyn: a, spc: b, cheaper };
});

// table
console.log("\nDomain availability\n-------------------");
console.log(["domain".padEnd(28), "Dynadot".padEnd(10), "price".padEnd(9), "Spaceship".padEnd(11), "price".padEnd(9), "cheaper"].join(""));
for (const r of rows) {
  console.log([
    r.domain.padEnd(28),
    fmtAvail(r.dyn).padEnd(10),
    fmtPrice(r.dyn).padEnd(9),
    fmtAvail(r.spc).padEnd(11),
    fmtPrice(r.spc).padEnd(9),
    r.cheaper,
  ].join(""));
}
console.log("");

if (outPath) {
  const head = "domain,dynadot_available,dynadot_price,spaceship_available,spaceship_price,cheaper\n";
  const body = rows
    .map((r) => [r.domain, fmtAvail(r.dyn), r.dyn?.price ?? "", fmtAvail(r.spc), r.spc?.price ?? "", r.cheaper].join(","))
    .join("\n");
  writeFileSync(outPath, head + body + "\n");
  console.log("Wrote " + outPath);
}
