import React from "react"
import { Container, Navbar, Nav } from "react-bootstrap"

export default function Header() {
  return (
    <div className={`header`}>
      <Navbar bf={"light"} expand="md">
        <Container>
          <Navbar.Brand href="/">Your Logo</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="m-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/">Portfolio</Nav.Link>
              <Nav.Link href="/">Our Team</Nav.Link>
              <Nav.Link href="/">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}
