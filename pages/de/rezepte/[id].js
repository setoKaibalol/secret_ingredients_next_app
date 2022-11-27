import Image from "next/image"
import React, { useEffect, useState, useContext } from "react"
import StarBewertungComponent from "../../../Components/StarBewertungComponent"
import prisma from "../../../prisma/PrismaClient"
import { BiDish, BiDislike, BiLike } from "react-icons/bi"
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

  const scrollBy = useScrollBy()

  const handleLike = () => {}

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
    <div className="w-full flex flex-col justify-center items-center p-5 space-y-5">
      <div className="w-5/6 items-center mt-6 flex flex-col px-20 py-2 space-y-2 justify-center bg-opacity-90 bg-dark-blue border border-bright-orange rounded-3xl">
        <h1 className="font-medium text-5xl text-sand-white underline">
          {recipe.name}
        </h1>
        <p className="text-gray-300 font-light text-lg">by {author.name}</p>
      </div>

      <div className="w-5/6 min-h-screen flex-col flex justify-between p-4 bg-opacity-90 bg-dark-blue border border-bright-orange rounded-3xl">
        <section className="w-full flex flex-row h-[74vh]">
          <div className="flex flex-col w-4/6">
            <div className="w-full h-8 text-lg text-gray-300 font-light">
              Rezepte / {kategorie.name}
            </div>
            <div className="relative w-auto h-[500px]">
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
            <div className="w-full h-14 items-start flex flex-col space-x-8 justify-center">
              <div className="flex flex-row space-x-8">
                <div className="flex flex-row space-x-1 items-center">
                  <AiFillEye className="text w-7 h-7"></AiFillEye>
                  <p className="text-sand-white">{recipe.aufrufe}</p>
                </div>
                <div className="flex flex-row space-x-2">
                  <StarBewertungComponent></StarBewertungComponent>
                </div>
              </div>
            </div>
          </div>
          <div className="w-2/6 min-h-[450px] flex flex-col justify-between mt-20">
            <div className="flex flex-col space-y-20">
              <div className="flex flex-row justify-evenly">
                <div className="flex items-center flex-col">
                  <p className="text-sand-white text-xl">Portionen:</p>
                  <div className="flex flex-row items-center">
                    <p className="text-bright-orange font-medium text-xl">
                      {recipe.portionen}
                    </p>

                    <BiDish className="w-8 h-8 text-gray-400"></BiDish>
                  </div>
                </div>
                <div className="flex items-center flex-col">
                  <p className="text-sand-white text-xl">Schwierigkeitsgrad:</p>
                  <div className="flex flex-row items-center">
                    <p className="text-bright-orange font-medium text-xl">
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
              </div>
              <div className="flex flex-row justify-evenly">
                <div className="flex items-center flex-col">
                  <p className="text-sand-white text-xl">Zubereitungszeit:</p>
                  <div className="flex flex-row items-center space-x-1">
                    <p className="text-bright-orange font-medium text-xl">
                      {recipe.zubereitungszeit}
                    </p>
                    <FiClock className="w-8 h-8 text-gray-400"></FiClock>
                  </div>
                </div>
                <div className="flex items-center flex-col">
                  <p className="text-sand-white text-xl">Rezepttyp:</p>
                  <div className="flex flex-row items-center space-x-1">
                    <p className="text-bright-orange font-medium text-xl">
                      {recipe.typ}
                    </p>
                    <CiForkAndKnife className="w-8 h-8 text-gray-400"></CiForkAndKnife>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-evenly">
                <div className="flex items-center flex-col">
                  <p className="text-sand-white text-xl">Utensilien:</p>
                  <div className="flex flex-row items-center space-x-1">
                    <p className="text-bright-orange font-medium text-xl">
                      {recipe.utensilien}
                    </p>
                    <GiCookingPot className="w-8 h-8 text-gray-400"></GiCookingPot>
                  </div>
                </div>
                <div className="flex items-center flex-col">
                  <p className="text-sand-white text-xl">Links:</p>
                  <div className="flex flex-row items-center space-x-1">
                    <p className="text-bright-orange font-medium text-xl"></p>
                    <FiExternalLink className="w-8 h-8 text-bright-orange"></FiExternalLink>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row w-full justify-between pl-10">
              <button
                onClick={() => scrollBy({ top: 1230, behavior: "smooth" })}
                className="flex flex-row space-x-2 items-start animate-bounce"
              >
                <BsArrow90DegDown className="w-8 h-8 text-lg font-medium text-bright-orange "></BsArrow90DegDown>
                <p className="text-sand-white font-medium text-lg">
                  Zu den Schritten
                </p>
              </button>
              <button
                onClick={() => scrollBy({ top: 850, behavior: "smooth" })}
                className="flex flex-row space-x-2 items-start animate-bounce"
              >
                <BsArrow90DegDown className="w-8 h-8 text-lg font-medium text-bright-orange "></BsArrow90DegDown>
                <p className="text-sand-white font-medium text-lg">
                  Zu den Zutaten
                </p>
              </button>
            </div>
          </div>
        </section>
        <section className="w-full flex flex-row mt-20 gap-x-20">
          <div className="w-4/6 shadow-xl p-8 rounded-xl">
            <div className="w-full pb-4  justify-center flex">
              <h2 className="font-medium text-sand-white text-xl underline">
                Schritte:
              </h2>
            </div>
            <section className="">
              <ul>
                {steps.map((step, index) => (
                  <li
                    className="w-full flex justify-start shadow-xl mt-20 p-8"
                    key={index}
                  >
                    <div className="w-[70%] flex flex-row">
                      <div className="w-1/6 h-full">
                        <p className="text-2xl font-medium text-sand-white">
                          {step.nummer}.
                        </p>
                      </div>
                      <div id="step-text" className="w-3/6">
                        <p className="text-2xl font-medium text-sand-white">
                          {step.text}
                        </p>
                      </div>
                    </div>
                    <div
                      id="step-image"
                      className="w-[30%] rounded-lg border relative h-40"
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
            </section>
          </div>
          <div className="w-2/6 shadow-xl h-auto p-8 rounded-xl">
            <div className="w-full h-20 mb-20">
              <div className="w-full pb-4  justify-center flex">
                <h2 className="font-medium text-sand-white text-xl underline">
                  Zutatenliste:
                </h2>
              </div>

              <ul className="list-disc divide-bright-orange text-sand-white space-y-2 text-xl divide-y-2">
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
        </section>
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
                        .map((kommentar, index) => <div>{kommentar}</div>)}
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
