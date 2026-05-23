'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Module } from '@/types'
import { ChevronRight, ChevronLeft, MessageSquare } from 'lucide-react'
import clsx from 'clsx'

interface Props {
  module: Module
}

// Total steps = questions + 1 context step at the end
const CONTEXT_STEP = 'context'

export default function QuestionnaireFlow({ module }: Props) {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [additionalContext, setAdditionalContext] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const totalSteps = module.questions.length + 1 // +1 for context step
  const isContextStep = currentIndex === module.questions.length
  const question = !isContextStep ? module.questions[currentIndex] : null
  const progress = (currentIndex / totalSteps) * 100
  const selected = question ? answers[question.id] : CONTEXT_STEP // context step always "selected"

  function selectOption(value: string) {
    if (!question) return
    setAnswers((prev) => ({ ...prev, [question.id]: value }))
  }

  function goBack() {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1)
  }

  async function goNext() {
    if (!isContextStep && !selected) return
    if (!isContextStep) {
      setCurrentIndex((i) => i + 1)
      return
    }
    await submit()
  }

  async function submit() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleId: module.id,
          answers,
          additionalContext: additionalContext.trim() || null,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Request failed')

      sessionStorage.setItem('recommendation', JSON.stringify(data.recommendation))
      sessionStorage.setItem('moduleTitle', module.title)
      router.push(`/assess/${module.id}/result`)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col">
      {/* Progress bar */}
      <div className="h-1 bg-slate-800">
        <div
          className="h-full bg-blue-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">

          {isContextStep ? (
            /* ── Additional context step ── */
            <>
              <div className="flex items-center gap-2 text-blue-400 text-sm font-medium mb-6">
                <MessageSquare size={15} />
                Final step — optional
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">
                Anything else we should know?
              </h2>
              <p className="text-slate-400 mb-8">
                Add any additional context that will help tailor the recommendation — existing tools, IaC preference, technology constraints, team skills, compliance specifics, or anything the questions didn&apos;t cover.
              </p>

              <textarea
                value={additionalContext}
                onChange={(e) => setAdditionalContext(e.target.value)}
                placeholder={
                  module.id === 'subscription-design'
                    ? 'e.g. We use Terraform for all IaC, have an existing EA agreement, and need to integrate with an on-prem Active Directory via Azure AD Connect. Our security team requires all resources to be deployed in Australia East only.'
                    : 'e.g. We are migrating from a Java Spring Boot monolith to microservices. Our team is experienced with Helm charts and we already have an existing AKS cluster in dev. We need KEDA-based autoscaling for our queue processors.'
                }
                rows={7}
                className="w-full bg-slate-800/60 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-5 py-4 text-white placeholder:text-slate-600 text-sm leading-relaxed resize-none outline-none transition-all"
              />

              <p className="text-slate-600 text-xs mt-2">
                Leave blank to get a recommendation based on your answers only.
              </p>
            </>
          ) : (
            /* ── Standard question step ── */
            <>
              <p className="text-blue-400 text-sm font-medium mb-6">
                Question {currentIndex + 1} of {module.questions.length}
              </p>

              <h2 className="text-2xl font-bold text-white mb-2">{question!.text}</h2>
              {question!.description && (
                <p className="text-slate-400 mb-8">{question!.description}</p>
              )}
              {!question!.description && <div className="mb-8" />}

              <div className="space-y-3">
                {question!.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => selectOption(option.value)}
                    className={clsx(
                      'w-full text-left rounded-xl border px-5 py-4 transition-all duration-150',
                      answers[question!.id] === option.value
                        ? 'border-blue-500 bg-blue-500/10 ring-1 ring-blue-500'
                        : 'border-slate-700 bg-slate-800/50 hover:border-slate-500 hover:bg-slate-800'
                    )}
                  >
                    <span className="block font-semibold text-white">{option.label}</span>
                    {option.description && (
                      <span className="block text-sm text-slate-400 mt-0.5">{option.description}</span>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Error */}
          {error && (
            <p className="mt-4 text-red-400 text-sm">{error}</p>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={goBack}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={18} />
              Back
            </button>

            <button
              onClick={goNext}
              disabled={(!isContextStep && !answers[question?.id ?? '']) || loading}
              className={clsx(
                'flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all',
                (isContextStep || answers[question?.id ?? '']) && !loading
                  ? 'bg-blue-600 hover:bg-blue-500 text-white'
                  : 'bg-slate-700 text-slate-500 cursor-not-allowed'
              )}
            >
              {loading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : isContextStep ? (
                <>Get Recommendation <ChevronRight size={18} /></>
              ) : (
                <>Next <ChevronRight size={18} /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
