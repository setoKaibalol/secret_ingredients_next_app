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
import { AiFillYoutube, AiFillInstagram } from "react-icons/ai"
import { Disclosure, Transition } from "@headlessui/react"
import { useScrollTo, useScrollBy } from "react-use-window-scroll"
import { useSession } from "next-auth/react"
import AppContext from "../../../helpers/AppContext"
import MoonLoader from "react-spinners/MoonLoader"

export async function getServerSideProps(context) {
  const { params } = context
  const rezept = await prisma.rezept.findUnique({
    where: {
      id: parseInt(params.id),
    },
    include: {
      kommentare: {
        include: {
          author: true,
        },
      },
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
  const { data: session, status: status } = useSession()
  const [rezepte, setRezepte, user, setUser, kategorien, setKategorien] =
    useContext(AppContext)

  const recipe = props.rezept
  const zutaten = props.rezept.zutaten
  const steps = props.rezept.steps
  const author = props.rezept.author
  const kategorie = props.rezept.kategorie
  const kommentare = props.rezept.kommentare
  console.log(kommentare)
  const schritteDiv = useRef(null)
  const zutatenDiv = useRef(null)
  const zutatenDivMobile = useRef(null)

  const [comment, setComment] = useState("")
  const [commentStatus, setCommentStatus] = useState("init")

  const handleScroll = (target) => {
    window.scrollTo({
      top: target.current.offsetTop - 48,
      behavior: "smooth",
    })
  }

  const handlePostComment = (e) => {
    setCommentStatus("loading")
    e.preventDefault()
    if (user)
      fetch("/api/rezepte/rezept-update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          call: "post-comment",
          data: { recipeId: recipe.id, comment: comment, userId: user.id },
        }),
      })
        .then((res) => {
          res.json()
          setCommentStatus("successful")
          setTimeout(() => {
            setCommentStatus("init")
          }, 1000)
        })
        .catch((err) => {
          alert(err)
        })
    else {
      alert("Please Login")
    }
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

  useEffect(() => {
    if (session && !user) {
      fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          call: "get-user",
          data: { email: session.user.email },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data)
        })
        .catch((err) => {
          alert(err)
        })
    }
  }, [session])

  return (
    <div className="w-full flex flex-col justify-center items-center p-2 sm:p-4 sm:space-y-5 bg-gray-400 bg-[url('/media/cuttingBoardBackground.jpg')] bg-contain">
      <div className="w-full 2xl:w-[90%] items-center hidden sm:flex flex-col py-2 space-y-2 bg-opacity-90 bg-dark-blue border border-bright-orange rounded-3xl">
        <div className="hidden md:flex w-full h-0">
          <Link href="/de/rezepte" className="">
            <a className="flex flex-row items-center text-lg p-6 text-white">
              <BiArrowBack className="w-10 h-10 "></BiArrowBack> zurück
            </a>
          </Link>
        </div>

        <h1
          id="desktop"
          className="w-4/6 flex text-center justify-center font-medium lg:text-4xl text-sand-white underline"
        >
          {recipe.name}
        </h1>
        <p className="text-gray-300 font-light text-lg">by {author.name}</p>
      </div>

      <div className="w-full 2xl:w-[90%] flex-col flex justify-between px-4 bg-opacity-90 bg-dark-blue border border-bright-orange rounded-md sm:rounded-3xl">
        <div className="w-full flex flex-col xl:flex-row lg:items-center">
          <div className="flex flex-col w-full xl:w-4/6 ">
            <div className="flex flex-row items-end justify-center sm:justify-start">
              <div className="sm:flex hidden w-full h-8 text-lg text-gray-300 font-light pl-4">
                Rezepte / {kategorie.name}
              </div>
              <div
                id="mobile"
                className="sm:hidden flex h-[66px] text-white text-lg font-medium max-w-[72%] text-center justify-center pb-2 underline"
              >
                {recipe.name}
              </div>
            </div>
            <div className="relative w-auto h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
              <Image
                src={recipe.image}
                objectFit={"cover"}
                layout="fill"
                placeholder="blur"
                blurDataURL={recipe.image}
                className="rounded-md sm:rounded-3xl"
                priority
              ></Image>
            </div>
            <div className="sm:pl-4 w-full h-16 sm:items-start flex flex-col justify-center items-center">
              <div className="flex flex-row flex-wrap space-x-2">
                <div className="flex flex-row  items-center">
                  <AiFillEye className="text w-7 h-7"></AiFillEye>
                  <p className="text-sand-white">{recipe.aufrufe}</p>
                </div>
                <div className="flex flex-row items-center">
                  <StarBewertungComponent></StarBewertungComponent>
                </div>
                {recipe.instagram ? (
                  <a href={recipe.instagram}>
                    <AiFillInstagram className="w-9 h-9 text-purple-600 cursor-pointer hover:text-purple-500 duration-200"></AiFillInstagram>
                  </a>
                ) : (
                  ""
                )}
                {recipe.youtube ? (
                  <a href={recipe.youtube}>
                    <AiFillYoutube className="w-9 h-9 text-red-600 cursor-pointer hover:text-red-500 duration-200"></AiFillYoutube>
                  </a>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="w-full xl:min-h-[60vh] xl:w-2/6 flex flex-col justify-between mt-4 xl:mt-20">
            <div className="flex flex-1 flex-wrap justify-center">
              <div className="flex items-center text-lg sm:text-xl flex-col w-40 sm:w-48 h-20">
                <p className="text-sand-white ">Portionen</p>
                <div className="flex flex-row items-center">
                  <p className="text-bright-orange font-medium ">
                    {recipe.portionen}
                  </p>

                  <BiDish className="w-8 h-8 text-gray-400"></BiDish>
                </div>
              </div>
              <div className="flex items-center flex-col lg sm:text-xl w-40 sm:w-48 h-20 ">
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
              <div className="flex items-center flex-col lg sm:text-xl w-40 sm:w-48 h-20 ">
                <p className="text-sand-white ">Zubereitungszeit</p>
                <div className="flex flex-row items-center space-x-1">
                  <p className="text-bright-orange font-medium">
                    {recipe.zubereitungszeit}
                  </p>
                  <FiClock className="w-8 h-8 text-gray-400"></FiClock>
                </div>
              </div>
              <div className="flex items-center lg sm:text-xl flex-col w-40 sm:w-48 h-20">
                <p className="text-sand-white ">Rezepttyp</p>
                <div className="flex flex-row items-center space-x-1">
                  <p className="text-bright-orange font-medium ">
                    {recipe.typ}
                  </p>
                </div>
              </div>
              <div className="flex items-center lg sm:text-xl flex-col w-40 sm:w-48 h-20">
                <p className="text-sand-white">Utensilien</p>
                <div className="flex flex-row items-center space-x-1">
                  <p className="text-bright-orange font-medium">
                    {recipe.utensilien}
                  </p>
                  <GiCookingPot className="w-8 h-8 text-gray-400"></GiCookingPot>
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
          className="xl:hidden flex w-full xl:w-3/6 shadow-xl sm:p-8 rounded-xl mb-40"
          ref={zutatenDivMobile}
        >
          <div className="w-full h-20">
            <div className="w-full pb-4  justify-center flex">
              <h2 className=" font-bold text-sand-white text-3xl ">
                Zutatenliste:
              </h2>
            </div>

            <ul className="list-disc divide-bright-orange xl:text-lg 2xl:w-[600px] text-black p-8 space-y-2 text-xl rounded-sm bg-cover bg-[url('https://img.freepik.com/fotos-premium/notizbuch-liniertes-papier-textur-hintergrund_35652-1381.jpg?w=2000')]">
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
        <div className="w-full flex flex-col xl:flex-row mt-20 gap-x-5">
          <div
            ref={schritteDiv}
            className=" w-full xl:w-3/5 shadow-xl sm:p-8 rounded-xl"
          >
            <div className="w-full justify-center flex pb-4">
              <h2 className="font-bold text-sand-white text-3xl pt-10 sm:pt-0">
                Schritte:
              </h2>
            </div>
            <ul className="space-y-4">
              {steps.map((step, index) => (
                <li
                  className="rounded-md w-full border flex justify-start shadow-xl p-4 bg-cover bg-[url('https://www.betterwood.de/wp-content/webpc-passthru.php?src=https://www.betterwood.de/wp-content/uploads/2021/02/Schneidebrett-Holz.jpg&nocache=1')]"
                  key={index}
                >
                  <div
                    id="desktop"
                    className="hidden md:flex flex-row justify-between w-full"
                  >
                    <div className="w-[70%] flex flex-row">
                      <div className="w-1/6 h-full">
                        <p className="text-2xl font-medium bg-white bg-opacity-10 text-black w-min p-4 rounded-xl shadow-gray-800 shadow-inner">
                          {step.nummer}.
                        </p>
                      </div>
                      <div id="step-text" className="w-4/6">
                        <p className="text-lg bg-white bg-opacity-10 shadow-gray-800 shadow-inner font-medium text-black rounded-xl p-4">
                          {step.text}
                        </p>
                      </div>
                    </div>
                    <div
                      id="step-image"
                      className="w-52 rounded-lg border flex relative h-40"
                    >
                      <Image
                        className="rounded-lg"
                        src={step.image}
                        layout="fill"
                        placeholder="blur"
                        blurDataURL={step.image}
                      ></Image>
                    </div>
                  </div>
                  <div
                    id="mobile"
                    className="flex md:hidden flex-row justify-between w-full"
                  >
                    <div className="w-full flex flex-col space-y-4">
                      <div
                        id="step-image"
                        className="w-full rounded-lg border flex relative h-40 "
                      >
                        <div className="w-1/6 h-full absolute z-20">
                          <p className="text-2xl font-medium bg-white bg-opacity-40 text-black w-min p-4  rounded-lg shadow-gray-800 shadow-inner">
                            {step.nummer}.
                          </p>
                        </div>

                        <Image
                          className="rounded-lg"
                          src={step.image}
                          layout="fill"
                          sizes="(max-width: 768px) 100vw,
                                  (max-width: 1200px) 50vw,
                                  33vw"
                        ></Image>
                      </div>

                      <div id="step-text" className="w-full">
                        <p className="text-lg bg-white bg-opacity-10 shadow-gray-800 shadow-inner font-medium text-black rounded-xl p-4">
                          {step.text}
                        </p>
                      </div>
                    </div>
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
        <div className="w-full shadow-xl rounded-xl pt-10">
          <Disclosure className="w-full">
            {({ open }) => (
              <div className="w-full">
                <Disclosure.Button className="w-full flex flex-row justify-center items-center space-x-4 font-medium bg-dark-blue hover:bg-dark-blue-1 duration-200 bg-opacity-40 p-2 rounded-full">
                  <span className="text-sand-white text-xl">Kommentare</span>
                  <BsChevronUp
                    className={`${
                      !open ? "rotate-180 transform" : ""
                    } h-7 w-7 text-bright-orange duration-200`}
                  />
                </Disclosure.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500">
                    <ul className="flex flex-col w-full">
                      {kommentare.length < 1
                        ? "Sei der erste!"
                        : kommentare.slice(0, 5).map((kommentar, index) => (
                            <li key={index} className="my-4">
                              <div className="w-1/6 p-1">
                                <div className="relative h-8 w-8 ">
                                  <Image
                                    layout="fill"
                                    src={kommentar.author.image}
                                    className="rounded-full"
                                  ></Image>
                                </div>
                              </div>
                              <div className="w-full p-4 bg-white text-black font-medium border rounded-md">
                                {kommentar.text}
                              </div>
                            </li>
                          ))}
                    </ul>
                  </Disclosure.Panel>
                </Transition>
              </div>
            )}
          </Disclosure>
          <div className="flex items-center justify-center mb-4 w-full">
            <form
              onSubmit={handlePostComment}
              className="w-full rounded-lg pt-2"
            >
              <div className="w-full md:w-full mb-2 mt-2">
                <textarea
                  className="bg-gray-100 rounded border border-gray-400 resize-none w-full h-20 py-2 px-3 placeholder-gray-700 focus:outline-none focus:bg-white"
                  name="body"
                  placeholder="Schreib deinen Kommentar..."
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
              <div className="w-full md:w-full flex items-start px-3">
                <div className="w-full flex justify-center">
                  <button
                    type="submit"
                    className="w-full hover:text-white max-w-sm font-medium text-md p-2 bg-bright-orange hover:bg-orange-600 rounded-full duration-200 flex justify-center"
                  >
                    {commentStatus === "init" ? (
                      "POST"
                    ) : commentStatus === "loading" ? (
                      <MoonLoader size={19} color="black"></MoonLoader>
                    ) : commentStatus === "successful" ? (
                      "Postet! 😀"
                    ) : (
                      "POST"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
