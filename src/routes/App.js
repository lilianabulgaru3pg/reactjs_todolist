import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./Login/index";
import Firewall from "../components/Firewall";
import PrivateTasksRoute from "../components/PrivateTasksRoute";
import Tasks from "../routes/Tasks/index";

// const LoginPage = lazy(() => import("./Login/index"));
// const Tasks = lazy(() => import("./Tasks/index"));

class App extends Component {
  render() {
    return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Firewall>
            <Switch>
              <PrivateTasksRoute path="/tasks" component={Tasks} />
            </Switch>
          </Firewall>
          <Route exact path="/login" component={LoginPage} />
        </Suspense>
      </Router>
    );
  }
}

export default App;
