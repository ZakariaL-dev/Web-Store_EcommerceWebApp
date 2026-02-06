// MoongoDB
import connectDB from "@/config/MongoDB";

// Schemas
import User from "@/models/UserSchema";

// Next
import { NextResponse } from "next/server";

// Jwt Token
import jwt from "jsonwebtoken";


export async function GET() {
  try {
    await connectDB();
    const Users = await User.find({}).sort({ createdAt: -1 });;

    return NextResponse.json({ Users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const { email } = body;
    const UserExists = await User.findOne({ email });
    if (UserExists) {
      return NextResponse.json(
        { success: false, message: "User's email already exists" },
        { status: 400 }
      );
    }

    const newUser = await User.create(body);

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_secret,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      success: true,
      message: "User registered. Please verify your email.",
      user: newUser,
    });
    return response;
  } catch (error) {
    console.log("posting new user: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



// const verificationToken = crypto.randomInt(100000, 1000000).toString();;
// const verificationTokenExpiresAt = Date.now() + 4 * 60 * 60 * 1000;
// const newUser = await User.create({
//   ...body,
//   verificationToken,
//   verificationTokenExpiresAt,
// });