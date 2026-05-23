import { Module } from '@/types'

export const networkingModule: Module = {
  id: 'networking',
  title: 'Azure Networking Advisor',
  tagline: 'Azure Firewall vs NSG, Application Gateway vs Load Balancer vs Front Door — clarity on which to use',
  description:
    'Answer 8 questions about your traffic patterns, security requirements, and backend services to receive a concrete recommendation across Azure Firewall, Application Gateway, Azure Load Balancer, and Azure Front Door.',
  emoji: '🔀',
  questions: [
    {
      id: 'traffic_type',
      text: 'What type of traffic are you routing or protecting?',
      options: [
        { value: 'inbound_http', label: 'Inbound HTTP/HTTPS to web apps or APIs', description: 'Application-layer (L7) routing; Application Gateway or Front Door' },
        { value: 'inbound_nonhttp', label: 'Inbound non-HTTP (SQL, RDP, custom TCP/UDP)', description: 'Transport-layer (L4) routing; Azure Load Balancer or Firewall' },
        { value: 'east_west', label: 'East-West — traffic between subnets or VNets', description: 'Internal filtering; Azure Firewall or NSG depending on inspection depth' },
        { value: 'all', label: 'All of the above — full hub-and-spoke model', description: 'Azure Firewall as central hub + Application Gateway for inbound HTTP' },
      ],
    },
    {
      id: 'waf_needed',
      text: 'Do you need a Web Application Firewall (WAF)?',
      description: 'WAF protects against OWASP Top 10, SQL injection, XSS, and other web attacks.',
      options: [
        { value: 'no', label: 'No WAF required', description: 'Internal-only traffic or non-web workloads' },
        { value: 'yes_basic', label: 'Yes — OWASP ruleset protection', description: 'Application Gateway WAF v2 or Azure Front Door WAF' },
        { value: 'yes_custom', label: 'Yes — OWASP + custom rules + bot protection', description: 'Application Gateway WAF v2 with custom rules; or Front Door WAF' },
        { value: 'compliance', label: 'Yes — compliance mandated (PCI-DSS, ISM)', description: 'WAF is non-negotiable; consider Application Gateway WAF in Prevention mode' },
      ],
    },
    {
      id: 'firewall_requirement',
      text: 'What level of network traffic inspection do you need?',
      options: [
        { value: 'nsg_only', label: 'Basic — NSG rules only (port/IP filtering)', description: 'Free; stateful packet filtering at subnet or NIC level' },
        { value: 'firewall_standard', label: 'Azure Firewall Standard — FQDN filtering, NAT, network rules', description: '~$1.25/hr + data processing; centralised policy management' },
        { value: 'firewall_premium', label: 'Azure Firewall Premium — TLS inspection + IDPS', description: '~$2.50/hr; required for deep packet inspection and threat intelligence' },
        { value: 'nva', label: 'Third-party NVA (Palo Alto, Fortinet, CheckPoint)', description: 'Bring existing licences; advanced features but higher ops overhead' },
      ],
    },
    {
      id: 'global_distribution',
      text: 'Do you need global load balancing across Azure regions?',
      options: [
        { value: 'single_region', label: 'No — single region only', description: 'Regional load balancing with Application Gateway or Azure Load Balancer' },
        { value: 'traffic_manager', label: 'DNS-based global routing — Azure Traffic Manager', description: 'Directs users to closest or healthiest regional endpoint via DNS; no data plane' },
        { value: 'front_door', label: 'Global HTTP/S acceleration — Azure Front Door', description: 'Anycast, SSL offload, WAF, caching, global LB in one service; replaces Traffic Manager for HTTP' },
        { value: 'front_door_and_regional', label: 'Azure Front Door globally + regional LB internally', description: 'Front Door for global ingress; Application Gateway or Load Balancer per region for backend routing' },
      ],
    },
    {
      id: 'backend_type',
      text: 'What backend services are you load balancing to?',
      options: [
        { value: 'vms', label: 'Azure VMs or VM Scale Sets', description: 'Azure Load Balancer (L4) or Application Gateway (L7) both work' },
        { value: 'paas', label: 'App Service, ACA, or other PaaS', description: 'Application Gateway or Front Door; private link for PaaS backends' },
        { value: 'aks', label: 'AKS — Kubernetes services', description: 'Internal Load Balancer + AGIC (Application Gateway Ingress Controller) or Nginx ingress' },
        { value: 'mixed', label: 'Mixed backends — VMs + PaaS + containers', description: 'Application Gateway with backend pool diversity; or Front Door with origins' },
      ],
    },
    {
      id: 'ssl_termination',
      text: 'How do you want to handle SSL/TLS?',
      options: [
        { value: 'ssl_offload', label: 'SSL termination at the load balancer (SSL offload)', description: 'Decrypt at Application Gateway; backend receives HTTP; simplest' },
        { value: 'end_to_end', label: 'End-to-end SSL — re-encrypt to backend', description: 'Application Gateway decrypts, re-encrypts to backend; higher security' },
        { value: 'passthrough', label: 'SSL passthrough — no inspection', description: 'Azure Load Balancer (L4 only); backend handles all SSL' },
        { value: 'mtls', label: 'Mutual TLS (mTLS) — client certificate authentication', description: 'Application Gateway v2 supports mTLS; required for API-to-API zero trust' },
      ],
    },
    {
      id: 'ddos',
      text: 'What DDoS protection do you need?',
      options: [
        { value: 'basic', label: 'DDoS Basic (free) — always-on platform protection', description: 'Protects Azure infrastructure; limited application-level protection' },
        { value: 'standard', label: 'Azure DDoS Network Protection — $2,944/month per VNet', description: 'Adaptive tuning, attack analytics, SLA guarantee, cost protection' },
        { value: 'ip_protection', label: 'Azure DDoS IP Protection — per public IP', description: 'Cheaper than Network Protection; covers specific public IPs only' },
        { value: 'waf_ddos', label: 'WAF + DDoS Standard combined', description: 'Application-layer (L7) + volumetric (L3/L4) protection; recommended for regulated workloads' },
      ],
    },
    {
      id: 'hub_spoke',
      text: 'What is your network topology?',
      options: [
        { value: 'flat', label: 'Flat VNet — single VNet, no peering', description: 'Simple; suitable for single-team or early-stage deployments' },
        { value: 'hub_spoke', label: 'Hub-and-Spoke — centralised connectivity VNet', description: 'Hub hosts Firewall, VPN/ER gateway, Bastion; spokes peer to hub' },
        { value: 'vwan', label: 'Azure Virtual WAN — managed hub-and-spoke at scale', description: 'Microsoft-managed routing; ideal for large branch/multi-region deployments' },
        { value: 'multi_region', label: 'Multi-region hub-and-spoke or VWAN', description: 'Global mesh; ExpressRoute Global Reach or VWAN for inter-region connectivity' },
      ],
    },
  ],
}
