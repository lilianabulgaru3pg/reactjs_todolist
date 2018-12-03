import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const LoginPage = lazy(() => import("./Login"));

class App extends Component {
  render() {
    return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={LoginPage} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

export default App;
