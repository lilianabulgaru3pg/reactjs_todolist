import React, { Component } from "react";
import { signOut, FirebaseContext } from "../../../services/firebaseConfig";
import { withRouter } from "react-router-dom";

class UserContent extends Component {
  handleClick = () => {
    signOut();
  };
  render() {
    // let username = this.props.location.state.user;
    console.log("context", this, this.context);
    return (
      <button
        className="button-style-1 button-loggout"
        onClick={this.handleClick}
      >
        {this.context.user}
      </button>
    );
  }
}

UserContent.contextType = FirebaseContext;
const UserContentWithRouter = withRouter(UserContent);

export default UserContentWithRouter;
