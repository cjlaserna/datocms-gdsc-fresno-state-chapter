import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import footerLinks from "../assets/footer.json"
import Script from "next/script"
import Head from "next/head"

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <Script src="./assets/vendor/preline/dist/preline.js"></Script>
      </Head>
      <div className="bg-white dark:bg-black">
        <Header />
        <div>{children}</div>
        <Footer links={footerLinks} />
      </div>
    </>
  )
}
