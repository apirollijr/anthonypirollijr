import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Table, Toast, ToastContainer } from "react-bootstrap";

export default function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    githubUrl: "",
    imageUrl: "",
  });
  const [toast, setToast] = useState({ show: false, message: "", variant: "info" });

  // Utility function to show a toast
  const showToast = (message, variant = "info") => {
    setToast({ show: true, message, variant });
    setTimeout(() => setToast({ show: false, message: "", variant: "info" }), 3000);
  };

  // Fetch projects after login
  useEffect(() => {
    if (token) {
      fetch("/api/projects")
        .then((res) => res.json())
        .then((data) => setProjects(data))
        .catch(() => showToast("Failed to fetch projects", "danger"));
    }
  }, [token]);

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Login failed");
      const data = await res.json();
      localStorage.setItem("token", data.token);
      setToken(data.token);
      showToast("Login successful!", "success");
    } catch (err) {
      showToast(err.message, "danger");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setProjects([]);
    showToast("Logged out successfully.", "info");
  };

  // Handle adding project
  const handleAddProject = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(newProject),
      });

      if (res.ok) {
        const added = await res.json();
        setProjects([added, ...projects]);
        setNewProject({ title: "", description: "", githubUrl: "", imageUrl: "" });
        showToast("Project added successfully", "success");
      } else {
        const data = await res.json();
        showToast(data.msg || data.error || "Failed to add project", "danger");
      }
    } catch (err) {
      showToast("Error adding project", "danger");
    }
  };

  // Handle delete project
  const handleDeleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: { "x-auth-token": token },
      });

      if (res.ok) {
        setProjects(projects.filter((p) => p._id !== id));
        showToast("Project deleted", "success");
      } else {
        const data = await res.json();
        showToast(data.msg || data.error || "Failed to delete project", "danger");
      }
    } catch (err) {
      showToast("Error deleting project", "danger");
    }
  };

  // Show login form if not logged in
  if (!token) {
    return (
      <Container className="py-5">
        <h2>Admin Login</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit">Login</Button>
        </Form>
        <ToastContainer position="top-end" className="p-3">
          <Toast bg="danger" show={toast.show && toast.variant === "danger"}>
            <Toast.Body className="text-white">{toast.message}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Container>
    );
  }

  // Show admin dashboard
  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Admin Dashboard</h1>
        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-end" className="p-3">
        <Toast bg={toast.variant} show={toast.show}>
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Add Project Form */}
      <Row className="mb-4">
        <Col md={6}>
          <h2>Add New Project</h2>
          <Form onSubmit={handleAddProject}>
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>GitHub URL</Form.Label>
              <Form.Control
                type="text"
                value={newProject.githubUrl}
                onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={newProject.imageUrl}
                onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Add Project
            </Button>
          </Form>
        </Col>
      </Row>

      {/* Projects List */}
      <Row>
        <Col>
          <h2>Existing Projects</h2>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>GitHub</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((proj) => (
                <tr key={proj._id}>
                  <td>{proj.title}</td>
                  <td>{proj.description}</td>
                  <td>
                    <a href={proj.githubUrl} target="_blank" rel="noreferrer">
                      View
                    </a>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteProject(proj._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
