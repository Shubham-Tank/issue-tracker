import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

const statusMap: Record<Status, { label: string, color: 'orange' | 'indigo' | 'green' }> = {
  OPEN: { label: 'Open', color: 'orange' },
  IN_PROGRESS: { label: 'In Progress', color: 'indigo' },
  CLOSED: { label: 'Closed', color: 'green' },
}

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color} className='w-fit'>{statusMap[status].label}</Badge>
  )
}

export default IssueStatusBadge
