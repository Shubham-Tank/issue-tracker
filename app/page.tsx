import prisma from '@/prisma/client'
import { Container, Flex, Grid } from '@radix-ui/themes'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import IssueChart from './IssueChart'
import IssueSummary from './IssueSummary'
import LatestIssues from './LatestIssues'
import ProjectList from './ProjectList'
import authOptions from './auth/authOptions'

export default async function Home() {

  const session = await getServerSession(authOptions)

  const open = await prisma.issue.count({ where: { status: 'OPEN' } })
  const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } })
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } })

  const stats = { open, inProgress, closed }

  return (
    <Container className='py-7'>
      <ProjectList session={session} />
      <Grid columns={{ initial: '1', md: '2' }} gap="5">
        <Flex direction="column" gap="5">
          <IssueSummary {...stats} />
          <IssueChart {...stats} />
        </Flex>
        <LatestIssues />
      </Grid>
    </Container>
  )
}

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues'
}