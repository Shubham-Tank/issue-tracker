import { Box, Flex } from "@radix-ui/themes"
import { ReactNode } from "react"
import ProjectSidebar from "./Sidebar"
import prisma from '@/prisma/client'

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

  const boards = project!.boards

  return (
    <Flex>
      <ProjectSidebar projectSlug={params.slug} boards={boards} />
      <Box className="px-6 py-7">
        {children}
      </Box>
    </Flex>
  )
}
export default ProjectLayout