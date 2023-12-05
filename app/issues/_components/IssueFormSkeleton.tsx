import { SkeletonTheme } from '@/app/components'
import { Box } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'

const IssueFormSkeleton = () => {
  return (
    <SkeletonTheme>
      <Box className='max-w-xl'>
        <Skeleton height="1.8rem" className='mb-4' />
        <Skeleton height="20rem" />
      </Box>
    </SkeletonTheme>
  )
}

export default IssueFormSkeleton