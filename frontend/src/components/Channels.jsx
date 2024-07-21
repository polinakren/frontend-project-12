import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectChannels, setActiveChannel } from '../slices/channelSlice.js';

const Channels = () => {
  const dispatch = useDispatch();

  const channels = useSelector(selectChannels);

  const handleSetActiveChannel = (id) => {
    dispatch(setActiveChannel(id));
  };

  return (
    <div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.length > 0 ? (
          channels.map((channel) => (
            <li key={channel.id} className="nav-item w-100">
              <button
                type="button"
                className="w-100 rounded-0 text-start text-truncate"
                onClick={() => handleSetActiveChannel(channel.id)}
              >
                <span className="me-1">#</span>
                {channel.name}
              </button>
            </li>
          ))
        ) : (
          <div>
            <p>Каналы отсутствуют или загружаются</p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Channels;
