import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner, Modal } from "react-bootstrap";

const FALLBACK_IMAGE = "https://placehold.co/600x300?text=No+Image";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const openModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setShowModal(false);
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">My Projects</h1>
      <Row>
        {projects.map((proj) => (
          <Col key={proj._id} md={4} className="mb-4">
            <Card className="h-100 shadow-sm d-flex flex-column">
              <Card.Img
                variant="top"
                src={proj.imageUrl || FALLBACK_IMAGE}
                alt={proj.title}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{proj.title}</Card.Title>
                <Card.Text className="flex-grow-1">
                  {proj.description.substring(0, 100)}...
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => openModal(proj)}
                  className="mt-auto"
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal */}
      {selectedProject && (
        <Modal show={showModal} onHide={closeModal} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProject.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={selectedProject.imageUrl || FALLBACK_IMAGE}
              alt={selectedProject.title}
              className="img-fluid mb-3"
            />
            <p>{selectedProject.description}</p>
            {selectedProject.githubUrl && (
              <Button
                variant="primary"
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </Button>
            )}
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
}
