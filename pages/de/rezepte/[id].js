import Image from "next/image"
import React, { useEffect, useState } from "react"

export const getStaticPaths = async () => {
  const res = await fetch(
    "https://secret-ingredients.vercel.app/api/rezepte/rezept-get",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "User-Agent": "" },
      body: JSON.stringify({
        call: "list-rezepte",
      }),
    }
  )
  const recipes = await res.json()

  const paths = recipes.map((recipe) => {
    return {
      params: { id: recipe.id.toString() },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  console.log(params)
  const res = await fetch(
    "https://secret-ingredients.vercel.app/api/rezepte/rezept-get",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "User-Agent": "" },
      body: JSON.stringify({
        call: "get-rezept",
        data: { id: parseInt(params.id) },
      }),
    }
  )
  const recipe = await res.json()

  return {
    props: {
      recipe: recipe,
    },
  }
}

export default function Recipe({ recipe }) {
  const [author, setAuthor] = useState("")
  const [steps, setSteps] = useState([])
  const [zutaten, setZutaten] = useState([])

  useEffect(() => {
    fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        call: "get-user-by-recipeId",
        data: { id: recipe.userId },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setAuthor(data)
      })
      .catch((err) => {
        alert(err)
      })
  }, [])

  useEffect(() => {
    fetch("/api/rezepte/zutaten-get", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        call: "get-rezept-zutaten",
        data: { id: recipe.id },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setZutaten(data)
      })
      .catch((err) => {
        alert(err)
      })
  }, [])

  useEffect(() => {
    fetch("/api/rezepte/steps-get", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        call: "get-rezept-steps",
        data: { id: recipe.id },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setSteps(data)
      })
      .catch((err) => {
        alert(err)
      })
  }, [])

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-5/6 p-10 flex flex-col justify-between">
        <div className="flex justify-center space-x-1 mb-20 text-white font-medium text-3xl">
          <h1 className="">{recipe.name}</h1> <p>von {author?.name}</p>
        </div>
        <div className="flex flex-row w-full space-x-5">
          <div>
            <Image src={recipe.image} width={"350px"} height={"256px"}></Image>
            <div className="flex flex-col space-y-10">
              <div className="flex flex-row space-x-2">
                <label htmlFor="zubereitungszeit">Zubereitungszeit:</label>
                <p id="zubereitungszeit" name="zubereitungszeit">
                  {recipe.zubereitungszeit}
                </p>
              </div>
              <div className="flex flex-row space-x-2">
                <label htmlFor="zubereitungszeit">portionen:</label>
                <p id="zubereitungszeit" name="zubereitungszeit">
                  {recipe.portionen}
                </p>
              </div>
              <div className="flex flex-row space-x-2">
                <label htmlFor="zubereitungszeit">schwierigkeitsgrad:</label>
                <p id="zubereitungszeit" name="zubereitungszeit">
                  {recipe.schwierigkeitsgrad}
                </p>
              </div>
              <div className="flex flex-row space-x-2">
                <label htmlFor="zubereitungszeit">benötigte utensilien:</label>
                <p id="zubereitungszeit" name="zubereitungszeit">
                  {recipe.utensilien}
                </p>
              </div>
              <div className="flex flex-row space-x-2">
                <label htmlFor="zubereitungszeit">quellen:</label>
                <p id="zubereitungszeit" name="zubereitungszeit">
                  {recipe.quellen}
                </p>
              </div>
              <div className="flex flex-row space-x-2">
                <label htmlFor="zubereitungszeit">Rezepttyp:</label>
                <p id="zubereitungszeit" name="zubereitungszeit">
                  {recipe.typ}
                </p>
              </div>
            </div>
          </div>
          <div>
            <h1>Schritte:</h1>
            {steps.map((step, index) => (
              <div key={index} className="flex flex-row space-x-4 my-10">
                <p>{step.nummer}: </p>
                <div className="flex flex-row space-x-4">
                  <p>{step.text} </p>

                  <Image src={step.image} width={100} height={100}></Image>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h1>Zutaten:</h1>
            {zutaten.map((zutat, index) => (
              <div key={index} className="flex flex-row space-x-4 my-10">
                <p>{zutat.name}: </p>
                <div className="flex flex-row space-x-4">
                  <p>
                    {zutat.menge} {zutat.einheit} {zutat.kommentar}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
