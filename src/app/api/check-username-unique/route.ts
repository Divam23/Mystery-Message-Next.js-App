import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.models";
import {z} from "zod";
import { usernameValidation } from "@/schemas/signUp.schema";


const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request){
    await dbConnect();


    //This code is not needed in the latest version of NEXTjs because now it uses next router but if working on older versions this might be needed but for now not needed.
    // if(request.method !== 'GET'){
    //     return Response.json({
    //         success: false,
    //         message: "Method not allowed"
    //     },{status:405})
    // }

    try {
        const {searchParams} = new URL(request.url)
        const queryParams = {
            username: searchParams.get('username')
        }

        //validate with zod
        const result = UsernameQuerySchema.safeParse(queryParams);

        console.log(result);

        if(!result.success){
            const usernameError = result.error.format().username?._errors || [];
            return Response.json({
                success: false,
                message: usernameError.length > 0 ? usernameError.join(', ') : 'Invalid query parameters'  
            },{status: 400})
        }

        const {username} = result.data;

        const existingVerifiedUser = await UserModel.findOne({username, isVerified: true})

        if(existingVerifiedUser){
            return Response.json({
                success:false,
                message:"Username is already taken"
            },{status:400})
        }

        return Response.json({
            success:true,
            message: "Username is available"
        },{status:200})


    } catch (error) {
        console.log("Error checking username: ", error)
        return Response.json({
            success:false,
            message: "Error checking username"
        },{status: 500})
    }
}