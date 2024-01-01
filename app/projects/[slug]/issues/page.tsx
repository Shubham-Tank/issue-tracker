import prisma from '@/prisma/client'
import { Issue, Status } from '@prisma/client'
import Pagination from '../../../components/Pagination'
import IssueActions from './IssueActions'
import IssueTable, { IssueQuery, issueTableColNames } from './IssueTable'
import { Flex } from '@radix-ui/themes'
import { Metadata } from 'next'

interface Props {
  params: { slug: string }
  searchParams: IssueQuery
}

const IssuesPage = async ({ params: { slug: projectSlug }, searchParams }: Props) => {

  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined

  const orderBy = issueTableColNames
    .includes(searchParams.orderBy)
    ? {
      [searchParams.orderBy]: (searchParams.desc ? 'desc' : 'asc')
    } : undefined

  const page = parseInt(searchParams.page) || 1
  const pageSize = 10

  const issues = await prisma.issue.findMany({
    where: { status, },
    orderBy: orderBy || { createdAt: 'asc' },
    skip: (page - 1) * pageSize,
    take: pageSize
  })

  const issueCount = await prisma.issue.count({ where: { status } })

  return (
    <Flex direction="column" gap="4">
      <IssueActions />
      <IssueTable issues={issues} searchParams={searchParams} />
      <Pagination itemCount={issueCount} pageSize={pageSize} currentPage={page} />
    </Flex>
  )
}

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues'
}

export default IssuesPage