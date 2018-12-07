import React, { Component } from "react";
import { Firebase, FirebaseContext } from "../services/firebaseConfig";
import { withRouter } from "react-router-dom";
import { TASKS, LOGIN } from "../constants";

class Firewall extends Component {
  constructor(props) {
    super(props);
    Firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
    this.state = { user: "", uid: "" };
  }

  handleAuthStateChange = user => {
    console.log("user.email", user);
    if (!user) {
      this.setState({ user: "", uid: "" });
      this.props.history.push({ pathname: LOGIN, state: {} });
    } else {
      this.setState({ user: user.email, uid: user.uid });
      this.props.history.replace({
        pathname: TASKS,
        state: {}
      });
    }
  };

  render() {
    return (
      <FirebaseContext.Provider value={this.state}>
        {this.state.user && this.props.children}
      </FirebaseContext.Provider>
    );
  }
}

const FirewallWithRouter = withRouter(Firewall);

export default FirewallWithRouter;
