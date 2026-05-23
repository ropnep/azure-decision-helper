'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import RecommendationOutput from '@/components/RecommendationOutput'
import { Recommendation } from '@/types'

export default function ResultPage() {
  const router = useRouter()
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null)
  const [moduleTitle, setModuleTitle] = useState('')

  useEffect(() => {
    const raw = sessionStorage.getItem('recommendation')
    const title = sessionStorage.getItem('moduleTitle')
    if (!raw || !title) {
      router.replace('/')
      return
    }
    try {
      setRecommendation(JSON.parse(raw))
      setModuleTitle(title)
    } catch {
      router.replace('/')
    }
  }, [router])

  if (!recommendation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-slate-600 border-t-blue-400 rounded-full animate-spin" />
      </div>
    )
  }

  return <RecommendationOutput recommendation={recommendation} moduleTitle={moduleTitle} />
}
