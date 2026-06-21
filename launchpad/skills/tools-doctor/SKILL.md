---
name: tools-doctor
description: >
  Use this skill to check whether the Launchpad tool API keys are set and
  working. Trigger when the user says "check my API connections," "are my tools
  connected," "test my keys," "is Sendkit connected," "run the doctor," "why
  isn't my key working," or before running any API action skill for the first
  time. It pings each configured tool and reports green or red, without ever
  showing the key. Do not just explain it. Run the check and report status.
allowed-tools: Read, Bash
---

# Tools Doctor: Check the Connections

Do not summarize this. Run the check and tell the user the status of each tool,
then fix any red one by routing to connect-tools. The doctor never prints a key,
only status.

## Step 1: Run the doctor

Run the bundled script:

```
node scripts/doctor.mjs
```

Or check one tool: `node scripts/doctor.mjs sendkit`. The script is in the plugin
root (use `${CLAUDE_PLUGIN_ROOT}/scripts/doctor.mjs` if a bare path is not found).
It runs on plain Node, which ships with Claude Code, so no install is needed.

## Step 2: Read the status

Each tool reports one of:

- OK: key works. Nothing to do.
- SET: key is present but not live-verified yet (normal for tools whose live
  check is wired later, like Dynadot). Safe to proceed.
- MISSING: no key set. The key line is absent, or Claude Code was not restarted
  after adding it.
- BAD: key is set but the API rejected it. It is wrong or expired, re-copy it.
- ERROR: could not reach the API (network blip or endpoint change). Retry.

## Step 3: Fix the red ones

For any MISSING or BAD result, route the user to the connect-tools skill for that
tool. For MISSING, first remind them to restart Claude Code, since a skipped
restart is the most common cause. Re-run the doctor after they fix it.

## Rules

Follow CLAUDE.md. Never display a key. Read keys only from env. This skill is the
verify step for connect-tools and the preflight every API action skill should run
before it tries a live call. Connection details live in
reference/tool-connections.md (the shared reference folder).
