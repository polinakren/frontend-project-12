import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  registeredUsers: [],
  showSignUpPage: false,
};

const signUpSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setSignUp(state, action) {
      state.registeredUsers.push(action.payload);
    },
    setShowSignUpPage(state) {
      state.showSignUpPage = !state.showSignUpPage;
    },
  },
});

export const { setSignUp, setShowSignUpPage } = signUpSlice.actions;
export const getRegisteredUsers = (state) => state.registration.registeredUsers;
export const getShowSignUpPage = (state) => state.registration.showSignUpPage;

export default signUpSlice.reducer;
