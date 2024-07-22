import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import routes from '../routes';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import { getToken, logoutUser } from '../slices/authSlice.js';
import {
  setChannels, getShowModalAddChannel, getShowModalRenameChannel, getShowModalDeleteChannel,
} from '../slices/channelSlice.js';
import { loadMessages } from '../slices/messageSlice';
import ModalAddChannel from './ModalAddChannel.jsx';
import ModalRenameChannel from './ModalRenameChannel.jsx';
import ModalDeleteChannel from './ModalDeleteChannel.jsx';

const ChatPage = () => {
  const dispatch = useDispatch();

  const token = useSelector(getToken);
  const isShowModalAddChannel = useSelector(getShowModalAddChannel);
  const isShowModalRenameChannel = useSelector(getShowModalRenameChannel);
  const isShowModalDeleteChannel = useSelector(getShowModalDeleteChannel);

  const handleLogOut = () => {
    dispatch(logoutUser());
  };

  const getChannelsData = async () => {
    try {
      const response = await axios.get(routes.channelsPath(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const channelsData = response.data;
      dispatch(setChannels(channelsData));
    } catch (e) {
      console.log(e);
    }
  };

  const getMessagesData = async () => {
    try {
      const responseMessages = await axios.get(routes.messagesPath(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const messagesData = responseMessages.data;
      dispatch(loadMessages(messagesData));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getChannelsData(token);
    getMessagesData(token);
  }, [dispatch]);

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="/">
                Hexlet Chat
              </a>
              <button type="button" className="btn btn-primary" onClick={handleLogOut}>
                <a href="/login">
                  Выйти
                </a>
              </button>
            </div>
          </nav>
          <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">
              <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                <Channels />
              </div>
              <div className="col p-0 h-100">
                <Messages />
              </div>
            </div>
          </div>
          {isShowModalAddChannel && <ModalAddChannel />}
          {isShowModalRenameChannel && <ModalRenameChannel />}
          {isShowModalDeleteChannel && <ModalDeleteChannel />}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
