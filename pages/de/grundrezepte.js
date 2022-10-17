import React, { useEffect, useRef, useState } from "react"
import { Accordion, AccordionBody } from "@material-tailwind/react"
import { XCircleIcon } from "@heroicons/react/outline"
import RezeptComponent from "../../Components/RezeptComponent"
import tagData from "../../data/tagData"
import recipeData from "../../data/recipeData"
import axios from "axios"

function GrundRezepte() {
  const tags = tagData
  const recipes = recipeData
  const searchBar = useRef(null)
  const [openAccordion, setOpenAccordion] = useState(0)

  const [searchInput, setSearchInput] = useState("")
  const shownRecipes = useRef(recipes)
  const [chosenTags, setChosenTags] = useState([])
  const accordionComponent = useRef()
  const [kochzeit, setKochzeit] = useState(0)
  const [dbRecipes, setDbRecipes] = useState([])

  useEffect(() => {
    axios
      .post("http://localhost:3000/api/rezept-get", {
        column: "recipeType",
        index: "Grundrezept",
      })
      .then((res) => {
        setDbRecipes(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const massUncheck = () => {
    for (let index = 0; index < 20; index++) {
      let checkbox = document.getElementById(`tag ${index}`)
    }
  }

  const handleChange = (e) => {
    setKochzeit(e.target.value)
  }

  const openBySearchBar = () => {
    if (document.activeElement === searchBar.current) {
      let openAccordionObject = { ...openAccordion }
      openAccordionObject = 1
      setOpenAccordion(openAccordionObject)
    }
  }

  const emptySearchbar = () => {
    searchBar.current.value = ""
  }

  const handleTags = (event, tag) => {
    if (event.target.checked) {
      let array = [...chosenTags, tag]
      setChosenTags(array)
    } else if (!event.target.checked) {
      let array = [...chosenTags]
      array.splice(array.indexOf(tag), 1)
      setChosenTags(array)
    }
  }

  const fullOpen = () => {
    setOpenAccordion(1)
    setSearchInput("")
  }

  const closeAccordion = () => {
    setOpenAccordion(0)
    emptySearchbar()
    setChosenTags([])
    massUncheck()
  }

  useEffect(() => {
    const searchBar1 = document.getElementById("searchBar")
    searchBar1.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        setOpenAccordion(1)
      }
    })
  }, [])

  return (
    <div className="flex flex-col bg-dark-blue overflow-hidden">
      <div className="bg-[url('/media/Hero_Image.jpg')] bg-cover bg-center h-96 items-center justify-center flex flex-col">
        <div id="description" className="flex h-40 lg:h-32 w-screen pt-2">
          <div className="flex w-full h-full justify-center items-center">
            <div className="flex h-full w-full lg:w-full"></div>
            <p className="absolute font-medium text-center text-2xl lg:text-4xl text-white cursor-default"></p>
          </div>
        </div>
        <div
          id="search-bar"
          className="flex flex-col bg-opacity-90 rounded-3xl mx-2 lg:mx-0 bg-dark-blue h-3/6 2xl:h-2/6 lg:w-[50%] items-center px-2 justify-center pb-12 lg:py-10"
        >
          <div className="flex h-full w-5/6 lg:w-full justify-center items-center">
            <div className="flex space-x-1 lg:w-full lg:px-32 pt-12 lg:pt-0">
              <input
                ref={searchBar}
                id="searchBar"
                onClick={() => openBySearchBar()}
                onChange={(event) => {
                  setSearchInput(event.target.value)
                }}
                type="text"
                className="block w-full px-4 py-2 text-black bg-white border rounded-full focus:border-bright-orange focus:ring-bright-orange focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Search..."
              />
            </div>
          </div>
          <ul className="w-full space-x-2 py-2 lg:w-full h-full flex justify-center flex-1 flex-row flex-wrap">
            {tags.slice(0, 10).map((item, index) => (
              <li key={index}>
                <input
                  id={`tag ${item.id}`}
                  type="checkbox"
                  onClick={() => {
                    emptySearchbar()
                    setSearchInput("")
                    fullOpen()
                  }}
                  onChange={(event) => {
                    handleTags(event, item.name)
                  }}
                  className="hidden peer"
                ></input>
                <label
                  htmlFor={`tag ${item.id}`}
                  className="bg-bright-orange hover:bg-orange-500 peer-checked:translate-y-1 border peer-checked:border-sand-white peer-checked:bg-orange-500 hover:z-10 hover:translate-y-1 text-sm font-semibold inline-block py-1 px-2 rounded-full cursor-pointer text-white uppercase first:ml-4 last:mr-0 mr-4"
                >
                  {item.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Accordion
        className="bg-dark-blue-1 border-t border-bright-orange"
        ref={accordionComponent}
        open={openAccordion === 1}
      >
        <AccordionBody>
          <div className="flex justify-between py-10">
            <div className="w-full flex flex-col">
              <div className="w-full text-center">
                <p className="px-10 font-medium text-2xl text-sand-white pb-4">
                  Einfache unveränderte Grundrezepte
                </p>
              </div>
            </div>
            <button
              className="text-bright-orange h-14 w-14 mr-2 rounded-full items-center justify-center flex m-auto"
              onClick={() => closeAccordion()}
            >
              <XCircleIcon className="h-12 hover:h-11"></XCircleIcon>
            </button>
          </div>
          <div className="w-full flex flex-row md:mr-12 lg:mr-28 bg-[url('/media/cuttingBoardBackground.jpg')] bg-cover h-auto  pb-20">
            <div className="w-1/6 h-auto bg-white bg-opacity-80 text-black text-lg font-medium p-4">
              <div
                id="kategorien"
                className="p-4 text-black text-lg font-medium"
              >
                <div>
                  <h3>Kategorien: </h3>
                  <ul className="px-4 font-normal">
                    <li className="space-x-1 items-center flex">
                      <input id="input-1" type="checkbox" />
                      <label htmlFor="input-1">Vegan</label>
                    </li>
                    <li className="space-x-1 items-center flex">
                      <input id="input-1" type="checkbox" />
                      <label htmlFor="input-1">Vegetarisch</label>
                    </li>
                    <li className="space-x-1 items-center flex">
                      <input id="input-1" type="checkbox" />
                      <label htmlFor="input-1">Heiß</label>
                    </li>
                    <li className="space-x-1 items-center flex">
                      <input id="input-1" type="checkbox" />
                      <label htmlFor="input-1">Kalt</label>
                    </li>
                    <li className="space-x-1 items-center flex">
                      <input id="input-1" type="checkbox" />
                      <label htmlFor="input-1">Hack</label>
                    </li>
                  </ul>
                </div>
              </div>
              <div id="kochzeit" className="p-4">
                <h3>Kochzeit:</h3>

                <input
                  id="minmax-range"
                  type="range"
                  min="1"
                  max="10"
                  onChange={(e) => handleChange(e)}
                  value={kochzeit}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="w-full h-2">
                  <p></p>
                  <p></p>
                  <p></p>
                  <p></p>
                  <p></p>
                </div>
              </div>
              <div id="kochzeit" className="p-4 mb-20">
                <h3>Schwierigkeitsgrad:</h3>

                <select className="rounded-md">
                  <option>bitte wählen...</option>
                  <option>Einfach</option>
                  <option>Schwierig</option>
                  <option>Mittel</option>
                  <option>Meisterkoch</option>
                </select>
              </div>

              <div className="flex w-full items-center justify-center pt-10">
                <button className="border-2 w-full text-white text-lg border-bright-orange rounded-lg p-2 bg-dark-blue">
                  Anwenden
                </button>
              </div>
            </div>
            <div className="border-l w-5/6 border-black">
              <div className="flex flex-wrap w-full gap-x-8 gap-y-10 translate-y-10 justify-center ">
                {dbRecipes?.map((item, index) => (
                  <div key={index}>
                    <RezeptComponent item={item} index={index} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AccordionBody>
      </Accordion>

      <div
        id="popular-recipes"
        className="flex flex-col py-10 w-screen border-t border-bright-orange"
      >
        <div className="text-center ">
          <h3 className="text-sand-white font-medium text-3xl pb-6">
            Beliebte Rezepte
          </h3>
        </div>
      </div>
      <div
        id="new-recipes"
        className="flex flex-col py-10 w-screen border-t-2 border-bright-orange"
      >
        <div className="text-center ">
          <h3 className="text-sand-white font-medium text-3xl pb-6">
            Neue Rezepte
          </h3>
        </div>
        {/* desktop + tablet */}
        <div className="flex lg:flex-row flex-col lg:items-start items-center justify-center">
          {recipes.slice(0, 3).map((item, index) => (
            <div
              key={index}
              id="rezept-card"
              className="flex flex-col border border-opacity-10 hover:-translate-y-[2px] hover:-translate-x-[2px] shadow-md shadow-gray-500 dark:shadow-black border-gray-300 items-center w-5/6 my-2 p-1 rounded-lg lg:mx-7 group cursor-pointer hover:bg-gray-600 dark:hover:bg-dark-blue--1"
            >
              <div className="justify-center items-center h-max ">
                <img
                  className="rounded-xl"
                  src={item.image}
                  alt={item.id}
                ></img>
              </div>
              <div className="flex flex-col text-sand-white justify-center items-center h-16">
                <p>{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GrundRezepte
