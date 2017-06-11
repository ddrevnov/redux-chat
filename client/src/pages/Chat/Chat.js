import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as roomsActions from '../../redux/modules/rooms';
import * as messagesActions from '../../redux/modules/messages';
import { Sidebar, Segment, Button, Header, Icon, Grid } from 'semantic-ui-react';

import './Chat.css';

import ChatSidebar from './components/ChatSidebar';
import CommentBox from './components/CommentBox';

@connect(
  ({ rooms, messages }, ownProps) => ({
    rooms,
    messages,
  }),
  dispatch => ({
    roomsActions: bindActionCreators(roomsActions, dispatch),
    messagesActions: bindActionCreators(messagesActions, dispatch),
  }))
export default class Chat extends Component {
  state = { visible: false };

  static propTypes = {
    roomsActions: PropTypes.object.isRequired,
    messagesActions: PropTypes.object.isRequired,
    rooms: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { fetchRooms } = this.props.roomsActions;

    fetchRooms();
  }

  toggleVisibility() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const { visible } = this.state;
    const { rooms, messages, roomsActions, messagesActions } = this.props;

    return (
      <Segment>
        <Grid columns={2}>
          <Grid.Column width={1}>
            <Button onClick={::this.toggleVisibility} icon>
              <Icon name='sidebar' />
            </Button>
          </Grid.Column>

          <Grid.Column width={15}>
            <Header as="h1" textAlign="center">Chat</Header>
          </Grid.Column>
        </Grid>
        <Sidebar.Pushable
          as={Segment}
          className="chat-sidebar"
        >
          <ChatSidebar
            visible={visible}
            createRoom={roomsActions.createRoom}
            rooms={rooms}
            selectRoom={roomsActions.selectRoom}
          />
          <Sidebar.Pusher>
            <CommentBox
              messages={messages}
              createMessage={messagesActions.createMessage}
              room={rooms.room}
            />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Segment>
    );
  }
}