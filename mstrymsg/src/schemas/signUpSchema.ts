import {z} from "zod";

export const usernameValidation=z.string()
.min(2,"Username should be atleast 2 charecter long")
.max(20,"username should be less than 20 charecter long")
  .regex(/^[a-zA-Z0-9]{3,16}$/, "username must not contain any special character");



  export const signUpSchema=z.object({
   username:usernameValidation ,
   email:z.string().email({message:"Invalid email address"}),
   password:z.string().min(6,{message:"password must be atleast 6 charecters long"})
  })