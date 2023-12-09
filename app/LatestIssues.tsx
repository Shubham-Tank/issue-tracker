import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes'
import React from 'react'
import prisma from '@/prisma/client'
import Link from 'next/link'
import { IssueStatusBadge } from './components'

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: {
      assignedToUser: true
    }
  })

  return (
    <Card>
      <Heading size='4' mb="4" ml="2" mt="2">Latest Issues</Heading>
      <Table.Root>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column">
                    <Link href={`/issues/${issue.id}`} className='mb-1'>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {
                    <Avatar
                      src={issue.assignedToUser?.image || ''}
                      fallback="UA"
                      size="2"
                      radius='full'
                      color='mint'
                    />
                  }
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  )
}

export default LatestIssues