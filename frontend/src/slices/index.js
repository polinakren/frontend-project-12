import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import channelReducer from './channelSlice';
import messageReducer from './messageSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    channels: channelReducer,
    messages: messageReducer,
  },
});
