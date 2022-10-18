import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { selectUser } from 'store/slice/auth';
import { useAppSelector } from 'hooks/useAppState';

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const { user } = useAppSelector(selectUser);

  return <Route {...props}>{user.id ? props.children : <Redirect to="/" />}</Route>;
};

export default PrivateRoute;
