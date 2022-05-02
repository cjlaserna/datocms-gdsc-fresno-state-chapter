import React from "react"
import Head from "next/head"
import Header from "./Header"
import Footer from "./Footer"
import footerLinks from "../assets/footer.json"

export default function Layout(props) {
  return (
    <div>
      <Head>
        <title>{props.pageTitle}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      </Head>
      <Header />
      <div>{props.children}</div>
      <Footer links={footerLinks} />
    </div>
  )
}
