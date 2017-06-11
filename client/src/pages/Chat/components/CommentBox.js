import React from 'react';
import PropTypes from 'prop-types';
import { Comment, Segment } from 'semantic-ui-react';
import CreateMessage from './CreateMessage';

const CommentBox = ({ messages, createMessage, room }) => {
  return (
    <Segment basic>
      <Comment.Group>
        <Comment>
          {/*<Comment.Avatar src='/assets/images/avatar/small/matt.jpg' />*/}
          <Comment.Content>
            <Comment.Author as='a'>Matt</Comment.Author>
            <Comment.Metadata>
              <div>Today at 5:42PM</div>
            </Comment.Metadata>
            <Comment.Text>How artistic!</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>

        <CreateMessage
          room={room}
          createMessage={createMessage}
        />
      </Comment.Group>
    </Segment>
  );
};

CommentBox.propTypes = {
  messages: PropTypes.object.isRequired,
  createMessage: PropTypes.func.isRequired,
  room: PropTypes.object.isRequired,
};

export default CommentBox;