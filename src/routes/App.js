import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./Login/index";
import Firewall from "../components/Firewall";
import PrivateTasksRoute from "../components/PrivateTasksRoute";
import Tasks from "../routes/Tasks/index";
import { TASKS, LOGIN } from "../constants";

// const LoginPage = lazy(() => import("./Login/index"));
// const Tasks = lazy(() => import("./Tasks/index"));

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
