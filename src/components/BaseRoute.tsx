import React from "react";
import { Route, RouteProps } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

interface IProps extends RouteProps {
  type?: string;
}

const BaseRoute: React.FC<IProps> = (props) => {
  const { children, ...arg } = props;

  if (props.type === "private") {
    return <PrivateRoute {...arg}>{children}</PrivateRoute>;
  } else {
    return <Route {...arg}>{children}</Route>;
  }
};

export default BaseRoute;
