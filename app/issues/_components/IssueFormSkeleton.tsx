import { SkeletonTheme } from '@/app/components'
import { Box } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'

const IssueFormSkeleton = () => {
  return (
    <SkeletonTheme>
      <Box className='max-w-xl'>
        <Skeleton height="2.2rem" className='mb-3' />
        <Skeleton height="20rem" />
      </Box>
    </SkeletonTheme>
  )
}

export default IssueFormSkeleton