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
| `complex`      | `high`         |
| `long-running` | `high`         |

Any main-loop request whose effort is below the minimum is sent at the minimum instead. Effort that
is already at or above it is left alone. The floor applies whichever model you choose, and also when
no dialog is shown.

The minimums guard against an effort lowered by hand. At the Claude API's default effort, the
`medium` minimum changes nothing; it acts only after you set `low`.

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

The minimum is set from the first prompt only. A different task later in the session does not change
it.
