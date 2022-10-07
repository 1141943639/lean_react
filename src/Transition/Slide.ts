import React, { MutableRefObject, ReactElement, useRef } from "react";
import { Transition, TransitionStatus } from "react-transition-group";
import { TransitionProps } from "react-transition-group/Transition";
import TransitionWrap from "./TransitionWrap";

const useSlide: () => {
  childrenStyle: (state: TransitionStatus) => object;
} = () => ({
  childrenStyle: (state: TransitionStatus) => {
    const defaultStyle = {
      transform: "translateX(-100%)",
    };

    const transitionStyles = {
      entering: { transform: "translateX(-100%)" },
      entered: { transform: "translateX(0%)" },
      exiting: { transform: "translateX(-100%)" },
      exited: { transform: "translateX(-100%)" },
      unmounted: undefined,
    };

    return {
      ...defaultStyle,
      ...transitionStyles[state],
    };
  },
});

export default useSlide;
