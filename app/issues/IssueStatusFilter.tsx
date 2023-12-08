'use client'

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'

const statuses: { label: string, value: Status | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
]

const IssueStatusFilter = ({ }) => {
  const router = useRouter()

  const handleStatusUpdate = (status: Status | 'ALL') => {
    const query = status !== 'ALL' ? `?status=${status}` : ''
    router.push('/issues' + query)
  }

  return (
    <Select.Root defaultValue='ALL' onValueChange={handleStatusUpdate}>
      <Select.Trigger />
      <Select.Content position="popper">
        {
          statuses.map(status => (
            <Select.Item key={status.value} value={status.value}>{status.label}</Select.Item>
          ))
        }
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter