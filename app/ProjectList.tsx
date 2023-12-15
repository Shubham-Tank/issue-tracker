import { Session } from 'next-auth'
import React from 'react'
import prisma from '@/prisma/client'
import { Box, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { RxPlusCircled } from 'react-icons/rx'
import Link from 'next/link'

const ProjectList = async ({ session }: { session: Session | null }) => {

  const projects = session
    ? await prisma.project.findMany({ where: { ownerId: session.user.id } })
    : []

  return (
    <Box>
      <Heading mb="4">Projects</Heading>
      <Grid columns={{ initial: '1', sm: '5' }} gap="5">
        {
          projects.map((project) => (
            <Link href={`/projects/${project.slug}`}>
              <Card key={project?.id || project.name} className='h-24 cursor-pointer'>
                <Text>{project.name}</Text>
              </Card>
            </Link>
          ))
        }
        <Link href="/projects/new" className='h-24 cursor-pointer text-gray-400 transition-colors'>
          <Flex justify="center" align="center" height="100%"
            className='bg-none border-2 border-gray-800 border-dashed rounded-lg hover:border-gray-700'>
            <RxPlusCircled size="25px" />
          </Flex>
        </Link>
      </Grid>
    </Box >
  )
}

export default ProjectList