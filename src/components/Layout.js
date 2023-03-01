import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import footerLinks from "../assets/footer.json"
import Head from "next/head"

export default function Layout({ children }) {
  return (
    <>
      <div className="bg-base-100 flex flex-col">
        <Header />
        <div>{children}</div>
        <Footer links={footerLinks} />
      </div>
    </>
  )
}
