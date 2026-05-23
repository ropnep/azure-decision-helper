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
