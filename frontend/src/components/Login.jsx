import {
  Button, Form, Col, Container, Card, Row, FloatingLabel,
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';

import img from '../assets/avatar.jpg';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => values,
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
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        onBlur={formik.handleBlur}
                        disabled={formik.isSubmitting}
                        placeholder="username"
                        name="username"
                        id="username"
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
                        onBlur={formik.handleBlur}
                        disabled={formik.isSubmitting}
                        placeholder="password"
                        name="password"
                        id="password"
                        autoComplete="current-password"
                        required
                      />
                    </FloatingLabel>
                    <Form.Control.Feedback type="invalid" className="invalid-feedback">не то</Form.Control.Feedback>
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
