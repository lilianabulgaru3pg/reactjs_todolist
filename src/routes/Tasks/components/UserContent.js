import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { signOut, FirebaseContext } from '../../../services/firebaseConfig';

class UserContent extends Component {
  handleClick = () => {
    signOut();
  };

  render() {
    return (
      <button
        type="button"
        className="button-style-1 button-loggout"
        onClick={this.handleClick}
      >
        {this.context.user ? this.context.user : ''}
      </button>
    );
  }
}

const UserContentWithRouter = withRouter(UserContent);

export default UserContentWithRouter;
UserContent.contextType = FirebaseContext;
