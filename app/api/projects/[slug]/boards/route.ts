import authOptions from "@/app/auth/authOptions";
import { createBoardSchema } from "@/app/validationSchemas";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client'

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }) {

  // const session = await getServerSession(authOptions)
  // if (!session) return NextResponse.json({}, { status: 401 })

  const body = await request.json()

  const validation = createBoardSchema.safeParse(body)
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const project = await prisma.project.findUnique({
    where: { slug: params.slug }
  })

  if (!project)
    return NextResponse.json({
      message: 'Project does not exists'
    }, { status: 400 })

  const newBoard = await prisma.board.create({
    data: {
      title: body.title,
      projectId: project.id
    }
  })

  return NextResponse.json(newBoard, { status: 201 })
}
