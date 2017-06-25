import React from 'react';
import PropTypes from 'prop-types';
import { Comment, Segment, Loader } from 'semantic-ui-react';
import CreateMessage from './CreateMessage';

const CommentBox = ({ messages: { messages, loading }, createMessage, fetchMessagesByRoomId, room }) => {
  return (
    <Segment basic>
      <Comment.Group>

        {loading && <Loader inverted>Loading</Loader>}

        {!loading &&
        messages.map((message) => (
          <Comment key={message._id}>
            {/*<Comment.Avatar src='/assets/images/avatar/small/matt.jpg' />*/}
            <Comment.Content>
              <Comment.Author as='a'>{message.sender.username}</Comment.Author>
              <Comment.Metadata>
                <div>{message.createdAt}</div>
              </Comment.Metadata>
              <Comment.Text>{message.text}</Comment.Text>
              <Comment.Actions>
                {/*<Comment.Action>Reply</Comment.Action>*/}
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        ))
      }


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