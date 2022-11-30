import "../styles/globals.css"
import { SessionProvider } from "next-auth/react"
import Navbar from "../Components/Navbar"
import AppContext from "../helpers/AppContext"
import { useEffect, useState } from "react"
import Footer from "../Components/Footer"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [rezepte, setRezepte] = useState([])
  const [user, setUser] = useState()
  const [kategorien, setKategorien] = useState([])

  return (
    <>
      <AppContext.Provider
        value={[rezepte, setRezepte, user, setUser, kategorien, setKategorien]}
      >
        <SessionProvider session={session}>
          <Navbar />
          <Component {...pageProps} />
          <Footer></Footer>
        </SessionProvider>
      </AppContext.Provider>
    </>
  )
}

export default MyApp
