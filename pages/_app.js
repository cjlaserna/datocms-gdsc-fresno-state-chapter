import "../styles/globals.css"
import "../styles/blocks.css"
import { ThemeProvider } from "next-themes"
import { useEffect } from "react"

function MyApp({ Component, pageProps }) {
  // this will trigger errors when you resize your page really fast...
  // @TODO: Find out why this breaks

  const handleWindowSizeChange = () => {
    import("preline")
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange)
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange)
    }
  }, [])

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
