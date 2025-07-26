import { Container } from "react-bootstrap";
import Hero from "../components/Hero";


export default function Home() {
  return (
    <>
      <Hero />
      <Container className="mt-5">
        <h2>Welcome to my Portfolio</h2>
        <p>Check out my latest projects below.</p>
      </Container>
    </>
  );
}

