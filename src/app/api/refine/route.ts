import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { ModuleId, Recommendation } from '@/types'
import { getModule } from '@/lib/modules'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { moduleId, originalRecommendation, feedback } = body as {
      moduleId: ModuleId
      originalRecommendation: Recommendation
      feedback: string
    }

    if (!moduleId || !originalRecommendation || !feedback?.trim()) {
      return NextResponse.json({ error: 'moduleId, originalRecommendation, and feedback are required' }, { status: 400 })
    }

    const module = getModule(moduleId)
    if (!module) {
      return NextResponse.json({ error: 'Unknown module' }, { status: 400 })
    }

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      system: `You are an expert Azure cloud architect. You previously gave an Azure architecture recommendation and the engineer has reviewed it and provided feedback about why it doesn't fully fit their situation. Your job is to refine the recommendation based on their specific feedback while keeping what was correct. Be concrete and opinionated. Always respond with valid JSON only — no markdown code blocks.`,
      messages: [
        {
          role: 'user',
          content: `You gave the following Azure recommendation for the "${module.title}" assessment:

ORIGINAL RECOMMENDATION:
Headline: ${originalRecommendation.headline}

${originalRecommendation.recommendation}

Rationale: ${originalRecommendation.rationale}

THE ENGINEER'S FEEDBACK (what doesn't fit their situation):
"${feedback.trim()}"

Please refine the recommendation to address their specific feedback. Keep what was correct but adjust based on their constraints, existing setup, or requirements they've clarified.

Respond with JSON in this exact schema:
{
  "headline": "Updated one-line recommendation reflecting the refinement",
  "recommendation": "Refined 2-4 paragraph recommendation that directly addresses the engineer's feedback. Acknowledge what they told you and explain how it changes the recommendation.",
  "rationale": "Updated rationale that incorporates their specific context.",
  "tradeoffs": [
    "Updated trade-off 1",
    "Updated trade-off 2",
    "Updated trade-off 3"
  ],
  "nextSteps": [
    "Updated action 1",
    "Updated action 2",
    "Updated action 3",
    "Updated action 4"
  ],
  "costRange": "Updated cost estimate if the refinement changes cost implications",
  "risks": [
    "Updated risk 1 with mitigation",
    "Updated risk 2 with mitigation"
  ]
}`,
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      return NextResponse.json({ error: 'Unexpected response from AI' }, { status: 500 })
    }

    const refined = JSON.parse(content.text)
    return NextResponse.json({ recommendation: refined })
  } catch (error) {
    console.error('Refine error:', error)
    return NextResponse.json({ error: 'Failed to refine recommendation' }, { status: 500 })
  }
}
