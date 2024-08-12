import React, { useEffect, useRef } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import {
  getChannels, setActiveChannel, setShowModalAddChannel,
} from '../slices/channelSlice.js';
import routes from '../routes.js';
import { getToken } from '../slices/authSlice.js';
import { useProfanity } from '../hooks';

const ModalAddChannel = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const profanity = useProfanity();

  const token = useSelector(getToken);

  const channels = useSelector(getChannels);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSetShowModalAddChannel = () => {
    dispatch(setShowModalAddChannel());
  };

  const getFilteredChannelName = (message) => profanity(message).trim();

  const handleAddChannel = async (name) => {
    const cleanedChannelName = getFilteredChannelName(name);
    const newChannel = { name: cleanedChannelName };
    try {
      const response = await axios.post(routes.channelsPath(), newChannel, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        dispatch(setActiveChannel(response.data.id));
        toast.success(t('channels.created'));
        handleSetShowModalAddChannel();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const isUniqueChannelName = (name) => {
    const checkChannels = channels.filter((channel) => channel.name === name);
    return !(checkChannels.length > 0);
  };

  const schema = yup.object().shape({
    name: yup.string()
      .required(t('validation.required'))
      .min(3, t('validation.min'))
      .max(20, t('validation.max'))
      .test('is-unique', t('validation.uniq'), (value) => isUniqueChannelName(value)),
  });

  return (
    <Modal show onHide={handleSetShowModalAddChannel} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.add')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: '' }}
          validationSchema={schema}
          onSubmit={(values) => {
            handleAddChannel(values.name, token);
          }}
        >
          {({
            handleChange, handleBlur, handleSubmit, values, touched, errors,
          }) => (
            <Form onSubmit={handleSubmit} className="mb-2">
              <Form.Group>
                <Form.Label visuallyHidden>{t('channels.channelName')}</Form.Label>
                <Form.Control
                  name="name"
                  id="name"
                  className="mb-2"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  ref={inputRef}
                  isInvalid={touched.name && (!!errors.name)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleSetShowModalAddChannel}>
                  {t('modals.cancel')}
                </Button>
                <Button variant="primary" type="submit">
                  {t('modals.submit')}
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddChannel;
