import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { Grid, Button, Form } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

import * as actions from '../../redux/modules/auth';
import RenderField from '../../components/RenderField';

@reduxForm({
  form: 'signin',
  validate
})
@connect(
  ({ auth }, ownProps) => ({
    auth
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)
export default class SignIn extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

  handleFormSubmit(formProps) {
    const { signinUser } = this.props.actions;

    signinUser(formProps);
  }

  errorAlert() {
    if (this.props.auth.error) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, submitting, auth } = this.props;

    if (auth.isAuth) {
      return (<Redirect to="/" />);
    }

    return (
      <Grid columns={1}>
        <Grid.Column>
          <Form onSubmit={handleSubmit(::this.handleFormSubmit)}>
            <Field
              component={RenderField}
              label="Email:"
              name="email"
              type="email"
            />

            <Field
              component={RenderField}
              label="Password:"
              name="password"
              type="password"
            />

            {this.errorAlert()}

            <Button
              color="green"
              disabled={submitting}
              type='submit'
            >
              Sign In
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = 'Please enter an email'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'Please enter a password';
  } else if (values.password.length < 6) {
    errors.password = 'Password length must be at least 6 characters long';
  } else if (!/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(values.password)) {
    errors.password = 'Password should has numbers and letters';
  }

  return errors;
}