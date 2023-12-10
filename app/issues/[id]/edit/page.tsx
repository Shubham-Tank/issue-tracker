import prisma from '@/prisma/client'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import IssueFormSkeleton from './loading'
import { Metadata } from 'next'

interface Props {
  params: { id: string }
}

const IssueForm = dynamic(
  () => import('@/app/issues/_components/IssueForm'),
  {
    ssr: false,
    loading: () => <IssueFormSkeleton />
  }
)

const EditIssuePage = async ({ params }: Props) => {

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  })

  if (!issue) notFound()

  return (
    <IssueForm issue={issue} />
  )
}

export const metadata: Metadata = {
  title: 'Edit Issue',
  description: 'Edit issue'
}

export default EditIssuePage