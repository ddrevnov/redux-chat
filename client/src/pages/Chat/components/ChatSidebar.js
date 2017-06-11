import React from 'react';
import PropTypes from 'prop-types';
import { Sidebar, Menu, List, Loader } from 'semantic-ui-react';
import CreateRoom from './CreateRoom';
import RoomItem from './RoomItem';

const ChatSidebar = ({ visible, createRoom, selectRoom, rooms: { rooms, loading } }) => {
  return (
    <Sidebar as={Menu} animation='uncover' width='wide' visible={visible} vertical inverted>
      <CreateRoom createRoom={createRoom} />
      {loading ?
        <Loader active inline='centered' /> :
        <List divided relaxed>
        {rooms.map(room =>
          <RoomItem
            selectRoom={selectRoom}
            key={room._id}
            room={room}
          />)
        }
        </List>
      }
    </Sidebar>
  );
};

ChatSidebar.propTypes = {
  visible: PropTypes.bool.isRequired,
  createRoom: PropTypes.func.isRequired,
  selectRoom: PropTypes.func.isRequired,
  rooms: PropTypes.object.isRequired,
};

export default ChatSidebar;