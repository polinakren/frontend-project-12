import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  messageCount: 0,
};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
      state.messageCount += 1;
    },
    loadMessages(state, action) {
      state.messages = action.payload;
    },
  },
});

export const { loadMessages, addMessage } = messageSlice.actions;
export const getMessages = (state) => state.messages.messages;
export const getMessageCount = (state, activeChannelId) => {
  const messages = state.messages.messages
    .filter((message) => message.channelId === activeChannelId);
  return messages.length;
};

export default messageSlice.reducer;
