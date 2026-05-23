export type ModuleId = 'subscription-design' | 'compute-selection'

export interface Option {
  value: string
  label: string
  description?: string
}

export interface Question {
  id: string
  text: string
  description?: string
  options: Option[]
}

export interface Module {
  id: ModuleId
  title: string
  tagline: string
  description: string
  emoji: string
  questions: Question[]
}

export interface Assessment {
  moduleId: ModuleId
  answers: Record<string, string>
}

export interface Recommendation {
  headline: string
  recommendation: string
  rationale: string
  tradeoffs: string[]
  nextSteps: string[]
  costRange: string
  risks: string[]
}
