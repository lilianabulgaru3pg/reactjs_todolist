import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateTasksRoute from "../components/PrivateTasksRoute";

const LoginPage = lazy(() => import("./Login"));
const Tasks = lazy(() => import("./Tasks"));

class App extends Component {
  render() {
    return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <PrivateTasksRoute path="/tasks" component={Tasks} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

export default App;
