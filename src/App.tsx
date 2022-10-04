import React from "react";
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

function App() {
  const { t } = useTranslation();

  const tabList = [
    {
      path: "/test",
      children: <Login />,
      name: <div title={t("tabBar.login")}>{t("tabBar.login")}</div>,
      exact: true,
      svg: <LoginSvg className="w-4 h-4" />,
    },
    {
      path: "/test/home",
      children: <Profile />,
      name: <div title={t("tabBar.home")}>{t("tabBar.home")}</div>,
      type: "private",
      exact: true,
    },
    {
      path: "/test/todoList",
      children: <TodoList />,
      name: <div title={t("tabBar.todoList")}>{t("tabBar.todoList")}</div>,
      type: "private",
      exact: true,
    },
  ];

  return (
    <div className="bg-gray-100 p-5 h-screen">
      <Switch>
        <BaseRoute path="/test">
          <div className="flex h-full">
            <div className="md:block hidden mr-5 h-full w-3/12 rounded-md overflow-hidden">
              <SideBar tabList={tabList} />
            </div>
            <div className="h-full rounded-md overflow-hidden bg-white w-full flex flex-col">
              <div className="p-3 pb-0">
                <Header />
              </div>
              <div className="overflow-hidden flex-1 mt-2">
                <Switch>
                  {tabList.map((item) => (
                    <BaseRoute key={item.path} {...item} />
                  ))}
                </Switch>
              </div>
            </div>
          </div>
        </BaseRoute>
        <BaseRoute path="/" exact>
          <Redirect to="/test" />
        </BaseRoute>
        <BaseRoute path="*" exact>
          <NoMatch />
        </BaseRoute>
      </Switch>
    </div>
  );
}

export default App;
