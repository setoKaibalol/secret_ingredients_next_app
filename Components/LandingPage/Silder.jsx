import Image from "next/image"
import React, { useState, useEffect, useRef } from "react"
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai"

function Silder() {
  const [index, setIndex] = useState(0)
  const [index1, setIndex1] = useState(1)
  const [trans, setTrans] = useState(false)
  const [transR, setTransR] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  useEffect(() => {
    if (transR) {
      setTimeout(() => {
        setTransR(false)
      }, 700)
    }

    if (trans) {
      setTimeout(() => {
        setTrans(false)
        setIndex((index + 1) % images.length)
        setIndex1((index1 + 1) % images.length)
      }, 800)
    }
  }, [trans, transR])

  const images = [
    {
      name: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },
    {
      name: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },
    {
      name: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },
  ]

  const handlePrev = () => {
    setTransR(true)
    setTrans(false)
    const nextIndex = index - 1
    const nextIndex1 = index1 - 1

    if (nextIndex1 < 0) {
      setIndex1(images.length - 1)
    } else {
      setIndex1(nextIndex1)
    }

    if (nextIndex < 0) {
      setIndex(images.length - 1)
    } else {
      setIndex(nextIndex)
    }
  }
  const handleNext = () => {
    setTrans(true)
    setTransR(false)
  }

  const handleImgClick = (idx) => {
    setActiveIndex(idx)
    if (idx === index) {
      return
    }
    if (idx < index) {
      setIndex(idx)
      setIndex1(idx + 1)
      setTransR(true)
      setTrans(false)
    } else {
      setIndex((idx - 1) % images.length)
      setIndex1(idx % images.length)
      handleNext()
    }
  }
  return (
    <div className="w-full">
      {images.length > 0 ? (
        <>
          <div className="flex justify-center  space-x-4 mt-16 ">
            <button
              className="h-auto w-10 bg-yellow-800 font-extrabold text-3xl"
              onClick={handlePrev}
            >
              {"<"}
            </button>
            <div className="relative  w-96 border-2 h-56 overflow-hidden rounded-xl">
              <img
                className={`absolute object-contain z-20 w-full h-full p-4  ${
                  trans
                    ? "transition duration-500 ease-linear transform -translate-x-full"
                    : transR
                    ? "animate-slideL"
                    : ""
                }`}
                src={images[index].name}
                alt=""
              />
              <img
                className={`absolute object-contain z-0 w-full h-full  p-4 ${
                  trans
                    ? "animate-slideR"
                    : transR
                    ? "transition duration-500 ease-linear transform translate-x-full"
                    : ""
                }`}
                src={images[index1].name}
                alt=""
              />
            </div>
            <button
              className="h-auto w-10 bg-yellow-800 font-extrabold text-3xl"
              onClick={handleNext}
            >
              {">"}
            </button>
          </div>
        </>
      ) : (
        "no images yet"
      )}
    </div>
  )
}

export default Silder
