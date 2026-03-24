export type Language = 'es' | 'en'

export type Theme = 'light' | 'dark'

export type TranslationDict = Record<string, string>

export interface ProjectDecision {
  title: string
  description: string
}

export interface ProjectOutcome {
  value: string
  label: string
}

export interface ProjectItem {
  slug: string
  label: string
  title: string
  desc: string
  role: string
  year: string
  projectType: string
  outcome?: string
  stack: string[]
  wide: boolean
  problem?: string[]
  challenge?: string
  solution?: string
  decisions?: ProjectDecision[]
  outcomes?: ProjectOutcome[]
  learnings?: string[]
}
