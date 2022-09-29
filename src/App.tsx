import React from "react";
import { Route, Link } from "react-router-dom";

import TabBarLayout, { TabInterface } from "Layout/TabBarLayout/index";

import ProvideAuth from "context/Auth";

import TodoList from "pages/TodoList/index";
import Login from "pages/Login";
import PrivateRoute from "components/PrivateRoute";

function App() {
  const tabList = [
    {
      path: "/",
      component: (
        <Route path="/">
          <Login />
        </Route>
      ),
      name: "登录",
    },
    {
      path: "/profile",
      component: (
        <PrivateRoute path="/profile">
          <div />
        </PrivateRoute>
      ),
      name: "个人中心",
    },
    {
      path: "/todoList",
      component: (
        <PrivateRoute path="/todoList">
          <TodoList />
        </PrivateRoute>
      ),
      name: "TodoList",
    },
  ];

  return (
    <ProvideAuth>
      <TabBarLayout tabList={tabList} />
    </ProvideAuth>
  );
}

export default App;
