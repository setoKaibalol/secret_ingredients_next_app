import React from "react"
import {
  HeartIcon,
  ShareIcon,
  ThumbUpIcon,
  ThumbDownIcon,
  XIcon,
} from "@heroicons/react/outline"
import { useSession } from "next-auth/react"
import Image from "next/image"

function RezeptComponent({ item, index, reloadRecipes, setReloadRecipes }) {
  const { data: session } = useSession()
  console.log(item)
  const deleteRecipe = (itemId) => {
    fetch("../api/rezept-delete", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        call: "delete-recipe",
        data: { recipeId: itemId },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setReloadRecipes(!reloadRecipes)
      })
      .catch((err) => {
        alert(err)
      })
  }

  return (
    <div
      id="rezept-card"
      className="h-[540px] w-5/6 md:w-[350px] flex flex-col shadow-lg shadow-black border-black border items-center rounded-lg group bg-dark-blue bg-opacity-90"
    >
      {session ? (
        <div className="w-full flex justify-end">
          <button
            onClick={() => {
              deleteRecipe(item.id)
            }}
            className="absolute z-50"
          >
            <XIcon className="h-12 w-12 hover:-translate-y-[1px]  text-black hover:text-gray-800"></XIcon>
          </button>
        </div>
      ) : (
        ""
      )}
      <div
        id="rezept-card-body"
        className="flex justify-center w-full items-center"
      >
        <Image
          className="z-20 object-cover w-full h-64 rounded-md rounded-b-none"
          src={item.image}
          alt={`item ${item.id}`}
          width={"350px"}
          height={"256px"}
        ></Image>
      </div>
      <div className="w-full flex p-1 px-3">
        <div className="justify-start flex w-2/6 text-bright-orange space-x-2">
          <div className="flex-row flex justify-center items-center text-center text-lg">
            <button>
              <ThumbUpIcon className="h-7"></ThumbUpIcon>
            </button>
            <p>{item.likes}</p>
          </div>
          <div className="flex-row flex justify-center items-center text-center text-lg">
            <button>
              <ThumbDownIcon className="h-7"></ThumbDownIcon>
            </button>
            <p>{item.dislikes}</p>
          </div>
        </div>
        <div className="w-4/6 flex justify-center items-center">
          <div className="w-full bg-red-500 h-1">
            <div className="bg-green-500 h-1" style={{ width: "50%" }}></div>
          </div>
        </div>
      </div>
      <div className="text-white text-md font-medium">
        <p className="text-xl">{item.name}</p>
      </div>
      <div id="rezept-card-footer" className="flex flex-col w-full">
        <div className="flex flex-col border-b border-bright-orange text-white text-center items-center h-16 w-full pl-4 overflow-y-scroll overflow-x-hidden"></div>
        <div className="flex flex-row w-full">
          <div className="text-white mt-2 ml-2 w-3/6">
            <p>Fett:</p>
            <p>Kohlenhydrate:</p>
            <p>Zucker:</p>
            <p>Eiweiß:</p>
          </div>
          <div className="flex flex-col w-3/6 h-full text-white mt-2 ml-4 justify-between">
            <p>800 Kalorien</p>
            <div className="mb-1">
              <p>Likes: {item.likes}</p>
              <p>Shares:</p>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-start my-2 space-x-1 text-white">
          <div className="flex w-3/6 ml-2">
            <HeartIcon className="w-10 text-bright-orange hover:bg-cyan-900 p-1 cursor-pointer rounded-full"></HeartIcon>
            <ShareIcon className="w-10 text-bright-orange hover:bg-cyan-900 p-1 cursor-pointer rounded-full"></ShareIcon>
          </div>
          <div className="flex w-3/6 justify-end">
            <button className="border border-bright-orange mr-2 px-2 text-md text-white bg-bright-orange hover:bg-orange-400 hover:-translate-x-[0.5px] hover:-translate-y-[0.5px]  rounded-md font-medium">
              Zum Rezept
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RezeptComponent
