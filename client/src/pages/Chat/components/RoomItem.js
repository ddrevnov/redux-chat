import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';

const RoomItem = ({ room, selectRoom }) => {
  return (
    <List.Item onClick={() => selectRoom(room)}>
      <List.Content>
        {room.name}
      </List.Content>
    </List.Item>
  );
};

RoomItem.propTypes = {
  room: PropTypes.object.isRequired,
  selectRoom: PropTypes.func.isRequired,
};

export default RoomItem;