---
title: Prompt-triage band Shorts and Short 1 storyboard
session-id: 'd2527c5b-c2ee-4fc3-8194-15cbed7cfad7'
date: 2026-11-24
type: session-export
artifact-url: https://claude.ai/artifact/2hnrxZ7dc6P6cXgtYRL9kT
---

# Prompt-triage band Shorts and Short 1 storyboard

## Summary

Read the Triage Band Explorer artifact (prompt-triage v0.9.2) and proposed three 90-second Shorts that promote the plugin's band, each with screenshot cues the plugin can capture. Short 1 ("Fix your prompt before Claude reads it") was then storyboarded as a 7-beat `short.json` (about 80 seconds) and the beats were approved. Not done: engine validation (`check`), screenshots, voiceover, render.

## The three Shorts

### Short 1: Fix your prompt before Claude reads it

The Refine button.

| Time   | Beat                                                                                | Screenshot to grab                        |
| ------ | ----------------------------------------------------------------------------------- | ----------------------------------------- |
| 0-8s   | Hook: vague prompts waste money                                                     | Draft chip "Long, vague" in the box       |
| 8-25s  | The band shows only when a draft is worth refining (40+ characters or a line break) | Show rule tab table                       |
| 25-45s | Press Refine; haiku reviews it                                                      | Button reading "Reviewing with haiku..."  |
| 45-70s | It finds issues and rewrites the draft                                              | "Refined: 2 issues" with Show issues open |
| 70-85s | You stay in control                                                                 | Restore original and Done buttons         |
| 85-90s | Call to action                                                                      | Homepage hero                             |

### Short 2: Steer the rewrite with three dropdowns

The Goal, Workflow and Scope pickers. Each picker adds one instruction line to the review.

| Time   | Beat                                           | Screenshot to grab                                      |
| ------ | ---------------------------------------------- | ------------------------------------------------------- |
| 0-10s  | Same prompt, three dials                       | All three pickers in the band                           |
| 10-30s | Goal: Add a check                              | Pickers tab, Goal card                                  |
| 30-55s | Workflow: Plan first, Interview me, Test first | Workflow card; the "Shift+Tab cycles to plan mode" hint |
| 55-70s | Scope: Minimal                                 | Scope card                                              |
| 70-85s | See exactly what the reviewer is told          | "What the reviewer is told" panel                       |
| 85-90s | Call to action                                 | Homepage hero                                           |

### Short 3: See what a session costs before it gets expensive

The status row and the Manage context button.

| Time   | Beat                                                          | Screenshot to grab                        |
| ------ | ------------------------------------------------------------- | ----------------------------------------- |
| 0-10s  | Hook: "$13 on one prompt?"                                    | Real screenshot 2 ($13.06, 346.7K tokens) |
| 10-30s | Status row: cost, prompts, active time, tokens, context       | Screenshot 1 loaded in the playground     |
| 30-55s | Tokens beat the percent: the band measures against a 200K cap | Status row tab, sliders at 161K and 16%   |
| 55-75s | Manage context opens Compact or Clear; Compact leads past 60  | The dialog                                |
| 75-85s | Bonus: Run in, New session (desktop app only)                 | Run in tab                                |
| 85-90s | Call to action                                                | Homepage hero                             |

## Short 1 storyboard (approved)

Seven beats, about 199 words of voiceover, vertical 1080x1920. Look taken from the repo's `DESIGN.md`: light, flat background, green accent, Inter.

1. Hook: "Vague prompts waste money."
2. List: the band shows at 40+ characters or a line break, never for a slash command.
3. Chat: type a draft, press Refine, haiku reviews it as data.
4. Card: "Refined: 2 issues" (the Explorer's canned example text).
5. Steps: finds gaps, asks only what you know, rewrites in your voice.
6. List: Restore original or Done.
7. CTA: install prompt-triage, with the sub line left as `[YOUR INSTALL LINK]`.

## Decisions

- **"Bandway" read as "the Triage band".** The request was ambiguous; the band (the bordered box above the prompt box) is the artifact's whole subject, so the Shorts promote its features.
- **Three Shorts split by feature, not by audience:** Refine, pickers, status row. Each maps to one tab of the Explorer, so each has a clean set of screenshots.
- **Storyboard Short 1 first.** It is the core feature and the easiest to show in three or four captures.
- **Palette from `DESIGN.md`, not a new look.** The repo already has a documented design system; a Short should look like the site. The "you" blue and the result panel were adjusted so every text pair should clear 4.5:1 contrast (my arithmetic, not a tool run).
- **Beats 3 to 6 stay text scenes for now.** The engine rejects an image beat whose file is missing, so they become image beats only after screenshots exist.
- **No install command invented.** The CTA sub line is a placeholder until the real link is supplied.

## Learnings

- **The artifact was not private to the plugin.** I first said the plugin could not open it. The page was already open in the desktop app's browser panel, so it can be screenshotted from there. Check the panel before claiming a page is unreachable.
- **The Explorer's Refine is simulated.** The issues it lists are canned text, not a live haiku result. The narration says "in this example" for that reason, and the real mod's output should be captured separately if accuracy matters.
- **The OnCue engine is not runnable yet.** `node dist/cli.js check` fails with `Cannot find module 'sharp'`; the engine's dependencies are not installed. `check`, stills, voiceover and render are all blocked until setup installs them. The engine sits in the plugin's folder, outside this repo, so installing needs approval.
- **Beat first words must not collide.** The engine locates each beat by the first word at a sentence start, matched as a prefix. "Your" and "You", or two beats starting "Prompt" or "Then", would confuse it, so the lines were reworded to start "Vague", "Prompt", "Type", "Now", "Next", "Control", "Install".
- **In a worktree, the transcript folder is named after the worktree path**, not the main repo.

## Files touched

- `video/short-1-refine/short.json`: new; the Short 1 storyboard spec.
- `video/short-1-refine/logo.png`: new; copy of `public/images/prompt-triage-logo.png` (380x380 PNG).
- `docs/plans/sessions/plan-triage-shorts-session.md`: new; this recap.

Nothing is committed.
