/**
 * Features data for displaying on the home page
 * This file contains the main features of the prompt-triage plugin
 * that will be displayed using the Card component
 */

/**
 * Feature card data structure that matches the Card component props
 */
export type FeatureCard = {
  /** Title of the feature (maps to cardTitle) */
  title: string
  /** Description of the feature (goes into the card slot) */
  description: string
  /** Optional image URL for the feature (maps to cardImage) */
  image?: string
  /** Optional link for more information (maps to cardLink) */
  link?: string
  /** Category for grouping features */
  category: 'core' | 'development' | 'user-experience' | 'security'
  /** Priority for ordering (higher numbers appear first) */
  priority: number
}

/**
 * Main features of the prompt-triage plugin, each worded from its README.
 * Easy to update - just modify this array to add/remove/update features.
 *
 * Titles and descriptions avoid apostrophes and double quotes on purpose: the
 * promoted tier prints each description as escaped source, and the unit test
 * that checks that output compares against a text-only escape.
 */
export const projectFeatures: FeatureCard[] = [
  {
    title: 'Rates your first prompt',
    description:
      'One haiku call rates the first prompt of each session as simple, moderate, complex or long-running, then suggests haiku, sonnet, opus or fable. If that differs from your current model, a dialog lets you switch or keep it, says how many tiers up the suggestion is when it is two or more, and unless the prompt is simple restates what the prompt asks for so a misread shows early.',
    link: '/posts/post-1',
    category: 'core',
    priority: 100,
  },
  {
    title: 'Refine before you send',
    description:
      'Pick Refine prompt, run /refine-prompt, or press Refine in the band above the prompt input, where Goal, Workflow and Scope pickers shape the review. It flags a missing goal, vague scope and unfilled placeholders, asks up to three questions, then puts a rewrite in the prompt box.',
    link: '/posts/refine-prompt',
    category: 'core',
    priority: 95,
  },
  {
    title: 'Sets effort to match the task',
    description:
      'Moderate, complex and long-running prompts get an effort floor of medium, which only acts if you had lowered effort by hand. For a simple prompt you can keep your model and drop effort to low instead. Running /effort yourself ends either change.',
    link: '/posts/post-2',
    category: 'core',
    priority: 90,
  },
  {
    title: 'Sends work to a new session',
    description:
      'In the desktop app, a complex or long-running first prompt can be moved to a fresh session, and the Run in picker sends any prompt there. The plugin adds an instruction asking Claude to call start_session, so it depends on Claude following it.',
    link: '/posts/post-1#open-in-a-new-session',
    category: 'user-experience',
    priority: 85,
  },
  {
    title: 'Light on cost and data',
    description:
      'One haiku request on the first prompt of each session. Each refine adds one haiku request, or two if you answer its questions. Refining from the first-prompt dialog also rates the rewrite again when you send it. A status row shows what the session has cost, and /triage-stats tallies the newest 200 decisions. Your band picks and that log are saved, never prompt text, and the plugin writes no files and makes no network requests of its own.',
    link: '/content#cost-and-data',
    category: 'security',
    priority: 80,
  },
  {
    title: 'Runs where Claude Code runs',
    description:
      'Loads in the terminal, the IDE extensions and the Code tab of the desktop app. Chat and Cowork do not load hooks. Fifteen hooks, MIT licensed, tests run with claude plugin test .',
    link: '/content#install',
    category: 'development',
    priority: 75,
  },
]

/**
 * Get features filtered by category
 */
export function getFeaturesByCategory(category: FeatureCard['category']): FeatureCard[] {
  return projectFeatures
    .filter(feature => feature.category === category)
    .sort((a, b) => b.priority - a.priority)
}

/**
 * Get top N features by priority
 */
export function getTopFeatures(count: number = 6): FeatureCard[] {
  return projectFeatures.sort((a, b) => b.priority - a.priority).slice(0, count)
}

/**
 * Get all features sorted by priority
 */
export function getAllFeatures(): FeatureCard[] {
  return projectFeatures.sort((a, b) => b.priority - a.priority)
}

/**
 * Feature categories with display names
 */
export const featureCategories = {
  core: 'Core Features',
  development: 'Developer Tools',
  'user-experience': 'User Experience',
  security: 'Security & Auth',
} as const
