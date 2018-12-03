import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateTasksRoute from "../components/PrivateTasksRoute";
import Tasks from "./Tasks/index";
import LoginPage from "./Login/index";

// const LoginPage = lazy(() => import("./Login/index"));
// const Tasks = lazy(() => import("./Tasks/index"));

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
