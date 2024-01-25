import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "./AuthProvider";
import { loginUser } from "../utils/API";
import { Container, Alert, Form, Button, Stack } from "react-bootstrap";
import { toast } from "react-toastify";

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const auth = useAuthContext();
  const location = useLocation();
  const redirectUrl = location.state?.path || "/";

  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginUser(login);
    if (success) {
      const token = success.token;
      auth.handleLogin(token);
      toast.success("Login successful!");
      navigate(redirectUrl, { replace: true });
    } else {
      setErrorMessage("Invalid username or password. Please try again.");
    }
    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };

  return (
    <Container className="col-6 mt-5 mb-5">
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email" column sm={2}>
            Email
          </Form.Label>
          <Form.Control
            id="email"
            name="email"
            type="email"
            value={login.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password" column sm={2}>
            Password
          </Form.Label>

          <Form.Control
            id="password"
            name="password"
            type="password"
            value={login.password}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Stack direction="horizontal" gap={3}>
          <div className="">
            <Button type="submit">Login</Button>
          </div>
          <div className="p-2">
            <span className="">
              Don't have an account yet? <Link to="/register">Register</Link>
            </span>
          </div>
        </Stack>
      </Form>
    </Container>
  );
}

export default Login;
