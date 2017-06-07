import React from 'react';
import PropTypes from 'prop-types';
import { Sidebar, Menu, List } from 'semantic-ui-react';
import CreateRoom from './CreateRoom';

const ChatSidebar = ({ visible, createRoom }) => {
  return (
    <Sidebar as={Menu} animation='uncover' width='wide' visible={visible} vertical inverted>
      <CreateRoom createRoom={createRoom} />
      <List divided relaxed>
        <List.Item>
          <List.Content>
            Item1
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            Item2
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            Item3
          </List.Content>
        </List.Item>
      </List>
    </Sidebar>
  );
};

ChatSidebar.propTypes = {
  visible: PropTypes.bool.isRequired,
  createRoom: PropTypes.func.isRequired,
};

export default ChatSidebar;