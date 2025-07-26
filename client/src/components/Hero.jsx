// src/components/Hero.jsx
import React from "react";
import { Container, Button } from "react-bootstrap";

export default function Hero() {
  return (
    <div className="bg-dark text-light text-center py-5">
      <Container>
        <h1 className="display-4 fw-bold">Hi, I'm Anthony Pirolli Jr</h1>
        <p className="lead mt-3">
          A full-stack web developer specializing in React, Express, and MongoDB.
        </p>
        <Button variant="primary" size="lg" href="/contact" className="mt-3">
          Contact Me
        </Button>
      </Container>
    </div>
  );
}
