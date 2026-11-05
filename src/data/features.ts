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
      'One call to a small, fast model rates the first prompt of each session as simple, moderate or complex, then suggests haiku, sonnet or opus. If that differs from your current model, a dialog lets you switch or keep it.',
    link: '/posts/post-1',
    category: 'core',
    priority: 100,
  },
  {
    title: 'Refine before you send',
    description:
      'Pick Refine prompt, or run /refine-prompt on any prompt. A haiku review flags a missing goal, vague scope and unfilled placeholders, asks up to three questions, then puts a rewrite in the prompt box for you to edit.',
    link: '/posts/refine-prompt',
    category: 'core',
    priority: 95,
  },
  {
    title: 'Raises effort, never lowers it',
    description:
      'Moderate prompts get an effort floor of medium and complex prompts get high. Effort already at or above the floor is left alone, and running /effort yourself ends the floor.',
    link: '/posts/post-2',
    category: 'core',
    priority: 90,
  },
  {
    title: 'Hands off to a new session',
    description:
      'In the desktop app, a complex prompt can be moved to a fresh session. The plugin adds an instruction asking Claude to call start_session, so it depends on Claude following that instruction.',
    link: '/posts/post-1#open-in-a-new-session',
    category: 'user-experience',
    priority: 85,
  },
  {
    title: 'Light on cost and data',
    description:
      'One small classification request on the first prompt of each session. Each refine adds one haiku request, or two if you answer its questions. Refining from the first-prompt dialog also rates the rewrite again. The plugin stores nothing, writes no files and makes no network requests of its own.',
    link: '/content#cost-and-data',
    category: 'security',
    priority: 80,
  },
  {
    title: 'Runs where Claude Code runs',
    description:
      'Loads in the terminal, the IDE extensions and the Code tab of the desktop app. Chat and Cowork do not load hooks. Six hooks, MIT licensed, tests run with claude plugin test .',
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
