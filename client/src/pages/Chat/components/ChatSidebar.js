import React from 'react';
import PropTypes from 'prop-types';
import { Sidebar, Menu, List, Loader, Button } from 'semantic-ui-react';
import CreateRoom from './CreateRoom';
import RoomItem from './RoomItem';

const ChatSidebar = ({ visible, fetchRooms, createRoom, selectRoom, fetchMessagesByRoomId,
                       rooms: { rooms, total, loading, offset, limit, room: selectedRoom } }) => {
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
            selectedRoom={selectedRoom}
            fetchMessagesByRoomId={fetchMessagesByRoomId}
          />)
        }
        </List>
      }
      {!(rooms.length === total) && <Button onClick={() => fetchRooms(offset, limit)}>Load more</Button>}
    </Sidebar>
  );
};

ChatSidebar.propTypes = {
  visible: PropTypes.bool.isRequired,
  createRoom: PropTypes.func.isRequired,
  selectRoom: PropTypes.func.isRequired,
  rooms: PropTypes.object.isRequired,
  fetchRooms: PropTypes.func.isRequired,
  fetchMessagesByRoomId: PropTypes.func.isRequired,
};

export default ChatSidebar;