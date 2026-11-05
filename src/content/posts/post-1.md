---
title: 'What prompt-triage does with your first prompt'
pubDate: 2026-11-05T12:00:00Z
description: 'One rating, one dialog and an optional new session: what happens before the first prompt of a session is sent.'
author: 'Shawn Sandy'
tags: ['claude-code', 'prompt-triage', 'models']
publish: true
---

prompt-triage acts on the first prompt of a session. It skips slash commands and resumed sessions,
so a prompt typed into an existing conversation passes through untouched.

## The rating

One call to the small, fast model rates the prompt `simple`, `moderate` or `complex`. Each rating
suggests a model:

| Rating     | Suggested model |
| ---------- | --------------- |
| `simple`   | `haiku`         |
| `moderate` | `sonnet`        |
| `complex`  | `opus`          |

When the suggestion differs from the model you are on, a dialog asks whether to switch or keep your
current model. When it matches, nothing is asked.

Under "Other" you can type a model name. Free text switches the model only if it names exactly one
of `haiku`, `sonnet` or `opus`, so `keep opus` switches to opus. Text that names two models, or that
contains a no-word such as "no" or "don't", switches nothing. Use `/model` for those cases.

## Open in a new session

In the desktop app, a `complex` rating also offers **Open in a new session**, even when the
suggested model already matches yours. Choosing it adds context asking Claude to start a fresh
session with `start_session` instead of doing the task in this one. The plugin cannot start the
session itself, so this depends on Claude following that instruction.

## What stays unchanged

Dismissing the dialog, or a failed rating, sends the prompt as typed. A model switch lasts for the
rest of the session and covers the main conversation only; subagents keep their own models. While it
is in effect the status line shows `running <name>, not <session model>`. Running `/model` yourself
ends the override.
