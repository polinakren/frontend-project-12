import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { Button } from 'react-bootstrap';
import { io } from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import axios from 'axios';

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
    } catch (e) {
      console.log(e);
    }
  };

  const newMessageFunc = (value, channelId, username) => ({ body: value, channelId, username });

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
            {t('chat.messageCount', { count: countOfMessages })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messages
            .filter((message) => message.channelId === activeChannelId)
            .map((message) => (
              <div key={message.id} className="text-break mb-2">
                <b key={message.channelId}>{message.username}</b>
                :
                {message.body}
              </div>
            ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <Formik
            initialValues={{ message: '' }}
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
                <div className="input-group has-validation">
                  <Field
                    type="text"
                    name="message"
                    aria-label={t('chat.newMessage')}
                    autoComplete="off"
                    placeholder={t('chat.inputMesage')}
                    className="border-0 p-0 ps-2 form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
                  />
                  <Button type="submit" disabled="" className="btn btn-group-vertical">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                      <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                    </svg>
                    <span className="visually-hidden">{t('chat.send')}</span>
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Messages;
