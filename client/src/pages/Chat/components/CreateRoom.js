import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'semantic-ui-react';

import RenderField from '../../../components/RenderField';

@reduxForm({
  form: 'createRoom',
  validate
})
export default class CreateRoom extends Component {
  static propTypes = {
    createRoom: PropTypes.func.isRequired,
  };

  handleFormSubmit({ roomName }) {
    const { createRoom } = this.props;

    createRoom(roomName);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Form onSubmit={handleSubmit(::this.handleFormSubmit)}>
        <Field
          component={RenderField}
          name="roomName"
          placeholder="Room name"
          type="text"
        />

        <Button
          color="green"
          type='submit'
        >
          Create
        </Button>
      </Form>
    );
  }
};

function validate(values) {
  const errors = {};

  if (!values.roomName) {
    errors.roomName = 'Please enter a room name';
  }

  return errors;
}
