import {
  Button, Form, Col, Container, Card, Row, FloatingLabel,
} from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import img from '../assets/avatar.jpg';
import routes from '../routes';
import { loginUser } from '../slices/authSlice.js';

const Login = () => {
  const inputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authFailed, setAuthFailed] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const schema = Yup.object().shape({
    username: Yup.string()
      .required(t('validation.required')),
    password: Yup.string()
      .required(t('validation.required')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const response = await axios.post(routes.loginPath(), {
          username: values.username,
          password: values.password,
        });
        if (response.data) {
          const { token, username } = response.data;
          dispatch(loginUser({ token, username }));
          const tokenValueInStorage = localStorage.getItem('token');
          if (tokenValueInStorage && tokenValueInStorage.length > 0) {
            navigate('/');
          }
        } else {
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
                  alt={t('login.submit')}
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('login.submit')}</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.Group className="form-floating mb-3">
                    <FloatingLabel controlId="username" label={t('login.username')}>
                      <Form.Control
                        type="text"
                        ref={inputRef}
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        isInvalid={authFailed}
                        placeholder={t('login.username')}
                        name="username"
                        autoComplete="username"
                        required
                        autoFocus
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="form-floating mb-3">
                    <FloatingLabel controlId="password" label={t('login.password')}>
                      <Form.Control
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        isInvalid={authFailed}
                        placeholder={t('login.password')}
                        name="password"
                        autoComplete="current-password"
                        required
                      />
                    </FloatingLabel>
                    {authFailed && <Form.Control.Feedback type="invalid" tooltip>{t('login.authFailed')}</Form.Control.Feedback>}
                  </Form.Group>
                  <Button type="submit" disabled={formik.isSubmitting} variant="outline-primary" className="w-100 mb-3">{t('login.submit')}</Button>
                </fieldset>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('login.newToChat')}</span>
                {' '}
                <NavLink to="/signup">{t('login.signup')}</NavLink>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
