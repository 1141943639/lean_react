import React from "react";
import clsx from "clsx";
import { ModalUnstyledProps } from "@mui/base";

interface Props {
  open?: boolean;
  className: string;
  ownerState?: ModalUnstyledProps;
}

const Root = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { open, ownerState, ...other } = props;

  return <div ref={ref} {...other} />;
};

export default React.forwardRef<HTMLDivElement, Props>(Root);
