import React from 'react'
import prisma from '@/prisma/client'

interface Props {
  params: {
    slug: string
  }
}

const ProjectDashboardPage = async ({ params }: Props) => {

  const project = await prisma.project.findUnique({
    where: { slug: params.slug }
  })

  return (
    <>
      <h1>{project?.name}</h1>
    </>
  )
}

export default ProjectDashboardPage