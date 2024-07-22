import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  activeChannel: {
    id: 1,
  },
  showModalAddChannel: false,
  showModalRenameChannel: false,
  showModalDeleteChannel: false,
  activeChannelForRename: {
    id: null,
    name: '',
  },
  activeChannelForDelete: {
    id: null,
  },
};

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, action) {
      state.channels = action.payload;
    },
    setActiveChannel(state, action) {
      state.activeChannel = { id: action.payload };
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
      const { id, newName } = action.payload;
      state.channels.forEach((channel) => {
        if (channel.id === id) {
          channel.name = newName;
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
      state.channels = state.channels.filter((channel) => channel.id !== id);
    },
    setChannelDataForDelete(state, action) {
      const { channelId } = action.payload;
      state.activeChannelForDelete.id = channelId;
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
  setChannelDataForDelete,
} = channelSlice.actions;
export const selectChannels = (state) => state.channels.channels;
export const getActiveChannelName = (state) => {
  const activeChannelId = state.channels.activeChannel.id;
  const activeChannel = state.channels.channels.find((channel) => channel.id === activeChannelId);

  return activeChannel ? activeChannel.name : null;
};

export const getActiveChannelId = (state) => {
  const activeChannelId = state.channels.activeChannel.id;
  const activeChannel = state.channels.channels.find((channel) => channel.id === activeChannelId);
  return activeChannel ? activeChannel.id : null;
};

export const getShowModalAddChannel = (state) => state.channels.showModalAddChannel;
export const getShowModalRenameChannel = (state) => state.channels.showModalRenameChannel;
export const getShowModalDeleteChannel = (state) => state.channels.showModalDeleteChannel;
export const getActiveChannelForRename = (state) => state.channels.activeChannelForRename;
export const getActiveChannelForDelete = (state) => state.channels.activeChannelForDelete;

export default channelSlice.reducer;
