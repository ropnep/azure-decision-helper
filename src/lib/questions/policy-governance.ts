import { Module } from '@/types'

export const policyGovernanceModule: Module = {
  id: 'policy-governance',
  title: 'Azure Policy & Governance Advisor',
  tagline: 'Know exactly which Azure Policies to enforce — and how strictly — for your compliance requirements',
  description:
    'Answer 8 questions about your compliance framework, risk appetite, and workload types to receive a tailored Azure Policy recommendation — covering which initiatives to assign, enforcement modes, and where to apply them in your management group hierarchy.',
  emoji: '🔐',
  questions: [
    {
      id: 'compliance_framework',
      text: 'Which compliance frameworks apply to your organisation?',
      description: 'This determines which built-in Azure Policy initiatives to assign.',
      options: [
        { value: 'none', label: 'None — internal standards only', description: 'Custom controls; no external certification required' },
        { value: 'cis_iso', label: 'CIS Benchmark / ISO 27001', description: 'Common baseline security controls' },
        { value: 'soc2_pci', label: 'SOC 2 / PCI-DSS', description: 'SaaS or payment processing compliance' },
        { value: 'government', label: 'ASD ISM / IRAP / APRA CPS 234', description: 'Australian government or financial sector regulatory requirements' },
      ],
    },
    {
      id: 'enforcement_mode',
      text: 'How strictly should policies be enforced?',
      description: 'Deny mode blocks non-compliant resources from being created. Audit mode logs violations without blocking.',
      options: [
        { value: 'audit_only', label: 'Audit only — log violations, don\'t block', description: 'Good for gaining visibility without disrupting teams' },
        { value: 'audit_then_deny', label: 'Audit now, deny within 90 days', description: 'Gradual rollout; time for teams to remediate before enforcement' },
        { value: 'deny_prod', label: 'Deny in production, audit in dev/test', description: 'Enforce hard controls in prod; allow flexibility in lower environments' },
        { value: 'deny_all', label: 'Deny everywhere from day one', description: 'Maximum control; requires mature platform and developer buy-in' },
      ],
    },
    {
      id: 'workload_types',
      text: 'What types of workloads will run in your Azure environment?',
      options: [
        { value: 'web_api', label: 'Web applications and APIs', description: 'Public-facing services; internet egress policies critical' },
        { value: 'data_analytics', label: 'Data platforms and analytics', description: 'Storage, data lakes, Synapse, Databricks; data classification policies needed' },
        { value: 'mixed', label: 'Mixed — multiple workload types', description: 'Broad policy set covering compute, storage, networking, and identity' },
        { value: 'sensitive', label: 'Sensitive data — PII, financial, health records', description: 'Strict data handling; encryption, private endpoints, and DLP policies essential' },
      ],
    },
    {
      id: 'public_access',
      text: 'What is your policy on public internet-facing resources?',
      options: [
        { value: 'allowed', label: 'Allowed — public endpoints are fine', description: 'Teams can create public-facing resources freely' },
        { value: 'controlled', label: 'Controlled — approved services only (e.g. Application Gateway, CDN)', description: 'Public access only through approved ingress patterns' },
        { value: 'restricted', label: 'Restricted — private endpoints required for PaaS', description: 'All PaaS services must use private endpoints; no direct public access' },
        { value: 'denied', label: 'Denied — fully private, no public IPs', description: 'Zero public exposure; all traffic via private connectivity' },
      ],
    },
    {
      id: 'identity_model',
      text: 'What is your Azure identity and access management model?',
      options: [
        { value: 'basic', label: 'Basic — Azure AD with manual role assignments', description: 'RBAC managed manually; no PIM or conditional access yet' },
        { value: 'rbac_groups', label: 'Group-based RBAC via Azure AD groups', description: 'Role assignments via AD groups; easier to manage at scale' },
        { value: 'pim', label: 'Privileged Identity Management (PIM)', description: 'Just-in-time privileged access; time-limited role activation' },
        { value: 'zero_trust', label: 'Zero Trust — PIM + Conditional Access + MFA enforced', description: 'Full Zero Trust identity posture; strictest policy enforcement' },
      ],
    },
    {
      id: 'cost_governance',
      text: 'How mature is your cloud cost governance?',
      options: [
        { value: 'none', label: 'None — no cost controls yet', description: 'No budgets, alerts, or tagging standards in place' },
        { value: 'budgets', label: 'Budget alerts only', description: 'Subscription-level budgets with email alerts' },
        { value: 'tagging', label: 'Tagging policy + budgets', description: 'Mandatory tags enforced for cost allocation; budgets per BU or project' },
        { value: 'finops', label: 'Full FinOps — tagging, budgets, reserved instances, rightsizing', description: 'Mature cost governance with chargeback and optimisation workflows' },
      ],
    },
    {
      id: 'allowed_regions',
      text: 'Do you need to restrict which Azure regions resources can be deployed to?',
      options: [
        { value: 'any', label: 'No restriction — any region is fine', description: 'Teams can deploy to any Azure region globally' },
        { value: 'apac', label: 'Asia-Pacific regions only', description: 'Australia East, Australia Southeast, Southeast Asia, Japan East' },
        { value: 'australia', label: 'Australia only — Australia East + Southeast', description: 'Data must stay within Australian borders' },
        { value: 'custom', label: 'Specific approved region list', description: 'Strict whitelist enforced by policy; deny all others' },
      ],
    },
    {
      id: 'team_maturity',
      text: 'How would you describe your platform / DevOps team\'s Azure policy experience?',
      description: 'This determines how complex a policy set is realistic to implement and maintain.',
      options: [
        { value: 'beginner', label: 'Beginner — new to Azure Policy', description: 'Never deployed policy initiatives; starting from scratch' },
        { value: 'intermediate', label: 'Intermediate — assigned some built-in policies', description: 'Familiar with Azure Policy basics; some built-in initiatives deployed' },
        { value: 'advanced', label: 'Advanced — writing custom policy definitions', description: 'Comfortable with policy JSON; building organisation-specific controls' },
        { value: 'expert', label: 'Expert — policy-as-code in CI/CD pipeline', description: 'Policy definitions in Git; automated testing and deployment of policy changes' },
      ],
    },
  ],
}
