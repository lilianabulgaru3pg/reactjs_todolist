import React, { Component } from "react";
import { Firebase } from "../services/firebaseConfig";
import { withRouter, Switch } from "react-router-dom";

class Firewall extends Component {
  constructor(props) {
    super(props);
    Firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
  }

  handleAuthStateChange = user => {
    console.log("AuthStateChanged", Firebase.auth().currentUser);
    if (!user) {
      this.props.history.push({ pathname: "/login", state: {} });
    } else {
      console.log("user.email", user.email);
      this.props.history.replace({
        pathname: "/tasks",
        state: { user: user.email }
      });
    }
  };

  render() {
    return this.props.children;
  }
}

const FirewallWithRouter = withRouter(Firewall);

export default FirewallWithRouter;
