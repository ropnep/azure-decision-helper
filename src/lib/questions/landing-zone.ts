import { Module } from '@/types'

export const landingZoneModule: Module = {
  id: 'landing-zone',
  title: 'Landing Zone Pattern Advisor',
  tagline: 'Find the right Azure Landing Zone reference implementation for your organisation',
  description:
    'Answer 8 questions about your cloud maturity, team capability, and compliance needs to receive a recommended Azure Landing Zone pattern — from Start Small and Expand to full Enterprise-Scale ALZ.',
  emoji: '🌐',
  questions: [
    {
      id: 'cloud_maturity',
      text: 'What is your organisation\'s current Azure maturity?',
      description: 'This determines whether you need a lightweight starting point or a production-hardened enterprise foundation.',
      options: [
        { value: 'greenfield', label: 'Greenfield — no Azure footprint yet', description: 'Starting from scratch; first Azure workloads' },
        { value: 'early', label: 'Early — a few ad-hoc subscriptions', description: 'Some Azure usage but no governance structure yet' },
        { value: 'migrating', label: 'Migrating from on-premises', description: 'Moving existing workloads; need hybrid connectivity' },
        { value: 'mature', label: 'Mature — restructuring existing landing zones', description: 'Already in Azure, need to rearchitect governance' },
      ],
    },
    {
      id: 'platform_team',
      text: 'Do you have a dedicated platform or cloud engineering team?',
      description: 'Enterprise-Scale ALZ requires a platform team to operate. Without one, a simpler pattern is more realistic.',
      options: [
        { value: 'none', label: 'No dedicated cloud team', description: 'Developers manage their own infrastructure' },
        { value: 'parttime', label: 'Part-time — shared responsibility', description: '1–2 people managing cloud alongside other duties' },
        { value: 'small', label: 'Small dedicated team (2–5 engineers)', description: 'A platform team exists but is not a full CoE' },
        { value: 'coe', label: 'Cloud Centre of Excellence (CoE)', description: 'Full platform engineering team with clear ownership' },
      ],
    },
    {
      id: 'compliance',
      text: 'What compliance or regulatory requirements must your landing zone satisfy?',
      options: [
        { value: 'none', label: 'None — internal policies only', description: 'No external audit or certification requirements' },
        { value: 'standard', label: 'ISO 27001 / SOC 2 / CIS Benchmark', description: 'Standard enterprise certifications' },
        { value: 'regulated', label: 'PCI-DSS / HIPAA / APRA CPS 234', description: 'Regulated industry — financial services or healthcare' },
        { value: 'government', label: 'Government — ASD ISM / IRAP / FedRAMP', description: 'Public sector with strict data sovereignty requirements' },
      ],
    },
    {
      id: 'subscription_scale',
      text: 'How many Azure subscriptions do you expect within 12 months?',
      description: 'Subscription count drives how much management group hierarchy complexity you need.',
      options: [
        { value: 'few', label: '1–5 subscriptions', description: 'Small footprint; single product or team' },
        { value: 'moderate', label: '5–20 subscriptions', description: 'Multiple teams or environments' },
        { value: 'large', label: '20–100 subscriptions', description: 'Multiple business units or products' },
        { value: 'enterprise', label: '100+ subscriptions', description: 'Large enterprise with many BUs and workloads' },
      ],
    },
    {
      id: 'iac_preference',
      text: 'What is your preferred Infrastructure as Code tool?',
      options: [
        { value: 'bicep', label: 'Bicep', description: 'Microsoft-native IaC; best ALZ Bicep support' },
        { value: 'terraform', label: 'Terraform / OpenTofu', description: 'Most widely used; strong ALZ Terraform module support' },
        { value: 'arm', label: 'ARM Templates', description: 'Legacy but supported; consider migrating to Bicep' },
        { value: 'none', label: 'No IaC yet', description: 'Not yet using IaC; portal or scripts only' },
      ],
    },
    {
      id: 'time_to_value',
      text: 'How quickly do you need your first production workload running?',
      description: 'Faster timelines favour lighter landing zone patterns. Full Enterprise-Scale takes 4–8 weeks to deploy properly.',
      options: [
        { value: 'immediate', label: 'Immediately — within 2 weeks', description: 'Workloads need to be deployed now' },
        { value: 'short', label: '1–3 months', description: 'Some time to set up governance before workloads land' },
        { value: 'medium', label: '3–6 months', description: 'Comfortable investing in a solid foundation' },
        { value: 'long', label: '6+ months', description: 'Long runway; governance-first approach' },
      ],
    },
    {
      id: 'data_sovereignty',
      text: 'Do you have data residency or sovereignty requirements?',
      options: [
        { value: 'none', label: 'No — any Azure region is fine', description: 'No restriction on where data is stored or processed' },
        { value: 'preferred', label: 'Preferred — Australia-based regions preferred', description: 'Preference for local regions but not a hard requirement' },
        { value: 'required', label: 'Required — data must stay in specific region(s)', description: 'Hard compliance requirement for data residency' },
        { value: 'sovereign', label: 'Strict sovereign — Azure Sovereign Cloud required', description: 'Government or defence; requires Azure Government or Sovereign Landing Zone' },
      ],
    },
    {
      id: 'network_complexity',
      text: 'What is your expected network topology complexity?',
      options: [
        { value: 'simple', label: 'Simple — cloud-only, no on-premises', description: 'No hybrid connectivity; internet-facing workloads only' },
        { value: 'hybrid_vpn', label: 'Hybrid — VPN to on-premises', description: 'Site-to-site VPN for some on-premises connectivity' },
        { value: 'hybrid_er', label: 'Hybrid — ExpressRoute', description: 'Dedicated private connectivity; latency-sensitive workloads' },
        { value: 'complex', label: 'Complex — multi-region, multi-hub, or SDWAN', description: 'Global footprint or complex network segmentation needs' },
      ],
    },
  ],
}
