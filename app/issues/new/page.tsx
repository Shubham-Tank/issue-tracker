'use client'

import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm {
  title: string,
  description: string
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>()
  const router = useRouter()

  const handleIssueSubmit = async (data: IssueForm) => {
    await axios.post('/api/issues', data)
    return router.push('/issues')
  }

  return (
    <form className='max-w-xl space-y-4' onSubmit={handleSubmit(handleIssueSubmit)}>
      <TextField.Root>
        <TextField.Input placeholder='Title' {...register('title')} />
      </TextField.Root>
      <Controller
        name='description'
        control={control}
        render={({ field }) => {
          return <SimpleMDE {...field} />
        }}
      />
      <Button>Create</Button>
    </form>
  )
}

export default NewIssuePage