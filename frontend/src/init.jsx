import React from 'react';
import i18next from 'i18next';
import { io } from 'socket.io-client';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
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

const rollbarConfig = new Rollbar(rollbarInit);

const Init = ({ children }) => {
  i18next
    .use(initReactI18next)
    .init({
      resources,
      debug: true,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

  const newSocket = io();

  return (
    <I18nextProvider i18n={i18next} defaultNS="translation">
      <ProfanityProvider>
        <RollbarProvider config={rollbarConfig}>
          <ErrorBoundary>
            <Provider store={store}>
              <SocketProvider newSocket={newSocket}>
                {children}
              </SocketProvider>
            </Provider>
          </ErrorBoundary>
        </RollbarProvider>
      </ProfanityProvider>
    </I18nextProvider>
  );
};

export default Init;
