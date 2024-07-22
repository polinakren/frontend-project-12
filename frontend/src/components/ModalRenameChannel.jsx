import React, { useEffect, useRef } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import axios from 'axios';

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
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .test('is-unique', 'Должно быть уникальным', (value) => isUniqueChannelName(value)),
  });

  return (
    <Modal show onHide={handleSetShowModalRenameChannel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
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
                aria-label="Новое имя канала"
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
                  Отменить
                </Button>
                <Button variant="primary" type="submit" disabled="">
                  Отправить
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
