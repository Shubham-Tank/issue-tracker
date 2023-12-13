'use client'
import { DndContext, DragEndEvent, DragOverEvent } from '@dnd-kit/core'
import { Status } from '@prisma/client'
import { Flex } from '@radix-ui/themes'
import _ from 'lodash'
import { useState } from 'react'
import IssuesDropContainer, { SingleIssue } from './IssuesDropContainer'

export type StatusIssueMap = Record<Status, {
  label: string;
  issues: SingleIssue[];
}>

const IssueBoard = ({ statusIssuesMap }: { statusIssuesMap: StatusIssueMap }) => {

  const [statusIssues, setStatusIssue] = useState<StatusIssueMap>(statusIssuesMap)

  const updateIssuePosition = (e: DragEndEvent | DragOverEvent, eventType: 'dragEnd' | 'dragOver') => {
    const { issue, status } = e.active.data.current as { issue: SingleIssue, status: Status }
    const newStatus = e.over?.data.current?.status
    const beforeIssue = e.over?.data.current?.issue

    if (newStatus && e.active.id !== e.over?.id) {
      const newStatusIssues: StatusIssueMap = _.cloneDeep(statusIssues)
      const newIssuesArr = newStatusIssues[newStatus as Status].issues

      if (eventType === 'dragEnd') {
        if (newStatus === status) {
          const oldIndex = newIssuesArr.findIndex(i => i.id === issue.id);
          const newIndex = newIssuesArr.findIndex(i => i.id === beforeIssue.id);
          newIssuesArr.splice(oldIndex, 1)
          newIssuesArr.splice(newIndex, 0, issue)
          setStatusIssue(newStatusIssues)
        }
      } else if (eventType === 'dragOver') {
        if (newStatus !== status) {
          newStatusIssues[status].issues = newStatusIssues[status].issues.filter(i => i.id !== issue.id)

          if (beforeIssue) {
            const newIndex = newIssuesArr.findIndex(i => i.id === beforeIssue.id)
            newIssuesArr.splice(newIndex, 0, issue)
          } else {
            newIssuesArr.push(issue)
          }
          setStatusIssue(newStatusIssues)
        }
      }
    }
  }

  const handleDragEnd = (e: DragEndEvent) => {
    updateIssuePosition(e, 'dragEnd')
  }

  const handleDragOver = (e: DragOverEvent) => {
    updateIssuePosition(e, 'dragOver')
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}>
      <Flex gap="5" className='mb-10'>
        {
          Object.entries(statusIssues).map(([status, { label, issues }]) => (
            <IssuesDropContainer
              key={label}
              status={status as Status}
              label={label}
              issues={issues} />
          ))
        }
      </Flex>
    </DndContext>
  )
}

export default IssueBoard