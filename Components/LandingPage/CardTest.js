import Link from "next/link"
import React from "react"

function CardTest(props) {
  return (
    <div className="block w-[16%]  mx-[2%] sm:w-[18%] sm:mx-[1%] float-left p-6 border rounded-lg shadow-md hover:bg-gray-100 bg-crab-grey bg-cover border-gray-700 dark:hover:bg-gray-700">
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
  )
}

export default CardTest
