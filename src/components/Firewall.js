import React, { Component } from "react";
import { Firebase } from "../routes/firebaseConfig";
import { withRouter } from "react-router-dom";

class Firewall extends Component {
  constructor(props) {
    super(props);
    this.state = { redirectToReferrer: false };
    Firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
  }

  handleAuthStateChange = user => {
    console.log("AuthStateChanged", Firebase.auth().currentUser);
    if (Firebase.auth().currentUser) {
      this.setState({ redirectToReferrer: true });
      this.props.history.push({ pathname: "/tasks", state: {} });
    }
    this.setState({ redirectToReferrer: false });
  };

  render() {
    return this.props.children;
  }
}

const FirewallWithRouter = withRouter(Firewall);

export default FirewallWithRouter;
