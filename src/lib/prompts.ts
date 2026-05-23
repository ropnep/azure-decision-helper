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
