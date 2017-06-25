import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import classNames from 'classnames';

const RoomItem = ({ room, selectRoom, selectedRoom, fetchMessagesByRoomId }) => {
  const itemHighlight = classNames({ active: room._id === selectedRoom._id });

  const handleClick = () => {
    selectRoom(room);
    fetchMessagesByRoomId(room._id);
  };

  return (
    <List.Item
      onClick={handleClick}
      className={itemHighlight}
    >
      <List.Content>
        {room.name}
      </List.Content>
    </List.Item>
  );
};

RoomItem.propTypes = {
  room: PropTypes.object.isRequired,
  selectRoom: PropTypes.func.isRequired,
  fetchMessagesByRoomId: PropTypes.func.isRequired,
  selectedRoom: PropTypes.object.isRequired,
};

export default RoomItem;