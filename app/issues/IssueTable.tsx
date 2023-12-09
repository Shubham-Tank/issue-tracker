import { IssueStatusBadge, Link } from '@/app/components';
import { Issue, Status } from '@prisma/client';
import { Table } from '@radix-ui/themes';
import IssueColumnHeaderLink from './IssueColumnHeaderLink';

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  desc?: boolean;
  page: string
}

interface Props {
  issues: Issue[],
  searchParams: IssueQuery
}

const IssueTable = ({ issues, searchParams }: Props) => {

  return (
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
  )
}

const columns: {
  label: string,
  value: keyof Issue,
  className?: string
}[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status' },
    { label: 'Created', value: 'createdAt' },
  ]

export const issueTableColNames = columns.map(col => col.value)

export default IssueTable