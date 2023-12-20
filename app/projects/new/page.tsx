'use client'
import { ErrorMessage, Spinner } from '@/app/components'
import { createProjectSchema } from '@/app/validationSchemas'
import { createSlug } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Callout, Flex, Heading, Text, TextField } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type ProjectFormData = z.infer<typeof createProjectSchema>

const CreateProjectPage = () => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    setError: setFormError,
    clearErrors,
    trigger,
    formState: { errors, isSubmitted }
  } = useForm<ProjectFormData>({
    resolver: zodResolver(createProjectSchema)
  })
  const router = useRouter()

  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const projName = watch('name', '')
  const slug = watch('slug', '')

  useEffect(() => {
    const slug = createSlug(projName)
    setValue('slug', slug)
    if (isSubmitted)
      trigger('slug')
  }, [projName])

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    if (slug) {

      (async () => {
        try {
          const res = await axios.get(`/api/projects/available/${slug}`, {
            cancelToken: cancelTokenSource.token,
          })
          const { available } = res.data
          if (!available) {
            setFormError('slug', {
              type: 'custom',
              message: 'this slug is already used'
            })
          } else {
            if (errors?.slug?.type === 'custom') {
              clearErrors('slug')
            }
          }
        } catch (err) {
          if (!axios.isCancel(err)) {
            setError('An unexpected error occured.')
          }
        }
      })()
    }

    return () => {
      cancelTokenSource.cancel('Request canceled due to component unmounting');
    };
  }, [slug])

  const handleCreateProject = async (data: ProjectFormData) => {
    if (errors) return
    setIsSubmitting(true)

    try {
      await axios.post('/api/projects', data)
      router.push('/')
      router.refresh()
    } catch (err) {
      setIsSubmitting(false)
      setError('An unexpected error occured.')
    }
  }

  return (
    <div className='max-w-xl m-auto'>
      <Heading mb="5">Create Project</Heading>

      {error && <Callout.Root color='red' className='mb-4'>
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>}

      <form className='flex flex-col gap-4' autoComplete='off' onSubmit={handleSubmit(handleCreateProject)}>

        <div>
          <Text className='text-sm font-bold'>Project Name</Text>
          <TextField.Root mt="1">
            <TextField.Input
              style={{ padding: '1.1rem 0.45rem' }}
              placeholder='My Project'
              {...register('name')} />
          </TextField.Root>
          <ErrorMessage>
            <Text className='text-xs'>{errors.name?.message}</Text>
          </ErrorMessage>
        </div>

        <div>
          <Text className='text-sm font-bold'>Slug</Text>
          <Flex gap="1" wrap="wrap">
            <Text className='text-gray-500 pt-[0.55rem]'>/projects/</Text>
            <Box className='grow' mt="1">
              <TextField.Root>
                <TextField.Input
                  style={{ padding: '1.1rem 0.45rem' }}
                  placeholder='my-project'
                  {...register('slug')} />
              </TextField.Root>
              <ErrorMessage>
                <Text className='text-xs'>{errors.slug?.message}</Text>
              </ErrorMessage>
            </Box>
          </Flex>
        </div>

        <Button disabled={isSubmitting || Object.keys(errors).length > 0} className='self-end'>
          {isSubmitting ? <>Create<Spinner /></> : 'Create'}
        </Button>
      </form>
    </div>
  )
}

export default CreateProjectPage