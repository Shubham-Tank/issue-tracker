'use client';

import { ErrorMessage, SkeletonTheme, Spinner } from '@/app/components';
import { createIssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import { z } from 'zod';

const SimpleMDE = dynamic(
  () => import('react-simplemde-editor'),
  {
    loading: () => (
      <SkeletonTheme>
        <Skeleton height="20rem" />
      </SkeletonTheme>
    ),
    ssr: false
  }
)

type IssueFormData = z.infer<typeof createIssueSchema>

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema)
  })
  const router = useRouter()

  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleIssueSubmit = async (data: IssueFormData) => {
    setIsSubmitting(true)
    try {
      await axios.post('/api/issues', data)
      router.push('/issues')
    } catch (err) {
      setIsSubmitting(false)
      setError('An unexpected error occured.')
    }
  }

  return (
    <div className='max-w-xl'>
      {error && <Callout.Root color='red' className='mb-4'>
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>}
      <form className='space-y-4' onSubmit={handleSubmit(handleIssueSubmit)}>

        <div>
          <TextField.Root>
            <TextField.Input defaultValue={issue?.title} placeholder='Title' {...register('title')} />
          </TextField.Root>
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
        </div>

        <div>
          <Controller
            name='description'
            control={control}
            defaultValue={issue?.description}
            render={({ field }) => {
              return <SimpleMDE {...field} />
            }}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        </div>

        <Button disabled={isSubmitting}>
          {isSubmitting ? <Spinner /> : 'Create'}
        </Button>
      </form>
    </div>
  )
}

export default IssueForm