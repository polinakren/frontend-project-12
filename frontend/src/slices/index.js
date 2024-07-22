import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import channelReducer from './channelSlice';
import messageReducer from './messageSlice';
import signUpReducer from './signUpSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    channels: channelReducer,
    messages: messageReducer,
    registration: signUpReducer,
  },
});
