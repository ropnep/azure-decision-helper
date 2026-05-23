import { Module } from '@/types'

export const computeSelectionModule: Module = {
  id: 'compute-selection',
  title: 'Azure Compute Service Selection',
  tagline: 'AKS vs ACA vs App Service vs Functions — get the right answer for your workload',
  description:
    'Answer 8 questions about your workload type, team skills, and operational requirements to receive a recommendation across Azure Kubernetes Service, Azure Container Apps, App Service, and Azure Functions.',
  emoji: '⚙️',
  questions: [
    {
      id: 'workload_type',
      text: 'What best describes your workload?',
      options: [
        { value: 'web_api', label: 'Web application or REST API', description: 'User-facing apps, backend APIs, microservices' },
        { value: 'background', label: 'Background processing / jobs', description: 'Batch jobs, queues, event-driven processing' },
        { value: 'event_driven', label: 'Event-driven / reactive', description: 'Triggered by events, messages, or schedules' },
        { value: 'mixed', label: 'Mixed — multiple workload types', description: 'A platform hosting different workload patterns' },
      ],
    },
    {
      id: 'container_experience',
      text: 'What is your team\'s experience with containers and Kubernetes?',
      options: [
        { value: 'none', label: 'None — no container experience', description: 'Team works with VMs or PaaS; containers are new' },
        { value: 'docker_only', label: 'Docker only — no Kubernetes', description: 'Comfortable with containers, not orchestration' },
        { value: 'some_k8s', label: 'Some Kubernetes experience', description: 'Used K8s but not operating it in production' },
        { value: 'expert_k8s', label: 'Kubernetes experts', description: 'Running K8s in production, familiar with operators and networking' },
      ],
    },
    {
      id: 'scale',
      text: 'What is the expected traffic or processing scale?',
      options: [
        { value: 'low', label: 'Low — < 1,000 requests/day or sporadic jobs', description: 'Internal tools, low-traffic apps, dev/test' },
        { value: 'medium', label: 'Medium — 1,000–100,000 requests/day', description: 'Growing SaaS, moderate API traffic' },
        { value: 'high', label: 'High — 100,000–1M requests/day', description: 'Production SaaS, high-traffic APIs' },
        { value: 'very_high', label: 'Very high — 1M+ requests/day or large-scale batch', description: 'Enterprise scale, heavy throughput' },
      ],
    },
    {
      id: 'ops_complexity',
      text: 'How much infrastructure operational overhead can your team absorb?',
      options: [
        { value: 'minimal', label: 'Minimal — we want fully managed PaaS', description: 'No time to manage infrastructure; let Azure handle it' },
        { value: 'some', label: 'Some — managed but with configuration control', description: 'Happy to configure but not patch/maintain nodes' },
        { value: 'moderate', label: 'Moderate — we have a platform team', description: 'Dedicated platform engineering capability' },
        { value: 'full', label: 'Full — we want maximum control', description: 'Willing to manage node pools, networking, and upgrades' },
      ],
    },
    {
      id: 'deployment_frequency',
      text: 'How frequently do you deploy changes?',
      options: [
        { value: 'rarely', label: 'Rarely — monthly or less', description: 'Stable workloads with infrequent changes' },
        { value: 'weekly', label: 'Weekly releases', description: 'Regular but not continuous deployment' },
        { value: 'daily', label: 'Daily deployments', description: 'Active development with frequent releases' },
        { value: 'continuous', label: 'Multiple times per day (CI/CD)', description: 'Continuous deployment pipeline in place' },
      ],
    },
    {
      id: 'isolation',
      text: 'Do you require workload isolation for compliance or multi-tenancy?',
      options: [
        { value: 'none', label: 'No — shared infrastructure is fine', description: 'Single-tenant or internal workloads' },
        { value: 'logical', label: 'Logical isolation — namespaces or slots', description: 'Separation at the application layer is sufficient' },
        { value: 'dedicated', label: 'Dedicated compute per tenant or workload', description: 'Compliance requires resource-level isolation' },
        { value: 'strict', label: 'Strict — network + compute isolation required', description: 'PCI-DSS, HIPAA, or similar hard isolation requirements' },
      ],
    },
    {
      id: 'cost_priority',
      text: 'What is your primary cost optimisation priority?',
      options: [
        { value: 'lowest_cost', label: 'Lowest possible cost', description: 'Budget is the primary constraint; scale to zero if possible' },
        { value: 'balanced', label: 'Balanced cost and performance', description: 'Reasonable cost with predictable performance' },
        { value: 'performance', label: 'Performance over cost', description: 'Willing to pay more for reliability and speed' },
        { value: 'predictable', label: 'Predictable spend over optimised spend', description: 'Reserved capacity preferred; no surprise bills' },
      ],
    },
    {
      id: 'existing_stack',
      text: 'What does your existing application stack look like?',
      options: [
        { value: 'greenfield', label: 'Greenfield — no existing code', description: 'Starting fresh; no migration constraints' },
        { value: 'monolith', label: 'Monolithic application', description: 'Single deployable unit, may be containerising' },
        { value: 'microservices', label: 'Microservices or distributed services', description: 'Multiple independent services to orchestrate' },
        { value: 'functions_heavy', label: 'Function-heavy / serverless already', description: 'Already using serverless patterns or Azure Functions' },
      ],
    },
  ],
}
