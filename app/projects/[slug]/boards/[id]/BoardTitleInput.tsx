'use client'
import { boardSchema } from '@/app/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ProjectContext } from '../../ProjectProvider'
import { notFound } from 'next/navigation'
import { Board } from '@prisma/client'
import toast, { Toaster } from 'react-hot-toast'
import { ErrorMessage } from '@/app/components'

interface Props {
  board: Board
}

type BoardFormData = z.infer<typeof boardSchema>

const BoardTitleInput = ({ board }: Props) => {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<BoardFormData>({
    defaultValues: {
      title: board.title
    },
    resolver: zodResolver(boardSchema)
  })

  const project = useContext(ProjectContext)
  if (!project) return notFound()


  const updateTitle = async (data: BoardFormData) => {
    try {
      await axios.patch(`/api/projects/${project.slug}/boards/${board.id}`, data)
      router.refresh()
    } catch (e) {
      toast.error('Changes could not be saved.')
    }
  }

  return (
    <form className='w-1/4 min-w-fit'>
      <TextField.Root>
        <TextField.Input
          style={{ padding: '1.1rem 0.45rem' }}
          placeholder='Title'
          {...register('title', { onBlur: handleSubmit(updateTitle) })} />
      </TextField.Root>
      <div className='text-sm'>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
      </div>
      <Toaster />
    </form>
  )
}

export default BoardTitleInput