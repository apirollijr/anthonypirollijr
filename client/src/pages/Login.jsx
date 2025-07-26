// src/pages/Login.jsx
import React from "react";
import { Container, Form, Button } from "react-bootstrap";

export default function Login() {
  return (
    <Container className="py-5" style={{ maxWidth: "400px" }}>
      <h1 className="mb-4 text-center">Login</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter your email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter your password" />
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit">
            Login
          </Button>
        </div>
      </Form>
    </Container>
  );
}
