import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Button, Form, Label } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';
import * as actions from '../../redux/modules/auth';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <Form.Field>
    <label>{label}</label>
    <input {...input} placeholder={label} type={type}/>
    {touched && (error && <Label basic color='red' pointing>{error}</Label>)}
  </Form.Field>
);

@reduxForm({
  form: 'signup',
  validate
})
@connect(
  (state, ownProps) => ({
    auth: state.auth
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)
export default class SignUp extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

  handleFormSubmit(formProps) {
    const { signupUser } = this.props.actions;

    signupUser(formProps);
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
    const { handleSubmit, pristine, reset, submitting, auth } = this.props;

    if (auth.isAuth) {
      return (<Redirect to="/" />);
    }

    return (
      <Grid columns={1}>
        <Grid.Column>
          <Form onSubmit={handleSubmit(::this.handleFormSubmit)}>
            <Field
              component={renderField}
              label="User Name:"
              name="username"
              type="text"
            />

            <Field
              component={renderField}
              label="Email:"
              name="email"
              type="email"
            />

            <Field
              component={renderField}
              label="Password:"
              name="password"
              type="password"
            />

            <Field
              component={renderField}
              label="password Confirm:"
              name="passwordConfirm"
              type="password"
            />

            {this.errorAlert()}

            <Button
              color="green"
              disabled={submitting}
              type='submit'>Sign Up</Button>
            <Button
              color="red"
              type="button"
              disabled={pristine || submitting} onClick={reset}>Clear Values</Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.username) {
    errors.username = 'Please enter a username';
  }

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

  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirm';
  }

  if (values.password !== values.passwordConfirm) {
    errors.password = 'Password must match';
  }

  return errors;
}