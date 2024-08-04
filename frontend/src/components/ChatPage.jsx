import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';
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
  getShowNotifyAddChannel,
  getShowNotifyRenameChannel,
  getShowNotifyDeleteChannel,
  setShowNotifyAddChannel,
  setShowNotifyRenameChannel,
  setShowNotifyDeleteChannel,
} from '../slices/channelSlice.js';
import { loadMessages } from '../slices/messageSlice';
import ModalAddChannel from './ModalAddChannel.jsx';
import ModalRenameChannel from './ModalRenameChannel.jsx';
import ModalDeleteChannel from './ModalDeleteChannel.jsx';

const ChatPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const token = localStorage.getItem('token');
  const isAuthorization = useSelector(getIsAuthorization);

  const isShowModalAddChannel = useSelector(getShowModalAddChannel);
  const isShowModalRenameChannel = useSelector(getShowModalRenameChannel);
  const isShowModalDeleteChannel = useSelector(getShowModalDeleteChannel);
  const isShowNotifyAddChannel = useSelector(getShowNotifyAddChannel);
  const isShowNotifyRenameChannel = useSelector(getShowNotifyRenameChannel);
  const isShowNotifyDeleteChannel = useSelector(getShowNotifyDeleteChannel);

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
      navigate('/login');
    }
  });

  const notifyAddChannel = () => {
    toast.success(t('channels.created'), {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });
  };

  const notifyRenameChannel = () => {
    toast.success(t('channels.renamed'), {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });
  };

  const notifyDeleteChannel = () => {
    toast.success(t('channels.removed'), {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });
  };

  useEffect(() => {
    if (isShowNotifyAddChannel) {
      notifyAddChannel();
      dispatch(setShowNotifyAddChannel());
    }
  }, [isShowNotifyAddChannel]);

  useEffect(() => {
    if (isShowNotifyRenameChannel) {
      notifyRenameChannel();
      dispatch(setShowNotifyRenameChannel());
    }
  }, [isShowNotifyRenameChannel]);

  useEffect(() => {
    if (isShowNotifyDeleteChannel) {
      notifyDeleteChannel();
      dispatch(setShowNotifyDeleteChannel());
    }
  }, [isShowNotifyDeleteChannel]);

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
