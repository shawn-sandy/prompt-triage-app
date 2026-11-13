/**
 * Release history of the prompt-triage plugin, written from the commit history
 * of github.com/shawn-sandy/prompt-triage (HEAD 18dbffb, 2026-11-13).
 *
 * Every commit is listed once, under the release that shipped it. Because the
 * history is linear, that is the first `chore: bump version to X` commit after
 * it; commits after the last bump sit under `Unreleased`. The bump commits
 * themselves are the release markers, so they are not listed as changes.
 *
 * To add a release: put a new object at the top of `pluginChangelog`, give each
 * change its PR number as `ref` (or a commit hash when there was no PR), and
 * set `tagged` only if `prompt-triage--v<version>` exists on the remote.
 */

import { PLUGIN_REPO_URL } from '#utils/site-config'

/** Plugin behaviour first, then the work around it. */
export type ChangeGroup = 'Added' | 'Changed' | 'Fixed' | 'Docs, CI and tooling'

/** Order the groups are shown in under each release. */
export const CHANGE_GROUPS: ChangeGroup[] = ['Added', 'Changed', 'Fixed', 'Docs, CI and tooling']

export type Change = {
  group: ChangeGroup
  /** One sentence, plain words. May use backticks for code names. */
  text: string
  /** Pull request number, or a commit hash for a change that had no PR. */
  ref: number | string
}

export type Release = {
  /** Plugin version, or `Unreleased` for commits after the last bump. */
  version: string
  /** ISO date of the version bump commit; absent for `Unreleased`. */
  date?: string
  /** True when a `prompt-triage--v<version>` tag exists on the remote. */
  tagged?: boolean
  changes: Change[]
}

export const UNRELEASED = 'Unreleased'

export const pluginChangelog: Release[] = [
  {
    version: UNRELEASED,
    changes: [
      {
        group: 'Docs, CI and tooling',
        text: 'The refine eval now accepts an `<issues>` block only before the rewrite, the same place the plugin reads it, so a reply with `<issues>` inside the rewrite no longer scores clean.',
        ref: 66,
      },
      {
        group: 'Docs, CI and tooling',
        text: 'Noted that installed sessions run the cached copy of the plugin, not the worktree you are editing.',
        ref: 60,
      },
    ],
  },
  {
    version: '0.7.5',
    date: '2026-11-13',
    tagged: true,
    changes: [
      {
        group: 'Fixed',
        text: 'Refine no longer asks questions whose answers the agent can find itself, such as facts in the repo. It asks only for what the person can know.',
        ref: 64,
      },
      {
        group: 'Docs, CI and tooling',
        text: 'Added a refine eval (`scripts/eval-refine.mjs`) that scores the reviewer against real haiku. It runs in a private folder, six calls at a time, and fails on an empty or incomplete reply.',
        ref: 64,
      },
    ],
  },
  {
    version: '0.7.4',
    date: '2026-11-13',
    tagged: true,
    changes: [
      {
        group: 'Fixed',
        text: '`/clear` now ends the model override, the effort minimum and the spent Refine offer from the cleared conversation, so the next prompt is rated as a new first prompt. `/resume` and `/branch` keep them.',
        ref: 59,
      },
      {
        group: 'Fixed',
        text: "The refine band's result row closes on `/clear`, so Restore original can no longer put an old draft back.",
        ref: 59,
      },
      {
        group: 'Fixed',
        text: 'The decision log now records "Keep" only for the exact keep option. A model name with spaces, such as "Default (recommended)", was logged as `other`, and typing "Keep opus", which switches to opus, was logged as a keep.',
        ref: 59,
      },
    ],
  },
  {
    version: '0.7.3',
    date: '2026-11-13',
    tagged: true,
    changes: [
      {
        group: 'Docs, CI and tooling',
        text: 'The version bump pull request is now merged by the bump job itself, so a release no longer waits for someone to click merge.',
        ref: 61,
      },
    ],
  },
  {
    version: '0.7.2',
    date: '2026-11-12',
    tagged: true,
    changes: [
      {
        group: 'Changed',
        text: 'The status row now shows the context percent after the token count, for example "52.6K tokens · 26% context".',
        ref: 57,
      },
      {
        group: 'Fixed',
        text: 'The status row counts only prompts you send. Slash commands, hidden prompts and dropped prompts no longer count, a compaction keeps the count, and `/clear` starts it at zero. The count is read from the transcript at startup, reload or `/resume`.',
        ref: 57,
      },
      {
        group: 'Fixed',
        text: 'The row redraws as soon as a sent prompt is counted, instead of one prompt behind until the turn ends.',
        ref: 57,
      },
      {
        group: 'Changed',
        text: 'Decision log entries record `prompts` (prompts you sent) in place of `turns`, and `/triage-stats` averages prompts. Older entries that hold `turns` are left out of that average.',
        ref: 57,
      },
    ],
  },
  {
    version: '0.7.1',
    date: '2026-11-12',
    tagged: true,
    changes: [
      {
        group: 'Fixed',
        text: "Added a gap between the Triage section's rows, so the controls and the session estimate no longer look overlapped.",
        ref: 55,
      },
    ],
  },
  {
    version: '0.7.0',
    date: '2026-11-12',
    tagged: true,
    changes: [
      {
        group: 'Changed',
        text: "The band's controls are grouped in a bordered Triage section.",
        ref: 53,
      },
    ],
  },
  {
    version: '0.6.1',
    date: '2026-11-12',
    tagged: true,
    changes: [
      {
        group: 'Fixed',
        text: 'The session estimate row is drawn last in the band.',
        ref: 50,
      },
      {
        group: 'Docs, CI and tooling',
        text: 'Claude Code Review now runs only for events sent by a person. It failed on every version bump pull request because the action rejects bot senders.',
        ref: 52,
      },
    ],
  },
  {
    version: '0.6.0',
    date: '2026-11-11',
    tagged: true,
    changes: [
      {
        group: 'Changed',
        text: 'The effort minimum is now `medium` for moderate, complex and long-running prompts. Complex and long-running prompts used to get `high`, and the dialog no longer says "Effort will be at least high". The minimum still acts only if you lowered effort by hand.',
        ref: 47,
      },
      {
        group: 'Changed',
        text: 'After a switch up to `opus` or `fable`, the built-in Explore subagent runs on `haiku` when the request that starts it names no model of its own. Resumed runs, teammates and other agents are left alone.',
        ref: 47,
      },
      {
        group: 'Changed',
        text: 'The hand-off to a new session now carries a short written plan (the files involved and the steps in order) along with the prompt, so the new session does not redo the reading.',
        ref: 47,
      },
      {
        group: 'Added',
        text: 'Each decision log entry records its UTC date and the effort the session ran at. `/triage-stats since YYYY-MM-DD` tallies only newer entries, and a table shows average cost by rating and effort.',
        ref: 47,
      },
      {
        group: 'Changed',
        text: 'The status row button is now labelled "Manage context" at every level. It still opens a dialog that recommends Clear or Compact.',
        ref: 49,
      },
      {
        group: 'Docs, CI and tooling',
        text: "Fixed four type errors in `register.test.ts`, and added a plan and README corrections that align model and effort choices with Anthropic's model-selection guidance.",
        ref: 49,
      },
    ],
  },
  {
    version: '0.5.0',
    date: '2026-11-11',
    tagged: true,
    changes: [
      {
        group: 'Added',
        text: 'A "Session estimate" status row at the right edge of the band, shown after the first prompt. It gives the session cost, the prompt count and the tokens in context (for example 48.2K), and refreshes at the end of each turn and whenever the cost or context moves.',
        ref: 45,
      },
      {
        group: 'Added',
        text: "The row's button appears from 25% context and opens a dialog offering `/clear` or `/compact`, recommending Compact from 60%. Only the exact option you pick runs, and a double press runs it once.",
        ref: 45,
      },
      {
        group: 'Fixed',
        text: 'The status row redraws after a typed `/clear` or a compaction, and keeps counting prompts that a compaction summarized away.',
        ref: 45,
      },
      {
        group: 'Docs, CI and tooling',
        text: 'Let `gh release list` run outside the sandbox, so sessions can read releases with the stored token.',
        ref: 44,
      },
    ],
  },
  {
    version: '0.4.4',
    date: '2026-11-09',
    tagged: true,
    changes: [
      {
        group: 'Added',
        text: 'Decision log entries record how many turns followed the decision and the context percent at the end of the latest turn. `/triage-stats` adds a per-rating table of both averages.',
        ref: 39,
      },
      {
        group: 'Fixed',
        text: 'The turn count is still recorded when reading the session usage fails at the end of a turn.',
        ref: 39,
      },
      {
        group: 'Fixed',
        text: '"Run in: New session" now hands off a prompt you send while a turn is running. Only your own prompts take the pick; a task notification or another session\'s message leaves it armed. The picker also redraws when you select it.',
        ref: 41,
      },
      {
        group: 'Docs, CI and tooling',
        text: 'Version bumps are now opened as a `bump/v<version>` pull request, because `main` requires one. A new release workflow tags and publishes when it merges, and older bump pull requests are closed.',
        ref: 42,
      },
      {
        group: 'Docs, CI and tooling',
        text: 'Remote `git` operations and the `gh` commands sessions use now run outside the sandbox so they can read the macOS Keychain. The `--upload-pack`, `--receive-pack` and `--exec` flags are denied.',
        ref: 40,
      },
      {
        group: 'Docs, CI and tooling',
        text: 'Linked the official mods interface reference from `CLAUDE.md` and said when to read it.',
        ref: 38,
      },
    ],
  },
  {
    version: '0.4.3',
    date: '2026-11-08',
    tagged: true,
    changes: [
      {
        group: 'Added',
        text: 'Each logged decision gets a random id and the US dollars the session spent after it (rounded down to four places). `/triage-stats` adds average cost per rating and choice, with the session count beside each average. No prompt text and no session id are stored.',
        ref: 36,
      },
      {
        group: 'Changed',
        text: 'When the suggested model is two or more tiers above the current one, the dialog says so, for example "Opus is two tiers above your current model." It never states a price.',
        ref: 35,
      },
      {
        group: 'Fixed',
        text: 'Cost is no longer written onto an earlier decision after `/resume` or `/branch`, and a session that spent nothing records no cost instead of `0`.',
        ref: 36,
      },
      {
        group: 'Docs, CI and tooling',
        text: 'The rating eval takes `--runs N` (a whole number from 1 to 20) and averages each class over the runs, with a confusion table and a Wilson interval on the mean.',
        ref: 34,
      },
      {
        group: 'Docs, CI and tooling',
        text: 'Added `CLAUDE.md` pointing at the official mods reference, and a proposal for recording session cost next to each decision.',
        ref: 33,
      },
    ],
  },
  {
    version: '0.4.2',
    date: '2026-11-07',
    tagged: true,
    changes: [
      {
        group: 'Added',
        text: 'Every rated first prompt is logged (the rating, the model before and after, and the option chosen), keeping the newest 200 entries. A failed store write never holds the prompt.',
        ref: 30,
      },
      {
        group: 'Added',
        text: 'A `/triage-stats` command prints that log as a table per rating: how many were rated, how often the model switched, and switches up to a pricier tier or down to a cheaper one. It makes no model call.',
        ref: 30,
      },
      {
        group: 'Changed',
        text: 'A simple prompt on a model two or more tiers above haiku now lists "Switch to haiku" before "Keep model, effort low".',
        ref: 30,
      },
      {
        group: 'Docs, CI and tooling',
        text: 'The rating eval grew from 8 to 40 cases per rating and prints a Wilson 95% interval beside each score. It now fails fast, in 30 seconds, when the sandbox blocks the API.',
        ref: 30,
      },
      {
        group: 'Docs, CI and tooling',
        text: 'Updated the Claude Code GitHub workflows.',
        ref: 29,
      },
    ],
  },
  {
    version: '0.4.1',
    date: '2026-11-07',
    changes: [
      {
        group: 'Changed',
        text: 'A long-running rating now offers "Switch to opus" after the fable suggestion, when opus is a step up from your model. This gives a one-click way to correct a rating that is one tier too high.',
        ref: 27,
      },
      {
        group: 'Fixed',
        text: 'Wrapped lines of the refine band keep a gap from the buttons above them.',
        ref: 26,
      },
      {
        group: 'Docs, CI and tooling',
        text: "Added a review of the first-prompt rating's cost, and a proposal and a plan for putting evidence behind the plugin's cost levers. Both are specs only.",
        ref: 27,
      },
    ],
  },
  {
    version: '0.4.0',
    date: '2026-11-06',
    tagged: true,
    changes: [
      {
        group: 'Added',
        text: 'Goal, Workflow and Scope pickers and a Refine button in the band above the prompt input, in the terminal and the desktop app. The band shows when the draft is not empty, not a slash command and meets the `band` setting: `always`, `long` (the default: 40 characters or more, or a line break) or `never`.',
        ref: 21,
      },
      {
        group: 'Added',
        text: 'Refine from the band reviews the draft, asks up to three questions, and puts the rewrite in the prompt box unless you changed the draft meanwhile. A result row shows the issue count, Show issues, Restore original and Done. Your picks are saved and also apply to Refine prompt and `/refine-prompt`.',
        ref: 21,
      },
      {
        group: 'Added',
        text: 'A "Run in" picker in the band (desktop app). Set to New session, the next prompt skips the rating and dialog and goes to a new session, whichever prompt it is. The pick resets after the send.',
        ref: 20,
      },
      {
        group: 'Added',
        text: 'The model dialog restates moderate and complex prompts in one line, so a misread shows early.',
        ref: 14,
      },
      {
        group: 'Added',
        text: 'A long-running rating that suggests `fable` with a `high` effort minimum, and a "Keep model, effort low" option, offered first for simple prompts. "fable" is accepted under Other.',
        ref: 16,
      },
      {
        group: 'Changed',
        text: 'The first prompt is rated against a written rubric, in one haiku call at effort low, instead of bare labels. On the eval it scored 27 of 32 against 21 of 32 for bare labels. Unrecognized model names count as strong enough, so a complex prompt never offers a step down.',
        ref: 16,
      },
      {
        group: 'Changed',
        text: 'The rating and the one-line restatement now come from a single haiku call instead of two blocking ones, so the dialog opens sooner.',
        ref: 17,
      },
      {
        group: 'Fixed',
        text: "Refine from the band now runs from a timer after hitting the engine's 10-second press budget. The pickers are ordered Goal, Workflow, Scope, the controls have spacing, a trailing line break counts, and focus starts on Refine so `r` presses it.",
        ref: 21,
      },
      {
        group: 'Docs, CI and tooling',
        text: 'Every pull request now runs `claude plugin validate .` and `claude plugin test .`, and the release waits for them.',
        ref: 23,
      },
      {
        group: 'Docs, CI and tooling',
        text: "The version bump is pushed with a GitHub App token that can bypass `main` protection, and it scans commits since the current version's tag so a failed run's `feat` commits still bump the minor version.",
        ref: 24,
      },
      {
        group: 'Docs, CI and tooling',
        text: 'Added the refine band proposal with a clickable prototype, the model-selection findings and plan, and an implementation plan for the Run in picker.',
        ref: 18,
      },
    ],
  },
  {
    version: '0.3.4',
    date: '2026-11-05',
    tagged: true,
    changes: [
      {
        group: 'Changed',
        text: 'Renamed the `/improve` command to `/refine-prompt`, and the dialog button to Refine prompt. The README tells `/improve` users about the rename.',
        ref: 13,
      },
      {
        group: 'Fixed',
        text: 'The plugin icon is a PNG (512 by 512, transparent) at the repo root, and the manifest points at it, because the plugin directory showed a broken image for the SVG.',
        ref: 12,
      },
      {
        group: 'Docs, CI and tooling',
        text: 'Added the PNG icon rendered from the SVG source.',
        ref: 11,
      },
      {
        group: 'Docs, CI and tooling',
        text: 'Reworded a README install line that the plugin directory read as the `pass` password manager and held for review.',
        ref: 10,
      },
    ],
  },
  {
    version: '0.3.3',
    date: '2026-11-04',
    tagged: true,
    changes: [
      {
        group: 'Added',
        text: 'Improve prompt asks up to three multiple-choice questions for facts only the person can supply, such as unfilled `[placeholders]`, then rewrites the prompt with the answers. Dismissing a question skips the rest.',
        ref: 9,
      },
      {
        group: 'Fixed',
        text: 'Free text under Other switches the model only when it names exactly one. "not haiku, use opus" no longer switches to haiku, and "no, don\'t use haiku" switches nothing.',
        ref: 9,
      },
      {
        group: 'Fixed',
        text: 'A complex prompt on a model above opus, such as Fable, is no longer offered a step down to opus.',
        ref: 9,
      },
      {
        group: 'Fixed',
        text: 'The path check skips words like "and/or" and now covers the rewrite too, so a path the reviewer invented is reported. A path counts only with a `./` or `../` start or a common source extension.',
        ref: 9,
      },
      {
        group: 'Docs, CI and tooling',
        text: 'Added a repo layout table and a releases section to the README.',
        ref: 8,
      },
    ],
  },
  {
    version: '0.3.2',
    date: '2026-11-04',
    tagged: true,
    changes: [
      {
        group: 'Fixed',
        text: 'The held-prompt review shows as one clean line. The app draws a drop reason on a single row, so the multi-line issue list showed stray glyphs. An unfilled rewrite is kept intact in that line.',
        ref: 7,
      },
    ],
  },
  {
    version: '0.3.1',
    date: '2026-11-03',
    tagged: true,
    changes: [
      {
        group: 'Docs, CI and tooling',
        text: 'Each version bump now publishes a GitHub release with generated notes. Before this, the tag never reached the remote.',
        ref: 6,
      },
    ],
  },
  {
    version: '0.3.0',
    date: '2026-11-03',
    changes: [
      {
        group: 'Added',
        text: "An effort minimum set by the first prompt's rating: moderate prompts run at `medium` or above and complex ones at `high` or above. Lower requests are raised and effort is never lowered. `/effort` ends the minimum, the dialog names it, and the status line shows when a raise happened.",
        ref: 5,
      },
    ],
  },
  {
    version: '0.2.0',
    date: '2026-11-03',
    changes: [
      {
        group: 'Added',
        text: 'An Improve prompt option in the first-prompt dialog and an `/improve` command. It reviews the prompt with haiku, checks that named paths exist, holds the prompt with the issues found and puts the rewrite in the prompt box.',
        ref: 3,
      },
      {
        group: 'Docs, CI and tooling',
        text: 'Described each hook and what it may change in the README.',
        ref: 2,
      },
      {
        group: 'Docs, CI and tooling',
        text: 'Added the Claude Code PR Assistant and Code Review GitHub workflows.',
        ref: 4,
      },
    ],
  },
  {
    version: '0.1.1',
    date: '2026-11-03',
    changes: [
      {
        group: 'Fixed',
        text: 'The model status text reads "running <alias>, not <session model>" instead of repeating the plugin name the app already shows.',
        ref: 1,
      },
      {
        group: 'Docs, CI and tooling',
        text: 'Corrected the README, added Limits and Data sections, added the version bump workflow and the icon SVGs, and pointed the manifest at the icon.',
        ref: 1,
      },
    ],
  },
  {
    version: '0.1.0',
    date: '2026-11-03',
    changes: [
      {
        group: 'Added',
        text: 'First release. The plugin rates the first prompt of a session with one classifier call, offers a model switch when the suggestion differs from your current model, and in the desktop app offers to hand a complex task to a new session.',
        ref: 'ef02e09',
      },
    ],
  },
]

/** GitHub release page for a tagged version. */
export const releaseUrl = (version: string): string =>
  `${PLUGIN_REPO_URL}/releases/tag/prompt-triage--v${version}`

/** Pull request link for a PR number, commit link for a hash. */
export const refUrl = (ref: number | string): string =>
  typeof ref === 'number' ? `${PLUGIN_REPO_URL}/pull/${ref}` : `${PLUGIN_REPO_URL}/commit/${ref}`

/** Label shown for a ref: `#64` for a PR, the hash for a commit. */
export const refLabel = (ref: number | string): string =>
  typeof ref === 'number' ? `#${ref}` : ref
