import React, {
  forwardRef,
  MutableRefObject,
  ReactElement,
  useRef,
} from "react";
import { Transition, TransitionStatus } from "react-transition-group";
import { TransitionProps } from "react-transition-group/Transition";

const TransitionWrap = (
  props: {
    children: ReactElement;
    childrenStyle: (state: TransitionStatus) => object;
    in: boolean;
    timeout?: number;
  },
  ref: any
) => {
  const { children, childrenStyle, timeout = 300 } = props;
  const childRef: MutableRefObject<HTMLElement | null> = useRef(null);
  const defaultStyle = {
    transition: `all ${timeout}ms ease-in-out`,
  };

  return (
    <Transition
      timeout={timeout}
      appear={true}
      nodeRef={childRef}
      {...(props as any)}
    >
      {(state: TransitionStatus) => {
        return React.cloneElement(children, {
          ref: (element: HTMLElement, ...arg: any) => {
            childRef.current = element;
            ref?.(element, ...arg);
          },
          style: {
            ...defaultStyle,
            ...(childrenStyle?.(state) || {}),
          },
        });
      }}
    </Transition>
  );
};

export default forwardRef(TransitionWrap);
