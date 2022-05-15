import React, { useState } from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

function Login(props) {
  const [user, setUser] = useState({ email: '', password: '' });
  const { status, setStatus } = props;
  const handleCahnge = (event) => {
    const { name, value } = event.target;
    // let navigate = useNavigate();

    setUser({
      ...user,
      [name]: value,
    });
  };

  const onLogin = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:3300/v1/auth/login', user)
      .then((res) => res.data)
      .then((res) => {
        if (res.status) {
          localStorage.setItem('userToken', res.token);
          setStatus(res.status);
        } else {
          alert('bilgilerinizi kontrol ediniz');
        }
      });
  };
  //console.log('Login-->', setStatus);
  if (status) {
    return <Navigate to="/dashboard" />;
  } else {
    return (
      <Container>
        <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">
          Log In
        </h1>
        <Row className="mt-5">
          <Col
            lg={5}
            md={6}
            sm={12}
            className="p-5 m-auto shadow-sm rounded-lg"
          >
            <Form onSubmit={onLogin}>
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
