import React, { useEffect, useRef, useState } from "react";

import ModalUnstyled, { ModalUnstyledProps } from "@mui/base/ModalUnstyled";
import Backdrop from "./components/Backdrop";
import { cloneDeep } from "lodash";
import useSlide from "../../Transition/Slide";
import TransitionWrap from "Transition/TransitionWrap";

type Props = ModalUnstyledProps;

const Drawer: React.FC<Props> = (props) => {
  const { open, children } = props;
  const { childrenStyle } = useSlide();

  return (
    <ModalUnstyled
      {...props}
      componentsProps={{
        root: (state) => {
          return {
            className: "z-1200 fixed h-screen left-0 top-0",
          };
        },
      }}
      components={{ Backdrop }}
    >
      <TransitionWrap childrenStyle={childrenStyle} timeout={200} in={open}>
        {children}
      </TransitionWrap>
    </ModalUnstyled>
  );
};

export default Drawer;
