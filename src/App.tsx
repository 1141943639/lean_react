import React from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";

import TabBarLayout, { TabInterface } from "Layout/TabBarLayout/index";
import ProvideAuth from "context/Auth";

import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";

import TodoList from "pages/TodoList/index";
import Login from "pages/Login";
import BaseRoute from "components/BaseRoute";
import Profile from "pages/Profile";
import Header from "Layout/Header";
import NoMatch from "pages/NoMatch";

function App() {
  const { t } = useTranslation();

  const tabList = [
    {
      path: "/test",
      children: <Login />,
      name: <Trans i18nKey="tabBar.login" />,
      exact: true,
    },
    {
      path: "/test/home",
      children: <Profile />,
      name: <Trans i18nKey="tabBar.home" />,
      type: "private",
      exact: true,
    },
    {
      path: "/test/todoList",
      children: <TodoList />,
      name: <Trans i18nKey="tabBar.todoList" />,
      type: "private",
      exact: true,
    },
  ];

  return (
    <ProvideAuth>
      <Switch>
        <BaseRoute path="/test">
          <Header />
          <Switch>
            {tabList.map((item) => (
              <BaseRoute key={item.path} {...item} />
            ))}
          </Switch>

          <TabBarLayout tabList={tabList} />
        </BaseRoute>
        <BaseRoute path="/" exact>
          <Redirect to="/test" />
        </BaseRoute>
        <BaseRoute path="*" exact>
          <NoMatch />
        </BaseRoute>
      </Switch>
    </ProvideAuth>
  );
}

export default App;
