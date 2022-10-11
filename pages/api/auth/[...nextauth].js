import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import AppleProvider from "next-auth/providers/apple"
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"
import InstagramProvider from "next-auth/providers/instagram"
import TwitterProvider from "next-auth/providers/twitter"
import mysql from "mysql2"
import axios from "axios"

const mysqlPasswordProduction = process.env.MYSQL_PASSWORD_PRODUCTION
const mysqlUsernameProduction = process.env.MYSQL_USERNAME_PRODUCTION

const db = mysql.createPool({
  port: "3306",
  host: "eu-cdbr-west-03.cleardb.net",
  user: mysqlUsernameProduction,
  password: mysqlPasswordProduction,
  database: "heroku_627d1cf77eefb59",
})

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
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
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
}
export default NextAuth(authOptions)
