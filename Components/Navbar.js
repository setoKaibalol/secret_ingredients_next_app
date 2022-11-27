import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/router"
import AuthButton from "./AuthButton"
import React, { useState } from "react"

export default function Header() {
  const { data: session, status: status } = useSession()
  const router = useRouter()
  const [toggleMobileMenu, setToggleMobileMenu] = useState("init")

  const navigation = session
    ? [
        {
          name: "Klassische Rezepte",
          to: "/de/grundrezepte",
        },
        {
          name: "Geheimrezepte",
          to: "/de/geheimrezepte",
        },
        {
          name: "Nutzerrezepte",
          to: "/de/nutzerrezepte",
        },
        {
          name: "Über Uns",
          to: "/de/about",
        },
        {
          name: "Baukasten",
          to: "/de/baukasten",
        },
      ]
    : [
        {
          name: "Klassische Rezepte",
          to: "/de/grundrezepte",
        },
        {
          name: "Geheimrezepte",
          to: "/de/geheimrezepte",
        },
        {
          name: "Nutzerrezepte",
          to: "/de/userrezepte",
        },
        {
          name: "Über Uns",
          to: "/de/about",
        },
      ]

  const handleMobileMenu = (e) => {
    if (typeof document !== "undefined") {
      const mobileMenuButton = document.getElementById("mobile-menu-button")
      const mobileMenu = document.getElementById("mobile-menu")
      const mobileMenuLinks = document.getElementsByName("mobile-menu-links")
      const isLink = mobileMenuLinks.item(1)
      console.log(e.target.name)

      if (e.target.name == "mobile-menu-links") {
        console.log("hello")
        setToggleMobileMenu(true)
        mobileMenuButton.classList.remove("toggle-btn")
      }

      if (mobileMenuButton.contains(e.target)) {
        //Click on Hamburger Button
        if (toggleMobileMenu) {
          setToggleMobileMenu(false)
          mobileMenuButton.classList.add("toggle-btn")
        }
        if (!toggleMobileMenu) {
          setToggleMobileMenu(true)
          mobileMenuButton.classList.remove("toggle-btn")
        }
      }

      if (
        !mobileMenu.contains(e.target) &&
        !mobileMenuButton.contains(e.target) &&
        toggleMobileMenu
      ) {
        setToggleMobileMenu(false)
        mobileMenuButton.classList.remove("toggle-btn")
      }
    }
  }

  return (
    <div className="fixed md:sticky w-full xl:h-20 h-16 z-40 top-0 bg-transparent md:bg-dark-blue md:backdrop-filter md:backdrop-blur-lg md:bg-opacity-75 md:border-b md:border-bright-orange">
      <div className="flex flex-row w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 justify-between">
        <div className="flex flex-row justify-between md:justify-start w-full h-full items-center md:space-x-8">
          <div id="desktop-logo" className="md:flex hidden h-full py-1 ">
            <Link href="/">
              <a className="relative w-[45px] h-[56px] xl:w-[56px] xl:h-[70px]">
                <Image
                  src="/media/logo/Buch.png"
                  alt="logo-desktop"
                  layout={"fill"}
                  priority
                ></Image>
              </a>
            </Link>
          </div>
          <div
            id="mobile-logo"
            className="flex md:hidden w-[20%] py-1 justify-center"
          >
            <Link passHref href="/">
              <a className="relative w-[56px] h-[70px]">
                <Image
                  src="/media/logo/Buch.png"
                  alt="logo-mobile"
                  layout={"fill"}
                  priority
                ></Image>
              </a>
            </Link>
          </div>
          <div className="flex md:hidden w-[20%] items-center justify-center">
            <button
              id="mobile-menu-button"
              onClick={(e) => handleMobileMenu(e)}
              className="z-40 relative h-8 w-8 cursor-pointer text-3xl md:hidden"
            >
              <div
                className={`h-1 w-8 rounded bg-bright-orange transition-all duration-500 before:absolute before:h-1 before:w-8 before:-translate-x-4 before:-translate-y-3 before:rounded before:bg-bright-orange before:transition-all before:duration-500 before:content-[''] after:absolute after:h-1 after:w-8 after:-translate-x-4 after:translate-y-3 after:rounded after:bg-bright-orange after:transition-all after:duration-500 after:content-['']`}
              ></div>
            </button>
          </div>
          <section
            id="mobile-menu"
            className={`absolute top-0 md:hidden flex flex-col p-4 z-20 right-0 origin-right bg-black bg-opacity-90 w-4/6 border-bright-orange border-l-2 shadow-xl text-black h-screen ${
              toggleMobileMenu === "init"
                ? "hidden"
                : toggleMobileMenu === true
                ? "animate-close-mobile-menu"
                : "animate-open-mobile-menu"
            }`}
          >
            <div className="flex md:hidden w-[20%] text-bright-orange md:text-black md:w-2/6 items-center justify-center">
              <AuthButton></AuthButton>
            </div>

            <ul className="text-white text-2xl font-medium space-y-4 mt-10">
              {navigation.map((item, index) => (
                <li key={index}>
                  <Link href={item.to} passHref>
                    <a
                      name="mobile-menu-links"
                      className=" focus:bg-black focus:text-white p-4 w-full"
                      onClick={(e) => {
                        handleMobileMenu(e)
                      }}
                    >
                      {item.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <div
            id="navigation-desktop"
            className="space-x-2 hidden md:flex flex-row"
          >
            {navigation.map((item, index) => (
              <Link key={item.name} href={item.to}>
                <a
                  className={
                    "" + router.pathname === item.to
                      ? "px-2 py-2 hover:cursor-pointer rounded-md font-medium text-md lg:text-lg md:text-gray-300 border-sand-white dark:border-sand-white border-2 text-white"
                      : "px-2 py-2 hover:cursor-pointer rounded-md font-medium text-md lg:text-lg text-gray-100 md:text-gray-300 hover:bg-gray-700 hover:text-white border-2 border-transparent"
                  }
                >
                  {console.log(router.pathname, item.to)}

                  {item.name}
                </a>
              </Link>
            ))}
          </div>
        </div>
        <div className="h-16 xl:h-20 flex items-center justify-center">
          <AuthButton></AuthButton>
        </div>
      </div>
    </div>
  )
}
