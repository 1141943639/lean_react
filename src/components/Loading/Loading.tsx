import { ModalUnstyled, ModalUnstyledProps } from "@mui/base";
import React, { ReactNode } from "react";
import LoadingSvg from "icons/svg/LoadingSvg";
import TransitionWrap from "Transition/TransitionWrap";
import useFade from "Transition/Fade";

export type LoadingProps =
  | { children: ReactNode; open: boolean }
  | ModalUnstyledProps;

const Loading = (props: LoadingProps) => {
  const { open } = props;
  const { childrenStyle } = useFade();

  return (
    <>
      <ModalUnstyled {...props}>
        <div>
          <TransitionWrap in={open} childrenStyle={childrenStyle} timeout={200}>
            <div className="absolute w-screen h-screen flex justify-center items-center bg-opacity-25 bg-black">
              <LoadingSvg className="w-5 h-5" />
            </div>
          </TransitionWrap>
        </div>
      </ModalUnstyled>
      {props.children}
    </>
  );
};

export default Loading;
