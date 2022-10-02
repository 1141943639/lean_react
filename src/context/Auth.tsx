import React, { useContext, useState } from "react";
import { setUser, selectAuth } from "slice/auth";
import { useAppDispatch, useAppSelector } from "hooks";

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

interface SigninData {
  username: string;
  pwd: string;
}
interface ProvideAuth {
  signin: (data: SigninData) => Promise<void>;
  signout: () => Promise<void>;
  user: string;
}

const useProvideAuth = () => {
  const { user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const signin = async (data: SigninData) => {
    await new Promise((resolve) => fakeAuth.signin(resolve));
    dispatch(setUser(data.username));
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
export const useAuth = (): ProvideAuth =>
  useContext(authContext) as ProvideAuth;
