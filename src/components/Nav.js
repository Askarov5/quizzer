import React from 'react';
import { Container, Navbar, NavbarBrand, NavDropdown, NavLink } from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';

export default function Nav() {
  return (
    <div>
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <NavbarBrand href='#'>
                    Quizzer
                </NavbarBrand>
                <NavbarToggle aria-controls="responsive-navbar-nav" />
                <NavbarCollapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink href="#features">Features</NavLink>
                        <NavLink href="#pricing">Pricing</NavLink>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <NavLink href="#deets">More deets</NavLink>
                        <NavLink eventKey={2} href="#memes">
                            Dank memes
                        </NavLink>
                    </Nav>
                </NavbarCollapse>
            </Container>
        </Navbar>

    </div>
  )
}
