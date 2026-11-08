// @vitest-environment node
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { readFileSync } from 'node:fs'
import { compile } from 'sass'
import Navigation from '#components/astro/Navigation.astro'

/** Read an attribute value out of a raw opening tag, e.g. `<div id="x">`. */
function attr(tag: string, name: string): string | undefined {
  return new RegExp(`\\s${name}="([^"]*)"`).exec(tag)?.[1]
}

/** First opening tag for `name` in the rendered markup. */
function openTag(html: string, name: string): string {
  const match = new RegExp(`<${name}\\b[^>]*>`).exec(html)
  if (!match) throw new Error(`no <${name}> in rendered output`)
  return match[0]
}

/**
 * Locate the popover panel and its inner HTML.
 *
 * The panel is found by being the first `<div>` carrying an `id` — deliberately
 * *not* by its `popover` attribute nor by the button's `popovertarget`, so the
 * assertions about those two attributes stay meaningful rather than circular.
 * The closing tag is found by walking `<div>` nesting depth, so slotted content
 * containing divs cannot truncate the slice early.
 */
function findPanel(html: string): { tag: string; inner: string } {
  const match = /<div\b[^>]*\sid="[^"]*"[^>]*>/.exec(html)
  if (!match) throw new Error('no panel <div> with an id in rendered output')

  const start = match.index + match[0].length
  const tags = /<(\/?)div\b/g
  tags.lastIndex = start

  let depth = 1
  let next: RegExpExecArray | null
  while ((next = tags.exec(html)) !== null) {
    depth += next[1] ? -1 : 1
    if (depth === 0) return { tag: match[0], inner: html.slice(start, next.index) }
  }
  throw new Error('panel <div> is never closed')
}

describe('Navigation.astro popover markup contract', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  const render = async (props?: Record<string, unknown>) => {
    const container = await AstroContainer.create()
    return container.renderToString(Navigation, props ? { props } : undefined)
  }

  it('wires the hamburger button popovertarget to the panel id', async () => {
    const html = await render()
    const target = attr(openTag(html, 'button'), 'popovertarget')

    expect(target).toBeTruthy()
    expect(attr(findPanel(html).tag, 'id')).toBe(target)
  })

  it('declares the panel as popover="auto"', async () => {
    // A bare `popover` or `popover="manual"` silently disables Esc and light
    // dismiss, so the literal value is part of the contract.
    const { tag } = findPanel(await render())

    expect(tag).toMatch(/\spopover="auto"[\s>]/)
  })

  it('renders every nav link inside the popover panel', async () => {
    const { inner } = findPanel(await render())

    for (const href of ['/', '/content/1', '/posts/1', '/about', '/contact']) {
      expect(inner).toContain(`href="${href}"`)
    }
  })

  it('renders the brand link pointing at the site root by default', async () => {
    const html = await render()
    const brand = /<a\b[^>]*\bdata-nav-brand\b[^>]*>/.exec(html)?.[0]

    expect(brand).toBeDefined()
    expect(attr(brand as string, 'href')).toBe('/')
  })

  it('inlines the brand logo so the packaged component carries it', async () => {
    // `package.json` ships only src/components, so a /images asset would be
    // missing for every consumer. The logo must be markup, not a URL.
    const html = await render()
    const brandHtml = /<a\b[^>]*\bdata-nav-brand\b[^>]*>([\s\S]*?)<\/a>/.exec(html)?.[1] ?? ''
    const logo = /<svg\b[^>]*>/.exec(brandHtml)?.[0]

    expect(brandHtml).not.toMatch(/<img\b/)
    expect(logo).toBeDefined()
    expect(attr(logo as string, 'aria-hidden')).toBe('true')
    expect(brandHtml).toMatch(/<span\b[^>]*\bdata-nav-brand-name\b/)
  })

  it('marks the logo tile and ink so dark mode can restore the original mark', async () => {
    // Light mode paints the bare mark; dark mode swaps in the tile and light
    // strokes from CSS. That only works if the markup carries the hooks, and
    // if the tile is hidden by default rather than painted on the light page.
    const html = await render()
    const brandHtml = /<a\b[^>]*\bdata-nav-brand\b[^>]*>([\s\S]*?)<\/a>/.exec(html)?.[1] ?? ''
    const tile = /<rect\b[^>]*\bdata-logo-tile\b[^>]*>/.exec(brandHtml)?.[0]

    expect(tile).toBeDefined()
    expect(attr(tile as string, 'display')).toBe('none')
    expect(brandHtml.match(/<path\b[^>]*\bdata-logo-ink\b/g)).toHaveLength(2)
  })

  describe.each([
    ['compiled from index.scss', () => compile('src/styles/index.scss').css],
    ['the committed index.css', () => readFileSync('src/styles/index.css', 'utf8')],
  ])('dark-mode logo rules, %s', (_label, load) => {
    /** Split CSS into dark-media-query bodies and everything outside them. */
    function split(css: string): { dark: string[]; outside: string } {
      const dark: string[] = []
      let outside = ''
      let i = 0
      const head = /@media\s*\(prefers-color-scheme:\s*dark\)\s*\{/g
      for (let m = head.exec(css); m; m = head.exec(css)) {
        outside += css.slice(i, m.index)
        let depth = 1
        let j = m.index + m[0].length
        while (j < css.length && depth > 0) {
          if (css[j] === '{') depth++
          else if (css[j] === '}') depth--
          j++
        }
        dark.push(css.slice(m.index + m[0].length, j - 1))
        i = j
        head.lastIndex = j
      }
      return { dark, outside: outside + css.slice(i) }
    }
    const rulesFor = (css: string, hook: string) =>
      [...css.matchAll(new RegExp(`([^{}]*\\[${hook}\\][^{}]*)\\{([^}]*)\\}`, 'g'))].map(m => ({
        selector: m[1],
        body: m[2],
      }))

    it('applies the OS-preference rules only inside the dark media query', () => {
      const { dark, outside } = split(load())
      const inDark = dark.flatMap(body => rulesFor(body, 'data-logo-tile'))
      const inkInDark = dark.flatMap(body => rulesFor(body, 'data-logo-ink'))

      // Inside the dark query: the path that yields to an explicit light theme.
      expect(inDark.some(rule => /:not\(\[data-theme=["']?light/.test(rule.selector))).toBe(true)
      expect(inkInDark.some(rule => /:not\(\[data-theme=["']?light/.test(rule.selector))).toBe(true)

      // Outside it: only the explicit dark toggle may touch the tile or ink.
      for (const hook of ['data-logo-tile', 'data-logo-ink']) {
        for (const rule of rulesFor(outside, hook)) {
          expect(rule.selector).toMatch(/data-theme=["']?dark/)
          expect(rule.selector).not.toMatch(/:not\(/)
        }
      }
    })

    it('shows the tile and sets light ink for the explicit dark toggle', () => {
      const { outside } = split(load())
      const tile = rulesFor(outside, 'data-logo-tile')
      const ink = rulesFor(outside, 'data-logo-ink')

      expect(tile).toHaveLength(1)
      expect(ink).toHaveLength(1)
      expect(tile[0].body).toMatch(/display:\s*inline/)
      expect(ink[0].body).toMatch(/stroke:\s*#ececec/i)
    })

    it('uses the same declarations on the OS-preference path', () => {
      const { dark } = split(load())
      const tile = dark.flatMap(body => rulesFor(body, 'data-logo-tile'))
      const ink = dark.flatMap(body => rulesFor(body, 'data-logo-ink'))

      expect(tile.length).toBeGreaterThan(0)
      for (const rule of tile) expect(rule.body).toMatch(/display:\s*inline/)
      for (const rule of ink) expect(rule.body).toMatch(/stroke:\s*#ececec/i)
    })
  })

  it('hides the hamburger icon from assistive tech and the tab order', async () => {
    const svg = openTag(await render(), 'svg')

    expect(attr(svg, 'aria-hidden')).toBe('true')
    expect(attr(svg, 'focusable')).toBe('false')
  })

  it('labels the nav landmark', async () => {
    expect(attr(openTag(await render(), 'nav'), 'aria-label')).toBe('Primary')
  })

  it('marks the nav root with data-site-nav', async () => {
    // Every selector in _navigation.scss and in the inline first-paint block
    // is scoped to this attribute. Dropping it would strip the component of
    // all its styling without failing any other assertion here.
    //
    // Astro emits the bare form (`data-site-nav`) today, but the lookahead
    // accepts `=` as well so the assertion tracks whether the marker is
    // present rather than how Astro chose to serialise it. The lookahead is
    // still required: without it, `data-site-navigation` would pass.
    const html = await render()

    expect(openTag(html, 'nav')).toMatch(/\sdata-site-nav(?=[\s>=])/)
    expect(html).toContain('nav[data-site-nav] > button[popovertarget]')
  })

  it('renders default-slot content inside the popover panel', async () => {
    // Base.astro passes the userId-gated Dashboard and Profile links through
    // the default slot, so they must land inside the panel rather than the bar.
    const container = await AstroContainer.create()
    const html = await container.renderToString(Navigation, {
      slots: { default: '<ul data-nav-account><li><a href="/dashboard">Dashboard</a></li></ul>' },
    })

    const { inner } = findPanel(html)
    expect(inner).toContain('data-nav-account')
    expect(inner).toContain('href="/dashboard"')
  })

  it('keeps popovertarget in sync when menuId is overridden', async () => {
    const html = await render({ menuId: 'custom-menu' })

    expect(attr(findPanel(html).tag, 'id')).toBe('custom-menu')
    expect(attr(openTag(html, 'button'), 'popovertarget')).toBe('custom-menu')
  })
})
