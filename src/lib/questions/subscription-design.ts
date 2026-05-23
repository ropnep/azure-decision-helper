import { Module } from '@/types'

export const subscriptionDesignModule: Module = {
  id: 'subscription-design',
  title: 'Subscription & Management Group Design',
  tagline: 'Get a recommended Azure subscription hierarchy for your organisation',
  description:
    'Answer 8 questions about your organisation structure, compliance needs, and billing requirements to receive a tailored Azure subscription and management group architecture.',
  emoji: '🏗️',
  questions: [
    {
      id: 'org_size',
      text: 'How large is your organisation?',
      description: 'Headcount drives how many teams will need Azure access and how complex governance needs to be.',
      options: [
        { value: 'startup', label: '1–50 people', description: 'Startup or small team' },
        { value: 'smb', label: '51–200 people', description: 'Growing SMB' },
        { value: 'mid', label: '201–1,000 people', description: 'Mid-market enterprise' },
        { value: 'enterprise', label: '1,000+ people', description: 'Large enterprise' },
      ],
    },
    {
      id: 'business_units',
      text: 'How many distinct business units or product teams need separate Azure environments?',
      options: [
        { value: 'one', label: '1 — single team or product', description: 'Centralised; everyone shares one environment' },
        { value: 'few', label: '2–4 business units', description: 'A few teams with distinct needs' },
        { value: 'many', label: '5–10 business units', description: 'Multiple BUs needing isolation' },
        { value: 'many_plus', label: '10+ business units', description: 'Large federated organisation' },
      ],
    },
    {
      id: 'environments',
      text: 'What environments do you need per workload?',
      options: [
        { value: 'prod_only', label: 'Production only', description: 'No formal dev/test environments' },
        { value: 'dev_prod', label: 'Dev + Production', description: 'Two-stage pipeline' },
        { value: 'dev_staging_prod', label: 'Dev + Staging + Production', description: 'Standard three-stage pipeline' },
        { value: 'full', label: 'Dev + Test + Staging + Production', description: 'Full environment isolation per stage' },
      ],
    },
    {
      id: 'compliance',
      text: 'What compliance or regulatory frameworks apply to your workloads?',
      options: [
        { value: 'none', label: 'None currently', description: 'No formal compliance requirements' },
        { value: 'internal', label: 'Internal policies only', description: 'Custom internal standards, no external audit' },
        { value: 'standard', label: 'ISO 27001 / SOC 2', description: 'Common enterprise certifications' },
        { value: 'regulated', label: 'PCI-DSS / HIPAA / ISM', description: 'Strict regulated industry requirements' },
      ],
    },
    {
      id: 'billing',
      text: 'How do you need to allocate Azure costs?',
      options: [
        { value: 'single', label: 'Single consolidated bill', description: 'All costs in one account; no chargeback needed' },
        { value: 'by_env', label: 'Split by environment', description: 'Track prod vs. non-prod spend separately' },
        { value: 'by_bu', label: 'Chargeback by business unit', description: 'Each BU owns and pays for their spend' },
        { value: 'by_project', label: 'Chargeback by project', description: 'Fine-grained cost allocation per project' },
      ],
    },
    {
      id: 'governance_model',
      text: 'How is your cloud team structured?',
      options: [
        { value: 'centralised', label: 'Centralised IT / Cloud CoE', description: 'One team controls all Azure resources' },
        { value: 'federated', label: 'Federated — teams self-service', description: 'Each BU manages their own Azure resources' },
        { value: 'hybrid', label: 'Hybrid — platform team + self-service', description: 'Platform team provides guardrails; BUs operate within them' },
        { value: 'none', label: 'No defined model yet', description: 'Just getting started' },
      ],
    },
    {
      id: 'azure_maturity',
      text: 'What is your current Azure maturity?',
      options: [
        { value: 'greenfield', label: 'Greenfield — starting fresh', description: 'No existing Azure footprint' },
        { value: 'early', label: 'Early — a few subscriptions already', description: 'Some Azure usage, not yet structured' },
        { value: 'migrating', label: 'Migrating from on-premises', description: 'Moving existing workloads to Azure' },
        { value: 'mature', label: 'Mature — restructuring existing setup', description: 'Already in Azure, optimising governance' },
      ],
    },
    {
      id: 'network_topology',
      text: 'What network connectivity model do you need?',
      options: [
        { value: 'cloud_only', label: 'Cloud-only', description: 'No on-premises or ExpressRoute connectivity needed' },
        { value: 'vpn', label: 'VPN to on-premises', description: 'Site-to-site VPN for hybrid connectivity' },
        { value: 'expressroute', label: 'ExpressRoute', description: 'Dedicated private connectivity to on-premises' },
        { value: 'multi_region', label: 'Multi-region + hybrid', description: 'Complex topology spanning regions and on-premises' },
      ],
    },
  ],
}
