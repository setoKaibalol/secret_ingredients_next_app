import React, { useRef } from "react"
import { ArrowDownIcon, ArrowCircleDownIcon } from "@heroicons/react/outline"
import Link from "next/link"

function Main() {
  const handleScroll = () => {
    window.scrollTo({ top: whyUsSection.current.offsetTop, behavior: "smooth" })
  }

  const heroSection = useRef(null)
  const whyUsSection = useRef(null)
  const faqSection = useRef(null)
  const language = "de"

  return language === "de" ? (
    <div className="font-Poppins overflow-hidden bg-gray-50 dark:bg-gray-800 text-lg dark:text-gray-300 scroll-smooth">
      <div className="bg-[url('/media/Hero_Image.jpg')] bg-cover bg-center h-[94vh]">
        <section
          ref={heroSection}
          className="flex flex-col-reverse text-lg dark:text-gray-300 h-full border-b-2 items-center"
        >
          <div className="flex">
            <button className="h-12 w-12 m-20" onClick={handleScroll}>
              <ArrowCircleDownIcon className="text-bright-orange animate-bounce"></ArrowCircleDownIcon>
            </button>
          </div>
        </section>
      </div>
      <section
        ref={whyUsSection}
        className=" pt-28 pb-20 mt-20 lg:mt-28 bg-gray-50 dark:bg-gray-800 text-lg dark:text-gray-300"
      >
        <div className="sm:w-3/4 lg:w-5/12 mx-auto px-2">
          <h1 className="text-3xl text-center ">Unsere Mission:</h1>
          <p className="text-center text-bookmark-grey mt-4">
            Unser Ziel ist es, die komplexe und manchmal abschreckend wirkende
            Krypto/Blockchain-Welt für jedermann zugänglich zu machen. Wir
            glauben, dass man für ein optimales Unternehmen die beste und
            effektivste Technologie nutzen muss, die es gibt. Die
            Blockchain-Technologie ermöglicht ein unvergleichliches Maß an
            Automatisierung und Verwaltung, das es so noch nie gegeben hat.
            Lassen Sie uns Ihnen helfen, diese Technologie für{" "}
            <strong className="dark:text-gray-300">IHR</strong> Unternehmen zu
            nutzen.
          </p>
        </div>
        <div className="relative mt-20 lg:mt-36">
          <div className="container flex flex-col lg:flex-row items-center justify-center gap-x-24">
            <div className="flex flex-1 justify-center z-10 mb-10 lg:-mb-24">
              <img
                className="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full"
                src={""}
                alt=""
              />
            </div>

            <div className="flex flex-1 flex-col items-center lg:items-start">
              <h1 className=" text-3xl md:text-4 lg:text-5xl text-center lg:text-left mb-6">
                Innovation
              </h1>
              <p className="text-bookmark-grey text-lg text-center lg:text-left mb-6">
                Blockchain-Lösungen für Mitgliedschaftsprogramme, Management,
                Tokenisierung von Vermögenswerten und was immer Sie sich
                vorstellen!
              </p>

              <Link
                href="/de/loesungen"
                className=" cursor-pointer btn btn-purple hover:bg-bookmark-white hover:text-black"
              >
                weiter lesen
              </Link>
            </div>
          </div>
          <div
            className="
          hidden
          lg:block
          overflow-hidden
          bg-blue-600
          rounded-r-full
          absolute
          h-80
          w-2/4
          -bottom-24
          -left-36
        "
          ></div>
        </div>
        <div className="relative mt-20 lg:mt-52">
          <div className="container flex flex-col lg:flex-row-reverse items-center justify-center gap-x-24">
            <div className="flex flex-1 justify-center z-10 mb-10 lg:mb-0">
              <img
                className="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full lg:-mr-44 lg:mt-20 lg:-mb-8"
                src={""}
                alt=""
              />
            </div>
            <div className="flex flex-1 flex-col items-center lg:items-start">
              <h1 className=" text-3xl md:text-4 lg:text-5xl text-center lg:text-left mb-6">
                Wachstum
              </h1>
              <p className="text-bookmark-grey my-4 text-center lg:text-left sm:w-3/4 lg:w-full">
                Planung, Organisation, Umsetzung und Integration in Ihr
                Unternehmen, lassen Sie sich von unseren Blockchain-Experten auf
                dem gesamten Weg begleiten!
              </p>
              <Link
                href="/de/team"
                className=" cursor-pointer btn btn-purple hover:bg-bookmark-white hover:text-black"
              >
                Unser Team
              </Link>
            </div>
          </div>
          <div
            className="
          hidden
          lg:block
          overflow-hidden
          bg-blue-600
          rounded-l-full
          absolute
          h-80
          w-2/4
          -bottom-24
          -right-36
        "
          ></div>
        </div>
        <div className="relative mt-20 lg:mt-52">
          <div className="container flex flex-col lg:flex-row items-center justify-center gap-x-24">
            <div className="flex flex-1 justify-center z-10 mb-10 lg:mb-0">
              <img
                className="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full"
                src={""}
                alt=""
              />
            </div>
            <div className="flex flex-1 flex-col items-center lg:items-start">
              <h1 className="text-3xl md:text-4 lg:text-5xl text-center lg:text-left mb-6">
                Erfolg
              </h1>
              <p className="text-bookmark-grey my-4 text-center lg:text-left sm:w-3/4 lg:w-full">
                {" "}
                Bringen Sie Ihr Unternehmen auf die nächste Stufe und rüsten Sie
                sich für das kommende Web3-Zeitalter.
              </p>
              <Link
                href="/de/info"
                type="button"
                className="btn btn-purple hover:bg-bookmark-white hover:text-black"
              >
                Mehr Infos
              </Link>
            </div>
          </div>
          <div
            className="
          hidden
          lg:block
          overflow-hidden
          bg-blue-600
          rounded-r-full
          absolute
          h-80
          w-2/4
          -bottom-24
          -left-36
        "
          ></div>
        </div>
      </section>

      <section className="py-20 mt-20 bg-gray-50 dark:bg-gray-800 text-lg dark:text-gray-300">
        <div className="sm:w-3/4 lg:w-5/12 mx-auto px-2">
          <h1 className="text-3xl text-center ">Download the extension</h1>
          <p className="text-center text-bookmark-grey mt-4">
            We’ve got more browsers in the pipeline. Please do let us know if
            you’ve got a favourite you’d like us to prioritize.
          </p>
        </div>
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-screen-lg mt-16">
          <div className="flex flex-col rounded-md shadow-md lg:mb-16">
            <div className="p-6 flex flex-col items-center">
              <img src={""} alt="" />
              <h3 className="mt-5 mb-2  text-lg">Add to Chrome</h3>
              <p className="mb-2 text-bookmark-grey font-light">
                Minimum version 62
              </p>
            </div>
            <hr className="border-b border-bookmark-white" />
            <div className="flex p-6">
              <button
                type="button"
                className="flex-1 btn btn-purple hover:bg-bookmark-white hover:text-black"
              >
                Add & Install Extension
              </button>
            </div>
          </div>
          <div className="flex flex-col rounded-md shadow-md lg:my-8">
            <div className="p-6 flex flex-col items-center">
              <img src={""} alt="" />
              <h3 className="mt-5 mb-2 text-lg">Add to Firefox</h3>
              <p className="mb-2 text-bookmark-grey font-light">
                Minimum version 62
              </p>
            </div>
            <hr className="border-b border-bookmark-white" />
            <div className="flex p-6">
              <button
                type="button"
                className="flex-1 btn btn-purple hover:bg-bookmark-white hover:text-black"
              >
                Add & Install Extension
              </button>
            </div>
          </div>
          <div className="flex flex-col rounded-md shadow-md lg:mt-16">
            <div className="p-6 flex flex-col items-center">
              <img src={""} alt="" />
              <h3 className="mt-5 mb-2 text-lg">Add to Opera</h3>
              <p className="mb-2 text-bookmark-grey font-light">
                Minimum version 62
              </p>
            </div>
            <hr className="border-b border-bookmark-white" />
            <div className="flex p-6">
              <button
                type="button"
                className="flex-1 btn btn-purple hover:bg-bookmark-white hover:text-black"
              >
                Add & Install Extension
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={faqSection}
        className="py-20 bg-gray-50 dark:bg-gray-800 text-lg dark:text-gray-300"
      >
        <div className="container">
          <div className="sm:w-3/4 lg:w-5/12 mx-auto px-2">
            <h1 className="text-3xl text-center ">
              Frequently Asked Questions
            </h1>
            <p className="text-center text-bookmark-grey mt-4">
              Here are some of our FAQs. If you have any other questions you’d
              like answered please feel free to email us.
            </p>
          </div>
          <div className="flex flex-col sm:w-3/4 lg:w-5/12 mt-12 mx-auto">
            <div className="flex items-center border-b py-4">
              <span className="flex-1">What is blockchain?</span>
              <i className="text-bookmark-purple fas fa-chevron-down"></i>
            </div>
            <div className="flex items-center border-b py-4">
              <span className="flex-1">What is an NFT?</span>
              <i className="text-bookmark-purple fas fa-chevron-down"></i>
            </div>
            <div className="flex items-center border-b py-4">
              <span className="flex-1">Is there a mobile app?</span>
              <i className="text-bookmark-purple fas fa-chevron-down"></i>
            </div>
            <div className="flex items-center border-b py-4">
              <span className="flex-1">
                What about other Chromium browsers?
              </span>
              <i className="text-bookmark-purple fas fa-chevron-down"></i>
            </div>
            <button
              type="button"
              className="mt-12 flex self-center btn btn-purple hover:bg-bookmark-white hover:text-black"
            >
              More Info
            </button>
          </div>
        </div>
      </section>

      <section className="bg-blue-600 text-white py-20">
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
