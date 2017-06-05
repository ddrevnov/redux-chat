import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as authActions from '../../redux/modules/auth';

import Header from './components/Header';
import PrivateRoute from '../../components/PrivateRoute';
import Chat from '../Chat';
import About from '../About';
import SignUp from '../SignUp';
import SignIn from '../SignIn';

@withRouter
@connect(
  ({ auth }, ownProps) => ({
    auth
  }),
  dispatch => ({
    authActions: bindActionCreators(authActions, dispatch)
  })
)
class App extends Component {
  render() {
    const { logoutUser } = this.props.authActions;
    const { auth: { isAuth } } = this.props;

    return (
      <Grid container columns={1}>
        <Grid.Column>
          <Header
            logout={logoutUser}
            isAuth={isAuth}
          />
          <Switch>
            <PrivateRoute exact path="/" component={Chat} isAuth={isAuth} />
            <Route path="/about" component={About} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;
