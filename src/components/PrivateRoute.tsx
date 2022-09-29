import React from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";

import { useAuth } from "context/Auth";

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const { user } = useAuth();

  return (
    <Route {...props}>{user ? props.children : <Redirect to="/" />}</Route>
  );
};

export default PrivateRoute;
