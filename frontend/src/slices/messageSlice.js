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
    deleteMessagesDuringDeleteChannel(state, action) {
      const { id } = action.payload;
      state.messages = state.messages.filter((message) => message.channelId !== id);
    },
  },
});

export const { loadMessages, addMessage, deleteMessagesDuringDeleteChannel } = messageSlice.actions;
export const getMessages = (state) => state.messages.messages;
export const getMessageCount = (state, activeChannelId) => {
  const messages = state.messages.messages
    .filter((message) => message.channelId === activeChannelId);
  return messages.length;
};

export const getCountOfMessages = (state, activeChannelId) => {
  const messagesOfActiveChannel = state.messages.messages
    .filter((message) => message.channelId === activeChannelId);
  return messagesOfActiveChannel.length;
};

export default messageSlice.reducer;
