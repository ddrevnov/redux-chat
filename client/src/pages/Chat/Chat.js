import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Import actions here!!

// @connect(
//   (state, ownProps) => ({
//     state,
//   }),
//   dispatch => ({
//     actions: bindActionCreators(actions, dispatch)
//   }))
export default class Chat extends Component {
  static propTypes = {
    // prop: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div>
        <h1>Chat</h1>
      </div>
    );
  }
}