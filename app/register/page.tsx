'use client'

import React, { useState } from 'react'
import { z } from 'zod'
import { registerUserSchema } from '../validationSchemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Box, Button, Callout, Card, Flex, TextField } from '@radix-ui/themes'
import { ErrorMessage, Spinner } from '../components'
import axios from 'axios'

type RegisterUserFormData = z.infer<typeof registerUserSchema>

const RegisterUser = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterUserFormData>({
    resolver: zodResolver(registerUserSchema)
  })

  const router = useRouter()

  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRegisterUser = async (data: RegisterUserFormData) => {
    setIsSubmitting(true)
    try {
      await axios.post('/api/register', data)
      router.push('/')
      router.refresh()
    } catch (err: any) {
      setIsSubmitting(false)
      if (err?.response?.data?.code === 'already_exists')
        setError(err.response.data?.message)
      else
        setError('An unexpected error occured.')
    }
  }

  return (
    <Card className='max-w-lg m-auto p-2'>
      {error && <Callout.Root color='red' className='mb-4'>
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>}

      <h1 className='text-2xl font-bold mt-1 mb-6 text-center'>Sign Up</h1>
      <form className='space-y-5' onSubmit={handleSubmit(handleRegisterUser)}>
        <Box>
          <TextField.Root>
            <TextField.Input
              style={{ padding: '1.2rem 0.45rem' }}
              placeholder='Name'
              {...register('name')} />
          </TextField.Root>
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </Box>

        <Box>
          <TextField.Root>
            <TextField.Input
              type='email'
              style={{ padding: '1.2rem 0.45rem' }}
              placeholder='Email'
              {...register('email')} />
          </TextField.Root>
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        </Box>

        <Box>
          <TextField.Root>
            <TextField.Input
              type='password'
              style={{ padding: '1.2rem 0.45rem' }}
              placeholder='Password'
              {...register('password')} />
          </TextField.Root>
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        </Box>

        <Flex justify="center">
          <Button disabled={isSubmitting}>
            {isSubmitting ? <Spinner /> : 'Sign Up'}
          </Button>
        </Flex>
      </form>
    </Card>
  )
}

export default RegisterUser