import React from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { selectUser } from "slice/auth";
import { useAppSelector } from "hooks";

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const { user } = useAppSelector(selectUser);

  return (
    <Route {...props}>{user.id ? props.children : <Redirect to="/" />}</Route>
  );
};

export default PrivateRoute;
