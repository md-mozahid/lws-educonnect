import { UserModel } from "@/models/user-model";
import dbConnect from "@/services/mongo";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect();
  const { firstName, lastName, email, password, userRole } =
    await request.json();

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = {
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role: userRole,
  };
//   console.log("new user", newUser);

  try {
    await UserModel.create(newUser);
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
