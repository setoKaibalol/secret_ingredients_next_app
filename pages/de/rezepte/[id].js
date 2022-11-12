import Image from "next/image"
import React, { useEffect, useState, useContext } from "react"
import axios from "axios"
import prisma from "../../../prisma/PrismaClient"

export async function getServerSideProps(context) {
  const { params } = context
  console.log(params)
  const rezept = await prisma.rezept.findUnique({
    where: {
      id: parseInt(params.id),
    },
    include: {
      kommentare: true,
      zutaten: true,
      steps: true,
      author: true,
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
  console.log(props)

  return (
    <div className="w-full flex flex-col justify-center items-center p-5">
      <div className="w-4/6 border border-black min-h-screen">
        <div className="relative w-auto h-[500px] border border-black">
          <Image
            src={recipe.image}
            objectFit={"cover"}
            layout="fill"
            className="rounded-full"
          ></Image>
        </div>

        <div></div>
      </div>
    </div>
  )
}
