import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client'
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {

  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({}, { status: 401 })

  const { slug } = params

  const project = await prisma.project.findUnique({
    where: { slug }
  });

  if (project)
    return NextResponse.json({ available: false });

  return NextResponse.json({ available: true });
}
