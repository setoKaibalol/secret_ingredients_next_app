import Image from "next/image"
import React, { useEffect, useState, useContext, useRef } from "react"
import StarBewertungComponent from "../../../Components/StarBewertungComponent"
import prisma from "../../../prisma/PrismaClient"
import Link from "next/link"
import { BiDish, BiDislike, BiLike, BiArrowBack } from "react-icons/bi"
import { GiRank1, GiRank2, GiRank3, GiCook, GiCookingPot } from "react-icons/gi"
import { FiClock, FiExternalLink } from "react-icons/fi"
import { AiFillEye } from "react-icons/ai"
import { BsChevronUp, BsArrow90DegDown } from "react-icons/bs"
import { CiForkAndKnife } from "react-icons/ci"
import { Disclosure } from "@headlessui/react"
import { useScrollTo, useScrollBy } from "react-use-window-scroll"

export async function getServerSideProps(context) {
  const { params } = context
  const rezept = await prisma.rezept.findUnique({
    where: {
      id: parseInt(params.id),
    },
    include: {
      kommentare: true,
      zutaten: true,
      steps: true,
      author: true,
      kategorie: true,
      like: true,
    },
  })

  return {
    props: {
      rezept: rezept,
    },
  }
}

export default function Recipe(props) {
  const recipe = props.rezept
  const zutaten = props.rezept.zutaten
  const steps = props.rezept.steps
  const author = props.rezept.author
  const kategorie = props.rezept.kategorie
  const kommentare = props.rezept.kommentare

  const schritteDiv = useRef(null)
  const zutatenDiv = useRef(null)
  const zutatenDivMobile = useRef(null)

  const scrollBy = useScrollBy()

  const handleLike = () => {}

  const handleScroll = (target) => {
    window.scrollTo({
      top: target.current.offsetTop - 48,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    fetch("/api/rezepte/rezept-update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        call: "inc-aufrufe",
        data: { recipeId: recipe.id },
      }),
    })
      .then((res) => res.json())
      .catch((err) => {
        alert(err)
      })
  }, [])

  return (
    <div className="w-full flex flex-col justify-center items-center p-3 sm:p-4 sm:space-y-5 bg-gray-400 bg-[url('/media/cuttingBoardBackground.jpg')] bg-contain">
      <div className="w-full 2xl:w-[90%] items-center hidden sm:flex flex-col py-2 space-y-2 bg-opacity-90 bg-dark-blue border border-bright-orange rounded-3xl">
        <div className="hidden md:flex w-full h-0">
          <Link href="/de/rezepte" className="">
            <a className="flex flex-row items-center text-lg p-6 text-white">
              <BiArrowBack className="w-10 h-10 "></BiArrowBack> zurück
            </a>
          </Link>
        </div>

        <h1 className="w-4/6 flex text-center justify-center font-medium lg:text-4xl text-sand-white underline">
          {recipe.name}
        </h1>
        <p className="text-gray-300 font-light text-lg">by {author.name}</p>
      </div>

      <div className="w-full 2xl:w-[90%] flex-col flex justify-between p-4 bg-opacity-90 bg-dark-blue border border-bright-orange rounded-3xl">
        <div className="w-full flex flex-col xl:flex-row xl:h-[66vh] lg:items-center">
          <div className="flex flex-col w-full xl:w-4/6">
            <div className="flex flex-row space-x-4 items-end justify-center sm:justify-start">
              <div className="sm:flex hidden w-full h-8 text-lg text-gray-300 font-light">
                Rezepte / {kategorie.name}
              </div>
              <div className="sm:hidden flex text-white text-xl font-medium w-4/5 text-center justify-center p-2 underline">
                {recipe.name}
              </div>
            </div>
            <div className="relative w-auto h-[250px] sm:h-[500px]">
              <Image
                src={recipe.image}
                objectFit={"cover"}
                layout="fill"
                placeholder="blur"
                blurDataURL={recipe.image}
                className="rounded-3xl"
                priority
              ></Image>
            </div>
            <div className="w-full h-10 items-start flex flex-col space-x-8 justify-center">
              <div className="flex flex-row space-x-8">
                <div className="flex flex-row space-x-1 items-center">
                  <AiFillEye className="text w-7 h-7"></AiFillEye>
                  <p className="text-sand-white">{recipe.aufrufe}</p>
                </div>
                <div className="flex flex-row space-x-2 items-center">
                  <StarBewertungComponent></StarBewertungComponent>
                </div>
              </div>
            </div>
            <div className="xl:hidden flex flex-row w-full space-x-10 pl-10 pt-10">
              <button
                onClick={() => handleScroll(schritteDiv)}
                className="flex flex-row space-x-2 items-start animate-bounce"
              >
                <BsArrow90DegDown className="w-8 h-8 text-lg font-medium text-bright-orange "></BsArrow90DegDown>
                <p className="text-sand-white font-medium text-lg">
                  Zu den Schritten
                </p>
              </button>
              <button
                onClick={() => {
                  window.screen.width >= 1280
                    ? handleScroll(zutatenDiv)
                    : handleScroll(zutatenDivMobile)
                }}
                className="flex flex-row space-x-2 items-start animate-bounce"
              >
                <BsArrow90DegDown className="w-8 h-8 text-lg font-medium text-bright-orange "></BsArrow90DegDown>
                <p className="text-sand-white font-medium text-lg">
                  Zu den Zutaten
                </p>
              </button>
            </div>
          </div>
          <div className="w-full xl:w-2/6 flex flex-col justify-between mt-4 xl:mt-20">
            <div className="flex flex-1 flex-wrap justify-center">
              <div className="flex items-center text-lg sm:text-xl flex-col w-40 sm:w-48 h-28">
                <p className="text-sand-white ">Portionen</p>
                <div className="flex flex-row items-center">
                  <p className="text-bright-orange font-medium ">
                    {recipe.portionen}
                  </p>

                  <BiDish className="w-8 h-8 text-gray-400"></BiDish>
                </div>
              </div>
              <div className="flex items-center flex-col lg sm:text-xl w-40 sm:w-48 h-28">
                <p className="text-sand-white ">Schwierigkeitsgrad</p>
                <div className="flex flex-row items-center">
                  <p className="text-bright-orange font-medium">
                    {recipe.schwierigkeitsgrad}
                  </p>
                  {recipe.schwierigkeitsgrad === "Einfach" ? (
                    <GiRank1 className="w-8 h-8 text-[#bf8970]"></GiRank1>
                  ) : recipe.schwierigkeitsgrad === "Mittel" ? (
                    <GiRank2 className="w-8 h-8 text-[#C0C0C0]"></GiRank2>
                  ) : recipe.schwierigkeitsgrad === "Schwierig" ? (
                    <GiRank3 className="w-8 h-8 text-[#D4AF37]"></GiRank3>
                  ) : (
                    <GiCook className="w-8 h-8 text-[#b7f1fd]"></GiCook>
                  )}
                </div>
              </div>
              <div className="flex items-center flex-col lg sm:text-xl w-40 sm:w-48 h-28">
                <p className="text-sand-white ">Zubereitungszeit</p>
                <div className="flex flex-row items-center space-x-1">
                  <p className="text-bright-orange font-medium">
                    {recipe.zubereitungszeit}
                  </p>
                  <FiClock className="w-8 h-8 text-gray-400"></FiClock>
                </div>
              </div>
              <div className="flex items-center lg sm:text-xl flex-col w-40 sm:w-48 h-28">
                <p className="text-sand-white ">Rezepttyp</p>
                <div className="flex flex-row items-center space-x-1">
                  <p className="text-bright-orange font-medium ">
                    {recipe.typ}
                  </p>
                </div>
              </div>
              <div className="flex items-center lg sm:text-xl flex-col w-40 sm:w-48 h-28">
                <p className="text-sand-white">Utensilien</p>
                <div className="flex flex-row items-center space-x-1">
                  <p className="text-bright-orange font-medium">
                    {recipe.utensilien}
                  </p>
                  <GiCookingPot className="w-8 h-8 text-gray-400"></GiCookingPot>
                </div>
              </div>
              <div className="flex items-center lg sm:text-xl flex-col w-40 sm:w-48 h-28">
                <p className="text-sand-white ">Links</p>
                <div className="flex flex-row items-center space-x-1">
                  <p className="text-bright-orange font-medium"></p>
                  <FiExternalLink className="w-8 h-8 text-bright-orange"></FiExternalLink>
                </div>
              </div>
            </div>
            <div className="hidden xl:flex flex-row w-full justify-between pl-10 pt-10">
              <button
                onClick={() => handleScroll(schritteDiv)}
                className="flex flex-row space-x-2 items-start animate-bounce"
              >
                <BsArrow90DegDown className="w-8 h-8 text-lg font-medium text-bright-orange "></BsArrow90DegDown>
                <p className="text-sand-white font-medium text-lg">
                  Zu den Schritten
                </p>
              </button>
              <button
                onClick={() => {
                  window.screen.width >= 1280
                    ? handleScroll(zutatenDiv)
                    : handleScroll(zutatenDivMobile)
                }}
                className="flex flex-row space-x-2 items-start animate-bounce"
              >
                <BsArrow90DegDown className="w-8 h-8 text-lg font-medium text-bright-orange "></BsArrow90DegDown>
                <p className="text-sand-white font-medium text-lg">
                  Zu den Zutaten
                </p>
              </button>
            </div>
          </div>
        </div>
        <div
          id="zutatenliste-mobile"
          className="xl:hidden flex w-full xl:w-3/6 shadow-xl h-auto p-8 rounded-xl"
          ref={zutatenDivMobile}
        >
          <div className="w-full h-20 mb-20">
            <div className="w-full pb-4  justify-center flex">
              <h2 className=" font-bold text-sand-white text-3xl ">
                Zutatenliste:
              </h2>
            </div>

            <ul className="list-disc divide-bright-orange xl:text-lg 2xl:w-[600px] text-black p-8 space-y-2 text-xl rounded-sm bg-cover bg-[url('https://img.freepik.com/fotos-premium/notizbuch-liniertes-papier-textur-hintergrund_35652-1381.jpg?w=2000')]">
              <div className="flex flex-row justify-between">
                <p className="w-1/3">Zutat:</p>
                <p className="w-1/3">Menge:</p>
                <p className="w-1/3">Kommentar:</p>
              </div>

              {zutaten.map((zutat, index) => (
                <li key={index} className="space-x-2">
                  <div className="flex flex-row w-full justify-between">
                    <h3 className="w-1/3">{zutat.name}</h3>
                    <h3 className="w-1/3">
                      {zutat.menge} {zutat.einheit}
                    </h3>
                    <h3 className="w-1/3">{zutat.kommentar}</h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full flex flex-col xl:flex-row mt-20 gap-x-5">
          <div
            ref={schritteDiv}
            className=" w-full xl:w-3/5 shadow-xl p-8 rounded-xl"
          >
            <div className="w-full justify-center flex pb-4">
              <h2 className="font-bold text-sand-white text-3xl ">Schritte:</h2>
            </div>
            <ul className="space-y-4">
              {steps.map((step, index) => (
                <li
                  className="rounded-md w-full border flex justify-start shadow-xl p-4 bg-[url('https://www.betterwood.de/wp-content/webpc-passthru.php?src=https://www.betterwood.de/wp-content/uploads/2021/02/Schneidebrett-Holz.jpg&nocache=1')]"
                  key={index}
                >
                  <div className="w-[70%] flex flex-row">
                    <div className="w-1/6 h-full">
                      <p className="text-2xl font-medium text-black">
                        {step.nummer}.
                      </p>
                    </div>
                    <div id="step-text" className="w-4/6">
                      <p className="text-lg border-[#D49B63] border-2 shadow-gray-800 shadow-inner font-medium text-black bg-[#D49B63] rounded-xl p-4">
                        {step.text}
                      </p>
                    </div>
                  </div>
                  <div
                    id="step-image"
                    className="w-52 rounded-lg border relative h-40"
                  >
                    <Image
                      className="rounded-lg"
                      src={step.image}
                      layout="fill"
                    ></Image>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div
            ref={zutatenDiv}
            className="hidden xl:flex w-full xl:w-2/5 shadow-xl h-auto p-8 rounded-xl"
          >
            <div className="w-full h-20 mb-20">
              <div className="w-full pb-4  justify-center flex">
                <h2 className=" font-bold text-sand-white text-3xl ">
                  Zutatenliste:
                </h2>
              </div>

              <ul className="list-disc divide-bright-orange xl:text-lg 2xl:w-[500px] text-black p-8 space-y-2 text-xl rounded-sm bg-top bg-cover lg:bg-[url('https://img.freepik.com/fotos-premium/notizbuch-liniertes-papier-textur-hintergrund_35652-1381.jpg?w=2000')]">
                <div className="flex flex-row justify-between">
                  <p className="w-1/3">Zutat:</p>
                  <p className="w-1/3">Menge:</p>
                </div>

                {zutaten.map((zutat, index) => (
                  <li key={index} className="space-x-2">
                    <div className="flex flex-row w-full justify-between">
                      <h3 className="w-1/3">{zutat.name}</h3>
                      <h3 className="w-1/3">
                        {zutat.menge} {zutat.einheit}
                      </h3>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="w-fullshadow-xl rounded-xl p-8">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="w-full flex flex-row justify-center items-center space-x-4 font-medium bg-dark-blue hover:bg-dark-blue-1 duration-200 bg-opacity-40 p-2 rounded-full">
                  <span className="text-sand-white text-xl">Kommentare</span>
                  <BsChevronUp
                    className={`${
                      !open ? "rotate-180 transform" : ""
                    } h-7 w-7 text-bright-orange duration-200`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  {kommentare.length < 1
                    ? "Sei der erste!"
                    : kommentare
                        .slice(0, 5)
                        .map((kommentar, index) => (
                          <div key={index}>{kommentar}</div>
                        ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <div className="flex mx-auto items-center justify-center mb-4 w-full px-1">
            <form className="w-full rounded-lg px-4 pt-2">
              <div className="flex flex-wrap -mx-3 mb-6" />

              <div className="w-full md:w-full px-3 mb-2 mt-2">
                <textarea
                  className="bg-gray-100 rounded border border-gray-400 resize-none w-full h-20 py-2 px-3 placeholder-gray-700 focus:outline-none focus:bg-white"
                  name="body"
                  placeholder="Schreib deinen Kommentar..."
                  required
                ></textarea>
              </div>
              <div className="w-full md:w-full flex items-start px-3">
                <div className="-mr-1">
                  <button className="w-full flex justify-center ">post</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
