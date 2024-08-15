import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import routes from '../routes.js';
import signUpImage from '../assets/signup-image.jpg';
import { loginUser, logoutUser } from '../slices/authSlice';

const SignUpPage = () => {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
    setRegistrationFailed(false);

    try {
      const response = await axios.post(routes.signUpPath(), {
        username: formValue.username,
        password: formValue.password,
      });

      const { token, username } = response.data;
      if (localStorage.getItem('token')) {
        dispatch(logoutUser());
      }
      dispatch(loginUser({ token, username }));
      navigate(routes.chatPagePath());
    } catch (e) {
      console.log(e);

      if (e.response.status === 409) {
        setRegistrationFailed(true);
        inputRef.current.select();
      }
    }
  };

  const formik = useFormik({
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
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-6 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <div>
                  <img src={signUpImage} className="rounded-circle" alt={t('signup.header')} />
                </div>
                <div className="col-12 col-md-6">
                  <Form onSubmit={formik.handleSubmit}>
                    <h1 className="text-center mb-4">{t('signup.header')}</h1>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        name="username"
                        type="text"
                        ref={inputRef}
                        placeholder={t('signup.username')}
                        autoComplete="username"
                        id="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        isInvalid={
                          (formik.errors.username && formik.touched.username)
                          || registrationFailed
                        }
                      />
                      <Form.Label htmlFor="username">{t('signup.username')}</Form.Label>
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.username}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className=" form-floating mb-3">
                      <Form.Control
                        name="password"
                        type="password"
                        placeholder={t('signup.password')}
                        id="password"
                        autoComplete="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        isInvalid={
                          (formik.errors.password && formik.touched.password)
                          || registrationFailed
                        }
                      />
                      <Form.Label htmlFor="password">{t('signup.password')}</Form.Label>
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        name="confirmPassword"
                        type="password"
                        placeholder={t('signup.confirm')}
                        id="confirmPassword"
                        autoComplete="confirmPassword"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                        isInvalid={
                          (formik.errors.confirmPassword && formik.touched.confirmPassword)
                          || registrationFailed
                        }
                      />
                      <Form.Label htmlFor="confirmPassword">{t('signup.confirm')}</Form.Label>
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.confirmPassword}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" className="w-100" variant="outline-primary">
                      {t('signup.submit')}
                    </Button>
                    {registrationFailed && (
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
