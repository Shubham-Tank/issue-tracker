import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'
import Markdown from 'react-markdown'

interface Props {
  params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  })

  if (!issue)
    notFound()

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="4" mt="2" mb="4">
        <IssueStatusBadge status={issue.status} />
        <Text className='text-sm text-gray-400'>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose py-1 px-2 prose-neutral dark:prose-invert">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </div>
  )
}

export default IssueDetailPage