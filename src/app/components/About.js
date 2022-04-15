import React from "react"
import { Container, Row, Col } from "react-bootstrap"

export default function About() {
  return (
    <section className="section bg-light" id="about">
      <Container>
        <Row className="justify-content-center">
          <Col lg={6} md={8}>
            <div className="title text-center mb-5">
              <h3 className="font-weight-normal text-dark">
                About <span className="text-warning">Us</span>
              </h3>
              <p className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisci elit, sed do eiusmod tempor incidunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullamco laboriosam, nisi ut
                aliquid ex ea commodi consequatur.
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <h2 className="font-weight-light line-height-1_6 text-dark mb-4">Lorem ipsum dolor sit amet</h2>
          </Col>
          <Col md={{ size: 7, offset: 1 }}>
            <Row>
              <Col md={6}>
                <h6 className="text-dark font-weight-light f-20 mb-3">Our Goal</h6>
                <p className="text-muted font-weight-light">
                  Lorem ipsum dolor sit amet, consectetur adipisci elit, sed do eiusmod tempor incidunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullamco laboriosam, nisi ut
                  aliquid ex ea commodi consequatur.
                </p>
              </Col>
              <Col md={6}>
                <h6 className="text-dark font-weight-light f-20 mb-3">Our Strategy</h6>
                <p className="text-muted font-weight-light">
                  Lorem ipsum dolor sit amet, consectetur adipisci elit, sed do eiusmod tempor incidunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullamco laboriosam, nisi ut
                  aliquid ex ea commodi consequatur.
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
