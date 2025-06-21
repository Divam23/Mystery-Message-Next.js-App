import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";
import VerificationEmails from '../../emails/VerificationEmails';


export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string,

):Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Verification Code | Mystery Message",
            react: VerificationEmails({ username, otp: verifyCode }),
        })
        return {success:true, message: "Verification email sent successfully"}
    } catch (emailError) {
        console.log("Error sending verification email: ", emailError)
        return {success: false, message: "Failed to send verification email"}
    }
}
