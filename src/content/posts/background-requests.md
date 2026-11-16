---
title: 'Background requests now follow the model switch'
pubDate: 2026-11-16T09:00:00Z
description: 'Since 0.7.6, picking Switch to X moves compaction, /recap and prompt suggestions to X as well, without running /model.'
author: 'Shawn Sandy'
tags: ['claude-code', 'prompt-triage', 'models', 'cost']
publish: true
---

Before 0.7.6, **Switch to haiku** moved only the main conversation. Claude Code's background requests
(compaction, `/recap` and prompt suggestions) are built on the session's own model, and the plugin's
`turn.step` hook never sees them. Each model keeps its own prompt cache, so every one of those requests
cached the whole conversation again on the model you had just left, at that model's price.

The plan behind the fix records the size of the problem. In the sessions it measured, the Opus spend left
over after a switch ($47.06) was larger than the spend on the cheaper model the session switched to ($44.05).

## What changed

The switch now covers the whole session from its first prompt. A new `http.fetch` hook sees each request
Claude Code itself sends to a model API. When a request names a model in the family you left, the hook
rewrites it to the full id of the model you picked, just before it is sent. A request on any other family
is sent as built, and so is every request from another plugin.

Two details keep the rewrite from going wrong:

- **The id is learned once.** The picked model's full id is read off the main loop's first request, and
  only from a request that carries tools. The main loop always sends tools and the engine's helper
  requests never do, so a helper on an older id cannot redirect every request after it.
- **Families are matched by name, not tier.** Fable and Mythos share a tier, so matching by tier would
  have moved a Mythos request as if it were Fable. The tier ranking is still used for the dialog's
  decisions.

A rewritten request that the picked model answers with a 400, because the engine built it with a field
that model refuses, is sent again as built, rather than failing outright. That resend has no test and
has not run live: the plugin's test kit cannot raise `http.fetch`, so only the rewrite decision,
`retarget()`, is tested, and no rewritten request was refused in the live check.

A subagent that inherits the session's model, or is pinned to the same family, moves with the session.
Explore keeps its `haiku` routing after a switch up.

## Why it does not run /model

The first plan was a real `/model` switch queued after the first turn. A spike on 2026-11-16 ended it:
the call was refused inside the `prompt.submit` hook, because it would wait on the turn that hook is
holding, and from the first `turn.complete` it ran but did not switch the model. A `/model` that a plugin
runs also saves that model as your default for new sessions.

The `http.fetch` route runs no `/model` at all, so nothing reaches your `settings.json`. In the live
check, the setting read the same before and after the switch, and after `/clear` the next prompt ran on
the model the session started with.

## What it does not fix

- **`/cost` and the decision log misprice a switched session.** The engine prices a moved request at
  the model it built it for, so both still count it at the session model's rate. After a switch to a
  cheaper model that overstates the spend, and after a switch up, such as Sonnet to Opus, it understates it.
- **A session that started on `haiku` and switches up leaves its haiku requests alone.** The engine runs
  its own small helper requests on haiku too, and the family cannot tell them from background ones. Those
  requests are the cheapest, so the switch up leaves them.
- **Where your organization's guard mod loads, nothing moves.** Claude Code shows its requests only to
  the organization's own mods there, so background requests stay on the session's model. The README does
  not say which sessions load the guard, and neither does this post.

The mechanism is covered by [the first-prompt post](/posts/post-1#what-stays-unchanged) and the new hook has a row in
[the hooks table](/posts/hooks). To see what a switched session cost, read
[the status row and the decision log](/posts/decision-log).
