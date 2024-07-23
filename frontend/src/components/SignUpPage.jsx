import axios from 'axios';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import routes from '../routes.js';
import signUpImage from '../assets/signup-image.jpg';
import { setToken, loginUser, logoutUser } from '../slices/authSlice';

const SignUpPage = () => {
  const { t } = useTranslation();
  const [nameError, setShowNameError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    username: yup
      .string()
      .required(t('signup.required'))
      .min(3, t('signup.usernameConstraints'))
      .max(20, t('signup.usernameConstraints')),
    password: yup
      .string()
      .required(t('signup.required'))
      .min(6, t('signup.passMin')),
    confirmPassword: yup
      .string()
      .required(t('signup.required'))
      .oneOf([yup.ref('password'), null], t('signup.mustMatch')),
  });

  const handleSubmit = async (formValue) => {
    try {
      const response = await axios.post(routes.signUpPath(), {
        username: formValue.username,
        password: formValue.password,
      });

      if (response.data) {
        const tokenData = response.data.token;
        if (localStorage.getItem('token')) {
          localStorage.removeItem('token');
          dispatch(logoutUser());
        }
        localStorage.setItem('token', tokenData);
        dispatch(setToken(tokenData));
        dispatch(loginUser(response.data.username));
        setShowNameError(false);
        navigate('/');
      } else {
        setShowNameError(true);
        navigate('/signup');
      }
    } catch (e) {
      console.log(e);
      setShowNameError(true);
    }
  };

  const formInit = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: schema,
    onSubmit: (values) => handleSubmit(values),
  });
  return (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/">{t('hexletChat')}</a>
        </div>
      </nav>

      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-6 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div>
                  <img src={signUpImage} className="rounded-circle" alt={t('signup.header')} />
                </div>
                <div className="col-12 col-md-6">
                  <Form onSubmit={formInit.handleSubmit}>
                    <h1 className="text-center mb-4">{t('signup.header')}</h1>
                    <Form.Group className="mb-3">
                      <Form.Control
                        name="username"
                        type="text"
                        placeholder={t('login.username')}
                        autoComplete="username"
                        id="username"
                        onChange={formInit.handleChange}
                        onBlur={formInit.handleBlur}
                        value={formInit.values.username}
                        isInvalid={formInit.touched.username && (!!formInit.errors.username)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formInit.errors.username}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        name="password"
                        type="password"
                        placeholder={t('signup.password')}
                        id="password"
                        autoComplete="password"
                        onChange={formInit.handleChange}
                        onBlur={formInit.handleBlur}
                        value={formInit.values.password}
                        isInvalid={formInit.touched.password && (!!formInit.errors.password)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formInit.errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        name="confirmPassword"
                        type="password"
                        placeholder={t('signup.confirm')}
                        id="confirmPassword"
                        autoComplete="confirmPassword"
                        onChange={formInit.handleChange}
                        onBlur={formInit.handleBlur}
                        value={formInit.values.confirmPassword}
                        isInvalid={formInit.touched.confirmPassword
                          && (!!formInit.errors.confirmPassword)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formInit.errors.confirmPassword}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit">
                      {t('signup.submit')}
                    </Button>
                    {nameError && (
                      <div className="invalid-feedback" style={{ display: 'block', color: 'red' }}>{t('signup.alreadyExists')}</div>
                    )}
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
