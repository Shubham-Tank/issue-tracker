import { SkeletonTheme } from '@/app/components'
import { Box } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

const LoadingNewIssuePage = () => {
  return (
    <SkeletonTheme>
      <Box className='max-w-xl'>
        <Skeleton height="1.5rem" className='mb-4' />
        <Skeleton height="20rem" />
      </Box>
    </SkeletonTheme>
  )
}

export default LoadingNewIssuePage