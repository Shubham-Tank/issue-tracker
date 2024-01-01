import { SkeletonTheme } from '@/app/components'
import { Box, Card, Flex, Grid, Heading } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'

const LoadingIssueDetailPage = () => {
  return (
    <SkeletonTheme>
      <Grid columns={{ initial: '1', md: '2' }} gap="6" width="auto">
        <Box className='pl-4 pr-4'>
          <Heading><Skeleton className='w-xl' /></Heading>
          <Flex gap="4" mt="2" mb="4">
            <Skeleton width="5rem" />

            <Skeleton width="8rem" />

          </Flex>
          <Card className="max-w-full prose py-1 px-2 prose-neutral dark:prose-invert">
            <Skeleton count={5} />
          </Card>
        </Box>
        <Box>
        </Box>
      </Grid>
    </SkeletonTheme>
  )
}

export default LoadingIssueDetailPage