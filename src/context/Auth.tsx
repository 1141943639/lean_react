import React, { useContext, useState } from "react";

const authContext = React.createContext({});

const fakeAuth = {
  isAuthenticated: false,
  signin(cb: any) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb: any) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

interface ProvideAuth {
  signin: () => Promise<void>;
  signout: () => Promise<void>;
  user: string;
}

const useProvideAuth = () => {
  const [user, setUser] = useState("");

  const signin = async () => {
    await new Promise((resolve) => fakeAuth.signin(resolve));
    setUser("user");
  };

  const signout = async () => {
    await new Promise((resolve) => fakeAuth.signout(resolve));
  };

  return {
    user,
    signin,
    signout,
  } as ProvideAuth;
};

interface IProps {
  children: React.ReactNode;
}

const Auth: React.FC<IProps> = (props) => {
  const auth = useProvideAuth();

  return (
    <authContext.Provider value={auth}>{props.children}</authContext.Provider>
  );
};

export default Auth;
export const useAuth = () => useContext(authContext) as ProvideAuth;
