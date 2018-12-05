import React, { Component } from "react";
import { signOut } from "../../../services/firebaseConfig";
import { withRouter } from "react-router-dom";

class UserContent extends Component {
  handleClick = () => {
    signOut();
  };
  render() {
    let username = this.props.location.state.user;

    return (
      <button
        className="button-style-1 button-loggout"
        onClick={this.handleClick}
      >
        {username}
      </button>
    );
  }
}

const UserContentWithRouter = withRouter(UserContent);

export default UserContentWithRouter;
