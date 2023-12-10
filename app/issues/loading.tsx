import { Flex, Table } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { SkeletonTheme } from '../components'
import IssueActions from './IssueActions'

const LoadingIssuesPage = () => {
  return (
    <SkeletonTheme>
      <Flex direction="column" gap="4">
        <IssueActions />
        <Table.Root variant="surface">
          <Table.Header className='hidden md:table-row-group'>
            <Table.Row>
              <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>

            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(issue => (
              <Table.Row key={issue}>
                <Table.RowHeaderCell width="55%">
                  <Skeleton width="70%" />
                  <div className='block md:hidden text-gray-400 text-xs mt-2'>
                    <Skeleton width='20%' />
                  </div>
                </Table.RowHeaderCell>
                <Table.Cell className='hidden md:table-cell'>
                  <Skeleton width='35%' />
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>
                  <Skeleton width='50%' />
                </Table.Cell>
              </Table.Row>
            ))}

          </Table.Body>
        </Table.Root>
      </Flex>
    </SkeletonTheme>
  )
}

export default LoadingIssuesPage