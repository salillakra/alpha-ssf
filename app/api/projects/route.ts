import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { title, markdown, coverImage } = await request.json();

    if (!title || !markdown || !coverImage) {
      return NextResponse.json(
        { error: "Title, markdown, and cover image are required." },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        title,
        markdown,
        coverImage,
        published: true,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project." },
      { status: 500 }
    );
  }
}
