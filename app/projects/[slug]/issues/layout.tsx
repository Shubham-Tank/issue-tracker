import { Container } from '@radix-ui/themes'
import React from 'react'

const IssuesLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <Container className='py-7'>
      {children}
    </Container>
  )
}

export default IssuesLayout