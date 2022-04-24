import React from 'react';
import Container from 'react-bootstrap/Container';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'


function NavbarComponent() {
  return (
    <div>
      <Container fluid>
        <Navbar style={{backgroundColor:"#ce2127"}} expand="lg">
          <Container>
            <Navbar.Brand href="/">Neerej</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <LinkContainer to="/">
                  <Nav.Link >Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/about">
                  <Nav.Link>About</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/services">
                  <Nav.Link>Services</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    </div>
  );
}

export default NavbarComponent;
