// src/components/Header.jsx
import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="px-3">
      <Navbar.Brand as={Link} to="/" className="fw-bold">
        My Portfolio
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/" active={location.pathname === "/"}>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/about" active={location.pathname === "/about"}>
            About
          </Nav.Link>
          <Nav.Link as={Link} to="/projects" active={location.pathname === "/projects"}>
            Projects
          </Nav.Link>
          <Nav.Link as={Link} to="/contact" active={location.pathname === "/contact"}>
            Contact
          </Nav.Link>
          <Nav.Link as={Link} to="/admin" active={location.pathname === "/admin"}>
            Admin
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
