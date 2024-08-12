import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import routes from '../routes';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import { getIsAuthorization } from '../slices/authSlice.js';
import {
  setChannels,
  getShowModalAddChannel,
  getShowModalRenameChannel,
  getShowModalDeleteChannel,
} from '../slices/channelSlice.js';
import { loadMessages } from '../slices/messageSlice';
import ModalAddChannel from './ModalAddChannel.jsx';
import ModalRenameChannel from './ModalRenameChannel.jsx';
import ModalDeleteChannel from './ModalDeleteChannel.jsx';

const ChatPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const isAuthorization = useSelector(getIsAuthorization);

  const isShowModalAddChannel = useSelector(getShowModalAddChannel);
  const isShowModalRenameChannel = useSelector(getShowModalRenameChannel);
  const isShowModalDeleteChannel = useSelector(getShowModalDeleteChannel);

  useEffect(() => {
    const getChannelsData = async (userToken) => {
      try {
        const responseChannels = await axios.get(routes.channelsPath(), {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        const channelsData = responseChannels.data;
        dispatch(setChannels(channelsData));
      } catch (e) {
        console.log(e);
      }
    };

    getChannelsData(token);
  }, [token, dispatch]);

  useEffect(() => {
    const getMessagesData = async (userToken) => {
      try {
        const responseMessages = await axios.get(routes.messagesPath(), {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        const messagesData = responseMessages.data;
        dispatch(loadMessages(messagesData));
      } catch (e) {
        console.log(e);
      }
    };

    getMessagesData(token);
  }, [token, dispatch]);

  useEffect(() => {
    if (!isAuthorization) {
      navigate(routes.loginPagePath());
    }
  });

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
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
