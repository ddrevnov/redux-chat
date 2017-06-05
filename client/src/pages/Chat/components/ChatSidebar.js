import React from 'react';
import PropTypes from 'prop-types';
import { Sidebar, Menu, List } from 'semantic-ui-react';

const ChatSidebar = ({ visible }) => {
  return (
    <Sidebar as={Menu} animation='uncover' width='thin' visible={visible} vertical inverted>
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
  visible: PropTypes.bool.isRequired
};

export default ChatSidebar;