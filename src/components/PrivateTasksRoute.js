import React from "react";
import { isAuthenticated } from "../services/firebaseConfig";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

function PrivateTaskRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateTaskRoute;
