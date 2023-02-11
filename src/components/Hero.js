import React from "react"
import Link from "next/link"
import { useEffect } from "react"

// @TODO: Add support for custom bg images
export default function Hero({ record: { heroTitle, heroSubtitle, heroImage, linkText, linkUrl, pageLink } }) {
  return (
    <section className="relative min-h-300 heroImg flex justify-center items-center">
      <div className="w-11/12 md:w-3/4 lg:w-1/2 grid md:min-h-fit lg:min-h-fit bg-base-100 px-6 py-6 md:py-8 md:px-8 lg:py-10 ld:px-10">
        <div className="justify-self-start">
          <h1 className="font-bold text-lg md:text-2xl lg:text-3xl">{heroTitle}</h1>
          {heroSubtitle ? <p className="text-md md:text-xl lg:text-2xl">{heroSubtitle}</p> : ""}
        </div>
        <div className="justify-self-end self-end">
          {linkText ? (
            <Link href={linkUrl ? `linkUrl` : `/pages/${pageLink.slug}`}>
              <a className="btn btn-primary">{linkText}</a>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* @TODO: add support for custom hero imgs.. */}
    </section>
  )
}
