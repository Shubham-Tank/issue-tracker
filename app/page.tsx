import prisma from '@/prisma/client'
import { Status } from '@prisma/client'
import { Flex, Grid } from '@radix-ui/themes'
import { Metadata } from 'next'
import IssueChart from './IssueChart'
import IssueSummary from './IssueSummary'
import LatestIssues from './LatestIssues'
import IssueBoard, { StatusIssueMap } from './components/IssueBoard'

const statusIssuesMap: StatusIssueMap = {
  OPEN: { label: 'Open', issues: [] },
  IN_PROGRESS: { label: 'In Progress', issues: [] },
  CLOSED: { label: 'Closed', issues: [] },
}

export default async function Home() {

  for (let status in statusIssuesMap) {
    let s = status as Status

    const issues = await prisma.issue.findMany({
      where: { status: s },
      select: {
        id: true,
        title: true
      }
    })

    statusIssuesMap[s].issues = issues
  }

  const open = await prisma.issue.count({ where: { status: 'OPEN' } })
  const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } })
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } })

  const stats = { open, inProgress, closed }

  return (
    <>
      <IssueBoard statusIssuesMap={statusIssuesMap} />
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