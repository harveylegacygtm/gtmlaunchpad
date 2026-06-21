#!/usr/bin/env node
// Launchpad copy QA for a lead-list CSV with copy columns. Flags mechanical
// problems row by row: unrendered variables, empty copy, broken merge artifacts,
// em-dashes, broken spintax, spam words, AI-tell phrases, and duplicate (non-
// personalized) copy. Zero dependencies, plain Node 18+.
//
// Usage:
//   node check.mjs leads.csv                      (auto-detect copy columns)
//   node check.mjs leads.csv --cols subject,body  (name the copy columns)
//   node check.mjs leads.csv --out flagged.csv    (write rows + a qa_flags column)
//   node check.mjs leads.csv --spam ../reference/spam_words.md   (spam list path)

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith("--"));
const argVal = (f) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : null; };
if (!file) { console.error("Usage: node check.mjs <leads.csv> [--cols a,b] [--out flagged.csv]"); process.exit(1); }

// ---- minimal RFC4180 CSV parser (handles quotes, commas, newlines in cells) ----
function parseCSV(text) {
  const rows = []; let row = [], cur = "", inQ = false, i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (inQ) {
      if (ch === '"') { if (text[i + 1] === '"') { cur += '"'; i += 2; continue; } inQ = false; i++; continue; }
      cur += ch; i++; continue;
    }
    if (ch === '"') { inQ = true; i++; continue; }
    if (ch === ",") { row.push(cur); cur = ""; i++; continue; }
    if (ch === "\r") { i++; continue; }
    if (ch === "\n") { row.push(cur); rows.push(row); row = []; cur = ""; i++; continue; }
    cur += ch; i++;
  }
  if (cur.length || row.length) { row.push(cur); rows.push(row); }
  return rows;
}
const csvCell = (s) => (/[",\n]/.test(s) ? '"' + String(s).replace(/"/g, '""') + '"' : String(s));

// ---- load spam words from the shared list ----
function loadSpam(path) {
  try {
    const txt = readFileSync(path, "utf8");
    const terms = new Set();
    let inCat = false;
    for (const line of txt.split(/\r?\n/)) {
      if (/^##\s+\d/.test(line)) { inCat = true; continue; }   // numbered category header
      if (/^#/.test(line)) { inCat = /^##\s+\d/.test(line); continue; }
      if (!inCat) continue;
      for (const t of line.split(",")) {
        const w = t.trim().toLowerCase();
        if (w.length >= 3 && !/^\d+$/.test(w)) terms.add(w);
      }
    }
    return [...terms];
  } catch { return []; }
}
const spamTerms = loadSpam(argVal("--spam") || fileURLToPath(new URL("../../reference/spam_words.md", import.meta.url)));

const AI_TELLS = [
  "as an ai", "i cannot", "i'm unable", "delve", "tapestry", "in today's fast-paced",
  "elevate your", "unleash", "game-changer", "game changer", "in conclusion",
  "i hope this email finds you well", "i hope this message finds you well",
  "navigating the", "in the realm of", "look no further", "rest assured", "furthermore,",
];

// ---- read + pick copy columns ----
const rows = parseCSV(readFileSync(file, "utf8"));
if (rows.length < 2) { console.error("CSV has no data rows."); process.exit(1); }
const header = rows[0].map((h) => h.trim());
const data = rows.slice(1).filter((r) => r.some((c) => c && c.trim()));

let copyCols;
const named = argVal("--cols");
if (named) {
  copyCols = named.split(",").map((n) => header.findIndex((h) => h.toLowerCase() === n.trim().toLowerCase())).filter((i) => i >= 0);
} else {
  // auto: text-heavy columns (avg cell length > 25)
  copyCols = header.map((_, c) => c).filter((c) => {
    const avg = data.reduce((s, r) => s + (r[c] || "").length, 0) / data.length;
    return avg > 25;
  });
}
if (!copyCols.length) { console.error("No copy columns found. Pass --cols name1,name2."); process.exit(1); }
console.log(`\nCopy columns QA'd: ${copyCols.map((c) => header[c]).join(", ")}`);
console.log(`Rows: ${data.length}\n`);

// ---- checks ----
const issues = []; // {row, col, type, detail}
const add = (r, c, type, detail) => issues.push({ row: r + 2, col: header[c], type, detail });
const seen = {}; // per-column value -> count, for duplicate detection
for (const c of copyCols) seen[c] = {};

data.forEach((r, ri) => {
  for (const c of copyCols) {
    const v = (r[c] || "").trim();
    const lv = v.toLowerCase();
    if (!v) { add(ri, c, "EMPTY", "blank copy cell"); continue; }
    seen[c][v] = (seen[c][v] || 0) + 1;
    if (/\{\{[^}]+\}\}/.test(v)) add(ri, c, "TOKEN", "unrendered variable: " + (v.match(/\{\{[^}]+\}\}/) || [])[0]);
    if (/(^|[\s>])(hi|hey|hello|dear)\s*[,!.]/i.test(v)) add(ri, c, "ARTIFACT", "empty name after greeting");
    if (/\s,|,,|\s\.\B|\(\s*\)|\s{2,}/.test(v)) add(ri, c, "ARTIFACT", "spacing/punctuation artifact");
    if (/[—–]/.test(v)) add(ri, c, "DASH", "em/en dash");
    // Strip {{variables}} first so they are not mistaken for spintax {a|b}.
    const vSpin = v.replace(/\{\{[^}]*\}\}/g, "");
    if (vSpin.includes("{")) {
      const opens = (vSpin.match(/\{/g) || []).length, closes = (vSpin.match(/\}/g) || []).length;
      if (opens !== closes) add(ri, c, "SPINTAX", "unbalanced braces");
      else if (/\{[^}|]*\}/.test(vSpin)) add(ri, c, "SPINTAX", "spintax block with no | options");
    }
    for (const tell of AI_TELLS) if (lv.includes(tell)) { add(ri, c, "AI-TELL", tell); break; }
    for (const term of spamTerms) {
      const re = /[a-z]/.test(term) && !/\s/.test(term) ? new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i") : null;
      if (re ? re.test(v) : lv.includes(term)) { add(ri, c, "SPAM", term); break; }
    }
  }
});

// duplicate (non-personalized) copy
for (const c of copyCols) {
  const dups = Object.entries(seen[c]).filter(([, n]) => n > 1 && n >= Math.max(3, data.length * 0.1));
  for (const [val, n] of dups) add(0 - 2, c, "DUPLICATE", `${n} rows share identical copy: "${val.slice(0, 40)}..."`);
}

// ---- report ----
const HARD = new Set(["EMPTY", "TOKEN", "ARTIFACT", "DASH", "SPINTAX"]);
const counts = {};
for (const it of issues) counts[it.type] = (counts[it.type] || 0) + 1;
console.log("Issue counts:");
for (const [t, n] of Object.entries(counts).sort((a, b) => b[1] - a[1])) console.log(`  ${t.padEnd(10)} ${n}${HARD.has(t) ? "  (hard fail)" : "  (review)"}`);
if (!issues.length) console.log("  none");

console.log("\nFirst flagged rows:");
for (const it of issues.slice(0, 30)) console.log(`  row ${String(it.row).padEnd(5)} ${it.col.padEnd(14)} ${it.type.padEnd(10)} ${it.detail}`);
if (issues.length > 30) console.log(`  ...and ${issues.length - 30} more`);

const hardCount = issues.filter((i) => HARD.has(i.type)).length;
console.log(`\n${hardCount ? "FAIL" : "PASS (mechanical)"}: ${hardCount} hard issue(s), ${issues.length - hardCount} review item(s).`);
console.log(hardCount
  ? "Fix the hard fails before upload. Then a human reads samples for tone/AI-feel.\n"
  : "Mechanical checks clean. Now a human should read a sample for tone and AI-feel before upload.\n");

const outPath = argVal("--out");
if (outPath) {
  const flagsByRow = {};
  for (const it of issues) { if (it.row < 1) continue; (flagsByRow[it.row] ||= []).push(`${it.col}:${it.type}`); }
  const head = [...header, "qa_flags"].map(csvCell).join(",");
  const body = data.map((r, ri) => [...header.map((_, c) => r[c] ?? ""), (flagsByRow[ri + 2] || []).join("; ")].map(csvCell).join(","));
  writeFileSync(outPath, [head, ...body].join("\n") + "\n");
  console.log("Wrote " + outPath + " (qa_flags column added)\n");
}
