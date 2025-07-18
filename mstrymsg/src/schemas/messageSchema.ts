import {z} from "zod";

export const messagesSchema=z.object({
content:z.string()
.min(10,{message:"Content must be atleast 10 chartecter long"})
.max(100,{message:"Content must be lesser than 100 charecter"})
})