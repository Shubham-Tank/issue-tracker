import React from 'react'
import prisma from '@/prisma/client'
import BoardTitleInput from './BoardTitleInput'
import { notFound } from 'next/navigation'
import lazyload from 'next/dynamic'
import { Container, Flex } from '@radix-ui/themes'

const IssueBoard = lazyload(
  () => import('@/app/components/IssueBoard'),
  {
    ssr: false
  }
)

interface Props {
  params: {
    slug: string
    id: string
  }
}

const Board = async ({ params }: Props) => {

  const board = await prisma.board.findUnique({
    where: { id: params.id },
    include: {
      issues: true
    }
  })

  if (!board) return notFound()

  const { issues } = board

  return (
    <Flex direction="column" className='h-full' gap="5">
      <Container grow="0">
        <BoardTitleInput board={board} />
      </Container>
      <Container className='grow'>
        <IssueBoard issues={issues} />
      </Container>
    </Flex>

  )
}

export default Board