import prisma from '@/prisma/client'
import { Table } from '@radix-ui/themes'
import { IssueStatusBadge, Link } from '@/app/components'
import IssueActions from './IssueActions'
import { Issue, Status } from '@prisma/client'
import IssueColumnHeaderLink from './IssueColumnHeaderLink'

export interface IssueListSearchParams {
  status: Status;
  orderBy: keyof Issue;
  dsc?: boolean;
}

interface Props {
  searchParams: IssueListSearchParams
}

const IssuesPage = async ({ searchParams }: Props) => {

  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy: { createdAt: 'asc' }
  })

  const columns: {
    label: string,
    value: keyof Issue,
    className?: string
  }[] = [
      { label: 'Issue', value: 'title' },
      { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
      { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
    ]

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header className='hidden md:table-row-group'>
          <Table.Row>
            {
              columns.map(column => (
                <Table.ColumnHeaderCell key={column.value}>
                  <IssueColumnHeaderLink column={column} searchParams={searchParams} />
                </Table.ColumnHeaderCell>
              ))
            }
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

export const dynamic = 'force-dynamic'

export default IssuesPage