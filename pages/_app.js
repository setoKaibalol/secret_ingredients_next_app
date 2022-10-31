import "../styles/globals.css"
import { SessionProvider } from "next-auth/react"
import Navbar from "../Components/Navbar"
import AppContext from "../helpers/AppContext"
import { useEffect, useState } from "react"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [grundrezepte, setGrundrezepte] = useState([])
  const [geheimrezepte, setGeheimrezepte] = useState([])

  return (
    <>
      <SessionProvider session={session}>
        <Navbar />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}

export default MyApp
