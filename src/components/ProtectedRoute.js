import React from "react";
import { Route, Redirect } from "react-router-dom";
import authenticate from "../classes/Authenticate";

export default ({component: Component, admin, children, ...rest}) => 
  <Route {...rest} render={
    props => (authenticate.isAuthenticated() && (authenticate.isAdmin() || !admin))
        ? <Component {...props} />
        : <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
    }
  />