import prisma from '@/prisma/client'
import { Table } from '@radix-ui/themes'
import { IssueStatusBadge, Link } from '@/app/components'
import IssueActions from './IssueActions'

const IssuesPage = async () => {

  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: 'asc' }
  })

  return (
    <div>
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

          {issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                <Link href={`issues/${issue.id}`}>
                  {issue.title}
                </Link>
                <div className='block md:hidden text-gray-400 text-xs mt-2'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}

        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default IssuesPage