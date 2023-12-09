import { Issue, Status } from '@prisma/client'
import React from 'react'
import NextLink from 'next/link'
import { RxArrowDown, RxArrowUp } from 'react-icons/rx'
import { IssueListSearchParams } from './page'
import { Flex } from '@radix-ui/themes'

interface Props {
  column: {
    label: string,
    value: keyof Issue,
    className?: string
  },
  searchParams: IssueListSearchParams
}

const IssueColumnHeaderLink = ({ column, searchParams }: Props) => {

  const query = { ...searchParams, orderBy: column.value }

  if (query.dsc)
    delete query.dsc
  else if (searchParams?.orderBy === column.value)
    query.dsc = true

  return (
    <Flex align="center">
      <NextLink href={{ query }}>
        {column.label}
      </NextLink>
      {
        (searchParams?.orderBy === column.value) && (
          (searchParams.dsc) ? <RxArrowDown className="inline ml-1" /> : <RxArrowUp className="inline ml-1" />
        )
      }
    </Flex>
  )
}

export default IssueColumnHeaderLink