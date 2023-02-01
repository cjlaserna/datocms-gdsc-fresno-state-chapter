import React from "react"
import { Container, Navbar, Nav } from "react-bootstrap"
import Image from "next/image"
import googleDevLogo from "../assets/google_developers_logomark_color.png"

export default function Header() {
  return (
    <div className={"header"}>
      <Navbar bf={"light"} expand="md">
        <Container>
          <Navbar.Brand href="/">
            <div className="flex justify-center items-center">
              <div className="w-4 inline-block flex justify-center items-center">
                <Image src={googleDevLogo} alt="Google Student Developers Club Logo" fill />
              </div>
              <p className="mx-2">GSDC - Fresno State</p>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="m-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="#services">Services</Nav.Link>
              <Nav.Link href="#about-us">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}
