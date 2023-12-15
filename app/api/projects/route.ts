import authOptions from "@/app/auth/authOptions";
import { createProjectSchema } from "@/app/validationSchemas";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client'

export async function POST(request: NextRequest) {

  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({}, { status: 401 })

  const body = await request.json()

  const validation = createProjectSchema.safeParse(body)
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const project = await prisma.project.findUnique({
    where: { slug: body.slug }
  })

  if (project)
    return NextResponse.json({
      code: 'already_exists',
      message: 'Project with same slug already exists'
    }, { status: 400 })

  const newProject = await prisma.project.create({
    data: {
      name: body.name,
      slug: body.slug,
      ownerId: session.user.id
    }
  })

  return NextResponse.json(newProject, { status: 201 })
}
