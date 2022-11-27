import React, { useRef } from "react"
import { ArrowDownIcon, ArrowCircleDownIcon } from "@heroicons/react/outline"
import Link from "next/link"
import { useSession } from "next-auth/react"

function Main() {
  const handleScroll = () => {
    window.scrollTo({
      top: newsLetterSection.current.offsetTop,
      behavior: "smooth",
    })
  }

  const { data: session } = useSession()

  const heroSection = useRef(null)
  const newsLetterSection = useRef(null)
  const language = "de"

  return language === "de" ? (
    <div className="absolute md:relative w-full overflow-hidden flex flex-col justify-center ">
      <div className="bg-[url('/media/Hero_Image.jpg')] bg-cover bg-center h-[94vh]">
        <section ref={heroSection} className="h-full">
          <div className="w-full flex flex-col-reverse text-lg dark:text-gray-300 h-[94vh] border-b-2 border-bright-orange items-center">
            <div className="flex">
              <button className="h-12 w-12 m-20" onClick={handleScroll}>
                <ArrowCircleDownIcon className="text-bright-orange animate-bounce"></ArrowCircleDownIcon>
              </button>
            </div>
          </div>
        </section>
      </div>

      <section ref={newsLetterSection} className="bg-blue-600 text-white py-20">
        <div className="container">
          <div className="sm:w-3/4 lg:w-2/4 mx-auto">
            <p className="font-light uppercase text-center mb-8">
              35,000+ ALREADY JOINED
            </p>
            <h1 className="text-3xl text-center">
              Stay up-to-date with what we’re doing
            </h1>
            <div className="flex flex-col sm:flex-row gap-6 mt-8">
              <input
                type="text"
                placeholder="Enter your email address"
                className="focus:outline-none flex-1 px-2 py-3 rounded-md text-black"
              />
              <button
                type="button"
                className="btn bg-bookmark-red hover:bg-bookmark-white hover:text-black rounded-lg px-4"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  ) : (
    ""
  )
}

export default Main
