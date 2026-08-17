---
name: copy-qa
description: >
  Use this skill to QA cold email copy before it sends: a single email, a spintax
  block, or a whole lead-list CSV with personalized copy columns. Trigger when
  the user says "QA my copy," "check my copy," "QA my lead list," "did my
  personalization render," "check my icebreakers," "is this ready to send," "QA
  before upload," or hands over copy or a CSV to vet. It flags broken merge
  fields, unrendered variables, spam words, AI tells, and dashes, row by row,
  then asks for approval before upload. Do not just explain it. Run the QA and
  produce a clean, approved list.
allowed-tools: Read, Write, Bash
---

# Copy QA: Catch the Errors Before They Send

Do not summarize this. Run the QA on whatever the user gives you. What they walk
away with: copy that reads human, with every variable filled, no spam words, no
AI tells, and a clear approved-to-upload call. A bad variable or a broken bracket
can wreck a whole send, so this runs before anything goes into Sendkit.

## Step 1: Detect the input

- A single email or a spintax block -> go to Step 2.
- A lead-list CSV with copy columns (subject, body, icebreaker, personalized
  lines) -> go to Step 3.
- Both -> do Step 2 on the template, then Step 3 on the rendered CSV.

## Step 2: QA plain copy or spintax (the agent)

Run the copy-qa agent on the copy. It loads the spam-word list
(reference/spam_words.md) and checks grammar, length, one CTA, no AI-isms, no
em-dashes, variables intact, and that every spintax option reads right. Fix what
it flags. For spam words, rewrite first (grade 5 to 6), pluralize only as a last
resort, per the spam-word list rules.

## Step 3: QA a lead-list CSV (the script)

Run the row-by-row checker:

```
node ${CLAUDE_PLUGIN_ROOT}/scripts/copyqa/check.mjs leads.csv --out flagged.csv
```

Name the copy columns with `--cols subject,body,icebreaker` if auto-detect picks
the wrong ones. The checker reads keys from nothing (it is local, no API), uses a
real CSV parser (copy cells can hold commas), and flags each row:

- Hard fails (fix before upload): EMPTY copy, TOKEN (an unrendered {{variable}}),
  ARTIFACT (an empty name after "Hi," double spaces, stray commas), DASH (em or
  en dash), SPINTAX (unbalanced braces or a block with no | options).
- Review items: SPAM (a spam-trigger word) and AI-TELL (a phrase that reads like
  AI wrote it).

The `--out` CSV adds a `qa_flags` column so the user sees exactly which rows and
columns failed. Fix the data, re-run until there are zero hard fails.

## Step 4: The human and tone pass

Mechanical clean is not the same as good. Read a sample of rows yourself (say 5 to
10 across the list) and check the things a script cannot:

- Does it sound human, not templated or AI?
- Is the personalization specific, or could it be sent to anyone?
- Is spacing and capitalization normalized after the merge?

Flag anything that reads off. For copy-wide tone problems, the sentiment loop and
rewrites live in 09-copy-frameworks.

## Step 5: Final spam check and approval

Have the user paste a sample email into a spam-word checker (Mailmeteor's free
one), since that step has no API. Then ask plainly: is this ready and approved to
upload? Do not upload on your own.

## Step 6: Upload on approval

Once approved, hand the clean CSV to the sendkit-create-campaign skill (its
add-leads step) to load into the campaign. Copy never goes live here, only into a
draft. Launch stays gated in sendkit-create-campaign.

## Rules

Follow CLAUDE.md. Grade 6, short sentences, no em-dashes, lead with the outcome.
This skill pairs the copy-qa agent (judgment on plain copy) with the CSV checker
(row-by-row mechanical QA). Copy comes from 09-copy-frameworks, spintax from
spintax-sendkit, the spam list from reference/spam_words.md, and approved lists go
to sendkit-create-campaign. Build questions go to the orchestrator skill.
