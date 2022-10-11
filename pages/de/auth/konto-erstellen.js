import { LockClosedIcon, InformationCircleIcon } from "@heroicons/react/solid"
import { useState, useContext } from "react"
import axios from "axios"
import Link from "next/link"
import { toast } from "react-toastify"
import { signIn } from "next-auth/react"

export default function SignUp() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })
  const [status, setStatus] = useState()
  const [showStatus, setShowStatus] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    axios
      .post("http://localhost:3000/api/auth/users", { userData })
      .then((response) => {
        setStatus(response.data)
        setShowStatus(false)
        console.log(response.data)
      })
      .catch((error) => {
        setStatus(error.response.data)
        setShowStatus(false)
        console.log(error.response.data)
      })
  }

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  return (
    <div className="">
      <div className="min-h-full h-full flex items-center justify-center py-2 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800 m-auto">
        <div className="max-w-md w-full space-y-8">
          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
            autoComplete="on"
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-bright-orange focus:border-bright-orange focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-bright-orange focus:border-bright-orange focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={userData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-bright-orange hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bright-orange"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-orange-400 group-hover:text-orange-500"
                    aria-hidden="true"
                  />
                </span>
                Auf geht&#39;s!
              </button>
            </div>
            <div>
              <label className=" text-gray-900 dark:text-gray-100">
                hast du bereits ein Konto?
              </label>
              <button
                onClick={() => signIn()}
                className="text-bright-orange mx-2 font-bold dark:hover:text-orange-500"
              >
                Login!
              </button>
            </div>
          </form>
          <div hidden={showStatus}>{status}</div>
        </div>
      </div>
    </div>
  )
}
