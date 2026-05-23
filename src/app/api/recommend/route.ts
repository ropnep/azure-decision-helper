import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { getModule } from '@/lib/modules'
import { buildPrompt } from '@/lib/prompts'
import { ModuleId } from '@/types'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { moduleId, answers, additionalContext } = body as {
      moduleId: ModuleId
      answers: Record<string, string>
      additionalContext?: string | null
    }

    if (!moduleId || !answers) {
      return NextResponse.json({ error: 'moduleId and answers are required' }, { status: 400 })
    }

    const module = getModule(moduleId)
    if (!module) {
      return NextResponse.json({ error: 'Unknown module' }, { status: 400 })
    }

    const { system, user } = buildPrompt({ moduleId, questions: module.questions, answers, additionalContext })

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      system,
      messages: [{ role: 'user', content: user }],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      return NextResponse.json({ error: 'Unexpected response from AI' }, { status: 500 })
    }

    const recommendation = JSON.parse(content.text)
    return NextResponse.json({ recommendation })
  } catch (error) {
    console.error('Recommendation error:', error)
    return NextResponse.json({ error: 'Failed to generate recommendation' }, { status: 500 })
  }
}
