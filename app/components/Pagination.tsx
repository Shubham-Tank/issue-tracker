import { Button, Flex, Text } from '@radix-ui/themes'
import React from 'react'
import { RxChevronLeft, RxChevronRight, RxDoubleArrowLeft, RxDoubleArrowRight } from 'react-icons/rx'

interface Props {
  itemCount: number,
  pageSize: number,
  currentPage: number
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize)

  if (pageCount <= 1) return null

  return (
    <Flex align="center" gap="2">
      <Text size="2">Page {currentPage} of {pageCount}</Text>
      <Button color='gray' variant='soft' disabled={currentPage === 1}>
        <RxDoubleArrowLeft />
      </Button>
      <Button color='gray' variant='soft' disabled={currentPage === 1}>
        <RxChevronLeft />
      </Button>
      <Button color='gray' variant='soft' disabled={currentPage === pageCount}>
        <RxChevronRight />
      </Button>
      <Button color='gray' variant='soft' disabled={currentPage === pageCount}>
        <RxDoubleArrowRight />
      </Button>
    </Flex>
  )
}

export default Pagination