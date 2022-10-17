import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import withAuth from "next-auth/middleware"

export default withAuth(function middleware(req) {
  console.log(process.env.NEXTAUTH_SECRET)
  console.log(req.nextauth.token)
})

export const config = { matcher: ["/de/baukasten"] }
