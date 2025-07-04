import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.models";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, code } = await request.json();
    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return new Response(JSON.stringify(
        {
          success: false,
          message: "User not found",
        }),
        { status: 500 }
      );
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();

      return new Response(JSON.stringify(
        {
          success: true,
          message: "Account Verified Successfully",
        }),
        { status: 200 }
      );
    } else if (!isCodeNotExpired) {
      return new Response(JSON.stringify(
        {
          success: false,
          message:
            "Verification code has expired. Please signup again to get a new code.",
        }),
        { status: 400 }
      );
    } else {
      return new Response(JSON.stringify(
        {
          success: false,
          message: "Incorrect Verfication code. Please try again",
        }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.log("Error verifying user: ", error);
    return new Response(JSON.stringify(
      {
        success: false,
        message: "Error verifying user",
      }),
      { status: 500 }
    );
  }
}
