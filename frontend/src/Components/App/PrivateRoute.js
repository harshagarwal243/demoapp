import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAutheticated } from '../../Auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAutheticated() ? (
          <Component {...props} />
        ) : (
          <React.Fragment>
            { alert("Please sign in first")}
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
          </React.Fragment>
        )
      }
    />
  );
};

export default PrivateRoute;
