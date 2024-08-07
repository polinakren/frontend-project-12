import React, { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { io } from 'socket.io-client';

import {
  setActiveChannel,
  getActiveChannelForDelete,
  setShowModalDeleteChannel,
  setDeleteChannel,
  setShowNotifyDeleteChannel,
} from '../slices/channelSlice.js';
import { deleteMessagesDuringDeleteChannel } from '../slices/messageSlice';
import routes from '../routes.js';
import { getToken } from '../slices/authSlice';

const socket = io();

const ModalDeleteChannel = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const token = useSelector(getToken);

  const handleSetShowModalDeleteChannel = () => {
    dispatch(setShowModalDeleteChannel());
  };

  const handleSetDeleteChannel = async (userToken, deletedChannelId) => {
    const pathToDeleteChannel = [routes.channelsPath(), deletedChannelId].join('/');
    try {
      const response = await axios.delete(pathToDeleteChannel, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.data) {
        dispatch(setDeleteChannel({ id: response.data.id }));
        dispatch(deleteMessagesDuringDeleteChannel({ id: response.data.id }));
        handleSetShowModalDeleteChannel();
        dispatch(setActiveChannel(1));
        dispatch(setShowNotifyDeleteChannel());
      }
    } catch (e) {
      console.log(e);
    }
  };
  const activeChannelForDelete = useSelector(getActiveChannelForDelete);

  useEffect(() => {
    socket.on('removeChannel', (currentRemoveChannel) => {
      dispatch(setDeleteChannel(currentRemoveChannel));
    });
    return () => {
      socket.off('removeChannel');
    };
  }, []);

  return (
    <Modal show onHide={handleSetShowModalDeleteChannel} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.confirmation')}</p>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSetShowModalDeleteChannel}>
            {t('modals.cancel')}
          </Button>
          <Button variant="danger" type="submit" disabled="" onClick={() => handleSetDeleteChannel(token, activeChannelForDelete.id)}>
            {t('modals.confirm')}
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default ModalDeleteChannel;
