import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import validateSignUp from './validateSignUp';
import SuccessSignUpPage from './SuccessSignUpPage';

let initialUser = {
  email: '',
  password: '',
  confrimPassword: '',
};

function SignUp() {
  const [user, setUser] = useState(initialUser);
  const [errors, setErrors] = useState({});
  const [hasError, setHasError] = useState(true);
  const [loader, setLoader] = useState(false);
  const [createdAcount, setCreatedAcount] = useState(false);

  useEffect(() => {
    if (hasError === false && Object.keys(errors).length === 0) {
      const loadSignUp = async () => {
        setLoader(true);

        let response = await axios.post(
          'http://localhost:3300/v1/auth/sign-up',
          user
        );
        setCreatedAcount(response.data.status);
      };

      setTimeout(() => {
        setLoader(false);
      }, 100);
      loadSignUp();
    }
  }, [errors]);

  const handleCahnge = (event) => {
    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const onSignUp = (e) => {
    e.preventDefault();
    setErrors(validateSignUp(user));
    setHasError(false);
  };

  return createdAcount ? (
    <SuccessSignUpPage />
  ) : (
    <Container>
      {loader ? (
        <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">
          Loading...!!!
        </h1>
      ) : (
        <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">
          Sign Up
        </h1>
      )}
      <Row className="mt-5">
        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
          <Form onSubmit={onSignUp}>
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
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Confrim Password</Form.Label>
              <Form.Control
                type="password"
                name="confrimPassword"
                placeholder="Password"
                onChange={handleCahnge}
                value={user.confrimPassword}
              />
            </Form.Group>
            {errors.confrimError && (
              <Alert variant="danger">{errors.confrimError}</Alert>
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

export default SignUp;
