import { Disclosure, Menu } from "@headlessui/react"
import { MenuIcon, BellIcon, UserIcon, XIcon } from "@heroicons/react/outline"
import Link from "next/link"
import { US, DE } from "country-flag-icons/react/3x2"
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/router"

export default function Header() {
  const { data: session } = useSession()
  const router = useRouter()
  const language = "de"
  const navigation = session
    ? [
        {
          name: "Über Uns",
          to: "/de/about",
          subcategory: false,
        },
        ,
        {
          name: "Klassische Rezepte",
          to: "/de/grundrezepte",
          subcategory: false,
        },
        {
          name: "Geheimrezepte",
          to: "/de/geheimrezepte",
          subcategory: false,
        },
        {
          name: "User Rezepte",
          to: "/de/userrezepte",
          subcategory: false,
        },
        {
          name: "Baukasten",
          to: "/de/baukasten",
          subcategory: false,
        },
      ]
    : [
        {
          name: "Über Uns",
          to: "/de/about",
          subcategory: false,
        },
        ,
        {
          name: "Klassische Rezepte",
          to: "/de/grundrezepte",
          subcategory: false,
        },
        {
          name: "Geheimrezepte",
          to: "/de/geheimrezepte",
          subcategory: false,
        },
        {
          name: "User Rezepte",
          to: "/de/userrezepte",
          subcategory: false,
        },
      ]

  return (
    <div className="sticky z-20 top-0 bg-dark-blue dark:bg-dark-blue backdrop-filter backdrop-blur-lg bg-opacity-60 dark:backdrop-filter dark:backdrop-blur-lg dark:bg-opacity-75 border-b border-bright-orange dark:border-bright-orange">
      <Disclosure>
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 dark:text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6 " aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                <div className="flex-1 flex items-center justify-center sm:justify-start">
                  <div className="items-center">
                    <div className="lg:hidden">
                      <Link passHref href="/">
                        <a>
                          <Image
                            id="mobile-logo"
                            className="h-16 w-auto cursor-pointer"
                            height={40}
                            width={40}
                            src="/media/logo/originial_no_text.png"
                            alt="mobile-logo"
                          />
                        </a>
                      </Link>
                    </div>
                    <div className="hidden lg:block">
                      <Link passHref href="/">
                        <a>
                          <Image
                            id="logo"
                            className="h-14 w-auto cursor-pointer"
                            src="/media/logo/originial_no_text.png"
                            height={55}
                            width={55}
                            alt="logo"
                          />
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className="hidden lg:pl-20 sm:block sm:ml-2">
                    <div className="flex space-x-1 md:space-x-4">
                      {navigation.map((item) =>
                        item.subcategory ? (
                          <div className="group inline-block relative py-2">
                            <div
                              className={
                                "px-2 py-2 rounded-md font-medium text-lg text-gray-100 md:text-gray-300" +
                                  router.pathname ==
                                item.to
                                  ? " border-sand-white dark:border-sand-white border-2 text-white"
                                  : " hover:bg-gray-700 hover:text-white border-2 border-transparent"
                              }
                            >
                              <Link key={item.name} href={item.to}>
                                {item.name}
                              </Link>
                            </div>
                            <ul className="w-80 mt-3 shadow-sm shadow-slate-500 fixed hidden p-2 border border-sand-white group-hover:block rounded-sm text-gray-700 dark:text-white bg-sand-white dark:bg-bright-orange">
                              {item.subcategorys.map((item) =>
                                item.subcategory ? (
                                  <>
                                    <li>
                                      <Link
                                        href={item.to}
                                        className={
                                          "block px-6 py-2 text-md font-medium rounded-lg" +
                                            router.pathname ==
                                          "/"
                                            ? " dark:bg-dark-blue border text-white"
                                            : " hover:bg-gray-300 dark:hover:bg-dark-blue border border-transparent"
                                        }
                                      >
                                        {item.name}
                                      </Link>
                                    </li>
                                    <ul>
                                      {item.subcategorys.map((item) => (
                                        <li>
                                          <Link
                                            href={item.to}
                                            className={
                                              "pl-10 block px-6 py-2 text-sm font-medium rounded-lg" +
                                                router.pathname ==
                                              "/"
                                                ? " dark:bg-dark-blue border text-white"
                                                : " hover:bg-gray-300 dark:hover:bg-dark-blue border border-transparent"
                                            }
                                          >
                                            {item.name}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </>
                                ) : (
                                  <li>
                                    <Link
                                      href={item.to}
                                      className={
                                        "block px-6 py-2 text-sm font-medium rounded-lg" +
                                          router.pathname ==
                                        "/"
                                          ? " border-sand-white dark:border-sand-white border-2 text-white"
                                          : " hover:bg-gray-300 dark:hover:bg-gray-600 border-2 border-transparent"
                                      }
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        ) : (
                          <Link key={item.name} href={item.to}>
                            <div
                              className={
                                router.pathname == item.to
                                  ? "cursor-pointer px-2 py-2 rounded-md text-md font-medium md:text-gray-300 border-sand-white dark:border-sand-white border-2 text-white"
                                  : "cursor-pointer px-2 py-2 rounded-md text-md font-medium text-gray-100 md:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 border-2 border-transparent"
                              }
                            >
                              {item.name}{" "}
                            </div>
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </div>
                {session ? (
                  <div className="inset-y-0 right-0 flex items-center pr-2 sm:ml-6 sm:pr-0 sm:mr-4">
                    <button
                      type="button"
                      className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <UserIcon className=" h-6 w-6"></UserIcon>
                        </Menu.Button>
                      </div>

                      <Menu.Items className="space-y-1 origin-top-right w-36 absolute right-0 mt-2 shadow-sm shadow-slate-500 p-2 rounded-sm text-gray-700 dark:text-white bg-sand-white dark:bg-bright-orange dark:border-sand-white border">
                        <Menu.Item>
                          {({ active }) => (
                            <Link href="/account">
                              <button
                                className={
                                  "" + router.pathname == "/de/profil"
                                    ? "w-full block px-4 py-2 text-sm font-medium rounded-md dark:bg-dark-blue border text-white"
                                    : "w-full block px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-300 dark:hover:bg-dark-blue border border-transparent"
                                }
                              >
                                Account
                              </button>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          <Link href="/de/profil">
                            <button
                              className={
                                "" + router.pathname == "/de/profil"
                                  ? "w-full block px-4 py-2 text-sm font-medium rounded-md dark:bg-dark-blue border text-white"
                                  : "w-full block px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-300 dark:hover:bg-dark-blue border border-transparent"
                              }
                            >
                              Profil
                            </button>
                          </Link>
                        </Menu.Item>
                        <div className="border-2 dark:border-slate-700 -mx-2"></div>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className="block px-6 py-2 text-sm font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-dark-blue border border-transparent w-full"
                              onClick={() => {
                                signOut()
                              }}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </div>
                ) : (
                  <div className="flex">
                    <div className="hidden lg:flex items-center justify-end">
                      <button
                        onClick={() => signIn()}
                        className="mx-2 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-gray-600"
                      >
                        anmelden
                      </button>
                    </div>
                    <div className="hidden lg:flex items-center justify-end md:mr-6">
                      <Link href="/de/auth/konto-erstellen">
                        <button className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-bright-orange hover:bg-orange-400">
                          konto erstellen
                        </button>
                      </Link>
                    </div>

                    <div className="group lg:hidden inline-block p-2">
                      <div className="lg:hidden flex bg-gray-700 rounded-2xl w-24 h-9 justify-center cursor-pointer">
                        <button className="text-gray-200">anmelden</button>
                      </div>
                      <ul className="group w-auto items-center text-start shadow-sm mt-2 shadow-slate-500 fixed hidden p-2 group-hover:block rounded-lg text-gray-700 dark:text-white bg-sand-white dark:bg-bright-orange dark:border-gray-500 dark:border-1 -ml-9 xl:-ml-0">
                        <li>
                          <Link
                            href="/login"
                            className="block px-6 py-2 text-sm rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                          >
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/de/auth/konto-erstellen"
                            className="block px-6 py-2 text-sm rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                          >
                            Registrieren
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
                <div className="flex space-x-4 pl-6 xl:pl-0">
                  <div className="group inline-block relative py-2">
                    <div className="flex bg-gray-700 rounded-2xl w-9 h-9 justify-center cursor-pointer">
                      <button className="">
                        {language === "de" ? (
                          <DE title="Germany" className="w-6 h-auto"></DE>
                        ) : (
                          <US title="United States" className="w-6 h-auto"></US>
                        )}
                      </button>
                    </div>
                    <ul className=" w-20 mt-2 shadow-sm shadow-slate-500 fixed hidden p-2 group-hover:block rounded-sm text-gray-700 dark:text-white bg-sand-white dark:bg-bright-orange dark:border-sand-white dark:border -ml-11 xl:-ml-0">
                      <li>
                        <button
                          onClick={() => {
                            setLanguage("en")
                            console.log(language)
                          }}
                          className="p-2 text-sm font-medium rounded-sm w-full justify-center flex flex-col hover:bg-gray-300 dark:hover:bg-dark-blue text-gray-700 dark:text-white"
                        >
                          <US title="United States" className="w-8 h-auto"></US>
                          englisch
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            setLanguage("de")
                            console.log(language)
                          }}
                          className="p-2 text-sm font-medium rounded-sm w-full justify-center flex flex-col hover:bg-gray-300 dark:hover:bg-dark-blue text-gray-700 dark:text-white"
                        >
                          <DE title="Germany" className="w-8 h-auto"></DE>
                          deutsch
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden absolute bg-dark-blue w-screen px-2 pt-2 pb-3 space-y-1 h-screen">
              {/* mobile menu */}
              {({ close }) =>
                navigation.map((item) =>
                  item.subcategory ? (
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            key={item.name}
                            className="text-gray-300 hover:bg-gray-700 hover:text-white
                                flex w-full justify-between px-3 py-2 rounded-md text-base font-medium"
                          >
                            {item.name}
                            {open ? (
                              <ChevronUpIcon
                                className=" h-4 w-4"
                                aria-hidden="true"
                              ></ChevronUpIcon>
                            ) : (
                              <ChevronDownIcon
                                className=" h-4 w-4"
                                aria-hidden="true"
                              ></ChevronDownIcon>
                            )}
                          </Disclosure.Button>
                          <Disclosure.Panel>
                            {item?.subcategorys.map((item) =>
                              item.subcategory ? (
                                <Disclosure>
                                  {({ open }) => (
                                    <>
                                      <Disclosure.Button
                                        key={item.name}
                                        className="pl-10 text-gray-300 hover:bg-gray-700 hover:text-white flex w-full justify-between px-3 py-2 rounded-md text-base font-medium"
                                      >
                                        {item.name}
                                        {open ? (
                                          <ChevronUpIcon
                                            className=" h-4 w-4"
                                            aria-hidden="true"
                                          ></ChevronUpIcon>
                                        ) : (
                                          <ChevronDownIcon
                                            className=" h-4 w-4"
                                            aria-hidden="true"
                                          ></ChevronDownIcon>
                                        )}
                                      </Disclosure.Button>
                                      <Disclosure.Panel>
                                        {item.subcategorys.map((item) => (
                                          <button
                                            className="w-full text-left"
                                            onClick={close}
                                          >
                                            <Link
                                              key={item.name}
                                              href={item.to}
                                              className={
                                                "block px-3 py-2 pl-20 rounded-md text-base font-small text-gray-300" +
                                                  router.pathname ==
                                                "/"
                                                  ? " text-white bg-black"
                                                  : " hover:bg-gray-700 hover:text-white"
                                              }
                                            >
                                              {item.name}
                                            </Link>
                                          </button>
                                        ))}
                                      </Disclosure.Panel>
                                    </>
                                  )}
                                </Disclosure>
                              ) : (
                                <button
                                  className="w-full text-left"
                                  onClick={close}
                                >
                                  <Link
                                    key={item.name}
                                    href={item.to}
                                    className={
                                      "block px-3 py-2 pl-10 rounded-md text-base font-small text-gray-300" +
                                        router.pathname ==
                                      "/"
                                        ? " text-white bg-black"
                                        : " hover:bg-gray-700 hover:text-white"
                                    }
                                    aria-current={
                                      item.current ? "page" : undefined
                                    }
                                  >
                                    {item.name}
                                  </Link>
                                </button>
                              )
                            )}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ) : (
                    <button onClick={close} className="w-full text-left">
                      <Link
                        key={item.name}
                        href={item.to}
                        className={
                          router.pathname == "/"
                            ? " text-white bg-black"
                            : " hover:bg-gray-700 hover:text-white"
                        }
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    </button>
                  )
                )
              }
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  )
}
