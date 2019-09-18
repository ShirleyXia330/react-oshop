import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getUser } from "../../services/authService";

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (getUser())
          return Component ? <Component {...props} /> : render(props);
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
