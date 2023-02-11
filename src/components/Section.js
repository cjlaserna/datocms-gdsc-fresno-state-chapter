import React from "react"
import Link from "next/link"

export default function Section({ SectionTitle, centered, children }) {
  return (
    <section className={"max-w-[85rem] w-full mx-auto px-10 py-10"}>
      {SectionTitle ? (
        <h2 className={centered ? "text-2xl font-bold pb-5 text-center" : "text-2xl font-bold pb-5"}>{SectionTitle}</h2>
      ) : (
        ""
      )}
      {children}
    </section>
  )
}
