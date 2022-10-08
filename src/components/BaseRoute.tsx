import React, { ReactNode } from "react";
import { Route, RouteProps } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import get from "lodash/get";
import { isFunction } from "lodash";

interface BaseRoute extends RouteProps {
  type?: string;
}

interface NestedBaseRoute extends BaseRoute {
  routes?: Array<Route>;
}

type RoutesConfig = Array<NestedBaseRoute | BaseRoute>;

interface Props {
  routesConfig: RoutesConfig;
}

const BaseRoute: React.FC<Props> = (props) => {
  const { routesConfig } = props;

  return (
    <>
      {routesConfig.map((routes) => {
        const { type, children, ...other } = routes;

        const Component = (() => {
          switch (type) {
            case "private":
              return PrivateRoute;
            default:
              return Route;
          }
        })();

        if (get(routes, "routes")) {
          return (
            <Component {...other}>
              {isFunction(children) ? children(BaseRoute(routes)) : children}
            </Component>
          );
        } else {
          return <Component {...other}>{children}</Component>;
        }
      })}
    </>
  );
};

export default BaseRoute;
