import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import hero from "../assets/images/hero.png"
import Link from "next/link"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="section position-relative bg-light hero">
      <Container>
        <Row className="align-items-center">
          <Col lg={6}>
            <div className="pr-lg-5">
              <h1 className="mb-4 font-weight-normal line-height-1_4">
                Your Fantastic <span className="text-warning font-weight-medium">Landing Page</span>
              </h1>
              <p className="text-muted mb-4 pb-2">
                Lorem ipsum dolor sit amet, consectetur adipisci elit, sed do eiusmod tempor incidunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullamco laboriosam, nisi ut
                aliquid ex ea commodi consequatur.
              </p>
              <Link href="/">
                <a className="btn btn-warning">
                  Find Out More <span className="ml-2 right-icon">&#8594;</span>
                </a>
              </Link>
            </div>
          </Col>
          <Col lg={6}>
            <div className="mt-5 mt-lg-0">
              <Image
                layout={"responsive"}
                src={hero.src}
                width={1000}
                height={710}
                alt=""
                className="img-fluid mx-auto d-block"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
