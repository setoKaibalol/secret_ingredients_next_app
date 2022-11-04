import "../styles/globals.css"
import { SessionProvider } from "next-auth/react"
import Navbar from "../Components/Navbar"
import AppContext from "../helpers/AppContext"
import { useEffect, useState } from "react"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [rezepte, setRezepte] = useState([])

  useEffect(() => {
    const lol = async () => {
      const res = await fetch("https://secret-ingredients.vercel.app/" + 1)
      const recipe = await res.json()
      console.log(recipe)
    }
    lol()
  }, [])

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
