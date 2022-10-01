import React from "react";
import { Route, Link, Switch } from "react-router-dom";

import TabBarLayout, { TabInterface } from "Layout/TabBarLayout/index";
import ProvideAuth from "context/Auth";

import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";

import TodoList from "pages/TodoList/index";
import Login from "pages/Login";
import BaseRoute from "components/BaseRoute";
import Profile from "pages/Profile";
import Header from "Layout/Header";

function App() {
  const { t } = useTranslation();

  const tabList = [
    {
      path: "/",
      children: <Login />,
      name: <Trans i18nKey="tabBar.login" />,
      exact: true,
    },
    {
      path: "/home",
      children: <Profile />,
      name: <Trans i18nKey="tabBar.home" />,
      type: "private",
      exact: true,
    },
    {
      path: "/todoList",
      children: <TodoList />,
      name: <Trans i18nKey="tabBar.todoList" />,
      type: "private",
      exact: true,
    },
  ];

  return (
    <ProvideAuth>
      <Header />
      <Switch>
        {tabList.map((item) => (
          <BaseRoute key={item.path} {...item} />
        ))}
      </Switch>

      <TabBarLayout tabList={tabList} />
    </ProvideAuth>
  );
}

export default App;
