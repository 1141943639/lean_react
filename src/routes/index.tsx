import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

import { Trans } from 'react-i18next';
import LoginSvg from 'icons/svg/LoginSvg';
import Login from 'pages/Login';
import Profile from 'pages/Profile';
import TodoList from 'pages/TodoList/index';
import { BaseRouteItem } from 'types/props/BaseRouteType';

const Wrap = lazy(() => import('pages/Wrap'));
const NoMatch = lazy(() => import('pages/NoMatch'));

export const ROUTE_LIST = [
  {
    path: '/index',
    children: <Wrap />,
    routes: [
      {
        path: '/index',
        children: <Login />,
        name: <Trans i18nKey="tabBar.login" />,
        exact: true,
        svg: <LoginSvg className="w-4 h-4" />,
      },
      {
        path: '/index/home',
        children: <Profile />,
        name: <Trans i18nKey="tabBar.home" />,
        type: 'private',
        exact: true,
      },
      {
        path: '/index/todoList',
        children: <TodoList />,
        name: <Trans i18nKey="tabBar.todoList" />,
        type: 'private',
        exact: true,
      },
    ],
  },
  {
    path: '/',
    exact: true,
    children: <Redirect to="/index" />,
  },
  {
    path: '*',
    exact: true,
    children: <NoMatch />,
  },
];

const deepRoute = (list = ROUTE_LIST, callback: (route: BaseRouteItem) => any) => {
  list.forEach((item) => {
    callback(item);

    if (item.routes) {
      deepRoute(item.routes, callback);
    }
  });
};
export const getRouteByPath = (path: string) => {
  let selectRoute: BaseRouteItem | undefined;

  deepRoute(ROUTE_LIST, (route) => {
    if (route.path === path && !selectRoute) {
      selectRoute = route;
    }
  });

  return selectRoute;
};
