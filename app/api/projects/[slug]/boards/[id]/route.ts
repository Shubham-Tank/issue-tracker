import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client'
import { boardSchema } from "@/app/validationSchemas";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({}, { status: 401 })

  const board = await prisma.board.findUnique({
    where: { id: params.id }
  })

  if (!board) return NextResponse.json({ error: 'Board does not exist' }, { status: 404 })

  const body = await request.json()
  const validation = boardSchema.safeParse(body)
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const updatedBoard = await prisma.board.update({
    where: { id: params.id },
    data: {
      title: body.title
    }
  })

  return NextResponse.json(updatedBoard)
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {

  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({}, { status: 401 })

  const board = await prisma.board.findUnique({
    where: { id: params.id }
  })

  if (!board) return NextResponse.json({ error: 'Board is not available' }, { status: 404 })

  await prisma.board.delete({ where: { id: params.id } })

  return NextResponse.json({})
}