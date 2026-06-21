---
name: spintax-sendkit
description: >
  Use this skill to rewrite a cold email with SendKit spintax: single curly
  braces {option1|option2|option3} for variations, double curly braces
  {{firstName}} for variables. Trigger when the user says "spintax this for
  SendKit," "add SendKit spintax," "spin this cold email," "make SendKit
  variations," or pastes a cold email to spin for SendKit. This is SendKit
  format, not Instantly (Instantly uses {{RANDOM|...}}). Output only the finished
  spintaxed email, nothing else.
allowed-tools: Read
---

# SendKit Spintax

Take a cold email and rewrite it with spintax applied to as much of the email as
possible, formatted for SendKit using single curly braces with pipe separators:
{option1|option2|option3}.

SendKit variables use double curly braces: {{firstName}}, {{lastName}},
{{companyName}}, {{signature}}, {{accountSignature}}, and any custom variables
like {{ICP}}, {{city}}, {{state}}. These must NEVER be altered, renamed, or
wrapped in additional brackets.

## Format rules

- Spintax blocks use SINGLE curly braces: {option1|option2|option3}
- Variables use DOUBLE curly braces: {{variableName}}
- Never add RANDOM or any prefix inside spintax blocks
- Never wrap variables in spintax blocks

## Core rules

### Rule 1: Spintax as much as possible

Every sentence, every bullet point, every CTA, every transition, apply spintax to
all of it. The only exceptions are proper nouns, brand names, URLs, and variables,
which must stay exactly as they are. If a word or phrase can have a natural
alternative, spin it.

### Rule 2: Every combination must be grammatically correct

Before finalizing any spintax block, mentally test every possible combination it
creates with the surrounding text AND with the spintax blocks before and after
it. If even one combination reads awkwardly or breaks grammar, rewrite the
options until all combinations work cleanly.

### Rule 3: Sound like a real human wrote it

Every variation must sound natural and conversational. If it sounds like a mail
merge gone wrong, redo it. The goal is for every possible version of the email to
sound like a thoughtful salesperson wrote it one to one.

### Rule 4: No spam words, no special characters, no em dashes

Before you finalize, load references/spam_words.md and make sure none of its
words or phrases appear in any option of any block. Handle a flagged word the way
that file says: rewrite it at a grade 5 to 6 reading level first, with no weird
examples and no short AI-vibe lines. Only for the hard ones (insurance, finance,
income, mortgage, loan) where no rewrite reads naturally, pluralize or lightly
alter the word, since a small change ducks the filter and a reader rarely
notices. Also use no em dashes, no exclamation points, and no other special
characters anywhere in the email.

### Rule 5: Variables stay untouched

Keep all SendKit variables exactly as they appear with double curly braces:
{{firstName}}, {{lastName}}, {{companyName}}, and so on. If a spintax block sits
next to or contains a variable, every combination in that block must make
grammatical sense with the variable in place and with every combination of the
block after it.

### Rule 6: 2 to 4 alternatives per spintax block

Write 2 to 4 options per block, enough for variation without becoming
unmanageable.

### Rule 7: Check adjacent blocks

When two or more spintax blocks appear next to each other, every possible
combination across those blocks must read naturally. Test cross-block
combinations.

### Rule 8: Line breaks matter

Never let two spintax blocks run together without proper spacing or line breaks
between them. Each sentence or thought should have clear separation.

## Process

1. Read the full email before touching anything.
2. Go line by line and sentence by sentence. Identify every word, phrase, and
   sentence that can take a natural alternative.
3. Write 2 to 4 alternatives per spintax block.
4. Apply spintax across the entire email including all bullet points, CTAs, P.S.
   lines, and sign-offs.
5. Run the spam-word check from Rule 4 against every option.
6. Do a full read-through of at least 3 different random combinations to verify
   every version sounds clean and human.
7. Output only the final spintaxed email. No explanations, no notes, no
   formatting, just the email ready to paste into SendKit.

## Example input

Hey {{firstName}}, I saw that you have been a licensed real estate agent since {{year}}.
Have you thought about how to protect your assets?
Can I send you more details?

## Example output

{Hey|Hi} {{firstName}}, {I saw that you have been|I noticed you have been|I see you have been} a licensed real estate agent since {{year}}.
{Have you thought about|Have you ever considered|Has it ever crossed your mind} {how to protect your assets?|how to make sure your assets are protected?|how you can safeguard your assets?}
{Can I send you more details?|Want me to send over more information?|Should I send you the details?}

## What NOT to do

- Do NOT use {{RANDOM|...}} format. That is Instantly format, not SendKit.
- Do NOT alter variable names or wrap them in single braces.
- Do NOT output explanations, headers, or notes. Just the spintaxed email.
- Do NOT use em dashes, exclamation points, or special characters.
- Do NOT stack spintax blocks together without line breaks or spacing.
- Do NOT create combinations that sound robotic or unnatural.

## Where this fits

This skill spins copy written in the 09-copy-frameworks skill into SendKit
variations. For a final spam and grammar pass on the result, use the copy-qa
agent. For Instantly format instead of SendKit, use the instantly-spintax skill.
