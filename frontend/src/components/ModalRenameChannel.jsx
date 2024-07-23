import React, { useEffect, useRef } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import {
  selectChannels,
  setShowModalRenameChannel,
  setNewChannelName,
  getActiveChannelForRename,
} from '../slices/channelSlice';
import routes from '../routes.js';
import { getToken } from '../slices/authSlice';

const ModalRenameChannel = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const token = useSelector(getToken);

  const inputRef = useRef(null);

  const handleSetShowModalRenameChannel = () => {
    dispatch(setShowModalRenameChannel());
  };

  const handleSetNewChannelName = async (newName, userToken, changingChannelId) => {
    const newEdditedChannelName = { name: newName };
    const pathToRenameChannel = [routes.channelsPath(), changingChannelId].join('/');
    try {
      const response = await axios.patch(pathToRenameChannel, newEdditedChannelName, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.data) {
        dispatch(setNewChannelName({ id: response.data.id, newName: response.data.name }));
        handleSetShowModalRenameChannel();
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, 100);
  }, []);

  const channels = useSelector(selectChannels);
  const activeChannelForRename = useSelector(getActiveChannelForRename);

  const isUniqueChannelName = (name) => {
    const checkCannels = channels.filter((channel) => channel.name === name);
    return checkCannels.length <= 0;
  };

  const schema = yup.object().shape({
    renameChannelName: yup.string()
      .required(t('validation.required'))
      .min(3, t('validation.min'))
      .max(20, t('validation.max'))
      .test('is-unique', t('validation.uniq'), (value) => isUniqueChannelName(value)),
  });

  return (
    <Modal show onHide={handleSetShowModalRenameChannel} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ renameChannelName: activeChannelForRename.name }}
          validationSchema={schema}
          onSubmit={(values) => {
            handleSetNewChannelName(values.renameChannelName, token, activeChannelForRename.id);
          }}
        >
          {({ handleChange, handleBlur, values }) => (
            <Form noValidate className="mb-2">
              <Field
                type="text"
                name="renameChannelName"
                aria-label={t('channels.editChannelName')}
                autoComplete="off"
                placeholder=""
                className="form-control"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.renameChannelName}
                innerRef={inputRef}
              />
              <ErrorMessage
                component="div"
                name="renameChannelName"
                className="text-danger"
              />
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
