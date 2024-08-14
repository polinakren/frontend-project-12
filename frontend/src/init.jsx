import React from 'react';
import i18next from 'i18next';
import { Provider as RollbarProvider } from '@rollbar/react';
import Rollbar from 'rollbar';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';

import ProfanityProvider from './providers/profanityProvider.js';
import resources from './locales/index';
import store from './slices/index';
import App from './components/App';
import { addMessage } from './slices/messageSlice';
import { addChannel, setDeleteChannel, setNewChannelName } from './slices/channelSlice';

const rollbarInit = {
  accessToken: process.env.ROLLBAR_TOKEN,
  environment: process.env.NODE_ENV,
};

const init = async () => {
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      debug: true,
      fallbackLng: 'ru',
    });

  const rollbarConfig = new Rollbar(rollbarInit);
  const socket = io();

  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(setDeleteChannel(payload));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(setNewChannelName(payload));
  });

  return (
    <I18nextProvider i18n={i18n} defaultNS="translation">
      <ProfanityProvider>
        <RollbarProvider config={rollbarConfig}>
          <Provider store={store}>
            <App />
          </Provider>
        </RollbarProvider>
      </ProfanityProvider>
    </I18nextProvider>
  );
};

export default init;
