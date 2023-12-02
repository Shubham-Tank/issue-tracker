import { Table } from '@radix-ui/themes'
import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import IssueActions from './IssueActions'

const LoadingIssuesPage = () => {
  return (
    <SkeletonTheme baseColor="#d8f4f609" highlightColor="#1e293b">
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

          {[1, 2, 3, 4, 5].map(issue => (
            <Table.Row key={issue}>
              <Table.RowHeaderCell>
                <Skeleton width="90%" />
                <div className='block md:hidden text-gray-400 text-xs mt-2'>
                  <Skeleton width='20%' />
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className='hidden md:table-cell'>
                <Skeleton width='20%' />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <Skeleton width='30%' />
              </Table.Cell>
            </Table.Row>
          ))}

        </Table.Body>
      </Table.Root>
    </SkeletonTheme>
  )
}

export default LoadingIssuesPage