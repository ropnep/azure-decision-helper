import { notFound } from 'next/navigation'
import { getModule } from '@/lib/modules'
import QuestionnaireFlow from '@/components/QuestionnaireFlow'

interface Props {
  params: Promise<{ module: string }>
}

export default async function AssessPage({ params }: Props) {
  const { module: moduleId } = await params
  const module = getModule(moduleId)
  if (!module) notFound()

  return <QuestionnaireFlow module={module} />
}

export async function generateMetadata({ params }: Props) {
  const { module: moduleId } = await params
  const module = getModule(moduleId)
  return {
    title: module ? `${module.title} | Azure Decision Helper` : 'Assessment',
  }
}
