import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import Markdown from 'react-markdown'

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="4" mt="2" mb="4">
        <IssueStatusBadge status={issue.status} />
        <Text className='text-sm text-gray-400'>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="max-w-full prose py-1 px-2 prose-neutral dark:prose-invert">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </>
  )
}

export default IssueDetails