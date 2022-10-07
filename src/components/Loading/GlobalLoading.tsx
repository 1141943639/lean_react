import { ModalUnstyledProps } from "@mui/base";
import { useAppSelector } from "hooks";
import React, { ReactElement, ReactNode } from "react";
import { selectLoading } from "slice/loading";
import Loading, { LoadingProps } from "./Loading";

const GlobalLoading = (props: { children: ReactNode } | LoadingProps) => {
  const { loading } = useAppSelector(selectLoading);

  const { ...other } = props;

  return <Loading open={loading} {...other} />;
};

export default GlobalLoading;
