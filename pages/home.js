import React, { useRef } from "react"
import { ArrowDownIcon, ArrowCircleDownIcon } from "@heroicons/react/outline"
import Link from "next/link"
import { useSession } from "next-auth/react"
import CardGeheimrezepte from "../Components/LandingPage/CardGeheimrezepte"
import CardGrundrezepte from "../Components/LandingPage/CardGrundrezepte"
import CardNutzerrezepte from "../Components/LandingPage/CardNutzerrezepte"
import CardRezeptErstellen from "../Components/LandingPage/CardRezeptErstellen"
import CardTest from "../Components/LandingPage/CardTest"

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
      <div className="md:bg-[url('/media/Hero_Image.jpg')] bg-dark-blue bg-cover bg-center h-screen md:h-[94vh]">
        <section ref={heroSection} className="h-full">
          <div className="w-full flex flex-col-reverse text-lg dark:text-gray-300 h-screen md:h-[94vh] border-b-2 border-bright-orange items-center">
            <div className="flex">
              <button
                className="h-12 border-collapse w-12 m-10"
                onClick={handleScroll}
              >
                <ArrowCircleDownIcon className="text-bright-orange animate-bounce"></ArrowCircleDownIcon>
              </button>
            </div>
            <div id="cards-div" className="h-[65%] w-[100%] overflow-hidden">
              <div className="w-[500%] sm:w-[250%] lg:w-[166%] block relative m-0 gap-x-2 left-0 animate-sliderMobile sm:animate-sliderTablet lg:animate-sliderDesktop">
                {/* <CardGeheimrezepte number={1} />
                <CardGrundrezepte number={2} />
                <CardNutzerrezepte number={3} />
                <CardRezeptErstellen number={4} />
                <CardGeheimrezepte number={1} /> */}
                <CardTest></CardTest>
                <CardTest></CardTest>
                <CardTest></CardTest>
                <CardTest></CardTest>
                <CardTest></CardTest>
                <div className="hidden absolute -right-[20%] sm:block w-[16%]  mx-[2%] sm:w-[18%] sm:mx-[1%] float-left p-6 border rounded-lg shadow-md hover:bg-gray-100 bg-crab-grey bg-cover border-gray-700 dark:hover:bg-gray-700">
                  <Link href="/de/geheimrezepte">
                    <a className="mb-2 text-2xl sm:text-4xl font-bold tracking-tight text-bright-orange hover:text-orange-500 duration-100 underline">
                      CardTest
                    </a>
                  </Link>
                  <div className="font-normal text-xl sm:text-3xl text-white w-[50%]">
                    <text className="w-full overflow-hidden">
                      Erkunde die verzaubernden, von Köchen erstellten
                      <Link href="/de/geheimrezepte">
                        <a className="text-bright-orange font-medium hover:text-orange-500  duration-100">
                          {" "}
                          Geheimrezepte{" "}
                        </a>
                      </Link>
                      von Secret Ingredients 🤫
                    </text>
                  </div>
                </div>
                <div className="hidden absolute -right-[40%] sm:block w-[16%]  mx-[2%] sm:w-[18%] sm:mx-[1%] float-left p-6 border rounded-lg shadow-md hover:bg-gray-100 bg-crab-grey bg-cover border-gray-700 dark:hover:bg-gray-700">
                  <Link href="/de/geheimrezepte">
                    <a className="mb-2 text-2xl sm:text-4xl font-bold tracking-tight text-bright-orange hover:text-orange-500 duration-100 underline">
                      CardTest
                    </a>
                  </Link>
                  <div className="font-normal text-xl sm:text-3xl text-white w-[50%]">
                    <text className="w-full overflow-hidden">
                      Erkunde die verzaubernden, von Köchen erstellten
                      <Link href="/de/geheimrezepte">
                        <a className="text-bright-orange font-medium hover:text-orange-500  duration-100">
                          {" "}
                          Geheimrezepte{" "}
                        </a>
                      </Link>
                      von Secret Ingredients 🤫
                    </text>
                  </div>
                </div>
              </div>
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
