import { notFound } from 'next/navigation'
import { getModule } from '@/lib/modules'
import RecommendationOutput from '@/components/RecommendationOutput'
import { Recommendation } from '@/types'

interface Props {
  params: Promise<{ module: string }>
  searchParams: Promise<{ r?: string }>
}

export default async function ResultPage({ params, searchParams }: Props) {
  const { module: moduleId } = await params
  const { r } = await searchParams

  const module = getModule(moduleId)
  if (!module || !r) notFound()

  let recommendation: Recommendation
  try {
    recommendation = JSON.parse(decodeURIComponent(r))
  } catch {
    notFound()
  }

  return <RecommendationOutput recommendation={recommendation} moduleTitle={module.title} />
}
