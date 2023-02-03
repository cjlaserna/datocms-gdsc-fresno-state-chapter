import React from "react"
import Link from "next/link"

export default function Section({ SectionTitle, children }) {
  return (
    <section className="max-w-[85rem] w-full mx-auto px-10 py-5">
      {SectionTitle ? <h2 className="text-2xl font-bold pb-5">{SectionTitle}</h2> : ""}
      {children}
    </section>
  )
}
