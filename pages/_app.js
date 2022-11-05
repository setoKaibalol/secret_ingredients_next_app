import "../styles/globals.css"
import { SessionProvider } from "next-auth/react"
import Navbar from "../Components/Navbar"
import AppContext from "../helpers/AppContext"
import { useEffect, useState } from "react"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [rezepte, setRezepte] = useState([])

  return (
    <>
      <AppContext.Provider value={[rezepte, setRezepte]}>
        <SessionProvider session={session}>
          <Navbar />
          <Component {...pageProps} />
        </SessionProvider>
      </AppContext.Provider>
    </>
  )
}

export default MyApp
