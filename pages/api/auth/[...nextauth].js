import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import AppleProvider from "next-auth/providers/apple"
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"
import InstagramProvider from "next-auth/providers/instagram"
import TwitterProvider from "next-auth/providers/twitter"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../prisma/PrismaClient"
import axios from "axios"

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({}),
    AppleProvider({}),
    TwitterProvider({}),
    InstagramProvider({}),
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        let auth
        const authenticateUser = new Promise((resolve, reject) => {
          axios
            .post("http://localhost:3000/api/auth/email-login", {
              credentials,
            })
            .then((res) => {
              auth = res.data
              resolve()
            })
            .catch((err) => {
              console.log("error:", err)
              auth = null
              resolve()
            })
        })
        return await authenticateUser.then(() => {
          return auth
        })
      },
    }),
  ],
  pages: {
    signIn: "/de/auth/login",
    newUser: "/de/auth/konto-erstellen",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      // first time jwt callback is run, user object is available
      if (user) {
        token.id = user.id
      }
      return token
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id
      }
      return session
    },
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        console.log(profile.email)
        return profile.email_verified && profile.email.endsWith("@gmail.com")
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
}
export default NextAuth(authOptions)
