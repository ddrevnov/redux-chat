import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/modules/rooms';
import { Sidebar, Segment, Button, Header, Icon, Grid } from 'semantic-ui-react';

import './Chat.css';

import ChatSidebar from './components/ChatSidebar';

@connect(
  ({ rooms }, ownProps) => ({
    rooms,
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  }))
export default class Chat extends Component {
  state = { visible: false };

  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

  toggleVisibility() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const { visible } = this.state;
    const { actions } = this.props;

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
            createRoom={actions.createRoom}
          />
          <Sidebar.Pusher>
            <Segment basic>

            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Segment>
    );
  }
}