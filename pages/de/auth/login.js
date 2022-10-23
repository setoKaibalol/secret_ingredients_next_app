import React from "react"
import { getProviders, signIn, getSession, getCsrfToken } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { SiFacebook } from "react-icons/si"
import { DiApple } from "react-icons/di"
import { FaTwitter } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa"

function login({ providers, csrfToken }) {
  return (
    <div className="flex bg-dark-blue w-full items-center justify-center h-[90vh]">
      <form></form>
      <div className="w-1/4 border-2 rounded-2xl bg-dark-blue--1 border-bright-orange h-[80%] flex flex-col items-center p-4">
        <h2 className="mb-10 text-2xl text-white font-medium">Log dich ein:</h2>
        <div
          id="provider-div"
          className="flex flex-row justify-center w-full flex-wrap px-10 space-x-6 gap-y-10"
        >
          {Object.values(providers).map((provider, index) => {
            if (provider.name === "Credentials") {
              return
            }
            if (provider.name === "Google") {
              return (
                <div key={index}>
                  <button
                    className="h-20 w-20 hover:bg-gray-300 rounded-3xl bg-sand-white border-bright-orange border-2 p-2"
                    onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                  >
                    <FcGoogle className="h-full w-full" />
                  </button>
                </div>
              )
            }
            if (provider.name === "Facebook") {
              return (
                <div key={index}>
                  <button
                    className="h-20 w-20 hover:bg-gray-400 rounded-3xl bg-sand-white border-bright-orange border-2 p-2"
                    onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                  >
                    <SiFacebook className="h-full w-full text-blue-700" />
                  </button>
                </div>
              )
            }
            if (provider.name === "Apple") {
              return (
                <div key={index}>
                  <button
                    className="h-20 w-20 hover:bg-gray-400 rounded-3xl bg-sand-white border-bright-orange border-2 p-2"
                    onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                  >
                    <DiApple className="h-full w-full text-black" />
                  </button>
                </div>
              )
            }
            if (provider.name === "Twitter (Legacy)") {
              return (
                <div key={index}>
                  <button
                    className="h-20 w-20 hover:bg-gray-400 rounded-3xl bg-sand-white border-bright-orange border-2 p-2"
                    onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                  >
                    <FaTwitter className="h-full w-full text-blue-600" />
                  </button>
                </div>
              )
            }
            if (provider.name === "Instagram") {
              return (
                <div key={index}>
                  <button
                    className="h-20 w-20 hover:bg-gray-400 rounded-3xl bg-sand-white border-bright-orange border-2 p-2"
                    onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                  >
                    <FaInstagram className="h-full w-full text-purple-600" />
                  </button>
                </div>
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}

login.getInitialProps = async (context) => {
  const { req, res } = context

  const session = await getSession({ req })

  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: "/",
    })
    res.end()
    return
  }
  return {
    session: undefined,
    providers: await getProviders(context),
    csrfToken: await getCsrfToken(context),
  }
}

export default login
