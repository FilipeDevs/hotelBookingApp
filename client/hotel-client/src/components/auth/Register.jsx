import React, { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../utils/API";
import { Alert, Button, Form, Container, Stack } from "react-bootstrap";

function Register() {
  const [registration, setRegistration] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    setRegistration({ ...registration, [e.target.name]: e.target.value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const result = await register(registration);
      setSuccessMessage(result);
      setErrorMessage("");
      setRegistration({ firstName: "", lastName: "", email: "", password: "" });
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(`Registration error : ${error.message}`);
    }
    setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 5000);
  };

  return (
    <Container className="col-6 mt-5 mb-5">
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <h2>Register</h2>
      <Form onSubmit={handleRegistration}>
        <Form.Group className="mb-3">
          <Form.Label className="mb-3">First Name</Form.Label>
          <Form.Control
            id="firstName"
            name="firstName"
            type="text"
            value={registration.firstName}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="lastName" sm={2}>
            Last Name
          </Form.Label>
          <Form.Control
            id="lastName"
            name="lastName"
            type="text"
            value={registration.lastName}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="email" column sm={2}>
            Email
          </Form.Label>
          <Form.Control
            id="email"
            name="email"
            type="email"
            value={registration.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password" column sm={2}>
            Password
          </Form.Label>

          <Form.Control
            type="password"
            id="password"
            name="password"
            value={registration.password}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Stack direction="horizontal" gap={3}>
          <div className="">
            <Button type="submit">Register</Button>
          </div>
          <div className="p-2">
            <span className="">
              Already have an account ? <Link to="/login">Login</Link>
            </span>
          </div>
        </Stack>
      </Form>
    </Container>
  );
}

export default Register;
