import React from "react"

export default function About({ record }) {
  return (
    <div md={4} key={record.id}>
      <div className="text-dark font-weight-light f-20 mb-3">
        <h6 className="font-weight-normal text-dark">{record.title}</h6>
        <p className="text-muted font-weight-light">{record.text}</p>
      </div>
    </div>
  )
}
