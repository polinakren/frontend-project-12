/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  activeChannelId: 1,
  showModalAddChannel: false,
  showModalRenameChannel: false,
  showModalDeleteChannel: false,
  activeChannelForRename: {
    id: null,
    name: '',
  },
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, action) {
      state.channels = action.payload;
    },
    setActiveChannel(state, action) {
      state.activeChannelId = action.payload;
    },
    addChannel(state, action) {
      state.channels = [...state.channels, action.payload];
    },
    setShowModalAddChannel(state) {
      state.showModalAddChannel = !state.showModalAddChannel;
    },
    setShowModalRenameChannel(state) {
      state.showModalRenameChannel = !state.showModalRenameChannel;
    },
    setShowModalDeleteChannel(state) {
      state.showModalDeleteChannel = !state.showModalDeleteChannel;
    },
    setNewChannelName(state, action) {
      const { id, name } = action.payload;
      state.channels.forEach((channel) => {
        if (Number(channel.id) === Number(id)) {
          channel.name = name;
        }
      });
    },
    setChannelDataForRename(state, action) {
      const { channelId, channelName } = action.payload;
      state.activeChannelForRename.id = channelId;
      state.activeChannelForRename.name = channelName;
    },
    setDeleteChannel(state, action) {
      const { id } = action.payload;
      state.channels = state.channels.filter((channel) => Number(channel.id) !== Number(id));
    },
  },
});

export const {
  setChannels,
  setActiveChannel,
  addChannel,
  setShowModalAddChannel,
  setShowModalRenameChannel,
  setNewChannelName,
  setChannelDataForRename,
  setShowModalDeleteChannel,
  setDeleteChannel,
} = channelsSlice.actions;
export const getChannels = (state) => state.channels.channels;
export const getActiveChannelId = (state) => state.channels.activeChannelId;
export const getActiveChannelName = (state) => {
  const isActive = (element) => {
    const currentActiveId = getActiveChannelId(state);
    return Number(element.id) === Number(currentActiveId);
  };
  const activeChannel = state.channels.channels.find(isActive);
  return activeChannel ? activeChannel.name : null;
};
export const getShowModalAddChannel = (state) => state.channels.showModalAddChannel;
export const getShowModalRenameChannel = (state) => state.channels.showModalRenameChannel;
export const getShowModalDeleteChannel = (state) => state.channels.showModalDeleteChannel;
export const getActiveChannelForChange = (state) => state.channels.activeChannelForRename;

export default channelsSlice.reducer;
