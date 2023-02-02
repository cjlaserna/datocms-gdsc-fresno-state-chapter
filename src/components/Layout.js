import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import footerLinks from "../assets/footer.json"

export default function Layout({ children }) {
  return (
    <>
      <div className="bg-base-100 ">
        <Header />
        <div>{children}</div>
        <Footer links={footerLinks} />
      </div>
    </>
  )
}
