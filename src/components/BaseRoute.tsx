import React, { cloneElement, ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import { isEmpty, isFunction } from 'lodash';
import PrivateRoute from './PrivateRoute';
import { BaseRouteItem } from 'types/props/BaseRouteType';

interface IProps {
  routerArr: BaseRouteItem[];
}

const BaseRoute: React.FC<IProps> = (props) => {
  const { routerArr } = props;

  return (
    <Switch>
      {routerArr.map((route) => {
        const { type, routes, children, ...other } = route;

        const Component = (() => {
          switch (type) {
            case 'private':
              return PrivateRoute;
            default:
              return Route;
          }
        })();

        if (isEmpty(routes)) {
          return (
            <Component key={route.path as string} {...other}>
              {children}
            </Component>
          );
        } else {
          const getChildren = () => {
            const routesNode = BaseRoute({
              routerArr: routes || [],
            });

            if (isFunction(children)) {
              return (children as any)({
                routes: routesNode,
              });
            } else if ((children as ReactElement)?.props) {
              const node = children as ReactElement;

              return cloneElement(node, {
                routes: routesNode,
              });
            }
          };

          return (
            <Component {...other} key={route.path as string}>
              {getChildren()}
            </Component>
          );
        }
      })}
    </Switch>
  );
};

export default BaseRoute;
