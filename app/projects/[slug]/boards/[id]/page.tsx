import React from 'react'
import prisma from '@/prisma/client'
import BoardTitleInput from './BoardTitleInput'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    slug: string
    id: string
  }
}

const Board = async ({ params }: Props) => {

  const board = await prisma.board.findUnique({
    where: { id: params.id }
  })

  if (!board) return notFound()

  return (
    <div>
      <BoardTitleInput board={board} />
    </div>

  )
}

export default Board