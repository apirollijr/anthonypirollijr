// src/components/Footer.jsx
import React from "react";
import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
  <Container className="text-center">
    <p className="mb-0">© {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
  </Container>
</footer>

  );
}
