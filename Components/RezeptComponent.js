import React from "react"
import {
  HeartIcon,
  ShareIcon,
  ThumbUpIcon,
  ThumbDownIcon,
} from "@heroicons/react/outline"

function RezeptComponent(item, index) {
  console.log(item)
  return (
    <div
      id="rezept-card"
      className="h-[520px] w-5/6 md:w-[350px] flex flex-col shadow-lg shadow-black border-black border items-center rounded-lg group bg-dark-blue bg-opacity-90"
    >
      <div
        id="rezept-card-body"
        className="flex justify-center w-full items-center"
      >
        <img
          className="object-cover w-full h-64 rounded-md rounded-b-none"
          src={item.item.recipeImage}
          alt={`item ${item.item.recipeId}`}
        ></img>
      </div>
      <div className="w-full flex p-1 px-3">
        <div className="justify-start flex w-2/6 text-bright-orange space-x-2">
          <div className="flex-row flex justify-center items-center text-center text-lg">
            <button>
              <ThumbUpIcon className="h-7"></ThumbUpIcon>
            </button>
            <p>5</p>
          </div>
          <div className="flex-row flex justify-center items-center text-center text-lg">
            <button>
              <ThumbDownIcon className="h-7"></ThumbDownIcon>
            </button>
            <p>1</p>
          </div>
        </div>
        <div className="w-4/6 flex justify-center items-center">
          <div className="w-full bg-red-500 h-1">
            <div className="bg-green-500 h-1" style={{ width: "95%" }}></div>
          </div>
        </div>
      </div>
      <div className="text-white text-md font-medium">
        <p>{item.item.recipeName}</p>
      </div>
      <div id="rezept-card-footer" className="flex flex-col h-60 w-full">
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
              <p>Likes:</p>
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
