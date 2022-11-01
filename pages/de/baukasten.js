import React, { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"
import { Disclosure } from "@headlessui/react"
import {
  XIcon,
  PlusIcon,
  MinusIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CloudDownloadIcon,
  CloudUploadIcon,
} from "@heroicons/react/outline"
import { useSession } from "next-auth/react"
import MoonLoader from "react-spinners/MoonLoader"

function Baukasten() {
  const { data: session } = useSession()
  const [userId, setUserId] = useState()

  const [status, setStatus] = useState("unsubmitted")
  const [imgUploaded, setImgUploaded] = useState(false)

  const [steps, setSteps] = useState([
    { recipeId: "", nummer: 1, text: "", image: "", imageRaw: "" },
  ])

  const [zutaten, setZutaten] = useState([
    { recipeId: "", name: "", menge: "", einheit: "", kommentar: "" },
  ])

  const [recipe, setRecipe] = useState({
    userId: userId,
    name: "",
    typ: "Grundrezept",
    likes: 0,
    zubereitungszeit: "5min - 20min",
    portionen: 1,
    schwierigkeitsgrad: "Einfach",
    utensilien: "",
    quellen: "",
    image: "",
  })

  const [recipeId, setRecipeId] = useState()

  const [selectedImage, setSelectedImage] = useState(null)
  const [displayRecipes, setDisplayRecipes] = useState([])

  useEffect(() => {
    if (session) {
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
          setUserId(data.id)
          setRecipe({ ...recipe, userId: data.id })
        })
        .catch((err) => {
          alert(err)
        })
    }
  }, [session])

  useEffect(() => {
    if (status === "loading") {
      fetch("/api/rezept-upload", {
        method: "post",
        body: JSON.stringify({ call: "rezept-upload", data: recipe }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          setRecipeId(data.id)
        })
        .catch((error) => {
          setStatus("unsubmitted")
          alert("rezept nicht hochgeladen.")
          console.log("baukasten error: ", error)
        })
    }
  }, [imgUploaded])

  useEffect(() => {
    if (recipeId) {
      let stepsObject = steps
      stepsObject.forEach((step) => (step.recipeId = recipeId))
      stepsObject.forEach((step) => delete step.imageRaw)
      setSteps(stepsObject)

      let zutatenObject = zutaten
      zutatenObject.forEach((zutat) => (zutat.recipeId = recipeId))
      zutatenObject.forEach((zutat) => (zutat.menge = parseFloat(zutat.menge)))
      setZutaten(zutatenObject)

      fetch("/api/rezept-upload", {
        method: "post",
        body: JSON.stringify({ call: "zutaten-upload", data: zutaten }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          setStatus("submitted")
        })
        .catch((error) => {
          setStatus("zutaten unsubmitted")
          alert("zutaten nicht hochgeladen.")
        })

      fetch("/api/rezept-upload", {
        method: "post",
        body: JSON.stringify({ call: "steps-upload", data: steps }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {})
        .catch((error) => {
          setStatus("steps unsubmitted")
          alert("steps nicht hochgeladen.")
        })
    }
  }, [recipeId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    let object = recipe
    object.portionen = parseInt(object.portionen)
    setStatus("loading")

    const hostRecipeImage = () => {
      return new Promise((resolve, reject) => {
        let body = new FormData()
        body.set("key", "6fac261951b6c63ff9999b1a5cd53a73")
        body.append("image", selectedImage)
        axios({
          method: "post",
          url: `https://api.imgbb.com/1/upload`,
          data: body,
        })
          .then((res) => {
            console.log(res.data.data.url)
            object.image = res.data.data.url
            resolve()
          })
          .catch((err) => {
            setStatus("unsubmitted")
            reject()
          })
      })
    }

    const hostStepImages = () => {
      return new Promise((resolve, reject) => {
        var fetches = []

        for (let index = 0; index < steps.length; index++) {
          if (steps[index].imageRaw) {
            let body = new FormData()
            body.set("key", "6fac261951b6c63ff9999b1a5cd53a73")

            body.append("image", steps[index].imageRaw)

            fetches.push(
              axios({
                method: "post",
                url: `https://api.imgbb.com/1/upload`,
                data: body,
              })
                .then((res) => {
                  steps[index].image = res.data.data.url
                })
                .catch((err) => {
                  console.log(err)
                })
            )
          }
        }
        Promise.all(fetches).then(() => {
          console.log("hi")
          resolve()
        })
      })
    }

    await hostStepImages()
      .then(async () => {
        await hostRecipeImage()
      })
      .then(() => {
        setRecipe(object)
        setImgUploaded(true)
      })
  }

  const addZutat = () => {
    if (zutaten.length < 21) {
      let array = [...zutaten]
      array.push({
        recipeId: recipeId,
        name: "",
        menge: "",
        einheit: "",
        kommentar: "",
      })
      setZutaten(array)
    }
  }

  const removeZutat = () => {
    if (zutaten.length > 1) {
      let array = [...zutaten]
      array.pop()
      setZutaten(array)
    }
  }

  const addStep = () => {
    if (steps.length < 21) {
      let array = [...steps]
      array.push({
        nummer: steps.length + 1,
        text: "",
        image: "",
      })
      setSteps(array)
    }
  }

  const removeStep = () => {
    if (steps.length > 1) {
      let array = [...steps]
      array.pop()
      setSteps(array)
    }
  }

  const addStepImage = (e, index) => {
    let image = e.target.files[0]
    let array = [...steps]
    array[index].imageRaw = image
    setSteps(array)
  }

  const removeStepImage = (step, index) => {
    let array = [...steps]
    array[index].imageRaw = ""
    setSteps(array)
  }

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value })
  }

  const handleChangeSteps = (e, step) => {
    if (e.target.name === "step") {
      let input = e.target.value
      let array = [...steps]

      array[step.nummer - 1].text = input

      setSteps(array)
    } else if (e.target.name === "image") {
      let input = e.target.value
      let array = [...steps]

      array[step.nummer - 1].imageRaw = input

      setSteps(array)
    }
  }

  const handleChangeZutaten = (e, zutat, index) => {
    if (e.target.name === "zutat") {
      let input = e.target.value
      let array = [...zutaten]

      array[index].name = input

      setZutaten(array)
    } else if (e.target.name === "menge") {
      let input = e.target.value
      let array = [...zutaten]

      array[index].menge = input

      setZutaten(array)
    } else if (e.target.name === "einheit") {
      let input = e.target.value
      let array = [...zutaten]

      array[index].einheit = input

      setZutaten(array)
    } else if (e.target.name === "kommentar") {
      let input = e.target.value
      let array = [...zutaten]

      array[index].kommentar = input

      setZutaten(array)
    }
  }

  /*   const getChosenTags = (mode) => {
    // 1 = nur chosen Zutat Tags
    // 2 = nur chosen Sonstige Tags
    // 3 = alle chosen Tags
    if (mode === 1) {
      return tags
        ?.filter((val) => {
          if (val.zutat) {
            return val
          }
        })
        ?.filter((val) => {
          if (val?.chosen === 1) {
            return val
          }
        })
    } else if (mode === 2) {
      return tags
        ?.filter((val) => {
          if (!val.zutat) {
            return val
          }
        })
        ?.filter((val) => {
          if (val?.chosen === 1) {
            return val
          }
        })
    } else if (mode === 3) {
      return tags?.filter((val) => {
        if (val?.chosen === 1) {
          return val
        }
      })
    }
  }
 */
  return (
    <div className="flex bg-[url('/media/cuttingBoardBackground.jpg')] bg-contain">
      <div className="absolute text-black">
        {displayRecipes.map((recipe, index) => (
          <div key={index}> {recipe.recipeName}</div>
        ))}
      </div>
      <div className="flex w-full md:w-5/6 2xl:w-4/6 m-auto">
        <form action="" className="w-full flex flex-col mt-10 items-center">
          <div
            id="rezeptName-input-div"
            className="w-5/6 mb-10 items-center flex flex-row justify-center bg-opacity-90 bg-dark-blue border border-bright-orange rounded-3xl"
          >
            <div className=" w-full flex items-center flex-col justify-center p-4">
              <label
                htmlFor="rezeptName-input"
                className="text-bright-orange font-medium text-3xl mb-4 underline underline-offset-4"
              >
                Name deines Rezepts
              </label>
              <input
                id="rezeptName-input"
                required
                className="bg-white appearance-none rounded-full block w-3/6 px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-bright-orange focus:border-bright-orange focus:z-10"
                placeholder=". . ."
                value={recipe.name}
                name="name"
                onChange={handleChange}
              ></input>
            </div>
            <div className="m-4 flex flex-col">
              <div className="w-full flex flex-col items-end">
                <div className="flex flex-col">
                  <label
                    htmlFor="recipe-type-select"
                    className="text-white text-lg pl-4"
                  >
                    Rezept Typ:
                  </label>
                  <select
                    required
                    className="text-black bg-white rounded-full focus:outline-none px-4 py-2 focus:ring-bright-orange focus:border-bright-orange"
                    id="recipe-type-select"
                    name="typ"
                    value={recipe.typ}
                    onChange={(e) => handleChange(e)}
                  >
                    <option>Grundrezept</option>
                    <option>Geheimrezept</option>
                    <option>Userrezept</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <label
            htmlFor="zutaten-list"
            className="text-white font-medium text-md"
          ></label>
          <div
            id="zutaten-list"
            className="flex h-auto w-full border-2 min-h-[235px] bg-opacity-90 bg-dark-blue border-bright-orange mb-5 p-4 items-baseline rounded-3xl "
          >
            <div className="w-full h-full">
              <div className="h-10 flex flex-row">
                <div className="w-1/3 flex">
                  <div className="w-5/6 flex justify-center font-medium text-white text-2xl">
                    <h3>Zutaten</h3>
                  </div>
                </div>
                <div className="w-1/3">
                  <div className="flex justify-center font-medium text-white text-2xl">
                    <h3>Mengeneinheiten</h3>
                  </div>
                </div>
                <div className="w-1/3">
                  <div className=" flex  justify-center font-medium text-white text-2xl">
                    <h3>Bemerkungen</h3>
                  </div>
                </div>
              </div>

              <ol className="space-y-1 pb-2">
                {zutaten?.map((zutat, index) => {
                  return (
                    <li
                      className="flex flex-row px-2 pb-1 w-full border-dark-blue--2"
                      key={index}
                    >
                      <div className="w-1/3 ">
                        <div className="flex flex-col">
                          <label
                            htmlFor="zutat-input"
                            className="text-white text-sm"
                          ></label>
                          <input
                            className="bg-white appearance-none rounded-full relative block w-5/6 px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-bright-orange focus:border-bright-orange focus:z-10"
                            id="zutat-input"
                            required
                            type={"text"}
                            name="zutat"
                            value={zutat.name}
                            placeholder={`${index + 1}. Zutat...`}
                            onChange={(e) =>
                              handleChangeZutaten(e, zutat, index)
                            }
                          ></input>
                        </div>
                      </div>
                      <div className="w-1/3 space-x-1 justify-center flex flex-row">
                        <div className="flex flex-col w-2/6">
                          <label
                            htmlFor="zutat-input"
                            className="text-white text-sm text-center"
                          ></label>
                          <input
                            className="bg-white appearance-none rounded-full relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-bright-orange focus:border-bright-orange focus:z-10"
                            id="zutat-input"
                            name="menge"
                            value={zutat.menge}
                            type={"number"}
                            onChange={(e) =>
                              handleChangeZutaten(e, zutat, index)
                            }
                            placeholder="..."
                          ></input>
                        </div>
                        <div className=""></div>
                        <div className="flex flex-col w-2/6">
                          <label
                            htmlFor="zutat-input"
                            className="text-white text-sm ml-4"
                          ></label>
                          <input
                            className="appearance-none bg-white rounded-full relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-bright-orange focus:border-bright-orange focus:z-10"
                            id="zutat-input"
                            name="einheit"
                            value={zutat.einheit}
                            type={"text"}
                            onChange={(e) =>
                              handleChangeZutaten(e, zutat, index)
                            }
                            placeholder="Einheit..."
                          ></input>
                        </div>
                      </div>
                      <div className="flex flex-col w-1/3 items-end">
                        <label
                          htmlFor="zutat-input"
                          className="text-white text-sm pl-4"
                        ></label>
                        <input
                          className="appearance-none bg-white rounded-full max-h-10 relative block w-5/6 px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-bright-orange focus:border-bright-orange focus:z-10 "
                          id="zutat-input"
                          name="kommentar"
                          value={zutat.kommentar}
                          onChange={(e) => handleChangeZutaten(e, zutat, index)}
                          type={"text"}
                          placeholder="Kommentar..."
                        ></input>
                      </div>
                    </li>
                  )
                })}
              </ol>
              <div className="space-x-80 p-4 w-full flex flex-row">
                <div className="flex flex-row w-3/6 justify-end space-x-2 ">
                  <button
                    type="button"
                    className="flex w-auto px-2 rounded-full py-2 border-2 border-bright-orange justify-center hover:-translate-x-[1px] hover:-translate-y-[1px] hover:bg-dark-blue--1 hover:bg-opacity-20"
                    onClick={() => addZutat()}
                  >
                    <PlusIcon className="h-8 text-green-600"></PlusIcon>
                  </button>
                </div>
                <div className="flex flex-row w-3/6 justify-start space-x-2 ">
                  <button
                    type="button"
                    className="flex w-auto px-2 rounded-full py-2 border-2 border-bright-orange justify-center hover:-translate-x-[1px] hover:-translate-y-[1px] hover:bg-dark-blue--1 hover:bg-opacity-20"
                    onClick={() => removeZutat()}
                  >
                    <MinusIcon className="h-8 text-red-600"></MinusIcon>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            id="recipe-details"
            className="mb-5 bg-opacity-90 bg-dark-blue p-4 text-white border-2 border-bright-orange rounded-3xl flex w-full flex-col space-y-3"
          >
            <div className="w-full flex flex-col items-center justify-center py-2 space-y-10">
              <div className="flex flex-row w-full justify-between">
                <div className="flex flex-col w-1/3 justify-center items-center space-x-2">
                  <label
                    htmlFor="zubereitungszeit"
                    className="text-white text-lg pl-4"
                  >
                    Ungefähre Zubereitungszeit:
                  </label>
                  <select
                    required
                    className="text-gray-900 bg-white rounded-full focus:outline-none px-4 py-2 focus:ring-bright-orange focus:border-bright-orange focus:z-10"
                    id="zubereitungszeit"
                    name="zubereitungszeit"
                    value={recipe.zubereitungszeit}
                    onChange={(e) => handleChange(e)}
                  >
                    <option>5min - 20min</option>
                    <option>20min - 45min</option>
                    <option>45min - 1h 30min</option>
                    <option>1h 30min +</option>
                  </select>
                </div>
                <div className="flex flex-col w-1/3 justify-start items-center space-x-2">
                  <label
                    htmlFor="portionen"
                    className="text-white text-lg pl-4"
                  >
                    Portionsgröße:
                  </label>
                  <div className="flex-row flex items-center p-1 space-x-1">
                    <input
                      required
                      className="appearance-none bg-white rounded-full max-h-10 relative block w-20 px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-bright-orange focus:border-bright-orange focus:z-10 "
                      id="portionen"
                      name="portionen"
                      type="number"
                      placeholder="1"
                      value={recipe.portionen}
                      onChange={(e) => handleChange(e)}
                    ></input>
                  </div>
                </div>
                <div className="flex flex-col w-1/3 justify-start items-center space-x-2">
                  <label
                    htmlFor="schwierigkeitsgrad"
                    className="text-white text-lg pl-4"
                  >
                    Schwierigkeitsgrad:
                  </label>
                  <select
                    required
                    className="text-gray-900 bg-white rounded-full focus:outline-none px-4 py-2 focus:ring-bright-orange focus:border-bright-orange focus:z-10"
                    id="schwierigkeitsgrad"
                    name="schwierigkeitsgrad"
                    value={recipe.schwierigkeitsgrad}
                    onChange={(e) => handleChange(e)}
                  >
                    <option>Einfach</option>
                    <option>Mittel</option>
                    <option>Schwierig</option>
                    <option>Meisterkoch</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col w-full space-y-5 p-2">
                <div className="flex flex-row w-full space-x-6">
                  <label
                    htmlFor="wichtigeUtensilien"
                    className="text-white text-lg w-2/6"
                  >
                    Küchenutensilien(optional):
                  </label>
                  <textarea
                    className="mb-5 bg-white appearance-none rounded-3xl relative block w-4/6 self-end px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-bright-orange focus:border-bright-orange focus:z-10"
                    id="wichtigeUtensilien"
                    name="utensilien"
                    value={recipe.utensilien}
                    onChange={(e) => handleChange(e)}
                    placeholder="..."
                  ></textarea>
                </div>
                <div className="flex flex-row w-full space-x-6">
                  <label htmlFor="quellen" className="text-white text-lg w-2/6">
                    Social media Links zu deinem Rezept(optional):
                  </label>
                  <textarea
                    className="mb-5 bg-white appearance-none rounded-3xl relative block w-4/6 px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-bright-orange focus:border-bright-orange focus:z-10"
                    id="quellen"
                    name="quellen"
                    placeholder="..."
                    value={recipe.quellen}
                    onChange={(e) => handleChange(e)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <label
            htmlFor="recipe-steps"
            className="text-white font-medium text-md"
          ></label>
          <div
            id="recipe-steps"
            className="mb-5 bg-opacity-90 bg-dark-blue p-4 text-white border-2 border-bright-orange rounded-3xl flex w-full flex-col space-y-3"
          >
            <div className="w-full flex items-center justify-center py-2">
              <h2 className="text-2xl font-medium">Schritte</h2>
            </div>
            {steps.map((step, index) => {
              return (
                <div
                  className="flex flex-row space-x-4 rounded-md p-2"
                  key={index}
                >
                  <div className="flex flex-col w-4/6">
                    <label htmlFor="step-1"></label>
                    <div id="step-1 w-full">
                      <textarea
                        required
                        id="step-input"
                        name="step"
                        value={step.text}
                        onChange={(e) => {
                          handleChangeSteps(e, step)
                        }}
                        className="bg-white w-full mb-2 text-lg appearance-none rounded-3xl relative block h-24 px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-bright-orange focus:border-bright-orange focus:z-10"
                        type={"text"}
                        placeholder={`${step.nummer}. Schritt...`}
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-center w-2/6">
                    {steps[index]?.imageRaw ? (
                      <div className="items-center justify-center flex w-full">
                        <div className="items-center flex w-full justify-center h-full">
                          <button
                            type="button"
                            className="peer z-30 absolute  inline-block overflow-hidden h-24 w-24 hover:bg-slate-900 opacity-40 rounded-md"
                            onClick={() => removeStepImage(step, index)}
                          ></button>
                          <div className="flex z-0 peer-hover:z-20 h-24 w-24 justify-center items-center">
                            <XIcon className="h-20 text-bright-orange"></XIcon>
                          </div>
                          <img
                            className="w-24 h-24 absolute z-1 rounded-md"
                            alt="not found"
                            src={URL.createObjectURL(steps[index].imageRaw)}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex w-full items-center flex-col">
                        <label
                          htmlFor={`stepImage-input ${step.nummer}`}
                          className="cursor-pointer"
                        >
                          Bild für Schritt {step.nummer} (optional)
                        </label>
                        <label
                          id={`stepImage-input-label ${step.nummer}`}
                          htmlFor={`stepImage-input ${step.nummer}`}
                          className="cursor-pointer p-2"
                        >
                          <CloudUploadIcon className="h-12 text-bright-orange"></CloudUploadIcon>
                        </label>
                        <div id="step-1-pic">
                          <input
                            id={`stepImage-input ${step.nummer}`}
                            type="file"
                            className="bg-bright-orange hidden"
                            onChange={(event) => {
                              addStepImage(event, index)
                            }}
                          ></input>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
            <div className="flex w-full p-4 space-x-80">
              <div className="flex flex-row w-3/6 justify-end space-x-2 ">
                <button
                  type="button"
                  className="flex hover:-translate-x-[1px] hover:-translate-y-[1px] w-auto px-2 rounded-full py-2 border-2 border-bright-orange justify-center hover:bg-dark-blue--1 hover:bg-opacity-20"
                  onClick={() => addStep()}
                >
                  <PlusIcon className="h-8 text-green-600"></PlusIcon>
                </button>
              </div>
              <div className="flex flex-row w-3/6 justify-start space-x-2 ">
                <button
                  type="button"
                  className="flex w-auto px-2 rounded-full py-2 border-2 border-bright-orange justify-center hover:-translate-x-[1px] hover:-translate-y-[1px] hover:bg-dark-blue--1 hover:bg-opacity-20"
                  onClick={() => removeStep()}
                >
                  <MinusIcon className="h-8 text-red-600"></MinusIcon>
                </button>
              </div>
            </div>
          </div>
          <label
            htmlFor="recipe-image-upload "
            className="text-white font-medium text-md"
          ></label>
          <div
            id="recipe-image-upload"
            className="h-[380px] w-full p-4 bg-dark-blue w-lg mb-10 rounded-3xl bg-opacity-90 border-2 border-bright-orange"
          >
            <div className="w-full flex justify-center">
              <h2 className="text-xl text-white font-medium py-2 pb-4">
                Bild für dein Rezept:
              </h2>
            </div>

            <div className="">
              {selectedImage ? (
                <div className="max-h-[260px] w-full items-center justify-center flex">
                  <button
                    type="button"
                    className="peer z-30 absolute inline-block overflow-hidden h-[250px] max-w-[450px] w-[450px] hover:bg-slate-900 opacity-40 rounded-md"
                    onClick={() => setSelectedImage(null)}
                  />
                  <div className="flex z-0 peer-hover:z-20 h-[250px] max-w-[500px] w-[450px] justify-center items-center">
                    <XIcon className="h-20  text-bright-orange"></XIcon>
                  </div>

                  <img
                    alt="not found"
                    className={`max-w-[500px] h-[250px] w-[450px] rounded-md absolute z-1 `}
                    src={URL.createObjectURL(selectedImage)}
                  ></img>
                </div>
              ) : (
                <>
                  <div className="flex justify-center items-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col justify-center items-center w-4/6 h-[260px] rounded-lg border-2 border-gray-300 border-dashed cursor-pointer bg-dark-blue-1 hover:bg-dark-blue"
                    >
                      <div className="flex flex-col justify-center items-center pt-5 pb-6">
                        <svg
                          aria-hidden="true"
                          className="mb-3 w-10 h-10 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        type="file"
                        name="myImage"
                        required
                        onChange={(event) => {
                          setSelectedImage(event.target.files[0])
                        }}
                        id="dropzone-file"
                        className=" opacity-0"
                      />
                    </label>
                  </div>
                </>
              )}
            </div>
          </div>
          <div
            id="rezeptName-input-div"
            className="items-center flex flex-col justify-center bg-opacity-90 bg-dark-blue p-3 border border-bright-orange mb-5 rounded-3xl w-5/6 "
          >
            {status === "unsubmitted" ? (
              ""
            ) : status === "loading" ? (
              ""
            ) : status === "submitted" ? (
              <div
                className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                role="alert"
              >
                <span className="font-medium">Glückwunsch!</span> Dein Rezept
                wurde hochgeladen.
              </div>
            ) : (
              ""
            )}

            <div
              id="cancel/submit-buttons"
              className="w-full flex flex-row justify-evenly py-6"
            >
              <Link href="/">
                <button className="relative w-60 flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bright-orange">
                  Cancel
                </button>
              </Link>
              <button
                disabled={status === "submitted" ? true : false}
                type="submit"
                onClick={(e) => {
                  handleSubmit(e)
                }}
                className="relative disabled:bg-gray-400 disabled:cursor-default cursor-pointer w-60 flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-bright-orange hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bright-orange"
              >
                {status === "unsubmitted" ? (
                  "Submit"
                ) : status === "loading" ? (
                  <MoonLoader color="#033249" size={19}></MoonLoader>
                ) : status === "submitted" ? (
                  "submitted"
                ) : (
                  ""
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Baukasten
