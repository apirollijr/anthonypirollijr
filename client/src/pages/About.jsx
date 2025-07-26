import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Hero from "../components/Hero";

export default function About() {
  return (
    <>
      <Hero
        title="About Me"
        subtitle="Get to know me better"
      />

      <Container className="py-5">
        <Row className="align-items-center">
          <Col md={4} className="text-center">
            <Image
              src="/profile.jpg"
              roundedCircle
              fluid
              alt="Profile"
            />
          </Col>
          <Col md={8}>
            <h2>Who I Am</h2>
            <p className="lead">
              Hi! I'm [Your Name], a passionate full-stack web developer specializing in 
              React, Express, and MongoDB. I love building modern, fast, and responsive applications.
            </p>
            <p>
              Outside of coding, I enjoy [hobbies or interests]. I'm always learning new technologies 
              and pushing myself to grow as a developer.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
