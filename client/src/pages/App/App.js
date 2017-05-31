import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import Header from './components/Header';
import Chat from '../Chat';
import About from '../About';
import SignUp from '../SignUp';

class App extends Component {
  render() {
    return (
      <Grid container columns={1}>
        <Grid.Column>
          <Header />
          <Switch>
            <Route exact path="/" component={Chat} />
            <Route path="/about" component={About} />
            <Route path="/signup" component={SignUp} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;
