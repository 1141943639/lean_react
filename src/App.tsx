import React, { useCallback, useEffect, useState } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";

import SideBar, { TabInterface } from "Layout/SideBar/index";

import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";

import TodoList from "pages/TodoList/index";
import Login from "pages/Login";
import BaseRoute from "components/BaseRoute";
import Profile from "pages/Profile";
import Header from "Layout/Header";
import NoMatch from "pages/NoMatch";

import LoginSvg from "icons/svg/LoginSvg";
import Drawer from "components/Drawer";
import Wrap from "pages/Wrap";

function App() {
  const { t } = useTranslation();

  const tabList = [
    {
      path: "/index",
      children: <Login />,
      name: <div title={t("tabBar.login")}>{t("tabBar.login")}</div>,
      exact: true,
      svg: <LoginSvg className="w-4 h-4" />,
    },
    {
      path: "/index/home",
      children: <Profile />,
      name: <div title={t("tabBar.home")}>{t("tabBar.home")}</div>,
      type: "private",
      exact: true,
    },
    {
      path: "/index/todoList",
      children: <TodoList />,
      name: <div title={t("tabBar.todoList")}>{t("tabBar.todoList")}</div>,
      type: "private",
      exact: true,
    },
  ];

  const routerArr = [
    {
      path: "/index",
      children: <Wrap tabList={tabList} />,
      routes: tabList,
    },
    {
      path: "/",
      exact: true,
      children: <Redirect to="/index" />,
    },
    {
      path: "*",
      exact: true,
      children: <NoMatch />,
    },
  ];

  return (
    <div className="bg-gray-100 md:p-5 h-screen">
      <BaseRoute routerArr={routerArr} />
    </div>
  );
}

export default App;
