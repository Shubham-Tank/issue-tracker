'use client'

import { SkeletonTheme } from '@/app/components'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import toast, { Toaster } from 'react-hot-toast'

const AssigneeSelect = ({ issue }: { issue: Issue }) => {

  const { data: users, error, isLoading } = useUsers()

  if (isLoading) return (
    <SkeletonTheme>
      <Skeleton height="1.75rem" />
    </SkeletonTheme>
  )

  if (error) return null

  const assignUser = (userId: string) => {
    axios.patch(`/api/issues/${issue.id}`, {
      assignedToUserId: userId !== 'unassigned' ? userId : null
    }).catch(() => {
      toast.error('Changes could not be saved.')
    })
  }

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || 'unassigned'}
        onValueChange={assignUser}
      >
        <Select.Trigger placeholder='Assign...' />
        <Select.Content position="popper">
          <Select.Group>
            {
              users?.map(user => (
                <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
              ))
            }
            <Select.Item value='unassigned'>
              <span className='text-gray-400'>Unassigned</span>
            </Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  )
}

const useUsers = () => useQuery<User[]>({
  queryKey: ['users'],
  queryFn: () => axios.get('/api/users').then(res => res.data),
  staleTime: 60 * 1000, // 60s
  retry: 3,
})

export default AssigneeSelect