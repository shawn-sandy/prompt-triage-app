---
title: 'prompt-triage 0.7.6: the rest of the release'
pubDate: 2026-11-16T10:00:00Z
description: 'Besides the session-wide switch, 0.7.6 caps the context cutoffs at 200K tokens, keeps a refine open when a delivery arrives, and repairs the typecheck.'
author: 'Shawn Sandy'
tags: ['claude-code', 'prompt-triage', 'release']
publish: true
---

The main change in 0.7.6 is that [background requests follow the model switch](/posts/background-requests).
The release shipped four other changes, listed on the [changelog](/changelog#v0-7-6).

## The status row measures against 200,000 tokens at most

The row's **Manage context** button appears from 25% context, and its dialog recommends **Compact** from
60%. Those percents used to be taken of the whole window. The window is now 1M tokens, so 25% and 60%
would have meant 250,000 and 600,000 tokens, far past the point where re-reading the context on every
turn costs the most.

Both cutoffs are now measured against at most 200,000 tokens:

| Window | Button appears | Compact recommended from |
| ------ | -------------- | ------------------------ |
| 200K   | 50,000 tokens  | 120,000 tokens           |
| 1M     | 50,000 tokens  | 120,000 tokens           |

The row still shows the percent the engine reports, so on a 1M window a session can read 5% while the
button is already showing. The cap is a fixed number; if the cutoffs should follow price instead, the
source marks that as the upgrade.

## A refine survives a delivery

Sending a prompt closes the band's result row and ends a refine that is still running, which is right.
But a message the session receives without you, such as a scheduled prompt, a task notification or
another plugin's message, was doing the same, which could drop the rewrite and **Restore original**. A
delivery is not your send, so it now leaves the review and the result row alone.

## The typecheck passes again

The test file imported `register` with its `.ts` extension, which TypeScript refuses unless
`allowImportingTsExtensions` is on, so the documented `tsc --noEmit` run failed with TS5097. The import
drops the extension, and the typecheck exits 0 again. The plugin's own test run still resolves the import.

## Documentation

The README now states the limits of the session-wide switch and notes that the `haiku` alias is not always
Haiku 5.5: it resolves to Haiku 5.5 on the Anthropic API and to Haiku 4.5 on Bedrock, Google Cloud,
Microsoft Foundry and Claude Platform on AWS. The rating, **Refine prompt** and the Explore override all
name `haiku`, so on those providers they run on the older model.

The release also carries a proposal and a plan for the session-wide switch, a refine eval that now reads
an `<issues>` block only before the rewrite, as the plugin does, and a note that installed sessions run
the cached copy of the plugin, not the worktree you are editing.
