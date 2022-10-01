import React from "react";

import { RouteComponentProps } from "react-router-dom";

import { useAuth } from "context/Auth";
import { Trans } from "react-i18next";

export default function Login() {
  const { signin } = useAuth();
  const [username, setUsername] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const handleClick = () => {
    signin({
      username,
      pwd,
    });
  };

  return (
    <>
      <Trans i18nKey="login.title">Login Page</Trans>
      <input
        placeholder="账号"
        onChange={(e) => setUsername(e.currentTarget.value)}
        value={username}
      />
      <input
        onChange={(e) => setPwd(e.currentTarget.value)}
        placeholder="密码"
        value={pwd}
      />
      <button onClick={handleClick}>登录</button>
    </>
  );
}
