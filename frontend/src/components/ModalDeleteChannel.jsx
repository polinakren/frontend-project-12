import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import {
  setActiveChannel,
  getActiveChannelForDelete,
  setShowModalDeleteChannel,
  setDeleteChannel,
} from '../slices/channelSlice.js';
import { deleteMessagesDuringDeleteChannel } from '../slices/messageSlice';
import routes from '../routes.js';
import { getToken } from '../slices/authSlice';

const ModalDeleteChannel = () => {
  const dispatch = useDispatch();

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
      }
    } catch (e) {
      console.log(e);
    }
  };
  const activeChannelForDelete = useSelector(getActiveChannelForDelete);

  return (
    <Modal show onHide={handleSetShowModalDeleteChannel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSetShowModalDeleteChannel}>
            Отменить
          </Button>
          <Button variant="danger" type="submit" disabled="" onClick={() => handleSetDeleteChannel(token, activeChannelForDelete.id)}>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default ModalDeleteChannel;
