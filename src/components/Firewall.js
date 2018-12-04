import React, { Component } from "react";
import { Firebase } from "../routes/firebaseConfig";
import { Redirect, withRouter } from "react-router-dom";

class Firewall extends Component {
  constructor(props) {
    super(props);
    Firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
  }

  handleAuthStateChange = user => {
    console.log("AuthStateChanged", Firebase.auth().currentUser);
    if (!Firebase.auth().currentUser) {
      this.props.history.push({ pathname: "/login", state: {} });
    } else {
      this.props.history.replace({ pathname: "/tasks", state: {} });
    }
  };

  render() {
    return this.props.children;
  }
}

const FirewallWithRouter = withRouter(Firewall);

export default FirewallWithRouter;
