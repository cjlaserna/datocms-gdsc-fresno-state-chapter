import React from "react"
import Link from "next/link"
import { FiCalendar, FiMapPin } from "react-icons/fi"

export default function EventCard({ cardTitle, cardDesc, cardDate, cardLoc, buttonTitle, buttonLink }) {
  return (
    <div className="card w-full sm:w-full md:w-[90%] bg-primary-focus text-primary-content image-full">
      <div className="card-body">
        <h2 className="card-title">{cardTitle}</h2>
        <p>
          <FiCalendar className="inline mr-[5px]" />
          {cardDate}
          <FiMapPin className="inline mx-[5px]" />
          {cardLoc}
        </p>
        <p>{cardDesc ? cardDesc : ""}</p>
        <div className="card-actions justify-end mt-10">
          {buttonLink ? (
            <Link href={buttonLink}>
              <a className="btn btn-primary">{buttonTitle}</a>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  )
}
