import { Status } from '@prisma/client'
'use client'

import { Select } from '@radix-ui/themes'
import React from 'react'

const statuses: { label: string, value: Status | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
]

const IssueStatusFilter = () => {
  return (
    <Select.Root defaultValue='ALL'>
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