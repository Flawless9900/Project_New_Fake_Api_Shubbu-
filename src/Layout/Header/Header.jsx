import React from 'react'
import { Nav,Navbar,Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div>
        <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="registration">Registration Page</Nav.Link>
            <Nav.Link as={Link} to="login">Log In</Nav.Link>
            <Nav.Link as={Link} to="productdetails">Product Page</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header