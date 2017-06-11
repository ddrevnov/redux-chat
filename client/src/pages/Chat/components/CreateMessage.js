import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Form, Button } from 'semantic-ui-react';

import RenderField from '../../../components/RenderField';

@reduxForm({
  form: 'createMessage',
  validate
})
export default class CreateMessage extends Component {
  static propTypes = {
    createMessage: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    room: PropTypes.object.isRequired,
  };

  handleFormSubmit({ message }) {
    const { createMessage, reset, room } = this.props;

    createMessage({ text: message, room: room._id })
      .then(result => reset('createMessage'));
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Form reply onSubmit={handleSubmit(::this.handleFormSubmit)}>
        <Field
          component={RenderField}
          name="message"
          placeholder="Enter message"
          type="text"
        />

        <Button
          color="green"
          type='submit'
        >
          Send
        </Button>
      </Form>
    );
  }
};

function validate(values) {
  const errors = {};

  if (!values.message) {
    errors.roomName = 'Please enter a message';
  }

  return errors;
}
