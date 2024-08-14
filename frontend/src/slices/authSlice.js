/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: localStorage.getItem('username') || null,
  isAuthorization: !!localStorage.getItem('token'),
  token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser(state, action) {
      const { token, username } = action.payload;
      state.username = username;
      state.isAuthorization = true;
      state.token = token;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
    },
    logoutUser(state) {
      state.username = null;
      state.isAuthorization = false;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export const getToken = (state) => state.auth.token;
export const selectUser = (state) => state.auth.username;
export const getIsAuthorization = (state) => state.auth.isAuthorization;

export default authSlice.reducer;
