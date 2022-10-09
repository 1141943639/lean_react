import Drawer from "components/Drawer";
import Header from "Layout/Header";
import SideBar from "Layout/SideBar";
import React, { ReactNode, useCallback, useEffect, useState } from "react";

const Wrap: React.FC<{ routes?: ReactNode; tabList: Array<any> }> = (props) => {
  const { tabList } = props;

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  useEffect(() => {
    let ignore = false;

    if (ignore) return;

    window.addEventListener("resize", handleCloseDrawer);

    return () => {
      ignore = true;
      window.removeEventListener("resize", handleCloseDrawer);
    };
  }, []);

  return (
    <div className="flex h-full">
      <div className="md:block hidden mr-5 h-full w-3/12 rounded-md overflow-hidden">
        <SideBar tabList={tabList} />
      </div>
      <div className="md:hidden block">
        <Drawer onClose={handleCloseDrawer} open={openDrawer}>
          <div className="w-full h-full">
            <SideBar onClickTab={handleCloseDrawer} tabList={tabList} />
          </div>
        </Drawer>
      </div>
      <div className="h-full rounded-md overflow-hidden bg-white w-full flex flex-col">
        <div className="p-3 pb-0">
          <Header onOpenDrawer={() => setOpenDrawer(true)} />
        </div>
        <div className="overflow-hidden flex-1 mt-2">{props.routes}</div>
      </div>
    </div>
  );
};
export default Wrap;
