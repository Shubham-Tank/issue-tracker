import dynamic from 'next/dynamic'
import IssueFormSkeleton from './loading'
import { Metadata } from 'next'

const IssueForm = dynamic(
  () => import('@/app/projects/[slug]/issues/_components/IssueForm'),
  {
    ssr: false,
    loading: () => <IssueFormSkeleton />
  }
)

const NewIssuePage = () => {
  return (
    <IssueForm />
  )
}

export const metadata: Metadata = {
  title: 'Create Issue',
  description: 'Create new issue'
}

export default NewIssuePage