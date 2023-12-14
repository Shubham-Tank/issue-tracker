import prisma from '@/prisma/client'
import { Status } from '@prisma/client'
import { Flex, Grid } from '@radix-ui/themes'
import { Metadata } from 'next'
import IssueChart from './IssueChart'
import IssueSummary from './IssueSummary'
import LatestIssues from './LatestIssues'
import lazyload from 'next/dynamic'

const IssueBoard = lazyload(
  () => import('./components/IssueBoard'),
  {
    ssr: false
  }
)

export default async function Home() {

  const issues = await prisma.issue.findMany({
    select: {
      id: true,
      title: true,
      status: true
    }
  })

  const open = await prisma.issue.count({ where: { status: 'OPEN' } })
  const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } })
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } })

  const stats = { open, inProgress, closed }

  return (
    <>
      <IssueBoard issues={issues} />
      <Grid columns={{ initial: '1', md: '2' }} gap="5">
        <Flex direction="column" gap="5">
          <IssueSummary {...stats} />
          <IssueChart {...stats} />
        </Flex>
        <LatestIssues />
      </Grid>
    </>
  )
}

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues'
}