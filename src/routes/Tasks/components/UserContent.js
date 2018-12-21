import React, { Component } from 'react';
import { signOut, FirebaseContext } from '../../../services/firebase';

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

UserContent.contextType = FirebaseContext;

export default UserContent;
