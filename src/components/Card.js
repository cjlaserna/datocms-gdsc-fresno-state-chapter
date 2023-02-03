import React from "react"
import Link from "next/link"

export default function Card({ cardTitle, cardDesc, buttonTitle, buttonLink }) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl image-full">
      <figure>
        <img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{cardTitle}</h2>
        <p>{cardDesc}</p>
        <div className="card-actions justify-end">
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
