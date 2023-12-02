'use client';

import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import Skeleton from 'react-loading-skeleton';
import SkeletonTheme from '@/app/components/SkeletonTheme';

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


type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  })
  const router = useRouter()

  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleIssueSubmit = async (data: IssueForm) => {
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
            <TextField.Input placeholder='Title' {...register('title')} />
          </TextField.Root>
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
        </div>

        <div>
          <Controller
            name='description'
            control={control}
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

export default NewIssuePage