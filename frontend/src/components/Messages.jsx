import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { io } from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import axios from 'axios';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import * as yup from 'yup';

import { getMessages, addMessage, getCountOfMessages } from '../slices/messageSlice';
import { getActiveChannelId, getActiveChannelName } from '../slices/channelSlice';
import routes from '../routes';
import { getToken, selectUser } from '../slices/authSlice';

const socket = io('http://localhost:3000');

const Messages = () => {
  filter.loadDictionary('ru');
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const user = useSelector(selectUser);
  const { t } = useTranslation();
  const inputRef = useRef(null);

  const activeChannelName = useSelector(getActiveChannelName);
  const activeChannelId = useSelector(getActiveChannelId);

  const messages = useSelector(getMessages);
  const countOfMessages = useSelector((state) => getCountOfMessages(state, activeChannelId));

  useEffect(() => {
    socket.on('newMessage', (currentMessage) => {
      dispatch(addMessage(currentMessage));
    });
    return () => {
      socket.off('newMessage');
    };
  }, [dispatch]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmitMessage = async (newMessage) => {
    const cleanedBody = filter.clean(newMessage.body);
    const useCleanMessage = {
      ...newMessage,
      body: cleanedBody,
    };

    try {
      await axios.post(routes.messagesPath(), useCleanMessage, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      inputRef.current.focus();
    } catch (e) {
      console.log(e);
    }
  };

  const newMessageFunc = (value, channelId, username) => ({ body: value, channelId, username });

  const validationSchema = yup.object().shape({
    message: yup
      .string()
      .trim()
      .required('Required'),
  });

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {activeChannelName}
            </b>
          </p>
          <span className="text-muted">
            {countOfMessages}
            {' '}
            {t('chat.messageCount', { count: countOfMessages })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messages
            .filter((message) => message.channelId === activeChannelId)
            .map((message) => (
              <div key={message.id} className="text-break mb-2">
                <b key={message.channelId}>{message.username}</b>
                {': '}
                {message.body}
              </div>
            ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <Formik
            initialValues={{ message: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              const newMessage = newMessageFunc(
                values.message,
                activeChannelId,
                user,
              );
              handleSubmitMessage(newMessage);
              resetForm();
            }}
          >
            {({ handleChange, handleBlur, values }) => (
              <Form noValidate className="py-1 border rounded-2">
                <InputGroup>
                  <Form.Control
                    ref={inputRef}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
                    name="message"
                    aria-label={t('chat.newMessage')}
                    placeholder={t('chat.inputMesage')}
                    className="border-0 p-0 ps-2"
                  />
                  <Button variant="group-vertical" type="submit">
                    <ArrowRightSquare size={20} />
                    <span className="visually-hidden">{t('chat.send')}</span>
                  </Button>
                </InputGroup>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Messages;
