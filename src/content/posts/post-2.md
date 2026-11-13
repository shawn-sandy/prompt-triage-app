---
title: 'The effort floor, and the one case that lowers effort'
pubDate: 2026-11-05T11:00:00Z
description: 'How prompt-triage sets a minimum effort from the first prompt, when it lowers effort instead, and the cases where it does nothing.'
author: 'Shawn Sandy'
tags: ['claude-code', 'prompt-triage', 'effort']
publish: true
---

After the first prompt is rated, prompt-triage sets a minimum effort for the session:

| Rating         | Minimum effort |
| -------------- | -------------- |
| `simple`       | none           |
| `moderate`     | `medium`       |
| `complex`      | `medium`       |
| `long-running` | `medium`       |

Any main-loop request whose effort is below the minimum is sent at the minimum instead. Effort that
is already at or above it is left alone. The floor applies whichever model you choose, and also when
no dialog is shown.

The dialog does not mention the minimum, since no model's default effort is below it.

The minimums guard against an effort lowered by hand. Opus 5.5 defaults to `medium`, and Claude Code
runs Fable 5.2 at `medium` by default, per
[Which Claude model should you build with?](https://claude.dev/blog/which-claude-model-should-you-build-with/),
which also notes that Claude Code's defaults can differ from the API's and that `/effort status` shows
yours. At those defaults the `medium` minimum changes nothing; it acts only after you set `low`. The
Claude API's own defaults are `high` on Fable 5.2 and Sonnet 5.5 and `medium` on Opus 5.5 and Haiku
5.5, per Anthropic's
[models overview](https://platform.claude.com/docs/en/about-claude/models/overview), so a minimum of
`high` would have raised effort on a default Fable session and not only on a lowered one.

## Keep model, effort low

Choosing **Keep model, effort low** for a `simple` prompt is the one case where the plugin lowers
effort. Every main-loop request that names an effort level is sent at exactly `low`, and the status
line shows `effort lowered to low` once a request was changed.

## When nothing changes

- The rating is `simple` and you choose another option.
- You dismiss the dialog.
- You choose **Open in a new session** or **Refine prompt**.
- The rating fails.
- The request comes from a subagent, uses a model that takes no effort setting, or has effort set as
  a number rather than a level.

## Seeing it, and ending it

The plugin cannot read your effort before the first request, so it only knows it was too low once
that request is sent. From then on the status line shows `effort raised to <level>`, while the
effort setting itself still shows the session's own value.

Running `/effort` yourself ends the minimum or the lowered effort. Any model override stays.

The effort each session actually ran at is also recorded in the decision log, so `/triage-stats` can
show what each effort level cost. See [the status row and the decision log](/posts/decision-log).

The minimum is set from the first prompt only. A different task later in the session does not change
it.
