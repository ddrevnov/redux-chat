import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Button, Form } from 'semantic-ui-react';
import * as actions from '../../redux/modules/auth';

@connect(
  (auth, ownProps) => ({
    auth
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)
export default class SignUp extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

  handleSubmit(e) {
    e.preventDefault();
    const { signupUser } = this.props.actions;

    signupUser({
      email: 'den@gmail.com',
      password: 'Easdfsaf666',
      username: 'den'
    });
  }

  render() {
    return (
      <Grid columns={1}>
        <Grid.Column>
          <Form onSubmit={::this.handleSubmit}>
            <Form.Field>
              <label>UserName:</label>
              <input placeholder='User Name' />
            </Form.Field>
            <Form.Field>
              <label>Email:</label>
              <input placeholder='Email' />
            </Form.Field>
            <Form.Field>
              <label>Password:</label>
              <input type='password' placeholder='Password' />
            </Form.Field>
            <Button type='submit'>Submit</Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}