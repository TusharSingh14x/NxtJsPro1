import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/helper/sendVerificationEmail";
import { success } from "zod";

export async function POST(request:Request){
    await dbConnect();

    try {
        const {username,email,password}=await request.json();
      const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified:true
        })
        if (existingUserVerifiedByUsername) {
            return Response.json({
                success:false,
                message:"Username is already taken"
            },{status:400})

        }
        const existingUserByEmail=await UserModel.findOne({email})
        const verifycode=Math.floor(1000000+Math.random()*900000).toString()
        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                Response.json({
                        success:false,
                        message:"User already exist with this email"
            },{status:400})
            }
            else{
                const hashPassword=await bcrypt.hash(password,10);
                existingUserByEmail.password=hashPassword;
                existingUserByEmail.verifycode=verifycode;
                existingUserByEmail.verifyCodeexpiry=new Date(Date.now()+3600000)
                await existingUserByEmail.save()
            }
        }
        else{
            const hashPass=await bcrypt.hash(password,10);
            const expiryDate=new Date()
            expiryDate.setHours(expiryDate.getHours()+1)

        const newUser=new UserModel({
                 username,
                    email,
                    password:hashPass,
                    verifycode,
                    verifyCodeexpiry:expiryDate,
                     isVerified: false,
                    isAcceptedMessage:true,
                    messages:[]
            })

            await newUser.save()
        }



        
        //send verification email
      const emailResponse=  await sendVerificationEmail(
            email,
            username,
            verifycode
        )
        if (!emailResponse.success) {
            return Response.json({
                        success:false,
                        message:emailResponse.message
            },{status:500})
        }

return Response.json({
success:true,
message:"User registered Sucessfully.Pls verify the email"
            },{status:200})
    } catch (error) {
        console.error('Error regestering users');
return Response.json(
   { success:false,
    message:"Error regestering user "},{
        status:500
    }
)
    }
}