import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Firewall from "../components/Firewall";
import { LOGIN } from "../constants";
import LoginPage from "./Login/index";
import Tasks from "./Tasks/index";

class App extends Component {
  render() {
    return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Firewall>
            <Tasks />
          </Firewall>
          <Route exact path={LOGIN} component={LoginPage} />
        </Suspense>
      </Router>
    );
  }
}

export default App;
