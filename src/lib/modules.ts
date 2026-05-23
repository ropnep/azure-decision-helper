import { Module, ModuleId } from '@/types'
import { subscriptionDesignModule } from './questions/subscription-design'
import { computeSelectionModule } from './questions/compute-selection'

export const modules: Record<ModuleId, Module> = {
  'subscription-design': subscriptionDesignModule,
  'compute-selection': computeSelectionModule,
}

export function getModule(id: string): Module | null {
  return modules[id as ModuleId] ?? null
}
