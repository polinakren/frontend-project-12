import React from 'react';
import i18next from 'i18next';
import { io } from 'socket.io-client';
import { Provider as RollbarProvider } from '@rollbar/react';
import Rollbar from 'rollbar';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';

import SocketProvider from './providers/socketProvider.js';
import ProfanityProvider from './providers/profanityProvider.js';
import resources from './locales/index';
import store from './slices/index';

const rollbarInit = {
  accessToken: process.env.ROLLBAR_TOKEN,
  environment: process.env.NODE_ENV,
};

const Init = ({ children }) => {
  i18next
    .use(initReactI18next)
    .init({
      resources,
      debug: true,
      fallbackLng: 'ru',
    });

  const socket = io();
  const rollbarConfig = new Rollbar(rollbarInit);

  return (
    <I18nextProvider i18n={i18next} defaultNS="translation">
      <ProfanityProvider>
        <RollbarProvider config={rollbarConfig}>
          <Provider store={store}>
            <SocketProvider newSocket={socket}>
              {children}
            </SocketProvider>
          </Provider>
        </RollbarProvider>
      </ProfanityProvider>
    </I18nextProvider>
  );
};

export default Init;
