import React, { Component } from "react";
import { Firebase, FirebaseContext } from "../services/firebaseConfig";
import { withRouter } from "react-router-dom";

class Firewall extends Component {
  constructor(props) {
    super(props);
    Firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
    this.state = { user: "", uid: "" };
  }

  handleAuthStateChange = user => {
    console.log("AuthStateChanged", Firebase.auth().currentUser);
    this.setState({ user: user.email, uid: user.uid });
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
    return (
      <FirebaseContext.Provider value={this.state}>
        {this.props.children}
      </FirebaseContext.Provider>
    );
  }
}

const FirewallWithRouter = withRouter(Firewall);

export default FirewallWithRouter;
