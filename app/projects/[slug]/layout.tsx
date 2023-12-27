import prisma from '@/prisma/client'
import { Box, Flex } from "@radix-ui/themes"
import { notFound } from "next/navigation"
import ProjectProvider from "./ProjectProvider"
import ProjectSidebar from "./Sidebar"

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
    <ProjectProvider project={project}>
      <Flex>
        <ProjectSidebar />
        <Box className="px-6 py-7">
          {children}
        </Box>
      </Flex >
    </ProjectProvider>
  )
}
export default ProjectLayout