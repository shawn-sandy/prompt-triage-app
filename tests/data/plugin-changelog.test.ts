// @vitest-environment node
import { describe, expect, it } from 'vitest'
import {
  CHANGE_GROUPS,
  UNRELEASED,
  pluginChangelog,
  refLabel,
  refUrl,
  releaseUrl,
} from '#/data/plugin-changelog'

/** `0.10.2` as [0, 10, 2], so versions compare as numbers and not as text. */
const parts = (version: string): number[] => version.split('.').map(Number)

const numbered = pluginChangelog.filter(release => release.version !== UNRELEASED)

describe('pluginChangelog', () => {
  it('lists Unreleased first, then numbered versions newest first with no repeats', () => {
    expect(pluginChangelog[0].version).toBe(UNRELEASED)
    for (let i = 1; i < numbered.length; i++) {
      const [newer, older] = [parts(numbered[i - 1].version), parts(numbered[i].version)]
      const order = newer[0] - older[0] || newer[1] - older[1] || newer[2] - older[2]
      expect(
        order,
        `${numbered[i - 1].version} must be newer than ${numbered[i].version}`
      ).toBeGreaterThan(0)
    }
  })

  it('gives every release at least one change, in a known group, with text', () => {
    for (const release of pluginChangelog) {
      expect(release.changes.length, release.version).toBeGreaterThan(0)
      for (const change of release.changes) {
        expect(CHANGE_GROUPS, release.version).toContain(change.group)
        expect(change.text.trim().length, release.version).toBeGreaterThan(0)
      }
    }
  })

  it('pairs every backtick, so a code span can never swallow the rest of a sentence', () => {
    for (const release of pluginChangelog) {
      for (const change of release.changes) {
        expect((change.text.match(/`/g) ?? []).length % 2, change.text).toBe(0)
      }
    }
  })

  it('dates numbered releases in ISO form and never dates a newer one earlier', () => {
    for (const release of numbered)
      expect(release.date, release.version).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    for (let i = 1; i < numbered.length; i++) {
      expect(numbered[i - 1].date! >= numbered[i].date!, numbered[i].version).toBe(true)
    }
  })
})

describe('link helpers', () => {
  it('links a PR number to the pull request and a hash to the commit', () => {
    expect(refUrl(64)).toBe('https://github.com/shawn-sandy/prompt-triage/pull/64')
    expect(refUrl('ef02e09')).toBe('https://github.com/shawn-sandy/prompt-triage/commit/ef02e09')
    expect(refLabel(64)).toBe('#64')
    expect(refLabel('ef02e09')).toBe('ef02e09')
  })

  it('links a version to the release tag the plugin repository uses', () => {
    expect(releaseUrl('0.7.5')).toBe(
      'https://github.com/shawn-sandy/prompt-triage/releases/tag/prompt-triage--v0.7.5'
    )
  })
})
