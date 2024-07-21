import {
  Button, Form, Col, Container, Card, Row, FloatingLabel,
} from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import img from '../assets/avatar.jpg';
import routes from '../routes';
import { setToken, setUser } from '../slices/authSlice.js';

const Login = () => {
  const inputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const response = await axios.post(routes.loginPath(), {
          username: values.username,
          password: values.password,
        });

        const { token } = response.data;
        dispatch(setToken(token));
        dispatch(setUser(values.username));
        localStorage.setItem('token', token);

        const getTokenInLocalStorage = localStorage.getItem('token');
        if (getTokenInLocalStorage && getTokenInLocalStorage.length > 0) {
          setAuthFailed(false);
          navigate('/');
        } else {
          setAuthFailed(true);
          navigate('/login');
        }
      } catch (e) {
        console.log(e);
        setAuthFailed(true);
      }
    },
  });

  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="p-5 row">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={img}
                  className="rounded-сircle"
                  alt="Log in page"
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">Войти</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.Group className="form-floating mb-3">
                    <FloatingLabel controlId="username" label="Ваш ник">
                      <Form.Control
                        type="text"
                        ref={inputRef}
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        isInvalid={authFailed}
                        placeholder="username"
                        name="username"
                        autoComplete="username"
                        required
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="form-floating mb-3">
                    <FloatingLabel controlId="password" label="Пароль">
                      <Form.Control
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        isInvalid={authFailed}
                        placeholder="password"
                        name="password"
                        autoComplete="current-password"
                        required
                      />
                    </FloatingLabel>
                    {authFailed && <Form.Control.Feedback type="invalid" tooltip>Неверные имя пользователя или пароль</Form.Control.Feedback>}
                  </Form.Group>
                  <Button type="submit" disabled={formik.isSubmitting} variant="outline-primary" className="w-100 mb-3">Войти</Button>
                </fieldset>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                {' '}
                <NavLink to="404">Регистрация</NavLink>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
