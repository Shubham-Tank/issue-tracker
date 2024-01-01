'use client'
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { Issue, Status } from '@prisma/client'
import { Flex } from '@radix-ui/themes'
import axios from 'axios'
import _ from 'lodash'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import toast from 'react-hot-toast'
import IssueCard from './IssueCard'
import IssuesDropContainer from './IssuesDropContainer'

export type BoardIssue = {
  id: number;
  title: string;
  status: Status;
  positionOnBoard?: number;
}

type StatusIssues = Record<Status, BoardIssue[] | []>

const statuses: Record<Status, string> = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  CLOSED: 'Closed'
}

const groupIssueByStatus = (issues: Issue[]) => {
  const allIssues: Record<Status, BoardIssue[] | [] | string> = { ...statuses }
  for (let status in allIssues) {
    const filteredIssues = issues.filter(issue => issue.status === status)
    const sortedIssues = _.sortBy(filteredIssues, [i => i.positionOnBoard])
    allIssues[status as Status] = sortedIssues
      .map(issue => ({
        id: issue.id,
        title: issue.title,
        status: issue.status,
        positionOnBoard: issue.positionOnBoard as number
      }))
  }
  return allIssues
}

const IssueBoard = ({ issues }: { issues: Issue[] }) => {
  const [allIssues, setAllIssues] = useState<StatusIssues>(groupIssueByStatus(issues) as StatusIssues)
  const [currentActiveIssue, setCurrentActiveIssue] = useState<BoardIssue | null>(null)

  const onDragStart = (e: DragStartEvent) => {
    setCurrentActiveIssue(e.active.data.current?.issue || null)
  }

  const updateIssueStatus = async (id: number, status: Status) => {
    try {
      await axios.patch(`/api/issues/${id}`, { status })
    } catch (e) {
      toast.error('something went wrong.')
    }
  }

  const updateIssuePosition = async (id: number, positionOnBoard: number) => {
    try {
      await axios.patch(`/api/issues/${id}`, { positionOnBoard })
    } catch (e) {
      toast.error('something went wrong.')
    }
  }

  const updateIssuesAfterReorder = (allIssues: StatusIssues) => {
    for (let status in allIssues) {
      const statusIssues = allIssues[status as Status]
      for (const [index, issue] of statusIssues.entries()) {
        if (issue.positionOnBoard !== index) {
          updateIssuePosition(issue.id, index)
        }
      }
    }
  }

  const addIssueToEmptyContainer = (containerStatus: Status, activeIssue: BoardIssue) => {
    setAllIssues((issues) => {
      const oldStatus = activeIssue.status
      const updatedActiveIssue = { ...activeIssue, status: containerStatus }

      let issuesOfOldContainer = [...issues[oldStatus]]
      issuesOfOldContainer = issuesOfOldContainer.filter(issue => issue.id !== activeIssue.id)

      const issuesOfNewContainer = [...issues[containerStatus]]
      issuesOfNewContainer.unshift(updatedActiveIssue)

      const updatedIssues: StatusIssues = _.cloneDeep(issues)
      updatedIssues[oldStatus] = issuesOfOldContainer
      updatedIssues[containerStatus] = issuesOfNewContainer

      return updatedIssues
    })
  }

  const addIssueToNonEmptyContainer = (overIssue: BoardIssue, activeIssue: BoardIssue) => {
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

  const onDragOver = (e: DragOverEvent) => {
    const activeIssue: BoardIssue = e.active.data.current?.issue

    const isOverContainer = e.over?.data.current?.type === 'container'
    if (isOverContainer) {
      const containerStatus = e.over?.id as Status
      if (containerStatus !== activeIssue.status) {
        addIssueToEmptyContainer(containerStatus, activeIssue)
        return
      }
    }

    const overIssue: BoardIssue = e.over?.data.current?.issue

    if (!overIssue?.status) return

    if (activeIssue.status !== overIssue.status) {
      // in different column
      addIssueToNonEmptyContainer(overIssue, activeIssue)
    }
  }

  const onDragEnd = (e: DragEndEvent) => {
    setCurrentActiveIssue(null)

    const activeIssue: BoardIssue = e.active.data.current?.issue

    const isOverContainer = e.over?.data.current?.type === 'container'

    if (isOverContainer) {
      const containerStatus = e.over?.id as Status
      updateIssueStatus(activeIssue.id, containerStatus)
      updateIssuesAfterReorder(allIssues)
      return
    }

    const overIssue: BoardIssue = e.over?.data.current?.issue

    if (!overIssue?.status) return

    if (activeIssue.status === overIssue.status) {
      setAllIssues((issues) => {
        const status = activeIssue.status

        const currentStatusIssues = [...issues[status]]
        const activeIndex = currentStatusIssues.findIndex(i => i.id === activeIssue.id)
        const overIndex = currentStatusIssues.findIndex(i => i.id === overIssue.id)

        const updatedIssues: StatusIssues = _.cloneDeep(issues)
        updatedIssues[status] = arrayMove(currentStatusIssues, activeIndex, overIndex)
        updateIssuesAfterReorder(updatedIssues)

        return updatedIssues
      })
    }

    updateIssueStatus(activeIssue.id, overIssue.status)
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
            {currentActiveIssue && <IssueCard issue={currentActiveIssue} />}
          </DragOverlay>
          , document?.querySelector('.issue-board-container') || document.body)
      }
    </DndContext>
  )
}

export default IssueBoard