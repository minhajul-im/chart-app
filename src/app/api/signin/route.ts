import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const { email, password } = await request.json();

    const existUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existUser) {
      return NextResponse.json(
        { error: "User with this email does not exist!", status: 400 },
        { status: 400 }
      );
    }

    const checkPassword = await bcrypt.compare(password, existUser.password);

    if (!checkPassword) {
      return NextResponse.json(
        { error: "Invalid password", status: 400 },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        user: {
          id: existUser.id,
          name: existUser.name,
          email: existUser.email,
        },
        message: "Signin successful!",
        status: 200,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "An unexpected error occurred",
        status: 500,
      },
      { status: 500 }
    );
  }
};
