import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import * as yup from 'yup';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import { useTranslation } from 'react-i18next';

import {
  selectChannels, setActiveChannel, setShowModalAddChannel, addChannel, setShowNotifyAddChannel,
} from '../slices/channelSlice.js';
import routes from '../routes.js';
import { getToken } from '../slices/authSlice.js';

const ModalAddChannel = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const token = useSelector(getToken);

  const handleSetShowModalAddChannel = () => {
    dispatch(setShowModalAddChannel());
  };

  const handleAddChannel = async (name) => {
    const newChannel = { name };
    try {
      const response = await axios.post(routes.channelsPath(), newChannel, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        dispatch(addChannel(response.data));
        dispatch(setActiveChannel(response.data.id));
        dispatch(setShowNotifyAddChannel());
        handleSetShowModalAddChannel();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const channels = useSelector(selectChannels);
  const isUniqueChannelName = (name) => {
    const checkChannels = channels.filter((channel) => channel.name === name);
    return checkChannels.length <= 0;
  };

  const schema = yup.object().shape({
    newChannelName: yup.string()
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
          initialValues={{ newChannelName: '' }}
          validationSchema={schema}
          onSubmit={(values) => {
            handleAddChannel(values.newChannelName, token);
          }}
        >
          {({ handleChange, handleBlur, values }) => (
            <Form noValidate className="mb-2">
              <Field
                type="text"
                name="newChannelName"
                aria-label={t('channels.channelName')}
                autoComplete="off"
                placeholder=""
                className="form-control"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.newChannelName}
              />
              <ErrorMessage
                component="div"
                name="newChannelName"
                className="text-danger"
              />
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
