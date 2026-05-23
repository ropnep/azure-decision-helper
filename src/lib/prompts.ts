import { ModuleId, Question } from '@/types'

interface PromptInput {
  moduleId: ModuleId
  questions: Question[]
  answers: Record<string, string>
  additionalContext?: string | null
}

function formatAnswers(questions: Question[], answers: Record<string, string>): string {
  return questions
    .map((q) => {
      const selectedOption = q.options.find((o) => o.value === answers[q.id])
      return `- ${q.text}\n  Answer: ${selectedOption?.label ?? answers[q.id]}${selectedOption?.description ? ` (${selectedOption.description})` : ''}`
    })
    .join('\n')
}

const systemPrompt = `You are an expert Azure cloud architect with deep experience in enterprise Azure deployments, governance, and the Microsoft Cloud Adoption Framework (CAF). You give precise, opinionated recommendations backed by real-world experience — not just Microsoft documentation. You are direct, concise, and honest about trade-offs.

Always respond with valid JSON matching the exact schema provided. Do not include markdown code blocks in your response — return raw JSON only.`

export function buildPrompt({ moduleId, questions, answers, additionalContext }: PromptInput): { system: string; user: string } {
  const formattedAnswers = formatAnswers(questions, answers)
  const contextBlock = additionalContext
    ? `\nADDITIONAL CONTEXT FROM ENGINEER:\n${additionalContext}\n`
    : ''

  if (moduleId === 'subscription-design') {
    return {
      system: systemPrompt,
      user: `Based on the following organisational assessment, provide a concrete Azure subscription and management group hierarchy recommendation.

ASSESSMENT ANSWERS:
${formattedAnswers}
${contextBlock}
Respond with JSON in this exact schema:
{
  "headline": "One-line summary of the recommended pattern (e.g., 'Hub-and-Spoke with 3 Management Groups and per-BU subscriptions')",
  "recommendation": "2-4 paragraph detailed recommendation describing the exact management group hierarchy, subscription structure, and naming conventions to use. Be specific — name the management groups, describe what goes in each subscription.",
  "rationale": "2-3 sentences explaining WHY this pattern fits their specific answers, referencing the CAF pattern name if applicable (e.g., Enterprise-Scale, Start Small and Expand).",
  "tradeoffs": [
    "Trade-off or limitation 1",
    "Trade-off or limitation 2",
    "Trade-off or limitation 3"
  ],
  "nextSteps": [
    "Immediate action 1 (e.g., 'Deploy the Azure Landing Zone Accelerator using the Enterprise-Scale reference implementation')",
    "Immediate action 2",
    "Immediate action 3",
    "Immediate action 4"
  ],
  "costRange": "Estimated Azure management overhead cost range or 'No additional cost — management groups and subscriptions are free'",
  "risks": [
    "Risk 1 and how to mitigate it",
    "Risk 2 and how to mitigate it"
  ]
}`,
    }
  }

  if (moduleId === 'compute-selection') {
    return {
      system: systemPrompt,
      user: `Based on the following workload assessment, recommend the most appropriate Azure compute service from: Azure Kubernetes Service (AKS), Azure Container Apps (ACA), Azure App Service, or Azure Functions.

ASSESSMENT ANSWERS:
${formattedAnswers}
${contextBlock}
Respond with JSON in this exact schema:
{
  "headline": "One-line verdict (e.g., 'Azure Container Apps is the right fit for this workload')",
  "recommendation": "2-4 paragraph detailed recommendation. Name the specific service and tier (e.g., 'Azure Container Apps Consumption plan'). Explain configuration specifics relevant to their answers — don't be generic.",
  "rationale": "2-3 sentences explaining why this service wins over the alternatives given their specific context.",
  "tradeoffs": [
    "What they give up by choosing this over alternative 1",
    "What they give up by choosing this over alternative 2",
    "A known operational limitation of this choice"
  ],
  "nextSteps": [
    "First concrete action to get started (e.g., 'Create an ACA environment in your target region using az containerapp env create')",
    "Second action",
    "Third action",
    "Fourth action"
  ],
  "costRange": "Realistic monthly cost estimate for their stated scale (e.g., '$150–$400/month for medium traffic on Consumption plan')",
  "risks": [
    "Risk 1 specific to this service choice and their context, with mitigation",
    "Risk 2 with mitigation"
  ]
}`
    }
  }

  if (moduleId === 'landing-zone') {
    return {
      system: systemPrompt,
      user: `Based on the following organisational assessment, recommend the most appropriate Azure Landing Zone pattern and reference implementation.

ASSESSMENT ANSWERS:
${formattedAnswers}
${contextBlock}
Respond with JSON in this exact schema:
{
  "headline": "One-line pattern recommendation (e.g., 'Azure Landing Zone — Enterprise-Scale with Terraform ALZ module')",
  "recommendation": "2-4 paragraphs. Name the exact CAF pattern (Start Small and Expand / Enterprise-Scale ALZ / Sovereign Landing Zone / ALZ for Small Enterprises). Describe the specific reference implementation to use (ALZ-Bicep / ALZ Terraform module / Azure Landing Zone portal accelerator). Be concrete about the management group structure, what goes in platform vs landing zone subscriptions, and which IaC repository to fork.",
  "rationale": "2-3 sentences explaining why this specific pattern fits their maturity, team size, compliance needs, and timeline.",
  "tradeoffs": [
    "What they give up vs a simpler pattern",
    "What they give up vs a more complex pattern",
    "An operational reality of this choice given their team size"
  ],
  "nextSteps": [
    "First concrete action — specific GitHub repo URL or portal accelerator link to start from",
    "Second action — e.g., what to configure before deploying",
    "Third action — first workload to onboard after platform is ready",
    "Fourth action — first governance review milestone"
  ],
  "costRange": "Realistic platform subscription cost range (e.g., 'Platform subscriptions cost ~$300–$800/month for connectivity + identity; management groups and policy are free')",
  "risks": [
    "Risk 1 specific to this pattern and their team size, with mitigation",
    "Risk 2 with mitigation"
  ]
}`
    }
  }

  if (moduleId === 'azure-vm') {
    return {
      system: systemPrompt,
      user: `Based on the following assessment, recommend the most appropriate Azure VM series, disk type, availability configuration, and cost optimisation strategy.

ASSESSMENT ANSWERS:
${formattedAnswers}
${contextBlock}
Respond with JSON in this exact schema:
{
  "headline": "One-line recommendation (e.g., 'Dsv5-series VMs with Premium SSD, Availability Zones, and 3-year Reserved Instances')",
  "recommendation": "2-4 paragraphs. Name the exact VM series and example SKU (e.g., Standard_D4s_v5). Explain disk configuration (managed disk type, size, caching). Describe availability configuration (single VM / Availability Set / Availability Zones) and why. Include licensing recommendation (PAYG / Reserved Instance / Azure Hybrid Benefit). Be specific — give real SKU names and example pricing.",
  "rationale": "2-3 sentences explaining why this VM family and configuration fits their stated workload, availability SLA, and commitment model.",
  "tradeoffs": [
    "Cost vs performance trade-off of this VM series vs alternatives",
    "Availability configuration trade-off (e.g., AZ vs Availability Set)",
    "Reserved Instance commitment risk"
  ],
  "nextSteps": [
    "First action — e.g., 'Deploy via: az vm create --resource-group myRG --name myVM --image Win2022Datacenter --size Standard_D4s_v5 --zone 1'",
    "Second action — configure backup or ASR",
    "Third action — purchase Reserved Instance or apply AHUB",
    "Fourth action — configure monitoring and alerting"
  ],
  "costRange": "Realistic monthly cost estimate (e.g., 'Standard_D4s_v5 Windows: ~$280/month PAYG; ~$160/month with 3-year RI + AHUB')",
  "risks": [
    "Risk 1 specific to this VM choice with mitigation",
    "Risk 2 with mitigation"
  ]
}`
    }
  }

  if (moduleId === 'sql-database') {
    return {
      system: systemPrompt,
      user: `Based on the following assessment, recommend the most appropriate Azure SQL deployment model, service tier, high availability configuration, and cost model.

ASSESSMENT ANSWERS:
${formattedAnswers}
${contextBlock}
Respond with JSON in this exact schema:
{
  "headline": "One-line recommendation (e.g., 'Azure SQL Database Business Critical — Zone-redundant, 8 vCores, 3-year Reserved Capacity')",
  "recommendation": "2-4 paragraphs. Specify the deployment model (Single Database / Elastic Pool / SQL Managed Instance / SQL on VM). Name the service tier and vCore count. Describe HA configuration (zone-redundant / geo-replication / failover group). Include connectivity model (private endpoint). Be specific — give real tier names, vCore recommendations, and example costs.",
  "rationale": "2-3 sentences explaining why this deployment model and tier fits their compatibility needs, database count, IOPS requirements, and HA SLA.",
  "tradeoffs": [
    "Feature or compatibility trade-off vs SQL Managed Instance or SQL on VM",
    "Cost vs resilience trade-off of chosen HA model",
    "Reserved Capacity commitment risk"
  ],
  "nextSteps": [
    "First action — e.g., create the SQL server and database with correct tier and private endpoint",
    "Second action — configure backup retention and LTR if needed",
    "Third action — set up geo-replication or failover group if HA requires it",
    "Fourth action — run Database Migration Assessment if migrating existing database"
  ],
  "costRange": "Realistic monthly cost estimate (e.g., 'General Purpose 4 vCores: ~$370/month PAYG; ~$240/month with 3-year Reserved Capacity + AHUB')",
  "risks": [
    "Risk 1 specific to this SQL deployment model with mitigation",
    "Risk 2 with mitigation"
  ]
}`
    }
  }

  if (moduleId === 'networking') {
    return {
      system: systemPrompt,
      user: `Based on the following assessment, recommend the right combination of Azure networking services — Azure Firewall, Application Gateway, Azure Load Balancer, and/or Azure Front Door — for this architecture.

ASSESSMENT ANSWERS:
${formattedAnswers}
${contextBlock}
Respond with JSON in this exact schema:
{
  "headline": "One-line recommendation (e.g., 'Azure Firewall Premium + Application Gateway WAF v2 in hub-and-spoke topology')",
  "recommendation": "2-4 paragraphs. Be explicit about WHICH services to use and WHY. Describe the topology (where each service sits in the network). Name the specific SKU/tier for each service (e.g., Application Gateway v2 WAF_v2 SKU, Azure Firewall Premium). Explain traffic flow — how a request traverses from internet to backend. Include any services to explicitly NOT use and why.",
  "rationale": "2-3 sentences explaining why this combination of services matches their traffic type, WAF requirement, backend type, and topology.",
  "tradeoffs": [
    "Cost trade-off of this combination vs a simpler approach",
    "Operational complexity trade-off",
    "A capability this combination lacks vs an alternative"
  ],
  "nextSteps": [
    "First action — deploy the hub VNet and Firewall/Gateway subnet",
    "Second action — deploy Azure Firewall or Application Gateway with specific SKU",
    "Third action — configure rules, WAF policies, or routing tables",
    "Fourth action — validate traffic flow and enable diagnostic logging"
  ],
  "costRange": "Realistic monthly cost estimate (e.g., 'Azure Firewall Premium: ~$1,800/month + data processing; App Gateway WAF v2: ~$300/month base + capacity units')",
  "risks": [
    "Risk 1 — e.g., misconfigured Firewall rules blocking legitimate traffic, with mitigation",
    "Risk 2 with mitigation"
  ]
}`
    }
  }

  if (moduleId === 'storage-account') {
    return {
      system: systemPrompt,
      user: `Based on the following assessment, recommend the right Azure Storage account configuration — account kind, replication, access tier, performance tier, and lifecycle policy.

ASSESSMENT ANSWERS:
${formattedAnswers}
${contextBlock}
Respond with JSON in this exact schema:
{
  "headline": "One-line recommendation (e.g., 'General Purpose v2, ZRS, Hot tier with Cool lifecycle after 30 days, private endpoint')",
  "recommendation": "2-4 paragraphs. Specify the account kind (GPv2 / Block Blob / Azure Files). Name the replication type (LRS/ZRS/GRS/GZRS) and explain why. Describe the access tier strategy (Hot/Cool/Cold/Archive and any lifecycle rules). Include connectivity recommendation (public / private endpoint / service endpoint). Mention any special features to enable (hierarchical namespace for ADLS, immutability, soft delete).",
  "rationale": "2-3 sentences explaining why this configuration matches their data type, access frequency, durability requirements, and security posture.",
  "tradeoffs": [
    "Cost vs durability trade-off of chosen replication",
    "Access cost vs storage cost trade-off of chosen tier",
    "Operational complexity of lifecycle rules"
  ],
  "nextSteps": [
    "First action — create the storage account with correct kind, replication, and access tier",
    "Second action — configure private endpoint or firewall rules",
    "Third action — enable soft delete and configure lifecycle policy",
    "Fourth action — set up diagnostic logging and access monitoring"
  ],
  "costRange": "Realistic monthly cost estimate based on their stated data volume (e.g., '10 TB GPv2 ZRS Hot: ~$230/month storage + egress costs')",
  "risks": [
    "Risk 1 — e.g., accidental public access exposure with mitigation",
    "Risk 2 — e.g., replication lag for GRS during regional failure, with mitigation"
  ]
}`
    }
  }

  if (moduleId === 'integration-automation') {
    return {
      system: systemPrompt,
      user: `Based on the following assessment, recommend the most appropriate Azure integration or automation service — Logic Apps, Azure Functions, or Azure Automation Accounts — and the right tier and configuration.

ASSESSMENT ANSWERS:
${formattedAnswers}
${contextBlock}
Respond with JSON in this exact schema:
{
  "headline": "One-line verdict (e.g., 'Azure Logic Apps Standard — workflow-based integration with VNet connectivity')",
  "recommendation": "2-4 paragraphs. Name the specific service AND tier (e.g., Logic Apps Consumption / Logic Apps Standard / Functions Consumption / Functions Premium / Automation Account with Hybrid Worker). Explain the hosting plan and why. Describe how to structure the automation (e.g., parent/child Logic Apps, Durable Functions orchestration, PowerShell runbooks). Be specific about connectors, triggers, or bindings to use.",
  "rationale": "2-3 sentences explaining why this service wins over the alternatives given their use case, builder skills, execution duration, and scale needs.",
  "tradeoffs": [
    "What they give up vs Logic Apps (or Functions if Logic Apps is recommended)",
    "Cost model trade-off",
    "A scalability or operational limitation of this choice"
  ],
  "nextSteps": [
    "First concrete action to create the resource with the right configuration",
    "Second action — connect to first integration target",
    "Third action — implement error handling and retry policy",
    "Fourth action — set up monitoring and alerting (Application Insights or Azure Monitor)"
  ],
  "costRange": "Realistic monthly cost estimate (e.g., 'Logic Apps Consumption: ~$0.000025/action; typical business workflow with 10K executions/month = ~$5–$50/month')",
  "risks": [
    "Risk 1 specific to this service choice with mitigation",
    "Risk 2 — e.g., vendor lock-in or connector deprecation risk, with mitigation"
  ]
}`
    }
  }

  // policy-governance
  return {
    system: systemPrompt,
    user: `Based on the following assessment, recommend a concrete Azure Policy and governance strategy — covering which built-in initiatives to assign, where in the management group hierarchy, and how strictly to enforce them.

ASSESSMENT ANSWERS:
${formattedAnswers}
${contextBlock}
Respond with JSON in this exact schema:
{
  "headline": "One-line summary (e.g., 'CIS Benchmark + tagging policy in Audit mode with 90-day deny rollout')",
  "recommendation": "2-4 paragraphs. Name the specific Azure Policy initiatives to assign (use exact Microsoft names e.g. 'Azure Security Benchmark', 'CIS Microsoft Azure Foundations Benchmark v2.0.0', 'NIST SP 800-53 Rev 5'). Describe at which management group level each initiative should be assigned, enforcement mode, and any exclusions needed. Include tagging policy, region restriction, and identity policies specific to their answers.",
  "rationale": "2-3 sentences explaining why this policy set matches their compliance framework, enforcement preference, and team maturity.",
  "tradeoffs": [
    "Impact on developer velocity from policy enforcement",
    "Compliance coverage gap if any initiative is omitted",
    "Operational overhead of managing this policy set at their team maturity level"
  ],
  "nextSteps": [
    "First concrete action — e.g., 'Assign the Azure Security Benchmark initiative at your root management group in Audit mode using: az policy assignment create ...'",
    "Second action — remediation tasks to bring existing resources into compliance",
    "Third action — setting up compliance dashboard in Microsoft Defender for Cloud",
    "Fourth action — policy review cadence recommendation"
  ],
  "costRange": "Azure Policy itself is free. Costs come from: Microsoft Defender for Cloud (CSPM free tier; Defender plans $X/resource/month), Log Analytics ingestion for audit logs (~$2.30/GB), and engineering time for remediation.",
  "risks": [
    "Risk 1 — e.g., policy breaking existing deployments with a mitigation strategy",
    "Risk 2 — compliance drift over time with a mitigation strategy"
  ]
}`
  }
}
