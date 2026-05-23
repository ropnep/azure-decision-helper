import { Module, ModuleId } from '@/types'
import { subscriptionDesignModule } from './questions/subscription-design'
import { computeSelectionModule } from './questions/compute-selection'
import { landingZoneModule } from './questions/landing-zone'
import { policyGovernanceModule } from './questions/policy-governance'
import { azureVmModule } from './questions/azure-vm'
import { sqlDatabaseModule } from './questions/sql-database'
import { networkingModule } from './questions/networking'
import { storageAccountModule } from './questions/storage-account'
import { integrationAutomationModule } from './questions/integration-automation'

export const modules: Record<ModuleId, Module> = {
  'subscription-design': subscriptionDesignModule,
  'compute-selection': computeSelectionModule,
  'landing-zone': landingZoneModule,
  'policy-governance': policyGovernanceModule,
  'azure-vm': azureVmModule,
  'sql-database': sqlDatabaseModule,
  'networking': networkingModule,
  'storage-account': storageAccountModule,
  'integration-automation': integrationAutomationModule,
}

export function getModule(id: string): Module | null {
  return modules[id as ModuleId] ?? null
}
