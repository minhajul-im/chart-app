import { z } from "zod";
import bcrypt from "bcryptjs";
import { signupSchema } from "@/schema";
import { prisma } from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const { name, email, password } = await request.json();

    const validUser = signupSchema.parse({ name, email, password });

    const hashPassword = await bcrypt.hash(validUser.password, 10);

    const existUser = await prisma.user.findUnique({
      where: { email: validUser.email },
    });

    if (existUser) {
      return NextResponse.json(
        { message: "User with this email already exists!", status: 400 },
        { status: 400 }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        name: validUser.name,
        email: validUser.email,
        password: hashPassword,
      },
    });

    return NextResponse.json(
      {
        user: { id: newUser.id, name: newUser.name, email: newUser.email },
        status: 201,
        message: "User created successfully!",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed!",
          issues: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred", status: 500 },
      { status: 500 }
    );
  }
};
