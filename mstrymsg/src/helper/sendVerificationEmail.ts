 import {resend} from '@/lib/resennd';

 import VerificationEmail from '../../emails/VerificationEmail';
 import { ApiResponse } from '@/types/Apiresponse';

 export async function sendVerificationEmail(
email:string,
username:string,
verifycode:string
 ):Promise<ApiResponse> {
    try {
        const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'Mystery message verification Code ',
      react:VerificationEmail({username,otp:verifycode}),
    });

        return {success:true,message:"sent the email sucessfully"}
    } catch (emailError) {
        console.error("Error sending the verification email")
    return{success:false,message:'failes to send verification email'};
    }
 }