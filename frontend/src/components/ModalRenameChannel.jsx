import React, { useEffect, useRef } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import {
  getChannels,
  setShowModalRenameChannel,
  getActiveChannelForRename,
} from '../slices/channelSlice';
import routes from '../routes.js';
import { getToken } from '../slices/authSlice';
import { useProfanity } from '../hooks';

const ModalRenameChannel = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const profanity = useProfanity();
  const getFilteredChannelName = (message) => profanity(message).trim();

  const token = useSelector(getToken);

  const inputRef = useRef(null);

  const handleSetShowModalRenameChannel = () => {
    dispatch(setShowModalRenameChannel());
  };

  const handleSetNewChannelName = async (newName, userToken, changingChannelId) => {
    const cleanNameChannel = getFilteredChannelName(newName);
    const editedChannel = { name: cleanNameChannel };

    const pathToRenameChannel = [routes.channelsPath(), changingChannelId].join('/');
    try {
      const response = await axios.patch(pathToRenameChannel, editedChannel, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.data) {
        handleSetShowModalRenameChannel();
        toast.success(t('channels.renamed'));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const channels = useSelector(getChannels);
  const activeChannelForRename = useSelector(getActiveChannelForRename);

  // const isUniqueChannelName = (name) => {
  //   const checkCannels = channels.filter((channel) => channel.name === name);
  //   return !(checkCannels.length > 0);
  // };

  const schema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(t('validation.required'))
      .min(3, t('validation.min'))
      .max(20, t('validation.max'))
      .notOneOf(channels, t('validation.uniq')),
  });

  return (
    <Modal show onHide={handleSetShowModalRenameChannel} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: activeChannelForRename.name }}
          validationSchema={schema}
          onSubmit={(values) => {
            handleSetNewChannelName(values.name, token, activeChannelForRename.id);
          }}
        >
          {({
            handleChange, handleBlur, handleSubmit, values, touched, errors,
          }) => (
            <Form onSubmit={handleSubmit} className="mb-2">
              <Form.Group>
                <Form.Control
                  name="name"
                  id="name"
                  className="mb-2"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  ref={inputRef}
                  isInvalid={touched.name
                    && (!!errors.name)}
                />
                <label className="visually-hidden" htmlFor="name">{t('channels.channelName')}</label>
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleSetShowModalRenameChannel}>
                  {t('modals.cancel')}
                </Button>
                <Button variant="primary" type="submit" disabled="">
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

export default ModalRenameChannel;
