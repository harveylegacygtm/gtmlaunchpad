---
name: connect-tools
description: >
  Use this skill to connect a Launchpad tool (Sendkit, InboxKit, Dynadot,
  Spaceship) by setting up its API key, securely and with the least setup.
  Trigger when the user says "connect my tools," "set up my API keys," "add my
  Sendkit key," "how do I connect Dynadot," "where do I put my API key," "the
  skill says I'm not connected," or any tool action skill reports a missing or
  bad key. This is the shared onboarding flow every API action skill falls back
  to. Do not just explain it. Walk the user through getting the key and putting
  it in the right place, then verify it.
allowed-tools: Read, Edit, Bash
---

# Connect a Tool: Set Up the API Key the Secure Way

Do not summarize this. Walk the user through connecting one tool at a time. What
they walk away with: their API key set in the right place, out of any git repo,
and verified green by the doctor. Only set up the tool they need right now. Do
not make them connect tools they will not use.

Read reference/tool-connections.md (the shared reference folder) for the exact
env var names, base URLs, auth, and signup token for each tool. That file is the
source of truth.

## Step 1: Pick the tool

Ask which tool they want to connect, or read it from what they were trying to do
(a campaign skill needs Sendkit, domains need Dynadot or Spaceship, inboxes need
InboxKit). Confirm the exact env var names from the registry.

## Step 2: Sign up and get the key

If they do not have an account, send them to sign up using the tool's signup
token (for example {{AFF-Sendkit}}, {{AFF-InboxKit}}, {{AFF-Dynadot}},
{{AFF-Spaceship}}). Then tell them where the key lives in that tool's dashboard
(the registry lists it). Some tools give a key and a secret. They need both.

Tell them to make a scoped, least-privilege key and set a spending cap if the
tool allows it. A limited key that leaks can do little harm.

## Step 3: Put the key in the secure spot

The key goes in their Claude Code settings file, in the home folder, never in the
project. That file is outside any git repo, so it can never be committed by
accident.

- Path: `~/.claude/settings.json` (Windows: `C:\Users\YourName\.claude\settings.json`)
- Add an `env` block. Show them the snippet from reference/settings.example.json,
  with only the lines for the tool they are connecting. Example for Sendkit:

```json
{
  "env": {
    "SENDKIT_API_KEY": "sk_live_their_key_here"
  }
}
```

Most secure path (recommended): have the user paste the key into that file
themselves, so the secret never passes through this chat. Give them the exact
path and the exact lines to add.

Least-setup path (offer only if they ask): they tell you the key and you write it
into the file with Edit. Warn them first that the key will then appear in this
chat and transcript. Let them choose. Never write a key they have not clearly
told you to write.

If they already have an `env` block, merge the new line in, do not overwrite the
whole file.

## Step 4: Restart and verify

Claude Code reads the settings env at startup, so they must restart or reload
Claude Code after saving for the key to take effect. Tell them this clearly,
since a "still missing" result is almost always a skipped restart.

Then run the doctor to confirm:

```
node scripts/doctor.mjs <toolname>
```

(or the tools-doctor skill). Green OK means done. MISSING means the restart was
skipped or the line is in the wrong place. BAD means the key is wrong, re-copy it.
The doctor never prints the key.

## Rules

Follow CLAUDE.md. Keys are 100% user-supplied, the plugin ships none. Read keys
only from env, never hardcode, never accept a key as a command-line argument.
Never print a key back to the screen. Any spend or send action elsewhere needs an
explicit human yes. Reference tools by token, never raw URLs.

The doctor script path is `${CLAUDE_PLUGIN_ROOT}/scripts/doctor.mjs` when
installed as a plugin (use that form if a bare `scripts/doctor.mjs` is not found).

This skill is the setup fallback for every API action skill (the Sendkit, domain,
and InboxKit skills). They preflight, and if a key is missing they send the user
here. After connecting, the user goes back to whatever skill they were running.
Verify with the tools-doctor skill.
