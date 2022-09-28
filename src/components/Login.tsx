import React from "react";

import { RouteComponentProps } from "react-router-dom";

export default function Login(props: RouteComponentProps) {
  const handleClick = () => {
    props.history.push("/home");
  };

  return (
    <>
      <div>我是登录页</div>
      <button onClick={handleClick}>登录</button>
    </>
  );
}
