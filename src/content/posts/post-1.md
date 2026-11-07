---
title: 'What prompt-triage does with your first prompt'
pubDate: 2026-11-05T12:00:00Z
description: 'One rating, one dialog and an optional new session: what happens before the first prompt of a session is sent.'
author: 'Shawn Sandy'
tags: ['claude-code', 'prompt-triage', 'models']
publish: true
---

prompt-triage acts on the first prompt of a session. It skips slash commands and resumed sessions,
so a prompt typed into an existing conversation is not rated.

## The rating

One `haiku` call at effort `low` rates the prompt against a written rubric that defines each rating
by the shape of the task. Each rating suggests a model:

| Rating         | What it covers                                                                    | Suggested model |
| -------------- | --------------------------------------------------------------------------------- | --------------- |
| `simple`       | A question with a short answer, a lookup, or a small edit in one known place.     | `haiku`         |
| `moderate`     | An ordinary coding task with a clear goal in a few files.                         | `sonnet`        |
| `complex`      | Work that needs design judgment or reasoning across a system, in one sitting.     | `opus`          |
| `long-running` | A large job meant to run on its own for hours, such as a codebase-wide migration. | `fable`         |

When the suggestion differs from the model you are on, a dialog asks whether to switch or keep your
current model. When it matches, nothing is asked.

Under "Other" you can type a model name. Free text switches the model only if it names exactly one
of `haiku`, `sonnet`, `opus` or `fable`, so `keep opus` switches to opus. Text that names two models,
or that contains a no-word such as "no" or "don't", switches nothing. Use `/model` for those cases.

## Read as

For a `moderate`, `complex` or `long-running` prompt, the dialog opens with a one-line restatement of
what the prompt asks for, such as `Read as: add a retry limit to the upload client`. It comes from the
same `haiku` call that rated the prompt, so it adds no wait. The restatement is told to add no goal
or reason you did not state, so a misread shows before the work starts. Choose **Refine prompt** to
fix it. If the reply has no restatement, the dialog is shown without it.

## Keep model, effort low

For a `simple` prompt, the dialog's first option is **Keep model, effort low**. It keeps your model
and runs the main conversation at effort `low`, since lowering effort is often a better lever than
switching models. The switch to `haiku` is still offered after it. See
[the effort floor](/posts/post-2).

## Open in a new session

In the desktop app, a `complex` or `long-running` rating also offers **Open in a new session**, even
when the suggested model already matches yours. Choosing it adds context asking Claude to start a
fresh session with `start_session` instead of doing the task in this one. The plugin cannot start
the session itself, so this depends on Claude following that instruction.

For any later prompt in the desktop app, the **Run in** picker in the band above the prompt input does the same: set it
to **New session** and press Enter. That prompt is sent with no rating and no model dialog, since the
new session rates its own first prompt. A prompt typed while Claude is still working runs in this
session and leaves the pick armed for your next send.

## What stays unchanged

Dismissing the dialog, or a failed rating, sends the prompt as typed. A model switch lasts for the
rest of the session and covers the main conversation only; subagents keep their own models. While it
is in effect the status line shows `running <name>, not <session model>`. Running `/model` yourself
ends the override.
