import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import {
  selectChannels,
  setActiveChannel,
  setShowModalAddChannel,
  setShowModalRenameChannel,
  setChannelDataForRename,
  setShowModalDeleteChannel,
  setChannelDataForDelete,
  getActiveChannelId,
} from '../slices/channelSlice';

const Channels = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const channels = useSelector(selectChannels);
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
        <b>{t('channels.channels')}</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={handleSetShowModalAddChannel}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <div>
        <ul
          id="channels-box"
          className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
        >
          {channels.length > 0 ? (
            channels.map((channel) => (
              <li key={channel.id} className="nav-item w-100">
                <button
                  type="button"
                  className={Number(channel.id) === Number(activeChannelId)
                    ? 'w-100 rounded-0 text-start btn btn-secondary' : 'w-100 rounded-0 text-start btn'}
                  onClick={() => handleSetActiveChannel(channel.id)}
                >
                  <span className="me-1">#</span>
                  {channel.name}
                </button>
                {channel.removable
                  && (
                    <DropdownButton
                      variant="secondary"
                      title=""
                    >
                      <Dropdown.Item eventKey="1" onClick={() => handleSetChannelDataForDelete(channel.id)}>{t('channels.remove')}</Dropdown.Item>
                      <Dropdown.Item eventKey="2" onClick={() => handleSetChannelDataForRename(channel.id, channel.name)}>{t('channels.rename')}</Dropdown.Item>
                    </DropdownButton>
                  )}
              </li>
            ))
          ) : (
            <div>{t('channels.noChannels')}</div>
          )}
        </ul>
      </div>
    </>
  );
};

export default Channels;
