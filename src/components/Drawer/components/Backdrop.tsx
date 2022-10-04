import React from "react";
import clsx from "clsx";
import { ModalUnstyledProps } from "@mui/base";

interface Props {
  open?: boolean;
  className: string;
  ownerState?: ModalUnstyledProps;
}

const BackDrop = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { open, className, ownerState, ...other } = props;

  return (
    <div
      className={clsx(
        { "fixed bg-black bg-opacity-25 w-screen h-screen -z-1": open },
        className
      )}
      ref={ref}
      {...other}
    />
  );
};

export default React.forwardRef<HTMLDivElement, Props>(BackDrop);
