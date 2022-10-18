import React, { ReactNode } from 'react';
import Loading, { LoadingProps } from './Loading';
import { useAppSelector } from 'hooks/useAppState';
import { selectLoading } from 'store/slice/loading';

const GlobalLoading = (props: { children: ReactNode } | LoadingProps) => {
  const { loading } = useAppSelector(selectLoading);
  const { ...other } = props;

  return <Loading open={loading} {...other} />;
};

export default GlobalLoading;
