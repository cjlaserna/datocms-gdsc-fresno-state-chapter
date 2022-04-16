import React from "react"
import { Row, Col } from "react-bootstrap"
import serviceImg from "../assets/images/service.png"
import Image from "next/image"
import Link from "next/link"

export default function Service({ service }) {
  return (
    <>
      {service.id % 2 !== 0 ? (
        <Row className={service.id === 1 ? "align-items-center" : "align-items-center mt-5"}>
          <Col md={5}>
            <div>
              <Image
                layout={"responsive"}
                src={service.img || serviceImg.src}
                width={1000}
                height={667}
                alt=""
                className="img-fluid d-block mx-auto"
              />
            </div>
          </Col>
          <Col md={{ size: 6, offset: 1 }}>
            <div className="mt-5 mt-sm-0 mb-4">
              <h5 className="text-dark font-weight-normal mb-3 pt-3">{service.title}</h5>
              <p className="text-muted mb-3 f-15">{service.description}</p>
              <Link href={service.url}>
                <a className="f-16 text-warning">
                  Try It Now <span className="right-icon ml-2">&#8594;</span>
                </a>
              </Link>
            </div>
          </Col>
        </Row>
      ) : (
        <Row className="align-items-center mt-5">
          <Col md={6}>
            <div className="mb-4">
              <h5 className="text-dark font-weight-normal mb-3 pt-3">{service.title}</h5>
              <p className="text-muted mb-3 f-15">{service.description}</p>
              <Link href={service.url}>
                <a className="f-16 text-warning">
                  Try It Now <span className="right-icon ml-2">&#8594;</span>
                </a>
              </Link>
            </div>
          </Col>
          <Col md={{ size: 5, offset: 1 }} className="mt-5 mt-sm-0">
            <div>
              <Image
                layout={"responsive"}
                src={service.img || serviceImg.src}
                width={1000}
                height={667}
                alt=""
                className="img-fluid d-block mx-auto"
              />
            </div>
          </Col>
        </Row>
      )}
    </>
  )
}
