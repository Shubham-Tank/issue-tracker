import React from 'react'

interface Props {
  params: {
    slug: string
    id: string
  }
}

const Board = ({ params }: Props) => {
  return (
    <div>Board: #{params.id}</div>

  )
}

export default Board