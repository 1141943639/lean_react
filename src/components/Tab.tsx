import React from "react";

import TabUnstyled, {
  TabUnstyledProps,
  TabUnstyledOwnerState,
} from "@mui/base/TabUnstyled";

export default React.forwardRef(function Tab(
  props: TabUnstyledProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <div>
      <TabUnstyled
        {...props}
        componentsProps={{
          root: (state: TabUnstyledOwnerState) => ({
            className: "",
          }),
        }}
        ref={ref}
      />
    </div>
  );
});
