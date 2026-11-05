export const BREADCRUMB_ROUTE = [
  {
    name: 'Blog',
    url: '/posts/1',
    path: 'posts',
  },
  {
    name: 'Docs',
    url: '/docs/1',
    path: 'docs',
  },
  {
    name: 'About us',
    url: 'about',
    path: 'about',
  },
  {
    name: 'Articles',
    url: '/content/1',
    path: 'content',
  },
]

export const SITE_TITLE = 'Prompt Triage'
export const SITE_DESCRIPTION =
  'A Claude Code plugin that rates your first prompt, suggests the right model, raises low effort and helps you refine vague prompts.'
export const SITE_LOGO = '/logo.png'
export const PAGINATION_COUNT: number = 2
export const CONTACT_INFO = {
  name: 'Email',
  url: '/success',
  isNetlify: false,
}

/**
 * GitHub repository for the plugin. The hero, nav, footer, About and Contact
 * links all derive from this one value so they cannot point at different repos.
 */
export const PLUGIN_REPO_URL = 'https://github.com/shawn-sandy/prompt-triage'

/**
 * Command typed inside Claude Code to install the plugin, copied from the
 * README's Install section. Printed verbatim in the hero.
 */
export const PLUGIN_INSTALL_COMMAND =
  '/plugin install prompt-triage --marketplace shawn-sandy/prompt-triage'
