import React from "react";
import clsx from "clsx";
import { ModalUnstyledProps } from "@mui/base";
import TransitionWrap from "Transition/TransitionWrap";
import useFade from "Transition/Fade";

interface Props {
  open?: boolean;
  className: string;
  ownerState?: ModalUnstyledProps;
}

const BackDrop = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { open = false, className, ownerState, ...other } = props;
  const { childrenStyle } = useFade();

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
