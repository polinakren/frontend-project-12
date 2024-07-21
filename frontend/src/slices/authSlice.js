import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const {
  loginUser, logoutUser, setToken, setUser,
} = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const getToken = (state) => state.auth.token;

export default authSlice.reducer;
