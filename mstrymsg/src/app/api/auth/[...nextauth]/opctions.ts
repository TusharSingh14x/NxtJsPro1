import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"; // ✅ default import

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.email },
              { username: credentials.email }, // search by email or username
            ],
          });

          if (!user) {
            throw new Error("No user found with this email or username");
          }

          if (!user.isVerified) {
            throw new Error("Please verify your account before login");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Incorrect password");
          }
        } catch (error: any) {
          throw new Error(error.message || "Login failed");
        }
      },
    }),
  ],
  callbacks:{
 
    async jwt({ token, user}) {
      if (user) {
        token.id=user._id?.toString()
        token.isVerified=user.isverified;
        token.isAcceptingMessages=user.isAcceptingMessages;
        token.username=user.username;

      }
      return token
    } ,
  async session({ session,  token }) {
    if (token) {
      session.user._id=token._id
      session.user.isVerified=token.isVerified
      session.user.isAcceptingMessages=token.isAcceptingMessages
      session.user.username=token.username
    }
  return session
    }, },

  pages:{
    signIn:'/sign-in'
  },
  session:{
strategy:"jwt"
  },
  secret:process.env.NEXTAUTH_SECRET
};
