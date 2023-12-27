'use client'
import { Board, Project } from '@prisma/client'
import React, { ReactNode, createContext } from 'react'

type ProjectWithBoards = Project & { boards: Board[] }

interface Props {
  children: ReactNode,
  project: ProjectWithBoards
}

export const ProjectContext = createContext<ProjectWithBoards | null>(null)

const ProjectProvider = ({
  children,
  project
}: Props) => {
  return (
    <ProjectContext.Provider value={project}>
      {children}
    </ProjectContext.Provider>
  )
}

export default ProjectProvider