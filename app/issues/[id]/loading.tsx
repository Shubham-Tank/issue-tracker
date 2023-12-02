import { SkeletonTheme } from '@/app/components'
import { Card, Flex, Heading } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'

const LoadingIssueDetailPage = () => {
  return (
    <SkeletonTheme>
      <Heading><Skeleton className='w-xl' /></Heading>
      <Flex gap="4" mt="2" mb="4">
        <Skeleton width="5rem" />

        <Skeleton width="8rem" />

      </Flex>
      <Card className="prose py-1 px-2 prose-neutral dark:prose-invert">
        <Skeleton count={5} />
      </Card>
    </SkeletonTheme>
  )
}

export default LoadingIssueDetailPage