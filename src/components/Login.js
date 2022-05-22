import React, { useEffect, useState } from 'react';
import { Alert, Col, Container, Row, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

import validationLogin from './validationLogin';

function Login(props) {
  const [user, setUser] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [hasError, setHasError] = useState(true);
  const [loader, setLoader] = useState(false);

  const { isLogin, setIsLogin } = props;

  useEffect(() => {
    if (hasError === false && Object.keys(errors).length === 0) {
      const loadLogin = async () => {
        setLoader(true);
        const response = await axios.post(
          'http://localhost:3300/v1/auth/login',
          user
        );

        if (response.data.status) {
          localStorage.setItem('userToken', response.data.token);
          setIsLogin(response.data.status);
        } else if (response.data.emailError) {
          setErrors({ emailError: response.data.message });
          setLoader(false);
        } else {
          setErrors({ passwordError: response.data.message });
          setLoader(false);
        }
      };
      setLoader(false);
      loadLogin();
    }
  }, [errors]);

  const handleCahnge = (event) => {
    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validationLogin(user));
    setHasError(false);
  };

  if (isLogin) {
    return <Navigate to="/dashboard" />;
  } else {
    return (
      <Container>
        {loader ? (
          <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">
            Loadding...
          </h1>
        ) : (
          <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">
            Log In
          </h1>
        )}
        <Row className="mt-5">
          <Col
            lg={5}
            md={6}
            sm={12}
            className="p-5 m-auto shadow-sm rounded-lg"
          >
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={handleCahnge}
                  value={user.email}
                />
              </Form.Group>
              {errors.emailError && (
                <Alert variant="danger">{errors.emailError}</Alert>
              )}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleCahnge}
                  value={user.password}
                />
              </Form.Group>
              {errors.passwordError && (
                <Alert variant="danger">{errors.passwordError}</Alert>
              )}
              <div className="d-grid gap-2">
                <Button variant="success" type="submit" className="btn-block">
                  Submit
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
