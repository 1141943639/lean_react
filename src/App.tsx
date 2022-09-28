import React from "react";
import { Route, Link } from "react-router-dom";

import Home from "components/Home";
import Login from "components/Login";

function App() {
  return (
    <div>
      <p>路由测试页面:</p>
      <Link to="/home">首页</Link>
      <Link to="/login">登录</Link>
      <Route path="/home" component={Home} />
      <Route path="/login" component={Login} />
    </div>
  );
}

export default App;
