import { Issue } from '@prisma/client'
import { Flex } from '@radix-ui/themes'
import NextLink from 'next/link'
import { RxArrowDown, RxArrowUp } from 'react-icons/rx'
import { IssueQuery } from './IssueTable'

interface Props {
  column: {
    label: string,
    value: keyof Issue,
    className?: string
  },
  searchParams: IssueQuery
}

const IssueColumnHeaderLink = ({ column, searchParams }: Props) => {

  const query = { ...searchParams, orderBy: column.value }

  if (query.desc)
    delete query.desc
  else if (searchParams?.orderBy === column.value)
    query.desc = true

  return (
    <Flex align="center">
      <NextLink href={{ query }}>
        {column.label}
      </NextLink>
      {
        (searchParams?.orderBy === column.value) && (
          (searchParams.desc) ? <RxArrowDown className="inline ml-1" /> : <RxArrowUp className="inline ml-1" />
        )
      }
    </Flex>
  )
}

export default IssueColumnHeaderLink