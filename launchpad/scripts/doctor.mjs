#!/usr/bin/env node
// Launchpad tools doctor. Checks which tool API keys are set and whether they
// work. Zero dependencies, runs on plain Node 18+ (ships with Claude Code).
// NEVER prints a key. Reports status only. Always exits 0 (it is a report).
//
// Usage: node doctor.mjs            (check all tools)
//        node doctor.mjs sendkit    (check one tool)

const env = process.env;
// Unref'd timeout so a pending timer never blocks or crashes exit on Windows.
const to = (ms) => { const c = new AbortController(); const t = setTimeout(() => c.abort(), ms); if (t.unref) t.unref(); return c.signal; };

// Each tool: the env vars it needs, and an optional read-only verify request.
// Where verify is null, we confirm the key is SET but defer live checks to the
// tool's own action skill (endpoint or signing confirmed when that skill is built).
const TOOLS = [
  {
    name: "Sendkit",
    envs: ["SENDKIT_API_KEY"],
    verify: () => ({
      url: "https://api.sendkit.ai/v1/mailboxes",
      headers: {
        "X-Api-Key": env.SENDKIT_API_KEY,
        ...(env.SENDKIT_WORKSPACE_ID ? { "X-Workspace-Id": env.SENDKIT_WORKSPACE_ID } : {}),
      },
    }),
  },
  {
    name: "InboxKit",
    envs: ["INBOXKIT_API_KEY"],
    verify: () => ({
      url: "https://api.inboxkit.com/v1/api/account",
      headers: { Authorization: `Bearer ${env.INBOXKIT_API_KEY}` },
    }),
  },
  {
    name: "Spaceship",
    envs: ["SPACESHIP_API_KEY", "SPACESHIP_API_SECRET"],
    verify: () => ({
      url: "https://spaceship.dev/api/v1/domains?take=1&skip=0",
      headers: {
        "X-Api-Key": env.SPACESHIP_API_KEY,
        "X-Api-Secret": env.SPACESHIP_API_SECRET,
      },
    }),
  },
  {
    // Dynadot register/renew need HMAC signing, wired when the domain skill is
    // built. Here we only confirm the key vars are present.
    name: "Dynadot",
    envs: ["DYNADOT_API_KEY", "DYNADOT_API_SECRET"],
    verify: null,
  },
];

const STATUS = {
  MISSING: "MISSING  - no key set. Run connect-tools.",
  SET: "SET      - key present, not yet verified.",
  OK: "OK       - key works.",
  BAD: "BAD      - key set but rejected. Re-check it in connect-tools.",
  ERROR: "ERROR    - could not reach the API (network or endpoint).",
};

async function checkTool(tool) {
  const missing = tool.envs.filter((k) => !env[k] || env[k].includes("paste"));
  if (missing.length) return { name: tool.name, code: "MISSING", detail: `missing: ${missing.join(", ")}` };
  if (!tool.verify) return { name: tool.name, code: "SET", detail: "" };
  try {
    const { url, headers } = tool.verify();
    const res = await fetch(url, { headers, signal: to(8000) });
    if (res.ok) return { name: tool.name, code: "OK", detail: "" };
    if (res.status === 401 || res.status === 403) return { name: tool.name, code: "BAD", detail: `HTTP ${res.status}` };
    // Other non-2xx: key was accepted enough to reach the API, treat as set.
    return { name: tool.name, code: "SET", detail: `HTTP ${res.status}` };
  } catch (e) {
    return { name: tool.name, code: "ERROR", detail: e.name === "TimeoutError" ? "timeout" : "request failed" };
  }
}

const which = (process.argv[2] || "").toLowerCase();
const list = which ? TOOLS.filter((t) => t.name.toLowerCase() === which) : TOOLS;
if (!list.length) {
  console.log(`Unknown tool "${which}". Known: ${TOOLS.map((t) => t.name).join(", ")}`);
  process.exit(0);
}

const results = await Promise.all(list.map(checkTool));
console.log("\nLaunchpad tools doctor\n----------------------");
for (const r of results) {
  console.log(`${r.name.padEnd(10)} ${STATUS[r.code]}${r.detail ? "  (" + r.detail + ")" : ""}`);
}
console.log("");
// Let the process end naturally (avoids a Windows libuv exit assertion after network I/O).
