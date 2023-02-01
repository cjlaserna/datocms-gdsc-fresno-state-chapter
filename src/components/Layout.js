import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import footerLinks from "../assets/footer.json"

export default function Layout({ children }) {
  return (
    <div className="bg-white dark:bg-black">
      <Header />
      <div>{children}</div>
      <Footer links={footerLinks} />
      <script src="./assets/vendor/preline/dist/preline.js"></script>
    </div>
  )
}
