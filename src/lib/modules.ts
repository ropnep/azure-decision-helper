import { Module, ModuleId } from '@/types'
import { subscriptionDesignModule } from './questions/subscription-design'
import { computeSelectionModule } from './questions/compute-selection'
import { landingZoneModule } from './questions/landing-zone'
import { policyGovernanceModule } from './questions/policy-governance'

export const modules: Record<ModuleId, Module> = {
  'subscription-design': subscriptionDesignModule,
  'compute-selection': computeSelectionModule,
  'landing-zone': landingZoneModule,
  'policy-governance': policyGovernanceModule,
}

export function getModule(id: string): Module | null {
  return modules[id as ModuleId] ?? null
}
