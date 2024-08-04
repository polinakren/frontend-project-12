import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { PlusSquare } from 'react-bootstrap-icons';

import {
  getChannels,
  getActiveChannelId,
  setActiveChannel,
  setShowModalAddChannel,
  setShowModalRenameChannel,
  setChannelDataForRename,
  setShowModalDeleteChannel,
  setChannelDataForDelete,
} from '../slices/channelSlice';

const Channels = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const channels = useSelector(getChannels);
  console.log(channels);
  const activeChannelId = useSelector(getActiveChannelId);

  const handleSetActiveChannel = (id) => {
    dispatch(setActiveChannel(id));
  };

  const handleSetShowModalAddChannel = () => {
    dispatch(setShowModalAddChannel());
  };

  const handleSetChannelDataForRename = (channelId, channelName) => {
    dispatch(setChannelDataForRename({ channelId, channelName }));
    dispatch(setShowModalRenameChannel());
  };

  const handleSetChannelDataForDelete = (channelId) => {
    dispatch(setChannelDataForDelete({ channelId }));
    dispatch(setShowModalDeleteChannel());
  };

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.channelName')}</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={handleSetShowModalAddChannel}
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </button>
      </div>

      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.length > 0 ? (
          channels.map((channel) => (
            <li key={channel.id} className="nav-item w-100">
              {channel.removable
                ? (
                  <Dropdown as={ButtonGroup} className="d-flex">
                    <Button
                      type="button"
                      variant={Number(channel.id) === Number(activeChannelId) ? 'secondary' : ''}
                      onClick={() => handleSetActiveChannel(channel.id)}
                      className="w-100 rounded-0 text-start text-truncate"
                      key={channel.id}
                    >
                      <span className="me-1">#</span>
                      {channel.name}
                    </Button>
                    <Dropdown.Toggle
                      split
                      variant={Number(channel.id) === Number(activeChannelId) ? 'secondary' : ''}
                    >
                      <span className="visually-hidden">{t('channels.menu')}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="1" onClick={() => handleSetChannelDataForDelete(channel.id)}>{t('channels.delete')}</Dropdown.Item>
                      <Dropdown.Item eventKey="2" onClick={() => handleSetChannelDataForRename(channel.id, channel.name)}>{t('channels.rename')}</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )
                : (
                  <Button
                    variant={Number(channel.id) === Number(activeChannelId) ? 'secondary' : ''}
                    onClick={() => handleSetActiveChannel(channel.id)}
                    className="w-100 rounded-0 text-start btn"
                  >
                    <span className="me-1">#</span>
                    {channel.name}
                  </Button>
                )}
            </li>
          ))
        ) : (
          <div>{t('channels.noChannels')}</div>
        )}
      </ul>
    </>
  );
};

export default Channels;
