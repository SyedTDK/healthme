import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/libs/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";


export const authOptions: AuthOptions = {
  
    adapter: PrismaAdapter(prisma),
    providers: [
      CredentialsProvider({
        name: "credentials",
        credentials: {
          email: { label: "email", type: "email" },
          password: { label: "password", type: "password" },
        },
        async authorize(credentials) {
          const user = await prisma.user.findUnique({
            where: { email: credentials?.email },
          });
  
          if (!user) throw new Error("user with that email does not exist");
          
            const passwordMatch = await bcrypt.compare(
            credentials?.password || '',
            user.password || ''
            );

            if (!passwordMatch) throw new Error("incorrect password");

            return user as any;
        },
      }),
    
    ],
    debug: process.env.NODE_ENV === "development",
    session: { strategy: "jwt" },
    secret: "secret", // store this in a .env file
    callbacks: {
      async session({ session, token }) {
        if (token.sub) {
          // Safely assign the user ID to the session object
          session.user = session.user ?? {}; // Ensure session.user is not undefined
          session.user.id = token.sub;
        }
        return session;
      }
    }
  };