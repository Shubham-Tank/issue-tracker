import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client'
import { issueSchema } from "@/app/validationSchemas";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }) {

  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({}, { status: 401 })

  const issueId = parseInt(params.id)
  const issue = await prisma.issue.findUnique({
    where: { id: issueId }
  })

  if (!issue) return NextResponse.json({ error: 'issue does not exist' }, { status: 404 })

  const body = await request.json()
  const validation = issueSchema.safeParse(body)
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description
    }
  })

  return NextResponse.json(updatedIssue)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }) {

  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({}, { status: 401 })

  const issueId = parseInt(params.id)

  const issue = await prisma.issue.findUnique({
    where: { id: issueId }
  })

  if (!issue) return NextResponse.json({ error: 'Invalid issue' }, { status: 404 })

  await prisma.issue.delete({ where: { id: issueId } })

  return NextResponse.json({})
}