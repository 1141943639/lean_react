import React, { ReactNode } from 'react';
import { ModalUnstyled, ModalUnstyledProps } from '@mui/base';
import LoadingSvg from 'icons/svg/LoadingSvg';
import TransitionWrap from 'Transition/TransitionWrap';
import useFade from 'Transition/Fade';

export type LoadingProps = { children: ReactNode; open: boolean } | ModalUnstyledProps;

const Loading = (props: LoadingProps) => {
  const { open } = props;
  const { childrenStyle } = useFade();

  return (
    <>
      {open && (
        <TransitionWrap in={open} childrenStyle={childrenStyle} timeout={200}>
          <div className="absolute w-screen h-screen flex justify-center items-center bg-opacity-25 bg-black z-9999">
            <LoadingSvg className="w-10 h-10 text-blue-500 animate-spin" />
          </div>
        </TransitionWrap>
      )}
      {props.children}
    </>
  );
};

export default Loading;
