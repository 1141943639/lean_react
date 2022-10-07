import React, { MutableRefObject, ReactElement, useRef } from "react";
import { Transition, TransitionStatus } from "react-transition-group";
import { TransitionProps } from "react-transition-group/Transition";
import TransitionWrap from "./TransitionWrap";

const useFade: () => {
  childrenStyle: (state: TransitionStatus) => object;
} = () => ({
  childrenStyle: (state: TransitionStatus) => {
    const defaultStyle = {
      opacity: "0",
    };

    const transitionStyles = {
      entering: { opacity: "1" },
      entered: { opacity: "1" },
      exiting: { opacity: "0" },
      exited: { opacity: "0" },
      unmounted: undefined,
    };

    return {
      ...defaultStyle,
      ...transitionStyles[state],
    };
  },
});

export default useFade;
