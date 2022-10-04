import React from "react";

import ModalUnstyled, { ModalUnstyledProps } from "@mui/base/ModalUnstyled";
import Backdrop from "./components/Backdrop";
import { cloneDeep } from "lodash";

type Props = ModalUnstyledProps;

const Drawer: React.FC<Props> = (props) => {
  props = cloneDeep(props);

  props.children = <div className="relative bg-black">{props.children}</div>;

  return (
    <ModalUnstyled
      components={{
        Backdrop,
      }}
      componentsProps={{
        root: (state) => {
          const { open } = state;

          return {
            className: "z-1200 fixed h-screen w-2/12 left-0 top-0",
            style: {
              transform: open ? "translateX(0%)" : "translateX(-100%)",
            },
          };
        },
      }}
      {...props}
    />
  );
};

export default Drawer;
