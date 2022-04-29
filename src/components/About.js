import React from "react"
import { Container, Row, Col } from "react-bootstrap"

export default function About() {
  return (
    <Col lg={6} md={8}>
      <div className="title text-center mb-5">
        <h3 className="font-weight-normal text-dark">
          About <span className="text-warning">Us</span>
        </h3>
        <p className="text-muted">
          Lorem ipsum dolor sit amet, consectetur adipisci elit, sed do eiusmod tempor incidunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullamco laboriosam, nisi ut aliquid ex ea
          commodi consequatur.
        </p>
      </div>
    </Col>
  )
}
