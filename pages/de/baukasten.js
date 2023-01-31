import React, { useEffect, useState, useContext } from "react"
import axios from "axios"
import Link from "next/link"
import Select from "react-select"
import makeAnimated from "react-select/animated"
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
import { BsCheckLg } from "react-icons/bs"
import { AiFillYoutube, AiFillInstagram } from "react-icons/ai"
import { FaTiktok } from "react-icons/fa"
import AppContext from "../../helpers/AppContext"
import { useRouter } from "next/router"

function Baukasten() {
  const router = useRouter()

  const [rezepte, setRezepte, user, setUser, kategorien, setKategorien] =
    useContext(AppContext)

  const animatedComponents = makeAnimated()
  const { data: session } = useSession()

  const [status, setStatus] = useState("unsubmitted")
  const [imgUploaded, setImgUploaded] = useState(false)

  const [recipe, setRecipe] = useState({
    userId: "",
    name: "",
    typ: "Grundrezept",
    likes: 0,
    zubereitungszeit: "5min - 20min",
    portionen: 1,
    schwierigkeitsgrad: "Einfach",
    kategorien: "Vegetarisch",
    utensilien: "",
    youtube: "",
    instagram: "",
    tiktok: "",
    image: "",
    steps: [],
    zutaten: [],
  })

  const [steps, setSteps] = useState([
    { nummer: 1, text: "", image: "", image: "", imageFile: null },
  ])

  const [zutaten, setZutaten] = useState([
    { name: "", menge: "", einheit: "", kommentar: "" },
  ])

  const [selectedImage, setSelectedImage] = useState(null)

  const kategorieSelectOptions = () => {
    const kategorienArray = []

    for (let index = 0; index < kategorien.length; index++) {
      kategorienArray.push({
        value: kategorien[index].name,
        label: kategorien[index].name,
      })
    }
    return kategorienArray
  }

  const zubereitungszeitSelectOptions = [
    {
      value: "5min - 20min",
      label: "5min - 20min",
    },
    {
      value: "20min - 45min",
      label: "20min - 45min",
    },
    {
      value: "45min - 1h 30min",
      label: "45min - 1h 30min",
    },
    {
      value: "1h 30min +",
      label: "1h 30min +",
    },
  ]

  const PortionsgrößeSelectOptions = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
    { value: 7, label: 7 },
    { value: 8, label: 8 },
    { value: 9, label: 9 },
    { value: 10, label: 10 },
    { value: 11, label: 11 },
    { value: 12, label: 12 },
    { value: 13, label: 13 },
    { value: 14, label: 14 },
    { value: 15, label: 15 },
    { value: 16, label: 16 },
    { value: 17, label: 17 },
    { value: 18, label: 18 },
    { value: 19, label: 19 },
    { value: 20, label: 20 },
  ]

  const schwierigkeitsgradSelectOptions = [
    { value: "Einfach", label: "Einfach" },
    { value: "Mittel", label: "Mittel" },
    { value: "Schwierig", label: "Schwierig" },
    { value: "Meisterkoch", label: "Meisterkoch" },
  ]

  useEffect(() => {
    fetch("/api/rezepte/kategorien-get", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        call: "kategorien-get",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setKategorien(data)
      })
      .catch((err) => {
        alert(err)
      })
  }, [])

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
          setUser(data)
          setRecipe({ ...recipe, userId: data.id })
        })
        .catch((err) => {
          alert(err)
        })
    }
  }, [session])

  useEffect(() => {
    if (status === "recipeUploading") {
      fetch("/api/rezepte/rezept-upload", {
        method: "post",
        body: JSON.stringify({ call: "rezept-upload", data: recipe }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          setStatus("submitted")
          router.push("/de/grundrezepte")
        })
        .catch((error) => {
          setStatus("unsubmitted")
          alert("rezept nicht hochgeladen.")
          console.log("baukasten error: ", error)
        })
    }
  }, [imgUploaded])

  const handleSubmit = (e) => {
    e.preventDefault()
    let object = recipe
    object.portionen = parseInt(object.portionen)
    object.steps = steps
    object.zutaten = zutaten
    setStatus("imagesUploading")

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
          if (steps[index].imageFile) {
            let body = new FormData()
            body.set("key", "6fac261951b6c63ff9999b1a5cd53a73")

            body.append("image", steps[index].imageFile)

            fetches.push(
              axios({
                method: "post",
                url: `https://api.imgbb.com/1/upload`,
                data: body,
              })
                .then((res) => {
                  object.steps[index].image = res.data.data.url
                })
                .catch((err) => {
                  console.log(err)
                })
            )
          }
        }
        Promise.all(fetches).then(() => {
          setStatus("recipeUploading")
          object.steps.forEach((step) => {
            delete step["imageFile"]
          })
          resolve()
        })
      })
    }

    hostStepImages()
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
        imageFile: "",
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
    array[index].imageFile = image
    setSteps(array)
  }

  const removeStepImage = (step, index) => {
    let array = [...steps]
    array[index].imageFile = ""
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

      array[index].menge = parseInt(input)

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

  return (
    <div className="flex bg-[url('/media/cuttingBoardBackground.jpg')] bg-contain">
      <div className="flex w-full md:w-[90%] 2xl:w-[80%] m-auto">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <div
            id="rezeptName-input-div"
            className="w-4/6 my-6 items-center flex flex-row justify-center bg-opacity-90 bg-dark-blue border border-bright-orange rounded-3xl"
          >
            <div className=" w-full flex items-center flex-col justify-center p-4">
              <label
                htmlFor="rezeptName-input"
                className=" hidden sm:flex text-bright-orange font-medium text-3xl mb-4 underline underline-offset-4"
              >
                Name deines Rezepts
              </label>
              <label
                htmlFor="rezeptName-input"
                className="sm:hidden flex text-bright-orange font-medium text-2xl mb-4 underline underline-offset-4"
              >
                Rezeptname
              </label>
              <input
                id="rezeptName-input"
                required
                className="bg-white appearance-none rounded-full block w-full lg:w-3/6 px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-bright-orange focus:border-bright-orange focus:z-10"
                placeholder=". . ."
                value={recipe.name}
                name="name"
                onChange={handleChange}
              ></input>
            </div>
          </div>
          {user ? (
            user.role === "ADMIN" ? (
              <div className="w-full mb-5 items-center flex flex-row justify-center bg-opacity-90 bg-dark-blue border-bright-orange border-y-2 md:border-2 md:rounded-3xl">
                <div className="w-full flex flex-col items-center justify-center p-4">
                  <label
                    htmlFor="recipe-type-select"
                    className="text-white font-medium text-xl p-2"
                  >
                    Rezept Typ
                  </label>
                  <select
                    className="text-black bg-white rounded-full focus:outline-none px-4 py-2 focus:ring-bright-orange focus:border-bright-orange"
                    id="recipe-type-select"
                    name="typ"
                    value={recipe.typ}
                    onChange={(e) => handleChange(e)}
                  >
                    <option>Grundrezept</option>
                    <option>Klassisches Rezept</option>
                    <option>Geheimrezept</option>
                    <option>Userrezept</option>
                  </select>
                </div>
              </div>
            ) : (
              ""
            )
          ) : (
            ""
          )}

          <label
            htmlFor="zutaten-list"
            className="text-white font-medium text-md"
          ></label>
          <div
            id="zutaten-list"
            className="flex h-auto w-full min-h-[235px] bg-opacity-90 bg-dark-blue border-bright-orange mb-5 p-4 items-baseline border-y-2 md:border-2 md:rounded-3xl "
          >
            <div className="w-full h-full">
              <div className="h-10 flex flex-row">
                <div className="w-1/2 md:w-1/3 flex">
                  <div className="w-5/6 flex justify-center font-medium text-white text-xl">
                    <h3>Zutaten</h3>
                  </div>
                </div>
                <div className="w-1/2 md:w-1/3">
                  <div className="flex justify-center font-medium text-white text-xl">
                    <h3>Mengeneinheiten</h3>
                  </div>
                </div>
                <div className="w-0 md:w-1/3">
                  <div className="hidden md:flex justify-center font-medium text-white text-xl">
                    <h3>Bemerkungen</h3>
                  </div>
                </div>
              </div>

              <ol className="space-y-1 pb-2">
                {zutaten?.map((zutat, index) => {
                  return (
                    <li
                      className="flex flex-row gap-x-2 pb-1 w-full border-dark-blue--2"
                      key={index}
                    >
                      <div className="w-1/2 md:w-1/3">
                        <div className="flex flex-col">
                          <label
                            htmlFor="zutat-input"
                            className="text-white text-sm"
                          ></label>
                          <input
                            className="bg-white appearance-none rounded-full relative block px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-bright-orange focus:border-bright-orange focus:z-10"
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
                      <div className="w-1/2 md:w-1/3 gap-x-1 justify-center flex flex-row">
                        <div className="flex flex-col w-2/6">
                          <label
                            htmlFor="zutat-input"
                            className="text-white text-sm text-center"
                          ></label>
                          <input
                            className="bg-white appearance-none rounded-md relative block w-full px-2 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-bright-orange focus:border-bright-orange focus:z-10"
                            id="zutat-input"
                            name="menge"
                            value={zutat.menge}
                            type={"number"}
                            step="0.01"
                            onChange={(e) =>
                              handleChangeZutaten(e, zutat, index)
                            }
                            placeholder="..."
                          ></input>
                        </div>
                        <div className="flex flex-col w-4/6 md:w-2/6">
                          <label
                            htmlFor="zutat-input"
                            className="text-white text-sm"
                          ></label>
                          <input
                            className="appearance-none bg-white rounded-md relative block w-full px-2 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-bright-orange focus:border-bright-orange focus:z-10"
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
                      <div className="hidden md:flex flex-col w-1/3 items-center">
                        <label
                          htmlFor="zutat-input"
                          className="text-white text-sm pl-4"
                        ></label>
                        <input
                          className="appearance-none bg-white rounded-full max-h-10 relative block px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-bright-orange focus:border-bright-orange focus:z-10 "
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
              <div className="gap-x-20 lg:gap-x-80 p-4 w-full flex flex-row">
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
            className="mb-5 bg-opacity-90 bg-dark-blue p-4 text-white border-bright-orange border-y-2 md:border-2 md:rounded-3xl flex w-full flex-col space-y-3"
          >
            <div className="w-full flex flex-col items-center justify-center py-2 space-y-10">
              <div className="flex flex-wrap w-full space-y-4 items-end">
                <div className="flex flex-col w-full sm:w-1/2 xl:w-1/4 justify-start items-center space-x-2">
                  <label
                    htmlFor="zubereitungszeit"
                    className="font-medium text-white text-xl p-1"
                  >
                    Zubereitungszeit
                  </label>
                  <Select
                    id="zubereitungszeit"
                    instanceId={"zubereitungszeit"}
                    required
                    placeholder={"Wähle..."}
                    closeMenuOnSelect={false}
                    onChange={(choice) =>
                      setRecipe({ ...recipe, zubereitungszeit: choice.value })
                    }
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? "#FF8038" : "grey",
                        "&:hover": {
                          borderColor: "#FF8038",
                        },
                      }),
                      option: (baseStyles, state) => ({
                        ...baseStyles,
                        color: "black",
                        backgroundColor: state.isSelected ? "#FF8038" : "",
                      }),
                      container: (baseStyles, state) => ({
                        ...baseStyles,
                        width: "250px",
                      }),
                    }}
                    options={zubereitungszeitSelectOptions}
                    name="zubereitungszeit"
                  ></Select>
                </div>
                <div className="flex flex-col w-full sm:w-1/2 xl:w-1/4 justify-start items-center space-x-2">
                  <label
                    htmlFor="portionen"
                    className="font-medium text-white text-xl p-1"
                  >
                    Portionsgröße
                  </label>
                  <Select
                    id="portionen"
                    required
                    instanceId={"portionen"}
                    placeholder={"Wähle..."}
                    closeMenuOnSelect={false}
                    onChange={(choice) =>
                      setRecipe({ ...recipe, portionen: choice.value })
                    }
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? "#FF8038" : "grey",
                        "&:hover": {
                          borderColor: "#FF8038",
                        },
                      }),
                      option: (baseStyles, state) => ({
                        ...baseStyles,
                        color: "black",
                        backgroundColor: state.isSelected ? "#FF8038" : "",
                      }),
                      container: (baseStyles, state) => ({
                        ...baseStyles,
                        width: "250px",
                      }),
                    }}
                    options={PortionsgrößeSelectOptions}
                    name="portionen"
                  ></Select>
                </div>
                <div className="flex flex-col w-full sm:w-1/2 xl:w-1/4 justify-start items-center space-x-2">
                  <label
                    htmlFor="schwierigkeitsgrad"
                    className="font-medium text-white text-xl p-1"
                  >
                    Schwierigkeitsgrad
                  </label>
                  <Select
                    id="schwierigkeitsgrad"
                    instanceId={"schwierigkeitsgrad"}
                    required
                    placeholder={"Wähle..."}
                    closeMenuOnSelect={false}
                    onChange={(choice) =>
                      setRecipe({ ...recipe, schwierigkeitsgrad: choice.value })
                    }
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? "#FF8038" : "grey",
                        "&:hover": {
                          borderColor: "#FF8038",
                        },
                      }),
                      option: (baseStyles, state) => ({
                        ...baseStyles,
                        color: "black",
                        backgroundColor: state.isSelected ? "#FF8038" : "",
                      }),
                      container: (baseStyles, state) => ({
                        ...baseStyles,
                        width: "250px",
                      }),
                    }}
                    options={schwierigkeitsgradSelectOptions}
                    name="schwierigkeitsgrad"
                  ></Select>{" "}
                </div>
                <div className="flex flex-col w-full sm:w-1/2 xl:w-1/4 justify-start items-center space-x-2">
                  <label
                    htmlFor="kategorie"
                    className="font-medium text-white text-xl p-1"
                  >
                    Kategorien
                  </label>
                  <Select
                    required
                    instanceId={"kategorie"}
                    placeholder={"Wähle..."}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    onChange={(choice) => {
                      setRecipe({ ...recipe, kategorien: choice })
                    }}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? "#FF8038" : "grey",
                        "&:hover": {
                          borderColor: "#FF8038",
                        },
                      }),
                      option: (baseStyles, state) => ({
                        ...baseStyles,
                        color: "black",
                        backgroundColor: state.isSelected ? "#FF8038" : "",
                      }),
                      container: (baseStyles, state) => ({
                        ...baseStyles,
                        width: "250px",
                      }),
                    }}
                    options={kategorieSelectOptions()}
                    name="kategorie"
                  ></Select>
                </div>
              </div>
              <div className="flex flex-col w-full space-y-5 p-2">
                <div className="flex flex-col lg:flex-row w-full space-x-6 justify-center">
                  <label
                    htmlFor="wichtigeUtensilien"
                    className="font-medium text-center lg:text-start text-white text-xl w-full lg:w-2/6 p-1"
                  >
                    Küchenutensilien(optional)
                  </label>
                  <textarea
                    className="mb-5 bg-white m-1 appearance-none rounded-3xl relative block w-full lg:w-4/6 self-end px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-bright-orange focus:border-bright-orange focus:z-10"
                    id="wichtigeUtensilien"
                    name="utensilien"
                    value={recipe.utensilien}
                    onChange={(e) => handleChange(e)}
                    placeholder="..."
                  ></textarea>
                </div>
                <div className="flex flex-wrap w-full gap-x-6 xl:justify-start justify-center">
                  <label
                    htmlFor="quellen"
                    className="font-medium text-center xl:text-start text-white text-xl w-full xl:w-2/6 p-1"
                  >
                    Social Media Links(optional)
                  </label>
                  <div className="flex flex-row items-center ">
                    <label
                      htmlFor="instagram"
                      className="text-white text-lg p-1"
                    >
                      <AiFillInstagram className="text-purple-600 w-12 h-12"></AiFillInstagram>
                    </label>
                    <input
                      className="bg-white rounded-md max-h-10 w-40 px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-bright-orange focus:border-bright-orange focus:z-10 "
                      id="instagram"
                      name="instagram"
                      type="text"
                      placeholder="Instagram Link"
                      value={recipe.instagram}
                      onChange={(e) => handleChange(e)}
                    ></input>
                  </div>
                  <div className="flex flex-row items-center">
                    <label
                      htmlFor="youtube"
                      className="text-white text-lg w-2/6 p-1"
                    >
                      <AiFillYoutube className="text-red-600 w-12 h-12"></AiFillYoutube>
                    </label>
                    <input
                      className="bg-white rounded-md max-h-10 w-40 px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-bright-orange focus:border-bright-orange focus:z-10 "
                      id="youtube"
                      name="youtube"
                      type="text"
                      placeholder="Youtube Link"
                      value={recipe.youtube}
                      onChange={(e) => handleChange(e)}
                    ></input>
                  </div>
                  <div className="flex flex-row items-center">
                    <label
                      htmlFor="tiktok"
                      className="text-white text-lg w-2/6 p-1"
                    >
                      <FaTiktok className="text-white w-12 h-12"></FaTiktok>
                    </label>
                    <input
                      className="bg-white rounded-md max-h-10 w-40 px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-bright-orange focus:border-bright-orange focus:z-10 "
                      id="tiktok"
                      name="tiktok"
                      type="text"
                      placeholder="TikTok Link"
                      value={recipe.tiktok}
                      onChange={(e) => handleChange(e)}
                    ></input>
                  </div>
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
            className="mb-5 bg-opacity-90 bg-dark-blue p-4 text-white border-bright-orange border-y-2 md:border-2 md:rounded-3xl flex w-full flex-col space-y-3"
          >
            <div className="w-full flex items-center justify-center py-2">
              <h2 className="text-xl font-medium">Schritte</h2>
            </div>
            {steps.map((step, index) => {
              return (
                <div
                  className="flex flex-row gap-x-4 rounded-md p-0 sm:p-2"
                  key={index}
                >
                  <div className="flex flex-col w-5/6 sm:w-4/6">
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
                  <div className="flex flex-row items-center justify-center w-1/6 sm:w-2/6">
                    {steps[index].imageFile ? (
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
                            src={URL.createObjectURL(steps[index].imageFile)}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex w-full items-center flex-col">
                        <label
                          htmlFor={`stepImage-input ${step.nummer}`}
                          className="cursor-pointer hidden sm:flex"
                        >
                          Bild für Schritt {step.nummer} (optional)
                        </label>
                        <label
                          htmlFor={`stepImage-input ${step.nummer}`}
                          className="cursor-pointer sm:hidden flex"
                        >
                          Bild {step.nummer} (optional)
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
                            accept="image/png, image/jpeg, image/jpg, image/gif"
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
            <div className="flex w-full p-4 gap-x-20 lg:gap-x-80">
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
            className="h-[380px] w-full p-4 bg-dark-blue w-lg mb-10 bg-opacity-90 border-y-2 md:border-2 md:rounded-3xl border-bright-orange"
          >
            <div className="w-full flex justify-center">
              <h2 className="text-xl text-white font-medium py-2 pb-4">
                Bild von dem fertigen Gericht
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
                          SVG, PNG, JPG or GIF
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
            id="status-div"
            className="items-center flex flex-col justify-center bg-opacity-90 bg-dark-blue p-3 border-bright-orange mb-5 border-y-2 md:border-2 md:rounded-3xl w-full xl:w-5/6 "
          >
            {status === "imagesUploading" ? (
              "Bilder werden hochgeladen..."
            ) : status === "recipeUploading" ? (
              "Rezept wird hochgeladen..."
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
              className="w-full flex flex-row justify-evenly py-6 gap-x-2"
            >
              <Link href="/">
                <button className="relative w-60 flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bright-orange">
                  Cancel
                </button>
              </Link>
              <button
                disabled={status === "submitted" ? true : false}
                type="submit"
                className="relative items-center disabled:bg-gray-400 disabled:cursor-default cursor-pointer w-60 flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-bright-orange hover:bg-orange-700 duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bright-orange"
              >
                {status === "unsubmitted" ? (
                  "Hochladen"
                ) : status === "loading" ? (
                  <MoonLoader color="#033249" size={19}></MoonLoader>
                ) : status === "submitted" ? (
                  <BsCheckLg className=" text-green-500 h-6 w-6"></BsCheckLg>
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
