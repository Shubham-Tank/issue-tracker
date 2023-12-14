'use client'
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core'
import { Status } from '@prisma/client'
import { Flex } from '@radix-ui/themes'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import IssuesDropContainer from './IssuesDropContainer'
import IssueCard from './IssueCard'
import { arrayMove } from '@dnd-kit/sortable'
import _ from 'lodash'

export type BoardIssue = {
  id: number;
  title: string;
  status: Status;
}

type StatusIssues = Record<Status, BoardIssue[] | []>

const statuses: Record<Status, string> = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  CLOSED: 'Closed'
}

const groupBy = (items: any[], key: string) => {
  return items.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

const IssueBoard = ({ issues }: { issues: BoardIssue[] }) => {

  const [allIssues, setAllIssues] = useState<StatusIssues>(groupBy(issues, 'status'))
  const [activeIssue, setActiveIssue] = useState<BoardIssue | null>(null)

  const onDragStart = (e: DragStartEvent) => {
    setActiveIssue(e.active.data.current?.issue || null)
  }

  const onDragOver = (e: DragOverEvent) => {
    const activeIssue: BoardIssue = e.active.data.current?.issue
    const overIssue: BoardIssue = e.over?.data.current?.issue

    if (!overIssue?.status) return

    if (activeIssue.status !== overIssue.status) {
      // in different column
      setAllIssues((issues) => {
        const updatedActiveTask = { ...activeIssue, status: overIssue.status }

        const issuesOfOldContainer = [...issues[activeIssue.status]]
        const issuesOfNewContainer = [...issues[overIssue.status]]

        const updatedIssues: StatusIssues = _.cloneDeep(issues)

        updatedIssues[activeIssue.status] = issuesOfOldContainer.filter(i => i.id !== activeIssue.id)

        issuesOfNewContainer.push(updatedActiveTask)
        const activeIndex = issuesOfNewContainer.length - 1
        const overIndex = issuesOfNewContainer.findIndex(i => i.id === overIssue.id)
        updatedIssues[overIssue.status] = arrayMove(issuesOfNewContainer, activeIndex, overIndex)

        return updatedIssues

      })
    }
  }

  const onDragEnd = (e: DragEndEvent) => {
    setActiveIssue(null)

    const activeIssue: BoardIssue = e.active.data.current?.issue
    const overIssue: BoardIssue = e.over?.data.current?.issue

    if (!overIssue?.status) return

    if (activeIssue.status === overIssue.status) {
      setAllIssues((issues) => {
        const currentStatusIssues = [...issues[activeIssue.status]]
        const activeIndex = currentStatusIssues.findIndex(i => i.id === activeIssue.id)
        const overIndex = currentStatusIssues.findIndex(i => i.id === overIssue.id)

        const updatedIssues: StatusIssues = _.cloneDeep(issues)
        updatedIssues[activeIssue.status] = arrayMove(currentStatusIssues, activeIndex, overIndex)

        return updatedIssues
      })
    }

  }

  return (
    <DndContext
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <Flex gap="5" align="start" className='mb-10 issue-board-container'>
        {
          Object.entries(statuses).map(([status, label]) => (
            <IssuesDropContainer
              key={label}
              status={status as Status}
              label={label}
              issues={allIssues[status as Status]} />
          ))
        }
      </Flex>
      {
        createPortal(
          <DragOverlay>
            {activeIssue && <IssueCard issue={activeIssue} />}
          </DragOverlay>
          , document?.querySelector('.issue-board-container') || document.body)
      }
    </DndContext>
  )
}

export default IssueBoard