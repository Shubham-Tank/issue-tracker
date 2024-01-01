'use client'

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'

const statuses: { label: string, value: Status | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
]

const IssueStatusFilter = ({ }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleStatusUpdate = (status: Status | 'ALL') => {
    const params = new URLSearchParams()
    params.append('status', status)
    for (let sp of searchParams.keys()) {
      if (sp === 'status') continue

      if (searchParams.get(sp))
        params.append(sp, searchParams.get(sp)!)
    }

    const query = params.size ? `?${params.toString()}` : ''
    router.push('/issues' + query)
  }

  return (
    <Select.Root
      defaultValue={searchParams.get('status') || 'ALL'}
      onValueChange={handleStatusUpdate}
    >
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