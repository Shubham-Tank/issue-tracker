import { Box, Flex } from "@radix-ui/themes"
import { ReactNode } from "react"
import ProjectSidebar from "./Sidebar"
import prisma from '@/prisma/client'
import { notFound } from "next/navigation"

interface Props {
  children: React.ReactNode
  params: {
    slug: string
  }
}

const ProjectLayout = async ({
  children,
  params
}: Props) => {

  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
    include: {
      boards: true
    }
  })

  if (!project) {
    return notFound()
  }

  return (
    <Flex>
      <ProjectSidebar project={project} />
      <Box className="px-6 py-7">
        {children}
      </Box>
    </Flex>
  )
}
export default ProjectLayout