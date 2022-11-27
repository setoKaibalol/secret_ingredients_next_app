import { Disclosure, Menu, Transition } from "@headlessui/react"
import { MenuIcon, BellIcon, UserIcon, XIcon } from "@heroicons/react/outline"
import Link from "next/link"
import { US, DE, AU } from "country-flag-icons/react/3x2"
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/router"
import MoonLoader from "react-spinners/MoonLoader"
import { BiLogInCircle } from "react-icons/bi"
import { BsPersonCircle } from "react-icons/bs"
import BeatLoader from "react-spinners/BeatLoader"
import { useState } from "react"

const AuthButton = () => {
  const { data: session, status } = useSession()
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  return status === "authenticated" ? (
    <div
      id="div-authenticated"
      className="hidden md:flex flex-row sm:space-x-5 items-center justify-center"
    >
      <div id="profile-link" className="hidden sm:inline-block">
        <button
          className="group"
          onClick={() => setUserMenuOpen(!userMenuOpen)}
        >
          <BsPersonCircle className="h-6 w-6 sm:h-9 sm:w-9 text-bright-orange"></BsPersonCircle>
        </button>
        {userMenuOpen ? (
          <div id="userMenu" className="absolute duration-200">
            <div className="w-52 border-black border space-y-2 p-4 bg-white">
              <div>Account</div>
              <div>Einstellungen</div>
              {session?.user?.email === "lukasjv6@gmail.com" ||
              "a.schmiedeberg@autofreizeit.de" ||
              "l.vogel@autofreizeit.de" ? (
                <div>
                  <Link href="/admin/dashboard">
                    <button
                      onClick={close}
                      className="w-full rounded-sm border-black border-2 p-2 hover:bg-black hover:text-white duration-200"
                    >
                      Admin-Dashboard
                    </button>
                  </Link>
                </div>
              ) : (
                ""
              )}
              <div>
                <button
                  className="w-full rounded-sm border-black border-2 p-2 hover:bg-black hover:text-white duration-200"
                  onClick={() => {
                    close
                    signOut()
                  }}
                >
                  {status === "authenticated" ? (
                    "Sign out"
                  ) : status === "loading" ? (
                    <MoonLoader></MoonLoader>
                  ) : (
                    ""
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  ) : status === "loading" ? (
    <>
      <button
        className=""
        onClick={() => signIn(undefined, { callbackUrl: "/shop" })}
      >
        <BeatLoader className="text-bright-orange"></BeatLoader>
      </button>
    </>
  ) : (
    <>
      <button
        className=""
        onClick={() => signIn(undefined, { callbackUrl: "/shop" })}
      >
        <BiLogInCircle className="text-bright-orange h-10 w-10"></BiLogInCircle>
      </button>
    </>
  )
}

export default AuthButton
